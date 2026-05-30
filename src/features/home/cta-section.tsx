"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThreeBgDynamic } from "@/components/ui/three-bg-dynamic";

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/*
           * ═══════════════════════════════════════════════════════
           *  BACKGROUND CTA — GANTI DENGAN GAMBAR ASLI
           *  Ukuran: 1920 × 720 px  |  Rasio: 16:6
           *  Konten: Foto suasana belajar / komunitas bahasa Arab
           *  Tambahkan overlay gelap agar teks terbaca
           * ═══════════════════════════════════════════════════════
           */}
          {/* Gradient base */}
          <div className="absolute inset-0 bg-linear-to-br from-sky-700 via-blue-700 to-indigo-800" />
          {/* 3D animation background */}
          <ThreeBgDynamic className="opacity-60" />
          {/* Dark overlay agar teks terbaca */}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/8 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/5 blur-2xl pointer-events-none" />

          {/* Content */}
          <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
            <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-sky-300 text-sm font-semibold uppercase tracking-widest mb-4">
              Platform Belajar Bahasa Arab Digital
            </motion.p>

            <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="text-3xl sm:text-5xl font-extrabold text-white mb-5 leading-tight">
              Jadikan Bahasa Arab<br />
              <span className="text-sky-300">Bukan Lagi Mimpi</span>
            </motion.h2>

            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="text-blue-100/80 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Bergabung dengan 5.000+ pelajar yang sudah merasakan cara belajar bahasa Arab yang lebih modern, efektif, dan menyenangkan.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-sky-700 hover:bg-sky-50 shadow-xl font-bold" asChild>
                <Link href="/ai-assistant" className="flex items-center gap-2">
                  Coba AI Assistant
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 hover:border-white" asChild>
                <Link href="/materi">Lihat Materi</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
