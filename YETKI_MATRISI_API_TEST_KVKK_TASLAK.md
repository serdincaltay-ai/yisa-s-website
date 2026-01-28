# YİSA-S — Yetki Matrisi, Admin Ekranları, API Taslağı, Test Senaryoları ve KVKK Taslağı

**Referans:** `GEREKSINIM_VE_MIMARI_TASLAK.md`  
**Kural:** Kod yok. Varsayım yok; belirsiz alanlar «Karar gerektiren nokta» olarak listelenir.

---

## 1. YETKİ MATRİSİ (Ekran ve Endpoint Bazında)

Rol kodları: **Patron**, **Asistan**, **Niş Asistan**, **Data Robot**, **Security Robot**.  
Erişim: **Görüntüle (R)**, **Oluştur (C)**, **Güncelle (U)**, **Sil (D)**, **Yok (–)**.

### 1.1 Admin panel ekranları — yetki matrisi

| Ekran / Sayfa | Patron | Asistan | Niş Asistan | Data Robot | Security Robot |
|---------------|--------|---------|-------------|------------|----------------|
| **Dashboard / Ana özet** | R | R | R (kapsam tanıma bağlı) | – | – |
| **Demo talepleri listesi** | R, U (durum) | R, U (durum) | R (tanıma göre) | – | – |
| **Demo talep detay** | R, U | R, U | R (tanıma göre) | – | – |
| **Franchise başvuruları listesi** | R, U (durum) | R, U (durum) | R (tanıma göre) | – | – |
| **Franchise başvuru detay** | R, U | R, U | R (tanıma göre) | – | – |
| **İletişim mesajları listesi** | R, U (durum) | R, U (durum) | R (tanıma göre) | – | – |
| **İletişim mesajı detay** | R, U | R, U | R (tanıma göre) | – | – |
| **Newsletter aboneleri listesi** | R | R | R (tanıma göre) | – | – |
| **CRM — Kişi listesi** | R, C, U | R, C, U | R (tanıma göre), U (tanıma göre) | – | – |
| **CRM — Kişi detay / aktiviteler** | R, C, U | R, C, U | R (tanıma göre), U (tanıma göre) | – | – |
| **CRM — Lead aşaması güncelleme** | R, U | R, U | U (tanıma göre) | – | – |
| **Robot chat logları listesi** | R | R | R (tanıma göre) | – | – |
| **Robot chat log detay** | R | R | R (tanıma göre) | – | – |
| **Tenant listesi** | R, C, U, D | R | R | – | – |
| **Tenant detay / şubeler** | R, C, U, D | R | R | – | – |
| **Branch listesi (tenant bazlı)** | R, C, U, D | R | R | – | – |
| **Branch detay** | R, C, U, D | R | R | – | – |
| **Rol / kullanıcı yönetimi** | R, C, U, D | R | – | – | – |
| **Sistem ayarları** | R, U | – | – | – | – |
| **KVKK / veri işleme ekranları** | R, U (anonimleştirme tetikleme vb.) | R (tanıma göre) | – | – | – |

**Karar gerektiren noktalar:**
- Niş Asistan için «tanıma göre»: Tenant/Branch/coğrafi kapsam mı, yoksa menü bazlı explicit yetki listesi mi kullanılacak?
- Data Robot ve Security Robot: Sadece servis/otomasyon üzerinden mi erişecek, yoksa ayrı bir «robot hesabı» ile admin arayüzüne giriş tanımlanacak mı?
- Demo/Franchise/İletişim için **silme (D)** yetkisi hiçbir role verilmedi; silme yerine «arsivleme / soft delete» mi olacak, karar gerekiyor.

### 1.2 API endpoint’leri — yetki matrisi

| Endpoint (mantıksal) | Metod | Anonim | Patron | Asistan | Niş Asistan | Data Robot | Security Robot |
|----------------------|-------|--------|--------|---------|-------------|------------|----------------|
| **Form gönderimi — Demo talep** | POST | C | – | – | – | – | – |
| **Form gönderimi — Franchise başvuru** | POST | C | – | – | – | – | – |
| **Form gönderimi — İletişim** | POST | C | – | – | – | – | – |
| **Form gönderimi — Newsletter** | POST | C | – | – | – | – | – |
| **Robot chat — Mesaj gönder** | POST | C | – | – | – | – | – |
| **Robot chat — Servis durumu** | GET | R | – | – | – | – | – |
| **Admin — Demo talepleri listesi** | GET | – | R | R | R (kapsam?) | – | – |
| **Admin — Demo talep detay** | GET | – | R | R | R (kapsam?) | – | – |
| **Admin — Demo talep durum güncelle** | PATCH/PUT | – | U | U | U (kapsam?) | – | – |
| **Admin — Franchise listesi** | GET | – | R | R | R (kapsam?) | – | – |
| **Admin — Franchise detay** | GET | – | R | R | R (kapsam?) | – | – |
| **Admin — Franchise durum güncelle** | PATCH/PUT | – | U | U | U (kapsam?) | – | – |
| **Admin — İletişim listesi** | GET | – | R | R | R (kapsam?) | – | – |
| **Admin — İletişim detay / durum** | GET, PATCH/PUT | – | R,U | R,U | R,U (kapsam?) | – | – |
| **Admin — Newsletter listesi** | GET | – | R | R | R (kapsam?) | – | – |
| **Admin — CRM kişi listesi** | GET | – | R | R | R (kapsam?) | – | – |
| **Admin — CRM kişi detay** | GET | – | R | R | R (kapsam?) | – | – |
| **Admin — CRM kişi oluştur/güncelle** | POST, PATCH/PUT | – | C,U | C,U | C,U (kapsam?) | – | – |
| **Admin — CRM aktivite listesi (kişi bazlı)** | GET | – | R | R | R (kapsam?) | – | – |
| **Admin — CRM aktivite ekle** | POST | – | C | C | C (kapsam?) | – | – |
| **Admin — CRM lead aşaması güncelle** | PATCH/PUT | – | U | U | U (kapsam?) | – | – |
| **Admin — Robot chat log listesi** | GET | – | R | R | R (kapsam?) | – | – |
| **Admin — Robot chat log detay** | GET | – | R | R | R (kapsam?) | – | – |
| **Admin — Tenant listesi** | GET | – | R,C,U,D | R | R | – | – |
| **Admin — Tenant detay / CRUD** | GET, POST, PATCH, DELETE | – | R,C,U,D | R | R | – | – |
| **Admin — Branch listesi / CRUD** | GET, POST, PATCH, DELETE | – | R,C,U,D | R | R | – | – |
| **Admin — Roller / kullanıcılar** | GET, POST, PATCH, DELETE | – | R,C,U,D | R | – | – | – |
| **Admin — Sistem ayarları** | GET, PATCH | – | R,U | – | – | – | – |
| **KVKK — Veri silme / anonimleştirme tetikleme** | POST | – | U | R (tetikleme?) | – | – | – |

