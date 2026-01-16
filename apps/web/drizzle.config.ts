import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load env file
dotenv.config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required. Create .env.local with DATABASE_URL.");
}

export default {
  schema: "../../packages/db/src/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  out: "./migrations",
  strict: process.env.NODE_ENV === "production",
} satisfies Config;
