-- ═══════════════════════════════════════════════════════════════════════════════
-- YİSA-S TAM SUPABASE ŞEMASI
-- Hiyerarşi: Patron → Asistan → Niş Asistan → Data Robot, Security Robot
-- Misafir seviyeleri: C, E, O, J-A-O (tüm misafirler bu seviyelerde toplanır)
-- CRM: Demo, Franchise, İletişim, Chat logları CRM'e gönderilebilir
-- ═══════════════════════════════════════════════════════════════════════════════
-- KULLANIM:
--   • İlk kurulum: Sadece bu dosyayı Supabase SQL Editor'da çalıştırın.
--   • Zaten supabase.sql çalıştırdıysanız: Bu dosyayı çalıştırın; yeni tablolar
--     ve kolonlar eklenir, mevcut veriler korunur.
-- Claude / backend: Bu şema ile tenants, branches, app_roles, robot_types,
-- crm_contacts, crm_activities kullanılarak tüm konular CRM'e gönderilebilir.
-- ═══════════════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. HİYERARŞİ / ROL TABLOSU (Patron, Asistan, Niş, Data Robot, Security Robot)
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS app_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,
    name_tr TEXT NOT NULL,
    name_en TEXT,
    hierarchy_level INTEGER NOT NULL DEFAULT 0,
    is_robot BOOLEAN NOT NULL DEFAULT FALSE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE app_roles IS 'Sistem hiyerarşisi: Patron, Asistan, Niş Asistan, Data Robot, Security Robot';
COMMENT ON COLUMN app_roles.hierarchy_level IS '1=Patron (en üst), 2=Asistan, 3=Niş, 4+=Robotlar';
COMMENT ON COLUMN app_roles.is_robot IS 'true ise bu rol bir robot tipidir (data_robot, security_robot)';

-- Seed: Hiyerarşi değerleri
INSERT INTO app_roles (code, name_tr, name_en, hierarchy_level, is_robot, description) VALUES
    ('patron',        'Patron',         'Owner',           1, FALSE, 'En üst yetkili; işletme sahibi'),
    ('asistan',       'Asistan',        'Assistant',      2, FALSE, 'Patron yardımcısı'),
    ('nis_asistan',   'Niş Asistan',    'Niche Assistant',3, FALSE, 'Alanında uzman asistan'),
    ('data_robot',    'Data Robot',     'Data Robot',     4, TRUE,  'Veri işleme ve raporlama robotu'),
    ('security_robot','Security Robot', 'Security Robot', 5, TRUE,  'Güvenlik ve erişim kontrol robotu')
ON CONFLICT (code) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. ROBOT TİPLERİ (Chat, Data, Security — CRM/Loglama için)
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS robot_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,
    name_tr TEXT NOT NULL,
    name_en TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE robot_types IS 'Robot türleri: chat (NeebChat), data_robot, security_robot';

INSERT INTO robot_types (code, name_tr, name_en, description) VALUES
    ('chat_robot',     'Chat Robot',      'Chat Robot',     'Site asistanı / NeebChat'),
    ('data_robot',     'Data Robot',     'Data Robot',     'Veri analizi ve raporlama'),
    ('security_robot', 'Security Robot', 'Security Robot', 'Güvenlik ve erişim yönetimi')
ON CONFLICT (code) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. MİSAFİR / LİDER SEVİYELERİ (C, E, O, J-A-O — tüm misafirler burada toplanır)
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS crm_lead_stages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,
    name_tr TEXT NOT NULL,
    name_en TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE crm_lead_stages IS 'CRM aşamaları; misafirler C, E, O, J-A-O seviyelerinde toplanır';

INSERT INTO crm_lead_stages (code, name_tr, name_en, sort_order, description) VALUES
    ('C',   'C Seviyesi',   'Level C',   10, 'İlk temas / Contact'),
    ('E',   'E Seviyesi',   'Level E',   20, 'Değerlendirme / Evaluation'),
    ('O',   'O Seviyesi',   'Level O',   30, 'Fırsat / Opportunity'),
    ('JAO', 'J-A-O',       'J-A-O',    40, 'Özel seviye (J-A-O)')
ON CONFLICT (code) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- 4. TENANTS (Müşteri / Franchise / Kurum)
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE,
    email TEXT,
    phone TEXT,
    status TEXT DEFAULT 'active',
    package_id TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE tenants IS 'Franchise / Enterprise müşteriler; robot_chat_logs.tenant_id buraya referans verir';

CREATE INDEX IF NOT EXISTS idx_tenants_slug ON tenants(slug);
CREATE INDEX IF NOT EXISTS idx_tenants_status ON tenants(status);

-- ─────────────────────────────────────────────────────────────────────────────
-- 5. BRANCHES (Şubeler — tenant’a bağlı)
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS branches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    city TEXT,
    district TEXT,
    address TEXT,
    status TEXT DEFAULT 'active',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE branches IS 'Şubeler; robot_chat_logs.branch_id buraya referans verir';

