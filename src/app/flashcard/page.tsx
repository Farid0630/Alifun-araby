"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Volume2, RotateCcw, Check, X, ChevronLeft, ChevronRight, Layers, BookOpen, PartyPopper, CheckCircle2, XCircle } from "lucide-react";
import { flashcards, flashcardCategories, type Flashcard } from "@/data/flashcard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ThreeBgDynamic } from "@/components/ui/three-bg-dynamic";

type CardState = "idle" | "flipped";

export default function FlashcardPage() {
  const [category, setCategory] = useState("all");
  const [index, setIndex] = useState(0);
  const [cardState, setCardState] = useState<CardState>("idle");
  const [known, setKnown] = useState<Set<string>>(new Set());
  const [unknown, setUnknown] = useState<Set<string>>(new Set());
  const [direction, setDirection] = useState(0);
  const [done, setDone] = useState(false);

  const cards = category === "all" ? flashcards : flashcards.filter((c) => c.category === category);
  const card = cards[index];
  const total = cards.length;
  const progress = ((index) / total) * 100;

  const flip = () => setCardState((s) => s === "idle" ? "flipped" : "idle");

  const next = useCallback((knew: boolean) => {
    if (knew) {
      setKnown((prev) => new Set([...prev, card.id]));
    } else {
      setUnknown((prev) => new Set([...prev, card.id]));
    }

    if (index < total - 1) {
      setDirection(knew ? 1 : -1);
      setIndex((i) => i + 1);
      setCardState("idle");
    } else {
      setDone(true);
    }
  }, [card, index, total]);

  const reset = () => {
    setIndex(0);
    setCardState("idle");
    setKnown(new Set());
    setUnknown(new Set());
    setDone(false);
    setDirection(0);
  };

  if (done) {
    const knownCount = known.size;
    const unknownCount = unknown.size;
    const pct = Math.round((knownCount / total) * 100);
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-sm w-full"
        >
          <div className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden text-center">
            <div className="bg-linear-to-br from-sky-500 to-blue-600 p-10">
              <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                <PartyPopper className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-extrabold text-white">Sesi Selesai!</h2>
              <p className="text-sky-100 mt-1">{total} kartu telah dipelajari</p>
            </div>
            <div className="p-8 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 p-4">
                  <p className="text-3xl font-black text-sky-600 dark:text-sky-400">{knownCount}</p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center justify-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-sky-500" /> Sudah Tahu</p>
                </div>
                <div className="rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 p-4">
                  <p className="text-3xl font-black text-rose-600 dark:text-rose-400">{unknownCount}</p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center justify-center gap-1"><XCircle className="h-3.5 w-3.5 text-rose-500" /> Perlu Belajar</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600 dark:text-slate-300">Penguasaan</span>
                  <span className="font-bold text-sky-600">{pct}%</span>
                </div>
                <Progress value={pct} />
              </div>
              <div className="flex gap-3">
                <Button onClick={reset} className="flex-1" variant="outline">
                  <RotateCcw className="h-4 w-4" /> Ulangi
                </Button>
                <Button
                  onClick={() => { setUnknown(new Set()); setIndex(0); setCardState("idle"); setDone(false); setKnown(new Set()); setCategory("all"); }}
                  className="flex-1"
                >
                  Semua Kartu
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero relative">
      <ThreeBgDynamic className="opacity-40" />
      {/* Header */}
      <div className="relative z-10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-b border-slate-200/60 dark:border-slate-700/40">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 text-sm text-sky-600 dark:text-sky-400 mb-2">
              <Layers className="h-4 w-4" /> Flashcard Digital
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Hafal Kosakata dengan <span className="gradient-text">Flashcard</span>
            </h1>
            <p className="mt-1 text-slate-600 dark:text-slate-300 text-sm">Klik kartu untuk melihat terjemahan. Swipe atau gunakan tombol untuk navigasi.</p>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap">
          {flashcardCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setCategory(cat.id); setIndex(0); setCardState("idle"); reset(); }}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all border",
                category === cat.id
                  ? "bg-sky-500 text-white border-sky-500"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-sky-300"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">{index + 1} / {total} kartu</span>
            <div className="flex gap-3">
              <span className="text-sky-600 dark:text-sky-400 text-xs flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5" /> {known.size}</span>
              <span className="text-rose-500 text-xs flex items-center gap-1"><XCircle className="h-3.5 w-3.5" /> {unknown.size}</span>
            </div>
          </div>
          <Progress value={progress} />
        </div>

        {/* Flashcard */}
        <div className="flex justify-center">
          <div className="perspective w-full max-w-sm" style={{ height: 320 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${card.id}-${cardState}`}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 60 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <div
                  className="relative w-full h-full cursor-pointer select-none"
                  onClick={flip}
                >
                  {/* Front */}
                  <motion.div
                    animate={{ rotateY: cardState === "flipped" ? 180 : 0 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 25 }}
                    className="absolute inset-0 backface-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="w-full h-full rounded-3xl bg-gradient-to-br from-sky-500 to-blue-600 shadow-2xl shadow-sky-500/30 flex flex-col items-center justify-center p-8 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <span className="text-[160px] text-white font-bold" style={{ fontFamily: "var(--font-cairo)" }}>{card.arabic[0]}</span>
                      </div>
                      <Badge variant="slate" className="absolute top-4 left-4 bg-white/20 text-white border-white/20 text-xs">
                        {card.category}
                      </Badge>
                      <p className="text-xs text-sky-100 mb-2 uppercase tracking-widest relative">Klik untuk balik</p>
                      <p className="text-7xl font-black text-white relative mb-4" style={{ fontFamily: "var(--font-cairo)" }}>
                        {card.arabic}
                      </p>
                      <div className="relative flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5">
                        <Volume2 className="h-3.5 w-3.5 text-white/80" />
                        <p className="text-sm text-white/90">{card.latin}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Back */}
                  <motion.div
                    initial={{ rotateY: 180 }}
                    animate={{ rotateY: cardState === "flipped" ? 360 : 180 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 25 }}
                    className="absolute inset-0 backface-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="w-full h-full rounded-3xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 shadow-2xl flex flex-col items-center justify-center p-8 text-center space-y-4">
                      <p className="text-4xl font-black text-slate-900 dark:text-white">{card.indonesian}</p>
                      <p className="text-sm text-sky-600 dark:text-sky-400 italic">{card.latin}</p>
                      {card.example && (
                        <div className="w-full rounded-xl bg-slate-50 dark:bg-slate-700/50 p-4 text-left space-y-1">
                          <p className="text-lg text-slate-900 dark:text-white text-right" style={{ fontFamily: "var(--font-cairo)", direction: "rtl" }}>
                            {card.example}
                          </p>
                          <p className="text-xs text-slate-500">{card.exampleLatin}</p>
                          <p className="text-xs text-slate-600 dark:text-slate-300">{card.exampleIndonesian}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => next(false)}
            className="flex flex-col items-center gap-1.5 w-24 h-20 rounded-2xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors"
          >
            <X className="h-7 w-7 mt-3" />
            <span className="text-xs font-semibold">Belum Tahu</span>
          </motion.button>

          <button
            onClick={flip}
            className="h-14 w-14 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-sky-600 hover:border-sky-300 transition-all shadow-sm"
          >
            <RotateCcw className="h-5 w-5" />
          </button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => next(true)}
            className="flex flex-col items-center gap-1.5 w-24 h-20 rounded-2xl border-2 border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-900/50 transition-colors"
          >
            <Check className="h-7 w-7 mt-3" />
            <span className="text-xs font-semibold">Sudah Tahu</span>
          </motion.button>
        </div>

        {/* Nav */}
        <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
          <button
            onClick={() => { if (index > 0) { setIndex(i => i - 1); setCardState("idle"); } }}
            disabled={index === 0}
            className="flex items-center gap-1 hover:text-sky-600 disabled:opacity-40 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" /> Sebelumnya
          </button>
          <span className="text-xs">{index + 1} / {total}</span>
          <button
            onClick={() => next(false)}
            className="flex items-center gap-1 hover:text-sky-600 transition-colors"
          >
            Lewati <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
