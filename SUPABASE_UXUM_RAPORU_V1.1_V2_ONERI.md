# YİSA-S Supabase Şema Uyum Raporu — V1.1 / V2 Bölme Önerisi

**Referanslar:** `GEREKSINIM_VE_MIMARI_TASLAK.md`, `YETKI_MATRISI_API_TEST_KVKK_TASLAK.md`  
**Not:** «YETKI_API_KVKK_V1.1.md» dosyası bulunamadı; `YETKI_MATRISI_API_TEST_KVKK_TASLAK.md` referans alındı.

**Kural:** Varsayım yapılmadı; belirsizler «Karar gerektiren nokta» listesine eklendi.

---

## ÖNEMLİ: İKİ ŞEMA FARKI — HANGİ ŞEMA DENETLENDİ?

Bu rapor **iki farklı şema** ile karşılaştırıldığında tutarsız sonuç verebilir:

| Kaynak | İçerik |
|--------|--------|
| **Repodaki şema** (`supabase_schema_full.sql`) | app_roles, robot_types, crm_lead_stages, tenants, **branches**, demo_requests, franchise_applications, contact_messages, newsletter_subscribers, robot_chat_logs, crm_contacts, crm_activities, **v_crm_unified** view. **athletes, evaluations, evaluation_900_areas, phv_measurements YOK.** |
| **Sizin tarif ettiğiniz / paylaştığınız şema** | **athletes, evaluations, schedules, attendance, payments, phv_measurements, evaluation_900_areas, ai_usage_logs** var. **app_roles yok** → yerine **role_permissions**. **robot_types yok** → **robots** + ai_usage_logs.ai_motor. **branches yok** (şube kavramı yok). **v_crm_unified** view yok. **contact_messages, newsletter_subscribers** paylaştığınız SQL’de yoksa eksik. |

**Sonuç:** (A) bölümü **repodaki** `supabase_schema_full.sql`’e göre yazıldı. Sizin gerçek SQL farklıysa **Bölüm Z** (dosya sonunda) sizin şemanıza göre düzeltilmiş özeti verir. Cursor’a verirken **“Denetlenen şema hangisi?”** ve **“Gerçek şema aşağıdaki SQL”** diye net belirtin.

---

## (A) UYUM RAPORU — REPODAKİ `supabase_schema_full.sql`’E GÖRE

*Sizin SQL’iniz farklıysa **Bölüm Z**’ye bakın.*

### A.1 Tablo tablo özet (repodaki şemaya göre)

| Tablo | Taslakta var mı? | Repodaki şemada var mı? | Web form / CRM ayrımı | Uyum notu |
|-------|-------------------|----------------|------------------------|-----------|
| app_roles | Evet (4.1) | Evet | — | Uyumlu |
| robot_types | Evet (4.1) | Evet | — | Uyumlu |
| crm_lead_stages | Evet (4.1) | Evet | CRM | Uyumlu |
| tenants | Evet (4.2) | Evet | — | Uyumlu |
| branches | Evet (4.2) | Evet | — | Uyumlu |
| demo_requests | Evet (4.3) | Evet | Web form | Uyumlu |
| franchise_applications | Evet (4.3) | Evet | Web form | Uyumlu |
| contact_messages | Evet (4.3) | Evet | Web form | Uyumlu |
| newsletter_subscribers | Evet (4.3) | Evet | Web form | Uyumlu |
| robot_chat_logs | Evet (4.4) | Evet | — | Uyumlu; FK’lar blok 9’da ekleniyor |
| crm_contacts | Evet (4.4) | Evet | CRM | Uyumlu |
| crm_activities | Evet (4.4) | Evet | CRM | Uyumlu |
| v_crm_unified | Evet (4.5) | Evet | — | View; uyumlu |

Web form / CRM ayrımı: Web form tabloları (demo_requests, franchise_applications, contact_messages, newsletter_subscribers) ayrı; CRM tabloları (crm_contacts, crm_activities) ayrı. source_type / source_id ile ilişki taslağa uygun.

---

### A.2 Eksik tablolar

