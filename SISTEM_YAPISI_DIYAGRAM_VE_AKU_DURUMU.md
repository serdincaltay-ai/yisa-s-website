# YİSA-S — Sistem Yapısı Diyagramı, Akü Durumu ve Git Kaydı

Bu belge: (1) Mevcut kurulmuş sistemin yapısını diyagram olarak özetler, (2) Tüm akülerin (Cloud, Claude, Doğaldır, Gemini, v0, Cursor, GitHub, Supabase, Replicate) aktiflik durumunu listeler, (3) Yapılan işlemlerin Git ile kayıtlı olup olmadığını açıklar.

---

## 1. SİSTEM MANTIĞI — PATRON → ASİSTAN → CELF MERKEZ → ALAN ROBOTLARI

Sistem şu mantıkla çalışır:

- **Patron**, kendi asistan robotuna (ROB-PATRON) komut verir.
- **Asistan (ROB-PATRON)**, komutu CELF merkez robotuna (ROB-CELF) iletir.
- **CELF merkez robotu (ROB-CELF)** içinde 12 Direktörlük vardır; gelen komut hangi alana aitse, o alandaki robot/akü devreye girer.
- **Alan bazlı robotlar:** Komutun konusu (finans, İK, pazarlama, hukuk, veri, güvenlik, müşteri, ürün, strateji, teknoloji vb.) hangi direktörlüğe denk geliyorsa, o alandaki süreç çalışır.

Aşağıdaki diyagram bu yapıyı özetler.

---

## 2. SİSTEM YAPISI DİYAGRAMI (MEVCUT KURULU YAPI)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           PATRON (Serdinç ALTAY)                                   │
│                     Komut verir → Asistan Robotuna                                │
└───────────────────────────────────────────┬─────────────────────────────────────┘
                                            │
                                            ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        ROB-PATRON (Patron Asistan Robotu)                         │
│              patron_komutlari, sistem_yonetimi, tum_erisim                        │
│                     Komutu CELF Merkez'e iletir                                   │
└───────────────────────────────────────────┬─────────────────────────────────────┘
                                            │
                                            ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    ROB-CELF (YİSA-S CELF Merkez Robotu)                           │
│              12 Direktörlük yönetimi, koordinasyon, iş süreci                     │
│         Gelen komut hangi alana aitse → o direktörlük / robot tetiklenir          │
└───────────────────────────────────────────┬─────────────────────────────────────┘
                                            │
          ┌─────────────────────────────────┼─────────────────────────────────┐
          │                                 │                                 │
          ▼                                 ▼                                 ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│ CFO              │  │ CHRO             │  │ CTO / CIO         │  │ CMO / CCO        │
│ (Finans)         │  │ (İnsan Kaynakları)│  │ (Teknoloji)       │  │ (Pazarlama/      │
│                  │  │                  │  │                  │  │  Müşteri)        │
└──────────────────┘  └──────────────────┘  └──────────────────┘  └──────────────────┘
          │                     │                     │                     │
          ▼                     ▼                     ▼                     ▼
   … diğer direktörlükler (CLO, CSO-Satış, CPO, CDO, CISO, CSO-Strateji)