**Karar gerektiren noktalar:**
- «R (kapsam?)»: Niş Asistan için filtre mantığı (tenant_id, branch_id, bölge, vs.) karara bağlı.
- Data Robot’un rapor/istatistik ürettiği endpoint’ler ayrı mı tanımlanacak (örn. GET /admin/reports/...) ve sadece service token ile mi çağrılacak?
- Security Robot’un log/audit okuma endpoint’leri ayrı mı olacak?

---

## 2. ADMİN PANEL EKRAN LİSTESİ VE ALANLAR

Her ekran için: **Ekran adı**, **Amaç**, **Liste kolonları / Detay alanları**, **Filtreler**, **Aksiyonlar**. Kod yok; sadece alan/filtre/aksiyon listesi.

### 2.1 Dashboard / Ana özet

| Alan türü | İçerik |
|-----------|--------|
| **Amaç** | Günlük/haftalık özet: yeni demo, franchise, iletişim, CRM pipeline özeti. |
| **Gösterge alanları** | Yeni demo sayısı, yeni franchise sayısı, okunmamış iletişim sayısı, C/E/O/J-A-O kişi sayıları, son N chat oturumu sayısı. |
| **Filtreler** | Tarih aralığı (başlangıç–bitiş); isteğe bağlı tenant/branch. |
| **Aksiyonlar** | Demo listesine git, Franchise listesine git, CRM’e git, Chat loglara git. |

**Karar gerektiren nokta:** Dashboard’da tenant/branch seçimi tüm kullanıcılar için mi, sadece Patron için mi?

### 2.2 Demo talepleri listesi

| Alan türü | İçerik |
|-----------|--------|
| **Amaç** | Tüm demo taleplerini listele, durum ve tarihe göre yönet. |
| **Liste kolonları** | Id (gizli veya son 4–6 hane), Ad, E-posta, Telefon, Şirket adı, Sporcu sayısı, İlgilenen paket, Durum, Kaynak (UTM), Oluşturulma tarihi. |
| **Filtreler** | Durum (new / contacted / demo_scheduled / converted / closed vb.), Tarih aralığı, E-posta (kısmi), Paket (starter / professional / enterprise). |
| **Sıralama** | Oluşturulma tarihi (varsayılan azalan), Durum, Ad. |
| **Aksiyonlar** | Detay aç, Durum güncelle, CRM’e aktar / Kişi oluştur, E-posta gönder (ileride). |

**Karar gerektiren nokta:** Durum değerleri (new, contacted, …) sabit enum mı, yoksa yönetilebilir liste mi olacak?

### 2.3 Demo talep detay

| Alan türü | İçerik |
|-----------|--------|
| **Amaç** | Tek demo talebinin tüm alanlarını gösterme ve durum güncelleme. |
| **Detay alanları** | Id, Ad, E-posta, Telefon, Şirket adı, Sporcu sayısı, İlgilenen paket, Mesaj, UTM (source, medium, campaign), Durum, Oluşturulma tarihi. İsteğe bağlı: ilgili crm_contact id ve son aktiviteler. |
| **Filtreler** | (Detay ekranında yok; liste ekranından gelinir.) |
| **Aksiyonlar** | Durum güncelle, CRM’e kişi olarak ekle / eşle, Geri (listeye). |

### 2.4 Franchise başvuruları listesi

| Alan türü | İçerik |
|-----------|--------|
| **Amaç** | Franchise başvurularını listele ve süreç durumuna göre yönet. |
| **Liste kolonları** | Id (gizli veya kısa), Ad, E-posta, Telefon, Şehir, İlçe, Deneyim özeti, Yatırım bütçesi, Durum, Oluşturulma tarihi. |
| **Filtreler** | Durum, Tarih aralığı, Şehir, E-posta (kısmi). |
| **Sıralama** | Oluşturulma tarihi (varsayılan azalan), Durum. |
| **Aksiyonlar** | Detay aç, Durum güncelle, CRM’e aktar / Kişi oluştur. |

### 2.5 Franchise başvuru detay

| Alan türü | İçerik |
|-----------|--------|
| **Amaç** | Tek franchise başvurusunun tüm alanlarını gösterme ve durum güncelleme. |
| **Detay alanları** | Id, Ad, E-posta, Telefon, Şehir, İlçe, Deneyim, Yatırım bütçesi, Motivasyon, Durum, Oluşturulma tarihi. İsteğe bağlı: ilgili crm_contact ve aktiviteler. |
| **Aksiyonlar** | Durum güncelle, CRM’e kişi olarak ekle / eşle, Geri. |

### 2.6 İletişim mesajları listesi

