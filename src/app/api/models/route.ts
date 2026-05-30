import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "GANTI_DENGAN_API_KEY_BARU_KAMU") {
    return NextResponse.json({ error: "API key belum dikonfigurasi" }, { status: 500 });
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
  );
  const data = await res.json();

  if (!res.ok) return NextResponse.json(data, { status: res.status });

  // Filter hanya yang support generateContent
  const models = (data.models ?? [])
    .filter((m: { supportedGenerationMethods?: string[] }) =>
      m.supportedGenerationMethods?.includes("generateContent")
    )
    .map((m: { name: string; displayName?: string }) => ({
      id: m.name.replace("models/", ""),
      name: m.displayName ?? m.name,
    }));

  return NextResponse.json({ models });
}
