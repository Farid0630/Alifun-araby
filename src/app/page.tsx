import type { Metadata } from "next";
import { Hero } from "@/features/home/hero";
import { StatsCounter } from "@/features/home/stats-counter";
import { FeaturesSection } from "@/features/home/features-section";
import { HowItWorks } from "@/features/home/how-it-works";
import { GallerySection } from "@/features/home/gallery-section";
import { Roadmap } from "@/features/home/roadmap";
import { Testimonials } from "@/features/home/testimonials";
import { FAQ } from "@/features/home/faq";
import { CTASection } from "@/features/home/cta-section";

export const metadata: Metadata = {
  title: "Alifun Araby — Belajar Bahasa Arab Modern dengan AI",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsCounter />
      <FeaturesSection />
      <HowItWorks />
      <GallerySection />
      <Roadmap />
      <Testimonials />
      <FAQ />
      <CTASection />
    </>
  );
}
