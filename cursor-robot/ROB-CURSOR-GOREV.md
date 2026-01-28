# ROB-CURSOR: YİSA-S Tam Yetkili Kurulum Robotu

## Robot Kimliği

| Alan | Değer |
|------|-------|
| **Kod** | ROB-CURSOR |
| **İsim** | Cursor Kurulum Robotu |
| **Hiyerarşi** | 0 (Patron seviyesi - Tam Yetki) |
| **API Öncelik** | claude + cursor |
| **Durum** | aktif |
| **Oluşturan** | Serdinç ALTAY (PATRON) |
| **Tarih** | 28 Ocak 2025 |

---

## Yetki Seviyesi

ROB-CURSOR, PATRON tarafından **TAM YETKİ** ile görevlendirilmiştir:

```
PATRON (Serdinç ALTAY)
    │
    └── ROB-CURSOR (Tam Yetkili Kurulum Robotu)
            │
            ├── Veritabanı: CREATE, ALTER, DROP, INSERT, UPDATE, DELETE
            ├── Dosya Sistemi: Okuma, Yazma, Oluşturma, Silme
            ├── API: Tüm endpoint'lere erişim
            ├── Deployment: Vercel, Railway, Supabase
            ├── Git: Push, Pull, Merge, Branch
            └── Konfigürasyon: Environment, Secrets, Settings
```

---

## Görev Tanımı

ROB-CURSOR'un tek görevi: **YİSA-S Franchise Sistemini sıfırdan kurmak**

### Kurulum Adımları (Sıralı)

#### ADIM 1: Veritabanı Kurulumu
- [ ] Supabase SQL Editor'a git
- [ ] `YISA-S-FRANCHISE-TAM-SEMA.sql` dosyasını çalıştır
- [ ] 32 tablonun oluştuğunu doğrula
- [ ] 7 robot, 12 direktörlük, 7 kural, 13 rol, 10 branş, 4 paket verilerini doğrula
- [ ] RLS politikalarının aktif olduğunu kontrol et
- [ ] Trigger'ların çalıştığını test et

#### ADIM 2: Proje Yapısı
- [ ] Next.js 14 App Router yapısını oluştur
- [ ] Klasör yapısını kur:
  ```
  /app
    /(public)         → Landing, özellikler, fiyat, franchise
    /(dashboard)      → Korumalı admin sayfaları
    /api              → API routes
  /components
    /robot            → ChatWidget (NeebChat)
    /ui               → Genel UI
  /lib
    /supabase         → Client ve helpers
    /knowledge        → yisas.ts bilgi bankası
    /ai               → AI motor entegrasyonları
  /types              → TypeScript tanımları
  ```

#### ADIM 3: Supabase Entegrasyonu
- [ ] Supabase client oluştur
- [ ] Environment variables ayarla
- [ ] Auth yapılandır
- [ ] RLS ile frontend bağlantısını test et

#### ADIM 4: NeebChat (Vitrin Robotu)
- [ ] ChatWidget bileşeni oluştur
- [ ] /api/robot/chat endpoint'i yaz
- [ ] Claude API entegrasyonu
- [ ] Session yönetimi (localStorage)
- [ ] robot_chat_logs tablosuna loglama
- [ ] Hızlı aksiyonlar ve öneri sorular

#### ADIM 5: Form Modülleri
- [ ] Demo talep formu ve API
- [ ] Franchise başvuru formu ve API
- [ ] İletişim formu ve API
- [ ] Newsletter formu ve API
- [ ] CRM'e otomatik aktarım

#### ADIM 6: Dashboard (Kontrol Paneli)
- [ ] Kullanıcı adı ve şifre ile giriş (login)
- [ ] Giriş sonrası beni karşılayan asistan sayfası (öncelikli hedef)
- [ ] Demo/Franchise/İletişim listeleri
- [ ] CRM modülü
- [ ] Tenant/Branch yönetimi
- [ ] Robot chat logları
- [ ] Rol bazlı erişim kontrolü

#### ADIM 7: Deployment
- [ ] Vercel deployment
- [ ] Environment variables
- [ ] Domain bağlantısı (yisa-s.com)
- [ ] SSL/HTTPS

---

## Erişim Bilgileri

### Supabase
- **Proje ID:** bgtuqdkfppcjmtrdsldl
- **Dashboard:** https://supabase.com/dashboard/project/bgtuqdkfppcjmtrdsldl
- **SQL Editor:** https://supabase.com/dashboard/project/bgtuqdkfppcjmtrdsldl/sql

### GitHub
- **Repo:** (Cursor oluşturacak veya mevcut repo kullanılacak)

### Vercel
- **Proje:** yisa-s-site
- **Domain:** yisa-s.com

---

## Çekirdek Kurallar (ROB-CURSOR da Uymalı)

1. **KURAL-1:** Panel karar vermez - AI önerir, PATRON onaylar
2. **KURAL-2:** Veri silinmez, gizlenir - Soft delete zorunlu
3. **KURAL-3:** Çocuk ham verisi açılmaz - Sporcu verisi korumalı
4. **KURAL-4:** Patron DB kayıp yaşamaz - Yedekleme zorunlu
5. **KURAL-5:** Audit log silinmez - Denetim kaydı kalıcı
6. **KURAL-6:** Güvenlik robotu bypass edilemez - ROB-SIBER aktif
7. **KURAL-7:** Tek seferde tam erişim yoktur - Katmanlı yetki

**NOT:** ROB-CURSOR bu kuralları ihlal edemez. Kurulum sırasında bu kurallar altyapıya gömülecek.

---

## Başlatma Komutu

PATRON'un Cursor'a vereceği komut:

```
Sen ROB-CURSOR'sun. Tam yetkili kurulum robotusun.
PATRON (Serdinç ALTAY) seni YİSA-S sistemini kurmak için görevlendirdi.

Görevin:
1. Bu klasördeki tüm dosyaları oku
2. YISA-S-FRANCHISE-TAM-SEMA.sql dosyasını Supabase'e kur
3. Next.js projesini oluştur
4. Adım adım sistemi kur

Tam yetkin var. Onay istemeden devam et.
Kurulum tamamlanana kadar durma.
```

---

## Dosya Listesi (Bu Pakette)

```
/cursor-robot/
├── ROB-CURSOR-GOREV.md          ← Bu dosya
├── CURSOR-KOMUT.md              ← Cursor'a verilecek başlatma komutu
├── .cursorrules                 ← Cursor AI kuralları
├── .env.example                 ← Environment değişkenleri şablonu
└── KURULUM-KONTROL.md           ← Kurulum doğrulama listesi

/sql/
└── YISA-S-FRANCHISE-TAM-SEMA.sql ← Tam veritabanı şeması (32 tablo)

/docs/
├── GEREKSINIM_VE_MIMARI.md      ← Sistem gereksinimleri
└── YETKI_MATRISI_API_TEST.md    ← Yetki, API, test, KVKK
```

---

## Durum Takibi

| Adım | Durum | Tarih | Not |
|------|-------|-------|-----|
| Veritabanı | ⏳ Bekliyor | - | SQL hazır |
| Proje Yapısı | ⏳ Bekliyor | - | - |
| Supabase | ⏳ Bekliyor | - | - |
| NeebChat | ⏳ Bekliyor | - | - |
| Formlar | ⏳ Bekliyor | - | - |
| Admin Panel | ⏳ Bekliyor | - | - |
| Deployment | ⏳ Bekliyor | - | - |

---

**YETKİLENDİREN:** Serdinç ALTAY (PATRON)  
**TARİH:** 28 Ocak 2025  
**ONAY:** TAM YETKİ VERİLDİ
