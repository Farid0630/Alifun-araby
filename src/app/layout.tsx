import type { Metadata } from "next";
import { Poppins, Cairo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Alifun Araby — أَلِفُ الْعَرَبِيّ | Pembelajaran Bahasa Arab Digital",
    template: "%s | Alifun Araby",
  },
  description:
    "Platform pembelajaran Bahasa Arab digital berbasis AI. Dilengkapi AI Assistant, kamus pintar, quiz interaktif, dan materi terstruktur untuk siapa saja.",
  keywords: [
    "alifun araby",
    "belajar bahasa arab",
    "bahasa arab digital",
    "ai arabic assistant",
    "kamus arab indonesia",
    "belajar arab online",
  ],
  authors: [{ name: "Alifun Araby" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    title: "Alifun Araby — Pembelajaran Bahasa Arab Digital",
    description:
      "Platform digital pembelajaran Bahasa Arab berbasis AI — AI Assistant, kamus pintar, quiz, dan materi terstruktur.",
    siteName: "Alifun Araby",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${poppins.variable} ${cairo.variable}`}
    >
      <body
        style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
        className="antialiased min-h-screen flex flex-col"
      >
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