CREATE INDEX IF NOT EXISTS idx_branches_tenant ON branches(tenant_id);
CREATE INDEX IF NOT EXISTS idx_branches_status ON branches(status);

-- ─────────────────────────────────────────────────────────────────────────────
-- 6. MEVCUT TABLOLAR (zaten supabase.sql’de varsa bu blok hata verir; o zaman atlayın)
-- ─────────────────────────────────────────────────────────────────────────────

-- Demo Talepleri
CREATE TABLE IF NOT EXISTS demo_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company_name TEXT,
    athlete_count INTEGER,
    interested_package TEXT,
    message TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Franchise Başvuruları
CREATE TABLE IF NOT EXISTS franchise_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT NOT NULL,
    district TEXT,
    experience TEXT,
    investment_budget TEXT,
    motivation TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Robot Chat Logları (tenant_id, branch_id artık tenants/branches’a FK ile bağlanabilir)
CREATE TABLE IF NOT EXISTS robot_chat_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL,
    tenant_id UUID,
    branch_id UUID,
    robot_type_id UUID REFERENCES robot_types(id),
    user_message TEXT NOT NULL,
    robot_response TEXT NOT NULL,
    ai_model TEXT DEFAULT 'claude-sonnet-4',
    tokens_used INTEGER,
    response_time_ms INTEGER,
    context TEXT DEFAULT 'website',
    page_url TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    actions_suggested JSONB DEFAULT '[]',
    action_taken TEXT,
    lead_converted BOOLEAN DEFAULT FALSE,
    ip_hash TEXT,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Mevcut robot_chat_logs'ta robot_type_id yoksa ekle (ALTER sonra)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'robot_chat_logs' AND column_name = 'robot_type_id'
    ) THEN
        ALTER TABLE robot_chat_logs ADD COLUMN robot_type_id UUID REFERENCES robot_types(id);
    END IF;
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- İletişim Mesajları
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    category TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Newsletter Aboneleri
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    kvkk_consent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 7. CRM CONTACTS — Tüm kaynaklardan gelen kişiler (Demo, Franchise, İletişim, Chat)
--    "Tüm konular CRM'e gönderilebilir" → Bu tablo tek kişi görünümü
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS crm_contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
    branch_id UUID REFERENCES branches(id) ON DELETE SET NULL,
    lead_stage_id UUID REFERENCES crm_lead_stages(id) ON DELETE SET NULL,
    email TEXT NOT NULL,
    name TEXT,
    phone TEXT,
    company_name TEXT,
    source_type TEXT NOT NULL,
    source_id UUID,
    source_table TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT chk_crm_source CHECK (source_type IN ('demo','franchise','contact','newsletter','chat'))
);

COMMENT ON TABLE crm_contacts IS 'CRM’e giden birleşik kişi; demo_requests, franchise, contact, chat burada toplanır';
COMMENT ON COLUMN crm_contacts.source_type IS 'demo | franchise | contact | newsletter | chat';
COMMENT ON COLUMN crm_contacts.source_id IS 'Orijinal kayıt id (demo_requests.id, franchise_applications.id vb.)';

CREATE INDEX IF NOT EXISTS idx_crm_contacts_email ON crm_contacts(email);
CREATE INDEX IF NOT EXISTS idx_crm_contacts_tenant ON crm_contacts(tenant_id);
CREATE INDEX IF NOT EXISTS idx_crm_contacts_source ON crm_contacts(source_type, source_id);
CREATE INDEX IF NOT EXISTS idx_crm_contacts_lead_stage ON crm_contacts(lead_stage_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- 8. CRM ACTIVITIES — Tüm konuların CRM aktivitesi (gönderilebilir kayıtlar)
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS crm_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contact_id UUID REFERENCES crm_contacts(id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL,
    source_table TEXT NOT NULL,
    source_id UUID NOT NULL,
    title TEXT,
    payload JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT chk_activity_type CHECK (activity_type IN (
        'chat','demo_request','franchise_app','contact_message','newsletter'
    ))
);

COMMENT ON TABLE crm_activities IS 'CRM’e gönderilen tüm konular: chat, demo, franchise, iletişim, newsletter';

CREATE INDEX IF NOT EXISTS idx_crm_activities_contact ON crm_activities(contact_id);
CREATE INDEX IF NOT EXISTS idx_crm_activities_source ON crm_activities(source_table, source_id);
CREATE INDEX IF NOT EXISTS idx_crm_activities_created ON crm_activities(created_at);

-- ─────────────────────────────────────────────────────────────────────────────
-- 9. FK: robot_chat_logs → tenants, branches (opsiyonel; mevcut tabloda kolon varsa)
-- ─────────────────────────────────────────────────────────────────────────────

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'tenants') AND
       EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'robot_chat_logs') THEN
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.table_constraints
            WHERE table_name = 'robot_chat_logs' AND constraint_name = 'robot_chat_logs_tenant_id_fkey'
        ) AND EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'robot_chat_logs' AND column_name = 'tenant_id') THEN
            ALTER TABLE robot_chat_logs ADD CONSTRAINT robot_chat_logs_tenant_id_fkey
                FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE SET NULL;
        END IF;
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.table_constraints
            WHERE table_name = 'robot_chat_logs' AND constraint_name = 'robot_chat_logs_branch_id_fkey'
        ) AND EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'robot_chat_logs' AND column_name = 'branch_id') THEN
            ALTER TABLE robot_chat_logs ADD CONSTRAINT robot_chat_logs_branch_id_fkey
                FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE SET NULL;
        END IF;
    END IF;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- ─────────────────────────────────────────────────────────────────────────────
