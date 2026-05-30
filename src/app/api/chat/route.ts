import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const SYSTEM_PROMPT = `Kamu adalah "Asisten Arab" — AI assistant khusus pembelajaran bahasa Arab untuk penutur Indonesia.

Tugas utamamu:
- Menerjemahkan teks Indonesia ↔ Arab dengan harakat lengkap dan transliterasi Latin
- Menjelaskan nahwu (tata bahasa) dan sharaf (morfologi) dengan bahasa yang mudah dipahami
- Mengoreksi kesalahan grammar bahasa Arab secara detail
- Membuat contoh percakapan bahasa Arab beserta terjemahannya
- Menjelaskan arti dan penggunaan kosakata Arab
- Mengajarkan huruf hijaiyah, harakat, dan cara baca

Format responmu:
- Selalu balas dalam Bahasa Indonesia yang jelas
- Sertakan teks Arab dengan harakat (tanda baca) yang lengkap
- Sertakan transliterasi Latin di bawah teks Arab
- Sertakan terjemahan Indonesia
- Gunakan contoh kalimat yang relevan dan mudah dipahami
- Bersikap sabar, ramah, dan menyemangati pelajar

Contoh format untuk translate:
[Arab]  كَيْفَ حَالُك؟
[Latin] Kayfa haaluk?
[Arti]  Bagaimana kabarmu?`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey || apiKey === "PASTE_API_KEY_GROQ_KAMU_DI_SINI") {
      return NextResponse.json(
        { error: "API key belum diisi. Buka .env.local dan isi GROQ_API_KEY dengan key dari console.groq.com" },
        { status: 500 }
      );
    }

    const groq = new Groq({ apiKey });

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // gratis, cepat, pintar
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 1500,
      top_p: 0.95,
    });

    const text = response.choices[0]?.message?.content ?? "";
    return NextResponse.json({ text });

  } catch (err) {
    console.error("Chat API error:", err);
    const message = (err as Error).message ?? "Terjadi kesalahan.";

    let userMessage = message;
    if (message.includes("401") || message.includes("invalid_api_key")) {
      userMessage = "API key Groq tidak valid. Periksa GROQ_API_KEY di .env.local.";
    } else if (message.includes("429") || message.includes("rate_limit")) {
      userMessage = "Terlalu banyak permintaan. Tunggu sebentar lalu coba lagi.";
    } else if (message.includes("503") || message.includes("unavailable")) {
      userMessage = "Server Groq sedang sibuk. Coba lagi dalam beberapa detik.";
    }

    return NextResponse.json({ error: userMessage }, { status: 500 });
  }
}