| Eksik tablo / yapı | Taslak/Yetki/KVKK’da referans | Açıklama |
|--------------------|-------------------------------|----------|
| **evaluation_categories** (veya 30 ana kategori) | Taslak 1.2: «900 alanlı değerlendirme» | Ürün tanımında 30 kategori × 30 alt alan var; şemada hiçbir evaluation / kategori tablosu yok. Taslak 1.4’te «app içi sporcu/antrenör … ayrı dokümana» deniyor — şu an kapsam dışı. |
| **evaluation_fields / evaluation_scores** (900 alan) | Aynı | 900 alan ve değerlendirme skorları için tablo(lar) taslakta veritabanı bölümünde detaylı tanımlı değil; tam app (V2) kapsamında beklenir. |
| **athletes** (sporcular) | Taslak 1.2, 5.2 (veli paneli, sporcu takibi) | Taslak 1.4’te app içi ekranlar kapsam dışı; şemada athletes yok. V2’de gerekli. |
| **veli / parents** (veya athletes üzerinden veli bilgisi) | Taslak 5.2 (veli paneli) | Şemada yok; V2’de PII/KVKK ile ele alınmalı. |
| **user_roles / auth – rol eşlemesi** | Yetki matrisi: Patron/Asistan/Niş vs. | app_roles tablosu var; «hangi kullanıcı hangi role sahip» için tablo veya Supabase Auth custom claim taslakta net değil. Karar gerektiren nokta. |

Özet: **branches** ve web form/CRM ayrımı şemada mevcut; eksiklik yok. Eksikler: (1) 900 alan / evaluations yapısı (taslakta kapsam dışı, V2’de), (2) athletes / veli (V2), (3) kullanıcı–rol eşlemesi (nasıl yapılacağı karara bağlı).

---

### A.3 Çakışan alan adları / kavramlar (tenant vs franchise owner vs lead)

| Kavram | Şemadaki yeri | Taslak / Yetki’deki anlamı | Çakışma / belirsizlik |
|--------|----------------|----------------------------|-------------------------|
| **tenant** | tenants.id, tenant_id (robot_chat_logs, crm_contacts) | Müşteri / franchise / kurum (4.2). | Çakışma yok. |
| **franchise** | franchise_applications (başvuru), tenants (onaylı müşteri) | «Franchise başvuru» = başvuran kişi; «Franchise» satış ürünü = bölgesel tekel. franchise_applications = başvuran; tenants = müşteri/kurum. | «Franchise owner» terimi taslakta açık tanımlı değil. tenants biriminin «franchise alan sahibi / işletmeci» mi yoksa «kurumsal müşteri» mi olduğu karara bağlı. |
| **lead** | crm_contacts.lead_stage_id → crm_lead_stages (C,E,O,J-A-O) | «Lead» = CRM’deki kişi + aşama. | Çakışma yok. lead = crm_contacts; tenant = tenants. |
| **franchise_applications.name/email** | Başvuran kişi | Franchise başvurusu yapan gerçek kişi. | Bu kişi ileride tenant (veya tenant yöneticisi) olarak eşleştirilecek mi? Şemada franchise_applications → tenants FK yok. **Karar gerektiren nokta.** |

Özet: Alan adları çakışmıyor; «tenant = franchise işletmeci mi», «franchise başvurusu → tenant nasıl bağlanır» netleştirilmeli.

---

### A.4 Yanlış / ters FK’lar (evaluations ↔ 900 alan)

| Konu | Durum | Açıklama |
|------|--------|----------|
| **Mevcut şemada evaluations** | Yok | Hiçbir evaluation, evaluation_category, evaluation_field vb. tablo yok. Ters FK riski yok. |
| **900 alan yapısı** | Şemada yok | Taslak «30 kategori × 30 alt alan» tanımlı; veritabanı taslağı (Bölüm 4) içinde bu yapının tabloları geçmiyor. |
| **V2’de beklenen ilişki** | Karar gerektiren nokta | İleride eklenirse: değerlendirme skorları tablosunun, «kategori / alan» tablosuna FK ile bağlanması beklenir (örn. evaluation_scores.evaluation_field_id → evaluation_fields.id). Kategori/alan tablosunun skor tablosuna FK ile bağlanması «ters» olur. Yön: **alan → skor** şeklinde tutulmalı. |

