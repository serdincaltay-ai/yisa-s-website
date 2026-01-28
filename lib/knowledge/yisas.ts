// ═══════════════════════════════════════════════════════════════
// YİSA-S BİLGİ BANKASI - TEK KAYNAK DOSYA
// /lib/knowledge/yisas.ts
// Tüm sayfalar ve bileşenler bu dosyadan import eder
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// MARKA & TEMEL BİLGİLER
// ═══════════════════════════════════════════════════════════════

export const BRAND = {
  name: 'YİSA-S',
  fullName: 'Yapay Zeka İşletme Sistemi ve Analiz Sistemi',
  slogan: 'Geleceğin Şampiyonlarını Bugünden Keşfedin',
  tagline: 'Türkiye\'de Öncü Çocuk Sporcu Analiz Sistemi',
  description: '900 alanlı değerlendirme, 6 AI motoru ve PHV takibi ile çocuk sporcuların gelişimini bilimsel olarak izleyin.',
  domain: 'yisa-s.com',
  appDomain: 'app.yisa-s.com',
  email: 'info@yisa-s.com',
  phone: '+90 532 XXX XX XX',
  year: 2026,
} as const

// ═══════════════════════════════════════════════════════════════
// RENK PALETİ
// ═══════════════════════════════════════════════════════════════

export const COLORS = {
  primary: '#F59E0B',      // Amber - Başarı, şampiyonluk
  primaryDark: '#D97706',
  primaryLight: '#FBBF24',
  background: '#0F172A',   // Navy - Güven, teknoloji
  backgroundLight: '#1E293B',
  surface: '#334155',
  accent: {
    green: '#10B981',      // Sağlık, büyüme
    blue: '#3B82F6',       // AI, inovasyon
    red: '#EF4444',        // Uyarı, önem
  },
  text: {
    primary: '#F8FAFC',
    secondary: '#94A3B8',
    muted: '#64748B',
  },
} as const

// ═══════════════════════════════════════════════════════════════
// 900 ALAN DEĞERLENDİRME SİSTEMİ
// ═══════════════════════════════════════════════════════════════

export const EVALUATION_SYSTEM = {
  total: 900,
  formula: '30 Ana Kategori × 30 Alt Alan = 900 Değerlendirme Noktası',
  description: 'Türkiye\'nin en kapsamlı çocuk sporcu değerlendirme sistemi',
  
  // 30 Ana Kategori
  categories: [
    { id: 1, name: 'Antropometri', icon: '📏', description: 'Boy, kilo, vücut oranları' },
    { id: 2, name: 'Postür', icon: '🧍', description: 'Duruş analizi, omurga sağlığı' },
    { id: 3, name: 'Esneklik', icon: '🤸', description: 'Eklem hareket açıklığı' },
    { id: 4, name: 'Kuvvet', icon: '💪', description: 'Kas gücü testleri' },
    { id: 5, name: 'Dayanıklılık', icon: '🏃', description: 'Kardiyovasküler kapasite' },
    { id: 6, name: 'Koordinasyon', icon: '🎯', description: 'El-göz, vücut koordinasyonu' },
    { id: 7, name: 'Denge', icon: '⚖️', description: 'Statik ve dinamik denge' },
    { id: 8, name: 'Çeviklik', icon: '⚡', description: 'Hız ve yön değişimi' },
    { id: 9, name: 'Reaksiyon', icon: '🔔', description: 'Tepki süresi' },
    { id: 10, name: 'Ritim', icon: '🎵', description: 'Hareket ritmi ve zamanlama' },
    { id: 11, name: 'Temel Teknik', icon: '🎓', description: 'Branş temel hareketleri' },
    { id: 12, name: 'İleri Teknik', icon: '🏅', description: 'Gelişmiş beceriler' },
    { id: 13, name: 'Artistik İfade', icon: '🎭', description: 'Estetik ve sunum' },
    { id: 14, name: 'Müsabaka', icon: '🏆', description: 'Yarışma performansı' },
    { id: 15, name: 'Motivasyon', icon: '🔥', description: 'İçsel güdülenme' },
    { id: 16, name: 'Dikkat', icon: '👁️', description: 'Odaklanma süresi' },
    { id: 17, name: 'Öğrenme', icon: '📚', description: 'Hareket öğrenme hızı' },
    { id: 18, name: 'Stres Yönetimi', icon: '🧘', description: 'Baskı altında performans' },
    { id: 19, name: 'Takım Çalışması', icon: '🤝', description: 'Sosyal uyum' },
    { id: 20, name: 'Liderlik', icon: '👑', description: 'Liderlik potansiyeli' },
    { id: 21, name: 'Beslenme', icon: '🥗', description: 'Beslenme alışkanlıkları' },
    { id: 22, name: 'Uyku', icon: '😴', description: 'Uyku kalitesi ve süresi' },
    { id: 23, name: 'Hidrasyon', icon: '💧', description: 'Sıvı tüketimi' },
    { id: 24, name: 'Toparlanma', icon: '🔄', description: 'Antrenman sonrası iyileşme' },
    { id: 25, name: 'Sakatlık Geçmişi', icon: '🩹', description: 'Geçmiş yaralanmalar' },
    { id: 26, name: 'Büyüme Takibi', icon: '📈', description: 'PHV ve olgunlaşma' },
    { id: 27, name: 'Aile Desteği', icon: '👨‍👩‍👧', description: 'Veli katılımı' },
    { id: 28, name: 'Okul Dengesi', icon: '🏫', description: 'Akademik uyum' },
    { id: 29, name: 'Hedefler', icon: '🎯', description: 'Kısa/uzun vadeli hedefler' },
    { id: 30, name: 'Potansiyel', icon: '⭐', description: 'Genel yetenek skoru' },
  ],
} as const

