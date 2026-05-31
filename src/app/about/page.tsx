"use client";

import { motion } from "framer-motion";
import { Heart, Target, Lightbulb, Users, BookOpen, Award, ArrowRight, Leaf, Bot, Trophy, Rocket, Moon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThreeBgDynamic } from "@/components/ui/three-bg-dynamic";


const values = [
  { icon: Heart, title: "Belajar dengan Hati", desc: "Kami percaya belajar bahasa Arab adalah ibadah. Setiap fitur dirancang dengan cinta untuk memudahkan perjalananmu.", color: "text-rose-500 bg-rose-50 dark:bg-rose-950/30" },
  { icon: Target, title: "Berbasis Sains", desc: "Metode spaced repetition, active recall, dan pendekatan berbasis AI yang telah terbukti secara ilmiah.", color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30" },
  { icon: Lightbulb, title: "Inovasi Terus-menerus", desc: "Kami terus memperbarui teknologi dan konten untuk memberikan pengalaman belajar terbaik.", color: "text-amber-500 bg-amber-50 dark:bg-amber-950/30" },
  { icon: Users, title: "Komunitas Inklusif", desc: "Platform untuk semua kalangan — pemula, santri, pelajar, profesional, hingga lansia.", color: "text-sky-500 bg-sky-50 dark:bg-sky-950/30" },
];

const milestones: { year: string; event: string; icon: LucideIcon }[] = [
  { year: "2023", event: "Alifun Araby didirikan dengan visi memudahkan belajar bahasa Arab", icon: Leaf },
  { year: "2024", event: "Meluncurkan AI Arabic Assistant pertama di Indonesia", icon: Bot },
  { year: "2025", event: "Meraih 50.000 pengguna aktif dan mendapatkan penghargaan EdTech terbaik", icon: Trophy },
  { year: "2026", event: "Platform 2.0 dengan fitur yang lebih canggih dan pengalaman lebih personal", icon: Rocket },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
        <ThreeBgDynamic className="opacity-50" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-sky-500/5 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/50 px-4 py-1.5 text-sm text-sky-700 dark:text-sky-300 mb-6">
              <Moon className="h-3.5 w-3.5" /> Tentang Kami
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
              Kami Bermimpi Menjadikan{" "}
              <span className="gradient-text">Bahasa Arab</span>{" "}
              Mudah untuk Semua
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto mb-10">
              Alifun Araby lahir dari keyakinan bahwa setiap Muslim berhak bisa memahami bahasa Al-Quran. Dengan teknologi modern dan pendekatan yang tepat, kami membuat impian itu bisa terwujud.
            </p>

            {/* Arabic quote */}
            <div className="inline-block rounded-2xl border border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/40 px-8 py-5">
              <p className="text-3xl text-sky-700 dark:text-sky-300 font-bold mb-2" style={{ fontFamily: "var(--font-cairo)" }}>
                طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِم
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300 italic">
                &ldquo;Menuntut ilmu adalah kewajiban atas setiap Muslim.&rdquo; — HR. Ibn Majah
              </p>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Mission & Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Nilai & <span className="gradient-text">Filosofi</span> Kami
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 text-center"
              >
                <div className={`h-14 w-14 rounded-2xl ${value.color} flex items-center justify-center mx-auto mb-4`}>
                  <value.icon className={cn("h-7 w-7", value.color.split(" ")[0])} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{value.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Perjalanan <span className="gradient-text">Alifun Araby</span>
            </h2>
          </motion.div>
          <div className="space-y-6">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5"
              >
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-2xl bg-linear-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-md shrink-0">
                    <m.icon className="h-6 w-6 text-white" />
                  </div>
                  {i < milestones.length - 1 && <div className="flex-1 w-0.5 bg-sky-200 dark:bg-sky-800 mt-2" />}
                </div>
                <div className="pb-6 flex-1">
                  <span className="text-sm font-bold text-sky-600 dark:text-sky-400">{m.year}</span>
                  <p className="text-slate-800 dark:text-slate-200 font-medium mt-1">{m.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-linear-to-br from-sky-500 to-blue-600 p-12 text-white shadow-2xl shadow-sky-500/20"
          >
            <h2 className="text-2xl font-extrabold mb-3">Siap Bergabung Bersama Kami?</h2>
            <p className="text-sky-100 mb-8">Mulai perjalanan belajar bahasa Arab yang menyenangkan bersama 50.000+ pelajar Indonesia.</p>
            <Button size="xl" asChild className="bg-white text-sky-600 hover:bg-sky-50 shadow-xl">
              <Link href="/materi">
                Mulai Belajar Sekarang <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