Özet: Şu an yanlış/ters FK yok. «evaluations ↔ 900 alan» V2 şemasında tasarlanırken FK yönü (alan → değerlendirme) dikkate alınmalı; kategorilerin nasıl modelleneceği (tek tablo / 30 satır, alt alanlar ayrı tablo vb.) karara bırakıldı.

---

### A.5 RLS açık olup politikası eksik tablolar

Tüm ilgili tablolarda RLS açık. Aşağıdakilerde **en az bir operasyon** (SELECT dışında INSERT/UPDATE/DELETE) taslak/yetki matrisine göre isteniyor fakat **RLS politikası tanımlı değil**.

| Tablo | RLS | Mevcut politikalar | Eksik olduğu düşünülen politikalar |
|-------|-----|---------------------|------------------------------------|
| demo_requests | Açık | anon INSERT, auth SELECT | auth UPDATE (durum güncelleme — Patron/Asistan) |
| franchise_applications | Açık | anon INSERT, auth SELECT | auth UPDATE (durum — Patron/Asistan) |
| contact_messages | Açık | anon INSERT, auth SELECT | auth UPDATE (durum — Patron/Asistan) |
| newsletter_subscribers | Açık | anon INSERT, auth SELECT | auth UPDATE (iptal vb.; karar gerekir), auth SELECT yeterli olabilir |
| robot_chat_logs | Açık | anon INSERT, auth SELECT | Sadece okuma gerekli; UPDATE/DELETE taslakta yok — policy eksik sayılmaz |
| crm_contacts | Açık | auth SELECT | auth INSERT, auth UPDATE (Patron/Asistan) |
| crm_activities | Açık | auth SELECT | auth INSERT (Patron/Asistan) |
| tenants | Açık | auth SELECT | auth INSERT, auth UPDATE, auth DELETE (Patron) |
| branches | Açık | auth SELECT | auth INSERT, auth UPDATE, auth DELETE (Patron) |
| app_roles | Açık | auth SELECT | Referans tablo; değişmez kabul edilirse yeterli. UPDATE gerekiyorsa auth UPDATE eksik. |
| robot_types | Açık | auth SELECT | Referans; genelde yeterli. |
| crm_lead_stages | Açık | auth SELECT | Referans; genelde yeterli. |

Özet: **RLS açık, politika eksik** tablolar: demo_requests, franchise_applications, contact_messages, crm_contacts, crm_activities, tenants, branches. (newsletter ve referans tablolar ihtiyaca göre karar noktası.)

---

### A.6 KVKK / PII riskleri (tablo ve alan bazında)

| Tablo / kaynak | PII / KVKK riski taşıyan alanlar | YETKI/KVKK taslağındaki yeri | Risk özeti |
|----------------|-----------------------------------|------------------------------|------------|
| **robot_chat_logs** | user_message, robot_response, session_id, ip_hash, user_agent | KVKK 5.1: LLM’e gitmemeli; 5.2: anonimleştirilecek | Mesaj metni kişi/iletişim bilgisi içerebilir; session/ip/user_agent izlenebilirlik. Anonimleştirme sırası taslakta var. |
| **demo_requests** | name, email, phone, company_name, message | KVKK 5.2 | Kişisel veri; anonimleştirme listesinde. |
| **franchise_applications** | name, email, phone, city, district, experience, motivation, investment_budget (sayısal) | KVKK 5.2 | Aynı. |
| **contact_messages** | name, email, phone, subject, message | KVKK 5.2 | Aynı. |
| **newsletter_subscribers** | email, name, kvkk_consent | KVKK 5.2 | Aynı. |
| **crm_contacts** | name, email, phone, company_name | KVKK 5.2 | Aynı; source_id ile orijinal kayda gidilebilir. |
| **crm_activities** | title, payload (içerik kişi bilgisi içerebilir) | KVKK 5.2 | title/payload anonimleştirilecek. |
| **tenants** | name, email, phone | KVKK 5.2: «Tenant’ta gerçek kişi bilgisi varsa» | Tüzel kişi mi gerçek kişi mi net değil; gerçek kişi ise PII. |
| **branches** | address, city, district | Konum; KVKK 5.1’de adres «konum verisi» | Düşük–orta; şube adresi genelde tüzel. |
| **athletes** | — | Şemada yok | V2’de ad, doğum tarihi, veli bilgisi vb. yüksek PII riski. |
| **veli bilgileri** | — | Şemada yok | V2’de ayrı tablo veya athletes ilişkisi; yüksek PII. |

