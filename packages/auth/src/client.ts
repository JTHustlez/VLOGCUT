import { createAuthClient } from "better-auth/react";

// CRITICAL: No baseURL needed when client and server are on same origin.
// Better Auth will use relative URLs (/api/auth/*) automatically.
// DO NOT use process.env or window here - it causes issues with SSR/module loading.
export const { signIn, signUp, useSession } = createAuthClient();
