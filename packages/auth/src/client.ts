import { createAuthClient } from "better-auth/react";

// Absolute minimum configuration - no validation, no fancy options
// Just create the client with the public URL
export const { signIn, signUp, useSession } = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "",
});
