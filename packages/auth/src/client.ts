import { createAuthClient } from "better-auth/react";

// DO NOT use keys() here - it validates server-side env vars which don't exist on client
// Access NEXT_PUBLIC_* directly since they're exposed to the browser
const baseURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL;

// Log the baseURL for debugging
console.log("[Auth Client] Initializing with baseURL:", baseURL);

if (!baseURL) {
  console.error("[Auth Client] CRITICAL: NEXT_PUBLIC_BETTER_AUTH_URL is not set!");
  console.error("[Auth Client] Auth requests will fail without a valid baseURL");
}

// Create the auth client
// If baseURL is undefined, Better Auth will use relative URLs (same origin)
const authClient = createAuthClient({
  baseURL: baseURL,
  fetchOptions: {
    // Ensure cookies are sent with requests
    credentials: "include",
    onError: (error) => {
      console.error("[Auth Client] Fetch error:", error);
    },
  },
});

export const { signIn, signUp, useSession } = authClient;