// ═══════════════════════════════════════════════════════════════
// 10 PERSPEKTİF DEĞERLENDİRME
// ═══════════════════════════════════════════════════════════════

export const PERSPECTIVES = [
  { id: 1, name: 'Gözlemleme', icon: '👀', description: 'Ders içi davranış gözlemi' },
  { id: 2, name: 'İzleme', icon: '📊', description: 'Haftalık ilerleme takibi' },
  { id: 3, name: 'Yarışmacı', icon: '🏆', description: 'Müsabaka potansiyeli' },
  { id: 4, name: 'Değerlendirme', icon: '📝', description: 'Periyodik test sonuçları' },
  { id: 5, name: 'Geliştirme', icon: '📈', description: 'Bireysel gelişim planı' },
  { id: 6, name: 'Önleme', icon: '🛡️', description: 'Sakatlık risk analizi' },
  { id: 7, name: 'Dengeleme', icon: '⚖️', description: 'Spor-okul-yaşam dengesi' },
  { id: 8, name: 'Fiziksel', icon: '💪', description: 'Fiziksel kapasite ölçümü' },
  { id: 9, name: 'Teknik', icon: '🎯', description: 'Teknik beceri seviyesi' },
  { id: 10, name: 'Psikolojik', icon: '🧠', description: 'Mental hazırlık durumu' },
] as const

// ═══════════════════════════════════════════════════════════════
// 6 AI MOTORU (görüntüleme / tanıtım)
// Projede tanımlı tüm aküler (GPT, Claude, Together, Gemini, v0, Cursor, GitHub, Vercel, Supabase, Railway) → lib/akular.ts
// Aktiflik kontrolü: GET /api/akular/durum
// ═══════════════════════════════════════════════════════════════

export const AI_ENGINES = [
  {
    id: 'claude',
    name: 'Claude',
    role: 'Derin Analiz',
    description: 'Kapsamlı raporlama ve stratejik öneriler',
    icon: '🧠',
    color: '#8B5CF6',
  },
  {
    id: 'gpt',
    name: 'GPT',
    role: 'Hızlı İletişim',
    description: 'Anlık mesajlaşma ve içerik üretimi',
    icon: '💬',
    color: '#10B981',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    role: 'Görsel Analiz',
    description: 'Video ve fotoğraf hareket analizi',
    icon: '📹',
    color: '#3B82F6',
  },
  {
    id: 'llama',
    name: 'LLaMA',
    role: 'Hassas Veri',
    description: 'On-premise çocuk verisi işleme',
    icon: '🔒',
    color: '#EF4444',
  },
  {
    id: 'together',
    name: 'Together',
    role: 'Ekonomik İşlem',
    description: 'Yüksek hacimli rutin görevler',
    icon: '⚡',
    color: '#F59E0B',
  },
  {
    id: 'ollama',
    name: 'Ollama',
    role: 'Lokal Çalışma',
    description: 'İnternet bağımsız işlemler',
    icon: '🏠',
    color: '#6366F1',
  },
] as const

