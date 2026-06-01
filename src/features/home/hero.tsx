"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Brain, PlayCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThreeBgDynamic } from "@/components/ui/three-bg-dynamic";

const highlights = [
  "Materi dari Huruf Hijaiyah hingga Nahwu",
  "AI Assistant aktif 24 jam",
  "Quiz & Flashcard Interaktif",
];

const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.12 } } };

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      {/* 3D Background */}
      <ThreeBgDynamic className="z-0" />

      {/* Blur blobs tetap ada untuk layering */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-32 -right-32 h-125 w-125 rounded-full bg-sky-400/8 blur-3xl" />
        <div className="absolute bottom-0 -left-24 h-100 w-100 rounded-full bg-blue-600/6 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left ── */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">

            {/* Badge platform */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/60 px-4 py-1.5 text-xs font-medium text-sky-700 dark:text-sky-300">
                <Sparkles className="h-3.5 w-3.5 shrink-0" />
                Platform Belajar Bahasa Arab Digital
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Belajar <span className="gradient-text">Bahasa Arab</span>
              <br />Lebih Mudah &amp; Modern
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg text-sky-600/70 dark:text-sky-400/60 font-medium" style={{ fontFamily: "var(--font-cairo)" }}>
              تَعَلَّمِ الْعَرَبِيَّةَ بِطَرِيقَةٍ ذَكِيَّة
            </motion.p>

            <motion.p variants={fadeUp} className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
              Platform digital pembelajaran Bahasa Arab yang memadukan AI Assistant, kamus pintar, quiz interaktif, dan materi terstruktur — untuk siapa saja yang ingin belajar bahasa Arab.
            </motion.p>

            <motion.ul variants={fadeUp} className="space-y-2">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-sky-500 shrink-0" />
                  {h}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 pt-1">
              <Button size="lg" asChild>
                <Link href="/ai-assistant" className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  Coba AI Assistant
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/materi" className="flex items-center gap-2">
                  <PlayCircle className="h-4 w-4" />
                  Lihat Materi
                </Link>
              </Button>
            </motion.div>

          </motion.div>

          {/* ── Right: Image Collage ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            {/* Main image 4:3 */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-sky-500/15">
              {/*
               * FOTO UTAMA HERO
               * Ukuran: 800 × 600 px  |  Rasio: 4:3
               * Konten: Foto belajar / screenshot platform
               */}
              <Image
                src="/images/hero-main.png"
                alt="Foto kegiatan belajar bahasa Arab"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/10 to-transparent pointer-events-none" />
            </div>

            {/* Small image — top right 1:1 */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 w-32 h-32 rounded-2xl overflow-hidden shadow-xl border-2 border-white dark:border-slate-700"
            >
              {/*
               * FOTO KECIL KANAN ATAS
               * Ukuran: 200 × 200 px  |  Rasio: 1:1
               */}
              <Image
                src="/images/hero-small-top.png"
                alt="Foto belajar bahasa Arab"
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Small image — bottom left 16:9 */}
            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 w-44 rounded-2xl overflow-hidden shadow-xl border-2 border-white dark:border-slate-700"
            >
              {/*
               * FOTO KECIL KIRI BAWAH
               * Ukuran: 320 × 180 px  |  Rasio: 16:9
               */}
              <Image
                src="/images/hero-small-bottom.png"
                alt="Foto komunitas belajar bahasa Arab"
                width={320}
                height={180}
                className="w-full h-auto object-cover"
              />
            </motion.div>


            <div className="absolute -inset-4 rounded-3xl border border-sky-200/40 dark:border-sky-800/30 pointer-events-none" />
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex flex-col items-center gap-1 text-slate-400 text-xs animate-bounce-y">
            <span>Scroll untuk lanjut</span>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
