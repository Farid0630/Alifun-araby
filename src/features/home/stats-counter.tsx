"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Award } from "lucide-react";
import Link from "next/link";

const stats = [
  { icon: Star,  value: 4.9,  suffix: "/5", label: "Rating Pengguna", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/40", ring: "hover:ring-2 hover:ring-amber-300 dark:hover:ring-amber-700", href: "/kamus" },
  { icon: Award, value: 1200, suffix: "+",  label: "Badge Diraih",    color: "text-rose-500",  bg: "bg-rose-50 dark:bg-rose-950/40",   ring: "hover:ring-2 hover:ring-rose-300 dark:hover:ring-rose-700",   href: "/quiz"  },
];

function Counter({ target, suffix, decimals = 0 }: { target: number; suffix: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = (target / duration) * step;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(parseFloat(start.toFixed(decimals)));
    }, step);
    return () => clearInterval(timer);
  }, [inView, target, decimals]);

  return <span ref={ref}>{decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}{suffix}</span>;
}

export function StatsCounter() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              <Link
                href={stat.href}
                className={`flex flex-col items-center text-center gap-3 p-5 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-lg transition-all duration-200 cursor-pointer ${stat.ring}`}
              >
                <motion.div
                  whileHover={{ scale: 1.12, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`h-14 w-14 rounded-2xl ${stat.bg} flex items-center justify-center`}
                >
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </motion.div>
                <div>
                  <p className={`text-3xl font-black ${stat.color}`}>
                    <Counter target={stat.value} suffix={stat.suffix} decimals={stat.value % 1 !== 0 ? 1 : 0} />
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{stat.label}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
