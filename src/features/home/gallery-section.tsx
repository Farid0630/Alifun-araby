"use client";

import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

function ImgSlot({
  label, sub, spec, className = "",
  bg = "bg-slate-100 dark:bg-slate-800",
  border = "border-slate-300 dark:border-slate-600",
  iconColor = "text-slate-400",
  tagColor = "bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-500",
}: {
  label: string; sub: string; spec: string; className?: string;
  bg?: string; border?: string; iconColor?: string; tagColor?: string;
}) {
  return (
    <div className={`w-full ${bg} border-2 border-dashed ${border} img-placeholder flex flex-col items-center justify-center gap-2 p-4 text-center ${className}`}>
      <ImageIcon className={`h-6 w-6 ${iconColor} shrink-0`} />
      <div>
        <p className="text-xs font-bold text-slate-600 dark:text-slate-300">{label}</p>
        <p className="text-[10px] text-slate-400 mt-0.5">{sub}</p>
        <span className={`mt-1.5 inline-block rounded-md border px-2 py-0.5 text-[10px] font-mono ${tagColor}`}>{spec}</span>
      </div>
    </div>
  );
}

const cardVariants = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };

export function GallerySection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <p className="text-sm font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-widest mb-2">Galeri</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Kegiatan <span className="gradient-text">Belajar & Komunitas</span>
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Dokumentasi kegiatan belajar, sesi latihan, dan momen inspiratif dari komunitas pelajar bahasa Arab.
          </p>
        </motion.div>

        {/* Banner panorama 21:9 */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl overflow-hidden shadow-lg">
          {/*
           * FOTO BANNER UTAMA
           * Ukuran: 1920 × 823 px  |  Rasio: 21:9
           * Konten: Foto suasana belajar / komunitas
           */}
          <ImgSlot label="Banner Galeri Utama" sub="Foto suasana belajar / komunitas bahasa Arab"
            spec="1920 × 823 px · Rasio 21:9" className="aspect-21/9 rounded-3xl"
            bg="bg-sky-50 dark:bg-sky-950/40" border="border-sky-300 dark:border-sky-700"
            iconColor="text-sky-400" tagColor="bg-sky-50 dark:bg-sky-900/30 border-sky-200 dark:border-sky-700 text-sky-600 dark:text-sky-400" />
        </motion.div>

        {/* 3-col grid 4:3 */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.1 }} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { label: "Foto Sesi Belajar", sub: "Kegiatan belajar bersama", bg: "bg-violet-50 dark:bg-violet-950/30", border: "border-violet-300 dark:border-violet-700", iconColor: "text-violet-400", tagColor: "bg-violet-50 dark:bg-violet-900/30 border-violet-200 dark:border-violet-700 text-violet-600 dark:text-violet-400" },
            { label: "Foto Acara / Event", sub: "Momen spesial komunitas", bg: "bg-amber-50 dark:bg-amber-950/30", border: "border-amber-300 dark:border-amber-700", iconColor: "text-amber-400", tagColor: "bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-700 text-amber-600 dark:text-amber-400" },
            { label: "Foto Diskusi Kelompok", sub: "Latihan percakapan bersama", bg: "bg-rose-50 dark:bg-rose-950/30", border: "border-rose-300 dark:border-rose-700", iconColor: "text-rose-400", tagColor: "bg-rose-50 dark:bg-rose-900/30 border-rose-200 dark:border-rose-700 text-rose-600 dark:text-rose-400" },
          ].map((item, i) => (
            <motion.div key={i} variants={cardVariants} transition={{ duration: 0.45 }}
              className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              {/*
               * FOTO GRID (3 kolom)
               * Ukuran: 600 × 450 px  |  Rasio: 4:3
               */}
              <ImgSlot label={item.label} sub={item.sub} spec="600 × 450 px · Rasio 4:3"
                className="aspect-4/3 rounded-2xl" bg={item.bg} border={item.border}
                iconColor={item.iconColor} tagColor={item.tagColor} />
            </motion.div>
          ))}
        </motion.div>

        {/* Split: besar 1:1 kiri + 2 landscape kanan */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            {/*
             * FOTO UNGGULAN
             * Ukuran: 800 × 800 px  |  Rasio: 1:1
             */}
            <ImgSlot label="Foto Unggulan" sub="Foto kegiatan / inspirasi belajar"
              spec="800 × 800 px · Rasio 1:1" className="aspect-square rounded-2xl"
              bg="bg-indigo-50 dark:bg-indigo-950/30" border="border-indigo-300 dark:border-indigo-700"
              iconColor="text-indigo-400" tagColor="bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="flex flex-col gap-5">
            {[
              { label: "Foto Workshop / Seminar", sub: "Kegiatan pengembangan bahasa Arab", bg: "bg-green-50 dark:bg-green-950/30", border: "border-green-300 dark:border-green-700", iconColor: "text-green-400", tag: "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-600" },
              { label: "Foto Kompetisi / Lomba", sub: "Ajang prestasi pelajar bahasa Arab", bg: "bg-orange-50 dark:bg-orange-950/30", border: "border-orange-300 dark:border-orange-700", iconColor: "text-orange-400", tag: "bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-700 text-orange-600" },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex-1">
                {/*
                 * FOTO KANAN (2 baris)
                 * Ukuran: 800 × 450 px  |  Rasio: 16:9
                 */}
                <ImgSlot label={item.label} sub={item.sub} spec="800 × 450 px · Rasio 16:9"
                  className="aspect-video rounded-2xl h-full" bg={item.bg} border={item.border}
                  iconColor={item.iconColor} tagColor={item.tag} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* 4-col mini grid */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.08 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Belajar Online",    sub: "Sesi belajar digital",       bg: "bg-cyan-50 dark:bg-cyan-950/30",    border: "border-cyan-300 dark:border-cyan-700",    iconColor: "text-cyan-400",    tag: "bg-cyan-50 dark:bg-cyan-900/30 border-cyan-200 dark:border-cyan-700 text-cyan-600" },
            { label: "Latihan Menulis",   sub: "Praktik kaligrafi Arab",      bg: "bg-purple-50 dark:bg-purple-950/30",border: "border-purple-300 dark:border-purple-700",iconColor: "text-purple-400",  tag: "bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700 text-purple-600" },
            { label: "Hafalan Kosakata",  sub: "Sesi flashcard & hafalan",    bg: "bg-teal-50 dark:bg-teal-950/30",   border: "border-teal-300 dark:border-teal-700",    iconColor: "text-teal-400",    tag: "bg-teal-50 dark:bg-teal-900/30 border-teal-200 dark:border-teal-700 text-teal-600" },
            { label: "Komunitas Pelajar", sub: "Foto anggota komunitas",      bg: "bg-pink-50 dark:bg-pink-950/30",   border: "border-pink-300 dark:border-pink-700",    iconColor: "text-pink-400",    tag: "bg-pink-50 dark:bg-pink-900/30 border-pink-200 dark:border-pink-700 text-pink-600" },
          ].map((item, i) => (
            <motion.div key={i} variants={cardVariants} transition={{ duration: 0.4 }}
              className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              {/*
               * FOTO MINI (4 kolom)
               * Ukuran: 400 × 300 px  |  Rasio: 4:3
               */}
              <ImgSlot label={item.label} sub={item.sub} spec="400 × 300 px · 4:3"
                className="aspect-4/3 rounded-xl" bg={item.bg} border={item.border}
                iconColor={item.iconColor} tagColor={item.tag} />
            </motion.div>
          ))}
        </motion.div>

        <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
          <ImageIcon className="h-3.5 w-3.5" />
          Semua kotak adalah <strong>placeholder</strong> — ganti dengan foto asli sesuai ukuran yang tertera
        </p>
      </div>
    </section>
  );
}
