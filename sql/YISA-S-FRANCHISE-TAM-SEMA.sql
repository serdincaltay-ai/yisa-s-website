-- ═══════════════════════════════════════════════════════════════════════════════
-- YİSA-S FRANCHISE SİSTEMİ - TAM SUPABASE ŞEMASI
-- ═══════════════════════════════════════════════════════════════════════════════
-- Kurucu & Tek Yetkili: Serdinç ALTAY
-- Tarih: 28 Ocak 2025
-- Proje: bgtuqdkfppcjmtrdsldl
-- Kapasite: 200+ Franchise Desteği
-- ═══════════════════════════════════════════════════════════════════════════════
-- 
-- BU DOSYA İKİ BÖLÜMDEN OLUŞUR:
-- BÖLÜM A: MEVCUT 17 TABLO (Zaten hazır olan yapı)
-- BÖLÜM B: EKSİK 15 TABLO (Franchise operasyonları için gerekli)
-- 
-- TOPLAM: 32 TABLO + 8 ROBOT + 12 DİREKTÖRLÜK + 7 KURAL + 13 ROL
-- ═══════════════════════════════════════════════════════════════════════════════

-- UUID extension aktif et
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ═══════════════════════════════════════════════════════════════════════════════
-- BÖLÜM A: MEVCUT 17 TABLO
-- ═══════════════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────────────────────
-- A1. TENANTS (Franchise Sahipleri)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    kod VARCHAR(20) UNIQUE NOT NULL,
    isim VARCHAR(255) NOT NULL,
    sahip_adi VARCHAR(255) NOT NULL,
    sahip_telefon VARCHAR(20),
    sahip_email VARCHAR(255),
    adres TEXT,
    sehir VARCHAR(100),
    ilce VARCHAR(100),
    vergi_no VARCHAR(20),
    vergi_dairesi VARCHAR(100),
    sozlesme_baslangic DATE,
    sozlesme_bitis DATE,
    durum VARCHAR(20) DEFAULT 'aktif' CHECK (durum IN ('aktif', 'pasif', 'askida', 'iptal')),
    max_kullanici INTEGER DEFAULT 50,
    max_sporcu INTEGER DEFAULT 500,
    paket_id UUID, -- packages tablosuna FK (aşağıda ekleniyor)
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    guncelleme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    gizli BOOLEAN DEFAULT FALSE,
    meta_data JSONB DEFAULT '{}'::jsonb
);

COMMENT ON TABLE tenants IS 'Franchise sahipleri - 200+ tesis desteği';

-- ─────────────────────────────────────────────────────────────────────────────
-- A2. USERS (Kullanıcılar - PATRON HARİÇ)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
    auth_id UUID UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefon VARCHAR(20),
    ad VARCHAR(100) NOT NULL,
    soyad VARCHAR(100) NOT NULL,
    rol_kodu VARCHAR(10) NOT NULL DEFAULT 'ROL-12',
    rol_adi VARCHAR(50),
    avatar_url TEXT,
    son_giris TIMESTAMP WITH TIME ZONE,
    durum VARCHAR(20) DEFAULT 'aktif' CHECK (durum IN ('aktif', 'pasif', 'askida', 'engelli')),
    email_dogrulandi BOOLEAN DEFAULT FALSE,
    telefon_dogrulandi BOOLEAN DEFAULT FALSE,
    iki_faktorlu_auth BOOLEAN DEFAULT FALSE,
    tercihler JSONB DEFAULT '{}'::jsonb,
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    guncelleme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    gizli BOOLEAN DEFAULT FALSE,
    meta_data JSONB DEFAULT '{}'::jsonb,
    CONSTRAINT valid_rol_kodu CHECK (rol_kodu IN ('ROL-0','ROL-1','ROL-2','ROL-3','ROL-4','ROL-5','ROL-6','ROL-7','ROL-8','ROL-9','ROL-10','ROL-11','ROL-12'))
);

COMMENT ON TABLE users IS 'Tüm kullanıcılar - PATRON (Serdinç Altay) bu tabloda DEĞİL';

-- ─────────────────────────────────────────────────────────────────────────────
-- A3. ROBOTS (7 Ana Robot)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS robots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    kod VARCHAR(20) UNIQUE NOT NULL,
    isim VARCHAR(100) NOT NULL,
    aciklama TEXT,
    hiyerarsi_sirasi INTEGER NOT NULL CHECK (hiyerarsi_sirasi BETWEEN 1 AND 10),
    api_oncelik VARCHAR(20) DEFAULT 'claude',
    durum VARCHAR(20) DEFAULT 'aktif' CHECK (durum IN ('aktif', 'pasif', 'bakim')),
    yetenekler JSONB DEFAULT '[]'::jsonb,
    ayarlar JSONB DEFAULT '{}'::jsonb,
    son_aktif TIMESTAMP WITH TIME ZONE,
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    guncelleme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    meta_data JSONB DEFAULT '{}'::jsonb
);

COMMENT ON TABLE robots IS '8 Katmanlı Robot Hiyerarşisi (7 Ana + ROB-CURSOR Kurulum)';

-- ─────────────────────────────────────────────────────────────────────────────
-- A4. ROBOT_TASKS (Robot Görevleri)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS robot_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    robot_id UUID NOT NULL REFERENCES robots(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
    baslik VARCHAR(255) NOT NULL,
    aciklama TEXT,
    tip VARCHAR(50) NOT NULL,
    oncelik INTEGER DEFAULT 5 CHECK (oncelik BETWEEN 1 AND 10),
    durum VARCHAR(20) DEFAULT 'beklemede' CHECK (durum IN ('beklemede', 'islemde', 'tamamlandi', 'hata', 'iptal')),
    girdi JSONB DEFAULT '{}'::jsonb,
    cikti JSONB,
    hata_mesaji TEXT,
    baslama_zamani TIMESTAMP WITH TIME ZONE,
    bitis_zamani TIMESTAMP WITH TIME ZONE,
    olusturan_id UUID REFERENCES users(id) ON DELETE SET NULL,
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    guncelleme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    meta_data JSONB DEFAULT '{}'::jsonb
);

-- ─────────────────────────────────────────────────────────────────────────────
-- A5. CELF_DIRECTORATES (12 Direktörlük)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS celf_directorates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    kod VARCHAR(20) UNIQUE NOT NULL,
    isim VARCHAR(100) NOT NULL,
    tam_isim VARCHAR(255) NOT NULL,
    aciklama TEXT,
    sorumluluk_alanlari JSONB DEFAULT '[]'::jsonb,
    ana_robot_id UUID REFERENCES robots(id) ON DELETE SET NULL,
    durum VARCHAR(20) DEFAULT 'aktif' CHECK (durum IN ('aktif', 'pasif')),
    sira INTEGER,
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    guncelleme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    meta_data JSONB DEFAULT '{}'::jsonb
);

-- ─────────────────────────────────────────────────────────────────────────────
-- A6. CONVERSATIONS (Sohbet Oturumları)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
    kullanici_id UUID REFERENCES users(id) ON DELETE SET NULL,
    robot_id UUID REFERENCES robots(id) ON DELETE SET NULL,
    baslik VARCHAR(255),
    ozet TEXT,
    durum VARCHAR(20) DEFAULT 'aktif' CHECK (durum IN ('aktif', 'kapali', 'arsivlendi')),
    mesaj_sayisi INTEGER DEFAULT 0,
    son_mesaj_zamani TIMESTAMP WITH TIME ZONE,
    baslangic_zamani TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    bitis_zamani TIMESTAMP WITH TIME ZONE,
    etiketler JSONB DEFAULT '[]'::jsonb,
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    guncelleme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    gizli BOOLEAN DEFAULT FALSE,
    meta_data JSONB DEFAULT '{}'::jsonb
);