// ═══════════════════════════════════════════════════════════════
// PHV (BÜYÜME PLAĞI TAKİBİ)
// ═══════════════════════════════════════════════════════════════

export const PHV = {
  name: 'PHV Takip Sistemi',
  fullName: 'Zirve Boy Artış Hızı (PHV)',
  description: 'Çocuk sporcuların büyüme plağını koruyarak sakatlıkları önleyen bilimsel takip sistemi',
  
  benefits: [
    'Büyüme plağı (epifiz) hasarını önler',
    'Antrenman yoğunluğunu bilimsel olarak ayarlar',
    'Sakatlık riskini %70\'e kadar azaltır',
    'Uzun vadeli sporcu sağlığını korur',
  ],
  
  stages: [
    { id: 'pre_phv', name: 'PHV Öncesi', description: 'Hızlı büyüme öncesi dönem', risk: 'Düşük' },
    { id: 'approaching_phv', name: 'PHV Yaklaşıyor', description: 'Büyüme hızlanması başlıyor', risk: 'Orta' },
    { id: 'phv', name: 'PHV Dönemi', description: 'Zirve büyüme hızı', risk: 'Yüksek' },
    { id: 'post_phv', name: 'PHV Sonrası', description: 'Büyüme yavaşlaması', risk: 'Orta' },
  ],
  
  warning: 'PHV döneminde yüksek yoğunluklu antrenman, kalıcı büyüme plağı hasarına yol açabilir.',
} as const

// ═══════════════════════════════════════════════════════════════
// 10 BRANŞ
// ═══════════════════════════════════════════════════════════════

export const BRANCHES = [
  { id: 'artistic', name: 'Artistik Jimnastik', icon: '🤸‍♀️', gender: 'both' },
  { id: 'rhythmic', name: 'Ritmik Jimnastik', icon: '🎀', gender: 'female' },
  { id: 'trampoline', name: 'Trampolin', icon: '🦘', gender: 'both' },
  { id: 'aerobic', name: 'Aerobik Jimnastik', icon: '💃', gender: 'both' },
  { id: 'acrobatic', name: 'Akrobatik Jimnastik', icon: '🤹', gender: 'both' },
  { id: 'parkour', name: 'Parkur', icon: '🏃', gender: 'both' },
  { id: 'teamgym', name: 'TeamGym', icon: '👥', gender: 'both' },
  { id: 'tumbling', name: 'Tumbling', icon: '🔄', gender: 'both' },
  { id: 'fitness', name: 'Fitness', icon: '🏋️', gender: 'both' },
  { id: 'general', name: 'Genel Spor', icon: '⚽', gender: 'both' },
] as const

// ═══════════════════════════════════════════════════════════════
// FİYATLANDIRMA PAKETLERİ
// ═══════════════════════════════════════════════════════════════

