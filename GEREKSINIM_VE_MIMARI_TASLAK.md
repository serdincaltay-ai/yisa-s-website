# YİSA-S — Sistem Gereksinimleri, Mimari ve Taslak Dökümanı

**Kod yok.** Sadece taslak, mimari, gereksinimler, roller, modüller, veritabanı taslağı ve ürün/satış stratejisi.

---

## 1. SİSTEM GEREKSİNİM DÖKÜMANI

### 1.1 Ürün tanımı

| Alan | Açıklama |
|------|----------|
| **Ürün adı** | YİSA-S (Yapay Zeka İşletme Sistemi ve Analiz Sistemi) |
| **Slogan** | Geleceğin Şampiyonlarını Bugünden Keşfedin |
| **Tanım** | Türkiye’de öncü çocuk sporcu analiz sistemi. 900 alanlı değerlendirme, 6 AI motoru, PHV (büyüme plağı) takibi. |
| **Hedef kitle** | Spor okulları, kulüpler, antrenörler, franchise adayları, veliler. |
| **Temel değer** | Bilimsel sporcu takibi, sakatlık önleme, raporlama ve veli iletişimi. |

### 1.2 İşlevsel gereksinimler (özet)

- **Web sitesi:** Tanıtım, özellikler, fiyatlandırma, franchise, hakkımızda, iletişim, demo talep, blog.
- **NeebChat (Chat Robot):** Her sayfada asistan; soru-cevap, demo/fiyat/franchise/iletişim yönlendirmesi; oturum ve loglama.
- **Formlar:** Demo talep, franchise başvuru, iletişim, newsletter — kayıt ve CRM’e aktarım.
- **CRM:** Tüm temaslar (demo, franchise, iletişim, chat, newsletter) tek kişi/aktivite modelinde toplanır; C / E / O / J-A-O aşamalarında takip.
- **Çok kiracılık:** Tenant (müşteri/franchise), Branch (şube); chat ve raporlar tenant/branch bazlı olabilir.
- **Hiyerarşi ve robotlar:** Patron, Asistan, Niş Asistan, Data Robot, Security Robot tanımlı; roller yetki ve iş akışında kullanılır.

### 1.3 İşlevsel olmayan gereksinimler (özet)

- **Performans:** Sayfa yükleme ve chat yanıt süresi makul sınırlarda olmalı.
- **Güvenlik:** KVKK uyumu; hassas veri için on-premise/LLaMA gibi seçenekler tanımlı.
- **Erişilebilirlik:** Anonim kullanıcı form gönderebilir; yetkili kullanıcılar admin/CRM verisini okuyabilir.
- **Ölçeklenebilirlik:** Tenant / branch ile çoklu müşteri ve şube desteklenir.

### 1.4 Kapsam dışı (bu taslakta)

- Uygulama (app) içi sporcu/antrenör ekranları ve detaylı iş akışları ayrı dokümana bırakılmıştır.
- Ödeme entegrasyonu, SSO, detaylı audit log gereksinimleri sonraki aşamada netleştirilir.

---

## 2. KULLANICI ROLLERİ VE YETKİLERİ

### 2.1 Hiyerarşi (app_roles)

Sistemde tanımlı roller ve hiyerarşi seviyeleri:

| Seviye | Rol kodu | Rol adı (TR) | Açıklama | Robot mu? |
|--------|----------|--------------|----------|-----------|
| 1 | patron | Patron | En üst yetkili; işletme sahibi | Hayır |
| 2 | asistan | Asistan | Patron yardımcısı | Hayır |
| 3 | nis_asistan | Niş Asistan | Alanında uzman asistan | Hayır |
| 4 | data_robot | Data Robot | Veri işleme ve raporlama robotu | Evet |
| 5 | security_robot | Security Robot | Güvenlik ve erişim kontrol robotu | Evet |

- **Patron:** Tüm sistem ayarları, tenant/franchise onayı, fiyat/paket kararları, raporlar.
- **Asistan:** Günlük operasyon, lead takibi, demo/franchise görüşmeleri, CRM kullanımı.
- **Niş Asistan:** Belirli alanlarda (örn. teknik destek, raporlama) yetkili; sınırlı admin.
- **Data Robot:** Rapor üretimi, veri özetleme, istatistik; kullanıcı değil, otomasyon.
- **Security Robot:** Erişim kontrolü, güvenlik olayları, log inceleme; kullanıcı değil, otomasyon.

### 2.2 Robot tipleri (robot_types)