-- ─────────────────────────────────────────────────────────────────────────────
-- A7. MESSAGES (Sohbet Mesajları)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    gonderen_tipi VARCHAR(20) NOT NULL CHECK (gonderen_tipi IN ('kullanici', 'robot', 'sistem', 'patron')),
    gonderen_id UUID,
    robot_id UUID REFERENCES robots(id) ON DELETE SET NULL,
    icerik TEXT NOT NULL,
    icerik_tipi VARCHAR(20) DEFAULT 'metin' CHECK (icerik_tipi IN ('metin', 'gorsel', 'dosya', 'ses', 'komut')),
    yanit_suresi_ms INTEGER,
    token_kullanimi JSONB,
    api_kullanilan VARCHAR(20),
    durum VARCHAR(20) DEFAULT 'gonderildi' CHECK (durum IN ('gonderildi', 'iletildi', 'okundu', 'hata')),
    hata_mesaji TEXT,
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    guncelleme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    gizli BOOLEAN DEFAULT FALSE,
    meta_data JSONB DEFAULT '{}'::jsonb
);

-- ─────────────────────────────────────────────────────────────────────────────
-- A8. ATHLETES (Sporcular) - KURAL 3: Çocuk ham verisi korumalı
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS athletes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    sporcu_no VARCHAR(20) UNIQUE NOT NULL,
    ad VARCHAR(100) NOT NULL,
    soyad VARCHAR(100) NOT NULL,
    dogum_tarihi DATE NOT NULL,
    cinsiyet VARCHAR(10) CHECK (cinsiyet IN ('erkek', 'kadin')),
    boy_cm DECIMAL(5,2),
    kilo_kg DECIMAL(5,2),
    kan_grubu VARCHAR(5),
    adres TEXT,
    
    -- Veli Bilgileri
    veli_ad VARCHAR(100),
    veli_soyad VARCHAR(100),
    veli_telefon VARCHAR(20),
    veli_email VARCHAR(255),
    veli_iliski VARCHAR(50),
    
    -- Spor Bilgileri
    brans_id UUID, -- sports_branches tablosuna FK
    seviye VARCHAR(20) DEFAULT 'baslangic' CHECK (seviye IN ('baslangic', 'orta', 'ileri', 'profesyonel', 'elit')),
    grup VARCHAR(50),
    antrenor_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- Kayıt Bilgileri
    kayit_tarihi DATE DEFAULT CURRENT_DATE,
    aktif_mi BOOLEAN DEFAULT TRUE,
    durum VARCHAR(20) DEFAULT 'aktif' CHECK (durum IN ('aktif', 'pasif', 'mezun', 'transfer', 'askida')),
    
    -- Sağlık & İzinler
    saglik_raporu_var BOOLEAN DEFAULT FALSE,
    saglik_raporu_tarihi DATE,
    fotograf_izni BOOLEAN DEFAULT FALSE,
    video_izni BOOLEAN DEFAULT FALSE,
    
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    guncelleme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    gizli BOOLEAN DEFAULT FALSE,
    meta_data JSONB DEFAULT '{}'::jsonb
);

-- ─────────────────────────────────────────────────────────────────────────────
-- A9. EVALUATIONS (Sporcu Değerlendirmeleri)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS evaluations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    sporcu_id UUID NOT NULL REFERENCES athletes(id) ON DELETE CASCADE,
    degerlendiren_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    degerlendirme_tarihi DATE NOT NULL DEFAULT CURRENT_DATE,
    degerlendirme_tipi VARCHAR(50) NOT NULL CHECK (degerlendirme_tipi IN ('giris', 'aylik', 'ceyreklik', 'yillik', 'ozel', 'musabaka', '900_alan')),
    donem VARCHAR(50),
    
    -- Puanlar (1-10)
    teknik_puan DECIMAL(3,1) CHECK (teknik_puan BETWEEN 0 AND 10),
    fiziksel_puan DECIMAL(3,1) CHECK (fiziksel_puan BETWEEN 0 AND 10),
    mental_puan DECIMAL(3,1) CHECK (mental_puan BETWEEN 0 AND 10),
    esneklik_puan DECIMAL(3,1) CHECK (esneklik_puan BETWEEN 0 AND 10),
    kuvvet_puan DECIMAL(3,1) CHECK (kuvvet_puan BETWEEN 0 AND 10),
    koordinasyon_puan DECIMAL(3,1) CHECK (koordinasyon_puan BETWEEN 0 AND 10),
    genel_puan DECIMAL(3,1) CHECK (genel_puan BETWEEN 0 AND 10),
    
    -- 900 Alan Değerlendirmesi (30x30 matris referansı)
    alan_900_id UUID, -- evaluation_900_areas tablosuna FK
    
    guclu_yonler TEXT,
    gelistirilecek_yonler TEXT,
    hedefler TEXT,
    notlar TEXT,
    
    onceki_degerlendirme_id UUID REFERENCES evaluations(id),
    ilerleme_yuzdesi DECIMAL(5,2),
    
    durum VARCHAR(20) DEFAULT 'taslak' CHECK (durum IN ('taslak', 'onaylandi', 'paylasildi')),
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    guncelleme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    gizli BOOLEAN DEFAULT FALSE,
    meta_data JSONB DEFAULT '{}'::jsonb
);

-- ─────────────────────────────────────────────────────────────────────────────
-- A10. SCHEDULES (Ders Programları)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    
    isim VARCHAR(100) NOT NULL,
    aciklama TEXT,
    grup VARCHAR(50),
    seviye VARCHAR(20),
    antrenor_id UUID REFERENCES users(id) ON DELETE SET NULL,
    brans_id UUID, -- sports_branches FK
    
    gun VARCHAR(10) NOT NULL CHECK (gun IN ('pazartesi', 'sali', 'carsamba', 'persembe', 'cuma', 'cumartesi', 'pazar')),
    baslangic_saati TIME NOT NULL,
    bitis_saati TIME NOT NULL,
    
    kontenjan INTEGER DEFAULT 20,
    kayitli_sayisi INTEGER DEFAULT 0,
    
    gecerlilik_baslangic DATE,
    gecerlilik_bitis DATE,
    aktif_mi BOOLEAN DEFAULT TRUE,
    
    salon VARCHAR(100),
    notlar TEXT,
    
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    guncelleme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    gizli BOOLEAN DEFAULT FALSE,
    meta_data JSONB DEFAULT '{}'::jsonb,
    
    CONSTRAINT valid_saat CHECK (bitis_saati > baslangic_saati)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- A11. ATTENDANCE (Yoklama)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    schedule_id UUID REFERENCES schedules(id) ON DELETE SET NULL,
    sporcu_id UUID NOT NULL REFERENCES athletes(id) ON DELETE CASCADE,
    
    tarih DATE NOT NULL DEFAULT CURRENT_DATE,
    durum VARCHAR(20) NOT NULL CHECK (durum IN ('geldi', 'gelmedi', 'izinli', 'hasta', 'gecikti')),
    giris_saati TIME,
    cikis_saati TIME,
    
    kaydeden_id UUID REFERENCES users(id) ON DELETE SET NULL,
    notlar TEXT,
    
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    guncelleme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    meta_data JSONB DEFAULT '{}'::jsonb,
    
    UNIQUE(sporcu_id, tarih, schedule_id)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- A12. PAYMENTS (Ödemeler)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    sporcu_id UUID REFERENCES athletes(id) ON DELETE SET NULL,
    subscription_id UUID, -- subscriptions FK
    
    odeme_no VARCHAR(30) UNIQUE NOT NULL,
    tutar DECIMAL(10,2) NOT NULL,
    para_birimi VARCHAR(5) DEFAULT 'TRY',
    kdv_orani DECIMAL(4,2) DEFAULT 0,
    kdv_tutari DECIMAL(10,2) DEFAULT 0,
    toplam_tutar DECIMAL(10,2) NOT NULL,
    
    odeme_tipi VARCHAR(30) NOT NULL CHECK (odeme_tipi IN ('aylik', 'yillik', 'tek_seferlik', 'kayit', 'musabaka', 'ekipman', 'kamp', 'franchise_giris', 'franchise_aylik', 'diger')),
    odeme_yontemi VARCHAR(30) CHECK (odeme_yontemi IN ('nakit', 'kredi_karti', 'havale', 'eft', 'otomatik_odeme')),
    
    donem_baslangic DATE,
    donem_bitis DATE,
    vade_tarihi DATE,
    odeme_tarihi DATE,
    
    durum VARCHAR(20) DEFAULT 'beklemede' CHECK (durum IN ('beklemede', 'odendi', 'gecikti', 'iptal', 'iade')),
    
    fatura_no VARCHAR(50),
    fatura_kesildi BOOLEAN DEFAULT FALSE,
    fatura_tarihi DATE,
    
    kaydeden_id UUID REFERENCES users(id) ON DELETE SET NULL,
    notlar TEXT,
    
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    guncelleme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    gizli BOOLEAN DEFAULT FALSE,
    meta_data JSONB DEFAULT '{}'::jsonb
);