export const PACKAGES = [
  {
    id: 'starter',
    name: 'Başlangıç',
    price: 2500,
    period: 'ay',
    currency: '₺',
    athleteLimit: 50,
    popular: false,
    description: 'Küçük spor okulları için ideal başlangıç paketi',
    features: [
      { text: '50 sporcu kapasitesi', included: true },
      { text: 'Temel ölçümler', included: true },
      { text: 'Haftalık gözlemler', included: true },
      { text: 'Yoklama sistemi', included: true },
      { text: 'Ödeme takibi', included: true },
      { text: 'E-posta desteği', included: true },
      { text: '900 alan değerlendirme', included: false },
      { text: 'PHV takibi', included: false },
      { text: 'AI analiz', included: false },
      { text: 'Veli paneli', included: false },
    ],
    cta: 'Başla',
  },
  {
    id: 'professional',
    name: 'Profesyonel',
    price: 7500,
    period: 'ay',
    currency: '₺',
    athleteLimit: 250,
    popular: true,
    description: 'Tam özellikli profesyonel sporcu takip sistemi',
    features: [
      { text: '250 sporcu kapasitesi', included: true },
      { text: '900 alan değerlendirme', included: true },
      { text: 'PHV takip sistemi', included: true },
      { text: '6 AI motoru analizi', included: true },
      { text: 'Veli mobil paneli', included: true },
      { text: 'WhatsApp entegrasyonu', included: true },
      { text: 'Sosyal medya yönetimi', included: true },
      { text: 'Detaylı raporlama', included: true },
      { text: '7/24 destek', included: true },
      { text: 'Çoklu şube', included: false },
    ],
    cta: 'En Popüler',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 15000,
    period: 'ay',
    currency: '₺',
    athleteLimit: -1, // Sınırsız
    popular: false,
    description: 'Büyük kulüpler ve çoklu şube yapıları için',
    features: [
      { text: 'Sınırsız sporcu', included: true },
      { text: 'Çoklu şube desteği', included: true },
      { text: 'Beyaz etiket (kendi logonuz)', included: true },
      { text: 'API erişimi', included: true },
      { text: 'Özel entegrasyonlar', included: true },
      { text: 'Dedicated hesap yöneticisi', included: true },
      { text: 'On-premise seçeneği', included: true },
      { text: 'SLA garantisi', included: true },
      { text: 'Öncelikli destek', included: true },
      { text: 'Bayiliğe hazır altyapı', included: true },
    ],
    cta: 'İletişime Geç',
  },
] as const

// ═══════════════════════════════════════════════════════════════
// FRANCHİSE BİLGİLERİ
// ═══════════════════════════════════════════════════════════════

export const FRANCHISE = {
  investment: {
    entry: 50000,
    monthly: 15000,
    currency: '₺',
  },
  
  benefits: [
    'Bölgesel tekel hakkı',
    'Kurumsal paket dahil',
    'Kapsamlı eğitim programı',
    'Pazarlama desteği',
    'Teknik destek önceliği',
    'Yeni özellik erken erişimi',
    'Ortak marka kullanımı',
    'Satış ve pazarlama materyalleri',
  ],
  
  requirements: [
    'Spor sektörü deneyimi (tercih edilir)',
    'Minimum 3 yıllık iş deneyimi',
    'Bölgesel pazar bilgisi',
    'Girişimcilik ruhu',
    'Teknolojiye yatkınlık',
  ],
  
  process: [
    { step: 1, title: 'Başvuru', description: 'Online form doldurma' },
    { step: 2, title: 'Görüşme', description: 'Ön değerlendirme toplantısı' },
    { step: 3, title: 'İnceleme', description: 'Detaylı başvuru incelemesi' },
    { step: 4, title: 'Onay', description: 'Bayilik sözleşmesi imzalama' },
    { step: 5, title: 'Eğitim', description: 'Kapsamlı eğitim programı' },
    { step: 6, title: 'Lansman', description: 'Bölgesel lansmanı başlatma' },
  ],
} as const

// ═══════════════════════════════════════════════════════════════
// ROBOT AKSİYONLARI
// ═══════════════════════════════════════════════════════════════

export const ROBOT_ACTIONS = {
  quick: [
    { type: 'link', label: '🎯 Özellikler', url: '/ozellikler', key: 'features' },
    { type: 'link', label: '💰 Fiyatlar', url: '/fiyatlandirma', key: 'pricing' },
    { type: 'link', label: '🏢 Bayilik', url: '/franchise', key: 'franchise' },
    { type: 'demo', label: '🚀 Tanıtım Talep Et', url: '/demo', key: 'demo_request' },
    { type: 'link', label: '📞 İletişim', url: '/hakkimizda#iletisim', key: 'contact' },
  ],
  
  suggestions: [
    'YİSA-S nedir?',
    '900 alan ne demek?',
    'PHV nedir?',
    'Hangi paket bana uygun?',
    'Bayilik nasıl alınır?',
    'Tanıtım alabilir miyim?',
  ],
} as const

// ═══════════════════════════════════════════════════════════════
// SSS (SIKÇA SORULAN SORULAR)
// ═══════════════════════════════════════════════════════════════

