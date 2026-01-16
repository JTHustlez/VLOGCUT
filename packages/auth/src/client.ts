import { createAuthClient } from "better-auth/react";

// DO NOT use keys() here - it validates server-side env vars which don't exist on client
// Access NEXT_PUBLIC_* directly since they're exposed to the browser
const baseURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL;

if (!baseURL) {
  console.error("[Auth Client] NEXT_PUBLIC_BETTER_AUTH_URL is not set");
}

export const { signIn, signUp, useSession } = createAuthClient({
  baseURL: baseURL || "",
});
