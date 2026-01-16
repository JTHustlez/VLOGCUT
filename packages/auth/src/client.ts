import { createAuthClient } from "better-auth/react";

// For client-side auth, we don't need baseURL when making requests to the same origin
// Better Auth will use relative URLs (/api/auth/*) which work perfectly
// DO NOT use process.env here as it may not be available in the client bundle
export const { signIn, signUp, useSession } = createAuthClient();