-- ─────────────────────────────────────────────────────────────────────────────
-- A13. SECURITY_ALERTS (Güvenlik Alarmları) - KURAL 6
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS security_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
    
    alarm_kodu VARCHAR(20) NOT NULL,
    alarm_tipi VARCHAR(50) NOT NULL CHECK (alarm_tipi IN (
        'yetkisiz_erisim', 'anormal_aktivite', 'veri_sizintisi_suphesi',
        'brute_force', 'sql_injection', 'xss_denemesi', 'oturum_calmasi',
        'coklu_basarisiz_giris', 'ip_engellendi', 'bypass_denemesi',
        'sistem_manipulasyonu', 'diger'
    )),
    
    onem_seviyesi VARCHAR(20) NOT NULL DEFAULT 'orta' CHECK (onem_seviyesi IN ('dusuk', 'orta', 'yuksek', 'kritik')),
    
    baslik VARCHAR(255) NOT NULL,
    aciklama TEXT,
    kaynak_ip VARCHAR(45),
    hedef_kaynak VARCHAR(255),
    kullanici_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    durum VARCHAR(20) DEFAULT 'yeni' CHECK (durum IN ('yeni', 'inceleniyor', 'cozuldu', 'yalanci_alarm', 'eskalasyon')),
    atanan_robot_id UUID REFERENCES robots(id) ON DELETE SET NULL,
    otomatik_aksiyon TEXT,
    manuel_aksiyon TEXT,
    cozum_tarihi TIMESTAMP WITH TIME ZONE,
    cozum_notu TEXT,
    
    tespit_zamani TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    guncelleme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    ham_log JSONB,
    meta_data JSONB DEFAULT '{}'::jsonb
);

-- ─────────────────────────────────────────────────────────────────────────────
-- A14. AUDIT_LOGS (Denetim Logları) - KURAL 5: SİLİNEMEZ
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    islem_tipi VARCHAR(50) NOT NULL CHECK (islem_tipi IN (
        'INSERT', 'UPDATE', 'DELETE', 'SELECT',
        'LOGIN', 'LOGOUT', 'FAILED_LOGIN',
        'PERMISSION_CHANGE', 'SETTING_CHANGE',
        'EXPORT', 'IMPORT', 'BACKUP',
        'ROBOT_ACTION', 'PATRON_COMMAND',
        'SECURITY_EVENT', 'ERROR', 'DIGER'
    )),
    
    tablo_adi VARCHAR(100),
    kayit_id UUID,
    tenant_id UUID,
    kullanici_id UUID,
    robot_id UUID,
    
    aciklama TEXT NOT NULL,
    eski_deger JSONB,
    yeni_deger JSONB,
    degisiklikler JSONB,
    
    ip_adresi VARCHAR(45),
    user_agent TEXT,
    oturum_id VARCHAR(100),
    istek_id VARCHAR(100),
    
    islem_zamani TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    meta_data JSONB DEFAULT '{}'::jsonb
);

-- ─────────────────────────────────────────────────────────────────────────────
-- A15. PATRON_COMMANDS (Patron Komut Kuyruğu)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS patron_commands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    komut_kodu VARCHAR(50) NOT NULL,
    komut_metni TEXT NOT NULL,
    oncelik INTEGER DEFAULT 10 CHECK (oncelik BETWEEN 1 AND 10),
    
    hedef_robot_id UUID REFERENCES robots(id) ON DELETE SET NULL,
    hedef_tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
    hedef_kullanici_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    parametreler JSONB DEFAULT '{}'::jsonb,
    
    durum VARCHAR(20) DEFAULT 'beklemede' CHECK (durum IN ('beklemede', 'islemde', 'tamamlandi', 'hata', 'iptal')),
    
    sonuc JSONB,
    hata_mesaji TEXT,
    islem_baslangic TIMESTAMP WITH TIME ZONE,
    islem_bitis TIMESTAMP WITH TIME ZONE,
    
    dogrulama_kodu VARCHAR(100),
    ip_adresi VARCHAR(45),
    
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    guncelleme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    meta_data JSONB DEFAULT '{}'::jsonb
);

-- ─────────────────────────────────────────────────────────────────────────────
-- A16. ROLE_PERMISSIONS (Rol Yetkileri)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS role_permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    rol_kodu VARCHAR(10) NOT NULL UNIQUE,
    rol_adi VARCHAR(100) NOT NULL,
    rol_aciklama TEXT,
    hiyerarsi_seviyesi INTEGER NOT NULL CHECK (hiyerarsi_seviyesi BETWEEN 0 AND 12),
    
    yetkiler JSONB NOT NULL DEFAULT '{
        "dashboard": {"gorme": false, "duzenleme": false},
        "sporcular": {"gorme": false, "ekleme": false, "duzenleme": false, "silme": false},
        "odemeler": {"gorme": false, "ekleme": false, "duzenleme": false, "silme": false},
        "raporlar": {"gorme": false, "olusturma": false, "indirme": false},
        "ayarlar": {"gorme": false, "duzenleme": false},
        "kullanicilar": {"gorme": false, "ekleme": false, "duzenleme": false, "silme": false},
        "robot_yonetimi": {"gorme": false, "kullanma": false, "yapilandirma": false},
        "guvenlik": {"gorme": false, "duzenleme": false},
        "denetim": {"gorme": false}
    }'::jsonb,
    
    kendi_verisi_sadece BOOLEAN DEFAULT TRUE,
    tenant_verisi_erisim BOOLEAN DEFAULT FALSE,
    tum_tenant_erisim BOOLEAN DEFAULT FALSE,
    
    api_erisim BOOLEAN DEFAULT FALSE,
    mobil_erisim BOOLEAN DEFAULT TRUE,
    disa_aktarma BOOLEAN DEFAULT FALSE,
    toplu_islem BOOLEAN DEFAULT FALSE,
    
    aktif BOOLEAN DEFAULT TRUE,
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    guncelleme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    meta_data JSONB DEFAULT '{}'::jsonb
);