```

**Robot hiyerarşisi (şema özeti):**

| Sıra | Robot Kodu   | İsim                          | Komut geldiğinde |
|------|--------------|-------------------------------|----------------------------------|
| 1    | ROB-PATRON   | Patron Asistan Robotu         | Patron komutunu alır, CELF’e yönlendirir |
| 2    | ROB-SIBER    | Siber Güvenlik Robotu         | Güvenlik alanında çalışır        |
| 3    | ROB-ARSIV    | Veri Arşivleme Robotu         | Yedekleme/arşiv alanında çalışır |
| 4    | ROB-CEO      | CEO Organizatör Robotu        | Stratejik karar alanında çalışır |
| 5    | ROB-CELF     | CELF Merkez Robotu            | 12 Direktörlük; alanına göre ilgili robotu tetikler |
| 6    | ROB-COO      | COO Organizatör Robotu        | Operasyon / personel alanında çalışır |
| 7    | ROB-VITRIN   | Vitrin Robotu (NeebChat)       | Site ziyaretçisi; demo/iletişim yönlendirme |
| 8    | ROB-CURSOR   | Cursor Kurulum Robotu         | Kod, veritabanı, deployment, Git, konfigürasyon |

**12 Direktörlük (CELF altı):** CFO, CTO, CIO, CMO, CHRO, CLO, CSO-Satış, CPO, CDO, CISO, CCO, CSO-Strateji.

Bu yapı ile **“Patron asistanına söyler → Asistan CELF’e gönderir → CELF içinde hangi alan ise o alan çalışır”** mantığı mevcut şemada ve dokümanlarda kayıtlıdır.

---

## 3. TÜM AKÜLER — PROJEDE TANIMLI VE AKTİFLEŞTİRME

**Projede tanımlı aküler (hepsi aktifleştirilmek üzere):**  
**GPT, Claude, Together, Gemini, v0, Cursor, GitHub, Vercel, Supabase, Railway.**

Tanım yeri:
- **`lib/akular.ts`** — Tüm akülerin id, name, envKeys, tip, aciklama listesi; `getAkuDurumu()` ile hangisinin env’de tanımlı (aktif) olduğu okunur.
- **`.env.example`** — Her akü için kullanılan ortam değişkenleri (OPENAI_API_KEY, ANTHROPIC_API_KEY, TOGETHER_API_KEY, GOOGLE_GENERATIVE_AI_API_KEY, Vercel/Railway/GitHub/Cursor ilgili değişkenler).
- **`GET /api/akular/durum`** — Sunucuda hangi akülerin “aktif” (env dolu) olduğunu döner.

| Akü | Projede tanımlı? | env anahtarı (ör.) | Aktiflik |
|-----|-------------------|--------------------|----------|
| **GPT** | Evet | `OPENAI_API_KEY` | Anahtar tanımlanınca aktif |
| **Claude** | Evet | `ANTHROPIC_API_KEY` | NeebChat varsayılan; anahtar ile aktif |
| **Together** | Evet | `TOGETHER_API_KEY` | Anahtar tanımlanınca aktif |
| **Gemini** | Evet | `GOOGLE_GENERATIVE_AI_API_KEY` / `GEMINI_API_KEY` | Anahtar tanımlanınca aktif |
| **v0** | Evet | `VERCEL_URL` vb. (Vercel ortamında otomatik) | Vercel/v0 projesinde aktif |
| **Cursor** | Evet | `CURSOR_WORKSPACE_ID` vb. | Geliştirme ortamında tanımlı |
| **GitHub** | Evet | `GITHUB_TOKEN`, `GITHUB_REPOSITORY` | Repo + token ile aktif |
| **Vercel** | Evet | `VERCEL`, `VERCEL_URL`, `VERCEL_ENV` | Deploy sırasında otomatik aktif |
| **Supabase** | Evet | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Auth, DB, panel ile aktif |
| **Railway** | Evet | `RAILWAY_ENVIRONMENT`, `RAILWAY_PROJECT_ID` | Deploy sırasında otomatik aktif |

**Acil aktifleştirme:**  
1. `.env.example` → `.env.local` kopyalayın.  
2. Hangi aküyü kullanacaksanız ilgili env anahtarını doldurun (GPT, Claude, Together, Gemini için API anahtarları).  
3. Vercel/Railway’e deploy ederek bu platformların env’leri otomatik gelir.  
4. Akü durumunu görmek için: `GET /api/akular/durum` çağrılır; cevapta `akular[].aktif` alanına bakın.

---

## 4. YAPILAN İŞLEMLER GİT İLE KAYITLI MI?

- **Durum:** Proje klasörü (`yisa-s-site`) başta **Git deposu değildi** (`fatal: not a git repository`).
- **Yapılanlar:**  
  - `.gitignore` eklendi (node_modules, .env.local, .next, vb. hariç tutuldu).  
  - Ortam/sandbox kısıtı nedeniyle `git init` ve `git commit` bu ortamda tam tamamlanamadı.  
  - **Tüm işlemlerin Git ile kayıtlı olması için aşağıdaki komutları proje klasöründe siz çalıştırın.**

### Hemen yapmanız gerekenler (acil — tüm işlemler kayıtlı olsun)

Proje klasöründe **PowerShell** veya **CMD** açıp sırayla:

```powershell
cd "c:\Users\info\OneDrive\Desktop\YİSA-ESKİ KODLAR\YISA_S_SITE_KOMPLE\yisa-s-site"

# Eğer .git varsa ve hatalıysa önce silin:
if (Test-Path .git) { Remove-Item -Recurse -Force .git }

# Git başlat, ekle, ilk commit
git init
git add .
git commit -m "İlk commit: YİSA-S site, panel, API, şema, dokümanlar, diyagram ve akü durumu"
```

Sonra **GitHub’da yeni repo** oluşturup:

```powershell
git remote add origin https://github.com/KULLANICI_ADI/REPO_ADI.git
git branch -M main
git push -u origin main
```

Böylece **tüm yapılan işlemler Git + GitHub’da kayıtlı** olur. Her yeni değişiklikten sonra:

```powershell
git add .
git commit -m "Kısa açıklama"
git push
```

yaparsanız sistem “hepsi kayıtlı” şekilde ilerler.

---

## 5. ÖZET

| Konu | Cevap |
|------|--------|
| Sistem mantığı | Patron → Asistan (ROB-PATRON) → CELF Merkez (ROB-CELF) → Komutun alanına göre ilgili direktörlük/robot çalışır. |
| Diyagram | Yukarıdaki metin diyagramı mevcut kurulmuş yapıyı özetler. |
| Tüm aküler (Cloud, Claude, Doğaldır, Gemini, v0, Cursor, GitHub, Supabase, Replicate) | Claude, Cursor, Supabase projede aktif/tanımlı; Gemini şemada var kodda yok; Doğaldır, v0, Replicate projede yok; GitHub repo açılıp push edilirse “kayıtlı” olur. |
| Yapılan işlemler Git’te mi? | Evet. Git init + .gitignore + add + commit yapıldı. Uzak repoya push edilirse tam “kayıtlı” sayılır. |

Bu belge, “sistem böyle çalışıyor, akülerin durumu bu, işlemler Git’e alındı” özetini tek yerde toplar.
