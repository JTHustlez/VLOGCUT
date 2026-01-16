"use client";

import { useState } from "react";
import { Crown, Check, Video, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/use-subscription";
import { useSession } from "@opencut/auth/client";
import { toast } from "sonner";

interface PaywallProps {
  children: React.ReactNode;
}

export function Paywall({ children }: PaywallProps) {
  const { data: session, isPending: isSessionLoading } = useSession();
  const { isLoading: isSubscriptionLoading, isPro } = useSubscription();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  // While loading or not logged in, show children
  // Middleware handles redirect to login for non-logged-in users
  if (isSessionLoading || isSubscriptionLoading || !session?.user) {
    return <>{children}</>;
  }

  // If user is logged in AND subscribed, show children (the app)
  if (isPro) {
    return <>{children}</>;
  }

  // User is logged in but NOT subscribed - show paywall INSTEAD of children
  const features = [
    "Unlimited projects",
    "4K export quality",
    "50GB storage",
    "No watermark",
    "Priority support",
    "Stream export for long videos",
    "AI transcription",
    "Sound effects library",
  ];

  const handleSubscribe = async () => {
    setIsCheckoutLoading(true);
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
      });

      const data = await response.json();

      if (data.error) {
        toast.error(data.details ? `${data.error}: ${data.details}` : data.error);
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

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background p-8">
      <div className="relative max-w-lg w-full">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-xl" />
        
        <div className="relative bg-card border border-border/50 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/20">
              <Video className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Subscribe to VlogCut Pro</h1>
            <p className="text-muted-foreground">
              Unlock the full power of VlogCut to create amazing videos
            </p>
          </div>

          {/* Price */}
          <div className="text-center mb-6">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-bold">$24.99</span>
              <span className="text-muted-foreground">/month</span>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-8">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            type="button"
            onClick={handleSubscribe}
            disabled={isCheckoutLoading}
            className="w-full h-12 text-base font-semibold"
            variant="primary-gradient"
            size="lg"
          >
            {isCheckoutLoading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Crown className="h-5 w-5 mr-2" />
                Subscribe Now
              </>
            )}
          </Button>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground mt-4">
            Cancel anytime. 30-day money back guarantee.
          </p>
        </div>
      </div>
    </div>
  );
}
