# Railway Aktif mi? — GitHub Değiştiyse Orada da Ayar Lazım

Bu belge: **(1)** Railway’in projede “aktif” sayılması için env ayarlarını, **(2)** GitHub repo veya kullanıcı değiştiyse nerede güncelleme yapılacağını özetler.

---

## 1. Railway aktif mi?

**Akü tarafında:** Railway, aşağıdaki env değişkenlerinden **en az biri** tanımlı olduğunda **aktif** sayılır ( `/akular` ve `GET /api/akular/durum` buna bakar):

| Değişken | Ne zaman dolar? |
|----------|------------------|
| `RAILWAY_ENVIRONMENT` | Railway’e deploy ettiğinizde otomatik |
| `RAILWAY_PROJECT_ID` | Railway’e deploy ettiğinizde otomatik |
| `RAILWAY_SERVICE_ID` | Railway’e deploy ettiğinizde otomatik |
| `RAILWAY_TOKEN` | Manuel: Railway CLI veya “Bağlı” göstermek için `.env.local`’a ekleyebilirsiniz |

**Lokalde Railway’i “aktif” göstermek için:**  
`.env.local` içine isteğe bağlı olarak şunu ekleyin (değer Dashboard’tan alınır):

```env
# Railway — lokalde "aktif" görünsün veya CLI için
RAILWAY_TOKEN=...
```

**Railway’e gerçekten deploy ettiğinizde** ortam otomatik olarak `RAILWAY_ENVIRONMENT`, `RAILWAY_PROJECT_ID`, `RAILWAY_SERVICE_ID` ile dolar; ekstra bir şey yapmanız gerekmez.

**Railway’i projeye bağlamak (deploy):**

1. [railway.app](https://railway.app) → giriş.
2. **New Project** → **Deploy from GitHub repo**.
3. GitHub hesabını yetkilendirip **bu projenin repo’sunu** seçin.
4. Repo seçildikten sonra Railway ortam değişkenleri otomatik tanımlanır; proje “Railway’de çalışıyor” ve akü tarafında Railway aktif olur.

---

## 2. GitHub değiştiyse orada da ayar lazım

Repo adı, organizasyon veya kullanıcı (owner) değiştiyse aşağıdaki yerleri güncelleyin.

### 2.1 Git remote (repo adresi)

Yeni repo adresi farklıysa:

```bash
# Mevcut remote'u kontrol et
git remote -v

# Adresi yeni repo ile değiştir
git remote set-url origin https://github.com/YENI_KULLANICI/YENI_REPO.git

# veya ilk kez ekliyorsanız
git remote add origin https://github.com/YENI_KULLANICI/YENI_REPO.git
```

Bundan sonra `git push` bu yeni adrese gider.

### 2.2 Ortam değişkeni: GITHUB_REPOSITORY

CI/CD veya script’lerde “hangi repo” bilgisi kullanılıyorsa, `.env` / `.env.local` veya Vercel/Railway **Environment Variables** içinde güncelleyin:

```env
# owner/repo formatında, örnek:
GITHUB_REPOSITORY=yenisahip/yisa-s-website
```

Projede GitHub “aktif” sayılsın isterseniz (akü mantığı için):

```env
GITHUB_TOKEN=ghp_...
GITHUB_REPOSITORY=owner/repo
```

`GITHUB_REPOSITORY` değiştiyse bu satırı yeni `owner/repo` ile değiştirmeniz yeterli.

### 2.3 Vercel / Railway proje bağlantısı

- **Vercel:** Dashboard → bu proje → **Settings** → **Git** → **Connected Git Repository**. Repo değiştiyse “Disconnect” edip yeni repo’yu seçin; böylece deploy’lar yeni GitHub repo’dan tetiklenir.
- **Railway:** Proje → **Settings** → **Source** (veya GitHub bağlantısı). Repo değiştiyse bağlı repo’yu değiştirin veya “Redeploy from new repo” benzeri adımla yeni repoya geçin.

Bu ayarlar yapılmazsa Vercel/Railway eski repo’yu dinlemeye devam eder.

### 2.4 Dokümanlardaki örnek URL’ler

Aşağıdaki dosyalarda `KULLANICI_ADI` / `REPO_ADI` veya `YOUR_USERNAME` geçiyorsa, kendi kullanıcı ve repo adınızla değiştirin:

- `README.md` — `https://github.com/YOUR_USERNAME/yisa-s-website.git`
- `YAPILAN_ISLEMLER_GIT_ICIN.md` — `https://github.com/KULLANICI_ADI/REPO_ADI.git`
- `SISTEM_YAPISI_DIYAGRAM_VE_AKU_DURUMU.md` — aynı şekilde repo linkleri

Bunlar sadece dokümantasyon; çalışan bağlantı **git remote** ve **Vercel/Railway Git ayarı** ile belirlenir.

---

## 3. Özet tablo

| Ne değişti? | Nerede ayar? |
|-------------|--------------|
| **Railway’i “aktif” göstermek (lokalde)** | `.env.local` → `RAILWAY_TOKEN` veya Railway’e deploy (otomatik env) |
| **GitHub repo URL’i** | `git remote set-url origin YENI_URL` |
| **Hangi repo kullanılıyor (CI/script)** | `GITHUB_REPOSITORY=owner/repo` (env) |
| **Vercel’in hangi repodan deploy ettiği** | Vercel → Proje → Settings → Git → repo değiştir |
| **Railway’in hangi repodan deploy ettiği** | Railway → Proje → Source / GitHub bağlantısını yeni repo’ya çevir |

Railway gerçekten kullanılıyorsa deploy sırasında kendi env’lerini verir; GitHub değiştiyse **git remote**, **GITHUB_REPOSITORY** ve **Vercel/Railway Git ayarı** bu özetteki gibi güncellenmelidir.
