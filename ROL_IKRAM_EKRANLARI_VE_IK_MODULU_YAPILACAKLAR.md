# YİSA-S — Rol Bazlı Karşılama (İkram), Ekranlar ve İnsan Kaynakları Modülü — Yapılması Gerekenler

**Amaç:** Kod yazılmadan, hangi rollerin hangi ekranda karşılanacağı, portfolyo/İK modülleri ve iş kanunu–işveren–çalışan ilişkisiyle ilgili **yapılması, düzenlenmesi ve oluşturulması gereken** şablon, grafik, tasarım ve işlerin listesi.

---

## 1. ROL BAZLI KARŞILAMA (İKRAM) — HANGİ ROL HANGİ EKRANDA KARŞILANMALI?

Sisteme giriş yapan her rolün ilk gördüğü ekran (karşılama / “ikram”) net tanımlanmalı. Aşağıdakiler **yapılması gereken** tanım ve tasarım işleridir.

### 1.1 Alt Admin (Franchise Sahibi) — ROL-1
- **Yapılması gereken:** Giriş sonrası hangi ekran açılacak (dashboard / özet / tenant ana sayfa) belirlenmeli.
- **Yapılması gereken:** Bu ekranın şablonu, gösterilecek kartlar (özet sayılar, son aktiviteler, şube/çalışan özeti) ve grafikler tasarlanmalı.
- **Yapılması gereken:** “Hoş geldiniz, [Franchise Sahibi adı]” metni ve kısa yol linkleri (şubeler, personel, bordro, raporlar vb.) tasarlanmalı.

### 1.2 Tesis Müdürü — ROL-2
- **Yapılması gereken:** Tesis müdürü girişte hangi ekranda karşılanacak netleştirilmelidir (örn. tesis/şube özet dashboard’u).
- **Yapılması gereken:** Bu ekranın şablonu ve içeriği (o tesise ait sporcu sayısı, antrenör listesi, günlük/haftalık özet, uyarılar) tasarlanmalı.
- **Yapılması gereken:** Tesis müdürünün menüde göreceği sayfalar listelenmeli (personel, antrenörler, sporcular, devamsızlık, basit raporlar vb.).

### 1.3 Bölge Müdürü — ROL-3
- **Yapılması gereken:** Bölge müdürü için karşılama ekranı ve kapsamı (birden fazla tesis/şube) tanımlanmalı.
- **Yapılması gereken:** Bölge özeti dashboard şablonu ve grafikleri (tesis bazlı özet, performans, sayılar) hazırlanmalı.

### 1.4 Sportif Direktör — ROL-4
- **Yapılması gereken:** Sportif direktör hangi ekranda karşılanacak belirlenmeli (sporcu/antrenör/performans odaklı özet).
- **Yapılması gereken:** Bu role özel şablon ve raporların listesi çıkarılmalı (değerlendirmeler, 900 alan, PHV, branş dağılımı vb.).

### 1.5 Uzman Antrenör — ROL-5
- **Yapılması gereken:** Uzman antrenör girişte hangi ekranda karşılanacak tanımlanmalı (kendi sporcu grubu, program, değerlendirme özeti).
- **Yapılması gereken:** Antrenör “portfolyo” / özet ekranının şablonu ve alanları tasarlanmalı (atanan sporcular, gruplar, yaklaşan antrenmanlar, son değerlendirmeler).

### 1.6 Antrenör — ROL-6
- **Yapılması gereken:** Antrenör hangi ekranda karşılanacak netleştirilmelidir (antrenör panosu / kendi grubu).
- **Yapılması gereken:** Antrenör portfolyo bilgisi ekranı tasarlanmalı: atanan sporcular, branş, seviye, kısa performans özeti, kendi sertifikaları/uzmanlık alanları (staff + users ile ilişkili).

### 1.7 Yardımcı / Stajyer — ROL-7
- **Yapılması gereken:** Bu rol için karşılama ekranı ve yetki kapsamı tanımlanmalı (sınırlı menü, hangi sayfalara erişeceği).
- **Yapılması gereken:** Gerekirse basit bir “görevlerim / bugünkü program” şablonu tasarlanmalı.