| Alan türü | İçerik |
|-----------|--------|
| **Amaç** | İletişim formundan gelen mesajları listele. |
| **Liste kolonları** | Id, Ad, E-posta, Konu, Kategori, Durum (örn. new / read / replied / archived), Oluşturulma tarihi. |
| **Filtreler** | Durum, Tarih aralığı, Kategori, E-posta (kısmi). |
| **Sıralama** | Oluşturulma tarihi (varsayılan azalan). |
| **Aksiyonlar** | Detay aç, Durum güncelle (okundu / yanıtlandı vb.), CRM’e aktar. |

### 2.7 İletişim mesajı detay

| Alan türü | İçerik |
|-----------|--------|
| **Amaç** | Tek iletişim mesajının tam içeriği ve durum yönetimi. |
| **Detay alanları** | Id, Ad, E-posta, Telefon, Konu, Mesaj, Kategori, Durum, Oluşturulma tarihi. İsteğe bağlı: ilgili crm_contact ve aktiviteler. |
| **Aksiyonlar** | Durum güncelle, CRM’e kişi olarak ekle / eşle, Geri. |

### 2.8 Newsletter aboneleri listesi

| Alan türü | İçerik |
|-----------|--------|
| **Amaç** | E-posta abonelik listesini gösterme; dışa aktarma için hazırlık. |
| **Liste kolonları** | E-posta, Ad, KVKK onayı (evet/hayır), Abonelik tarihi. |
| **Filtreler** | Tarih aralığı, KVKK onayı (evet/hayır), E-posta (kısmi). |
| **Sıralama** | Abonelik tarihi (varsayılan azalan). |
| **Aksiyonlar** | Dışa aktar (CSV/Excel taslak), Abonelik iptal (ileride). |

**Karar gerektiren nokta:** Abonelik iptal bu ekrandan mı, yoksa sadece e-posta linki ile mi yapılacak?

### 2.9 CRM — Kişi listesi

| Alan türü | İçerik |
|-----------|--------|
| **Amaç** | crm_contacts listesi; C/E/O/J-A-O ve kaynak bazlı takip. |
| **Liste kolonları** | Id (kısa), Ad, E-posta, Telefon, Şirket, Kaynak (demo/franchise/contact/newsletter/chat), Lead aşaması (C/E/O/J-A-O), Tenant, Branch, Son aktivite tarihi, Oluşturulma tarihi. |
| **Filtreler** | Lead aşaması, Kaynak (source_type), Tarih aralığı, Tenant, Branch, E-posta/Ad (kısmi). |
| **Sıralama** | Son aktivite tarihi, Oluşturulma tarihi, Lead aşaması. |
| **Aksiyonlar** | Detay aç, Lead aşaması güncelle (hızlı), Yeni aktivite ekle, Kişi düzenle. |

### 2.10 CRM — Kişi detay / Aktivite geçmişi

| Alan türü | İçerik |
|-----------|--------|
| **Amaç** | Tek kişinin iletişim bilgileri, lead aşaması ve tüm aktiviteleri. |
| **Detay alanları** | Ad, E-posta, Telefon, Şirket, Kaynak (source_type, source_id), Lead aşaması, Tenant, Branch, Oluşturulma/güncellenme tarihi. Alt blok: Aktivite listesi (tarih, aktivite tipi, başlık, kaynak tablo/id, payload özeti). |
| **Aksiyonlar** | Lead aşaması güncelle, Yeni aktivite ekle (not / görüşme / e-posta vb.), Kişi bilgilerini düzenle, Geri. |

**Karar gerektiren nokta:** «Yeni aktivite» tipleri sabit mi (not, call, email, meeting, …) yoksa yönetilebilir mi?

### 2.11 Robot chat logları listesi

| Alan türü | İçerik |
|-----------|--------|
| **Amaç** | NeebChat (ve diğer robot) konuşma kayıtlarını listelemek. |
| **Liste kolonları** | Id (kısa), Session id (kısa veya maskeli), Kullanıcı mesajı (ilk 50–100 karakter), Robot yanıtı (özet), Sayfa, Bağlam, AI model, Yanıt süresi (ms), Tenant, Branch, Tarih. |
| **Filtreler** | Tarih aralığı, Session id (kısmi), Sayfa, Tenant, Branch, Robot tipi (chat/data/security). |
| **Sıralama** | Tarih (varsayılan azalan). |
| **Aksiyonlar** | Detay aç, CRM’e bu oturumdan kişi/aktivite oluştur (e-posta varsa eşle). |

**Karar gerektiren nokta:** Chat log’da kişi bilgisi (e-posta) yok; CRM eşlemesi sadece aynı session_id’den gelen sonraki form gönderimleriyle mi yapılacak?

### 2.12 Robot chat log detay

| Alan türü | İçerik |
|-----------|--------|
| **Amaç** | Tek chat kaydının tam içeriği (mesaj/cevap, sayfa, süre, önerilen aksiyonlar). |
| **Detay alanları** | Session id, Kullanıcı mesajı, Robot yanıtı, Sayfa, Bağlam, AI model, Token kullanımı, Yanıt süresi, Önerilen aksiyonlar (JSON özeti), Tenant, Branch, Tarih. İsteğe bağlı: ip_hash, user_agent (sadece yetkili roller). |
| **Aksiyonlar** | CRM’e aktivite olarak ekle, Geri. |

### 2.13 Tenant listesi

| Alan türü | İçerik |
|-----------|--------|
| **Amaç** | Müşteri/franchise kayıtlarını listelemek. |
| **Liste kolonları** | Id (kısa), Ad, Slug, E-posta, Telefon, Paket, Durum, Oluşturulma tarihi. |
| **Filtreler** | Durum, Paket, Ad/Slug (kısmi). |
| **Sıralama** | Ad, Oluşturulma tarihi. |
| **Aksiyonlar** | Detay aç, Yeni tenant ekle, Düzenle, Sil (veya arşivle — karar gerekir). |

### 2.14 Tenant detay / Şubeler

