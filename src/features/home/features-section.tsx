"use client";

import { motion } from "framer-motion";
import { Brain, BookMarked, HelpCircle, CreditCard, BookOpen, BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Brain,
    title: "AI Arabic Assistant",
    description: "Chatbot AI pintar untuk translate, koreksi grammar, latihan percakapan, dan menjawab pertanyaan bahasa Arab 24/7.",
    href: "/ai-assistant",
    iconClass: "bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400",
    accentClass: "group-hover:border-violet-300 dark:group-hover:border-violet-700",
    dotClass: "bg-violet-500",
    tag: "AI",
  },
  {
    icon: BookMarked,
    title: "Kamus Pintar",
    description: "Pencarian kosakata Arab-Indonesia real-time dengan transliterasi, contoh kalimat, akar kata, dan fitur favorit.",
    href: "/kamus",
    iconClass: "bg-sky-100 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400",
    accentClass: "group-hover:border-sky-300 dark:group-hover:border-sky-700",
    dotClass: "bg-sky-500",
    tag: "Populer",
  },
  {
    icon: HelpCircle,
    title: "Quiz Interaktif",
    description: "Kuis adaptif dengan poin, badge reward, timer, dan animasi kemenangan. Bersaing dengan sesama pelajar.",
    href: "/quiz",
    iconClass: "bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400",
    accentClass: "group-hover:border-amber-300 dark:group-hover:border-amber-700",
    dotClass: "bg-amber-500",
    tag: "Seru",
  },
  {
    icon: CreditCard,
    title: "Flashcard Digital",
    description: "Kartu belajar flip dengan spaced repetition. Efektif untuk hafalan kosakata, mirip Anki namun lebih menarik.",
    href: "/flashcard",
    iconClass: "bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400",
    accentClass: "group-hover:border-blue-300 dark:group-hover:border-blue-700",
    dotClass: "bg-blue-500",
    tag: "Efektif",
  },
  {
    icon: BookOpen,
    title: "Materi Terstruktur",
    description: "Kurikulum dari Huruf Hijaiyah hingga Nahwu-Sharaf, disusun oleh pengajar bahasa Arab berpengalaman.",
    href: "/materi",
    iconClass: "bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400",
    accentClass: "group-hover:border-rose-300 dark:group-hover:border-rose-700",
    dotClass: "bg-rose-500",
    tag: "Lengkap",
  },
  {
    icon: BarChart3,
    title: "Dashboard Belajar",
    description: "Pantau progress, streak harian, statistik quiz, dan koleksi badge. Visualisasi kemajuan belajarmu.",
    href: "/dashboard",
    iconClass: "bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400",
    accentClass: "group-hover:border-green-300 dark:group-hover:border-green-700",
    dotClass: "bg-green-500",
    tag: "Progres",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0  },
};

export function FeaturesSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-widest mb-3">
            Fitur Platform
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Semua yang Kamu Butuhkan untuk{" "}
            <span className="gradient-text">Belajar Bahasa Arab</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Teknologi AI bertemu metode belajar terbukti — dalam satu platform lengkap untuk belajar bahasa Arab.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature) => (
            <motion.div key={feature.href} variants={cardVariants} transition={{ duration: 0.5 }}>
              <Link
                href={feature.href}
                className={`group relative block h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${feature.accentClass}`}
              >
                {/* Tag badge */}
                <span className={`absolute top-4 right-4 rounded-full ${feature.dotClass} bg-opacity-15 text-[10px] font-bold px-2.5 py-0.5 text-white`}
                  style={{ background: "transparent" }}
                >
                  <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold text-white ${feature.dotClass}`}>
                    {feature.tag}
                  </span>
                </span>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`h-12 w-12 rounded-2xl ${feature.iconClass} flex items-center justify-center mb-5`}
                >
                  <feature.icon className="h-6 w-6" />
                </motion.div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
                  {feature.description}
                </p>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 group-hover:gap-2.5 transition-all duration-200">
                  Pelajari lebih lanjut
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
