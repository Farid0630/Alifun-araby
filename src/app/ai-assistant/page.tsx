"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, Copy, Check, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  isError?: boolean;
}

const WELCOME: Message = {
  id: "welcome",
  role: "assistant",
  content: "Ahlan wa sahlan! Saya Asisten Arab — AI khusus pembelajaran bahasa Arab.\n\nSaya siap membantu kamu:\n• Terjemah Indonesia ↔ Arab (lengkap dengan harakat & transliterasi)\n• Koreksi grammar bahasa Arab\n• Penjelasan nahwu & sharaf\n• Contoh percakapan Arab\n• Arti dan penggunaan kosakata\n\nSilakan tanyakan apa saja tentang bahasa Arab!",
  timestamp: new Date(),
};

const quickPrompts = [
  { label: "Translate ke Arab",  prompt: "Tolong terjemahkan ke bahasa Arab dengan harakat: 'Selamat pagi, apa kabar?'" },
  { label: "Koreksi Grammar",    prompt: "Tolong koreksi grammar Arab ini: أنا ذهب إلى المدرسة" },
  { label: "Jelaskan Nahwu",     prompt: "Jelaskan perbedaan antara isim, fi'il, dan harf dalam bahasa Arab dengan contoh" },
  { label: "Buat Percakapan",    prompt: "Buatkan contoh percakapan singkat dalam bahasa Arab tentang perkenalan diri" },
  { label: "Arti Kosakata",      prompt: "Jelaskan arti dan penggunaan kata مَاشَاءَ اللَّهُ dalam bahasa Arab" },
  { label: "Pola Kalimat",       prompt: "Ajarkan pola kalimat jumlah ismiyyah dalam bahasa Arab dengan contoh" },
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Typewriter effect — tampilkan teks karakter per karakter
  const typewriterEffect = useCallback((id: string, fullText: string) => {
    let i = 0;
    const speed = Math.max(8, Math.min(18, 3000 / fullText.length)); // sesuaikan kecepatan

    const interval = setInterval(() => {
      i += Math.ceil(fullText.length / 200); // chunk untuk teks panjang
      setMessages((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, content: fullText.slice(0, i), isTyping: i < fullText.length } : m
        )
      );
      if (i >= fullText.length) {
        clearInterval(interval);
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, content: fullText, isTyping: false } : m))
        );
      }
    }, speed);
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    // Hanya kirim pesan non-welcome ke API
    const history = [...messages.filter((m) => m.id !== "welcome"), userMsg]
      .filter((m) => !m.isError)
      .map((m) => ({ role: m.role, content: m.content }));

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      const data = await res.json();

      // Tangani error dari server
      if (!res.ok || data.error) {
        throw new Error(data.error ?? "Terjadi kesalahan.");
      }

      const aiId = `a-${Date.now()}`;
      const aiMsg: Message = {
        id: aiId,
        role: "assistant",
        content: "",
        timestamp: new Date(),
        isTyping: true,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsLoading(false);
      typewriterEffect(aiId, data.text);

    } catch (err) {
      // Fallback — tampilkan respons dasar, bukan error merah
      const aiId = `a-fallback-${Date.now()}`;
      const fallback: Message = {
        id: aiId,
        role: "assistant",
        content: "Maaf, terjadi gangguan koneksi. Silakan coba lagi atau refresh halaman.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, fallback]);
      setIsLoading(false);
    }
  }, [isLoading, messages, typewriterEffect]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const resetChat = () => setMessages([WELCOME]);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-gradient-hero">
      {/* Header */}
      <div className="border-b border-slate-200/60 dark:border-slate-700/40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-4 py-4 shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 rounded-xl bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Bot className="h-5 w-5 text-white" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-400 border-2 border-white dark:border-slate-900 animate-pulse" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 dark:text-white">Asisten Arab</h1>
              <p className="text-xs text-green-500 flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Powered by Gemini AI
              </p>
            </div>
          </div>
          <button
            onClick={resetChat}
            title="Reset percakapan"
            className="h-9 w-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={cn("flex gap-3", msg.role === "user" && "flex-row-reverse")}
              >
                {/* Avatar */}
                <div className={cn(
                  "h-8 w-8 rounded-xl flex items-center justify-center shrink-0 mt-1",
                  msg.role === "assistant"
                    ? "bg-linear-to-br from-violet-500 to-purple-600"
                    : "bg-linear-to-br from-sky-500 to-blue-600"
                )}>
                  {msg.role === "assistant"
                    ? <Bot className="h-4 w-4 text-white" />
                    : <User className="h-4 w-4 text-white" />}
                </div>

                {/* Bubble */}
                <div className={cn("max-w-[80%] group", msg.role === "user" && "items-end")}>
                  <div className={cn(
                    "rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    msg.isError
                      ? "bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300"
                      : msg.role === "assistant"
                      ? "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-tl-sm"
                      : "bg-sky-500 text-white rounded-tr-sm"
                  )}>
                    {msg.isError && <AlertCircle className="h-4 w-4 inline mr-1.5 shrink-0" />}
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    {msg.isTyping && (
                      <span className="inline-block w-0.5 h-4 bg-slate-400 ml-0.5 animate-pulse align-middle" />
                    )}
                  </div>

                  {/* Copy button */}
                  {msg.role === "assistant" && !msg.isError && !msg.isTyping && (
                    <div className="mt-1 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => copyText(msg.content, msg.id)}
                        className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                      >
                        {copied === msg.id ? <Check className="h-3 w-3 text-sky-500" /> : <Copy className="h-3 w-3" />}
                        {copied === msg.id ? "Disalin!" : "Salin"}
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading indicator */}
          {isLoading && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
              <div className="h-8 w-8 rounded-xl bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center shrink-0 mt-1">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3">
                <div className="flex items-center gap-1.5 h-5">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Quick prompts + Input */}
      <div className="border-t border-slate-200/60 dark:border-slate-700/40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shrink-0">
        {/* Quick prompts */}
        <div className="max-w-4xl mx-auto px-4 pt-3">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickPrompts.map((qp) => (
              <button
                key={qp.label}
                onClick={() => sendMessage(qp.prompt)}
                disabled={isLoading}
                className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 dark:hover:bg-sky-900/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {qp.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex gap-3 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
              }}
              onKeyDown={handleKeyDown}
              placeholder="Tanyakan tentang bahasa Arab... (Enter untuk kirim)"
              rows={1}
              disabled={isLoading}
              className="flex-1 resize-none rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all disabled:opacity-50 max-h-32"
            />
            <Button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="h-11 w-11 shrink-0 rounded-xl"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-slate-400 mt-2 text-center">
            Didukung oleh Google Gemini AI · Respons mungkin tidak selalu akurat
          </p>
        </div>
      </div>
    </div>
  );
}