-- ─────────────────────────────────────────────────────────────────────────────
-- A17. CORE_RULES (7 Çekirdek Kural - KİLİTLİ)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS core_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    kural_no INTEGER UNIQUE NOT NULL CHECK (kural_no BETWEEN 1 AND 7),
    kural_kodu VARCHAR(20) UNIQUE NOT NULL,
    baslik VARCHAR(255) NOT NULL,
    aciklama TEXT NOT NULL,
    
    uygulama_detay TEXT,
    kontrol_sql TEXT,
    
    aktif BOOLEAN DEFAULT TRUE,
    kilitli BOOLEAN DEFAULT TRUE,
    
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    meta_data JSONB DEFAULT '{}'::jsonb
);

-- ═══════════════════════════════════════════════════════════════════════════════
-- BÖLÜM B: EKSİK 15 TABLO (Franchise Operasyonları)
-- ═══════════════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────────────────────
-- B1. SPORTS_BRANCHES (10 Branş)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sports_branches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    kod VARCHAR(20) UNIQUE NOT NULL,
    isim VARCHAR(100) NOT NULL,
    aciklama TEXT,
    kategori VARCHAR(50), -- jimnastik, fitness, genel
    aktif BOOLEAN DEFAULT TRUE,
    sira INTEGER,
    
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    guncelleme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    meta_data JSONB DEFAULT '{}'::jsonb
);

COMMENT ON TABLE sports_branches IS '10 Branş: Artistik/Ritmik Jimnastik, Trampolin, Aerobik, Akrobatik, Parkur, TeamGym, Tumbling, Fitness, Genel Spor';

-- ─────────────────────────────────────────────────────────────────────────────
-- B2. PACKAGES (Paketler - Starter, Professional, Enterprise, Franchise)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    kod VARCHAR(20) UNIQUE NOT NULL,
    isim VARCHAR(100) NOT NULL,
    aciklama TEXT,
    
    aylik_ucret DECIMAL(10,2) NOT NULL,
    giris_ucreti DECIMAL(10,2) DEFAULT 0,
    para_birimi VARCHAR(5) DEFAULT 'TRY',
    
    max_sporcu INTEGER,
    max_kullanici INTEGER,
    max_antrenor INTEGER,
    
    ozellikler JSONB DEFAULT '[]'::jsonb, -- AI motorları, 900 alan, PHV vb.
    ai_motor_limitleri JSONB DEFAULT '{}'::jsonb,
    
    bolgesel_tekel BOOLEAN DEFAULT FALSE,
    
    aktif BOOLEAN DEFAULT TRUE,
    sira INTEGER,
    
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    guncelleme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    meta_data JSONB DEFAULT '{}'::jsonb
);

COMMENT ON TABLE packages IS 'Starter (₺2.500), Professional (₺7.500), Enterprise (₺15.000), Franchise (₺50.000 giriş + ₺15.000/ay)';

-- ─────────────────────────────────────────────────────────────────────────────
-- B3. SUBSCRIPTIONS (Abonelikler)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    package_id UUID NOT NULL REFERENCES packages(id) ON DELETE RESTRICT,
    
    baslangic_tarihi DATE NOT NULL,
    bitis_tarihi DATE,
    otomatik_yenileme BOOLEAN DEFAULT TRUE,
    
    durum VARCHAR(20) DEFAULT 'aktif' CHECK (durum IN ('aktif', 'pasif', 'askida', 'iptal', 'deneme')),
    
    indirim_yuzdesi DECIMAL(5,2) DEFAULT 0,
    ozel_fiyat DECIMAL(10,2),
    
    notlar TEXT,
    
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    guncelleme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    meta_data JSONB DEFAULT '{}'::jsonb
);

-- ─────────────────────────────────────────────────────────────────────────────
-- B4. FRANCHISE_AGREEMENTS (Franchise Sözleşmeleri)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS franchise_agreements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    
    sozlesme_no VARCHAR(30) UNIQUE NOT NULL,
    sozlesme_tipi VARCHAR(30) DEFAULT 'standart' CHECK (sozlesme_tipi IN ('standart', 'master', 'bolgesel', 'pilot')),
    
    baslangic_tarihi DATE NOT NULL,
    bitis_tarihi DATE NOT NULL,
    otomatik_yenileme BOOLEAN DEFAULT TRUE,
    
    giris_ucreti DECIMAL(10,2) NOT NULL,
    aylik_ucret DECIMAL(10,2) NOT NULL,
    royalty_orani DECIMAL(5,2) DEFAULT 0,
    
    bolge_il VARCHAR(100),
    bolge_ilce VARCHAR(100),
    bolgesel_tekel BOOLEAN DEFAULT FALSE,
    
    durum VARCHAR(20) DEFAULT 'aktif' CHECK (durum IN ('aktif', 'askida', 'sonlandirildi', 'iptal')),
    
    sozlesme_dosya_url TEXT,
    imza_tarihi DATE,
    
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    guncelleme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    meta_data JSONB DEFAULT '{}'::jsonb
);

-- ─────────────────────────────────────────────────────────────────────────────
-- B5. FRANCHISE_TERRITORIES (Franchise Bölgeleri)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS franchise_territories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    agreement_id UUID REFERENCES franchise_agreements(id) ON DELETE SET NULL,
    
    il VARCHAR(100) NOT NULL,
    ilce VARCHAR(100),
    mahalle VARCHAR(100),
    
    tekel BOOLEAN DEFAULT FALSE,
    baslangic_tarihi DATE,
    bitis_tarihi DATE,
    
    nufus_tahmini INTEGER,
    hedef_sporcu INTEGER,
    
    durum VARCHAR(20) DEFAULT 'aktif' CHECK (durum IN ('aktif', 'pasif', 'iptal')),
    
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    guncelleme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    meta_data JSONB DEFAULT '{}'::jsonb,
    
    UNIQUE(il, ilce, mahalle)
);

-- ─────────────────────────────────────────────────────────────────────────────
-- B6. STAFF (Personel/Antrenör Detayları)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS staff (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    
    unvan VARCHAR(100),
    uzmanlik_alanlari JSONB DEFAULT '[]'::jsonb, -- branşlar
    sertifikalar JSONB DEFAULT '[]'::jsonb,
    
    ise_giris_tarihi DATE,
    isten_cikis_tarihi DATE,
    
    maas DECIMAL(10,2),
    prim_orani DECIMAL(5,2) DEFAULT 0,
    
    calisma_gunleri JSONB DEFAULT '[]'::jsonb, -- ["pazartesi", "sali", ...]
    haftalik_saat INTEGER,
    
    performans_puani DECIMAL(3,1),
    
    durum VARCHAR(20) DEFAULT 'aktif' CHECK (durum IN ('aktif', 'izinli', 'pasif', 'ayrildi')),
    
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    guncelleme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    meta_data JSONB DEFAULT '{}'::jsonb
);