| Alan türü | İçerik |
|-----------|--------|
| **Amaç** | Tek tenant’ın bilgileri ve bu tenant’a ait şube listesi. |
| **Detay alanları** | Ad, Slug, E-posta, Telefon, Paket, Durum, Metadata (gerekirse). Alt blok: Şube listesi (branch adı, şehir, adres, durum). |
| **Aksiyonlar** | Tenant düzenle, Şube ekle, Şube düzenle/sil, Geri. |

### 2.15 Branch listesi (tenant bazlı veya genel)

| Alan türü | İçerik |
|-----------|--------|
| **Amaç** | Şubeleri tenant’a göre veya tümü listelemek. |
| **Liste kolonları** | Id, Tenant adı, Şube adı, Şehir, İlçe, Adres (kısaltılmış), Durum, Oluşturulma tarihi. |
| **Filtreler** | Tenant, Şehir, Durum. |
| **Sıralama** | Tenant adı, Şube adı. |
| **Aksiyonlar** | Detay aç, Yeni şube ekle, Düzenle, Sil (veya arşivle). |

### 2.16 Rol / Kullanıcı yönetimi

| Alan türü | İçerik |
|-----------|--------|
| **Amaç** | Sisteme giriş yapan kullanıcıları ve rollerini yönetmek. |
| **Liste / detay alanları** | Kullanıcı kimliği, E-posta, Ad, Rol (patron / asistan / nis_asistan), Atanmış tenant/branch (Niş için), Durum, Son giriş. |
| **Filtreler** | Rol, Tenant, Durum. |
| **Aksiyonlar** | Kullanıcı ekle, Rol/tenant/branch ata, Düzenle, Devre dışı bırak (silme yerine). |

**Karar gerektiren nokta:** Kullanıcı-kimlik deposu Supabase Auth mı, harici IdP mi; rol bilgisi nerede tutulacak (ayrı tablo, claim, vb.)?

### 2.17 Sistem ayarları

| Alan türü | İçerik |
|-----------|--------|
| **Amaç** | Genel sistem parametreleri (ör. site adı, iletişim e-postası, robot açık/kapalı). |
| **Alanlar** | Ayarların adı, değer, açıklama. Hangi ayarların bu ekranda olacağı proje kararına bırakılır. |
| **Aksiyonlar** | Kaydet. |

**Karar gerektiren nokta:** Hangi ayarlar «sistem ayarı» olarak yönetilecek liste halinde netleştirilmeli.

### 2.18 KVKK / Veri işleme ekranları

| Alan türü | İçerik |
|-----------|--------|
| **Amaç** | Veri silme / anonimleştirme taleplerini yönetmek veya toplu anonimleştirme tetiklemek. |
| **Alanlar** | Talep listesi (varsa): talep id, ilgili kişi e-posta, talep türü (silme/anonimleştirme), durum, tarih. Tetikleme: e-posta veya «tümü için X gün eski kayıtlar» gibi kriter. |
| **Filtreler** | Talep türü, durum, tarih. |
| **Aksiyonlar** | Talep işle, Toplu anonimleştirme tetikle, Rapor al. |

**Karar gerektiren nokta:** KVKK «talep» iş akışı (form → onay → işlem) ayrı bir dokümanda mı tanımlanacak?

---

## 3. API ENDPOINT TASLAĞI (Input/Output Şema Düzeyi)

Kod/SQL yok. Sadece endpoint adı, metod, kısa amaç, **input alanları**, **output alanları** (ve hata çıktısı özeti).

### 3.1 Form ve robot — kamuya açık

| Endpoint | Metod | Amaç | Input (gövde/query) | Output (başarı) | Hata / Not |
|----------|-------|------|---------------------|------------------|------------|
| **Demo talep gönder** | POST | demo_requests kaydı | name*, email*, phone?, company_name?, athlete_count?, interested_package?, message?, utm_source?, utm_medium?, utm_campaign? | success: true, data: { id, created_at } | 400 eksik alan, 500 sunucu |
| **Franchise başvuru gönder** | POST | franchise_applications kaydı | name*, email*, phone*, city*, district?, experience?, investment_budget?, motivation? | success: true, data: { id, created_at } | 400 eksik alan, 500 sunucu |
| **İletişim mesajı gönder** | POST | contact_messages kaydı | name*, email*, phone?, subject*, message*, category? | success: true, data: { id, created_at } | 400 eksik alan, 500 sunucu |
| **Newsletter abone ol** | POST | newsletter_subscribers kaydı | email*, name?, kvkk_consent? (boolean) | success: true, data: { id } | 400 eksik/geçersiz, 409 zaten kayıtlı, 500 sunucu |
| **Robot chat — Mesaj** | POST | robot_chat_logs + AI yanıtı | message*, session_id*, context?, page_url?, conversation_history? (dizi: role, content) | success: true, data: { message, actions, suggestions, session_id, ai_model } | 400 message/session_id eksik, 500 sunucu/AI hatası |
| **Robot chat — Durum** | GET | Servis sağlık/sürüm | — | status: ok, service: string, version: string | — |

*Zorunlu alanlar * ile.*

### 3.2 Admin — Demo

| Endpoint | Metod | Amaç | Input (query/body) | Output (başarı) | Not |
|----------|-------|------|---------------------|------------------|-----|
| **Demo listesi** | GET | Sayfalı liste | page?, limit?, status?, date_from?, date_to?, email?, package? | { items: [{ id, name, email, phone, company_name, athlete_count, interested_package, message, utm_*, status, created_at }], total, page, limit } | Rol/tenant filtresi uygulanır |
| **Demo detay** | GET | Tek kayıt | id (path) | { id, name, email, phone, company_name, athlete_count, interested_package, message, utm_*, status, created_at } | 404 yoksa |
| **Demo durum güncelle** | PATCH | status güncelleme | id (path), body: { status } | { id, status, updated_at } | 403 yetki, 404 |

### 3.3 Admin — Franchise