### 1.8 Kayıt & Bilgilendirme — ROL-8
- **Yapılması gereken:** Bu rolün karşılanacağı ekran ve menü (kayıt, veli bilgilendirme, randevu/rezervasyon vb.) tasarlanmalı.

### 1.9 Temizlik — ROL-9
- **Yapılması gereken:** Bu rol için karşılama ekranı ve erişebileceği sayfalar (varsa) tanımlanmalı.

### 1.10 Veli — ROL-10
- **Yapılması gereken:** Veli girişte hangi ekranda karşılanacak belirlenmelidir (kendi çocuğunun özeti, devamsızlık, değerlendirme özeti, duyurular).
- **Yapılması gereken:** Veli portalı şablonu ve bilgi kısıtları (sadece kendi çocuğu) netleştirilmelidir.

### 1.11 Sporcu / Misafir Sporcu — ROL-11, ROL-12
- **Yapılması gereken:** Sporcu (ve misafir sporcu) girişte hangi ekranda karşılanacak tanımlanmalı (kendi programı, gelişim özeti, veliyle paylaşılan bilgilerin sınırı).
- **Yapılması gereken:** Sporcu portfolyo / özet ekranı şablonu tasarlanmalı.

---

## 2. ANTRENÖR VE ÇALIŞAN PORTFOLYO BİLGİSİ

### 2.1 Antrenör portfolyo ekranı
- **Yapılması gereken:** Antrenörün görüntüleyeceği veya yöneticinin antrenör için göreceği “portfolyo” ekranının içeriği listelenmeli:
  - **Kişisel bilgiler:** Ad, soyad, e-posta, telefon (users tablosu ile uyumlu).
  - **Staff bilgileri:** Ünvan, uzmanlık alanları (branşlar), sertifikalar, işe giriş/çıkış tarihi, maaş (yetkiye göre gizli), çalışma günleri, haftalık saat, performans puanı, durum.
  - **Atanan sporcular:** Hangi sporcular bu antrenöre atanmış (athletes.antrenor_id), sayı ve liste.
  - **Gruplar / program:** Hangi gruplarda çalışıyor, haftalık antrenman dağılımı (schedules ile ilişki).
  - **Değerlendirme özeti:** Son değerlendirmelerdeki katkı veya kendi grubunun özet puanları.
- **Yapılması gereken:** Bu ekranın tasarımı (sayfa düzeni, kartlar, tablolar) ve yetkilere göre hangi alanların gizleneceği belirlenmelidir.

### 2.2 Çalışan (personel) portfolyo ekranı
- **Yapılması gereken:** Antrenör dışındaki çalışanlar (Kayıt & Bilgilendirme, Temizlik, Yardımcı/Stajyer vb.) için de bir “çalışan portfolyo” ekranı tanımlanmalı:
  - **users + staff** bilgileri (ad, rol, iletişim, işe giriş/çıkış, maaş, çalışma günleri/saat, performans, durum).
  - İzinler, devamsızlık özeti (attendance ile ilişki).
- **Yapılması gereken:** Hangi rollerin hangi çalışanların portfolyosunu görebileceği (Tesis Müdürü, İK, Franchise Sahibi vb.) matris olarak yazılmalıdır.

### 2.3 Tesis müdürü için özet ekran
- **Yapılması gereken:** Tesis müdürünün “tesisimdeki çalışanlar / antrenörler” listesi ve kısa portfolyo özeti (ad, rol, durum, performans) şablonu hazırlanmalı.

---

## 3. İNSAN KAYNAKLARI (İK) — MAAŞ, AVANS, BORDRO VE İŞ KANUNU

### 3.1 Maaş ve bordro
- **Yapılması gereken:** Çalışanın kendi maaşını (ve gerekiyorsa bordro özetini) hangi ekrandan göreceğı tanımlanmalı; şablon ve yetki kuralları yazılmalı.
- **Yapılması gereken:** İK veya yetkili rollerin maaş/bordro listesini hangi ekrandan göreceği, hangi filtreleri (tesis, dönem, rol) kullanacağı belirlenmelidir.
- **Yapılması gereken:** staff.maas ve varsa bordro/ödeme tablolarıyla ilişkili ekranlar ve raporlar listelenmeli (mevcut şemada payments abonelik/ödeme için; personel maaş bordrosu ayrı modül olabilir).

