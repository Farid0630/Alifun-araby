"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle, Timer, Trophy, CheckCircle, XCircle,
  ArrowRight, RefreshCw, Star, Zap
} from "lucide-react";
import { quizSets } from "@/data/quiz";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type QuizState = "select" | "playing" | "result";

const difficultyConfig: Record<string, { label: string; color: string; variant: string }> = {
  mudah: { label: "Mudah", color: "text-sky-600", variant: "default" },
  sedang: { label: "Sedang", color: "text-amber-600", variant: "gold" },
  sulit: { label: "Sulit", color: "text-rose-600", variant: "rose" },
};

function Confetti({ active }: { active: boolean }) {
  const colors = ["#10b981", "#14b8a6", "#f59e0b", "#6366f1", "#ec4899"];
  if (!active) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -20, x: Math.random() * window.innerWidth, opacity: 1, rotate: 0 }}
          animate={{ y: window.innerHeight + 50, opacity: 0, rotate: Math.random() * 720 }}
          transition={{ duration: 2 + Math.random() * 2, delay: Math.random() * 0.5 }}
          className="absolute w-3 h-3 rounded-sm"
          style={{ background: colors[i % colors.length] }}
        />
      ))}
    </div>
  );
}

export default function QuizPage() {
  const [state, setState] = useState<QuizState>("select");
  const [selectedSet, setSelectedSet] = useState(quizSets[0]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const question = selectedSet.questions[currentQ];
  const totalQ = selectedSet.questions.length;
  const progress = ((currentQ + 1) / totalQ) * 100;

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    setTimeLeft(30);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          stopTimer();
          if (!answered) {
            setAnswered(true);
            setSelected("__timeout__");
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, [stopTimer, answered]);

  const startQuiz = (set: typeof quizSets[0]) => {
    setSelectedSet(set);
    setCurrentQ(0);
    setScore(0);
    setCorrectCount(0);
    setSelected(null);
    setAnswered(false);
    setState("playing");
    startTimer();
  };

  const handleAnswer = (answer: string) => {
    if (answered) return;
    stopTimer();
    setSelected(answer);
    setAnswered(true);

    const isCorrect = answer === question.answer;
    if (isCorrect) {
      setScore((s) => s + question.points);
      setCorrectCount((c) => c + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  const nextQuestion = () => {
    if (currentQ < totalQ - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswered(false);
      startTimer();
    } else {
      stopTimer();
      setState("result");
    }
  };

  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);

  const pct = Math.round((correctCount / totalQ) * 100);
  const grade = pct >= 90 ? "Sempurna!" : pct >= 70 ? "Bagus!" : pct >= 50 ? "Lumayan" : "Perlu Latihan";
  const gradeColor = pct >= 90 ? "text-sky-500" : pct >= 70 ? "text-blue-500" : pct >= 50 ? "text-amber-500" : "text-rose-500";

  if (state === "select") {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-b border-slate-200/60 dark:border-slate-700/40">
          <div className="max-w-5xl mx-auto px-4 py-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 text-sm text-sky-600 dark:text-sky-400 mb-2">
                <HelpCircle className="h-4 w-4" /> Quiz Interaktif
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                Pilih <span className="gradient-text">Quiz</span>
              </h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Uji kemampuan bahasa Arab kamu dengan quiz interaktif berhadiah badge!</p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {quizSets.map((set, i) => {
              const diff = difficultyConfig[set.difficulty];
              return (
                <motion.div
                  key={set.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 card-hover cursor-pointer"
                  onClick={() => startQuiz(set)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-sky-600 dark:text-sky-400 font-medium mb-1" style={{ fontFamily: "var(--font-cairo)" }}>
                        {set.arabicTitle}
                      </p>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{set.title}</h3>
                    </div>
                    <Badge variant={diff.variant as "default" | "gold"}>{diff.label}</Badge>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-5">{set.description}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <HelpCircle className="h-4 w-4 text-sky-500" />
                      {set.totalQuestions} soal
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Timer className="h-4 w-4 text-amber-500" />
                      {Math.floor(set.duration / 60)} menit
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Zap className="h-4 w-4 text-violet-500" />
                      {set.questions.reduce((acc, q) => acc + q.points, 0)} poin
                    </span>
                  </div>
                  <Button className="w-full mt-5" size="default">
                    Mulai Quiz <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (state === "result") {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden"
        >
          <div className="bg-gradient-to-br from-sky-500 to-blue-600 p-10 text-center">
            <Trophy className="h-16 w-16 text-amber-300 mx-auto mb-4" />
            <h2 className="text-3xl font-extrabold text-white mb-1">Quiz Selesai!</h2>
            <p className={cn("text-4xl font-black mt-2", gradeColor === "text-sky-500" ? "text-white" : "text-amber-200")}>
              {grade}
            </p>
          </div>
          <div className="p-8 space-y-5">
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { v: `${score}`, l: "Total Poin", color: "text-sky-600 dark:text-sky-400" },
                { v: `${correctCount}/${totalQ}`, l: "Benar", color: "text-blue-600 dark:text-blue-400" },
                { v: `${pct}%`, l: "Akurasi", color: "text-amber-600 dark:text-amber-400" },
              ].map((s, i) => (
                <div key={i} className="rounded-xl bg-slate-50 dark:bg-slate-700/50 p-3">
                  <p className={cn("text-2xl font-black", s.color)}>{s.v}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.l}</p>
                </div>
              ))}
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600 dark:text-slate-300">Akurasi</span>
                <span className="font-bold text-sky-600 dark:text-sky-400">{pct}%</span>
              </div>
              <Progress value={pct} color={pct >= 70 ? "emerald" : pct >= 50 ? "gold" : "teal"} size="lg" />
            </div>

            {pct >= 80 && (
              <div className="rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-100 dark:bg-amber-900/60 flex items-center justify-center shrink-0">
                  <Trophy className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="font-bold text-amber-700 dark:text-amber-300 text-sm">Badge Diraih!</p>
                  <p className="text-xs text-amber-600 dark:text-amber-400">Nilai luar biasa! Kamu mendapatkan badge Bintang Quiz!</p>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button onClick={() => startQuiz(selectedSet)} className="flex-1" variant="outline">
                <RefreshCw className="h-4 w-4" /> Ulangi
              </Button>
              <Button onClick={() => setState("select")} className="flex-1">
                Quiz Lain <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Confetti active={showConfetti} />

      {/* Quiz Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-700/40 sticky top-16 z-30">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                Soal {currentQ + 1} / {totalQ}
              </span>
              <Badge variant="default">{score} poin</Badge>
            </div>

            {/* Timer */}
            <div className={cn(
              "flex items-center gap-1.5 text-sm font-bold rounded-full px-3 py-1",
              timeLeft <= 10
                ? "text-rose-600 bg-rose-50 dark:bg-rose-950/40 animate-pulse"
                : "text-sky-600 bg-sky-50 dark:bg-sky-950/40"
            )}>
              <Timer className="h-4 w-4" />
              {timeLeft}s
            </div>
          </div>
          <Progress value={progress} size="sm" />
        </div>
      </div>

      {/* Question */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Question card */}
            <div className="rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg p-8 text-center">
              <p className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-widest mb-3">
                {question.category} • {question.points} poin
              </p>
              {question.arabicQuestion && (
                <p className="text-5xl font-black text-slate-900 dark:text-white mb-4" style={{ fontFamily: "var(--font-cairo)" }}>
                  {question.arabicQuestion}
                </p>
              )}
              <p className="text-lg font-semibold text-slate-800 dark:text-slate-100 leading-relaxed">
                {question.question}
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {question.options?.map((option, i) => {
                const isSelected = selected === option;
                const isCorrect = option === question.answer;
                const showResult = answered;

                return (
                  <motion.button
                    key={option}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => handleAnswer(option)}
                    disabled={answered}
                    className={cn(
                      "relative rounded-2xl border-2 p-5 text-left font-semibold transition-all duration-200",
                      !showResult && "hover:border-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30 cursor-pointer",
                      !showResult && "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100",
                      showResult && isCorrect && "border-sky-500 bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300",
                      showResult && isSelected && !isCorrect && "border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300",
                      showResult && !isSelected && !isCorrect && "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 opacity-60",
                      "disabled:cursor-default"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span className={cn(
                        "h-8 w-8 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0",
                        !showResult && "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300",
                        showResult && isCorrect && "bg-sky-500 text-white",
                        showResult && isSelected && !isCorrect && "bg-rose-500 text-white",
                        showResult && !isSelected && !isCorrect && "bg-slate-100 dark:bg-slate-700 text-slate-400"
                      )}>
                        {showResult
                          ? isCorrect
                            ? <CheckCircle className="h-4 w-4" />
                            : isSelected
                            ? <XCircle className="h-4 w-4" />
                            : String.fromCharCode(65 + i)
                          : String.fromCharCode(65 + i)
                        }
                      </span>
                      {option}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation & Next */}
            <AnimatePresence>
              {answered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className={cn(
                    "rounded-2xl border p-5",
                    selected === question.answer
                      ? "bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800"
                      : "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800"
                  )}>
                    <div className="flex items-center gap-2 mb-2">
                      {selected === question.answer
                        ? <><CheckCircle className="h-5 w-5 text-sky-500" /><span className="font-bold text-sky-700 dark:text-sky-300">Benar! +{question.points} poin</span></>
                        : <><XCircle className="h-5 w-5 text-rose-500" /><span className="font-bold text-rose-700 dark:text-rose-300">Salah</span></>
                      }
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{question.explanation}</p>
                  </div>

                  <Button onClick={nextQuestion} className="w-full" size="lg">
                    {currentQ < totalQ - 1 ? "Soal Berikutnya" : "Lihat Hasil"} <ArrowRight className="h-5 w-5" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
