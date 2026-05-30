"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, Volume2, BookOpen, Copy, Check, ArrowLeftRight, Star } from "lucide-react";
import { kamusData, type KamusEntry } from "@/data/kamus";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const typeColors: Record<string, string> = {
  "kata benda": "default",
  "kata kerja": "secondary",
  "kata sifat": "gold",
  "kata keterangan": "blue",
  "partikel": "purple",
};

export default function KamusPage() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<KamusEntry | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [showFavOnly, setShowFavOnly] = useState(false);
  const [direction, setDirection] = useState<"ar-id" | "id-ar">("ar-id");
  const [speaking, setSpeaking] = useState(false);

  const speak = useCallback((text: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ar-SA";
    utter.rate = 0.85;
    utter.pitch = 1;

    // Pilih suara Arab jika tersedia
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find((v) =>
      v.lang.startsWith("ar") || v.name.toLowerCase().includes("arabic")
    );
    if (arabicVoice) utter.voice = arabicVoice;

    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utter);
  }, []);

  const results = useMemo(() => {
    if (!search.trim() && !showFavOnly) return kamusData;
    return kamusData.filter((entry) => {
      const matchFav = !showFavOnly || favorites.has(entry.id);
      const q = search.toLowerCase();
      const matchSearch =
        !search.trim() ||
        entry.arabic.includes(search) ||
        entry.latin.toLowerCase().includes(q) ||
        entry.indonesian.toLowerCase().includes(q) ||
        entry.english.toLowerCase().includes(q) ||
        entry.tags.some((t) => t.toLowerCase().includes(q));
      return matchFav && matchSearch;
    });
  }, [search, favorites, showFavOnly]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const copy = (text: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border-b border-slate-200/60 dark:border-slate-700/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 text-sm text-sky-600 dark:text-sky-400 mb-2">
              <BookOpen className="h-4 w-4" />
              Kamus Arab — Indonesia
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-1">
              Kamus <span className="gradient-text">Pintar</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Cari kosakata Arab dengan transliterasi, contoh kalimat, dan penjelasan lengkap.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Panel — Search & Results */}
          <div className="lg:w-96 space-y-4">
            {/* Search */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              <Input
                leftIcon={<Search className="h-4 w-4" />}
                placeholder={direction === "ar-id" ? "Cari kata Arab atau Indonesia..." : "Search Indonesian or Arabic..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setDirection(d => d === "ar-id" ? "id-ar" : "ar-id")}
                  className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-sky-300 transition-colors"
                >
                  <ArrowLeftRight className="h-3.5 w-3.5" />
                  {direction === "ar-id" ? "Arab → Indonesia" : "Indonesia → Arab"}
                </button>
                <button
                  onClick={() => setShowFavOnly(!showFavOnly)}
                  className={cn(
                    "flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border transition-colors",
                    showFavOnly
                      ? "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                  )}
                >
                  <Heart className={cn("h-3.5 w-3.5", showFavOnly && "fill-current")} />
                  Favorit ({favorites.size})
                </button>
              </div>
            </motion.div>

            {/* Results */}
            <div className="space-y-2">
              <p className="text-xs text-slate-400">{results.length} kata ditemukan</p>
              {results.length === 0 ? (
                <div className="text-center py-10 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-3">
                    <Search className="h-6 w-6 text-slate-400" />
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 font-medium">Kata tidak ditemukan</p>
                  <p className="text-sm text-slate-400 mt-1">Coba kata kunci lain</p>
                </div>
              ) : (
                <AnimatePresence>
                  {results.map((entry, i) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => setSelected(entry)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && setSelected(entry)}
                      className={cn(
                        "w-full text-left rounded-xl border p-4 transition-all duration-200 cursor-pointer",
                        selected?.id === entry.id
                          ? "border-sky-400 dark:border-sky-600 bg-sky-50 dark:bg-sky-950/40 shadow-md"
                          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-sky-200 dark:hover:border-sky-800 hover:shadow-sm"
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-2xl font-bold text-slate-900 dark:text-white" style={{ fontFamily: "var(--font-cairo)" }}>
                            {entry.arabic}
                          </p>
                          <p className="text-xs text-sky-600 dark:text-sky-400 mt-0.5">{entry.latin}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 truncate">{entry.indonesian}</p>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); speak(entry.arabic); }}
                            title="Dengar pengucapan"
                            className="h-7 w-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-950/40 transition-all"
                          >
                            <Volume2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={(e) => copy(entry.arabic, entry.id + "-copy", e)}
                            className="h-7 w-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                          >
                            {copied === entry.id + "-copy" ? <Check className="h-3.5 w-3.5 text-sky-500" /> : <Copy className="h-3.5 w-3.5" />}
                          </button>
                          <button
                            onClick={(e) => toggleFavorite(entry.id, e)}
                            className={cn("h-7 w-7 rounded-lg flex items-center justify-center transition-all",
                              favorites.has(entry.id)
                                ? "text-rose-500 bg-rose-50 dark:bg-rose-950/40"
                                : "text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                            )}
                          >
                            <Heart className={cn("h-3.5 w-3.5", favorites.has(entry.id) && "fill-current")} />
                          </button>
                        </div>
                      </div>
                      <div className="mt-2">
                        <Badge variant={typeColors[entry.type] as "default" | "secondary" | "gold" | "blue" | "purple" || "slate"}>
                          {entry.type}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </div>

          {/* Right Panel — Detail */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="sticky top-24 space-y-4"
                >
                  {/* Main card */}
                  <div className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden">
                    {/* Arabic word hero */}
                    <div className="bg-gradient-to-br from-sky-500 to-blue-600 px-8 py-10 text-center relative overflow-hidden">
                      <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                        <p className="text-[160px] font-bold text-white" style={{ fontFamily: "var(--font-cairo)" }}>
                          {selected.arabic[0]}
                        </p>
                      </div>
                      <p className="relative text-6xl font-black text-white mb-3" style={{ fontFamily: "var(--font-cairo)" }}>
                        {selected.arabic}
                      </p>
                      <p className="relative text-sky-100 text-lg">{selected.latin}</p>

                      <div className="relative flex justify-center gap-3 mt-4">
                        <button
                          onClick={() => speak(selected.arabic)}
                          disabled={speaking}
                          className={cn(
                            "flex items-center gap-2 text-white text-sm px-4 py-2 rounded-full transition-all duration-200",
                            speaking
                              ? "bg-white/40 scale-95 cursor-not-allowed"
                              : "bg-white/20 hover:bg-white/30 hover:scale-105 active:scale-95"
                          )}
                        >
                          {speaking ? (
                            <>
                              {/* Animasi gelombang suara saat berbicara */}
                              <span className="flex items-end gap-[2px] h-4">
                                {[0, 1, 2].map((i) => (
                                  <span
                                    key={i}
                                    className="inline-block w-[3px] bg-white rounded-full"
                                    style={{
                                      height: `${[60, 100, 70][i]}%`,
                                      animation: `soundBar 0.8s ease-in-out ${i * 0.15}s infinite alternate`,
                                    }}
                                  />
                                ))}
                              </span>
                              Memutar...
                            </>
                          ) : (
                            <>
                              <Volume2 className="h-4 w-4" />
                              Dengar
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => toggleFavorite(selected.id, { stopPropagation: () => {} } as any)}
                          className={cn("flex items-center gap-2 text-sm px-4 py-2 rounded-full transition-colors",
                            favorites.has(selected.id)
                              ? "bg-rose-500 text-white"
                              : "bg-white/20 hover:bg-white/30 text-white"
                          )}
                        >
                          <Heart className={cn("h-4 w-4", favorites.has(selected.id) && "fill-current")} />
                          {favorites.has(selected.id) ? "Tersimpan" : "Simpan"}
                        </button>
                      </div>
                    </div>

                    <div className="p-6 space-y-5">
                      {/* Basic info */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-xl bg-slate-50 dark:bg-slate-700/50 p-3">
                          <p className="text-xs text-slate-400 mb-1">Indonesia</p>
                          <p className="font-bold text-slate-900 dark:text-white">{selected.indonesian}</p>
                        </div>
                        <div className="rounded-xl bg-slate-50 dark:bg-slate-700/50 p-3">
                          <p className="text-xs text-slate-400 mb-1">Jenis Kata</p>
                          <Badge variant={typeColors[selected.type] as "default" | "secondary" | "gold"}>
                            {selected.type}
                          </Badge>
                        </div>
                        {selected.plural && (
                          <div className="rounded-xl bg-slate-50 dark:bg-slate-700/50 p-3">
                            <p className="text-xs text-slate-400 mb-1">Bentuk Jamak</p>
                            <p className="font-bold text-slate-900 dark:text-white text-sm">{selected.plural}</p>
                          </div>
                        )}
                        {selected.root && (
                          <div className="rounded-xl bg-slate-50 dark:bg-slate-700/50 p-3">
                            <p className="text-xs text-slate-400 mb-1">Akar Kata</p>
                            <p className="font-bold text-sky-600 dark:text-sky-400 text-sm" style={{ fontFamily: "var(--font-cairo)" }}>
                              {selected.root}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Tags */}
                      <div>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Kategori</p>
                        <div className="flex flex-wrap gap-2">
                          {selected.tags.map((tag) => (
                            <Badge key={tag} variant="slate">{tag}</Badge>
                          ))}
                        </div>
                      </div>

                      {/* Examples */}
                      <div>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">Contoh Kalimat</p>
                        <div className="space-y-3">
                          {selected.examples.map((ex, i) => (
                            <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                              <p className="text-xl text-slate-900 dark:text-white font-bold mb-1 text-right" style={{ fontFamily: "var(--font-cairo)", direction: "rtl" }}>
                                {ex.arabic}
                              </p>
                              <p className="text-sm text-sky-600 dark:text-sky-400 italic">{ex.latin}</p>
                              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{ex.indonesian}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-[400px] rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-center p-8"
                >
                  <div className="h-16 w-16 rounded-2xl bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center mb-4">
                    <BookOpen className="h-8 w-8 text-sky-500" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    Pilih kata untuk detail
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
                    Cari dan klik kata di sebelah kiri untuk melihat detail lengkap termasuk contoh kalimat dan penjelasan.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