| Endpoint | Metod | Amaç | Input | Output (başarı) | Not |
|----------|-------|------|-------|------------------|-----|
| **Franchise listesi** | GET | Sayfalı liste | page?, limit?, status?, date_from?, date_to?, city?, email? | { items: [{ id, name, email, phone, city, district, experience, investment_budget, motivation, status, created_at }], total, page, limit } | Rol/tenant filtresi |
| **Franchise detay** | GET | Tek kayıt | id (path) | { id, name, email, phone, city, district, experience, investment_budget, motivation, status, created_at } | 404 |
| **Franchise durum güncelle** | PATCH | status güncelleme | id (path), body: { status } | { id, status, updated_at } | 403, 404 |

### 3.4 Admin — İletişim ve Newsletter

| Endpoint | Metod | Amaç | Input | Output (başarı) | Not |
|----------|-------|------|-------|------------------|-----|
| **İletişim listesi** | GET | Sayfalı liste | page?, limit?, status?, date_from?, date_to?, category? | { items: [{ id, name, email, phone, subject, message, category, status, created_at }], total, page, limit } | — |
| **İletişim detay** | GET | Tek kayıt | id (path) | { id, name, email, phone, subject, message, category, status, created_at } | 404 |
| **İletişim durum güncelle** | PATCH | status güncelleme | id (path), body: { status } | { id, status, updated_at } | — |
| **Newsletter listesi** | GET | Sayfalı liste | page?, limit?, date_from?, date_to?, kvkk_consent?, email? | { items: [{ id, email, name, kvkk_consent, created_at }], total, page, limit } | — |

### 3.5 Admin — CRM

| Endpoint | Metod | Amaç | Input | Output (başarı) | Not |
|----------|-------|------|-------|------------------|-----|
| **CRM kişi listesi** | GET | Sayfalı crm_contacts | page?, limit?, lead_stage_id?, source_type?, tenant_id?, branch_id?, date_from?, date_to?, q? (ad/email arama) | { items: [{ id, name, email, phone, company_name, source_type, source_id, lead_stage_id, lead_stage_code, tenant_id, branch_id, created_at, last_activity_at }], total, page, limit } | — |
| **CRM kişi detay** | GET | Tek kişi + aktiviteler | id (path) | { id, name, email, phone, company_name, source_type, source_id, lead_stage_id, tenant_id, branch_id, created_at, updated_at, activities: [{ id, activity_type, source_table, source_id, title, created_at }] } | 404 |
| **CRM kişi oluştur** | POST | Yeni crm_contact | body: { email*, name?, phone?, company_name?, source_type?, source_id?, lead_stage_id?, tenant_id?, branch_id? } | { id, email, … } | 400, 409 email çakışması? |
| **CRM kişi güncelle** | PATCH | Kişi ve/veya lead_stage | id (path), body: { name?, phone?, company_name?, lead_stage_id?, tenant_id?, branch_id? } | { id, … } | 404 |
| **CRM aktivite ekle** | POST | Kişiye aktivite | body: { contact_id*, activity_type*, title?, source_table?, source_id?, payload? } | { id, contact_id, activity_type, created_at } | 400, 404 |
| **CRM lead aşaması güncelle** | PATCH | Sadece aşama | id (path), body: { lead_stage_id* } | { id, lead_stage_id } | 404 |

**Karar gerektiren nokta:** activity_type değerleri sabit mi (örn. not, call, email, meeting) yoksa liste endpoint’i ile mi verilecek?

### 3.6 Admin — Robot chat log

| Endpoint | Metod | Amaç | Input | Output (başarı) | Not |
|----------|-------|------|-------|------------------|-----|
| **Chat log listesi** | GET | Sayfalı robot_chat_logs | page?, limit?, date_from?, date_to?, session_id?, page_url?, tenant_id?, branch_id?, robot_type_id? | { items: [{ id, session_id, user_message, robot_response, page_url, ai_model, response_time_ms, created_at }], total, page, limit } | Mesaj içeriği kısaltılmış olabilir |
| **Chat log detay** | GET | Tek log kaydı | id (path) | { id, session_id, user_message, robot_response, page_url, context, ai_model, tokens_used, response_time_ms, actions_suggested, tenant_id, branch_id, created_at } | 404 |

### 3.7 Admin — Tenant ve Branch

| Endpoint | Metod | Amaç | Input | Output (başarı) | Not |
|----------|-------|------|-------|------------------|-----|
| **Tenant listesi** | GET | Sayfalı tenants | page?, limit?, status?, package_id? | { items: [{ id, name, slug, email, phone, status, package_id, created_at }], total, page, limit } | — |
| **Tenant detay** | GET | Tek tenant + şube listesi | id (path) | { id, name, slug, email, phone, status, package_id, metadata, created_at, branches: […] } | 404 |
| **Tenant oluştur** | POST | Yeni tenant | body: { name*, slug?, email?, phone?, status?, package_id?, metadata? } | { id, name, … } | 400, 409 slug |
| **Tenant güncelle** | PATCH | Tenant alanları | id (path), body: { name?, slug?, email?, phone?, status?, package_id?, metadata? } | { id, … } | 404 |
| **Tenant sil** | DELETE | Tenant silme/arsivleme | id (path) | 204 No Content veya { deleted: true } | 404, 409 ilişkili kayıt varsa |
| **Branch listesi** | GET | Sayfalı branches (ops. tenant_id filtresi) | page?, limit?, tenant_id?, status? | { items: [{ id, tenant_id, name, city, district, address, status, created_at }], total, page, limit } | — |
| **Branch detay** | GET | Tek branch | id (path) | { id, tenant_id, name, city, district, address, status, metadata, created_at } | 404 |
| **Branch oluştur** | POST | Yeni branch | body: { tenant_id*, name*, city?, district?, address?, status?, metadata? } | { id, … } | 400, 404 tenant_id |
| **Branch güncelle** | PATCH | Branch alanları | id (path), body: { name?, city?, district?, address?, status?, metadata? } | { id, … } | 404 |
| **Branch sil** | DELETE | Branch silme/arsivleme | id (path) | 204 veya { deleted: true } | 404, 409 |