| Kod | Ad | Kullanım yeri |
|-----|----|----------------|
| chat_robot | Chat Robot | Site asistanı (NeebChat); ziyaretçiyle sohbet, yönlendirme. |
| data_robot | Data Robot | Veri analizi, raporlama, özetleme. |
| security_robot | Security Robot | Güvenlik, erişim, log takibi. |

Roller «kim yapar», robot tipleri «hangi sistem bileşeni yapıyor» ayrımı için kullanılır.

### 2.3 Misafir / lead seviyeleri (C, E, O, J-A-O)

Tüm site ve CRM tarafındaki «misafir» veya «lead»ler aşağıdaki aşamalarda toplanır:

| Kod | Ad | Anlamı / Kullanım |
|-----|----|--------------------|
| C | C Seviyesi | İlk temas (Contact); demo, iletişim, chat ile gelen. |
| E | E Seviyesi | Değerlendirme (Evaluation); bilgi verildi, karar aşamasında. |
| O | O Seviyesi | Fırsat (Opportunity); ciddi aday, teklif/ görüşme. |
| JAO | J-A-O | Özel seviye; kuruma özel anlamı proje içinde netleştirilir. |

Yetkiler: Patron/Asistan bu aşamaları CRM üzerinden görür ve güncelleyebilir; Niş Asistan yetkisi tanımlandığı çerçevede sınırlı olabilir.

### 2.4 Erişim özeti

| Tip | Demo/Franchise/Contact/Newsletter | Robot chat log | CRM (contacts, activities) | Tenants, Branches, Roller |
|-----|-----------------------------------|-----------------|----------------------------|----------------------------|
| Anonim | Sadece form gönderme (insert) | Sadece chat log insert | Yok | Yok |
| Authenticated (genel) | Okuma (admin için) | Okuma | Okuma | Okuma |
| Patron | Tam | Tam | Tam | Tam |
| Asistan | Okuma + iş akışı | Okuma | Okuma + aşama güncelleme | Okuma |
| Niş Asistan | Tanıma göre sınırlı | Sınırlı | Tanıma göre sınırlı | Okuma |

Detaylı yetki matrisi (hangi ekranda ne yapılır) ayrı bir «Yetki Matrisi» dokümanında tutulmalıdır.

---

## 3. MODÜL MİMARİSİ

### 3.1 Modül listesi ve sorumlulukları

| Modül | Sorumluluk | Çıktı / Arayüz |
|-------|------------|-----------------|
| **Web / Tanıtım** | Ana sayfa, özellikler, fiyat, franchise, hakkımızda, blog, iletişim, demo talep formu. | Statik/SSR sayfalar, formlar. |
| **NeebChat** | Her sayfada chat widget; Claude ile yanıt, hızlı aksiyonlar (özellikler, fiyat, franchise, demo, iletişim), öneri sorular, oturum, loglama. | Floating widget, /api/robot/chat. |
| **Form / Kayıt** | Demo talep, franchise başvuru, iletişim, newsletter abonelik; veritabanına yazma ve isteğe bağlı CRM’e aktarma. | API route’lar, e-posta/ bildirim (ileride). |
| **CRM** | Birleşik kişi (crm_contacts) ve aktivite (crm_activities); C/E/O/J-A-O aşamaları; demo, franchise, iletişim, chat, newsletter kaynakları. | Admin/CRM ekranları, raporlar (ileride). |
| **Tenant / Branch** | Müşteri (franchise/kurum) ve şube yönetimi; chat ve raporlarda tenant/branch filtreleme. | Admin ekranları, API. |
| **Yetki / Rol** | Patron, Asistan, Niş, Data Robot, Security Robot; sayfa ve API erişiminin buna göre kısıtlanması. | Auth middleware, RLS, admin. |
| **Admin Panel** | Demo/franchise/iletişim/listeler, CRM görünümü, tenant/branch, chat logları; rol bazlı menü ve aksiyonlar. | Ayrı uygulama veya /admin altı. |

### 3.2 Modül ilişki diyagramı (metinsel)

```
[Ziyaretçi] --> Web/Tanıtım
[Ziyaretçi] --> NeebChat (widget)
[Ziyaretçi] --> Form/Kayıt (demo, franchise, iletişim, newsletter)

NeebChat --> /api/robot/chat --> robot_chat_logs
Form/Kayıt --> demo_requests | franchise_applications | contact_messages | newsletter_subscribers
Form/Kayıt --> (opsiyonel) CRM modülü --> crm_contacts, crm_activities

CRM modülü --> crm_lead_stages (C, E, O, J-A-O)
CRM modülü --> tenants, branches (kişi hangi tenant/şubeye ait)

Admin Panel --> Tüm tablolar (rol bazlı okuma/yazma)
Yetki/Rol --> Admin Panel + API + RLS
```

