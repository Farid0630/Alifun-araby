"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, ImageIcon } from "lucide-react";

const testimonials = [
  {
    name: "Ahmad Rizky",
    role: "Pelajar Bahasa Arab, Jakarta",
    initials: "AR",
    rating: 5,
    text: "Alifun Araby benar-benar mengubah cara saya belajar bahasa Arab. AI Assistant-nya sangat membantu saat saya bingung dengan nahwu. Dalam 3 bulan, saya sudah bisa membaca Al-Quran dengan lebih lancar!",
    highlight: "Dalam 3 bulan sudah bisa baca Al-Quran",
    color: "from-sky-400 to-blue-600",
  },
  {
    name: "Fatimah Azzahra",
    role: "Guru SD, Bandung",
    initials: "FA",
    rating: 5,
    text: "Sebagai guru yang ingin mengajarkan bahasa Arab ke murid, saya butuh referensi yang bagus. Alifun Araby memberikan materi yang terstruktur dan mudah dipahami. Kamus pintarnya juga sangat lengkap!",
    highlight: "Materi paling terstruktur yang pernah saya temukan",
    color: "from-violet-400 to-purple-600",
  },
  {
    name: "Muhammad Faisal",
    role: "Pengusaha, Surabaya",
    initials: "MF",
    rating: 5,
    text: "Saya belajar bahasa Arab untuk keperluan bisnis dengan mitra dari Timur Tengah. Dengan flashcard dan quiz interaktif, belajar jadi menyenangkan di sela kesibukan. Sangat direkomendasikan!",
    highlight: "Cocok untuk orang sibuk yang ingin belajar",
    color: "from-amber-400 to-orange-600",
  },
  {
    name: "Dewi Rahmawati",
    role: "Ibu Rumah Tangga, Yogyakarta",
    initials: "DR",
    rating: 5,
    text: "Saya tidak pernah menyangka bisa belajar bahasa Arab di usia 35 tahun. Tapi dengan metode Alifun Araby yang menyenangkan dan AI yang sabar menjawab pertanyaan, alhamdulillah sekarang saya bisa!",
    highlight: "Bisa belajar di usia berapa pun",
    color: "from-rose-400 to-pink-600",
  },
  {
    name: "Hasan Abdullah",
    role: "Santri Pesantren, Jombang",
    initials: "HA",
    rating: 5,
    text: "Sebelumnya nahwu-sharaf selalu bikin kepala pusing. Setelah belajar di Alifun Araby dengan penjelasan yang simpel dan quiz yang menarik, sekarang jadi lebih mudah dipahami. Jazakumullah khairan!",
    highlight: "Nahwu-sharaf jadi mudah dipahami",
    color: "from-blue-400 to-cyan-600",
  },
  {
    name: "Lisa Pertiwi",
    role: "Dosen, Makassar",
    initials: "LP",
    rating: 5,
    text: "Platform paling komprehensif yang pernah saya gunakan. Kombinasi AI, kamus, quiz, dan materi terstruktur membuat progress belajar saya sangat signifikan dalam waktu singkat.",
    highlight: "Platform paling komprehensif",
    color: "from-indigo-400 to-blue-600",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, 4500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, current]);

  const visible = [
    testimonials[current % testimonials.length],
    testimonials[(current + 1) % testimonials.length],
    testimonials[(current + 2) % testimonials.length],
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-widest mb-3">
            Testimoni
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
            Kata Mereka yang Sudah{" "}
            <span className="gradient-text">Merasakannya</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} className="h-5 w-5 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-lg font-black text-slate-900 dark:text-white ml-1">4.9</span>
            <span className="text-sm text-slate-500">dari 12.000+ ulasan</span>
          </div>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {visible.map((t, i) => (
              <motion.div
                key={`${current}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className={`relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm transition-shadow hover:shadow-lg ${i === 0 ? "ring-2 ring-sky-300 dark:ring-sky-700" : ""}`}
              >
                <Quote className="absolute top-5 right-5 h-8 w-8 text-slate-100 dark:text-slate-800" />

                {/* Stars */}
                <div className="flex mb-3">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs font-semibold text-sky-600 dark:text-sky-400 italic mb-3">
                  &ldquo;{t.highlight}&rdquo;
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  {t.text}
                </p>

                {/* Author with image slot */}
                <div className="flex items-center gap-3">
                  {/*
                   * ┌──────────────────────────────┐
                   * │  FOTO TESTIMONI (opsional)   │
                   * │  Rasio: 1:1 · 80 × 80 px    │
                   * │  Foto profil responden       │
                   * └──────────────────────────────┘
                   */}
                  <div className="relative shrink-0 group/av">
                    <div className={`h-10 w-10 rounded-full bg-linear-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold`}>
                      {t.initials}
                    </div>
                    {/* hover tooltip: image placeholder info */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/av:flex flex-col items-center z-10">
                      <div className="rounded-lg bg-slate-800 text-white text-[10px] px-2 py-1 whitespace-nowrap flex items-center gap-1 shadow-lg">
                        <ImageIcon className="h-3 w-3" />
                        80×80px · 1:1
                      </div>
                      <div className="w-2 h-2 bg-slate-800 rotate-45 -mt-1" />
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="h-9 w-9 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-500 hover:border-sky-400 hover:text-sky-500 transition-colors shadow-sm"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Dots */}
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 h-2 bg-sky-500"
                      : "w-2 h-2 bg-slate-300 dark:bg-slate-600 hover:bg-sky-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="h-9 w-9 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-500 hover:border-sky-400 hover:text-sky-500 transition-colors shadow-sm"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Avatar photo spec note */}
        <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1.5">
          <ImageIcon className="h-3.5 w-3.5" />
          Foto testimoni: ganti avatar dengan foto asli · ukuran <strong>80×80 px</strong> · rasio <strong>1:1</strong>
        </p>
      </div>
    </section>
  );
}