Özet: Chat loglar, form kayıtları ve CRM tabloları PII taşıyor; KVKK taslağında listelenmiş. Athletes ve veli şemada olmadığı için risk «V2’de ele alınacak» notuyla rapora dahil edildi.

---

## (B) DEĞİŞİKLİK LİSTESİ (Breaking / Non-Breaking)

### B.1 Breaking (mevcut davranışı / API’yi bozabilecek)

| # | Değişiklik | Gerekçe | Etki |
|---|------------|--------|------|
| B1 | robot_chat_logs.tenant_id / branch_id için FK eklemek (blok 9) | Taslak 4.4: tenant_id → tenants, branch_id → branches | Şu an NULL veya geçersiz UUID olan satırlar varsa ALTER CONSTRAINT eklerken hata verebilir. Önce geçersiz tenant_id/branch_id’leri NULL yapmak veya geçerli tenants/branches kayıtlarıyla doldurmak gerekir. |
| B2 | RLS policy eklerken «auth UPDATE sadece belirli roller» gibi kısıt getirmek | Yetki: Patron/Asistan U; Niş kapsamlı | Uygulama şu an «authenticated» ile UPDATE yapıyorsa, rol bazlı policy ile bazı kullanıcılar UPDATE yapamaz hale gelir. |
| B3 | Yeni tablo adı / kolon adı değişikliği | — | Şu an önerilmedi; V2’de evaluation_* tabloları eklenirken isimlendirme tutarlı yapılmalı. |

### B.2 Non-breaking (geriye dönük uyumlu eklemeler)

| # | Değişiklik | Gerekçe |
|---|------------|--------|
| N1 | demo_requests, franchise_applications, contact_messages için auth UPDATE policy | Yetki: durum güncelleme |
| N2 | crm_contacts, crm_activities için auth INSERT, auth UPDATE policy | Yetki: CRM C,U |
| N3 | tenants, branches için auth INSERT, auth UPDATE, auth DELETE policy (örn. Patron için; rol uygulama katmanında veya policy içinde role göre) | Yetki: Tenant/Branch CRUD |
| N4 | robot_chat_logs.tenant_id / branch_id FK’ları: sadece yeni/mevcut geçerli değerler için; önceden invalid veriyi temizleyerek | Taslak 4.4, blok 9 |
| N5 | crm_contacts.branch_id FK: branches(id). Şemada zaten var. | Kontrol: crm_contacts.branch_id → branches.id mevcut. |
| N6 | newsletter_subscribers için auth UPDATE (iptal/consent) — karar sonrası | KVKK/Yetki |
| N7 | Tüm policy’lerde rol bilgisi uygulama tarafında mı, yoksa RLS içinde mi kullanılacak? Supabase’te rol genelde custom claim veya ayrı user_roles tablosu ile tutulur; policy USING/USING ile (auth.uid(), user_roles.role_id) join edilebilir. Bu, «nasıl» kararına bağlı; non-breaking olarak «auth UPDATE eklenmesi» önce, «rol koşulu» sonra eklenebilir. | Yetki matrisi |

---

## (C) UYGULAMA SIRASI (Migration plan)

Aşamalar, önce breaking riski azaltacak ve politikaları tamamlayacak şekilde sıralanmıştır.

