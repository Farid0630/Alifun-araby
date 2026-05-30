import { BookOpen, Brain, Bot, FileText, MessageCircle, Trophy, type LucideIcon } from "lucide-react";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  category: string;
  featured: boolean;
  coverIcon: LucideIcon;
  coverColor: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "tips-belajar-bahasa-arab-efektif",
    title: "10 Tips Belajar Bahasa Arab yang Efektif untuk Pemula",
    excerpt: "Belajar bahasa Arab bisa terasa menakutkan bagi pemula. Namun dengan strategi yang tepat, Anda bisa menguasainya lebih cepat dari yang Anda bayangkan.",
    content: `Bahasa Arab adalah salah satu bahasa yang paling banyak dipelajari di dunia...`,
    author: "Ustaz Ahmad Fauzi",
    authorRole: "Pengajar Bahasa Arab",
    authorAvatar: "AF",
    publishedAt: "2026-05-01",
    readTime: 8,
    tags: ["tips", "pemula", "strategi"],
    category: "Tips Belajar",
    featured: true,
    coverIcon: BookOpen,
    coverColor: "emerald",
  },
  {
    id: "2",
    slug: "strategi-hafalan-mufradat",
    title: "Strategi Ampuh Menghafal Mufradat (Kosakata Arab)",
    excerpt: "Kosakata adalah kunci utama dalam penguasaan bahasa Arab. Temukan teknik spaced repetition dan metode lain yang terbukti efektif.",
    content: `Salah satu tantangan terbesar dalam belajar bahasa Arab adalah menghafal kosakata...`,
    author: "Siti Nurhaliza, M.Pd",
    authorRole: "Peneliti Linguistik Arab",
    authorAvatar: "SN",
    publishedAt: "2026-05-08",
    readTime: 6,
    tags: ["mufradat", "hafalan", "teknik"],
    category: "Strategi Belajar",
    featured: true,
    coverIcon: Brain,
    coverColor: "teal",
  },
  {
    id: "3",
    slug: "belajar-bahasa-arab-dengan-ai",
    title: "Revolusi Belajar: Menggunakan AI untuk Menguasai Bahasa Arab",
    excerpt: "Kecerdasan buatan membuka era baru dalam pembelajaran bahasa Arab. Pelajari bagaimana AI Assistant dapat menjadi guru pribadi Anda 24/7.",
    content: `Teknologi AI telah mengubah cara kita belajar bahasa, termasuk bahasa Arab...`,
    author: "Dr. Rizki Teknologi",
    authorRole: "AI & Edukasi Researcher",
    authorAvatar: "RT",
    publishedAt: "2026-05-15",
    readTime: 10,
    tags: ["AI", "teknologi", "inovasi"],
    category: "Teknologi",
    featured: true,
    coverIcon: Bot,
    coverColor: "blue",
  },
  {
    id: "4",
    slug: "nahwu-untuk-pemula",
    title: "Nahwu untuk Pemula: Memahami Tata Bahasa Arab Tanpa Stress",
    excerpt: "Nahwu sering dianggap sulit, padahal dengan pendekatan yang sistematis dan bertahap, siapapun bisa memahaminya.",
    content: `Nahwu atau ilmu tata bahasa Arab adalah fondasi penting yang harus dikuasai...`,
    author: "Ustaz Ahmad Fauzi",
    authorRole: "Pengajar Bahasa Arab",
    authorAvatar: "AF",
    publishedAt: "2026-05-20",
    readTime: 12,
    tags: ["nahwu", "grammar", "pemula"],
    category: "Materi",
    featured: false,
    coverIcon: FileText,
    coverColor: "amber",
  },
  {
    id: "5",
    slug: "percakapan-arab-sehari-hari",
    title: "Percakapan Bahasa Arab Sehari-hari yang Wajib Dikuasai",
    excerpt: "Dari salam pagi hingga transaksi di pasar, pelajari ekspresi Arab yang paling sering digunakan dalam kehidupan nyata.",
    content: `Menguasai percakapan sehari-hari adalah langkah pertama menuju kelancaran berbahasa Arab...`,
    author: "Siti Nurhaliza, M.Pd",
    authorRole: "Peneliti Linguistik Arab",
    authorAvatar: "SN",
    publishedAt: "2026-05-25",
    readTime: 7,
    tags: ["percakapan", "sehari-hari", "praktis"],
    category: "Percakapan",
    featured: false,
    coverIcon: MessageCircle,
    coverColor: "purple",
  },
  {
    id: "6",
    slug: "kisah-sukses-belajar-arab",
    title: "Dari Nol ke Fasih: Kisah Sukses Belajar Bahasa Arab dalam 1 Tahun",
    excerpt: "Muhammad Rizki berhasil fasih berbahasa Arab dalam satu tahun dengan konsistensi dan metode yang tepat. Ini kisahnya.",
    content: `Setahun yang lalu, Muhammad Rizki tidak bisa membaca satu huruf Arab pun...`,
    author: "Tim Alifun Araby",
    authorRole: "Content Team",
    authorAvatar: "AP",
    publishedAt: "2026-05-28",
    readTime: 5,
    tags: ["motivasi", "kisah sukses", "inspirasi"],
    category: "Inspirasi",
    featured: false,
    coverIcon: Trophy,
    coverColor: "gold",
  },
];

export const blogCategories = [
  "Semua",
  "Tips Belajar",
  "Strategi Belajar",
  "Teknologi",
  "Materi",
  "Percakapan",
  "Inspirasi",
];
