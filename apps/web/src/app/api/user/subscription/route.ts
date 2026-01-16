import { NextResponse } from "next/server";
import { db, users, eq } from "@opencut/db";
import { auth } from "@opencut/auth";
import { headers } from "next/headers";
import { PlanType, getPlanLimits } from "@/lib/plans";

export interface UserSubscription {
  plan: PlanType;
  limits: ReturnType<typeof getPlanLimits>;
  usage: {
    projectCount: number;
    storageUsedBytes: number;
  };
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  stripeCurrentPeriodEnd: Date | null;
}

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id));

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const plan: PlanType = user.plan === "pro" ? "pro" : "none";

    const subscription: UserSubscription = {
      plan,
      limits: getPlanLimits(plan),
      usage: {
        projectCount: user.projectCount,
        storageUsedBytes: user.storageUsedBytes,
      },
      stripeCustomerId: user.stripeCustomerId,
      stripeSubscriptionId: user.stripeSubscriptionId,
      stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd,
    };

    return NextResponse.json(subscription);
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscription" },
      { status: 500 }
    );
  }
}
