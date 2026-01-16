import { betterAuth } from "better-auth";
import { Pool } from "pg";

// Better Auth requires DATABASE_URL, BETTER_AUTH_URL, and BETTER_AUTH_SECRET
const DATABASE_URL = process.env.DATABASE_URL;
const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET;
const BETTER_AUTH_URL = process.env.BETTER_AUTH_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

if (!BETTER_AUTH_SECRET) {
  throw new Error("BETTER_AUTH_SECRET is not set");
}

if (!BETTER_AUTH_URL) {
  throw new Error("BETTER_AUTH_URL is not set");
}

export const auth = betterAuth({
  database: new Pool({
    connectionString: DATABASE_URL,
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
  baseURL: BETTER_AUTH_URL,
  appName: "VlogCut",
  trustedOrigins: [
    "http://localhost:3000",
    "https://vlogcut.io",
    "https://www.vlogcut.io",
  ],
});

export type Auth = typeof auth;
