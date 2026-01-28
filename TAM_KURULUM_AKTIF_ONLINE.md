# Tam Kurulum — Bütün Bağlantılar Sahada, Sistem Aktif Online

Bu belge: **(1)** Kurulumun bittiği ve sistemin “tam aktif online” sayılması için gerekenleri, **(2)** Sahada tüm bağlantıları tek yerden kontrol etmeyi açıklar.

---

## 1. Sistem “Aktif Online” Ne Demek?

Aşağıdakilerin hepsi sağlandığında sistem **tam aktif online** kabul edilir:

| Bileşen | Bağlantı | Nasıl Kontrol? |
|--------|----------|-----------------|
| **Supabase** | `.env.local` → URL + anon key; veritabanı erişimi | `GET /api/sistem-durum` veya `GET /api/akular/kontrol` |
| **Panel (Giriş)** | Supabase Auth + middleware | `/giris` → e‑posta/şifre → `/panel` |
| **Formlar (Tanıtım / Bayilik)** | API → Supabase `demo_requests` / `franchise_applications` | `/demo`, `/franchise` formu gönder |
| **Panel listeleri** | Oturum + Supabase (anon veya service_role) | Giriş sonrası `/panel/demo-listesi`, `/panel/bayilik-listesi` |
| **NeebChat (Robot)** | `ANTHROPIC_API_KEY` | Sayfada chat açıp mesaj gönder |
| **Akü kontrolü** | Tüm aküler env + Supabase erişim testi | `GET /api/akular/kontrol` veya `/akular` sayfası |
| **Sistem durumu** | Tek istekle kritik bağlantılar | `GET /api/sistem-durum` |

---

## 2. Sahada Tek İstekle Kontrol

**Sistem durumu (özet):**

```
GET /api/sistem-durum
```

Örnek (lokalde):

```
http://localhost:3000/api/sistem-durum
```

Yanıt örneği:

```json
{
  "ok": true,
  "sistemAktif": true,
  "baglantilar": {
    "supabase": { "env": true, "erisim": "ok" },
    "robot": { "env": true },
    "panel": { "env": true },
    "formlar": { "env": true },
    "siteUrl": "https://yisa-s.com"
  },
  "zaman": "2026-01-28T...",
  "mesaj": "Tüm kritik bağlantılar aktif; sistem online."
}
```

`ok` ve `sistemAktif` true ise Supabase erişilebilir ve Claude (robot) env ile tanımlı demektir.

**Detaylı akü + bağlantı kontrolü:**

```
GET /api/akular/kontrol
```

Veya tarayıcıda **/akular** sayfasını açın. Bu sayfa hem `/api/akular/kontrol` hem `/api/sistem-durum` çağırır; üstte **“Sistem Aktif Online”** / **“Sistem Eksik”** göstergesi görünür.

---

## 3. Tüm API Uçları (Sahada Kullanılanlar)

| Metot | Uç | Açıklama |
|-------|-----|-----------|
| GET | `/api/sistem-durum` | Kritik bağlantılar tek istek; sistem aktif mi? |
| GET | `/api/akular/durum` | Sadece env ile hangi akülerin “aktif” sayıldığı |
| GET | `/api/akular/kontrol` | Aküler + Supabase erişim + bağlantı matrisi |
| POST | `/api/demo` | Tanıtım talebi → `demo_requests` |
| POST | `/api/franchise` | Bayilik başvurusu → `franchise_applications` |
| POST | `/api/robot/chat` | NeebChat mesajı → Claude + isteğe bağlı `robot_chat_logs` |
| GET | `/api/panel/demo-listesi` | Oturum gerekli; demo listesi |
| GET | `/api/panel/bayilik-listesi` | Oturum gerekli; bayilik listesi |

Panel API’leri **cookie ile oturum** bekler; oturum yoksa 401 döner.

---

## 4. Sayfa Özeti (Çalışır Hale Getirildiği Haliyle)

