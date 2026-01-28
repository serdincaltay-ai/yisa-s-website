# Railway · Vercel · Supabase · GitHub — Aktif mi, Nerede Ayar?

Projede bu dört platform **akü** olarak tanımlı. Hangi env tanımlıysa o platform “aktif” sayılır (`/akular` ve `GET /api/akular/durum` buna bakar).

---

## 1. Railway

| Ne | Değer |
|----|--------|
| **Aktif sayılması için** | Aşağıdakilerden **en az biri** tanımlı: `RAILWAY_ENVIRONMENT`, `RAILWAY_PROJECT_ID`, `RAILWAY_SERVICE_ID`, `RAILWAY_TOKEN` |
| **Lokalde ayar** | `.env.local` → `RAILWAY_TOKEN=...` (isteğe bağlı; Railway’den alınır) |
| **Canlıda** | Railway’e deploy edince `RAILWAY_*` otomatik gelir |
| **Nerede ayar?** | [railway.app](https://railway.app) → Project → Variables; veya “Deploy from GitHub” ile repo bağlayın |

---

## 2. Vercel

| Ne | Değer |
|----|--------|
| **Aktif sayılması için** | Aşağıdakilerden **en az biri** tanımlı: `VERCEL`, `VERCEL_URL`, `VERCEL_ENV` |
| **Lokalde ayar** | Genelde boş bırakılır; Vercel’e deploy edilmeden “aktif” görünmez |
| **Canlıda** | Vercel’e deploy edince bu değişkenler otomatik tanımlanır |
| **Nerede ayar?** | [vercel.com](https://vercel.com) → Proje → Settings → Environment Variables; Git repo Vercel’e bağlı olmalı |

---

## 3. Supabase

| Ne | Değer |
|----|--------|
| **Aktif sayılması için** | İkisi de tanımlı: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| **Lokalde ayar** | `.env.local` → Supabase Dashboard (Project Settings → API) değerlerini kopyalayın |
| **Canlıda** | Vercel/Railway vb. proje ayarlarında aynı değişkenleri tanımlayın |
| **Nerede ayar?** | [supabase.com](https://supabase.com) → Proje → Project Settings → API → URL + anon key |

Örnek:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

---

## 4. GitHub

| Ne | Değer |
|----|--------|
| **Aktif sayılması için** | Aşağıdakilerden **en az biri** tanımlı: `GITHUB_TOKEN`, `GITHUB_ACTIONS`, `GITHUB_REPOSITORY` |
| **Lokalde ayar** | `.env.local` → `GITHUB_TOKEN=...`, `GITHUB_REPOSITORY=owner/repo` (isteğe bağlı) |
| **Canlıda** | CI/CD (GitHub Actions vb.) kullanıyorsanız ilgili repo’da Secrets olarak tanımlayın |
| **Nerede ayar?** | Repo adresi: `git remote set-url origin https://github.com/owner/repo.git`; token: GitHub → Settings → Developer settings → Personal access tokens |

Repo değiştiyse:

- `git remote set-url origin https://github.com/YENI_OWNER/YENI_REPO.git`
- `GITHUB_REPOSITORY=YENI_OWNER/YENI_REPO` (env kullanıyorsanız)
- Vercel/Railway → proje Git ayarından yeni repo’yu seçin

---

## Özet tablo

| Platform   | Env (en az biri) | Lokal ayar            | Canlıda                          |
|------------|-------------------|------------------------|-----------------------------------|
| **Railway**   | `RAILWAY_*` veya `RAILWAY_TOKEN` | `.env.local` → `RAILWAY_TOKEN` | Deploy edilince otomatik          |
| **Vercel**    | `VERCEL`, `VERCEL_URL`, `VERCEL_ENV` | Genelde yok            | Deploy edilince otomatik          |
| **Supabase**  | `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `.env.local` (zorunlu) | Proje env’e aynı değişkenleri ekleyin |
| **GitHub**    | `GITHUB_TOKEN`, `GITHUB_ACTIONS`, `GITHUB_REPOSITORY` | `.env.local` isteğe bağlı | Repo + (isteğe bağlı) Actions/Secrets |

**Kontrol:** Tarayıcıda `/akular` açın veya `GET /api/akular/durum` çağırın; hangi platformun “aktif” göründüğü bu env’lere göredir.