### 3.2 Avans
- **Yapılması gereken:** Avans talebi, onay akışı ve kayıt yapısı tanımlanmalıdır (yeni tablo/alan ihtiyacı karar dokümanına yazılmalı).
- **Yapılması gereken:** Çalışanın “avans talebi oluşturma” ve “avans geçmişi görme” ekranlarının iş kuralları ve şablonları yazılmalıdır.
- **Yapılması gereken:** İK / Tesis Müdürü / Franchise Sahibi için “avans onaylama” ekranı ve yetki matrisi hazırlanmalıdır.

### 3.3 İş kanunu ve işveren–çalışan ilişkisi
- **Yapılması gereken:** İş Kanunu ve ilgili mevzuata göre sistemde **kayıt altına alınması gereken** konular listelenmeli. Örnek başlıklar:
  - İş sözleşmesi türü (belirsiz/belirli süreli, tam/yarı zamanlı vb.) ve saklama
  - İşe giriş/çıkış tarihleri, deneme süresi
  - Ücret (maaş, prim, ek ödemeler) ve ödeme dönemi
  - Çalışma süreleri, haftalık çalışma, fazla mesai
  - Yıllık izin, mazeret izni, rapor
  - Kıdem, ihbar, işe iade
  - İş sağlığı ve güvenliği eğitimleri, belgeler
  - Disiplin, savunma, ödül/ceza
- **Yapılması gereken:** Bu konulardan hangilerinin YİSA-S içinde hangi tablo/alanlarla karşılanacağı, hangilerinin evrak yönetimi/entegrasyonla çözüleceği bir “İş Kanunu uyum matrisi” olarak yazılmalıdır.
- **Yapılması gereken:** Çalışan tarafından görülecek “sözleşmem, ücretim, izinlerim, belgelerim” tipi sayfaların listesi ve erişim kuralları belirlenmelidir.
- **Yapılması gereken:** İşveren (Franchise Sahibi / Tesis Müdürü) tarafında “iş kanunu ile ilgili kayıtlar”ın hangi rapor ve ekranlarda toplanacağı tasarlanmalıdır.

### 3.4 İK (CHRO / İnsan Kaynakları) ekranları
- **Yapılması gereken:** CHRO veya İK rolünün karşılanacağı ana ekran ve menü tanımlanmalıdır.
- **Yapılması gereken:** İK’nın göreceği ekranlar listelenmeli:
  - Personel listesi, portfolyo, sözleşme/izin özeti
  - Maaş/bordro listesi ve özetleri
  - Avans talepleri ve onay ekranı
  - İşe alım/ayrılış, devamsızlık, disiplin kayıtları
  - İş kanunu uyum raporları / kontrol listesi
- **Yapılması gereken:** Bu ekranların şablonları, grafikleri ve filtreleri ayrı bir “İK ekran şartnamesi”nde toplanmalıdır.

---

## 4. İŞ KANUNU, İŞLETMECİ, ÇALIŞAN, İŞVEREN — KAYIT ALTINA ALINMASI GEREKEN TÜM KONULAR

Aşağıdaki başlıkların **sistemde kayıtlı olması gerektiği** kabul edilerek, hangi ekran/tablo/raporla karşılanacağı netleştirilmelidir. Kod yazılmadan, **yapılması gereken** işler olarak listelenmiştir.

### 4.1 Sözleşme ve işe giriş–çıkış
- **Yapılması gereken:** İş sözleşmesi türü, tarihi, deneme süresi, işe giriş/çıkış tarihleri için veri modeli ve ekranlar tanımlanmalı (staff ve gerekirse yeni tablolar).
- **Yapılması gereken:** Sözleşme belgesi saklama/yükleme ile ilgili kural ve ekran ihtiyacı yazılmalıdır.

### 4.2 Ücret, prim, ek ödeme, bordro
- **Yapılması gereken:** Brüt/net ücret, prim oranı, ek ödemeler, kesintiler için alan ve ekranlar listelenmeli.
- **Yapılması gereken:** Bordro özeti ve çalışanın kendi bordro görüntülemesi şablonu tanımlanmalıdır.

