"use client";

import dynamic from "next/dynamic";

// Three.js tidak bisa berjalan di server — disable SSR
export const ThreeBgDynamic = dynamic(
  () => import("./three-bg").then((m) => ({ default: m.ThreeBg })),
  { ssr: false, loading: () => null }
);
