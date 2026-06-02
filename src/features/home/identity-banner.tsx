"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export function IdentityBanner() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-6 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4"
      >
        <div className="shrink-0 h-10 w-10 rounded-xl bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center">
          <GraduationCap className="h-5 w-5 text-sky-600 dark:text-sky-400" />
        </div>

        <div className="flex-1">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Portal akademik resmi mahasiswa Pascasarjana Pendidikan Bahasa Arab{" "}
            <span className="font-bold text-sky-600 dark:text-sky-400">Kelas A</span>{" "}
            UIN Mataram.
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl">
            Memuat artikel, kajian, dan pembahasan ilmiah seputar bahasa Arab dalam konteks pendidikan — teori &amp; praktik pembelajaran, linguistik terapan, metodologi pengajaran, dan isu terkini.
          </p>
        </div>

        <div className="shrink-0 hidden sm:block rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-center">
          <p className="text-base font-bold text-slate-700 dark:text-slate-200" style={{ fontFamily: "var(--font-cairo)" }}>
            طَلَبُ الْعِلْمِ فَرِيضَةٌ
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">Menuntut ilmu adalah kewajiban</p>
        </div>
      </motion.div>
    </section>
  );
}