### 4.3 Çalışma süreleri ve izinler
- **Yapılması gereken:** Haftalık çalışma saati, çalışma günleri, fazla mesai kuralları ve kayıt yerleri belirlenmelidir (staff ve attendance ile ilişki).
- **Yapılması gereken:** Yıllık izin, mazeret izni, rapor girişi ve onay akışı için iş kuralları ve ekran ihtiyaçları yazılmalıdır.
- **Yapılması gereken:** Çalışanın “izin talebi” ve “izin bakiyem” ekranları tasarlanmalıdır.

### 4.4 Devamsızlık ve puantaj
- **Yapılması gereken:** attendance tablosu ile personel devamsızlığı ilişkisi netleştirilmelidir (şu an sporcu odaklı olabilir; çalışan için ayrı veya genişletilmiş kullanım kararı yazılmalı).
- **Yapılması gereken:** Giriş–çıkış saati, geç kalma, erken çıkış kuralları ve ekranları tanımlanmalıdır.

### 4.5 Disiplin, savunma, ödül–ceza
- **Yapılması gereken:** Disiplin kaydı, savunma metni, ödül/ceza türleri için veri modeli ve İK ekranları taslak olarak yazılmalıdır.
- **Yapılması gereken:** Çalışanın kendi disiplin geçmişini görme yetkisi (ve kısıtları) belirlenmelidir.

### 4.6 İş sağlığı ve güvenliği (İSG)
- **Yapılması gereken:** İSG eğitimleri, tarihler, belgeler için saklama yeri ve ekran ihtiyacı belirlenmelidir.
- **Yapılması gereken:** İşverenin “İSG uyum takip” ekranı veya raporu ihtiyacı yazılmalıdır.

### 4.7 Kıdem, ihbar, işe iade
- **Yapılması gereken:** Kıdem hesabı, ihbar süreleri ve işe iade süreçleri için hangi bilgilerin nerede tutulacağı karar dokümanına eklenmelidir.
- **Yapılması gereken:** İlgili ekran/rapor ihtiyaçları listelenmelidir.

### 4.8 İşveren ve işletmeci tarafı
- **Yapılması gereken:** Franchise sahibi / tesis müdürünün “işveren vekili” veya “yetkili” sıfatıyla hangi İK ekranlarına erişeceği, hangi onayları yapacağı matris halinde yazılmalıdır.
- **Yapılması gereken:** İşletme (tenant/tesis) bazında toplu İK raporları (personel sayısı, maaş özeti, izin/devamsızlık özeti) ihtiyaç listesine eklenmelidir.

---

## 5. ŞABLON, GRAFİK VE TASARIM İHTİYACI ÖZETİ

Aşağıdakiler **oluşturulması veya düzenlenmesi gereken** şablon, grafik ve tasarım işleridir.

### 5.1 Rol bazlı karşılama (ikram) ekranları
- **Yapılması gereken:** Her rol (ROL-1 … ROL-12) için en az bir karşılama ekranı şablonu ve içerik listesi.
- **Yapılması gereken:** Ortak bileşenler (hoş geldin metni, kısayol kartları, son aktiviteler) tasarım rehberinde tanımlanmalıdır.

### 5.2 Dashboard ve özet ekranları
- **Yapılması gereken:** Franchise Sahibi, Tesis Müdürü, Bölge Müdürü, Sportif Direktör için dashboard şablonları.
- **Yapılması gereken:** Kullanılacak grafik türleri (çubuk, pasta, çizgi, KPI kartları) ve hangi ekranda nerede kullanılacağı listelenmelidir.

### 5.3 Portfolyo ekranları
- **Yapılması gereken:** Antrenör portfolyo ekranı şablonu ve alan listesi.
- **Yapılması gereken:** Çalışan (genel personel) portfolyo ekranı şablonu ve alan listesi.
- **Yapılması gereken:** Sporcu portfolyo / veli görünümü şablonu (mevcut taslaklarla uyumlu hale getirilmelidir).

