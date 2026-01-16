import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const envCheck = {
    DATABASE_URL: process.env.DATABASE_URL ? "SET" : "NOT SET",
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET ? "SET" : "NOT SET",
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || "NOT SET",
    NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "NOT SET",
    NODE_ENV: process.env.NODE_ENV,
  };
  
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    env: envCheck,
  });
}