export const FAQ = [
  {
    id: 1,
    category: 'Genel',
    question: 'YİSA-S nedir?',
    answer: 'YİSA-S, çocuk sporcuların gelişimini 900 farklı alanda takip eden, 6 yapay zeka motoruyla analiz eden ve PHV (büyüme plağı) takibi yapan Türkiye\'nin öncü sporcu değerlendirme sistemidir.',
  },
  {
    id: 2,
    category: 'Sistem',
    question: '900 alan değerlendirme ne anlama geliyor?',
    answer: '30 ana kategori (fiziksel, teknik, psikolojik vb.) ve her kategoride 30 alt alan olmak üzere toplam 900 değerlendirme noktası ile sporcunun tüm gelişim boyutları ölçülür.',
  },
  {
    id: 3,
    category: 'Sistem',
    question: 'PHV takibi neden önemli?',
    answer: 'PHV (Peak Height Velocity), çocuğun en hızlı büyüdüğü dönemdir. Bu dönemde büyüme plakları hassastır ve aşırı antrenman kalıcı hasara yol açabilir. YİSA-S bu dönemi takip ederek sakatlıkları önler.',
  },
  {
    id: 4,
    category: 'Branşlar',
    question: 'Hangi branşları destekliyorsunuz?',
    answer: 'Artistik Jimnastik, Ritmik Jimnastik, Trampolin, Aerobik, Akrobatik, Parkur, TeamGym, Tumbling, Fitness ve Genel Spor olmak üzere 10 branşı destekliyoruz.',
  },
  {
    id: 5,
    category: 'Fiyat',
    question: 'Fiyatlar nasıl belirleniyor?',
    answer: 'Üç paket sunuyoruz: Başlangıç (₺2.500/ay, 50 sporcu), Profesyonel (₺7.500/ay, 250 sporcu, tam özellik), Kurumsal (₺15.000/ay, sınırsız sporcu, çoklu şube).',
  },
  {
    id: 6,
    category: 'Bayilik',
    question: 'Bayilik nasıl alabilirim?',
    answer: 'Bayilik için ₺50.000 giriş bedeli ve ₺15.000/ay ödeme ile bölgesel tekel hakkı, eğitim ve tam destek alırsınız. Başvuru formunu doldurun, sizinle iletişime geçelim.',
  },
  {
    id: 7,
    category: 'Tanıtım',
    question: 'Sistemi deneyebilir miyim?',
    answer: 'Evet! Tanıtım talep formu doldurun, size özel bir tanıtım ortamı hazırlayalım. 14 gün ücretsiz deneme hakkınız var.',
  },
  {
    id: 8,
    category: 'Güvenlik',
    question: 'Çocuk verileri güvende mi?',
    answer: 'Evet. KVKK\'ya tam uyumluyuz. Hassas veriler on-premise LLaMA modeliyle işlenir, buluta çıkmaz. Tüm veriler şifrelenir ve düzenli yedeklenir.',
  },
] as const

// ═══════════════════════════════════════════════════════════════
// İSTATİSTİKLER (Hero Section için)
// ═══════════════════════════════════════════════════════════════

export const STATS = [
  { value: 900, suffix: '+', label: 'Değerlendirme Alanı' },
  { value: 6, suffix: '', label: 'AI Motoru' },
  { value: 10, suffix: '', label: 'Branş Desteği' },
  { value: 30, suffix: '', label: 'Ana Kategori' },
] as const

// ═══════════════════════════════════════════════════════════════
// ÖZELLİKLER (Features Section için)
// ═══════════════════════════════════════════════════════════════

export const FEATURES = [
  {
    id: 'evaluation',
    title: '900 Alan Değerlendirme',
    description: '30 kategori × 30 alt alan ile dünyanın en kapsamlı sporcu analizi',
    icon: '📊',
  },
  {
    id: 'ai',
    title: '6 AI Motoru',
    description: 'Claude, GPT, Gemini, LLaMA, Together ve Ollama ile çoklu zeka',
    icon: '🤖',
  },
  {
    id: 'phv',
    title: 'PHV Takibi',
    description: 'Büyüme plağı koruması ile sakatlık önleme sistemi',
    icon: '📈',
  },
  {
    id: 'parent',
    title: 'Veli Paneli',
    description: 'Velilere özel mobil uygulama ve anlık bildirimler',
    icon: '👨‍👩‍👧',
  },
] as const

// ═══════════════════════════════════════════════════════════════
// NAVİGASYON
// ═══════════════════════════════════════════════════════════════