### 5.4 İK modülü ekranları
- **Yapılması gereken:** Maaş/bordro listesi ve detay ekranı tasarımı.
- **Yapılması gereken:** Avans talep ve onay ekranları tasarımı.
- **Yapılması gereken:** İzin talep, onay ve bakiye ekranları tasarımı.
- **Yapılması gereken:** Sözleşme/evrak yükleme ve listeleme ekranı tasarımı.
- **Yapılması gereken:** Disiplin/savunma kayıt ekranı tasarımı.
- **Yapılması gereken:** İK ana sayfa ve menü yapısı tasarımı.

### 5.5 Rapor ve dışa aktarma şablonları
- **Yapılması gereken:** Bordro özeti, personel listesi, izin/devamsızlık raporu için basılı/PDF/Excel şablonları ihtiyaç listesine eklenmelidir.
- **Yapılması gereken:** İş kanunu uyum kontrol listesi veya denetim raporu şablonu tanımlanmalıdır.

### 5.6 Yetki ve gizlilik
- **Yapılması gereken:** Hangi ekranda hangi alanın hangi role göre gizli/okunur/değiştirilebilir olduğu bir “ekran–alan–rol” matrisi olarak yazılmalıdır (özellikle maaş, avans, disiplin).
- **Yapılması gereken:** KVKK ve kişisel veri erişimi bu matrise göre gözden geçirilmelidir.

---

## 6. DİĞER YAPILMASI GEREKENLER

- **Yapılması gereken:** Bu dokümandaki her başlık için ayrı “ekran şartnamesi” veya “iş kuralı” dokümanı oluşturulması planlanmalıdır.
- **Yapılması gereken:** Şemada eksik olan İK alanları (avans, izin türleri, disiplin kaydı vb.) için veri modeli değişiklik taslağı çıkarılmalıdır.
- **Yapılması gereken:** Rol–ekran–ikram eşlemesi kodu yazılmadan önce, bu dokümanla uyumlu “Rol bazlı yönlendirme matrisi” (hangi rol girişte nereye düşecek) onaylanmış olmalıdır.
- **Yapılması gereken:** İş kanunu maddeleriyle sistemdeki kayıt/ekran eşlemesini özetleyen “İş Kanunu uyum checklist’i” ayrı bir dokümanda tutulmalıdır.

---

## 7. ÖZET ÇİZELGE — KİM HANGİ EKRANDA KARŞILANMALI (TANIMLANMASI GEREKEN)

| Rol | Rol kodu | Karşılanacağı ekran (tanımlanması gereken) | Portfolyo / özel ekran ihtiyacı |
|-----|----------|--------------------------------------------|----------------------------------|
| Alt Admin (Franchise Sahibi) | ROL-1 | Franchise özet dashboard | Tenant/şube/İK özeti |
| Tesis Müdürü | ROL-2 | Tesis özet dashboard | Tesis personel özeti, basit İK |
| Bölge Müdürü | ROL-3 | Bölge özet dashboard | Çok tesis özeti |
| Sportif Direktör | ROL-4 | Sporcu/antrenör/performans dashboard | Değerlendirme, PHV, branş raporları |
| Uzman Antrenör | ROL-5 | Antrenör panosu (kendi grubu) | Antrenör portfolyo |
| Antrenör | ROL-6 | Antrenör panosu (kendi grubu) | Antrenör portfolyo |
| Yardımcı/Stajyer | ROL-7 | Görevlerim / sınırlı menü | — |
| Kayıt & Bilgilendirme | ROL-8 | Kayıt/bilgilendirme ana ekranı | — |
| Temizlik | ROL-9 | Rol özel ekranı (tanım gerekir) | — |
| Veli | ROL-10 | Veli portalı — çocuğum | Sporcu özeti (veli görünümü) |
| Sporcu | ROL-11 | Sporcu portalı — benim programım | Sporcu portfolyo |
| Misafir Sporcu | ROL-12 | Sınırlı sporcu görünümü | — |
| İK / CHRO | (ayrı tanım) | İK ana sayfa, personel/bordro/izin/avans | Tüm İK ekranları |

---

**Sonuç:** Yukarıdaki tüm maddeler **yapılması, düzenlenmesi veya oluşturulması gereken** işler olarak belirtilmiştir. Kod yazımı bu belgeyle uyumlu şartname ve tasarımlar tamamlandıktan sonra yapılmalıdır.
