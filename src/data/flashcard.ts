export interface Flashcard {
  id: string;
  arabic: string;
  latin: string;
  indonesian: string;
  example?: string;
  exampleLatin?: string;
  exampleIndonesian?: string;
  category: string;
  difficulty: "mudah" | "sedang" | "sulit";
}

export const flashcards: Flashcard[] = [
  { id: "f1", arabic: "كِتَاب", latin: "kitaab", indonesian: "buku", example: "هَذَا كِتَابٌ جَدِيد", exampleLatin: "Haadzaa kitaabun jadiid", exampleIndonesian: "Ini adalah buku baru", category: "benda", difficulty: "mudah" },
  { id: "f2", arabic: "بَيْت", latin: "bayt", indonesian: "rumah", example: "الْبَيْتُ كَبِير", exampleLatin: "Al-baytu kabiir", exampleIndonesian: "Rumah itu besar", category: "benda", difficulty: "mudah" },
  { id: "f3", arabic: "مَاء", latin: "maa'", indonesian: "air", example: "أُرِيدُ مَاءً", exampleLatin: "Uriidu maa'an", exampleIndonesian: "Saya ingin air", category: "benda", difficulty: "mudah" },
  { id: "f4", arabic: "طَعَام", latin: "tha'aam", indonesian: "makanan", example: "الطَّعَامُ لَذِيذ", exampleLatin: "Ath-tha'aamu ladziidz", exampleIndonesian: "Makanan itu lezat", category: "benda", difficulty: "mudah" },
  { id: "f5", arabic: "مَدْرَسَة", latin: "madrasah", indonesian: "sekolah", example: "أَنَا فِي الْمَدْرَسَة", exampleLatin: "Anaa fil-madrasah", exampleIndonesian: "Saya di sekolah", category: "tempat", difficulty: "mudah" },
  { id: "f6", arabic: "مَسْجِد", latin: "masjid", indonesian: "masjid", example: "نُصَلِّي فِي الْمَسْجِد", exampleLatin: "Nushallii fil-masjid", exampleIndonesian: "Kita shalat di masjid", category: "tempat", difficulty: "mudah" },
  { id: "f7", arabic: "قَرَأَ", latin: "qara'a", indonesian: "membaca", example: "قَرَأَ الطَّالِب", exampleLatin: "Qara'a ath-thaalib", exampleIndonesian: "Pelajar itu membaca", category: "kerja", difficulty: "sedang" },
  { id: "f8", arabic: "كَتَبَ", latin: "kataba", indonesian: "menulis", example: "كَتَبَ الدَّرْس", exampleLatin: "Kataba ad-dars", exampleIndonesian: "Dia menulis pelajaran", category: "kerja", difficulty: "sedang" },
  { id: "f9", arabic: "ذَهَبَ", latin: "dzahaba", indonesian: "pergi", example: "ذَهَبَ إِلَى الْمَدْرَسَة", exampleLatin: "Dzahaba ilal-madrasah", exampleIndonesian: "Dia pergi ke sekolah", category: "kerja", difficulty: "sedang" },
  { id: "f10", arabic: "أَكَلَ", latin: "akala", indonesian: "makan", example: "أَكَلَ الطَّعَام", exampleLatin: "Akala ath-tha'aam", exampleIndonesian: "Dia makan makanan", category: "kerja", difficulty: "mudah" },
  { id: "f11", arabic: "جَمِيل", latin: "jamiil", indonesian: "indah / cantik", example: "الْمَنْظَرُ جَمِيل", exampleLatin: "Al-mandzharu jamiil", exampleIndonesian: "Pemandangannya indah", category: "sifat", difficulty: "mudah" },
  { id: "f12", arabic: "كَبِير", latin: "kabiir", indonesian: "besar", example: "الْبَيْتُ كَبِير", exampleLatin: "Al-baytu kabiir", exampleIndonesian: "Rumah itu besar", category: "sifat", difficulty: "mudah" },
  { id: "f13", arabic: "صَغِير", latin: "shaghiir", indonesian: "kecil", example: "الْقَلَمُ صَغِير", exampleLatin: "Al-qalamu shaghiir", exampleIndonesian: "Penanya kecil", category: "sifat", difficulty: "mudah" },
  { id: "f14", arabic: "سَعِيد", latin: "sa'iid", indonesian: "bahagia", example: "أَنَا سَعِيد", exampleLatin: "Anaa sa'iid", exampleIndonesian: "Saya bahagia", category: "sifat", difficulty: "mudah" },
  { id: "f15", arabic: "طَالِب", latin: "thaalib", indonesian: "pelajar", example: "هُوَ طَالِب مُجْتَهِد", exampleLatin: "Huwa thaalib mujtahid", exampleIndonesian: "Dia pelajar yang rajin", category: "orang", difficulty: "mudah" },
  { id: "f16", arabic: "مُعَلِّم", latin: "mu'allim", indonesian: "guru", example: "الْمُعَلِّمُ يَشْرَح", exampleLatin: "Al-mu'allimu yasyrahu", exampleIndonesian: "Guru itu menjelaskan", category: "orang", difficulty: "mudah" },
  { id: "f17", arabic: "أُسْرَة", latin: "usrah", indonesian: "keluarga", example: "أُسْرَتِي كَبِيرَة", exampleLatin: "Usratii kabirah", exampleIndonesian: "Keluargaku besar", category: "orang", difficulty: "sedang" },
  { id: "f18", arabic: "يَوْم", latin: "yawm", indonesian: "hari", example: "يَوْمٌ جَمِيل", exampleLatin: "Yawmun jamiil", exampleIndonesian: "Hari yang indah", category: "waktu", difficulty: "mudah" },
  { id: "f19", arabic: "أَسْبُوع", latin: "usbuu'", indonesian: "minggu", example: "فِي هَذَا الْأُسْبُوع", exampleLatin: "Fii haadzal-usbuu'", exampleIndonesian: "Pada minggu ini", category: "waktu", difficulty: "sedang" },
  { id: "f20", arabic: "شَمْس", latin: "syams", indonesian: "matahari", example: "الشَّمْسُ مُشْرِقَة", exampleLatin: "Asy-syamsu musyriqah", exampleIndonesian: "Matahari bersinar", category: "alam", difficulty: "mudah" },
];

export const flashcardCategories = [
  { id: "all", label: "Semua" },
  { id: "benda", label: "Kata Benda" },
  { id: "kerja", label: "Kata Kerja" },
  { id: "sifat", label: "Kata Sifat" },
  { id: "tempat", label: "Tempat" },
  { id: "orang", label: "Orang" },
  { id: "waktu", label: "Waktu" },
  { id: "alam", label: "Alam" },
];
