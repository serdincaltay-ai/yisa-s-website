# Cursor’a Yapıştır — Tek Paket (Zip + Üst Metin Birleşik)

Bu dosya, iki ayrı mesajda gönderilen içeriği tek pakette birleştirir:
- **Zip:** CURSOR-KOMUT.md, ROB-CURSOR-GOREV.md, YISA-S-FRANCHISE-TAM-SEMA.sql
- **Üst metin:** Uyum raporu düzeltmesi, V1.1/V2, Bölüm Z, RLS planı, referans kuralı

Cursor’a verirken **bu dosyayı + aşağıdaki “Yapıştır bloğu”nu** birlikte kullanın.

---

## 1. Referans Kuralı (Önce Oku)

**Bölüm Z geçerliliği:**  
Bölüm Z, chat’te paylaşılan SQL çıktısına göre yazıldı; repoda aynı içeriğe sahip bir `.sql` dosyası yoksa **Bölüm Z “referans dışı” kabul edilmelidir.**  
Bu projede gerçek şema: **`sql/YISA-S-FRANCHISE-TAM-SEMA.sql`**. Uyum raporundaki Bölüm Z bu dosyaya göre geçerlidir. Repo’daki `supabase_schema_full.sql` farklı bir sürümdür. **Karar:** Hangi dosya “source of truth” ise sadece o üzerinden migration ve RLS yazılacaktır.

---

## 2. Eksik / Karar Noktaları (Z.2 Koşullu)

**Chat’te paylaşılan SQL’de (YISA-S-FRANCHISE-TAM-SEMA.sql) görünmeyenler:**  
`contact_messages`, `newsletter_subscribers`, `branches`, `v_crm_unified`.

**Repo şemasında (supabase_schema_full.sql / A bölümüne göre) var olanlar:**  
`branches`, `v_crm_unified`.

Yani: Gerçek şema = `sql/YISA-S-FRANCHISE-TAM-SEMA.sql` ise **gerçek eksikler** contact_messages, newsletter_subscribers; branches/v_crm_unified “taslakta var, bu şemada yok” → eklenip eklenmeyeceği **karar noktası**.

---

## 3. V1.1 / V2 Kapsam (Tek Paket Tanımı)

| Sürüm | Kapsam |
|-------|--------|
| **V1.1** | Web + admin + CRM + NeebChat. Tablolar: demo_requests, franchise_applications, (varsa) contact_messages, newsletter_subscribers, crm_lead_stages, crm_contacts, crm_activities, robot_chat_logs, tenants, packages, role_permissions, users, audit_logs. Sporcu/PHV/900 alan, payments, subscriptions, conversations/messages, robot orkestrasyonu **şimdilik dondur**. |
| **V2** | athletes, evaluations, PHV, 900 alan, payments, subscriptions, staff, franchise_* operasyonları; branches kararı burada netleşir. |

---

## 4. RLS — V1.1 Minimum Plan

V1.1 tabloları için RLS, **`role_permissions` + `users.rol_kodu`** ile uyumlu olacak. Eksik olduğu düşünülen politikalar (SUPABASE_UXUM_RAPORU Bölüm Z.3’e göre):  
crm_contacts, crm_activities; tenants, users; demo_requests/franchise_applications için auth UPDATE (durum güncelleme — Patron/Asistan). Hangi tabloya hangi policy’nin ekleneceği yetki matrisine göre netleştirilecek.

---

## 5. Dashboard (Kontrol Paneli) Gereksinimi

**Dashboard** = kontrol paneli (İngilizce). Kullanıcı adı ve şifre ile giriş; giriş yapıldığında **beni karşılayan bir asistan** olan sayfa olmalı. Bu sayfa öncelikli hedeftir.

---

## 6. Bu Paketteki Dosyalar

| Dosya | Açıklama |
|-------|----------|
| `cursor-robot/CURSOR_YAPISTIR_BLOKU.md` | **Patron tam yetki — yapıştır, Enter’a bas.** Dashboard + login + asistan karşılama |
| `cursor-robot/ROB-CURSOR-GOREV.md` | ROB-CURSOR görev tanımı, adımlar, çekirdek kurallar |
| `cursor-robot/CURSOR-KOMUT.md` | Cursor’a verilecek başlatma komutu (uzun / kısa / adım adım) |
| `sql/YISA-S-FRANCHISE-TAM-SEMA.sql` | **Gerçek şema** — 32 tablo, production’da kullanılan SQL |
| `SUPABASE_UXUM_RAPORU_V1.1_V2_ONERI.md` | Uyum raporu; Bölüm Z bu şemaya göre |
| `GEREKSINIM_VE_MIMARI_TASLAK.md` | Sistem gereksinimi, mimari, roller |
| `YETKI_MATRISI_API_TEST_KVKK_TASLAK.md` | Yetki matrisi, API, test, KVKK taslağı |

---

## 7. Cursor’a Yapıştır Bloğu (Tek Paragraf)

**En pratik yol:** `cursor-robot/CURSOR_YAPISTIR_BLOKU.md` dosyasını aç, içindeki bloğu kopyala, Cursor’a yapıştır, Enter’a bas. O blokta Patron tam yetki + Dashboard (login + asistan karşılama sayfası) + gereksizleri temizle var.

Alternatif (bu metni de yapıştırabilirsin):

```
Bu rapor tutarsız; denetlenen şema farklı. Gerçek şema: sql/YISA-S-FRANCHISE-TAM-SEMA.sql.
V1.1 scope: web + admin (dashboard) + CRM + chat. Dashboard: kullanıcı adı ve şifre ile giriş; giriş sonrası beni karşılayan asistanlı sayfa olsun. Gereksiz tabloları temizle.
Önce cursor-robot/CURSOR_TEK_PAKET.md, ROB-CURSOR-GOREV.md, sql/YISA-S-FRANCHISE-TAM-SEMA.sql oku; sonra CURSOR-KOMUT.md’ye göre kur. Dashboard’da login + asistan karşılama sayfasını yap. Onay istemeden devam et.
```

---

## 8. Kısa Başlatma (Sadece Komut İstiyorsan)

```
Sen ROB-CURSOR'sun. PATRON tam yetki verdi. Dashboard (kontrol paneli): kullanıcı adı + şifre ile giriş; girişte beni karşılayan asistan sayfası olsun. Gerçek şema: sql/YISA-S-FRANCHISE-TAM-SEMA.sql. Gereksizleri temizle.
cursor-robot/CURSOR_YAPISTIR_BLOKU.md veya CURSOR_TEK_PAKET.md + ROB-CURSOR-GOREV.md + sql dosyasını oku, CURSOR-KOMUT.md’ye göre kur. Onay istemeden devam et.
```

---

**Hazırlayan:** Önceki sohbet özeti + zip + üst metin birleştirmesi  
**Tarih:** 28 Ocak 2025  
**Amaç:** İki ayrı mesajı (zip + üst metin) tek pakette birleştirip Cursor’a tek seferde yönlendirmek.
