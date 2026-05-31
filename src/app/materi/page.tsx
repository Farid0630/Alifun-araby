"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Clock, ChevronRight, GraduationCap, Search, Library, CheckCircle2 } from "lucide-react";
import { materiList, materiCategories } from "@/data/materi";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Progress } from "@/components/ui/progress";
import { ThreeBgDynamic } from "@/components/ui/three-bg-dynamic";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const levelColors: Record<string, string> = {
  pemula: "default",
  menengah: "gold",
  lanjutan: "purple",
};

const levelLabels: Record<string, string> = {
  pemula: "Pemula",
  menengah: "Menengah",
  lanjutan: "Lanjutan",
};

const categoryColorMap: Record<string, string> = {
  hijaiyah:   "from-sky-500 to-blue-500",
  mufradat:   "from-blue-500 to-cyan-500",
  nahwu:      "from-amber-500 to-orange-500",
  sharaf:     "from-indigo-500 to-violet-500",
  percakapan: "from-rose-500 to-pink-500",
  grammar:    "from-blue-500 to-green-500",
};

export default function MateriPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState("");

  // Progress dari localStorage: { [materiId]: string[] (completed topic arabics) }
  const [progress] = useLocalStorage<Record<string, string[]>>("alifun-materi-progress", {});

  const getProgress = (id: string, total: number) => {
    const done = (progress[id] ?? []).length;
    return { done, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
  };

  const filtered = materiList.filter((m) => {
    const matchCat = activeCategory === "all" || m.category === activeCategory;
    const matchSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.arabicTitle.includes(search) ||
      m.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalDone = materiList.filter((m) => {
    const { pct } = getProgress(m.id, m.topics.length);
    return pct === 100;
  }).length;

  return (
    <div className="min-h-screen bg-gradient-hero relative">
      <ThreeBgDynamic className="opacity-40" />
      {/* Header */}
      <div className="relative z-10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-b border-slate-200/60 dark:border-slate-700/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 text-sm text-sky-600 dark:text-sky-400 mb-3">
              <GraduationCap className="h-4 w-4" />
              Kurikulum Terstruktur
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Materi <span className="gradient-text">Pembelajaran</span>
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-xl">
              Dari huruf Hijaiyah hingga Nahwu-Sharaf — kurikulum lengkap yang disusun oleh ahli bahasa Arab berpengalaman.
            </p>

            {/* Overall progress */}
            <div className="mt-4 inline-flex items-center gap-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2.5 shadow-sm">
              <CheckCircle2 className="h-4 w-4 text-sky-500 shrink-0" />
              <div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{totalDone}</span>
                <span className="text-sm text-slate-500"> / {materiList.length} materi selesai</span>
              </div>
              <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-500 rounded-full transition-all"
                  style={{ width: `${(totalDone / materiList.length) * 100}%` }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
          <Input
            leftIcon={<Search className="h-4 w-4" />}
            placeholder="Cari materi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </motion.div>

        {/* Category Tabs */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="flex gap-2 flex-wrap mb-8">
          {materiCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border",
                activeCategory === cat.id
                  ? "bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-500/20"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-sky-300 dark:hover:border-sky-700"
              )}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{filtered.length} materi ditemukan</p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="h-20 w-20 rounded-2xl bg-sky-50 dark:bg-sky-950/40 flex items-center justify-center mx-auto mb-5">
              <Library className="h-10 w-10 text-sky-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Materi tidak ditemukan</h3>
            <p className="text-slate-500">Coba cari dengan kata kunci lain atau ubah filter kategori.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((materi, i) => {
              const { done, pct } = getProgress(materi.id, materi.topics.length);
              const gradient = categoryColorMap[materi.category] || "from-sky-500 to-blue-500";
              const isCompleted = pct === 100;
              const isStarted = done > 0;

              return (
                <motion.div
                  key={materi.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                >
                  <Link
                    href={`/materi/${materi.id}`}
                    className={cn(
                      "group block rounded-2xl bg-white dark:bg-slate-800 border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300",
                      isCompleted
                        ? "border-sky-300 dark:border-sky-700"
                        : "border-slate-200 dark:border-slate-700 hover:border-sky-200 dark:hover:border-sky-800"
                    )}
                  >
                    {/* Top gradient bar */}
                    <div className={`h-1.5 bg-linear-to-r ${gradient}`} />

                    <div className="p-6">
                      {/* Icon + badge */}
                      <div className="flex items-start justify-between mb-4">
                        <div className={`h-14 w-14 rounded-2xl bg-linear-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <span className="text-3xl text-white font-bold" style={{ fontFamily: "var(--font-cairo)" }}>
                            {materi.icon}
                          </span>
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                          <Badge variant={levelColors[materi.level] as "default" | "gold"}>
                            {levelLabels[materi.level]}
                          </Badge>
                          {isCompleted && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 px-2 py-0.5 rounded-full">
                              <CheckCircle2 className="h-3 w-3" /> Selesai
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Arabic title */}
                      <p className="text-sm text-sky-600 dark:text-sky-400 mb-0.5" style={{ fontFamily: "var(--font-cairo)" }}>
                        {materi.arabicTitle}
                      </p>

                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                        {materi.title}
                      </h3>

                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5 line-clamp-2">
                        {materi.description}
                      </p>

                      {/* Progress */}
                      <div className="mb-5">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="text-slate-500">{done}/{materi.topics.length} topik selesai</span>
                          <span className={pct > 0 ? "text-sky-600 dark:text-sky-400 font-semibold" : "text-slate-400"}>
                            {pct > 0 ? `${pct}%` : "Belum dimulai"}
                          </span>
                        </div>
                        <Progress value={pct} size="sm" />
                      </div>

                      {/* Topics preview */}
                      <div className="flex gap-1.5 flex-wrap mb-5">
                        {materi.topics.slice(0, 3).map((topic) => (
                          <span
                            key={topic.arabic}
                            className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg px-2.5 py-1"
                            style={{ fontFamily: "var(--font-cairo)" }}
                          >
                            {topic.arabic}
                          </span>
                        ))}
                        {materi.topics.length > 3 && (
                          <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-500 rounded-lg px-2 py-1">
                            +{materi.topics.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock className="h-3.5 w-3.5" />
                          {materi.duration}
                        </div>
                        <span className="flex items-center gap-1.5 text-sm font-semibold text-sky-600 dark:text-sky-400 group-hover:gap-2.5 transition-all">
                          {!isStarted ? "Mulai Belajar" : isCompleted ? "Lihat Ulang" : "Lanjutkan"}
                          <ChevronRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