-- ─────────────────────────────────────────────────────────────────────────────
-- B7. PHV_MEASUREMENTS (PHV Ölçümleri - Büyüme Plağı Koruması)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS phv_measurements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sporcu_id UUID NOT NULL REFERENCES athletes(id) ON DELETE CASCADE,
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    
    olcum_tarihi DATE NOT NULL,
    
    boy_cm DECIMAL(5,2) NOT NULL,
    kilo_kg DECIMAL(5,2),
    oturma_boyu_cm DECIMAL(5,2),
    bacak_boyu_cm DECIMAL(5,2),
    
    -- Hesaplanan değerler
    phv_tahmini_yas DECIMAL(4,2), -- Peak Height Velocity yaşı
    buyume_hizi_cm_yil DECIMAL(4,2),
    olgunluk_ofseti DECIMAL(4,2),
    
    -- Risk değerlendirmesi
    sakatlık_riski VARCHAR(20) CHECK (sakatlık_riski IN ('dusuk', 'orta', 'yuksek', 'kritik')),
    antrenman_onerileri TEXT,
    
    olcen_id UUID REFERENCES users(id) ON DELETE SET NULL,
    notlar TEXT,
    
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    guncelleme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    meta_data JSONB DEFAULT '{}'::jsonb
);

COMMENT ON TABLE phv_measurements IS 'PHV: Peak Height Velocity - Büyüme plağı koruması ve sakatlık önleme';

-- ─────────────────────────────────────────────────────────────────────────────
-- B8. EVALUATION_900_AREAS (900 Alan Değerlendirmesi - 30x30 Matris)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS evaluation_900_areas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    evaluation_id UUID NOT NULL REFERENCES evaluations(id) ON DELETE CASCADE,
    sporcu_id UUID NOT NULL REFERENCES athletes(id) ON DELETE CASCADE,
    
    -- 30 Ana Kategori x 30 Alt Alan = 900 Alan
    kategori_no INTEGER NOT NULL CHECK (kategori_no BETWEEN 1 AND 30),
    kategori_adi VARCHAR(100) NOT NULL,
    
    alt_alan_no INTEGER NOT NULL CHECK (alt_alan_no BETWEEN 1 AND 30),
    alt_alan_adi VARCHAR(100) NOT NULL,
    
    puan DECIMAL(3,1) CHECK (puan BETWEEN 0 AND 10),
    not TEXT,
    
    ai_analiz JSONB, -- 6 AI motoru analiz sonuçları
    
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    guncelleme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(evaluation_id, kategori_no, alt_alan_no)
);

COMMENT ON TABLE evaluation_900_areas IS '900 alanlı değerlendirme: 30 ana kategori × 30 alt alan';

-- ─────────────────────────────────────────────────────────────────────────────
-- B9. AI_USAGE_LOGS (6 AI Motor Kullanım Logları)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ai_usage_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
    robot_id UUID REFERENCES robots(id) ON DELETE SET NULL,
    kullanici_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    ai_motor VARCHAR(20) NOT NULL CHECK (ai_motor IN ('claude', 'gpt', 'gemini', 'llama', 'together', 'ollama')),
    model_versiyon VARCHAR(50),
    
    islem_tipi VARCHAR(50), -- analiz, sohbet, degerlendirme, rapor
    
    input_token INTEGER,
    output_token INTEGER,
    toplam_token INTEGER,
    
    islem_suresi_ms INTEGER,
    maliyet_usd DECIMAL(10,6),
    
    basarili BOOLEAN DEFAULT TRUE,
    hata_mesaji TEXT,
    
    istek_ozeti TEXT,
    yanit_ozeti TEXT,
    
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    meta_data JSONB DEFAULT '{}'::jsonb
);

COMMENT ON TABLE ai_usage_logs IS '6 AI Motoru: Claude (derin analiz), GPT (hızlı iletişim), Gemini (görsel), LLaMA (hassas veri), Together (ekonomik), Ollama (lokal)';

-- ─────────────────────────────────────────────────────────────────────────────
-- B10. CRM_LEAD_STAGES (Misafir/Lider Seviyeleri - C, E, O, J-A-O)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS crm_lead_stages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    kod VARCHAR(10) NOT NULL UNIQUE,
    isim_tr VARCHAR(50) NOT NULL,
    isim_en VARCHAR(50),
    sira INTEGER NOT NULL DEFAULT 0,
    aciklama TEXT,
    
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE crm_lead_stages IS 'CRM aşamaları: C (Contact), E (Evaluation), O (Opportunity), J-A-O (Özel seviye)';

-- ─────────────────────────────────────────────────────────────────────────────
-- B11. CRM_CONTACTS (CRM Kişileri)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS crm_contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
    lead_stage_id UUID REFERENCES crm_lead_stages(id) ON DELETE SET NULL,
    
    email VARCHAR(255) NOT NULL,
    ad VARCHAR(100),
    soyad VARCHAR(100),
    telefon VARCHAR(20),
    sirket_adi VARCHAR(255),
    
    kaynak_tipi VARCHAR(20) NOT NULL CHECK (kaynak_tipi IN ('demo', 'franchise', 'iletisim', 'newsletter', 'chat', 'diger')),
    kaynak_id UUID,
    kaynak_tablo VARCHAR(50),
    
    atanan_kullanici_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    guncelleme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    meta_data JSONB DEFAULT '{}'::jsonb
);

-- ─────────────────────────────────────────────────────────────────────────────
-- B12. CRM_ACTIVITIES (CRM Aktiviteleri)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS crm_activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contact_id UUID NOT NULL REFERENCES crm_contacts(id) ON DELETE CASCADE,
    
    aktivite_tipi VARCHAR(30) NOT NULL CHECK (aktivite_tipi IN ('chat', 'demo_talep', 'franchise_basvuru', 'iletisim', 'newsletter', 'arama', 'toplanti', 'not')),
    
    kaynak_tablo VARCHAR(50),
    kaynak_id UUID,
    
    baslik VARCHAR(255),
    icerik TEXT,
    
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    meta_data JSONB DEFAULT '{}'::jsonb
);

-- ─────────────────────────────────────────────────────────────────────────────
-- B13. DEMO_REQUESTS (Demo Talepleri)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS demo_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    ad VARCHAR(100) NOT NULL,
    soyad VARCHAR(100),
    email VARCHAR(255) NOT NULL,
    telefon VARCHAR(20),
    sirket_adi VARCHAR(255),
    
    sporcu_sayisi INTEGER,
    ilgilendigi_paket VARCHAR(50),
    mesaj TEXT,
    
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    
    durum VARCHAR(20) DEFAULT 'yeni' CHECK (durum IN ('yeni', 'iletisimde', 'demo_yapildi', 'donustu', 'iptal')),
    
    crm_contact_id UUID REFERENCES crm_contacts(id) ON DELETE SET NULL,
    
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    guncelleme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- B14. FRANCHISE_APPLICATIONS (Franchise Başvuruları)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS franchise_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    ad VARCHAR(100) NOT NULL,
    soyad VARCHAR(100),
    email VARCHAR(255) NOT NULL,
    telefon VARCHAR(20) NOT NULL,
    
    il VARCHAR(100) NOT NULL,
    ilce VARCHAR(100),
    
    deneyim TEXT,
    yatirim_butcesi VARCHAR(50),
    motivasyon TEXT,
    
    durum VARCHAR(20) DEFAULT 'yeni' CHECK (durum IN ('yeni', 'inceleniyor', 'gorusme', 'onaylandi', 'reddedildi')),
    
    crm_contact_id UUID REFERENCES crm_contacts(id) ON DELETE SET NULL,
    
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    guncelleme_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- B15. ROBOT_CHAT_LOGS (NeebChat Logları - Vitrin Robotu)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS robot_chat_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    session_id VARCHAR(100) NOT NULL,
    tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
    
    robot_id UUID REFERENCES robots(id) ON DELETE SET NULL,
    
    kullanici_mesaji TEXT NOT NULL,
    robot_yaniti TEXT NOT NULL,
    
    ai_motor VARCHAR(20) DEFAULT 'claude',
    token_kullanimi INTEGER,
    yanit_suresi_ms INTEGER,
    
    sayfa_url TEXT,
    context VARCHAR(50) DEFAULT 'website',
    
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    
    onerilen_aksiyonlar JSONB DEFAULT '[]'::jsonb,
    alinan_aksiyon VARCHAR(50),
    lead_donustu BOOLEAN DEFAULT FALSE,
    
    ip_hash VARCHAR(64),
    user_agent TEXT,
    
    olusturma_tarihi TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE robot_chat_logs IS 'NeebChat (Vitrin Robotu) konuşma logları';

