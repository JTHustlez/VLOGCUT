import Stripe from "stripe";
import { env } from "@/env";

// Re-export plan config from shared file (client-safe)
export { PLANS, getPlanLimits, canUserPerformAction } from "./plans";
export type { PlanType } from "./plans";

// Server-side Stripe instance
export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});

// Get price ID from env (server-side only)
export function getProPriceId() {
  return env.STRIPE_PRO_PRICE_ID;
}
