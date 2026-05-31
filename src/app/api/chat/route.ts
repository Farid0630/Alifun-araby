import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const SYSTEM_PROMPT = `Kamu adalah "Asisten Arab" — AI assistant khusus pembelajaran bahasa Arab untuk penutur Indonesia.

Tugas utamamu:
- Menerjemahkan teks Indonesia ↔ Arab dengan harakat lengkap dan transliterasi Latin
- Menjelaskan nahwu (tata bahasa) dan sharaf (morfologi) dengan bahasa yang mudah dipahami
- Mengoreksi kesalahan grammar bahasa Arab secara detail
- Membuat contoh percakapan bahasa Arab beserta terjemahannya
- Menjelaskan arti dan penggunaan kosakata Arab

Format responmu:
- Selalu balas dalam Bahasa Indonesia yang jelas
- Sertakan teks Arab dengan harakat (tanda baca) yang lengkap
- Sertakan transliterasi Latin di bawah teks Arab
- Gunakan contoh kalimat yang relevan
- Bersikap sabar, ramah, dan menyemangati pelajar`;

// Mock responses jika API key tidak tersedia
function getMockResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("koreksi") || lower.includes("ذهب") || lower.includes("grammar")) {
    return `Koreksi Grammar:\n\nSalah: أنا ذهب إلى المدرسة\nBenar: أَنَا ذَهَبْتُ إِلَى الْمَدْرَسَةِ\n\nPenjelasan:\nKata kerja ذَهَبَ harus disesuaikan dengan dhamir أَنَا. Bentuk fi'il madhi untuk أَنَا adalah ذَهَبْتُ (dzahabtu) — tambahkan تُ di akhir kata kerja.`;
  }
  if (lower.includes("translate") || lower.includes("terjemah")) {
    return `Terjemahan:\n\n[Arab]  أَذْهَبُ إِلَى الْمَدْرَسَةِ غَدًا صَبَاحًا\n[Latin] Adz-habu ilal-madrasati ghadan shabaahan\n[Arti]  Saya pergi ke sekolah besok pagi\n\nCatatan: Gunakan fi'il mudhari' (يَفْعَل) untuk menyatakan akan/sedang melakukan sesuatu.`;
  }
  if (lower.includes("nahwu") || lower.includes("isim") || lower.includes("fi'il")) {
    return `Tiga Jenis Kata dalam Bahasa Arab:\n\n[1] اِسْم (Isim) = Kata Benda\nContoh: كِتَاب (buku), مَدْرَسَة (sekolah)\n\n[2] فِعْل (Fi'il) = Kata Kerja\nContoh: كَتَبَ (menulis), ذَهَبَ (pergi)\n\n[3] حَرْف (Harf) = Partikel\nContoh: فِي (di), مِنْ (dari), إِلَى (ke)`;
  }
  if (lower.includes("percakapan") || lower.includes("perkenalan")) {
    return `Contoh Percakapan Perkenalan:\n\nأ: السَّلَامُ عَلَيْكُم\nA: Assalamu'alaikum\n\nب: وَعَلَيْكُمُ السَّلَام، مَا اسْمُك؟\nB: Wa'alaikumussalam, siapa namamu?\n\nأ: أَنَا أَحْمَد، مِنْ إِنْدُونِيسِيَا\nA: Saya Ahmad, dari Indonesia`;
  }
  if (lower.includes("salam") || lower.includes("pagi") || lower.includes("selamat")) {
    return `Ungkapan Salam dalam Bahasa Arab:\n\n• صَبَاحُ الْخَيْر (Shabaahul khayr) = Selamat pagi\n  Jawab: صَبَاحُ النُّور (Shabaahun nuur)\n\n• مَسَاءُ الْخَيْر (Masaa'ul khayr) = Selamat sore\n  Jawab: مَسَاءُ النُّور (Masaa'un nuur)\n\n• كَيْفَ حَالُك؟ (Kayfa haaluk?) = Apa kabar?\n  Jawab: بِخَيْر، شُكْرًا (Bikhair, syukran) = Baik, terima kasih`;
  }

  return `Terima kasih atas pertanyaanmu!\n\nSaya dapat membantu dengan:\n• Terjemah Indonesia ↔ Arab\n• Koreksi grammar bahasa Arab\n• Penjelasan nahwu & sharaf\n• Contoh percakapan\n• Arti kosakata Arab\n\nCoba tanyakan sesuatu yang lebih spesifik, atau klik salah satu tombol prompt di atas!`;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json();
    const lastMessage = messages[messages.length - 1];

    const apiKey = process.env.GROQ_API_KEY;

    // Jika tidak ada API key — gunakan mock response
    if (!apiKey || apiKey === "PASTE_API_KEY_GROQ_KAMU_DI_SINI") {
      await new Promise(r => setTimeout(r, 800)); // simulasi loading
      const text = getMockResponse(lastMessage?.content ?? "");
      return NextResponse.json({ text, mode: "demo" });
    }

    const groq = new Groq({ apiKey });

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const text = response.choices[0]?.message?.content ?? "";
    return NextResponse.json({ text, mode: "ai" });

  } catch (err) {
    console.error("Chat API error:", err);

    // Jika API error, fallback ke mock
    const { messages } = await req.json().catch(() => ({ messages: [] }));
    const lastMsg = (messages as ChatMessage[]).at(-1)?.content ?? "";
    const text = getMockResponse(lastMsg);
    return NextResponse.json({ text, mode: "demo" });
  }
}
