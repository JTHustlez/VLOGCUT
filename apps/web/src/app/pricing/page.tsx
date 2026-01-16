"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PLANS } from "@/lib/plans";
import { Check, Loader2, ArrowLeft, Sparkles } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { useSession } from "@opencut/auth/client";
import { toast } from "sonner";
import Link from "next/link";

function PricingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, isPending: isSessionLoading } = useSession();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [isPortalLoading, setIsPortalLoading] = useState(false);
  const [userPlan, setUserPlan] = useState<"pro" | "none">("none");

  // Fetch user's current plan
  useEffect(() => {
    async function fetchPlan() {
      if (!session?.user) return;
      try {
        const response = await fetch("/api/user/subscription");
        if (response.ok) {
          const data = await response.json();
          setUserPlan(data.plan === "pro" ? "pro" : "none");
        }
      } catch (error) {
        console.error("Failed to fetch plan:", error);
      }
    }
    fetchPlan();
  }, [session?.user]);

  // Show toast if redirected from canceled checkout
  const canceled = searchParams.get("canceled");
  if (canceled) {
    toast.info("Checkout canceled. You can try again when you're ready.");
  }

  const handleSubscribe = async () => {
    if (!session?.user) {
      router.push("/login?redirect=/pricing");
      return;
    }

    setIsCheckoutLoading(true);
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
      });

      const data = await response.json();

      if (data.error) {
        toast.error(data.error);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to start checkout. Please try again.");
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    setIsPortalLoading(true);
    try {
      const response = await fetch("/api/stripe/portal", {
        method: "POST",
      });

      const data = await response.json();

      if (data.error) {
        toast.error(data.error);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Portal error:", error);
      toast.error("Failed to open billing portal. Please try again.");
    } finally {
      setIsPortalLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Back</span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Start creating with VlogCut
          </h1>
          <p className="text-xl text-muted-foreground">
            One simple plan. Everything you need.
          </p>
        </div>

        {/* Pro Plan */}
        <Card className="border-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            Full Access
          </div>
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">
              {PLANS.pro.name}
              {userPlan === "pro" && (
                <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  Active
                </span>
              )}
            </CardTitle>
            <CardDescription className="text-base">
              {PLANS.pro.description}
            </CardDescription>
            <div className="pt-6">
              <span className="text-5xl font-bold">${PLANS.pro.price}</span>
              <span className="text-muted-foreground text-lg">/month</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-2 gap-3 mb-8">
              {PLANS.pro.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            {userPlan === "pro" ? (
              <Button
                variant="outline"
                className="w-full"
                onClick={handleManageSubscription}
                disabled={isPortalLoading}
              >
                {isPortalLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Manage Subscription"
                )}
              </Button>
            ) : (
              <Button
                className="w-full text-lg py-6"
                onClick={handleSubscribe}
                disabled={isCheckoutLoading || isSessionLoading}
              >
                {isCheckoutLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Subscribe Now"
                )}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* FAQ or additional info */}
        <div className="mt-12 text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Cancel anytime. No questions asked.
          </p>
          <p className="text-muted-foreground">
            Questions? Contact us at{" "}
            <a
              href="mailto:support@vlogcut.io"
              className="text-primary hover:underline"
            >
              support@vlogcut.io
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <PricingContent />
    </Suspense>
  );
}
