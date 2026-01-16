import { auth } from "@opencut/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const handler = toNextJsHandler(auth);

export async function POST(request: NextRequest) {
  try {
    return await handler.POST(request);
  } catch (error) {
    console.error("Auth POST error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    return await handler.GET(request);
  } catch (error) {
    console.error("Auth GET error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}