| Adım | İş | Breaking risk | Bağımlılık |
|------|----|----------------|------------|
| C1 | **Veri temizliği:** robot_chat_logs.tenant_id, branch_id için geçersiz UUID’leri NULL yap veya geçerli tenants/branches ile eşle. (Hangi tenant/branch’a ait olduğu bilinmeyen public site chat’leri NULL kalabilir.) | FK eklerken hata önlenir | — |
| C2 | **FK ekleme:** robot_chat_logs.tenant_id → tenants(id) ON DELETE SET NULL, branch_id → branches(id) ON DELETE SET NULL. Şemadaki blok 9 ile uyumlu; sadece constraint yoksa ekle. | B1 azaltılır (C1 sonrası) | C1 |
| C3 | **RLS – UPDATE policy (non-rol):** demo_requests, franchise_applications, contact_messages üzerinde authenticated için UPDATE policy ekle. (Rol ayrımı uygulama katmanında veya sonraki adımda policy ile.) | Yok | — |
| C4 | **RLS – CRM:** crm_contacts ve crm_activities için authenticated INSERT ve UPDATE policy ekle. | Yok | — |
| C5 | **RLS – Tenant/Branch:** tenants ve branches için authenticated INSERT, UPDATE, DELETE policy ekle. (Sadece Patron için mi sınırlanacak, karar sonrası policy USING ile daraltılır.) | Yok | — |
| C6 | **Rol – RLS entegrasyonu:** Kullanıcı–rol bilgisinin nerede tutulacağı kararı alındıktan sonra, UPDATE/INSERT/DELETE policy’lerde role göre kısıtlama (örn. tenants DELETE sadece Patron). | B2 | Rol modeli kararı |
| C7 | **Referans tablolar:** app_roles, robot_types, crm_lead_stages için gerekirse auth UPDATE policy; yoksa dokümante et. | Yok | — |
| C8 | **KVKK hazırlığı:** Anonimleştirme için gerekli alan listesi ve işlem sırası KVKK taslağında; uygulama (job/trigger) ayrı migration’da. Bu raporda sadece «şema tarafı hazır» denebilir — ek tablo (anonimleştirme_job_log vb.) karar sonrası eklenir. | Yok | KVKK kararları |

Sıra özeti: **C1 → C2 → C3 → C4 → C5** temel uyum ve RLS tamamlama; **C6–C8** rol ve KVKK detayına bağlı.

---

## V1.1 MİNİMAL ŞEMA ÖNERİSİ (repodaki şema için)

*Sizin şemanız (athletes, evaluations, role_permissions, robots vb.) için **Bölüm Z.4** geçerlidir.*

**Hedef:** Mevcut web site + formlar + NeebChat + admin listeler + CRM görünümü + tenant/branch yönetimi. «900 alan», sporcu, veli, değerlendirme yok.

| Bileşen | İçerik |
|---------|--------|
| **Tablolar** | app_roles, robot_types, crm_lead_stages, tenants, branches, demo_requests, franchise_applications, contact_messages, newsletter_subscribers, robot_chat_logs, crm_contacts, crm_activities. (Mevcut şema ile aynı.) |
| **View** | v_crm_unified |
| **RLS** | Tüm tablolarda RLS açık; anon INSERT (form/chat); auth SELECT hepsi; auth UPDATE demo/franchise/contact; auth INSERT/UPDATE crm_contacts, crm_activities; auth INSERT/UPDATE/DELETE tenants, branches. |
| **FK** | robot_chat_logs.tenant_id → tenants, branch_id → branches; robot_chat_logs.robot_type_id → robot_types; crm_contacts.lead_stage_id → crm_lead_stages, tenant_id → tenants, branch_id → branches; crm_activities.contact_id → crm_contacts. |
| **Dışında bırakılan** | evaluation_*, athletes, veli, kullanıcı–rol tablosu (Supabase Auth + claim veya ayrı tablo karar sonrası). |

Bu rapor (A)–(B)–(C) ile uyumlu minimal şema, **V1.1** için yeterli kabul edilebilir; C1–C5 tamamlandığında «V1.1 minimal» tamamlanmış olur.

---

## V2 FULL APP ŞEMA ÖNERİSİ (repodaki şema için)

*Sizin şemanızda athletes, evaluations, phv_measurements, evaluation_900_areas zaten varsa **Bölüm Z.4** V2 kapsamı geçerlidir.*