-- ═══════════════════════════════════════════════════════════════════════════════
-- BÖLÜM C: FK BAĞLANTILARI VE EK KOLONLAR
-- ═══════════════════════════════════════════════════════════════════════════════

-- Tenants -> Packages FK
ALTER TABLE tenants ADD CONSTRAINT fk_tenants_paket 
    FOREIGN KEY (paket_id) REFERENCES packages(id) ON DELETE SET NULL;

-- Athletes -> Sports Branches FK
ALTER TABLE athletes ADD CONSTRAINT fk_athletes_brans 
    FOREIGN KEY (brans_id) REFERENCES sports_branches(id) ON DELETE SET NULL;

-- Schedules -> Sports Branches FK
ALTER TABLE schedules ADD CONSTRAINT fk_schedules_brans 
    FOREIGN KEY (brans_id) REFERENCES sports_branches(id) ON DELETE SET NULL;

-- Evaluations -> 900 Areas FK
ALTER TABLE evaluations ADD CONSTRAINT fk_evaluations_900alan 
    FOREIGN KEY (alan_900_id) REFERENCES evaluation_900_areas(id) ON DELETE SET NULL;

-- Payments -> Subscriptions FK
ALTER TABLE payments ADD CONSTRAINT fk_payments_subscription 
    FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE SET NULL;

-- ═══════════════════════════════════════════════════════════════════════════════
-- BÖLÜM D: BAŞLANGIÇ VERİLERİ
-- ═══════════════════════════════════════════════════════════════════════════════

-- 8 Robot (7 + ROB-CURSOR)
INSERT INTO robots (kod, isim, aciklama, hiyerarsi_sirasi, api_oncelik, yetenekler) VALUES
('ROB-PATRON', 'Patron Asistan Robotu', 'Serdinç Altay''ın kişisel asistanı', 1, 'claude', '["patron_komutlari","sistem_yonetimi","tum_erisim"]'::jsonb),
('ROB-SIBER', 'Siber Güvenlik Robotu', 'Gatekeeper - Güvenlik olayları', 2, 'claude', '["tehdit_tespiti","erisim_kontrolu","log_analizi"]'::jsonb),
('ROB-ARSIV', 'Veri Arşivleme Robotu', 'Yedekleme ve arşivleme', 3, 'claude', '["yedekleme","arsivleme","geri_yukleme"]'::jsonb),
('ROB-CEO', 'CEO Organizatör Robotu', 'Stratejik karar destek', 4, 'claude', '["strateji_analizi","karar_destek","ust_duzey_rapor"]'::jsonb),
('ROB-CELF', 'YİSA-S CELF Merkez Robotu', '12 Direktörlük yönetimi', 5, 'claude', '["direktorluk_yonetimi","koordinasyon","is_sureci"]'::jsonb),
('ROB-COO', 'COO Organizatör Robotu', 'Günlük operasyonlar', 6, 'claude', '["operasyon_yonetimi","personel_koordinasyon","is_akisi"]'::jsonb),
('ROB-VITRIN', 'YİSA-S Vitrin Robotu (NeebChat)', 'Müşteri arayüzü chatbot', 7, 'gpt', '["musteri_hizmeti","bilgilendirme","kayit_yonlendirme","demo_toplama"]'::jsonb),
('ROB-CURSOR', 'Cursor Kurulum Robotu', 'TAM YETKİLİ: YİSA-S sisteminin sıfırdan kurulumu. PATRON tarafından tam yetki ile görevlendirildi. Veritabanı, kod, deployment, konfigürasyon dahil tüm kurulum işlemleri. Onay istemeden çalışır.', 8, 'cursor', '["tam_yetki","veritabani_kurulum","kod_gelistirme","deployment","git_yonetimi","konfigurasyon","dosya_sistemi","api_erisim"]'::jsonb)
ON CONFLICT (kod) DO UPDATE SET 
    isim = EXCLUDED.isim,
    aciklama = EXCLUDED.aciklama,
    yetenekler = EXCLUDED.yetenekler;

-- 12 Direktörlük
INSERT INTO celf_directorates (kod, isim, tam_isim, sira) VALUES
('CFO', 'CFO', 'Chief Financial Officer - Finans Direktörlüğü', 1),
('CTO', 'CTO', 'Chief Technology Officer - Teknoloji Direktörlüğü', 2),
('CIO', 'CIO', 'Chief Information Officer - Bilgi Sistemleri Direktörlüğü', 3),
('CMO', 'CMO', 'Chief Marketing Officer - Pazarlama Direktörlüğü', 4),
('CHRO', 'CHRO', 'Chief Human Resources Officer - İnsan Kaynakları Direktörlüğü', 5),
('CLO', 'CLO', 'Chief Legal Officer - Hukuk Direktörlüğü', 6),
('CSO-SATIS', 'CSO (Satış)', 'Chief Sales Officer - Satış Direktörlüğü', 7),
('CPO', 'CPO', 'Chief Product Officer - Ürün Direktörlüğü', 8),
('CDO', 'CDO', 'Chief Data Officer - Veri Direktörlüğü', 9),
('CISO', 'CISO', 'Chief Information Security Officer - Bilgi Güvenliği Direktörlüğü', 10),
('CCO', 'CCO', 'Chief Customer Officer - Müşteri Deneyimi Direktörlüğü', 11),
('CSO-STRATEJI', 'CSO (Strateji)', 'Chief Strategy Officer - Strateji Direktörlüğü', 12)
ON CONFLICT (kod) DO NOTHING;

UPDATE celf_directorates SET ana_robot_id = (SELECT id FROM robots WHERE kod = 'ROB-CELF') WHERE ana_robot_id IS NULL;

-- 7 Çekirdek Kural
INSERT INTO core_rules (kural_no, kural_kodu, baslik, aciklama) VALUES
(1, 'KURAL-1', 'Panel karar vermez', 'Stratejik kararlar insan onayı gerektirir. AI önerir, insan onaylar.'),
(2, 'KURAL-2', 'Veri silinmez, gizlenir', 'Silme işlemi gizli=true olarak işaretlenir. Soft delete zorunlu.'),
(3, 'KURAL-3', 'Çocuk ham verisi açılmaz', 'Sporcu verileri hassas kabul edilir. KVKK/GDPR uyumlu.'),
(4, 'KURAL-4', 'Patron DB kayıp yaşamaz', 'Günlük yedekleme zorunlu. Point-in-time recovery aktif.'),
(5, 'KURAL-5', 'Audit log silinmez', 'Denetim logları asla silinemez veya değiştirilemez.'),
(6, 'KURAL-6', 'Güvenlik robotu bypass edilemez', 'Tüm güvenlik olayları izlenir. ROB-SIBER her zaman aktif.'),
(7, 'KURAL-7', 'Tek seferde tam erişim yoktur', 'Katmanlı erişim zorunlu. Hiyerarşik yetkilendirme.')
ON CONFLICT (kural_no) DO NOTHING;