### 3.8 Admin — Roller / referans listeleri

| Endpoint | Metod | Amaç | Input | Output (başarı) | Not |
|----------|-------|------|-------|------------------|-----|
| **Lead aşamaları listesi** | GET | crm_lead_stages (C, E, O, JAO) | — | { items: [{ id, code, name_tr, sort_order }] } | Sabit/seyrek değişen |
| **Robot tipleri listesi** | GET | robot_types | — | { items: [{ id, code, name_tr }] } | — |
| **Rol listesi** | GET | app_roles | — | { items: [{ id, code, name_tr, hierarchy_level, is_robot }] } | — |

**Karar gerektiren nokta:** Kullanıcı CRUD endpoint’leri (liste, oluştur, güncelle, sil) ve auth (login/logout) taslağı ayrı bir «Auth & Kullanıcı API» dokümanında mı toplanacak?

### 3.9 KVKK

| Endpoint | Metod | Amaç | Input | Output (başarı) | Not |
|----------|-------|------|-------|------------------|-----|
| **Anonimleştirme tetikle** | POST | Belirli e-posta veya kriter için anonimleştirme işi başlat | body: { email? (tekil), criteria? (örn. older_than_days, scope: demo|contact|…) } | { job_id, status: queued } veya senkron { anonymized_count } | Yetki: Patron (ve isteğe bağlı Asistan); karar gerekir |
| **Anonimleştirme durumu** | GET | İşlem sonucu | job_id (path veya query) | { job_id, status, anonymized_count?, error? } | — |

**Karar gerektiren nokta:** Hangi tablolarda hangi alanlar anonimleştirilecek (bk. Bölüm 6).

---

## 4. KABUL KRİTERLERİNDEN TEST SENARYOLARI (Given / When / Then)

Her senaryo: **Given** (başlangıç koşulu), **When** (eylem), **Then** (beklenen sonuç). Kabul kriterleri taslaktan türetilmiştir.

### 4.1 Demo talep

| ID | Given | When | Then |
|----|--------|------|------|
| T-Demo-1 | Ziyaretçi demo formu sayfasındadır, name ve email doludur. | Form gönderilir. | demo_requests’te yeni kayıt oluşur; HTTP 200 ve success: true dönülür. |
| T-Demo-2 | Ziyaretçi demo formundadır; name veya email boştur. | Form gönderilir. | Kayıt oluşmaz; HTTP 400 ve hata mesajı dönülür. |
| T-Demo-3 | Patron rolündeki kullanıcı giriş yapmıştır. | Admin demo listesi istenir (GET). | Demo talepleri listelenir; sayfalama ve filtre uygulanabilir. |
| T-Demo-4 | Asistan rolündeki kullanıcı giriş yapmıştır; bir demo kaydı vardır. | Demo detay sayfası açılır; durum «contacted» olarak güncellenir. | Kayıt güncellenir; liste/detayda yeni durum görünür. |
| T-Demo-5 | Anonim kullanıcı. | Admin demo listesi istenir (GET). | Erişim reddedilir (401/403). |

### 4.2 Franchise başvuru

| ID | Given | When | Then |
|----|--------|------|------|
| T-Fr-1 | Ziyaretçi franchise formundadır; name, email, phone, city doludur. | Form gönderilir. | franchise_applications’ta yeni kayıt oluşur; HTTP 200, success: true. |
| T-Fr-2 | Zorunlu alanlardan biri eksiktir. | Form gönderilir. | Kayıt oluşmaz; HTTP 400. |
| T-Fr-3 | Patron giriş yapmıştır. | Franchise listesi istenir; durum filtresi «new» seçilir. | Sadece durumu «new» olan başvurular döner. |

### 4.3 İletişim ve Newsletter

| ID | Given | When | Then |
|----|--------|------|------|
| T-İlet-1 | Ziyaretçi iletişim formundadır; name, email, subject, message doludur. | Form gönderilir. | contact_messages’ta kayıt oluşur; HTTP 200. |
| T-Nw-1 | Ziyaretçi newsletter formundadır; email benzersizdir. | Abone olunur. | newsletter_subscribers’ta kayıt oluşur; HTTP 200. |
| T-Nw-2 | Aynı email ile daha önce abone olunmuştur. | Aynı email ile tekrar abone olunur. | HTTP 409 veya uygun mesaj; yeni kayıt oluşmaz. |

### 4.4 Robot chat (NeebChat)

| ID | Given | When | Then |
|----|--------|------|------|
| T-Chat-1 | Ziyaretçi sitededir; geçerli session_id ve message vardır. | POST /api/robot/chat ile mesaj gönderilir. | robot_chat_logs’ta kayıt oluşur; yanıt gövdesinde message, actions, suggestions döner. |
| T-Chat-2 | message veya session_id eksiktir. | POST /api/robot/chat gönderilir. | HTTP 400; kayıt oluşmaz. |
| T-Chat-3 | — | GET /api/robot/chat (durum) çağrılır. | status: ok, service ve version alanları döner. |

### 4.5 CRM

| ID | Given | When | Then |
|----|--------|------|------|
| T-CRM-1 | Patron giriş yapmıştır; CRM kişi listesi boş veya dolu. | CRM kişi listesi istenir; lead_stage_id = C filtresi uygulanır. | Sadece C aşamasındaki kişiler döner. |
| T-CRM-2 | Bir crm_contact vardır; Asistan giriş yapmıştır. | O kişinin lead_stage_id’si O’ya güncellenir. | Kayıt güncellenir; detayda aşama O görünür. |
| T-CRM-3 | Bir crm_contact vardır. | Bu kişiye aktivite eklenir (activity_type: not, title dolu). | crm_activities’ta yeni kayıt oluşur; kişi detayında aktivite listesinde görünür. |
| T-CRM-4 | Demo talebi kaydedilmiş ve «CRM’e aktar» tetiklenmiştir. | CRM kişi listesi kontrol edilir. | İlgili email ile bir crm_contact ve demo_request’e bağlı bir crm_activity oluşmuş olur. |

