"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, BookOpen, Brain, BookMarked, HelpCircle, CreditCard, Info } from "lucide-react";
import { DarkModeToggle } from "@/components/shared/dark-mode-toggle";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/",             label: "Beranda",       icon: Home      },
  { href: "/materi",       label: "Materi",         icon: BookOpen  },
  { href: "/ai-assistant", label: "AI Assistant",   icon: Brain     },
  { href: "/kamus",        label: "Kamus",          icon: BookMarked},
  { href: "/quiz",         label: "Quiz",           icon: HelpCircle},
  { href: "/flashcard",    label: "Flashcard",      icon: CreditCard},
  { href: "/about",        label: "Tentang Kami",   icon: Info      },
];

function AlifunLogo({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="navBookGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="navDropGrad" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
      </defs>
      <path d="M3 30 L20 27 L20 38 L3 41 Z" fill="url(#navBookGrad)" opacity="0.75" />
      <path d="M20 27 L37 30 L37 41 L20 38 Z" fill="url(#navBookGrad)" opacity="0.95" />
      <line x1="20" y1="27" x2="20" y2="38" stroke="white" strokeWidth="0.8" opacity="0.6" />
      <path d="M20 3 C20 3 13 12 13 18 C13 21.9 16.1 25 20 25 C23.9 25 27 21.9 27 18 C27 12 20 3 20 3 Z" fill="url(#navDropGrad)" />
      <polygon points="20,1 22,4 20,5.5 18,4" fill="#7dd3fc" opacity="0.8" />
      <text x="20" y="22" textAnchor="middle" fontSize="10" fontFamily="Cairo, sans-serif" fontWeight="bold" fill="white">ا</text>
    </svg>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              <AlifunLogo size={34} />
              <div className="leading-tight">
                <p className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">
                  Alifun <span className="text-sky-500">Araby</span>
                </p>
                <p className="text-[9px] text-slate-400 leading-tight mt-0.5" style={{ fontFamily: "var(--font-cairo)" }}>
                  أَلِفُ الْعَرَبِيّ
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        active
                          ? "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50"
                          : "text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Right — hanya dark mode toggle */}
            <div className="flex items-center gap-2">
              <DarkModeToggle />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden h-9 w-9 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-72 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-700 flex flex-col shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                <AlifunLogo size={28} />
                <span className="font-bold text-slate-900 dark:text-white text-sm">
                  Alifun <span className="text-sky-500">Araby</span>
                </span>
              </Link>
              <button onClick={() => setMobileOpen(false)} className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Links */}
            <nav className="p-3 flex-1 overflow-y-auto space-y-0.5">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      active
                        ? "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-xs text-slate-400">
                Platform Belajar Bahasa Arab · <span className="text-sky-500">Alifun Araby</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
