"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "@opencut/auth/client";
import { PlanType, getPlanLimits } from "@/lib/plans";
import type { UserSubscription } from "@/app/api/user/subscription/route";

interface UseSubscriptionReturn {
  subscription: UserSubscription | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  // Convenience helpers
  plan: PlanType;
  isPro: boolean;
  isSubscribed: boolean;
  limits: ReturnType<typeof getPlanLimits>;
  canCreateProject: boolean;
  canUploadMedia: (additionalBytes?: number) => boolean;
  canUseStreamExport: boolean;
  hasWatermark: boolean;
}

export function useSubscription(): UseSubscriptionReturn {
  const { data: session } = useSession();
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = useCallback(async () => {
    if (!session?.user) {
      setSubscription(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/user/subscription");
      
      if (!response.ok) {
        throw new Error("Failed to fetch subscription");
      }

      const data = await response.json();
      setSubscription(data);
    } catch (err) {
      console.error("Error fetching subscription:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
      // Set default non-subscribed state on error
      setSubscription({
        plan: "none",
        limits: getPlanLimits("none"),
        usage: { projectCount: 0, storageUsedBytes: 0 },
        stripeCustomerId: null,
        stripeSubscriptionId: null,
        stripeCurrentPeriodEnd: null,
      });
    } finally {
      setIsLoading(false);
    }
  }, [session?.user]);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  // Derive convenience values
  const plan = (subscription?.plan === "pro" ? "pro" : "none") as PlanType;
  const isPro = plan === "pro";
  const isSubscribed = isPro;
  const limits = subscription?.limits ?? getPlanLimits("none");
  const usage = subscription?.usage ?? { projectCount: 0, storageUsedBytes: 0 };

  const canCreateProject = isPro && usage.projectCount < limits.maxProjects;
  
  const canUploadMedia = (additionalBytes = 0) => {
    return isPro && usage.storageUsedBytes + additionalBytes < limits.maxStorageBytes;
  };

  const canUseStreamExport = isPro && limits.canUseStreamExport;
  const hasWatermark = !isPro || limits.hasWatermark;

  return {
    subscription,
    isLoading,
    error,
    refetch: fetchSubscription,
    plan,
    isPro,
    isSubscribed,
    limits,
    canCreateProject,
    canUploadMedia,
    canUseStreamExport,
    hasWatermark,
  };
}

// Simple check without fetching (for non-authenticated contexts)
export function getDefaultLimits(): ReturnType<typeof getPlanLimits> {
  return getPlanLimits("none");
}
