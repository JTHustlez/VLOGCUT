import { createAuthClient } from "better-auth/react";

// Hardcoded baseURL - process.env doesn't work in this package
// Must match BETTER_AUTH_URL and NEXT_PUBLIC_BETTER_AUTH_URL env vars
export const { signIn, signUp, useSession } = createAuthClient({
  baseURL: "https://www.vlogcut.io",
});
