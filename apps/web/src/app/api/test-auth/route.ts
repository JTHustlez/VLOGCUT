import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    // Try to import the auth module
    const { auth } = await import("@opencut/auth");
    
    return NextResponse.json({
      status: "ok",
      auth: "loaded",
      authKeys: Object.keys(auth),
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      error: String(error),
      stack: (error as Error).stack,
    }, { status: 500 });
  }
}
