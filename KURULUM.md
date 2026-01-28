# YİSA-S Site + Panel — Adım Adım Kurulum Rehberi

Bu rehber, projeyi sıfırdan Supabase ve lokalde çalışır hale getirmek için gereken adımları açıklar.

---

## 1. Gereksinimler

- Node.js 18+
- Supabase hesabı
- (Opsiyonel) Claude API anahtarı (robot için)

---

## 2. Supabase Projesi Oluşturma

1. [supabase.com](https://supabase.com) → **Start your project** → giriş yapın.
2. **New Project** ile yeni proje oluşturun.
3. **Name**, **Database Password**, **Region** girin; **Create new project** deyin.
4. Proje hazır olana kadar bekleyin (birkaç dakika).

---

## 3. Veritabanı Şemasını Çalıştırma

1. Supabase Dashboard → projenizi seçin.
2. Sol menüden **SQL Editor** açın.
3. **New query** ile yeni sorgu oluşturun.
4. Projedeki `sql/YISA-S-FRANCHISE-TAM-SEMA.sql` dosyasının **tüm içeriğini** kopyalayıp SQL Editor’e yapıştırın.
5. **Run** (veya Ctrl+Enter) ile çalıştırın.
6. Hata yoksa “Success” görünür. Bu şema `demo_requests`, `franchise_applications`, `robot_chat_logs` ve diğer tabloları oluşturur.

---

## 4. İlk Panel Kullanıcısını Oluşturma (Auth)

Panel girişi Supabase **Auth** kullanıcıları ile yapılır.

1. Dashboard → **Authentication** → **Users**.
2. **Add user** → **Create new user**.
3. **Email** ve **Password** girin (bu bilgilerle `/giris` sayfasından giriş yapacaksınız).
4. **Create user** deyin.

Şifre en az 6 karakter olmalı; canlı ortamda güçlü bir şifre kullanın.

---

## 5. Ortam Değişkenlerini Ayarlama

1. Proje kökünde `.env.example` dosyasını `.env.local` olarak kopyalayın:

   ```bash
   # Linux / Mac / Git Bash
   cp .env.example .env.local

   # Windows (CMD)
   copy .env.example .env.local
   ```

2. Supabase Dashboard → **Project Settings** (sol alttaki dişli) → **API**.
3. Şunları kopyalayın:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** (Project API keys altında) → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** (gizli anahtar) → `SUPABASE_SERVICE_ROLE_KEY`  
     (Panel listelerinin RLS olmadan okunması için gerekli; güvenli tutun, client tarafında kullanmayın.)

4. `.env.local` dosyasını açıp değerleri doldurun:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

   ANTHROPIC_API_KEY=sk-ant-api03-...

   NEXT_PUBLIC_SITE_URL=https://yisa-s.com
   ```

   `ANTHROPIC_API_KEY` robot için; yoksa robot “Robot şu an yapılandırılmamış” der, site yine çalışır.

---

## 6. Bağımlılıkları Yükleyip Uygulamayı Çalıştırma

```bash
npm install
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) açılır.

---

## 7. Giriş ve Panel Testi

