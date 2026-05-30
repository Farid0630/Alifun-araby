"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Lock, ChevronDown, ArrowRight, Flame, BookOpen, MessageCircle, BookMarked, PenLine, GraduationCap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const roadmapSteps = [
  {
    level: "Level 1",
    title: "Pengenalan",
    description: "Mulai dari nol! Pelajari alfabet Arab, harakat, dan cara membaca tulisan Arab dengan benar.",
    topics: ["28 Huruf Hijaiyah", "Harakat dasar", "Cara baca Arab", "Angka Arab"],
    status: "current",
    href: "/materi?category=hijaiyah",
    icon: BookOpen,
    progress: 60,
    color: "sky",
    lessons: "10 pelajaran · 2 jam",
  },
  {
    level: "Level 2",
    title: "Kosakata Dasar",
    description: "Bangun fondasi kosakata dengan 200+ kata paling penting dalam kehidupan sehari-hari.",
    topics: ["Benda sehari-hari", "Warna & angka", "Keluarga & orang", "Waktu & hari"],
    status: "upcoming",
    href: "/materi?category=mufradat",
    icon: BookMarked,
    progress: 0,
    color: "violet",
    lessons: "12 pelajaran · 3 jam",
  },
  {
    level: "Level 3",
    title: "Percakapan Dasar",
    description: "Mulai berbicara! Pelajari ekspresi salam, perkenalan, dan percakapan sederhana.",
    topics: ["Salam & sapaan", "Perkenalan diri", "Pertanyaan dasar", "Respon umum"],
    status: "upcoming",
    href: "/materi?category=percakapan",
    icon: MessageCircle,
    progress: 0,
    color: "blue",
    lessons: "8 pelajaran · 2 jam",
  },
  {
    level: "Level 4",
    title: "Nahwu Dasar",
    description: "Pahami struktur kalimat Arab: isim, fi'il, harf, dan kaidah dasar nahwu.",
    topics: ["Isim & Fi'il", "Jumlah Ismiyyah", "Jumlah Fi'liyyah", "Harf Jarr"],
    status: "locked",
    href: "/materi?category=nahwu",
    icon: PenLine,
    progress: 0,
    color: "amber",
    lessons: "15 pelajaran · 4 jam",
  },
  {
    level: "Level 5",
    title: "Sharaf & Tashrif",
    description: "Kuasai perubahan bentuk kata (tashrif) untuk kata kerja dan kata benda.",
    topics: ["Fi'il Madhi", "Fi'il Mudhari", "Fi'il Amr", "Isim Fa'il"],
    status: "locked",
    href: "/materi?category=sharaf",
    icon: PenLine,
    progress: 0,
    color: "rose",
    lessons: "14 pelajaran · 4 jam",
  },
  {
    level: "Level 6",
    title: "Tingkat Menengah",
    description: "Tingkatkan kemampuan dengan teks-teks Arab, kitab sederhana, dan percakapan kompleks.",
    topics: ["Baca teks Arab", "Kitab sederhana", "Percakapan lanjut", "Menulis Arab"],
    status: "locked",
    href: "/materi",
    icon: GraduationCap,
    progress: 0,
    color: "indigo",
    lessons: "20 pelajaran · 6 jam",
  },
];

