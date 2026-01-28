# ACİL — GitHub + Vercel + Railway Bağlantılarını Hemen Kur

**Amaç:** Yaptığın her şey kaybolmasın; kod GitHub’da olsun, site Vercel ve/veya Railway’de yayında olsun.

Aşağıdaki adımları **sırayla, hemen** yap. Şifreler/yetkiler sende; burada sadece “nereden tıklayacağın” yazıyor.

---

## ADIM 1 — Önce kodu Git’e kaydet (kaybolmasın)

**Cursor’u tamamen kapat**, sonra proje klasöründe:

- **`ACIL_KAYDET.bat`** dosyasına **çift tıkla**.

Bu, `git add .` ve `git commit` yapar. “Kod Git'e kaydedildi” yazarsa Adım 2’ye geç.

**Elle yapmak istersen:** Aynı klasörde CMD açıp:

```cmd
git add .
git commit -m "ACIL: tam kurulum, SPA, GitHub Vercel Railway baglanti hazir"
```

Hata alırsan `.git\index.lock` sil, tekrar dene.

---

## ADIM 2 — GitHub’da repo oluştur ve bağla

1. Tarayıcıda **[github.com](https://github.com)** → giriş yap.
2. Sağ üst **+** → **New repository**.
3. **Repository name:** `yisa-s-site` (veya istediğin isim).  
   Public seçili bırak → **Create repository**.
4. Açılan sayfada “push an existing repository” kısmındaki komutları kullan. Kendi kullanıcı adınla:

```cmd
git remote add origin https://github.com/KULLANICI_ADIN/yisa-s-site.git
git branch -M main
git push -u origin main
```

*(KULLANICI_ADIN yerine kendi GitHub kullanıcı adını yaz. Repo adını değiştirdiysen `yisa-s-site` yerine onu yaz.)*

Şifre isterse: GitHub’da **Settings → Developer settings → Personal access tokens** ile token oluşturup, şifre yerine bu token’ı kullan.

Bu adımdan sonra **tüm kod GitHub’da** olur; sayfa/kaynak kaybolmaz.

---

## ADIM 3 — Vercel bağlantısı (SPA/site yayında)

1. **[vercel.com](https://vercel.com)** → giriş (mümkünse “Continue with GitHub”).
2. **Add New…** → **Project**.
3. **Import Git Repository** → az önce oluşturduğun **yisa-s-site** (veya repo adın) seç → **Import**.
4. **Root Directory** boş bırak (veya proje kökü `./` ise öyle bırak).  
   **Framework Preset:** Next.js seçili kalsın.
5. **Environment Variables** kısmına en az şunları ekle (değerleri `.env.local` veya Supabase/Claude tarafından biliyorsun):

   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `ANTHROPIC_API_KEY`
   - `NEXT_PUBLIC_SITE_URL` = `https://yisa-s.com` (veya Vercel’in vereceği xxx.vercel.app)

6. **Deploy** de.

Birkaç dakika sonra site `https://xxx.vercel.app` adresinde açılır. İstersen **Project Settings → Domains** ile kendi domain’i ekleyebilirsin.

---

## ADIM 4 — Railway bağlantısı

1. **[railway.app](https://railway.app)** → giriş (GitHub ile giriş yap).
2. **New Project** → **Deploy from GitHub repo**.
3. **Authorize** / **Configure GitHub** gerekirse izin ver; **yisa-s-site** (veya repo adın) seç.
4. Repo seçilince Railway otomatik build/deploy başlatır.  
   **Variables** kısmına Vercel’de yazdığın env’leri ekle:

   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `ANTHROPIC_API_KEY`
   - `NEXT_PUBLIC_SITE_URL`

5. Deploy bitince **Settings → Generate Domain** ile bir URL alırsın; site orada da çalışır.

---

## Özet — Ne yaptın?

| Adım | Sonuç |
|------|--------|
| 1 – Git commit | Kod bu makinede Git tarihinde kayıtlı |
| 2 – GitHub repo + push | Kod GitHub’da; kaynak kaybolmaz |
| 3 – Vercel Import | SPA/site Vercel’de yayında (xxx.vercel.app) |
| 4 – Railway Deploy | Aynı kod Railway’de de yayında |

Şifre ve yetkiler sende; bu dört adımı tamamladığında **GitHub + Vercel + Railway bağlantıları kurulmuş** olur. Önce **Adım 1 ve 2**’yi bitir ki yaptığın her şey kaybolmasın.
