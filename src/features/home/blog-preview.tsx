"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, ImageIcon } from "lucide-react";
import { blogPosts } from "@/data/blog";

const previews = blogPosts.slice(0, 3);

const coverColors: Record<string, string> = {
  emerald: "from-sky-500 to-blue-600",
  teal:    "from-blue-500 to-cyan-600",
  blue:    "from-blue-500 to-indigo-600",
  amber:   "from-amber-500 to-orange-500",
  purple:  "from-violet-500 to-purple-600",
  gold:    "from-amber-400 to-yellow-500",
};

export function BlogPreview() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <p className="text-sm font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-widest mb-2">
              Blog Edukasi
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Tips &amp; Artikel{" "}
              <span className="gradient-text">Terbaru</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 dark:text-sky-400 hover:underline shrink-0"
          >
            Lihat semua artikel <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previews.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              {/* Cover image slot — 16:9 */}
              <Link href={`/blog/${post.slug}`}>
                {/*
                 * ┌──────────────────────────────────┐
                 * │  GANTI DENGAN GAMBAR ARTIKEL     │
                 * │  Rasio: 16:9 · 800 × 450 px     │
                 * │  Konten: Cover / thumbnail blog  │
                 * └──────────────────────────────────┘
                 */}
                <div className={`relative aspect-[16/9] w-full bg-linear-to-br ${coverColors[post.coverColor] || "from-sky-500 to-blue-600"} overflow-hidden`}>
                  {/* Placeholder overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/20">
                    <ImageIcon className="h-8 w-8 text-white/70" />
                    <span className="rounded-md bg-black/30 text-white/90 text-[10px] font-mono px-2 py-0.5">
                      800 × 450 px · 16:9
                    </span>
                  </div>

                  {/* Icon decoration */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <post.coverIcon className="h-20 w-20 text-white" />
                  </div>

                  {/* Category badge */}
                  <div className="absolute bottom-3 left-3">
                    <span className="rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1">
                      {post.category}
                    </span>
                  </div>
                </div>
              </Link>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime} menit baca
                  <span className="mx-1">·</span>
                  <span>{post.publishedAt}</span>
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug mb-2 line-clamp-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {/*
                     * Foto penulis: 40×40 px · rasio 1:1
                     */}
                    <div className="h-7 w-7 rounded-full bg-linear-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {post.authorAvatar[0]}
                    </div>
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      {post.author.split(",")[0]}
                    </span>
                  </div>
                  <div className="flex gap-1.5 flex-wrap justify-end">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Image spec note */}
        <p className="text-center text-xs text-slate-400 mt-6 flex items-center justify-center gap-1.5">
          <ImageIcon className="h-3.5 w-3.5" />
          Cover artikel: <strong>800×450 px</strong> · Rasio <strong>16:9</strong> · Ganti placeholder di atas dengan gambar nyata
        </p>

      </div>
    </section>
  );
}
