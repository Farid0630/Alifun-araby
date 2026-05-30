# Panduan Deploy ke Vercel

## Cara Deploy (Vercel Normal — Recommended)

### 1. Push ke GitHub
```bash
git add .
git commit -m "ready to deploy"
git push
```

### 2. Import di Vercel
- Buka https://vercel.com/new
- Pilih repository GitHub kamu
- Klik **Import**

### 3. Set Environment Variable
Di Vercel Dashboard:
- Settings → Environment Variables
- Tambahkan:
  - Name: `GEMINI_API_KEY`
  - Value: `API_KEY_KAMU` (key baru dari https://aistudio.google.com/apikey)
  - Environment: Production + Preview + Development

### 4. Deploy
Klik **Deploy** — selesai!

---

## Catatan Penting

- File `.env.local` TIDAK perlu di-upload ke Vercel (sudah di .gitignore)
- API key disimpan aman di Vercel environment variables (tidak terekspos ke browser)
- Route `/api/chat` berjalan sebagai Serverless Function (gratis di hobby plan)
- Semua halaman static ter-generate otomatis saat build

## Free Tier Vercel (Hobby Plan)
- 100 GB bandwidth/bulan
- Serverless Function: 100.000 invocations/bulan  
- Build: 6.000 menit/bulan
- Lebih dari cukup untuk project ini