### 3.3 Veri akışı (CRM’e gönderim)

- Demo talep olunca: `demo_requests` kaydı; isteğe bağlı `crm_contacts` (+ lead_stage C) ve `crm_activities` (activity_type: demo_request).
- Franchise başvuru olunca: `franchise_applications` kaydı; isteğe bağlı `crm_contacts` (+ lead_stage) ve `crm_activities` (activity_type: franchise_app).
- İletişim formu: `contact_messages`; isteğe bağlı `crm_contacts` ve `crm_activities` (activity_type: contact_message).
- Newsletter: `newsletter_subscribers`; isteğe bağlı `crm_contacts` ve `crm_activities` (activity_type: newsletter).
- Chat etkileşimi: `robot_chat_logs`; isteğe bağlı e-posta/session eşleşmesi ile `crm_contacts` ve `crm_activities` (activity_type: chat).

Tüm «konular» böylece CRM’de tek kişi + aktivite zinciri olarak izlenebilir.

---

## 4. VERİTABANI TASLAĞI (KOD YOK)

Aşağıda yalnızca tablo adları, amacı ve ana ilişkiler yer alır. SQL yok.

### 4.1 Hiyerarşi ve referans tabloları

| Tablo | Amaç |
|-------|------|
| **app_roles** | Patron, Asistan, Niş Asistan, Data Robot, Security Robot. Kolonlar: code, name_tr, hierarchy_level, is_robot, description. |
| **robot_types** | Chat Robot, Data Robot, Security Robot. Log ve yetkilendirmede «hangi robot» bilgisi için. |
| **crm_lead_stages** | C, E, O, J-A-O aşamaları. crm_contacts her zaman bir lead_stage_id ile ilişkili olabilir. |

### 4.2 Kiracı ve yapı

| Tablo | Amaç | Ana ilişki |
|-------|------|------------|
| **tenants** | Müşteri / franchise / kurum. Ad, slug, iletişim, paket, durum. | — |
| **branches** | Şubeler. | branches.tenant_id → tenants.id |

### 4.3 Site ve form kayıtları

| Tablo | Amaç | Ana ilişki |
|-------|------|------------|
| **demo_requests** | Demo talep formu. Ad, e-posta, telefon, şirket, sporcu sayısı, paket, mesaj, UTM, durum. | — |
| **franchise_applications** | Franchise başvuru. Ad, e-posta, telefon, şehir, deneyim, yatırım, motivasyon, durum. | — |
| **contact_messages** | İletişim formu. Ad, e-posta, konu, mesaj, kategori, durum. | — |
| **newsletter_subscribers** | Newsletter aboneliği. E-posta, ad, KVKK onayı. | — |

### 4.4 Robot ve CRM

| Tablo | Amaç | Ana ilişki |
|-------|------|------------|
| **robot_chat_logs** | Her chat turunda bir kayıt: oturum, mesaj/cevap, model, token, süre, sayfa, UTM, aksiyonlar. | tenant_id → tenants.id (opsiyonel), branch_id → branches.id (opsiyonel), robot_type_id → robot_types.id (opsiyonel). |
| **crm_contacts** | CRM’deki birleşik kişi. E-posta, ad, telefon, şirket; kaynak (demo/franchise/contact/newsletter/chat), kaynak id, lead_stage_id. | tenant_id, branch_id, lead_stage_id → crm_lead_stages.id. |
| **crm_activities** | Tekil aktivite: chat, demo talebi, franchise başvurusu, iletişim mesajı, newsletter. | contact_id → crm_contacts.id; source_table, source_id ile orijinal kayda referans. |

### 4.5 Görünüm (mantıksal)

| Görünüm | Amaç |
|---------|------|
| **v_crm_unified** | Tüm crm_contacts + lead_stage (C/E/O/J-A-O) + o kişiye ait crm_activities listesi; rapor ve liste ekranları için. |

### 4.6 Güvenlik (taslak)

- **Anonim:** Sadece demo_requests, franchise_applications, contact_messages, newsletter_subscribers, robot_chat_logs için INSERT.
- **Authenticated:** Tüm bu tablolarda + app_roles, robot_types, crm_lead_stages, tenants, branches, crm_contacts, crm_activities için SELECT. Yazma (INSERT/UPDATE/DELETE) rol bazlı ayrı politikalarla kısıtlanır.

