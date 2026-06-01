import Link from "next/link";
import { Mail, MessageCircle, PlayCircle, AtSign, Heart } from "lucide-react";

const footerLinks = {
  belajar: [
    { href: "/materi",    label: "Materi Pembelajaran" },
    { href: "/flashcard", label: "Flashcard Digital"   },
    { href: "/quiz",      label: "Quiz Interaktif"     },
    { href: "/kamus",     label: "Kamus Pintar"        },
  ],
  fitur: [
    { href: "/ai-assistant", label: "AI Arabic Assistant" },
    { href: "/about",        label: "Tentang Kami"        },
  ],
  sosial: [
    { href: "https://www.instagram.com/alifun.araby25?igsh=MWtpcjQzY2cyY25waQ==", label: "Instagram", icon: MessageCircle },
    { href: "#", label: "YouTube",   icon: PlayCircle    },
    { href: "#", label: "Twitter",   icon: AtSign        },
    { href: "#", label: "Email",     icon: Mail          },
  ],
};

function FooterLogo() {
  return (
    <svg width="36" height="38" viewBox="0 0 40 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ftBookGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="ftDropGrad" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
      </defs>
      <path d="M3 30 L20 27 L20 38 L3 41 Z" fill="url(#ftBookGrad)" opacity="0.65" />
      <path d="M20 27 L37 30 L37 41 L20 38 Z" fill="url(#ftBookGrad)" opacity="0.85" />
      <line x1="20" y1="27" x2="20" y2="38" stroke="white" strokeWidth="0.8" opacity="0.5" />
      <path d="M20 3 C20 3 13 12 13 18 C13 21.9 16.1 25 20 25 C23.9 25 27 21.9 27 18 C27 12 20 3 20 3 Z" fill="url(#ftDropGrad)" />
      <polygon points="20,1 22,4 20,5.5 18,4" fill="#7dd3fc" opacity="0.8" />
      <text x="20" y="22" textAnchor="middle" fontSize="10" fontFamily="Cairo, sans-serif" fontWeight="bold" fill="white">ا</text>
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <FooterLogo />
              <div>
                <p className="text-base font-extrabold text-white">
                  Alifun <span className="text-sky-400">Araby</span>
                </p>
                <p className="text-xs text-slate-500" style={{ fontFamily: "var(--font-cairo)" }}>
                  أَلِفُ الْعَرَبِيّ
                </p>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed">
              Platform pembelajaran Bahasa Arab digital berbasis AI — untuk siapa saja yang ingin belajar bahasa Arab dengan cara modern.
            </p>

            {/* Arabic quote */}
            <div className="rounded-lg border border-slate-700/60 bg-slate-800/50 p-3">
              <p className="text-sm text-sky-400 text-right leading-loose font-medium" style={{ fontFamily: "var(--font-cairo)" }}>
                طَلَبُ الْعِلْمِ فَرِيضَةٌ
              </p>
              <p className="text-xs text-slate-500 mt-1 text-right">Menuntut ilmu adalah kewajiban</p>
            </div>
          </div>

          {/* Belajar */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Belajar</h3>
            <ul className="space-y-2.5">
              {footerLinks.belajar.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-sky-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Fitur */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Fitur</h3>
            <ul className="space-y-2.5">
              {footerLinks.fitur.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-sky-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sosial */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Ikuti Kami</h3>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.sosial.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-sky-400 text-xs transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            © 2025 Alifun Araby. Dibuat dengan
            <Heart className="inline h-3.5 w-3.5 fill-rose-500 text-rose-500" />
            untuk para pelajar.
          </p>
          <div className="flex gap-5">
            {["Privasi", "Ketentuan", "Kontak"].map((item) => (
              <Link key={item} href="#" className="text-xs text-slate-500 hover:text-sky-400 transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
