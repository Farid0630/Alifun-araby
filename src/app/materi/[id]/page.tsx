"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, CheckCircle2, Circle, BookOpen, Clock, ChevronDown,
  ChevronRight, ChevronLeft, Trophy, RotateCcw, Volume2,
} from "lucide-react";
import { materiList } from "@/data/materi";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const categoryColorMap: Record<string, string> = {
  hijaiyah:   "from-sky-500 to-blue-500",
  mufradat:   "from-blue-500 to-cyan-500",
  nahwu:      "from-amber-500 to-orange-500",
  sharaf:     "from-indigo-500 to-violet-500",
  percakapan: "from-rose-500 to-pink-500",
  grammar:    "from-blue-500 to-green-500",
};

export default function MateriDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const materi = materiList.find((m) => m.id === id);

  // localStorage: { [materiId]: string[] } — simpan arabic string topik yang sudah selesai
  const [progress, setProgress] = useLocalStorage<Record<string, string[]>>(
    "alifun-materi-progress",
    {}
  );

  const [expandedTopic, setExpandedTopic] = useState<number | null>(0);

  if (!materi) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 mb-4">Materi tidak ditemukan.</p>
          <Link href="/materi" className="text-sky-600 hover:underline font-medium">
            ← Kembali ke daftar materi
          </Link>
        </div>
      </div>
    );
  }

  const completedTopics: string[] = progress[materi.id] ?? [];
  const pct = Math.round((completedTopics.length / materi.topics.length) * 100);
  const isCompleted = pct === 100;
  const gradient = categoryColorMap[materi.category] || "from-sky-500 to-blue-500";

  const toggleTopic = (arabic: string) => {
    setProgress((prev) => {
      const cur = prev[materi.id] ?? [];
      const next = cur.includes(arabic)
        ? cur.filter((t) => t !== arabic)
        : [...cur, arabic];
      return { ...prev, [materi.id]: next };
    });
  };

  const markAll = () => {
    setProgress((prev) => ({
      ...prev,
      [materi.id]: materi.topics.map((t) => t.arabic),
    }));
  };

  const reset = () => {
    setProgress((prev) => {
      const next = { ...prev };
      delete next[materi.id];
      return next;
    });
    setExpandedTopic(0);
  };

  const speak = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ar-SA";
    utter.rate = 0.85;
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find((v) => v.lang.startsWith("ar"));
    if (arabicVoice) utter.voice = arabicVoice;
    window.speechSynthesis.speak(utter);
  };

  // index materi ini di list, untuk navigasi prev/next
  const currentIndex = materiList.findIndex((m) => m.id === id);
  const prevMateri = currentIndex > 0 ? materiList[currentIndex - 1] : null;
  const nextMateri = currentIndex < materiList.length - 1 ? materiList[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className={`bg-linear-to-br ${gradient} text-white`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Back */}
          <Link
            href="/materi"
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali ke Materi
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-start gap-5">
            {/* Icon */}
            <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 text-3xl font-bold shadow-lg"
              style={{ fontFamily: "var(--font-cairo)" }}>
              {materi.icon}
            </div>

            <div className="flex-1">
              <p className="text-white/70 text-sm mb-0.5" style={{ fontFamily: "var(--font-cairo)" }}>
                {materi.arabicTitle}
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold mb-1">{materi.title}</h1>
              <p className="text-white/80 text-sm mb-4 leading-relaxed max-w-xl">{materi.description}</p>

              <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
                <span className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /> {materi.topics.length} topik</span>
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {materi.duration}</span>
                <span className="capitalize rounded-full bg-white/20 px-3 py-0.5 text-xs font-semibold">{materi.level}</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6 bg-white/10 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2 text-sm">
              <span className="text-white/80">Progress belajar</span>
              <span className="font-bold">{completedTopics.length}/{materi.topics.length} topik · {pct}%</span>
            </div>
            <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Completion banner */}
        <AnimatePresence>
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-6 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 p-5 flex items-center gap-4"
            >
              <div className="h-12 w-12 rounded-full bg-sky-500 flex items-center justify-center shrink-0">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sky-800 dark:text-sky-200">Selamat! Kamu telah menyelesaikan materi ini.</p>
                <p className="text-sm text-sky-600 dark:text-sky-400">Semua {materi.topics.length} topik sudah dipelajari.</p>
              </div>
              <button onClick={reset} className="text-xs text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1">
                <RotateCcw className="h-3.5 w-3.5" /> Ulangi
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action bar */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-slate-900 dark:text-white text-lg">Daftar Topik</h2>
          <div className="flex gap-2">
            {!isCompleted && (
              <button
                onClick={markAll}
                className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-sky-50 dark:hover:bg-sky-950/40 transition-colors"
              >
                <CheckCircle2 className="h-3.5 w-3.5" /> Tandai semua selesai
              </button>
            )}
            {completedTopics.length > 0 && (
              <button
                onClick={reset}
                className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
            )}
          </div>
        </div>

        {/* Topics accordion */}
        <div className="space-y-3 mb-10">
          {materi.topics.map((topic, i) => {
            const isDone = completedTopics.includes(topic.arabic);
            const isOpen = expandedTopic === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "rounded-2xl border bg-white dark:bg-slate-900 overflow-hidden transition-all duration-200",
                  isDone
                    ? "border-sky-300 dark:border-sky-700 shadow-sm shadow-sky-100 dark:shadow-sky-900/20"
                    : "border-slate-200 dark:border-slate-700",
                  !isOpen && "hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm"
                )}
              >
                {/* Topic header — click to expand */}
                <button
                  onClick={() => setExpandedTopic(isOpen ? null : i)}
                  className="w-full flex items-center gap-4 p-5 text-left"
                >
                  {/* Done checkbox */}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleTopic(topic.arabic); }}
                    className={cn(
                      "h-7 w-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200",
                      isDone
                        ? "bg-sky-500 border-sky-500 text-white scale-110"
                        : "border-slate-300 dark:border-slate-600 hover:border-sky-400 text-transparent hover:text-sky-300"
                    )}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </button>

                  {/* Arabic + Latin */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        className={cn(
                          "text-2xl font-bold transition-colors",
                          isDone ? "text-sky-600 dark:text-sky-400" : "text-slate-900 dark:text-white"
                        )}
                        style={{ fontFamily: "var(--font-cairo)" }}
                      >
                        {topic.arabic}
                      </span>
                      <span className="text-xs text-sky-500 font-medium bg-sky-50 dark:bg-sky-950/40 px-2 py-0.5 rounded-md">
                        {topic.latin}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{topic.indonesian}</p>
                  </div>

                  {/* Speak + chevron */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); speak(topic.arabic); }}
                      title="Dengarkan pengucapan"
                      className="h-8 w-8 rounded-full bg-sky-50 dark:bg-sky-950/40 flex items-center justify-center text-sky-500 hover:bg-sky-100 dark:hover:bg-sky-900/60 transition-colors"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    </motion.div>
                  </div>
                </button>

                {/* Expanded: example + done button */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0 border-t border-slate-100 dark:border-slate-800">
                        {topic.example && (
                          <div className="mt-4 rounded-xl bg-slate-50 dark:bg-slate-800 p-4">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Contoh Penggunaan</p>
                            <p
                              className="text-xl font-bold text-slate-900 dark:text-white text-right leading-loose"
                              style={{ fontFamily: "var(--font-cairo)", direction: "rtl" }}
                            >
                              {topic.example}
                            </p>
                            <button
                              onClick={() => speak(topic.example!)}
                              className="mt-2 flex items-center gap-1.5 text-xs text-sky-600 dark:text-sky-400 hover:underline"
                            >
                              <Volume2 className="h-3.5 w-3.5" /> Dengar contoh
                            </button>
                          </div>
                        )}

                        <div className="mt-4 flex items-center justify-between">
                          <button
                            onClick={() => toggleTopic(topic.arabic)}
                            className={cn(
                              "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all",
                              isDone
                                ? "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                : "bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-500/25"
                            )}
                          >
                            {isDone ? (
                              <><RotateCcw className="h-3.5 w-3.5" /> Tandai belum selesai</>
                            ) : (
                              <><CheckCircle2 className="h-3.5 w-3.5" /> Tandai selesai</>
                            )}
                          </button>

                          {/* Nav to next topic */}
                          {i < materi.topics.length - 1 && (
                            <button
                              onClick={() => setExpandedTopic(i + 1)}
                              className="text-xs text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 flex items-center gap-1 transition-colors"
                            >
                              Topik berikutnya <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Prev / Next materi navigation */}
        <div className="flex items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-700 pt-8">
          {prevMateri ? (
            <Link
              href={`/materi/${prevMateri.id}`}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-md transition-all group"
            >
              <ChevronLeft className="h-4 w-4 text-slate-400 group-hover:text-sky-500" />
              <div>
                <p className="text-xs text-slate-400">Sebelumnya</p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-sky-600 dark:group-hover:text-sky-400">
                  {prevMateri.title}
                </p>
              </div>
            </Link>
          ) : <div />}

          {nextMateri ? (
            <Link
              href={`/materi/${nextMateri.id}`}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-md transition-all group text-right"
            >
              <div>
                <p className="text-xs text-slate-400">Berikutnya</p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-sky-600 dark:group-hover:text-sky-400">
                  {nextMateri.title}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-sky-500" />
            </Link>
          ) : (
            <Link
              href="/materi"
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white transition-colors shadow-md"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-sm font-semibold">Selesai</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
