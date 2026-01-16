import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load env file
dotenv.config({ path: "../../apps/web/.env.local" });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

export default {
  schema: "./src/schema.ts",
  dialect: "postgresql",
  migrations: {
    table: "drizzle_migrations",
  },
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  out: "./migrations",
  strict: process.env.NODE_ENV === "production",
} satisfies Config;