-- 13 Rol
INSERT INTO role_permissions (rol_kodu, rol_adi, hiyerarsi_seviyesi, api_erisim, disa_aktarma) VALUES
('ROL-0', 'Ziyaretçi', 0, false, false),
('ROL-1', 'Alt Admin (Franchise Sahibi)', 1, true, true),
('ROL-2', 'Tesis Müdürü', 2, true, true),
('ROL-3', 'Bölge Müdürü', 3, true, true),
('ROL-4', 'Sportif Direktör', 4, true, false),
('ROL-5', 'Uzman Antrenör', 5, false, false),
('ROL-6', 'Antrenör', 6, false, false),
('ROL-7', 'Yardımcı/Stajyer', 7, false, false),
('ROL-8', 'Kayıt & Bilgilendirme', 8, false, false),
('ROL-9', 'Temizlik', 9, false, false),
('ROL-10', 'Veli', 10, false, false),
('ROL-11', 'Sporcu', 11, false, false),
('ROL-12', 'Misafir Sporcu', 12, false, false)
ON CONFLICT (rol_kodu) DO UPDATE SET rol_adi = EXCLUDED.rol_adi;

-- 10 Branş
INSERT INTO sports_branches (kod, isim, kategori, sira) VALUES
('ARTISTIK', 'Artistik Jimnastik', 'jimnastik', 1),
('RITMIK', 'Ritmik Jimnastik', 'jimnastik', 2),
('TRAMPOLIN', 'Trampolin', 'jimnastik', 3),
('AEROBIK', 'Aerobik Jimnastik', 'jimnastik', 4),
('AKROBATIK', 'Akrobatik Jimnastik', 'jimnastik', 5),
('PARKUR', 'Parkur', 'jimnastik', 6),
('TEAMGYM', 'TeamGym', 'jimnastik', 7),
('TUMBLING', 'Tumbling', 'jimnastik', 8),
('FITNESS', 'Fitness', 'fitness', 9),
('GENEL', 'Genel Spor', 'genel', 10)
ON CONFLICT (kod) DO NOTHING;

-- 4 Paket
INSERT INTO packages (kod, isim, aylik_ucret, giris_ucreti, max_sporcu, max_kullanici, bolgesel_tekel, sira) VALUES
('STARTER', 'Starter', 2500.00, 0, 50, 5, false, 1),
('PROFESSIONAL', 'Professional', 7500.00, 0, 250, 15, false, 2),
('ENTERPRISE', 'Enterprise', 15000.00, 0, NULL, 50, false, 3),
('FRANCHISE', 'Franchise', 15000.00, 50000.00, NULL, NULL, true, 4)
ON CONFLICT (kod) DO UPDATE SET 
    aylik_ucret = EXCLUDED.aylik_ucret,
    giris_ucreti = EXCLUDED.giris_ucreti;

-- CRM Aşamaları
INSERT INTO crm_lead_stages (kod, isim_tr, isim_en, sira, aciklama) VALUES
('C', 'C Seviyesi', 'Level C', 10, 'İlk temas / Contact'),
('E', 'E Seviyesi', 'Level E', 20, 'Değerlendirme / Evaluation'),
('O', 'O Seviyesi', 'Level O', 30, 'Fırsat / Opportunity'),
('JAO', 'J-A-O', 'J-A-O', 40, 'Özel seviye (J-A-O)')
ON CONFLICT (kod) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════════════
-- BÖLÜM E: TRİGGER'LAR VE KORUMALAR
-- ═══════════════════════════════════════════════════════════════════════════════

-- Güncelleme tarihi otomatik güncelleme
CREATE OR REPLACE FUNCTION update_guncelleme_tarihi()
RETURNS TRIGGER AS $$
BEGIN
    NEW.guncelleme_tarihi = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Tüm tablolara güncelleme trigger'ı
