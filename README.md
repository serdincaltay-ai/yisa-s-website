# YİSA-S Website + Robot

Next.js 14 + Tailwind + Framer Motion + Supabase + Claude AI

## 🚀 HIZLI DEPLOY (5 DAKİKA)

### 1. Supabase Kurulumu
```bash
# supabase.com'da yeni proje oluştur
# SQL Editor'da supabase.sql dosyasını çalıştır
```

### 2. Vercel Deploy
```bash
# GitHub'a push et
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/yisa-s-website.git
git push -u origin main

# vercel.com'da "Import Project" ile GitHub repo'yu bağla
```

### 3. Environment Variables (Vercel'de)
Tüm aküler için örnek: `.env.example` içinde **GPT, Claude, Together, Gemini, v0, Cursor, GitHub, Vercel, Supabase, Railway** env anahtarları listelenir. Kullanacağınız aküleri ilgili anahtarla aktifleştirin:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # Panel listeleri için (opsiyonel, RLS bypass)
ANTHROPIC_API_KEY=sk-ant-...      # Claude (NeebChat)
# OPENAI_API_KEY=sk-...            # GPT
# TOGETHER_API_KEY=...             # Together
# GOOGLE_GENERATIVE_AI_API_KEY=... # Gemini
NEXT_PUBLIC_SITE_URL=https://yisa-s.com
```
**Akü durumu:** `GET /api/akular/durum` — hangi akülerin env ile aktif olduğunu döner. Tanımlar: `lib/akular.ts`.  
**Railway, Vercel, Supabase, GitHub** — hangi env, nerede ayar: **`RAILWAY_VERCEL_SUPABASE_GITHUB.md`**.

### 4. Domain Bağlama (Vercel)
**Bu proje:** yisa-s.com — satılacak sistemin tanıtım sayfası. Patron paneli **app.yisa-s.com** ayrı projededir (yisa-s-app).

1. Settings > Domains
2. yisa-s.com ekle
3. DNS ayarları:
   - A Record: 76.76.21.21
   - CNAME: cname.vercel-dns.com

## 📁 DOSYA YAPISI
```
yisa-s-site/
├── app/
│   ├── page.tsx              # Ana sayfa
│   ├── layout.tsx            # Root layout + Robot
│   ├── globals.css           # Tailwind + custom
│   ├── ozellikler/           # 900 alan, AI, PHV
│   ├── fiyatlandirma/        # Paketler
│   ├── franchise/            # Başvuru formu
│   ├── demo/                 # Demo talep formu
│   ├── hakkimizda/           # İletişim, SSS
│   ├── robot/                # Robot tanıtım
│   ├── blog/                 # Blog (placeholder)
│   ├── giris/                # E-posta + şifre ile giriş (Supabase Auth)
│   ├── panel/                # Kontrol paneli (asistan karşılama)
│   │   ├── demo-listesi/     # Tanıtım talepleri listesi
│   │   └── bayilik-listesi/  # Bayilik başvuruları listesi
│   └── api/
│       ├── demo/route.ts     # Tanıtım talep POST (demo_requests)
│       ├── franchise/route.ts # Bayilik başvuru POST (franchise_applications)
│       ├── panel/demo-listesi/route.ts  # Tanıtım listesi GET
│       ├── panel/bayilik-listesi/route.ts # Bayilik listesi GET
│       └── robot/chat/route.ts # Robot API
├── components/
│   ├── layout/               # Header, Footer
│   ├── home/                 # Hero, Stats, Features...
│   └── robot/                # ChatWidget
├── lib/
│   ├── knowledge/yisas.ts    # TÜM BİLGİLER TEK DOSYA
│   └── supabase.ts           # Client
├── supabase.sql              # Veritabanı tabloları
└── package.json
```

## 🤖 ROBOT ÖZELLİKLERİ
- Her sayfada floating widget
- Claude Sonnet 4 entegrasyonu  
- Session bazlı konuşma
- Quick actions: Demo, Fiyat, Franchise
- Chat log kayıt (Supabase)

## 📊 BİLGİ BANKASI
Tüm veriler `/lib/knowledge/yisas.ts` dosyasında:
- 900 alan (30 kategori listesi)
- 6 AI motoru
- PHV aşamaları
- 10 branş
- Fiyatlandırma
- Franchise bilgileri
- Robot system prompt

## 🖥️ KONTROL PANELİ
- **Giriş:** `/giris` — E-posta + şifre (Supabase Auth)
- **Panel:** `/panel` — Giriş sonrası asistan karşılama sayfası
- **Tanıtım talepleri:** `/panel/demo-listesi` — demo_requests tablosundan liste
- **Bayilik başvuruları:** `/panel/bayilik-listesi` — franchise_applications tablosundan liste

Veritabanı şeması: `sql/YISA-S-FRANCHISE-TAM-SEMA.sql` (32 tablo). Panel listeleri için `SUPABASE_SERVICE_ROLE_KEY` tanımlanırsa RLS olmadan okuma yapılır.

## 📱 PWA (Web Uygulaması)
- **Manifest:** `app/manifest.ts` — Uygulama adı, renkler, ikonlar, kısayollar (Ana Sayfa, Tanıtım, Bayilik, Giriş).
- **İkon:** `public/icons/icon-192.svg` — “Ana ekrana ekle” için kullanılır.
- **Meta:** `viewport` ve `themeColor` layout’ta tanımlı; `manifest.webmanifest` otomatik sunulur.
- Tarayıcıdan “Ana ekrana ekle” / “Add to Home Screen” ile PWA olarak kullanılabilir.

## ⚡ AKÜ KONTROLÜ
- **Sayfa:** `/akular` — Tüm aküleri dener, birbirine bağlı mı ve olması gerektiği gibi çalışıyor mu gösterir.
- **API:** `GET /api/akular/kontrol` — Akü durumları, bağlantı testleri (Panel→Supabase, NeebChat→Claude, Formlar→Supabase vb.) ve özet.
- **Durum API:** `GET /api/akular/durum` — Sadece hangi akülerin env ile aktif olduğu.
- Footer’da “Akü Kontrol” linki vardır.

## 🔧 LOKAL GELİŞTİRME
```bash
npm install
cp .env.example .env.local
# .env.local'i doldur (Supabase URL, anon key, isteğe bağlı service_role key)
npm run dev
```
**Adım adım tam kurulum:** [KURULUM.md](./KURULUM.md) — Supabase proje açma, şema çalıştırma, Auth kullanıcısı, giriş/panel testi.

## ✅ CHECKLIST
- [ ] Supabase proje oluştur
- [ ] SQL çalıştır
- [ ] Vercel'e deploy et
- [ ] Environment variables ekle
- [ ] Domain bağla
- [ ] Robot test et
- [ ] Demo formu test et