const colorMap: Record<string, { ring: string; num: string; badge: string; bar: string; tag: string; hover: string }> = {
  sky:    { ring: "ring-sky-400/40 border-sky-300 dark:border-sky-700",    num: "bg-sky-500 border-sky-500",       badge: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",    bar: "bg-sky-500",    tag: "bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800",    hover: "hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-sky-100 dark:hover:shadow-sky-900/20" },
  violet: { ring: "ring-violet-400/40 border-violet-300 dark:border-violet-700", num: "bg-violet-500 border-violet-500", badge: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300", bar: "bg-violet-500", tag: "bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800", hover: "hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-violet-100 dark:hover:shadow-violet-900/20" },
  blue:   { ring: "ring-blue-400/40 border-blue-300 dark:border-blue-700",   num: "bg-blue-500 border-blue-500",     badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",   bar: "bg-blue-500",   tag: "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",   hover: "hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-blue-100 dark:hover:shadow-blue-900/20" },
  amber:  { ring: "", num: "", badge: "", bar: "bg-amber-500", tag: "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700", hover: "" },
  rose:   { ring: "", num: "", badge: "", bar: "bg-rose-500",  tag: "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700", hover: "" },
  indigo: { ring: "", num: "", badge: "", bar: "bg-indigo-500",tag: "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700", hover: "" },
};

export function Roadmap() {
  const [expanded, setExpanded] = useState<number>(0); // buka level 1 by default
  const [lockedShake, setLockedShake] = useState<number | null>(null);

  const toggle = (i: number) => {
    const step = roadmapSteps[i];
    if (step.status === "locked") {
      setLockedShake(i);
      setTimeout(() => setLockedShake(null), 600);
      return;
    }
    setExpanded(prev => (prev === i ? -1 : i));
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 border-t border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-widest mb-2">Jalur Belajar</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
            Roadmap Belajar <span className="gradient-text">Terstruktur</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Dari nol hingga fasih, ikuti jalur belajar yang telah dirancang oleh para ahli bahasa Arab.
          </p>

          {/* Overall progress bar */}
          <div className="mt-6 max-w-sm mx-auto">
            <div className="flex justify-between text-xs text-slate-500 mb-1.5">
              <span>Progress keseluruhan</span>
              <span className="font-semibold text-sky-600">Level 1 / 6</span>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "10%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                className="h-full bg-linear-to-r from-sky-500 to-blue-600 rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="space-y-3">
          {roadmapSteps.map((step, i) => {
            const isLocked   = step.status === "locked";
            const isCurrent  = step.status === "current";
            const isExpanded = expanded === i;
            const c = colorMap[step.color];
            const isShaking  = lockedShake === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                animate={isShaking ? { x: [-6, 6, -5, 5, -3, 3, 0] } : {}}
              >
                {/* Card */}
                <div
                  onClick={() => toggle(i)}
                  className={cn(
                    "rounded-2xl border bg-white dark:bg-slate-900 transition-all duration-200 overflow-hidden",
                    isLocked
                      ? "opacity-60 cursor-not-allowed border-slate-200 dark:border-slate-700"
                      : cn(
                          "cursor-pointer shadow-sm hover:shadow-md",
                          isCurrent && isExpanded
                            ? `ring-2 ${c.ring} border-transparent`
                            : isCurrent
                            ? `border-sky-200 dark:border-sky-800 ${c.hover}`
                            : `border-slate-200 dark:border-slate-700 ${c.hover}`
                        )
                  )}
                >
                  {/* Header row */}
                  <div className="flex items-center gap-4 p-5">
                    {/* Number bubble */}
                    <div className={cn(
                      "h-10 w-10 rounded-full shrink-0 flex items-center justify-center text-sm font-bold border-2 transition-all",
                      isLocked
                        ? "border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 text-slate-400"
                        : isCurrent
                        ? cn("text-white", c.num)
                        : "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-500"
                    )}>
                      {isLocked ? <Lock className="h-4 w-4" /> : step.status === "completed" ? <CheckCircle2 className="h-5 w-5" /> : <span>{i + 1}</span>}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wide">{step.level}</span>
                        {isCurrent && (
                          <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold", c.badge)}>
                            <Flame className="h-3 w-3" /> Sedang Belajar
                          </span>
                        )}
                        {step.status === "upcoming" && (
                          <span className="rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-medium px-2.5 py-0.5">
                            Akan Datang
                          </span>
                        )}
                        {isLocked && (
                          <span className="rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 text-xs font-medium px-2.5 py-0.5 flex items-center gap-1">
                            <Lock className="h-2.5 w-2.5" /> Terkunci
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">{step.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{step.lessons}</p>
                    </div>

                    {/* Chevron */}
                    {!isLocked && (
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="shrink-0 text-slate-400"
                      >
                        <ChevronDown className="h-5 w-5" />
                      </motion.div>
                    )}
                  </div>

                  {/* Progress bar (current only, in header) */}
                  {isCurrent && (
                    <div className="px-5 pb-3">
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Progress level ini</span>
                        <span className="font-semibold text-sky-600">{step.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${step.progress}%` }}
                          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                          className={cn("h-full rounded-full", c.bar)}
                        />
                      </div>
                    </div>
                  )}

                  {/* Expanded content */}
                  <AnimatePresence>
                    {isExpanded && !isLocked && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 border-t border-slate-100 dark:border-slate-800">
                          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                            {step.description}
                          </p>

                          {/* Topics */}
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Topik Pembelajaran</p>
                          <motion.div
                            initial="hidden"
                            animate="show"
                            variants={{ show: { transition: { staggerChildren: 0.06 } } }}
                            className="flex flex-wrap gap-2 mb-5"
                          >
                            {step.topics.map((topic) => (
                              <motion.span
                                key={topic}
                                variants={{ hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1 } }}
                                className={cn("rounded-lg border text-xs px-3 py-1.5 font-medium", c.tag)}
                              >
                                {topic}
                              </motion.span>
                            ))}
                          </motion.div>

                          {/* Action button */}
                          {isCurrent ? (
                            <Link
                              href={step.href}
                              onClick={e => e.stopPropagation()}
                              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm hover:shadow-md"
                            >
                              Lanjutkan Belajar
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          ) : (
                            <Link
                              href={step.href}
                              onClick={e => e.stopPropagation()}
                              className="inline-flex items-center gap-2 border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-sky-400 hover:text-sky-600 dark:hover:text-sky-400 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                            >
                              Lihat Materi
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Unlock hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-slate-400 mt-6 flex items-center justify-center gap-1.5"
        >
          <Lock className="h-3.5 w-3.5" />
          Level terkunci akan terbuka setelah menyelesaikan level sebelumnya
        </motion.p>
      </div>
    </section>
  );
}
