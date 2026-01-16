import { createAuthClient } from "better-auth/react";

// DO NOT set baseURL - let Better Auth use window.location.origin
// Setting baseURL breaks same-origin cookie/session hydration
export const { signIn, signUp, useSession } = createAuthClient();