### 4.6 Tenant ve Branch

| ID | Given | When | Then |
|----|--------|------|------|
| T-Ten-1 | Patron giriş yapmıştır. | Yeni tenant oluşturulur (name zorunlu). | tenants’ta kayıt oluşur; id döner. |
| T-Ten-2 | Bir tenant vardır. | O tenant’a yeni branch eklenir (tenant_id, name zorunlu). | branches’ta kayıt oluşur; tenant detayında şube listesinde görünür. |
| T-Ten-3 | Asistan giriş yapmıştır. | Tenant oluşturma (POST) istenir. | HTTP 403. |
| T-Br-1 | Bir branch, robot_chat_logs’ta branch_id ile kullanılıyordur. | O branch silinir (veya soft delete). | Silme politikasına göre: cascade ile silinir veya 409 dönülür; karar gerektiren nokta. |

### 4.7 Yetki ve roller

| ID | Given | When | Then |
|----|--------|------|------|
| T-Yet-1 | Niş Asistan rolü, yalnızca Tenant A kapsamına atanmıştır. | CRM kişi listesi istenir. | Sadece Tenant A’ya ait (veya tenant’ı A olan) kişiler döner. (**Karar:** Kapsam kuralları netleşince senaryo güncellenir.) |
| T-Yet-2 | Giriş yapmamış kullanıcı. | Admin herhangi bir sayfa/endpoint’e istek atar. | 401 Unauthorized veya yönlendirme login’e. |
| T-Yet-3 | Asistan giriş yapmıştır. | Sistem ayarları sayfası açılır veya PATCH istenir. | Erişim reddedilir (403 veya sayfa gösterilmez). |

### 4.8 KVKK (anonimleştirme)

| ID | Given | When | Then |
|----|--------|------|------|
| T-Kvkk-1 | Patron giriş yapmıştır; belirli email’e ait demo/contact kayıtları vardır. | Anonimleştirme tetiklenir (email = X). | İlgili tablolarda X’e ait kişisel veriler anonimleştirilir (bk. Bölüm 6); işlem sonucu raporlanır veya job_id döner. |
| T-Kvkk-2 | Anonimleştirme «X günden eski kayıtlar» kriteri ile tanımlanmıştır. | Tetikleme older_than_days=365 ile yapılır. | Sadece o kriteri karşılayan kayıtlar anonimleştirilir. (**Karar:** Hangi tablolar/alanlar dahil, Bölüm 6’da.) |

---

## 5. KVKK TASLAĞI: LLM’E GİTMEYECEK ALANLAR VE ANONİMLEŞTİRME

### 5.1 LLM’e gitmeyecek alanlar

Aşağıdaki alanlar **prompt, log veya başka bir şekilde LLM / harici AI servisine gönderilmemelidir** (NeebChat ve diğer robot entegrasyonları için):

| Alan / Veri türü | Tablo / Kaynak | Gerekçe (kısa) |
|------------------|-----------------|----------------|
| E-posta (tam adres) | demo_requests, franchise_applications, contact_messages, newsletter_subscribers, crm_contacts | Kişisel veri; tanımlayıcı. |
| Ad soyad | Aynı tablolar | Kişisel veri. |
| Telefon | Aynı tablolar | Kişisel veri. |
| IP adresi (veya ip_hash’in tersi) | robot_chat_logs, loglar | Kişisel veri / izlenebilirlik. |
| Session_id (ham, geri çözülebilir şekilde) | robot_chat_logs | Oturum takibi; LLM için gerek yok. |
| User-Agent (tam) | robot_chat_logs | Cihaz/ tarayıcı parmak izi. |
| Şirket adı + kişi eşleşmesi | demo_requests, crm_contacts | Dolaylı tanımlayıcı. |
| Adres (şehir/ilçe/sokak vb.) | franchise_applications, branches, crm_contacts | Konum verisi. |

**LLM’e (veya harici AI’ya) gönderilebilecekler (iş mantığı gerektiriyorsa maskeleme/özette dönüştürülmüş olarak):**

- Genel soru metni (kullanıcı mesajı): **E-posta/ad/telefon çıkarıldıktan** veya placeholder ile değiştirildikten sonra.
- Sayfa URL’si (örn. /ozellikler): Genelde risk düşük; karar gerektiren nokta.
- Kaynak türü (demo/franchise/contact/chat): Kişi bilgisi içermeden.

**Karar gerektiren noktalar:**

- Kullanıcı mesajında yazdığı e-posta/telefon «otomatik tespit edilip» prompt’tan çıkarılacak mı, yoksa tüm mesaj mı LLM’e hiç gitmeyecek?
- Claude API’ye giden conversation_history’de eski mesajlar da aynı kurallarla filtrelenecek mi?
- Raporlama/istatistik için «şehir», «paket» gibi agregalar LLM’e gidebilir mi? (Kişi eşleştirilemeyecek şekilde.)

### 5.2 Anonimleştirme taslağı

**Amaç:** İlgili kişi talebi veya saklama süresi dolduğunda kişisel verileri geri dönülemez şekilde anonim hale getirmek.

**Anonimleştirilecek alanlar (tablo bazında öneri):**

