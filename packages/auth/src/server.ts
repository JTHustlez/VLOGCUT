import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@opencut/db";

// Simplified - removed Redis rate limiting to debug
const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET;
const NEXT_PUBLIC_BETTER_AUTH_URL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL;

if (!BETTER_AUTH_SECRET) {
  throw new Error("BETTER_AUTH_SECRET is not set");
}

if (!NEXT_PUBLIC_BETTER_AUTH_URL) {
  throw new Error("NEXT_PUBLIC_BETTER_AUTH_URL is not set");
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  secret: BETTER_AUTH_SECRET,
  user: {
    deleteUser: {
      enabled: true,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  baseURL: NEXT_PUBLIC_BETTER_AUTH_URL,
  appName: "VlogCut",
  trustedOrigins: [
    "http://localhost:3000",
    "https://vlogcut.io",
    "https://www.vlogcut.io",
  ],
});

export type Auth = typeof auth;