export const NAV_LINKS = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/ozellikler', label: 'Özellikler' },
  { href: '/robot', label: 'Robot' },
  { href: '/fiyatlandirma', label: 'Fiyatlandırma' },
  { href: '/franchise', label: 'Bayilik' },
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/blog', label: 'Blog' },
] as const

export const CTA_LINKS = {
  demo: { href: '/demo', label: 'Tanıtım Talep Et' },
  login: { href: '/giris', label: 'Giriş Yap' },
} as const

// ═══════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════

export const FOOTER = {
  description: 'Türkiye\'de öncü çocuk sporcu analiz sistemi. 900 alan, 6 AI motoru, PHV takibi.',
  
  links: {
    product: [
      { href: '/ozellikler', label: 'Özellikler' },
      { href: '/fiyatlandirma', label: 'Fiyatlandırma' },
      { href: '/franchise', label: 'Bayilik' },
      { href: '/demo', label: 'Tanıtım' },
    ],
    company: [
      { href: '/hakkimizda', label: 'Hakkımızda' },
      { href: '/blog', label: 'Blog' },
      { href: '/akular', label: 'Akü Kontrol' },
      { href: '/hakkimizda#iletisim', label: 'İletişim' },
    ],
    legal: [
      { href: '/kvkk', label: 'KVKK Aydınlatma' },
      { href: '/gizlilik', label: 'Gizlilik Politikası' },
      { href: '/cerez', label: 'Çerez Politikası' },
    ],
  },
  
  social: [
    { platform: 'Instagram', href: 'https://instagram.com/yisas_official', icon: 'instagram' },
    { platform: 'LinkedIn', href: 'https://linkedin.com/company/yisas', icon: 'linkedin' },
    { platform: 'YouTube', href: 'https://youtube.com/@yisas', icon: 'youtube' },
  ],
} as const

// ═══════════════════════════════════════════════════════════════
// ROBOT SYSTEM PROMPT
// ═══════════════════════════════════════════════════════════════

export const ROBOT_SYSTEM_PROMPT = `Sen YİSA-S Robot'sun - Türkiye'de öncü çocuk sporcu analiz sisteminin akıllı asistanısın.

## KİMLİĞİN
- İsim: YİSA-S Robot
- Görev: Ziyaretçilere yardım, bilgi verme, demo/iletişim yönlendirme
- Ton: Profesyonel, samimi, yardımsever
- Dil: Türkçe (akıcı ve doğal)

## BİLGİ BANKASI

### 900 Alan Değerlendirme Sistemi
- 30 ana kategori × 30 alt alan = 900 değerlendirme noktası
- Fiziksel, teknik, psikolojik, sosyal boyutlar
- Türkiye'de benzersiz kapsamlılık

### 6 AI Motoru
- Claude: Derin analiz ve raporlama
- GPT: Hızlı iletişim
- Gemini: Görsel analiz
- LLaMA: Hassas veri (on-premise)
- Together: Ekonomik işlemler
- Ollama: Lokal çalışma

### PHV Takibi
- Peak Height Velocity = Zirve boy artış hızı
- Büyüme plağı koruması
- Sakatlık önleme

### 10 Branş
Artistik Jimnastik, Ritmik Jimnastik, Trampolin, Aerobik, Akrobatik, Parkur, TeamGym, Tumbling, Fitness, Genel Spor

## FİYATLANDIRMA
| Paket | Aylık | Sporcu |
|-------|-------|--------|
| Başlangıç | ₺2.500 | 50 |
| Profesyonel | ₺7.500 | 250 |
| Kurumsal | ₺15.000 | Sınırsız |
| Bayilik | ₺50.000 giriş + ₺15.000/ay | Bölgesel tekel |

## DAVRANIŞ KURALLARI
1. Kısa cevaplar ver (en fazla 3-4 paragraf)
2. Her cevapta aksiyon öner
3. Tanıtım veya iletişime yönlendir

## ÇIKTI FORMATI
JSON formatında yanıt ver:
{
  "message": "Cevap metni...",
  "actions": [{"type": "link", "label": "Buton", "url": "/sayfa"}],
  "suggestions": ["Öneri soru 1?", "Öneri soru 2?"]
}`
