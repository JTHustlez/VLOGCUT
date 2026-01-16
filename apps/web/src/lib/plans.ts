// Plan configuration - shared between client and server
// This file has no server-side dependencies

export const PLANS = {
  pro: {
    name: "Pro",
    description: "Everything you need to create amazing videos",
    price: 24.99,
    features: [
      "Unlimited projects",
      "4K export quality",
      "50GB storage",
      "No watermark",
      "Priority support",
      "Stream export for long videos",
      "AI transcription",
      "Sound effects library",
    ],
    limits: {
      maxProjects: Infinity,
      maxStorageBytes: 50 * 1024 * 1024 * 1024, // 50GB
      maxExportQuality: 2160, // 4K
      hasWatermark: false,
      canUseStreamExport: true,
    },
  },
} as const;

export type PlanType = "pro" | "none";

// Helper to get plan limits
export function getPlanLimits(plan: PlanType) {
  if (plan === "none") {
    // Non-subscribers have no access
    return {
      maxProjects: 0,
      maxStorageBytes: 0,
      maxExportQuality: 0,
      hasWatermark: true,
      canUseStreamExport: false,
    };
  }
  return PLANS.pro.limits;
}

// Helper to check if user has active subscription
export function hasActiveSubscription(plan: PlanType): boolean {
  return plan === "pro";
}

// Helper to check if user can perform action
export function canUserPerformAction({
  plan,
  action,
}: {
  plan: PlanType;
  action: "createProject" | "uploadMedia" | "exportHighQuality" | "streamExport";
}): { allowed: boolean; reason?: string } {
  if (plan !== "pro") {
    return {
      allowed: false,
      reason: "Subscribe to VlogCut Pro to access this feature.",
    };
  }
  return { allowed: true };
}