**Hedef:** Uygulama (app) içi sporcu/antrenör, 900 alan değerlendirme, veli paneli, raporlama.

| Bileşen | İçerik |
|---------|--------|
| **V1.1’e eklenmesi beklenen** | |
| **evaluation_categories** (veya eşdeğer) | 30 ana kategori; taslak/yisas.ts’teki EVALUATION_SYSTEM.categories ile uyumlu. |
| **evaluation_fields** (veya 30×30 alan) | Her kategoride 30 alt alan; «900 alan» yapısı. FK: category_id → evaluation_categories. |
| **athletes** | Sporcu (tenant_id, branch_id, ad, doğum tarihi, cinsiyet, branş vb.). tenant_id → tenants, branch_id → branches. |
| **parents / veli** | Veli bilgileri; athletes ile ilişki (athlete_id veya ortak tablo). PII/KVKK taslağına eklenmeli. |
| **evaluation_scores** (veya athlete_evaluations) | Sporcu × alan × tarih skorları. FK: athlete_id → athletes, evaluation_field_id → evaluation_fields. **Yön:** alan → skor (evaluation_scores.evaluation_field_id → evaluation_fields.id). |
| **PHV ile ilgili tablolar** | Taslakta PHV aşamaları var; ayrı phv_stages veya evaluation ile birlikte modelenebilir. Karar gerektiren nokta. |
| **Kullanıcı–rol–tenant** | admin_users veya auth.users + user_roles; user_roles.tenant_id, branch_id (Niş kapsamı). |
| **RLS** | athletes, parents, evaluation_scores için tenant_id/branch_id ve rol bazlı policy. |

«Evaluations ↔ 900 alan» için önerilen ilişki: **evaluation_fields** (veya kategoriler + alt alanlar) ana yapı; **evaluation_scores** (veya athlete_evaluations) bu yapıya FK ile bağlanır. Kategori/alan tablolarının skor tablosuna FK ile referans vermesi **ters** kabul edilir; skor tablosunun alan tablosuna referans vermesi doğru yön.

---

## KARAR GEREKTİREN NOKTALAR (Bu rapora eklenenler)

| # | Konu | Bölüm |
|---|------|--------|
| K1 | «YETKI_API_KVKK_V1.1.md» adlı dosya bulunamadı; YETKI_MATRISI_API_TEST_KVKK_TASLAK.md kullanıldı. Farklı bir V1.1 dokümanı referans alınacak mı? | — |
| K2 | tenants = «franchise işletmeci» mi, «kurumsal müşteri» mi? franchise_applications başvurusu onaylandığında tenants’a nasıl taşınacak (aynı tabloda kayıt mı, FK mı)? | A.3 |
| K3 | Rol bilgisi nerede tutulacak: Supabase Auth custom claim, ayrı user_roles tablosu, yoksa sadece uygulama içi? RLS policy’lerde rol kullanılacak mı? | A.5, C6 |
| K4 | V2’de evaluation yapısı: 30 kategori tek tablo mu, kategori + alt alan iki tablo mu; 900 satırlık evaluation_fields mi? FK yönü (alan → skor) bu raporda önerildi; detay şema karara bırakıldı. | A.4, V2 |
| K5 | Patron dışında tenants/branches için DELETE veya soft delete: Yetki matrisinde Patron D; RLS’te DELETE policy sadece Patron mu, yoksa «silme» yerine status=archived mi? | A.5, B.2 |
| K6 | newsletter_subscribers için auth UPDATE (iptal, kvkk_consent) eklenecek mi? | A.5 |
| K7 | tenants / branches’ta gerçek kişi (yetkili) bilgisi tutulacak mı? Tutulacaksa KVKK anonimleştirme listesine hangi alanlar girecek? | A.6, KVKK 5.2 |
| K8 | Athletes ve veli tablolarının saklama süreleri ve anonimleştirme alanları V2 şemasıyla birlikte netleştirilecek. | A.6 |

---