---

## 5. NE ÜRETECEGİZ, NE SATACAGIZ, NE KADARA, NASIL SATACAGIZ

### 5.1 Ne üreteceğiz?

- **Yazılım ürünü:** Çocuk sporcu analiz ve takip platformu (900 alan, 6 AI motoru, PHV takibi, 10 branş).
- **Hizmetler:** Abonelik (Starter / Professional / Enterprise), franchise, demo, teknik destek, eğitim.

### 5.2 Ne satacağız?

| Satış kalemi | İçerik |
|--------------|--------|
| **Starter paketi** | Küçük spor okulları için aylık abonelik; 50 sporcu, temel ölçümler, yoklama, ödeme takibi, e-posta destek. |
| **Professional paketi** | Tam özellikli sporcu takibi; 250 sporcu, 900 alan, PHV, 6 AI, veli paneli, WhatsApp, sosyal medya, detaylı rapor, 7/24 destek. |
| **Enterprise paketi** | Sınırsız sporcu, çoklu şube, beyaz etiket, API, özel entegrasyon, dedicated yönetici, on-premise seçeneği, SLA, franchise altyapısı. |
| **Franchise** | Bölgesel tekel, Enterprise dahil, eğitim, pazarlama ve teknik destek, marka kullanımı, satış materyalleri. |

### 5.3 Ne kadara satacağız?

| Ürün / Hizmet | Fiyat (taslak) | Dönem / Not |
|---------------|-----------------|-------------|
| Starter | ₺2.500 | Aylık |
| Professional | ₺7.500 | Aylık (öne çıkarılan paket) |
| Enterprise | ₺15.000 | Aylık |
| Franchise giriş | ₺50.000 | Tek seferlik |
| Franchise aylık | ₺15.000 | Aylık (bölgesel tekel, Enterprise dahil) |

*Para birimi ve tutarlar proje bilgi bankasındaki mevcut değerlerle uyumludur; güncel fiyatlandırma ayrı dokümanda güncellenebilir.*

### 5.4 Nasıl satacağız?

| Kanallar / Yöntem | Açıklama |
|-------------------|----------|
| **Web sitesi** | yisa-s.com üzerinden tanıtım, fiyat, franchise, demo talep ve iletişim formları. |
| **NeebChat** | Ziyaretçiyi demo, fiyat, franchise, iletişim sayfalarına yönlendirme; lead oluşturma. |
| **Demo talep** | Form ile talep, 14 gün ücretsiz deneme teklifi; sonrasında paket satışı. |
| **Franchise süreci** | Başvuru → Görüşme → İnceleme → Sözleşme → Eğitim → Lansman. |
| **İletişim ve e-posta** | İletişim formu ve newsletter ile takip; CRM’de C/E/O/J-A-O ile pipeline yönetimi. |
| **CRM kullanımı** | Tüm temaslar CRM’de toplanır; Patron/Asistan pipeline’ı yönetir, teklif ve kapanış yapar. |

### 5.5 Franchise şartları (özet)

- **Yatırım:** ₺50.000 giriş + ₺15.000/ay.
- **Beklentiler:** Spor sektörü deneyimi (tercih), en az 3 yıl iş deneyimi, bölgesel pazar bilgisi, girişimcilik, teknolojiye yatkınlık.
- **Sağlananlar:** Bölgesel tekel, Enterprise paket, eğitim, pazarlama ve teknik destek, ortak marka, satış materyalleri.

---

## 6. DOKÜMAN SÜRÜMÜ VE SONRAKİ ADIMLAR

- **Bu dosya:** Taslak; kod içermez. Onay sonrası «komut»/implementasyon aşamasına geçilebilir.
- **Referanslar:** `supabase_schema_full.sql` (veritabanı implementasyonu), `lib/knowledge/yisas.ts` (paket/franchise/marka verileri), `SISTEM_ACIKLAMASI_VE_NEEBCHAT.md` (NeebChat açıklaması).
- **Sonraki dokümanlar (öneri):** Detaylı yetki matrisi, ekran listesi (admin/CRM), API taslağı, test senaryoları, kabul kriterleri.

Bu taslak onaylandıktan sonra bir sonraki adımda uygulama komutlarına (kodlama / veritabanı değişiklikleri) geçilmesi öngörülmektedir.