| Tablo | Anonimleştirilecek alanlar | Önerilen yöntem | Karar gerektiren nokta |
|-------|----------------------------|------------------|--------------------------|
| demo_requests | name, email, phone, company_name, message (içerik) | Sabit placeholder («anonim», «silindi», null) veya hash (geri çözülemez) | message tamamen silinsin mi, yoksa «içerik silindi» mı yazılsın? |
| franchise_applications | name, email, phone, city, district, experience, motivation | Aynı | investment_budget sayısal kalacak mı, aralık mı verilecek? |
| contact_messages | name, email, phone, subject, message | Aynı | — |
| newsletter_subscribers | email, name | Aynı; kvkk_consent false’a çekilebilir | Abonelik «iptal» mi sayılacak, yoksa kayıt tamamen silinecek mi? |
| robot_chat_logs | user_message (içerik), robot_response (içerik), ip_hash, user_agent, session_id (tersine izlenebilir olmamalı) | user_message/robot_response «anonim» veya null; ip_hash/user_agent null; session_id hash’lenebilir veya sabit değer | Token/timing bilgisi (tokens_used, response_time_ms) kalacak mı? |
| crm_contacts | name, email, phone, company_name | Aynı | source_id ile orijinal kayda link kalacak mı (o kayıt da anonimleştirildiyse sorun olmaz). |
| crm_activities | title (kişi bilgisi geçiyorsa), payload (içerik) | title «anonim»; payload temizlenir veya null | — |

**Tenants / branches:** Tüzel kişi ve şube adresi; KVKK kapsamı «gerçek kişi» odaklı olduğu için tenant/branch anonimleştirmesi ayrı politika konusu. **Karar gerektiren nokta:** Tenant içinde gerçek kişi (yetkili) bilgisi tutuluyorsa o alanlar listeye eklenmeli.

**Saklama süreleri:** Hangi tablo için kaç gün/ay saklanacak, süre sonunda toplu anonimleştirme mi yapılacak — **karar gerektiren nokta**; KVKK Aydınlatma Metni ile uyumlu sayılar sonradan yazılmalı.

**İşlem sırası önerisi:**  
1) İlgili kişiyi tanımla (genelde email);  
2) crm_contacts’ta o email’e ait kayıt(ları) bul;  
3) O kişiye bağlı crm_activities’ı anonimleştir;  
4) crm_contacts’taki kişi alanlarını anonimleştir;  
5) source_type/source_id ile demo_requests, franchise_applications, contact_messages’taki orijinal kayıtları anonimleştir;  
6) Aynı email/session’dan gelen newsletter_subscribers ve robot_chat_logs kayıtlarını anonimleştir.

---

## 6. KARAR GEREKTİREN NOKTALAR ÖZET LİSTESİ

Aşağıda, bu dokümandaki tüm «karar gerektiren nokta» özetleri toplu listelenmiştir.

| # | Konu | Bölüm |
|---|------|--------|
| 1 | Niş Asistan «kapsam» tanımı: tenant/branch/coğrafi mi, explicit menü yetkisi mi? | 1.1, 1.2 |
| 2 | Data Robot / Security Robot: Sadece servis token ile mi erişecek, admin UI hesabı olacak mı? | 1.1 |
| 3 | Demo/Franchise/İletişim için silme (D): Hiç verilmeyecek mi, soft delete/arşiv mi kullanılacak? | 1.1 |
| 4 | Niş Asistan için «R (kapsam?)» filtre mantığı: tenant_id, branch_id, bölge? | 1.2 |
| 5 | Data Robot rapor/istatistik endpoint’leri ayrı mı, sadece service token ile mi? | 1.2 |
| 6 | Security Robot log/audit okuma endpoint’leri ayrı mı? | 1.2 |
| 7 | Dashboard’da tenant/branch seçimi: Tüm kullanıcılar mı, sadece Patron mu? | 2.1 |
| 8 | Demo/Franchise/İletişim durum değerleri: Sabit enum mı, yönetilebilir mi? | 2.2 |
| 9 | Newsletter abonelik iptal: Sadece mail linki mi, admin’den de yapılacak mı? | 2.8 |
| 10 | CRM «yeni aktivite» tipleri: Sabit mi (not, call, email, meeting), yönetilebilir mi? | 2.10 |
| 11 | Chat log’da kişi yok; CRM eşlemesi sadece sonraki form gönderimleri + session mı? | 2.11 |
| 12 | Kullanıcı/kimlik: Supabase Auth mu, harici IdP mi; rol nerede (tablo/claim)? | 2.16 |
| 13 | Sistem ayarlarında hangi parametreler olacak? | 2.17 |
| 14 | KVKK talep iş akışı (form → onay → işlem) ayrı dokümanda mı? | 2.18 |
| 15 | API: activity_type sabit mi, yoksa liste endpoint’i ile mi verilecek? | 3.5 |
| 16 | Kullanıcı CRUD ve Auth (login/logout) API taslağı ayrı dokümanda mı? | 3.8 |
| 17 | Anonimleştirme tetikleme: Sadece Patron mu, Asistan da tetikleyebilecek mi? | 3.9 |
| 18 | LLM: Kullanıcı mesajındaki e-posta/telefon otomatik tespit edilip çıkarılacak mı? | 5.1 |
| 19 | conversation_history LLM’e giderken eski mesajlar da aynı filtreyle mi? | 5.1 |
| 20 | Raporlama için şehir/paket agregaları LLM’e gidebilir mi (kişi eşleşmeden)? | 5.1 |
| 21 | demo_requests.message: Tamamen silinsin mi, «içerik silindi» mi? | 5.2 |
| 22 | franchise_applications: investment_budget sayısal mı kalsın, aralık mı? | 5.2 |
| 23 | newsletter_subscribers: İptal mi, kayıt tamamen mi silinecek? | 5.2 |
| 24 | robot_chat_logs: tokens_used, response_time_ms kalsın mı? | 5.2 |
| 25 | Tenant/branch’ta gerçek kişi bilgisi varsa anonimleştirme kapsamına alınacak mı? | 5.2 |
| 26 | Saklama süreleri (tablo bazında gün/ay) ve süre sonu toplu anonimleştirme politikası. | 5.2 |
| 27 | Branch/tenant silmede cascade mi, 409 ile engel mi? | 4.6 (T-Br-1) |

---

*Bu doküman `GEREKSINIM_VE_MIMARI_TASLAK.md` ile birlikte kullanılır. Kod ve SQL içermez; karar noktaları netleştikçe güncellenmelidir.*