*Bu rapor `supabase_schema_full.sql` ile `GEREKSINIM_VE_MIMARI_TASLAK.md` ve `YETKI_MATRISI_API_TEST_KVKK_TASLAK.md` arasındaki uyumu denetler; (A) uyum raporu, (B) değişiklik listesi, (C) uygulama sırası ve V1.1 / V2 bölme önerisi içerir. Kod ve SQL snippet yoktur.*

---

## BÖLÜM Z — SİZİN TARİF ETTİĞİNİZ / PAYLAŞTIĞINIZ ŞEMAYA GÖRE DÜZELTİLMİŞ RAPOR

*Bu bölüm, “paylaştığınız SQL”deki tablo setine göre yazıldı: athletes, evaluations, role_permissions, robots, ai_usage_logs, phv_measurements, evaluation_900_areas, schedules, attendance, payments, subscriptions, franchise_*, staff, security_alerts, conversations, messages, robot_tasks, patron_commands, celf_directorates vb. var; app_roles, robot_types, branches, v_crm_unified yok.*

### Z.1 Tablo tablo özet (sizin şemanıza göre)

| Tablo | Taslakta var mı? | Sizin şemada var mı? | Not |
|-------|-------------------|----------------------|-----|
| **athletes** | V2 / app içi | Evet | Sporcu uygulaması; PII/KVKK riski. |
| **evaluations** | V2 / 900 alan | Evet | Değerlendirme kayıtları. |
| **evaluation_900_areas** | V2 / 900 alan | Evet | 900 alan yapısı. |
| **phv_measurements** | V2 / PHV | Evet | PHV takibi. |
| **schedules** | V2 / operasyon | Evet | — |
| **attendance** | V2 / operasyon | Evet | — |
| **payments** | V2 / finans | Evet | — |
| **ai_usage_logs** | Robot/AI | Evet | ai_motor ile robot tipi ilişkisi. |
| **role_permissions** | Yetki (app_roles karşılığı) | Evet | app_roles yerine bu yapı. |
| **robots** | Robot (robot_types karşılığı) | Evet | robot_types yerine. |
| **branches** | Taslak 4.2 | Yok | Şube kavramı şemada yok; ileride eklenecek. |
| **app_roles** | Taslak 4.1 | Yok | role_permissions ile karşılanıyor. |
| **robot_types** | Taslak 4.1 | Yok | robots + ai_usage_logs.ai_motor. |
| **v_crm_unified** | Taslak 4.5 | Yok | View tanımı görünmüyor. |
| **contact_messages** | Taslak 4.3 | Paylaşılan SQL’de görünmüyorsa yok | Taslakta var; eksik sayılır. |
| **newsletter_subscribers** | Taslak 4.3 | Paylaşılan SQL’de görünmüyorsa yok | Taslakta var; eksik sayılır. |
| demo_requests, franchise_applications, robot_chat_logs | Evet | Var (anon insert vb. ile) | — |
| crm_lead_stages, crm_contacts, crm_activities | Evet | Var (policy eksikleri kullanıcı tarafından belirtildi) | — |
| tenants, packages, users, audit_logs | Evet / yetki | Var | — |

### Z.2 Eksik tablolar (sizin şemanıza göre)

| Eksik | Açıklama |
|-------|----------|
| **contact_messages** | Taslakta web form; sizin SQL’de yoksa eklenmeli. |
| **newsletter_subscribers** | Taslakta web form; sizin SQL’de yoksa eklenmeli. |
| **branches** | Taslakta tenants → branches; sizin şemada “şube” yok, ileride eklenecek. |
| **v_crm_unified** | Taslakta CRM view; sizin SQL’de view tanımı yoksa eklenmeli veya raporlama başka türlü yapılacak. |

**“athletes / evaluations / 900 alan yok” ifadesi:** Repodaki `supabase_schema_full.sql` için doğruydu; sizin şemanızda bunlar **var**. Bu rapordaki (A) bölümü repodaki dosyaya baktığı için o tabloları “yok” saydı; sizin şemada eksik değiller.

### Z.3 RLS — sizin şemanıza göre (mevcut / eksik)