1. **Giriş:** [http://localhost:3000/giris](http://localhost:3000/giris)  
   - 4. adımda oluşturduğunuz e-posta ve şifre ile giriş yapın.
2. **Panel:** Giriş başarılıysa otomatik olarak `/panel` sayfasına yönlendirilirsiniz.  
   - “Hoş geldiniz, …” ve **Tanıtım talepleri** / **Bayilik başvuruları** linkleri görünür.
3. **Tanıtım talepleri:** `/panel/demo-listesi` — `demo_requests` tablosundan listelenir.
4. **Bayilik başvuruları:** `/panel/bayilik-listesi` — `franchise_applications` tablosundan listelenir.
5. **Çıkış:** Paneldeki **Çıkış Yap** ile çıkıp tekrar `/giris` üzerinden deneyebilirsiniz.

`SUPABASE_SERVICE_ROLE_KEY` tanımlı değilse panel listeleri RLS nedeniyle boş görünebilir; service role key ekleyince listeler dolar.

---

## 8. Form ve API Kontrolü

- **Tanıtım talebi:** [http://localhost:3000/demo](http://localhost:3000/demo) — formu doldurup gönderin; kayıt `demo_requests` tablosuna düşer. Panelde **Tanıtım talepleri**nde görünür.
- **Bayilik başvurusu:** [http://localhost:3000/franchise](http://localhost:3000/franchise) — formu doldurup gönderin; kayıt `franchise_applications` tablosuna düşer. Panelde **Bayilik başvuruları**nda görünür.

---

## 9. Panel Koruması (Middleware)

`/panel` ve `/panel/*` yolları sunucu tarafında korunur:

- Oturum (cookie) yoksa veya geçersizse istek doğrudan `/giris` sayfasına yönlendirilir.
- Giriş sayfasında oturum açıldığında session çerezde tutulur; panel sayfalarına erişim serbesttir.

Bu davranış `middleware.ts` ve `@supabase/ssr` ile sağlanır.

---

## 10. Sorun Giderme

| Sorun | Olası neden | Çözüm |
|-------|--------------|--------|
| Girişte “Yapılandırma eksik” | `.env.local` yok veya Supabase değişkenleri eksik | `NEXT_PUBLIC_SUPABASE_URL` ve `NEXT_PUBLIC_SUPABASE_ANON_KEY` tanımlı olmalı |
| Panel listeleri boş | RLS veya yetki | `SUPABASE_SERVICE_ROLE_KEY` ekleyin veya ilgili tablolar için RLS politikalarını kontrol edin |
| “E-posta veya şifre hatalı” | Kullanıcı Auth’ta yok / şifre yanlış | Authentication → Users’ta kullanıcıyı kontrol edin; gerekirse yeni kullanıcı ekleyin |
| Demo/Bayilik formu 503 / hata | Supabase URL veya anon key eksik | `.env.local` içinde `NEXT_PUBLIC_SUPABASE_*` değerlerini doğrulayın |
| `@supabase/ssr` bulunamıyor | Paket yüklü değil | `npm install` ile bağımlılıkları tekrar yükleyin |
| Robot “yapılandırılmamış” diyor | `ANTHROPIC_API_KEY` yok | `.env.local` içine Claude API anahtarını ekleyin |
| Demo/Bayilik formunda “Zorunlu alanlar…” | E-posta, ad veya (bayilikte) telefon/il eksik | Formda zorunlu alanları doldurun |

---

## 11. Tam Kurulum Checklist

- [ ] Supabase projesi oluşturuldu
- [ ] `sql/YISA-S-FRANCHISE-TAM-SEMA.sql` SQL Editor’de çalıştırıldı
- [ ] Authentication → Users’ta panel için bir kullanıcı oluşturuldu
- [ ] `.env.local` oluşturuldu; `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (ve istenirse `SUPABASE_SERVICE_ROLE_KEY`) yazıldı
- [ ] `npm install` ve `npm run dev` çalıştırıldı
- [ ] `/giris` ile giriş yapılıp `/panel` ve liste sayfaları test edildi
- [ ] Demo ve Bayilik formlarıyla birer kayıt oluşturulup panelde göründüğü kontrol edildi
- [ ] (İsteğe bağlı) `ANTHROPIC_API_KEY` tanımlanıp robot sohbeti test edildi

Bu adımlar tamamlandığında site ve kontrol paneli tam kurulumla kullanıma hazırdır. Şema (`sql/YISA-S-FRANCHISE-TAM-SEMA.sql`) ile API/panel kolon adları uyumludur; demo_requests, franchise_applications ve robot_chat_logs tabloları bu şemaya göre çalışır.

**Sahada tüm bağlantıların aktif ve sistemin “tam aktif online” olması** için uçlar, test adımları ve tek istekli kontrol: **`TAM_KURULUM_AKTIF_ONLINE.md`** dosyasına bakın. `/api/sistem-durum` ve `/akular` sayfası ile tek yerden tüm bağlantıları doğrulayabilirsiniz.
