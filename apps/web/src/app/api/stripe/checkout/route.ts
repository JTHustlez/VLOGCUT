import { NextRequest, NextResponse } from "next/server";
import { stripe, getProPriceId } from "@/lib/stripe";
import { env } from "@/env";
import { db, users, eq } from "@opencut/db";
import { auth } from "@opencut/auth";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    // Get the current user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const userEmail = session.user.email;

    // Get user from database
    let [user] = await db.select().from(users).where(eq(users.id, userId));

    // If user doesn't exist in our table, create them from session data
    if (!user) {
      const [newUser] = await db
        .insert(users)
        .values({
          id: userId,
          email: userEmail,
          name: session.user.name || userEmail.split("@")[0],
          emailVerified: session.user.emailVerified || false,
          image: session.user.image || null,
          plan: "none",
          projectCount: 0,
          storageUsedBytes: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .onConflictDoNothing()
        .returning();
      
      user = newUser || (await db.select().from(users).where(eq(users.id, userId)))[0];
      
      if (!user) {
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
      }
    }

    // Check if user already has an active subscription
    if (user.plan === "pro" && user.stripeSubscriptionId) {
      return NextResponse.json(
        { error: "You already have an active Pro subscription" },
        { status: 400 }
      );
    }

    // Create or retrieve Stripe customer
    let customerId = user.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: userEmail,
        metadata: {
          userId: userId,
        },
      });
      customerId = customer.id;

      // Save customer ID to database
      await db
        .update(users)
        .set({ stripeCustomerId: customerId })
        .where(eq(users.id, userId));
    }

    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: getProPriceId(),
          quantity: 1,
        },
      ],
      success_url: `${env.NEXT_PUBLIC_APP_URL}/editor?upgraded=true`,
      cancel_url: `${env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      metadata: {
        userId: userId,
      },
      subscription_data: {
        metadata: {
          userId: userId,
        },
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