-- 10. İNDEKSLER (mevcut + yeni)
-- ─────────────────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_demo_email ON demo_requests(email);
CREATE INDEX IF NOT EXISTS idx_demo_status ON demo_requests(status);
CREATE INDEX IF NOT EXISTS idx_robot_session ON robot_chat_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_robot_created ON robot_chat_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_robot_tenant ON robot_chat_logs(tenant_id);
CREATE INDEX IF NOT EXISTS idx_robot_branch ON robot_chat_logs(branch_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- 11. RLS (Row Level Security)
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE app_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE robot_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_lead_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_activities ENABLE ROW LEVEL SECURITY;

ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE franchise_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE robot_chat_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Anonim: Sadece insert (form gönderimi)
CREATE POLICY "anon_insert_demo" ON demo_requests FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_insert_franchise" ON franchise_applications FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_insert_robot" ON robot_chat_logs FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_insert_contact" ON contact_messages FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_insert_newsletter" ON newsletter_subscribers FOR INSERT TO anon WITH CHECK (true);

-- Authenticated: Tüm okuma (admin panel)
CREATE POLICY "auth_read_demo" ON demo_requests FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_read_franchise" ON franchise_applications FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_read_robot" ON robot_chat_logs FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_read_contact" ON contact_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_read_newsletter" ON newsletter_subscribers FOR SELECT TO authenticated USING (true);

-- Yeni tablolar: sadece authenticated okuyabilsin; service_role tam erişim
CREATE POLICY "auth_read_app_roles" ON app_roles FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_read_robot_types" ON robot_types FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_read_crm_stages" ON crm_lead_stages FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_read_tenants" ON tenants FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_read_branches" ON branches FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_read_crm_contacts" ON crm_contacts FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_read_crm_activities" ON crm_activities FOR SELECT TO authenticated USING (true);

-- ─────────────────────────────────────────────────────────────────────────────
-- 12. CRM’e “gönderme” için örnek view (Demo/Franchise/Contact → Contact + Activity)
--    Backend’de trigger veya API ile doldurulabilir; şablon mantığı burada
-- ─────────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE VIEW v_crm_unified AS
SELECT
    c.id AS contact_id,
    c.email,
    c.name,
    c.phone,
    c.company_name,
    c.source_type,
    c.source_id,
    c.lead_stage_id,
    s.code AS lead_stage_code,
    s.name_tr AS lead_stage_name,
    c.created_at AS contact_created_at,
    (SELECT jsonb_agg(jsonb_build_object(
        'id', a.id,
        'activity_type', a.activity_type,
        'source_table', a.source_table,
        'source_id', a.source_id,
        'title', a.title,
        'created_at', a.created_at
    ) ORDER BY a.created_at DESC) AS activities
FROM crm_contacts c
LEFT JOIN crm_lead_stages s ON s.id = c.lead_stage_id
LEFT JOIN crm_activities a ON a.contact_id = c.id
GROUP BY c.id, c.email, c.name, c.phone, c.company_name, c.source_type, c.source_id,
         c.lead_stage_id, s.code, s.name_tr, c.created_at;

COMMENT ON VIEW v_crm_unified IS 'CRM’e gönderilmiş tüm kişiler ve aktiviteleri; C/E/O/J-A-O seviyeleri dahil';

-- ═══════════════════════════════════════════════════════════════════════════════
-- ÖZET
-- ═══════════════════════════════════════════════════════════════════════════════
-- • app_roles: Patron, Asistan, Niş Asistan, Data Robot, Security Robot (hiyerarşi)
-- • robot_types: chat_robot, data_robot, security_robot
-- • crm_lead_stages: C, E, O, J-A-O (misafirlerin toplandığı seviyeler)
-- • tenants, branches: robot_chat_logs.tenant_id / branch_id için
-- • crm_contacts, crm_activities: Demo/Franchise/Contact/Chat → CRM’e gönderim
-- • v_crm_unified: Tüm konuların CRM’deki birleşik görünümü
-- Backend’de: demo/franchise/contact/chat kaydı sonrası crm_contacts + crm_activities
-- insert ederek “CRM’e gönder” mantığı tamamlanır.
-- ═══════════════════════════════════════════════════════════════════════════════
