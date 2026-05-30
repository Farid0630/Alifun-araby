import { Star, Target, Zap, Flame, BookOpen, Trophy, Brain, type LucideIcon } from "lucide-react";

export type QuizType = "pilihan-ganda" | "tebak-arti" | "susun-kalimat" | "matching";

export interface QuizQuestion {
  id: string;
  type: QuizType;
  question: string;
  arabicQuestion?: string;
  options?: string[];
  answer: string | string[];
  explanation: string;
  difficulty: "mudah" | "sedang" | "sulit";
  category: string;
  points: number;
}

export interface QuizSet {
  id: string;
  title: string;
  arabicTitle: string;
  description: string;
  totalQuestions: number;
  duration: number;
  difficulty: "mudah" | "sedang" | "sulit";
  category: string;
  color: string;
  questions: QuizQuestion[];
}

export const quizSets: QuizSet[] = [
  // ─────────────────────────────────────────────────────
  // 1. Kosakata Dasar
  // ─────────────────────────────────────────────────────
  {
    id: "vocab-basic",
    title: "Kosakata Dasar",
    arabicTitle: "المفردات الأساسية",
    description: "Uji penguasaan kosakata dasar bahasa Arab yang paling sering digunakan.",
    totalQuestions: 12,
    duration: 360,
    difficulty: "mudah",
    category: "mufradat",
    color: "sky",
    questions: [
      { id: "vb1", type: "pilihan-ganda", question: "Apa arti kata كِتَاب (kitaab)?", options: ["Rumah", "Buku", "Sekolah", "Masjid"], answer: "Buku", explanation: "كِتَاب (kitaab) berarti 'buku'.", difficulty: "mudah", category: "mufradat", points: 10 },
      { id: "vb2", type: "pilihan-ganda", question: "Bagaimana cara menulis 'rumah' dalam bahasa Arab?", options: ["مَاء", "بَيْت", "مَدْرَسَة", "كِتَاب"], answer: "بَيْت", explanation: "بَيْت (bayt) berarti 'rumah'.", difficulty: "mudah", category: "mufradat", points: 10 },
      { id: "vb3", type: "tebak-arti", question: "Apa arti kata ini?", arabicQuestion: "مَاء", options: ["Api", "Udara", "Air", "Tanah"], answer: "Air", explanation: "مَاء (maa') berarti 'air'.", difficulty: "mudah", category: "mufradat", points: 10 },
      { id: "vb4", type: "pilihan-ganda", question: "Apa arti kata طَالِب (thaalib)?", options: ["Guru", "Dokter", "Pelajar", "Pedagang"], answer: "Pelajar", explanation: "طَالِب (thaalib) berarti 'pelajar' atau 'murid'.", difficulty: "mudah", category: "mufradat", points: 10 },
      { id: "vb5", type: "pilihan-ganda", question: "Bagaimana cara menulis 'sekolah' dalam bahasa Arab?", options: ["مَسْجِد", "بَيْت", "مَدْرَسَة", "سُوق"], answer: "مَدْرَسَة", explanation: "مَدْرَسَة (madrasah) berarti 'sekolah'.", difficulty: "mudah", category: "mufradat", points: 10 },
      { id: "vb6", type: "tebak-arti", question: "Apa arti kata ini?", arabicQuestion: "جَمِيل", options: ["Besar", "Kecil", "Indah", "Lama"], answer: "Indah", explanation: "جَمِيل (jamiil) berarti 'indah' atau 'cantik'.", difficulty: "mudah", category: "sifat", points: 10 },
      { id: "vb7", type: "pilihan-ganda", question: "Apa arti kata كَبِير (kabiir)?", options: ["Kecil", "Baru", "Besar", "Tua"], answer: "Besar", explanation: "كَبِير (kabiir) berarti 'besar'.", difficulty: "mudah", category: "sifat", points: 10 },
      { id: "vb8", type: "pilihan-ganda", question: "Kata apa yang berarti 'pergi' dalam bahasa Arab?", options: ["قَرَأَ", "ذَهَبَ", "أَكَلَ", "كَتَبَ"], answer: "ذَهَبَ", explanation: "ذَهَبَ (dzahaba) berarti 'pergi'.", difficulty: "sedang", category: "fi'il", points: 15 },
      { id: "vb9", type: "tebak-arti", question: "Apa arti kata ini?", arabicQuestion: "سَعِيد", options: ["Sedih", "Marah", "Bahagia", "Takut"], answer: "Bahagia", explanation: "سَعِيد (sa'iid) berarti 'bahagia'.", difficulty: "mudah", category: "sifat", points: 10 },
      { id: "vb10", type: "pilihan-ganda", question: "Apa arti kata مَسْجِد (masjid)?", options: ["Gereja", "Masjid", "Kuil", "Pasar"], answer: "Masjid", explanation: "مَسْجِد (masjid) berarti 'masjid'.", difficulty: "mudah", category: "mufradat", points: 10 },
      { id: "vb11", type: "tebak-arti", question: "Apa arti kata ini?", arabicQuestion: "قَلَم", options: ["Buku", "Papan tulis", "Pena", "Tas"], answer: "Pena", explanation: "قَلَم (qalam) berarti 'pena' atau 'bolpoin'.", difficulty: "mudah", category: "mufradat", points: 10 },
      { id: "vb12", type: "pilihan-ganda", question: "Apa arti kata سَيَّارَة (sayyaarah)?", options: ["Pesawat", "Kapal", "Mobil", "Sepeda"], answer: "Mobil", explanation: "سَيَّارَة (sayyaarah) berarti 'mobil'.", difficulty: "mudah", category: "mufradat", points: 10 },
    ],
  },

  // ─────────────────────────────────────────────────────
  // 2. Keluarga & Orang
  // ─────────────────────────────────────────────────────
  {
    id: "family-vocab",
    title: "Kosakata Keluarga",
    arabicTitle: "مفردات الأسرة",
    description: "Uji pengetahuan kosakata keluarga dan hubungan antar anggota keluarga.",
    totalQuestions: 10,
    duration: 300,
    difficulty: "mudah",
    category: "mufradat",
    color: "rose",
    questions: [
      { id: "fv1", type: "tebak-arti", question: "Apa arti kata ini?", arabicQuestion: "أَب", options: ["Ibu", "Kakek", "Ayah", "Paman"], answer: "Ayah", explanation: "أَب (ab) berarti 'ayah'.", difficulty: "mudah", category: "keluarga", points: 10 },
      { id: "fv2", type: "tebak-arti", question: "Apa arti kata ini?", arabicQuestion: "أُمّ", options: ["Nenek", "Ibu", "Bibi", "Kakak"], answer: "Ibu", explanation: "أُمّ (umm) berarti 'ibu'.", difficulty: "mudah", category: "keluarga", points: 10 },
      { id: "fv3", type: "pilihan-ganda", question: "Bagaimana cara menulis 'saudara laki-laki' dalam bahasa Arab?", options: ["أُخْت", "بِنْت", "أَخ", "وَلَد"], answer: "أَخ", explanation: "أَخ (akh) berarti 'saudara laki-laki'.", difficulty: "mudah", category: "keluarga", points: 10 },
      { id: "fv4", type: "pilihan-ganda", question: "Apa arti kata أُخْت (ukht)?", options: ["Saudara laki-laki", "Ibu", "Saudara perempuan", "Anak perempuan"], answer: "Saudara perempuan", explanation: "أُخْت (ukht) berarti 'saudara perempuan'.", difficulty: "mudah", category: "keluarga", points: 10 },
      { id: "fv5", type: "tebak-arti", question: "Apa arti kata ini?", arabicQuestion: "جَدّ", options: ["Ayah", "Paman", "Kakek", "Saudara"], answer: "Kakek", explanation: "جَدّ (jadd) berarti 'kakek'.", difficulty: "mudah", category: "keluarga", points: 10 },
      { id: "fv6", type: "tebak-arti", question: "Apa arti kata ini?", arabicQuestion: "جَدَّة", options: ["Ibu", "Nenek", "Bibi", "Putri"], answer: "Nenek", explanation: "جَدَّة (jaddah) berarti 'nenek'.", difficulty: "mudah", category: "keluarga", points: 10 },
      { id: "fv7", type: "pilihan-ganda", question: "Apa arti kata وَلَد (walad)?", options: ["Gadis", "Anak laki-laki", "Wanita", "Laki-laki dewasa"], answer: "Anak laki-laki", explanation: "وَلَد (walad) berarti 'anak laki-laki'.", difficulty: "mudah", category: "keluarga", points: 10 },
      { id: "fv8", type: "pilihan-ganda", question: "Bagaimana cara menulis 'guru' (laki-laki) dalam bahasa Arab?", options: ["مُعَلِّمَة", "مُعَلِّم", "طَالِب", "طَبِيب"], answer: "مُعَلِّم", explanation: "مُعَلِّم (mu'allim) berarti 'guru' (laki-laki).", difficulty: "mudah", category: "profesi", points: 10 },
      { id: "fv9", type: "tebak-arti", question: "Apa arti kata ini?", arabicQuestion: "طَبِيب", options: ["Guru", "Dokter", "Petani", "Polisi"], answer: "Dokter", explanation: "طَبِيب (thabiib) berarti 'dokter'.", difficulty: "mudah", category: "profesi", points: 10 },
      { id: "fv10", type: "pilihan-ganda", question: "Mana yang berarti 'anak perempuan' dalam bahasa Arab?", options: ["وَلَد", "رَجُل", "بِنْت", "أَخ"], answer: "بِنْت", explanation: "بِنْت (bint) berarti 'anak perempuan' atau 'putri'.", difficulty: "mudah", category: "keluarga", points: 10 },
    ],
  },

  // ─────────────────────────────────────────────────────
  // 3. Warna & Sifat
  // ─────────────────────────────────────────────────────
  {
    id: "colors-adjectives",
    title: "Warna & Sifat",
    arabicTitle: "الألوان والصفات",
    description: "Uji pengetahuan tentang warna-warna dan kata sifat umum dalam bahasa Arab.",
    totalQuestions: 10,
    duration: 300,
    difficulty: "mudah",
    category: "mufradat",
    color: "violet",
    questions: [
      { id: "ca1", type: "tebak-arti", question: "Apa arti warna ini?", arabicQuestion: "أَحْمَر", options: ["Biru", "Hijau", "Merah", "Kuning"], answer: "Merah", explanation: "أَحْمَر (ahmar) berarti 'merah'.", difficulty: "mudah", category: "warna", points: 10 },
      { id: "ca2", type: "tebak-arti", question: "Apa arti warna ini?", arabicQuestion: "أَخْضَر", options: ["Hitam", "Hijau", "Putih", "Ungu"], answer: "Hijau", explanation: "أَخْضَر (akhdar) berarti 'hijau'.", difficulty: "mudah", category: "warna", points: 10 },
      { id: "ca3", type: "pilihan-ganda", question: "Bagaimana cara menulis warna 'biru' dalam bahasa Arab?", options: ["أَصْفَر", "أَبْيَض", "أَزْرَق", "أَسْوَد"], answer: "أَزْرَق", explanation: "أَزْرَق (azraq) berarti 'biru'.", difficulty: "mudah", category: "warna", points: 10 },
      { id: "ca4", type: "tebak-arti", question: "Apa arti warna ini?", arabicQuestion: "أَصْفَر", options: ["Jingga", "Kuning", "Coklat", "Abu-abu"], answer: "Kuning", explanation: "أَصْفَر (ashfar) berarti 'kuning'.", difficulty: "mudah", category: "warna", points: 10 },
      { id: "ca5", type: "pilihan-ganda", question: "Apa arti kata أَبْيَض (abyad)?", options: ["Hitam", "Putih", "Merah", "Hijau"], answer: "Putih", explanation: "أَبْيَض (abyad) berarti 'putih'.", difficulty: "mudah", category: "warna", points: 10 },
      { id: "ca6", type: "tebak-arti", question: "Apa arti sifat ini?", arabicQuestion: "صَغِير", options: ["Besar", "Tinggi", "Kecil", "Panjang"], answer: "Kecil", explanation: "صَغِير (shaghiir) berarti 'kecil'.", difficulty: "mudah", category: "sifat", points: 10 },
      { id: "ca7", type: "tebak-arti", question: "Apa arti sifat ini?", arabicQuestion: "طَوِيل", options: ["Pendek", "Berat", "Tinggi/Panjang", "Gemuk"], answer: "Tinggi/Panjang", explanation: "طَوِيل (thawiil) berarti 'tinggi' atau 'panjang'.", difficulty: "mudah", category: "sifat", points: 10 },
      { id: "ca8", type: "pilihan-ganda", question: "Mana yang berarti 'baru' dalam bahasa Arab?", options: ["قَدِيم", "جَدِيد", "كَبِير", "صَغِير"], answer: "جَدِيد", explanation: "جَدِيد (jadiid) berarti 'baru'. Lawannya قَدِيم (qadiim) = lama.", difficulty: "sedang", category: "sifat", points: 15 },
      { id: "ca9", type: "tebak-arti", question: "Apa arti sifat ini?", arabicQuestion: "سَرِيع", options: ["Lambat", "Cepat", "Kuat", "Lemah"], answer: "Cepat", explanation: "سَرِيع (sarii') berarti 'cepat'.", difficulty: "mudah", category: "sifat", points: 10 },
      { id: "ca10", type: "pilihan-ganda", question: "Apa arti kata نَظِيف (nazhiif)?", options: ["Kotor", "Bersih", "Basah", "Kering"], answer: "Bersih", explanation: "نَظِيف (nazhiif) berarti 'bersih'.", difficulty: "mudah", category: "sifat", points: 10 },
    ],
  },

  // ─────────────────────────────────────────────────────
  // 4. Kata Kerja (Fi'il)
  // ─────────────────────────────────────────────────────
  {
    id: "fiil-basic",
    title: "Kata Kerja (Fi'il)",
    arabicTitle: "الأفعال الأساسية",
    description: "Uji kemampuan mengenali dan memahami kata kerja dasar dalam bahasa Arab.",
    totalQuestions: 12,
    duration: 360,
    difficulty: "sedang",
    category: "fi'il",
    color: "amber",
    questions: [
      { id: "fb1", type: "tebak-arti", question: "Apa arti kata kerja ini?", arabicQuestion: "كَتَبَ", options: ["Membaca", "Menulis", "Belajar", "Berbicara"], answer: "Menulis", explanation: "كَتَبَ (kataba) berarti 'menulis' (fi'il madhi, subjek dia laki-laki).", difficulty: "mudah", category: "fi'il", points: 10 },
      { id: "fb2", type: "tebak-arti", question: "Apa arti kata kerja ini?", arabicQuestion: "قَرَأَ", options: ["Menulis", "Mendengar", "Membaca", "Melihat"], answer: "Membaca", explanation: "قَرَأَ (qara'a) berarti 'membaca'.", difficulty: "mudah", category: "fi'il", points: 10 },
      { id: "fb3", type: "tebak-arti", question: "Apa arti kata kerja ini?", arabicQuestion: "أَكَلَ", options: ["Minum", "Makan", "Tidur", "Berlari"], answer: "Makan", explanation: "أَكَلَ (akala) berarti 'makan'.", difficulty: "mudah", category: "fi'il", points: 10 },
      { id: "fb4", type: "tebak-arti", question: "Apa arti kata kerja ini?", arabicQuestion: "شَرِبَ", options: ["Makan", "Minum", "Masak", "Cuci"], answer: "Minum", explanation: "شَرِبَ (syariba) berarti 'minum'.", difficulty: "mudah", category: "fi'il", points: 10 },
      { id: "fb5", type: "pilihan-ganda", question: "Kata kerja apa yang berarti 'duduk'?", options: ["وَقَفَ", "جَلَسَ", "نَامَ", "رَكَضَ"], answer: "جَلَسَ", explanation: "جَلَسَ (jalasa) berarti 'duduk'. وَقَفَ = berdiri, نَامَ = tidur, رَكَضَ = berlari.", difficulty: "sedang", category: "fi'il", points: 15 },
      { id: "fb6", type: "tebak-arti", question: "Apa arti kata kerja ini?", arabicQuestion: "دَرَسَ", options: ["Bermain", "Mengajar", "Belajar", "Bekerja"], answer: "Belajar", explanation: "دَرَسَ (darasa) berarti 'belajar' atau 'mempelajari'.", difficulty: "mudah", category: "fi'il", points: 10 },
      { id: "fb7", type: "pilihan-ganda", question: "Apa arti kata فَتَحَ (fataha)?", options: ["Menutup", "Membuka", "Mengunci", "Memecah"], answer: "Membuka", explanation: "فَتَحَ (fataha) berarti 'membuka'.", difficulty: "mudah", category: "fi'il", points: 10 },
      { id: "fb8", type: "tebak-arti", question: "Apa arti kata kerja ini?", arabicQuestion: "سَمِعَ", options: ["Melihat", "Mencium", "Mendengar", "Menyentuh"], answer: "Mendengar", explanation: "سَمِعَ (sami'a) berarti 'mendengar'.", difficulty: "mudah", category: "fi'il", points: 10 },
      { id: "fb9", type: "pilihan-ganda", question: "Mana yang berarti 'kembali/pulang' dalam bahasa Arab?", options: ["ذَهَبَ", "دَخَلَ", "رَجَعَ", "خَرَجَ"], answer: "رَجَعَ", explanation: "رَجَعَ (raja'a) berarti 'kembali/pulang'. ذَهَبَ = pergi, دَخَلَ = masuk, خَرَجَ = keluar.", difficulty: "sedang", category: "fi'il", points: 15 },
      { id: "fb10", type: "tebak-arti", question: "Apa arti kata kerja ini?", arabicQuestion: "أَحَبَّ", options: ["Membenci", "Mencintai", "Takut", "Marah"], answer: "Mencintai", explanation: "أَحَبَّ (ahabba) berarti 'mencintai' atau 'menyukai'.", difficulty: "sedang", category: "fi'il", points: 15 },
      { id: "fb11", type: "pilihan-ganda", question: "يَكْتُبُ (yaktubu) adalah bentuk apa dari kata كَتَبَ?", options: ["Fi'il madhi", "Fi'il mudhari'", "Fi'il amr", "Isim fa'il"], answer: "Fi'il mudhari'", explanation: "يَكْتُبُ adalah fi'il mudhari' (kata kerja sekarang/akan datang) dari كَتَبَ.", difficulty: "sulit", category: "sharaf", points: 20 },
      { id: "fb12", type: "pilihan-ganda", question: "Kata اُكْتُبْ (uktub!) termasuk jenis fi'il apa?", options: ["Fi'il madhi", "Fi'il mudhari'", "Fi'il amr", "Fi'il nahi"], answer: "Fi'il amr", explanation: "اُكْتُبْ (uktub!) adalah fi'il amr — kata kerja perintah yang berarti 'Tulislah!'.", difficulty: "sulit", category: "sharaf", points: 20 },
    ],
  },

  // ─────────────────────────────────────────────────────
  // 5. Nahwu Dasar
  // ─────────────────────────────────────────────────────
  {
    id: "nahwu-basic",
    title: "Nahwu Dasar",
    arabicTitle: "النحو الأساسي",
    description: "Uji pemahaman nahwu: isim, fi'il, harf, i'rab, dan harf jarr.",
    totalQuestions: 12,
    duration: 480,
    difficulty: "sedang",
    category: "nahwu",
    color: "blue",
    questions: [
      { id: "nb1", type: "pilihan-ganda", question: "Kata مَدْرَسَة termasuk jenis kata apa?", options: ["Fi'il", "Isim", "Harf", "Dhamir"], answer: "Isim", explanation: "مَدْرَسَة adalah isim (kata benda) yang berarti 'sekolah'.", difficulty: "mudah", category: "nahwu", points: 10 },
      { id: "nb2", type: "pilihan-ganda", question: "Kata ذَهَبَ termasuk jenis kata apa?", options: ["Isim", "Harf", "Fi'il", "Sifat"], answer: "Fi'il", explanation: "ذَهَبَ adalah fi'il madhi (kata kerja) yang berarti 'pergi'.", difficulty: "mudah", category: "nahwu", points: 10 },
      { id: "nb3", type: "pilihan-ganda", question: "Kata فِي (fii) termasuk jenis kata apa?", options: ["Isim", "Fi'il", "Harf", "Dhamir"], answer: "Harf", explanation: "فِي adalah huruf jar (harf) yang berarti 'di dalam'.", difficulty: "sedang", category: "nahwu", points: 15 },
      { id: "nb4", type: "pilihan-ganda", question: "Dalam kalimat 'الْبَيْتُ كَبِيرٌ', kata الْبَيْتُ berperan sebagai apa?", options: ["Khabar", "Fa'il", "Mubtada'", "Maf'ul"], answer: "Mubtada'", explanation: "الْبَيْتُ adalah mubtada' (subjek) dalam jumlah ismiyyah. كَبِيرٌ adalah khabar (predikat).", difficulty: "sedang", category: "nahwu", points: 15 },
      { id: "nb5", type: "pilihan-ganda", question: "Manakah harf jarr yang berarti 'ke / menuju'?", options: ["مِنْ", "فِي", "إِلَى", "عَلَى"], answer: "إِلَى", explanation: "إِلَى (ilaa) berarti 'ke' atau 'menuju'. مِنْ = dari, فِي = di dalam, عَلَى = di atas.", difficulty: "sedang", category: "nahwu", points: 15 },
      { id: "nb6", type: "pilihan-ganda", question: "Tanda i'rab marfu' untuk isim mufrad adalah...", options: ["Fathah (ـَ)", "Kasrah (ـِ)", "Dhammah (ـُ)", "Sukun (ـْ)"], answer: "Dhammah (ـُ)", explanation: "Isim mufrad marfu' ditandai dengan dhammah di akhir kata, contoh: الطَّالِبُ.", difficulty: "sedang", category: "nahwu", points: 15 },
      { id: "nb7", type: "pilihan-ganda", question: "Manakah dhamir yang berarti 'kami / kita'?", options: ["أَنَا", "أَنْتَ", "نَحْنُ", "هُمْ"], answer: "نَحْنُ", explanation: "نَحْنُ (nahnu) berarti 'kami' atau 'kita'. أَنَا = saya, أَنْتَ = kamu, هُمْ = mereka.", difficulty: "mudah", category: "nahwu", points: 10 },
      { id: "nb8", type: "pilihan-ganda", question: "Kata هِيَ adalah dhamir untuk siapa?", options: ["Saya", "Dia (laki-laki)", "Dia (perempuan)", "Mereka"], answer: "Dia (perempuan)", explanation: "هِيَ (hiya) adalah dhamir untuk 'dia' perempuan. هُوَ (huwa) untuk laki-laki.", difficulty: "mudah", category: "nahwu", points: 10 },
      { id: "nb9", type: "pilihan-ganda", question: "Dalam kalimat 'ذَهَبَ الطَّالِبُ إِلَى الْمَدْرَسَةِ', kata الْمَدْرَسَةِ ber-i'rab...", options: ["Marfu'", "Mansub", "Majrur", "Jazm"], answer: "Majrur", explanation: "الْمَدْرَسَةِ majrur (kasrah) karena jatuh setelah harf jarr إِلَى.", difficulty: "sulit", category: "nahwu", points: 20 },
      { id: "nb10", type: "pilihan-ganda", question: "Manakah contoh jumlah fi'liyyah?", options: ["الْبَيْتُ كَبِير", "كَتَبَ الطَّالِب", "أَنَا مُعَلِّم", "الْكِتَابُ جَدِيد"], answer: "كَتَبَ الطَّالِب", explanation: "كَتَبَ الطَّالِب adalah jumlah fi'liyyah (diawali fi'il). Yang lain adalah jumlah ismiyyah.", difficulty: "sedang", category: "nahwu", points: 15 },
      { id: "nb11", type: "pilihan-ganda", question: "Apa itu harf jarr عَنْ ('an)?", options: ["Di atas", "Di bawah", "Dari / Tentang", "Bersama"], answer: "Dari / Tentang", explanation: "عَنْ ('an) berarti 'dari' atau 'tentang', contoh: تَكَلَّمَ عَنِ الدِّرَاسَة (berbicara tentang pelajaran).", difficulty: "sulit", category: "nahwu", points: 20 },
      { id: "nb12", type: "pilihan-ganda", question: "Kata الَّذِي (alladzii) adalah...", options: ["Harf jarr", "Isim maushul (kata penghubung)", "Dhamir", "Isim isyarah"], answer: "Isim maushul (kata penghubung)", explanation: "الَّذِي (alladzii) adalah isim maushul yang berarti 'yang' untuk subjek laki-laki tunggal.", difficulty: "sulit", category: "nahwu", points: 20 },
    ],
  },

  // ─────────────────────────────────────────────────────
  // 6. Sharaf: Tashrif
  // ─────────────────────────────────────────────────────
  {
    id: "sharaf-tashrif",
    title: "Sharaf & Tashrif",
    arabicTitle: "الصرف والتصريف",
    description: "Uji kemampuan tashrif fi'il madhi, mudhari', dan amr dalam berbagai dhamir.",
    totalQuestions: 10,
    duration: 480,
    difficulty: "sulit",
    category: "sharaf",
    color: "indigo",
    questions: [
      { id: "st1", type: "pilihan-ganda", question: "Apa bentuk fi'il mudhari' untuk kata كَتَبَ dengan dhamir هُوَ?", options: ["كَتَبَ", "يَكْتُبُ", "أَكْتُبُ", "تَكْتُبُ"], answer: "يَكْتُبُ", explanation: "يَكْتُبُ (yaktubu) adalah fi'il mudhari' dari كَتَبَ untuk dhamir هُوَ (dia laki-laki).", difficulty: "sedang", category: "sharaf", points: 15 },
      { id: "st2", type: "pilihan-ganda", question: "Apa bentuk fi'il madhi dari kata kerja 'membaca' untuk dhamir أَنَا?", options: ["قَرَأَ", "يَقْرَأُ", "قَرَأْتُ", "اِقْرَأْ"], answer: "قَرَأْتُ", explanation: "قَرَأْتُ (qara'tu) adalah fi'il madhi untuk dhamir أَنَا (saya). Artinya 'saya telah membaca'.", difficulty: "sedang", category: "sharaf", points: 15 },
      { id: "st3", type: "pilihan-ganda", question: "Fi'il amr dari kata ذَهَبَ untuk dhamir أَنْتَ adalah...", options: ["ذَهَبَ", "يَذْهَبُ", "اِذْهَبْ", "ذَهَبْتَ"], answer: "اِذْهَبْ", explanation: "اِذْهَبْ (idzhab!) adalah fi'il amr yang berarti 'Pergilah!' — perintah untuk satu orang laki-laki.", difficulty: "sulit", category: "sharaf", points: 20 },
      { id: "st4", type: "pilihan-ganda", question: "Apa arti كَتَبَا (katabaa)?", options: ["Dia (lk) menulis", "Saya menulis", "Mereka berdua (lk) menulis", "Kalian menulis"], answer: "Mereka berdua (lk) menulis", explanation: "كَتَبَا (katabaa) adalah fi'il madhi untuk dhamir huma (dual laki-laki) — 'mereka berdua menulis'.", difficulty: "sulit", category: "sharaf", points: 20 },
      { id: "st5", type: "pilihan-ganda", question: "Pola isim fa'il dari fi'il ثُلَاثِي (3 huruf) adalah...", options: ["مَفْعُول", "فَاعِل", "مِفْعَال", "فَعِيل"], answer: "فَاعِل", explanation: "Isim fa'il dari fi'il tsulasi mengikuti pola فَاعِل. Contoh: كَاتِب (penulis) dari كَتَبَ.", difficulty: "sulit", category: "sharaf", points: 20 },
      { id: "st6", type: "pilihan-ganda", question: "مَكْتُوب (maktuub) adalah contoh dari...", options: ["Isim fa'il", "Isim maf'ul", "Fi'il amr", "Masdar"], answer: "Isim maf'ul", explanation: "مَكْتُوب (maktuub) berarti 'yang tertulis' — isim maf'ul dengan pola مَفْعُول.", difficulty: "sulit", category: "sharaf", points: 20 },
      { id: "st7", type: "pilihan-ganda", question: "نَكْتُبُ (naktubu) adalah fi'il mudhari' untuk dhamir...", options: ["أَنَا", "نَحْنُ", "أَنْتُمْ", "هُمْ"], answer: "نَحْنُ", explanation: "نَكْتُبُ (naktubu) menggunakan prefiks نـ yang menunjukkan dhamir نَحْنُ (kami/kita).", difficulty: "sedang", category: "sharaf", points: 15 },
      { id: "st8", type: "pilihan-ganda", question: "Apa fi'il amr dari قَرَأَ untuk dhamir أَنْتِ (kamu perempuan)?", options: ["اِقْرَأْ", "اِقْرَئِي", "تَقْرَئِين", "قَرَأَتْ"], answer: "اِقْرَئِي", explanation: "اِقْرَئِي (iqra'ii) adalah fi'il amr untuk dhamir أَنْتِ (kamu perempuan). Bedakan dengan اِقْرَأْ untuk laki-laki.", difficulty: "sulit", category: "sharaf", points: 20 },
      { id: "st9", type: "pilihan-ganda", question: "Masdar dari kata kerja كَتَبَ adalah...", options: ["كَاتِب", "مَكْتُوب", "كِتَابَة", "يَكْتُبُ"], answer: "كِتَابَة", explanation: "كِتَابَة (kitaabah) adalah masdar dari كَتَبَ, artinya 'kegiatan menulis'.", difficulty: "sulit", category: "sharaf", points: 20 },
      { id: "st10", type: "pilihan-ganda", question: "Apa arti kata كَتَبُوا (katabuu)?", options: ["Dia (pr) menulis", "Saya menulis", "Mereka (lk, lebih 2) menulis", "Kamu menulis"], answer: "Mereka (lk, lebih 2) menulis", explanation: "كَتَبُوا (katabuu) adalah fi'il madhi untuk dhamir هُمْ (mereka laki-laki lebih dari 2).", difficulty: "sedang", category: "sharaf", points: 15 },
    ],
  },

  // ─────────────────────────────────────────────────────
  // 7. Percakapan & Ekspresi
  // ─────────────────────────────────────────────────────
  {
    id: "percakapan-expressions",
    title: "Percakapan & Ekspresi",
    arabicTitle: "المحادثة والتعابير",
    description: "Uji kemampuan percakapan sehari-hari dan ekspresi umum dalam bahasa Arab.",
    totalQuestions: 10,
    duration: 300,
    difficulty: "mudah",
    category: "percakapan",
    color: "green",
    questions: [
      { id: "pe1", type: "pilihan-ganda", question: "Apa jawaban yang tepat untuk السَّلَامُ عَلَيْكُمْ?", options: ["كَيْفَ حَالُك؟", "وَعَلَيْكُمُ السَّلَام", "شُكْرًا", "صَبَاحُ الْخَيْر"], answer: "وَعَلَيْكُمُ السَّلَام", explanation: "Jawaban untuk salam السَّلَامُ عَلَيْكُمْ adalah وَعَلَيْكُمُ السَّلَام (wa 'alaykumus-salaam).", difficulty: "mudah", category: "percakapan", points: 10 },
      { id: "pe2", type: "pilihan-ganda", question: "Apa arti ungkapan شُكْرًا جَزِيلًا?", options: ["Maaf banyak", "Terima kasih banyak", "Selamat datang", "Hati-hati"], answer: "Terima kasih banyak", explanation: "شُكْرًا جَزِيلًا (syukran jaziilan) berarti 'terima kasih banyak'.", difficulty: "mudah", category: "ekspresi", points: 10 },
      { id: "pe3", type: "pilihan-ganda", question: "Bagaimana cara mengatakan 'Selamat pagi' dalam bahasa Arab?", options: ["مَسَاءُ الْخَيْر", "صَبَاحُ الْخَيْر", "لَيْلَة سَعِيدَة", "أَهْلًا وَسَهْلًا"], answer: "صَبَاحُ الْخَيْر", explanation: "صَبَاحُ الْخَيْر (shabaahul khayr) berarti 'Selamat pagi'. Jawabannya: صَبَاحُ النُّور.", difficulty: "mudah", category: "percakapan", points: 10 },
      { id: "pe4", type: "tebak-arti", question: "Apa arti ungkapan ini?", arabicQuestion: "مِنْ أَيْنَ أَنْت؟", options: ["Siapa namamu?", "Dari mana kamu?", "Di mana kamu tinggal?", "Apa pekerjaanmu?"], answer: "Dari mana kamu?", explanation: "مِنْ أَيْنَ أَنْت؟ (min ayna anta?) berarti 'Dari mana kamu?'", difficulty: "mudah", category: "percakapan", points: 10 },
      { id: "pe5", type: "pilihan-ganda", question: "Bagaimana cara mengatakan 'Tolong' dalam bahasa Arab?", options: ["شُكْرًا", "عَفْوًا", "مِنْ فَضْلِك", "نَعَم"], answer: "مِنْ فَضْلِك", explanation: "مِنْ فَضْلِك (min fadhlika) berarti 'tolong' atau 'silakan'. Dipakai saat meminta bantuan.", difficulty: "mudah", category: "ekspresi", points: 10 },
      { id: "pe6", type: "tebak-arti", question: "Apa arti ungkapan ini?", arabicQuestion: "كَيْفَ حَالُك؟", options: ["Apa kabarmu?", "Siapa namamu?", "Di mana rumahmu?", "Berapa umurmu?"], answer: "Apa kabarmu?", explanation: "كَيْفَ حَالُك؟ (kayfa haaluk?) berarti 'Bagaimana kabarmu?'. Jawabannya: بِخَيْر، شُكْرًا.", difficulty: "mudah", category: "percakapan", points: 10 },
      { id: "pe7", type: "pilihan-ganda", question: "Apa arti بِكَمْ هَذَا؟ (bikam haadha?)?", options: ["Apakah ini milikmu?", "Berapa harganya?", "Di mana ini dijual?", "Apakah ini murah?"], answer: "Berapa harganya?", explanation: "بِكَمْ هَذَا؟ berarti 'Berapa harganya?' — digunakan saat berbelanja.", difficulty: "mudah", category: "percakapan", points: 10 },
      { id: "pe8", type: "pilihan-ganda", question: "Ungkapan أَنَا مِنْ إِنْدُونِيسِيَا berarti...", options: ["Saya suka Indonesia", "Saya pergi ke Indonesia", "Saya dari Indonesia", "Saya tinggal di Indonesia"], answer: "Saya dari Indonesia", explanation: "أَنَا مِنْ إِنْدُونِيسِيَا (ana min indonesia) berarti 'Saya dari Indonesia'.", difficulty: "mudah", category: "percakapan", points: 10 },
      { id: "pe9", type: "tebak-arti", question: "Apa arti ungkapan ini?", arabicQuestion: "عَفْوًا", options: ["Terima kasih", "Sama-sama / Maaf", "Tolong", "Halo"], answer: "Sama-sama / Maaf", explanation: "عَفْوًا ('afwan) bisa berarti 'sama-sama' (jawaban terima kasih) atau 'maaf'.", difficulty: "mudah", category: "ekspresi", points: 10 },
      { id: "pe10", type: "pilihan-ganda", question: "Bagaimana cara mengatakan 'Sampai jumpa' dalam bahasa Arab?", options: ["أَهْلًا وَسَهْلًا", "مَعَ السَّلَامَة", "صَبَاحُ الْخَيْر", "بِخَيْر"], answer: "مَعَ السَّلَامَة", explanation: "مَعَ السَّلَامَة (ma'as-salaama) berarti 'Selamat tinggal' atau 'Sampai jumpa'. Jawaban: إِلَى اللِّقَاء.", difficulty: "sedang", category: "percakapan", points: 15 },
    ],
  },
];

export interface Badge {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  requirement: number;
}

export const badges: Badge[] = [
  { id: "first-quiz",    name: "Pemula Bersemangat", icon: Star,     description: "Selesaikan quiz pertama",                requirement: 1   },
  { id: "perfect-score", name: "Sempurna!",           icon: Target,   description: "Dapatkan nilai 100 dalam satu quiz",     requirement: 100 },
  { id: "speed-demon",   name: "Cepat Kilat",         icon: Zap,      description: "Selesaikan quiz dalam waktu kurang 1 menit", requirement: 60 },
  { id: "streak-7",      name: "Konsisten 7 Hari",    icon: Flame,    description: "Belajar 7 hari berturut-turut",           requirement: 7   },
  { id: "vocab-master",  name: "Ahli Kosakata",       icon: BookOpen, description: "Pelajari 100 kosakata",                  requirement: 100 },
  { id: "quiz-hero",     name: "Juara Quiz",          icon: Trophy,   description: "Selesaikan 10 set quiz",                 requirement: 10  },
  { id: "grammar-guru",  name: "Guru Nahwu",          icon: Brain,    description: "Raih nilai sempurna di quiz Nahwu",      requirement: 100 },
];