| Sayfa | Durum |
|-------|--------|
| `/` | Ana sayfa |
| `/giris` | Supabase Auth; başarıda `/panel` |
| `/panel` | Oturum yoksa `/giris`; Tanıtım / Bayilik / Çıkış |
| `/panel/demo-listesi` | Demo talepleri tablosu |
| `/panel/bayilik-listesi` | Bayilik başvuruları tablosu |
| `/demo` | Tanıtım talebi formu |
| `/franchise` | Bayilik başvuru formu |
| `/akular` | Akü kontrolü + **Sistem Aktif Online** göstergesi |
| `/robot` | NeebChat (Claude) |

---

## 5. .env.local Özeti (Tam Aktif İçin)

En azından şunlar tanımlı olmalı:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... veya sb_publishable_...
ANTHROPIC_API_KEY=sk-ant-api03-...
NEXT_PUBLIC_SITE_URL=https://yisa-s.com
```

İsteğe bağlı:

- `SUPABASE_SERVICE_ROLE_KEY` — Panel listelerinde RLS bypass; yoksa oturumlu kullanıcı için anon + RLS kullanılır.

---

## 6. Lokalde Çalıştırma ve Hızlı Test

```bash
cd yisa-s-site
npm install
npm run dev
```

Tarayıcıda:

1. **Sistem durumu:**  
   `http://localhost:3000/api/sistem-durum`  
   → `sistemAktif: true` olmalı.

2. **Akü + “Sistem Aktif Online”:**  
   `http://localhost:3000/akular`  
   → Üstte yeşil “Sistem Aktif Online” görünmeli.

3. **Giriş:**  
   `http://localhost:3000/giris`  
   → Supabase’te tanımlı e‑posta/şifre ile giriş → `/panel`.

4. **Formlar:**  
   `/demo` ve `/franchise` üzerinden birer kayıt atıp panel listelerinde göründüğünü kontrol edin.

5. **Robot:**  
   Bir sayfada chat’i açıp mesaj gönderin; yanıt gelmeli.

---

## 7. Canlı (Production) Ortamda “Tam Aktif Online”

- **Vercel / benzeri:** Aynı env değişkenlerini proje ayarlarında tanımlayın.
- **Domain:** `NEXT_PUBLIC_SITE_URL` canlı adresiniz olsun.
- **Supabase:** Canlı proje URL + anon key (ve gerekirse service_role) production env’de kullanılmalı.

Canlı sitede:

- `https://SITE_URL/api/sistem-durum`  
- `https://SITE_URL/akular`  

ile sahada tüm bağlantıların aktif olduğunu doğrulayabilirsiniz.

---

## 8. Özet Kontrol Listesi

- [ ] `.env.local` içinde `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `ANTHROPIC_API_KEY`, `NEXT_PUBLIC_SITE_URL` tanımlı
- [ ] Supabase’te şema çalıştırıldı (`demo_requests`, `franchise_applications` vb.)
- [ ] Auth’ta en az bir kullanıcı var; `/giris` ile giriş yapılabiliyor
- [ ] `GET /api/sistem-durum` → `sistemAktif: true`
- [ ] `/akular` sayfasında “Sistem Aktif Online” yeşil
- [ ] `/demo` ve `/franchise` formları kayıt oluşturuyor; panel listelerinde görünüyor
- [ ] Robot (NeebChat) mesajlara yanıt veriyor
- [ ] Canlıda kullanılacaksa env’ler production’a alındı ve `NEXT_PUBLIC_SITE_URL` canlı adres

Bu maddeler tamamlandığında **tam kurulum biter ve bütün bağlantılar sahada, sistem aktif online** kabul edilir.

---

**Railway, Vercel, Supabase, GitHub — aktif mi, nerede ayar?**  
Dört platformun env’leri ve nerede tanımlanacağı: **`RAILWAY_VERCEL_SUPABASE_GITHUB.md`**.  
GitHub repo değişince detay: **`RAILWAY_GITHUB_AYARLARI.md`**.
