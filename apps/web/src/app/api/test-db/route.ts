import { NextResponse } from "next/server";
import { Pool } from "pg";

export const runtime = "nodejs";

export async function GET() {
  const DATABASE_URL = process.env.DATABASE_URL;
  
  if (!DATABASE_URL) {
    return NextResponse.json({ error: "DATABASE_URL not set" }, { status: 500 });
  }
  
  try {
    const pool = new Pool({
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
    
    const client = await pool.connect();
    const result = await client.query("SELECT NOW() as time");
    client.release();
    await pool.end();
    
    return NextResponse.json({
      status: "ok",
      database: "connected",
      time: result.rows[0].time,
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      error: String(error),
      stack: (error as Error).stack,
    }, { status: 500 });
  }
}
