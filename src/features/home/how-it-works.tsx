"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { UserPlus, BookOpen, Brain, Trophy } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const steps = [
  {
    num: "01",
    icon: UserPlus,
    title: "Daftar & Tentukan Level",
    description: "Buat akun gratis dan ikuti placement test singkat. Sistem akan menentukan level belajar yang tepat untukmu.",
    color: "bg-sky-500",
    lightBg: "bg-sky-50 dark:bg-sky-950/40",
    textColor: "text-sky-600 dark:text-sky-400",
  },
  {
    num: "02",
    icon: BookOpen,
    title: "Pelajari Materi Terstruktur",
    description: "Ikuti kurikulum dari Hijaiyah hingga Nahwu-Sharaf. Setiap modul dilengkapi video, latihan, dan flashcard.",
    color: "bg-violet-500",
    lightBg: "bg-violet-50 dark:bg-violet-950/40",
    textColor: "text-violet-600 dark:text-violet-400",
  },
  {
    num: "03",
    icon: Brain,
    title: "Latihan dengan AI Assistant",
    description: "Tanyakan apa saja ke AI — translate, koreksi grammar, percakapan. AI siap menemanimu belajar 24/7.",
    color: "bg-amber-500",
    lightBg: "bg-amber-50 dark:bg-amber-950/40",
    textColor: "text-amber-600 dark:text-amber-400",
  },
  {
    num: "04",
    icon: Trophy,
    title: "Uji dengan Quiz & Raih Badge",
    description: "Kerjakan quiz interaktif, kumpulkan poin, dan raih badge keberhasilan. Pantau progresmu di dashboard.",
    color: "bg-rose-500",
    lightBg: "bg-rose-50 dark:bg-rose-950/40",
    textColor: "text-rose-600 dark:text-rose-400",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Image Placeholder 4:3 ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="relative order-2 lg:order-1"
          >
            {/*
             * ┌─────────────────────────────────┐
             * │  GANTI DENGAN GAMBAR ASLI       │
             * │  Rasio: 4:3  (misal 800×600 px) │
             * │  Konten: Suasana kelas / belajar │
             * │  atau infografis cara kerja      │
             * └─────────────────────────────────┘
             */}
            <Image
              src="/images/how-it-works.png"
              alt="Cara kerja platform belajar bahasa Arab"
              width={800}
              height={600}
              className="w-full h-auto rounded-3xl shadow-lg object-cover"
            />

            {/* Decorative floating badge */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl px-5 py-3 text-center"
            >
              <p className="text-2xl font-black text-sky-500">95%</p>
              <p className="text-xs text-slate-500 mt-0.5">Tingkat Kepuasan</p>
            </motion.div>

            {/* Decorative dots */}
            <div className="absolute -top-4 -left-4 grid grid-cols-4 gap-1.5 opacity-30">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="h-1.5 w-1.5 rounded-full bg-sky-500" />
              ))}
            </div>
          </motion.div>

          {/* ── Right: Steps ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="order-1 lg:order-2"
          >
            <p className="text-sm font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-widest mb-3">
              Cara Kerja
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              Mulai Belajar dalam{" "}
              <span className="gradient-text">4 Langkah Mudah</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-10 leading-relaxed">
              Dari pendaftaran hingga mahir berbahasa Arab — prosesnya dirancang sederhana dan menyenangkan.
            </p>

            <div className="space-y-5">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.45 }}
                  className="flex gap-4 group"
                >
                  {/* Number + line */}
                  <div className="flex flex-col items-center">
                    <div className={`h-11 w-11 rounded-2xl ${step.color} flex items-center justify-center text-white text-sm font-black shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                      {step.num}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-0.5 flex-1 mt-2 bg-slate-200 dark:bg-slate-700 min-h-4" />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`flex-1 pb-5 ${i < steps.length - 1 ? "" : ""}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <step.icon className={`h-4 w-4 ${step.textColor}`} />
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">{step.title}</h3>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/ai-assistant">Coba AI Assistant</Link>
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
