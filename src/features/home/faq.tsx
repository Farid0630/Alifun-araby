"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Apakah Alifun Araby cocok untuk pemula yang belum tahu sama sekali tentang bahasa Arab?",
    a: "Sangat cocok! Alifun Araby dirancang khusus untuk pemula absolut. Kamu akan mulai dari dasar — mengenal huruf Hijaiyah satu per satu, belajar harakat, lalu berkembang secara bertahap. AI Assistant kami siap membantu kapanpun kamu bingung.",
  },
  {
    q: "Berapa lama waktu yang dibutuhkan untuk bisa membaca Arab dengan lancar?",
    a: "Dengan belajar konsisten 15-30 menit sehari, kebanyakan pelajar bisa membaca tulisan Arab dalam 1-2 bulan. Untuk percakapan dasar membutuhkan 3-6 bulan, tergantung intensitas belajar.",
  },
  {
    q: "Apakah konten di Alifun Araby benar-benar gratis?",
    a: "Ya! Konten dasar Alifun Araby tersedia gratis sepenuhnya, termasuk materi level 1-2, kamus pintar, dan 100 kartu flashcard. Untuk akses materi premium dan fitur AI tanpa batas, tersedia paket berlangganan dengan harga terjangkau.",
  },
  {
    q: "Bagaimana cara kerja AI Arabic Assistant?",
    a: "AI Arabic Assistant kami menggunakan teknologi language model terkini. Kamu bisa bertanya dalam bahasa Indonesia dan mendapatkan penjelasan, translate, atau koreksi grammar dalam bahasa Arab beserta transliterasinya.",
  },
  {
    q: "Apakah ada sertifikat setelah menyelesaikan materi?",
    a: "Ya! Setelah menyelesaikan setiap level, kamu akan mendapatkan badge digital dan sertifikat penyelesaian yang bisa dibagikan ke media sosial.",
  },
  {
    q: "Bisa belajar di smartphone juga?",
    a: "Tentu! Alifun Araby dioptimalkan untuk semua perangkat — smartphone, tablet, dan komputer. Desain mobile-first kami memastikan pengalaman belajar yang nyaman di genggaman tanganmu.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-3xl mx-auto">

        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
            Pertanyaan yang Sering Ditanyakan
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base">
            Belum menemukan jawaban? Hubungi tim kami.
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={cn(
                "rounded-xl border bg-white dark:bg-slate-900 overflow-hidden transition-colors",
                openIndex === i
                  ? "border-sky-300 dark:border-sky-700"
                  : "border-slate-200 dark:border-slate-700"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left px-5 py-4 flex items-start justify-between gap-4"
              >
                <span className={cn(
                  "text-sm font-semibold leading-relaxed",
                  openIndex === i
                    ? "text-sky-700 dark:text-sky-300"
                    : "text-slate-800 dark:text-slate-200"
                )}>
                  {faq.q}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 mt-0.5",
                    openIndex === i ? "rotate-180 text-sky-500" : ""
                  )}
                />
              </button>

              {openIndex === i && (
                <div className="px-5 pb-4 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-3">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500 mb-3">Masih ada pertanyaan lain?</p>
          <a
            href="mailto:info@alifunaraby.id"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 dark:text-sky-400 hover:underline"
          >
            Hubungi Tim Kami →
          </a>
        </div>

      </div>
    </section>
  );
}
