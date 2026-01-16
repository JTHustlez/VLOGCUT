import { NextRequest, NextResponse } from "next/server";

// CRITICAL: Force Node.js runtime - Edge doesn't support pg/PostgreSQL
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Log at module load time
console.log("[AUTH ROUTE] Module loading...");
console.log("[AUTH ROUTE] DATABASE_URL:", process.env.DATABASE_URL ? "SET" : "NOT SET");
console.log("[AUTH ROUTE] BETTER_AUTH_SECRET:", process.env.BETTER_AUTH_SECRET ? "SET" : "NOT SET");
console.log("[AUTH ROUTE] BETTER_AUTH_URL:", process.env.BETTER_AUTH_URL);

// Lazy import to catch initialization errors
let handler: ReturnType<typeof import("better-auth/next-js").toNextJsHandler> | null = null;
let initError: Error | null = null;

async function getHandler() {
  if (initError) throw initError;
  if (handler) return handler;
  
  try {
    console.log("[AUTH ROUTE] Initializing Better Auth...");
    const { auth } = await import("@opencut/auth");
    const { toNextJsHandler } = await import("better-auth/next-js");
    handler = toNextJsHandler(auth);
    console.log("[AUTH ROUTE] Better Auth initialized successfully");
    return handler;
  } catch (error) {
    console.error("[AUTH ROUTE] Failed to initialize Better Auth:", error);
    initError = error as Error;
    throw error;
  }
}

export async function POST(request: NextRequest) {
  console.log("[AUTH ROUTE] POST request received:", request.url);
  try {
    const h = await getHandler();
    console.log("[AUTH ROUTE] Calling handler.POST...");
    const response = await h.POST(request);
    console.log("[AUTH ROUTE] Handler response status:", response.status);
    return response;
  } catch (error) {
    console.error("[AUTH ROUTE] POST error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error), stack: (error as Error).stack },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  console.log("[AUTH ROUTE] GET request received:", request.url);
  try {
    const h = await getHandler();
    console.log("[AUTH ROUTE] Calling handler.GET...");
    const response = await h.GET(request);
    console.log("[AUTH ROUTE] Handler response status:", response.status);
    return response;
  } catch (error) {
    console.error("[AUTH ROUTE] GET error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error), stack: (error as Error).stack },
      { status: 500 }
    );
  }
}
