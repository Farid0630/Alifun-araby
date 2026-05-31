import { NextResponse } from "next/server";

export async function GET() {
  const groqKey = process.env.GROQ_API_KEY;

  return NextResponse.json({
    GROQ_API_KEY: groqKey
      ? `✅ Ada (${groqKey.length} karakter, mulai: ${groqKey.slice(0, 8)}...)`
      : "❌ TIDAK ADA / KOSONG",
    NODE_ENV: process.env.NODE_ENV,
    hint: groqKey
      ? "Key terbaca — coba redeploy ulang"
      : "Key TIDAK terbaca — set di Vercel Dashboard → Settings → Environment Variables",
  });
}
