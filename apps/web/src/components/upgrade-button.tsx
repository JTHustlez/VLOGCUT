"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PLANS } from "@/lib/plans";
import { Check, Loader2, Sparkles, Crown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "@opencut/auth/client";
import { toast } from "sonner";

interface UpgradeButtonProps {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  children?: React.ReactNode;
  showIcon?: boolean;
  reason?: string; // Why upgrade is needed
}

export function UpgradeButton({
  variant = "default",
  size = "default",
  className,
  children,
  showIcon = true,
  reason,
}: UpgradeButtonProps) {
  const router = useRouter();
  const { session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    if (!session?.user) {
      router.push("/login?redirect=/pricing");
      return;
    }

    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          {showIcon && <Crown className="h-4 w-4 mr-2" />}
          {children ?? "Subscribe"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Subscribe to VlogCut Pro
          </DialogTitle>
          <DialogDescription>
            {reason ??
              "Get full access to all features and take your video editing to the next level."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">${PLANS.pro.price}</span>
            <span className="text-muted-foreground">/month</span>
          </div>

          <ul className="space-y-2">
            {PLANS.pro.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500 shrink-0" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <Button onClick={handleUpgrade} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Crown className="mr-2 h-4 w-4" />
                Subscribe Now
              </>
            )}
          </Button>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Simpler inline upgrade prompt for limit warnings
export function UpgradePrompt({
  title,
  description,
  onUpgrade,
}: {
  title: string;
  description: string;
  onUpgrade?: () => void;
}) {
  const router = useRouter();
  const { session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    if (onUpgrade) {
      onUpgrade();
      return;
    }

    if (!session?.user) {
      router.push("/login?redirect=/pricing");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <Crown className="h-5 w-5 text-primary mt-0.5 shrink-0" />
        <div className="flex-1">
          <h4 className="font-medium text-sm">{title}</h4>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
          <Button
            size="sm"
            className="mt-3"
            onClick={handleUpgrade}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
            "Subscribe to Pro"
          )}
          </Button>
        </div>
      </div>
    </div>
  );
}