DO $$ 
DECLARE t TEXT; 
tablolar TEXT[] := ARRAY[
    'tenants','users','robots','robot_tasks','celf_directorates',
    'conversations','messages','athletes','evaluations','schedules',
    'attendance','payments','security_alerts','patron_commands','role_permissions',
    'sports_branches','packages','subscriptions','franchise_agreements',
    'franchise_territories','staff','phv_measurements','crm_contacts',
    'demo_requests','franchise_applications'
];
BEGIN 
    FOREACH t IN ARRAY tablolar LOOP 
        EXECUTE format('
            DROP TRIGGER IF EXISTS trg_update_%I ON %I; 
            CREATE TRIGGER trg_update_%I 
                BEFORE UPDATE ON %I 
                FOR EACH ROW 
                EXECUTE FUNCTION update_guncelleme_tarihi();
        ', t, t, t, t); 
    END LOOP; 
END $$;

-- AUDIT LOG silme/güncelleme koruması (KURAL 5)
CREATE OR REPLACE FUNCTION prevent_audit_delete()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'KURAL 5 İHLALİ: Audit logları silinemez!';
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION prevent_audit_update()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'KURAL 5 İHLALİ: Audit logları güncellenemez!';
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_prevent_audit_delete ON audit_logs;
CREATE TRIGGER trg_prevent_audit_delete
    BEFORE DELETE ON audit_logs
    FOR EACH ROW
    EXECUTE FUNCTION prevent_audit_delete();

DROP TRIGGER IF EXISTS trg_prevent_audit_update ON audit_logs;
CREATE TRIGGER trg_prevent_audit_update
    BEFORE UPDATE ON audit_logs
    FOR EACH ROW
    EXECUTE FUNCTION prevent_audit_update();

-- CORE RULES silme/güncelleme koruması
CREATE OR REPLACE FUNCTION prevent_core_rules_modify()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'ÇEKİRDEK KURAL İHLALİ: Çekirdek kurallar değiştirilemez veya silinemez!';
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_prevent_core_rules_delete ON core_rules;
CREATE TRIGGER trg_prevent_core_rules_delete
    BEFORE DELETE ON core_rules
    FOR EACH ROW
    EXECUTE FUNCTION prevent_core_rules_modify();

DROP TRIGGER IF EXISTS trg_prevent_core_rules_update ON core_rules;
CREATE TRIGGER trg_prevent_core_rules_update
    BEFORE UPDATE ON core_rules
    FOR EACH ROW
    EXECUTE FUNCTION prevent_core_rules_modify();

-- Sporcu no otomatik oluşturma
CREATE SEQUENCE IF NOT EXISTS sporcu_seq START 1;
CREATE OR REPLACE FUNCTION generate_sporcu_no()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.sporcu_no IS NULL THEN
        NEW.sporcu_no := 'SPR-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(NEXTVAL('sporcu_seq')::TEXT, 6, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sporcu_no ON athletes;
CREATE TRIGGER trg_sporcu_no
    BEFORE INSERT ON athletes
    FOR EACH ROW
    EXECUTE FUNCTION generate_sporcu_no();

-- Ödeme no otomatik oluşturma
CREATE SEQUENCE IF NOT EXISTS odeme_seq START 1;
CREATE OR REPLACE FUNCTION generate_odeme_no()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.odeme_no IS NULL THEN
        NEW.odeme_no := 'ODM-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(NEXTVAL('odeme_seq')::TEXT, 6, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_odeme_no ON payments;
CREATE TRIGGER trg_odeme_no
    BEFORE INSERT ON payments
    FOR EACH ROW
    EXECUTE FUNCTION generate_odeme_no();

-- ═══════════════════════════════════════════════════════════════════════════════
-- BÖLÜM F: RLS POLİTİKALARI
-- ═══════════════════════════════════════════════════════════════════════════════

-- RLS Aktivasyonu (tüm tablolar)
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE robots ENABLE ROW LEVEL SECURITY;
ALTER TABLE robot_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE celf_directorates ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE athletes ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE patron_commands ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE core_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE sports_branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE franchise_agreements ENABLE ROW LEVEL SECURITY;
ALTER TABLE franchise_territories ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE phv_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluation_900_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_lead_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE franchise_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE robot_chat_logs ENABLE ROW LEVEL SECURITY;

-- Yardımcı fonksiyonlar
CREATE OR REPLACE FUNCTION get_user_tenant_id() RETURNS UUID AS $$
BEGIN RETURN (SELECT tenant_id FROM users WHERE auth_id = auth.uid()); END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_user_rol_kodu() RETURNS VARCHAR AS $$
BEGIN RETURN (SELECT rol_kodu FROM users WHERE auth_id = auth.uid()); END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_user_hiyerarsi() RETURNS INTEGER AS $$
BEGIN RETURN (SELECT rp.hiyerarsi_seviyesi FROM users u JOIN role_permissions rp ON u.rol_kodu = rp.rol_kodu WHERE u.auth_id = auth.uid()); END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION is_service_role() RETURNS BOOLEAN AS $$
BEGIN RETURN current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'; END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Temel RLS politikaları
CREATE POLICY IF NOT EXISTS "robots_select" ON robots FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "robots_modify" ON robots FOR ALL USING (is_service_role());

CREATE POLICY IF NOT EXISTS "role_permissions_select" ON role_permissions FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "role_permissions_modify" ON role_permissions FOR ALL USING (is_service_role());

CREATE POLICY IF NOT EXISTS "core_rules_select" ON core_rules FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "celf_directorates_select" ON celf_directorates FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "celf_directorates_modify" ON celf_directorates FOR ALL USING (is_service_role());

CREATE POLICY IF NOT EXISTS "sports_branches_select" ON sports_branches FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "sports_branches_modify" ON sports_branches FOR ALL USING (is_service_role());

CREATE POLICY IF NOT EXISTS "packages_select" ON packages FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "packages_modify" ON packages FOR ALL USING (is_service_role());

CREATE POLICY IF NOT EXISTS "crm_lead_stages_select" ON crm_lead_stages FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "audit_logs_select" ON audit_logs FOR SELECT USING (is_service_role() OR get_user_hiyerarsi() <= 1);
CREATE POLICY IF NOT EXISTS "audit_logs_insert" ON audit_logs FOR INSERT WITH CHECK (is_service_role());

CREATE POLICY IF NOT EXISTS "patron_commands_all" ON patron_commands FOR ALL USING (is_service_role());

-- Anonim insert politikaları (form gönderimi)
CREATE POLICY IF NOT EXISTS "anon_insert_demo" ON demo_requests FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "anon_insert_franchise" ON franchise_applications FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "anon_insert_chat" ON robot_chat_logs FOR INSERT TO anon WITH CHECK (true);

-- ═══════════════════════════════════════════════════════════════════════════════
-- BÖLÜM G: İNDEKSLER
-- ═══════════════════════════════════════════════════════════════════════════════

-- Mevcut tablolar
CREATE INDEX IF NOT EXISTS idx_tenants_durum ON tenants(durum);
CREATE INDEX IF NOT EXISTS idx_tenants_sehir ON tenants(sehir);
CREATE INDEX IF NOT EXISTS idx_users_tenant_id ON users(tenant_id);
CREATE INDEX IF NOT EXISTS idx_users_rol_kodu ON users(rol_kodu);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_athletes_tenant_id ON athletes(tenant_id);
CREATE INDEX IF NOT EXISTS idx_athletes_durum ON athletes(durum);
CREATE INDEX IF NOT EXISTS idx_athletes_brans ON athletes(brans_id);
CREATE INDEX IF NOT EXISTS idx_payments_tenant_id ON payments(tenant_id);
CREATE INDEX IF NOT EXISTS idx_payments_durum ON payments(durum);
CREATE INDEX IF NOT EXISTS idx_audit_logs_islem_tipi ON audit_logs(islem_tipi);
CREATE INDEX IF NOT EXISTS idx_audit_logs_zaman ON audit_logs(islem_zamani);
CREATE INDEX IF NOT EXISTS idx_security_alerts_onem ON security_alerts(onem_seviyesi);
CREATE INDEX IF NOT EXISTS idx_robot_tasks_robot_id ON robot_tasks(robot_id);
CREATE INDEX IF NOT EXISTS idx_robot_tasks_durum ON robot_tasks(durum);
CREATE INDEX IF NOT EXISTS idx_evaluations_sporcu ON evaluations(sporcu_id);
CREATE INDEX IF NOT EXISTS idx_attendance_tarih ON attendance(tarih);
CREATE INDEX IF NOT EXISTS idx_schedules_gun ON schedules(gun);

-- Yeni tablolar
CREATE INDEX IF NOT EXISTS idx_subscriptions_tenant ON subscriptions(tenant_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_paket ON subscriptions(package_id);
CREATE INDEX IF NOT EXISTS idx_franchise_agreements_tenant ON franchise_agreements(tenant_id);
CREATE INDEX IF NOT EXISTS idx_franchise_territories_il ON franchise_territories(il);
CREATE INDEX IF NOT EXISTS idx_staff_tenant ON staff(tenant_id);
CREATE INDEX IF NOT EXISTS idx_staff_user ON staff(user_id);
CREATE INDEX IF NOT EXISTS idx_phv_sporcu ON phv_measurements(sporcu_id);
CREATE INDEX IF NOT EXISTS idx_phv_tarih ON phv_measurements(olcum_tarihi);
CREATE INDEX IF NOT EXISTS idx_900_evaluation ON evaluation_900_areas(evaluation_id);
CREATE INDEX IF NOT EXISTS idx_ai_logs_motor ON ai_usage_logs(ai_motor);
CREATE INDEX IF NOT EXISTS idx_ai_logs_tenant ON ai_usage_logs(tenant_id);
CREATE INDEX IF NOT EXISTS idx_crm_contacts_email ON crm_contacts(email);
CREATE INDEX IF NOT EXISTS idx_crm_contacts_stage ON crm_contacts(lead_stage_id);
CREATE INDEX IF NOT EXISTS idx_crm_activities_contact ON crm_activities(contact_id);
CREATE INDEX IF NOT EXISTS idx_demo_email ON demo_requests(email);
CREATE INDEX IF NOT EXISTS idx_demo_durum ON demo_requests(durum);
CREATE INDEX IF NOT EXISTS idx_franchise_app_email ON franchise_applications(email);
CREATE INDEX IF NOT EXISTS idx_franchise_app_durum ON franchise_applications(durum);
CREATE INDEX IF NOT EXISTS idx_chat_logs_session ON robot_chat_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_logs_created ON robot_chat_logs(olusturma_tarihi);

-- ═══════════════════════════════════════════════════════════════════════════════
-- KURULUM TAMAMLANDI
-- ═══════════════════════════════════════════════════════════════════════════════

SELECT '✅ YİSA-S FRANCHISE SİSTEMİ - TAM KURULUM TAMAMLANDI' AS sonuc,
       '32 Tablo + 7 Robot + 12 Direktörlük + 7 Kural + 13 Rol + 10 Branş + 4 Paket' AS icerik,
       'Serdinç ALTAY' AS kurucu,
       NOW() AS tamamlanma_zamani;
