-- ═══════════════════════════════════════════════════════════════
-- YİSA-S WEBSITE SUPABASE TABLOLARI
-- Bu SQL'i Supabase SQL Editor'da çalıştırın
-- ═══════════════════════════════════════════════════════════════

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

-- Robot Chat Logları
CREATE TABLE IF NOT EXISTS robot_chat_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL,
    tenant_id UUID,
    branch_id UUID,
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

-- İndeksler
CREATE INDEX IF NOT EXISTS idx_demo_email ON demo_requests(email);
CREATE INDEX IF NOT EXISTS idx_demo_status ON demo_requests(status);
CREATE INDEX IF NOT EXISTS idx_robot_session ON robot_chat_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_robot_created ON robot_chat_logs(created_at);

-- RLS Aktif Et
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE franchise_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE robot_chat_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Anonim Insert İzinleri (Public Website için)
CREATE POLICY "anon_insert_demo" ON demo_requests FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_insert_franchise" ON franchise_applications FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_insert_robot" ON robot_chat_logs FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_insert_contact" ON contact_messages FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_insert_newsletter" ON newsletter_subscribers FOR INSERT TO anon WITH CHECK (true);

-- Authenticated Read (Admin Panel için)
CREATE POLICY "auth_read_demo" ON demo_requests FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_read_franchise" ON franchise_applications FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_read_robot" ON robot_chat_logs FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_read_contact" ON contact_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "auth_read_newsletter" ON newsletter_subscribers FOR SELECT TO authenticated USING (true);