**Sizin tarifinize göre mevcut politikalar:**  
robots_select, robots_modify; role_permissions_select, role_permissions_modify; core_rules_select; celf_directorates_select/modify; sports_branches_select/modify; packages_select/modify; crm_lead_stages_select; audit_logs_select/insert; patron_commands_all; anon insert: demo_requests, franchise_applications, robot_chat_logs.

**Politikası eksik veya paylaşılan kesitte görünmeyen tablolar (SELECT/UPDATE/INSERT/DELETE):**  
crm_contacts, crm_activities; tenants, users; conversations, messages; athletes, evaluations, attendance, payments, phv_measurements, evaluation_900_areas, ai_usage_logs, subscriptions, franchise_* (franchise_agreements, franchise_territories vb.), staff, security_alerts.

Bu liste, “RLS açık ama policy eksik” fikrinin sizin şemanıza uyarlanmış hali; hangi tabloya hangi policy’nin ekleneceği rol/yetki matrisine göre netleştirilmeli.

### Z.4 V1.1 / V2 bölme — sizin şemanıza göre (doğru kullanım için)

**V1.1 (Website + Admin + CRM + NeebChat)**  
Sporcu uygulaması kapsam dışı. Şunlarla sınırlı:

| Küme | Tablolar |
|------|----------|
| Lead/CRM & formlar | demo_requests, franchise_applications, **(varsa)** contact_messages, newsletter_subscribers, crm_lead_stages, crm_contacts, crm_activities |
| NeebChat log | robot_chat_logs |
| Yönetim | tenants, packages, role_permissions, users (admin) |
| Denetim | audit_logs; (opsiyonel) security_alerts |

**V1.1’de şimdilik “dondur / devre dışı bırak” (politika veya erişim ile kısıtlanabilir):**

| Küme | Tablolar |
|------|----------|
| Sporcu & performans | athletes, evaluations, evaluation_900_areas, phv_measurements, schedules, attendance |
| Finans / abonelik | payments, subscriptions, franchise_agreements, franchise_territories, staff |
| Robot orkestrasyonu | conversations, messages, robot_tasks, patron_commands, celf_directorates, ai_usage_logs (V1.1’de şart değilse) |

**V2 (Full App)**  
V2’de açılacaklar: sporcu/veli/PHV/900 alan/raporlama ekranları, ilgili tüm RLS/KVKK politikaları; çok şube (branches) eklenecekse burada netleşmeli.

**Kapsam özeti:**  
- **V1.1 scope:** web + admin + crm + chat.  
- **V2 scope:** athletes, evaluations, PHV, 900 alan, payments, subscriptions, staff, franchise_* operasyonları, conversations/messages/robot orkestrasyonu (ihtiyaç varsa).

### Z.5 Raporu kurtarmak için minimum düzeltme listesi

Cursor’a veya ekibe bu raporu verirken yapılması gerekenler:

1. **Denetlenen şema net olsun:**  
   “Bu rapor tutarsız; denetlenen şema farklı. **Aşağıdaki SQL gerçek şema.**” deyip elinizdeki gerçek SQL’i ekleyin.

2. **A.1’i gerçek şemaya göre kullanın:**  
   Raporun A.1’i repodaki şemaya göre. Sizin şemanız için **Bölüm Z.1** geçerli; Cursor’a “tablo seti Bölüm Z.1’deki gibi” diye belirtin.

3. **Eksik tabloları gerçek şemadan çıkarın:**  
   “Athletes / evaluations / 900 alan eksik” **kaldırılsın** (sizin şemada var).  
   **Gerçek eksikler** (sizin SQL’e göre): contact_messages, newsletter_subscribers, branches, v_crm_unified (yoksa).

4. **V1.1 Minimal’ı sizin şemaya göre kullanın:**  
   V1.1 tanımı için **Bölüm Z.4** geçerli: web+admin+crm+chat; athletes/evaluations/PHV/900 alan V2’de.

5. **Pratik cümle (Cursor’a verirken):**  
   “Bu rapor tutarsız; denetlenen şema farklı. Aşağıdaki SQL gerçek şema. V1.1 scope: web+admin+crm+chat; V2 scope: athletes, evaluations, PHV, 900 alan.”
