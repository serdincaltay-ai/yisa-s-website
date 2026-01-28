# YİSA-S Sistem Açıklaması — Tam Metin

Bu belge, YİSA-S sitesinin ve NeebChat (robot/chat) bileşeninin bütün sistemi kapsayan açıklamasıdır. Önce genel sistem, ardından NeebChat bölümü ayrıntılı olarak yazılmıştır.

---

## 1. GENEL SİSTEM ÖZETİ

YİSA-S, **Yapay Zeka İşletme Sistemi ve Analiz Sistemi** kısaltmasıdır. Sloganı: *“Geleceğin Şampiyonlarını Bugünden Keşfedin”*. Türkiye’de öncü çocuk sporcu analiz sistemi olarak konumlanır.

Sistem üç ana direğe dayanır:

1. **900 alanlı değerlendirme** — 30 ana kategori × 30 alt alan.
2. **6 AI motoru** — Claude, GPT, Gemini, LLaMA, Together, Ollama.
3. **PHV (Peak Height Velocity) takibi** — Büyüme plağı koruması ve sakatlık önleme.

Site; ana sayfa, özellikler, fiyatlandırma, franchise, hakkımızda, demo talep, blog ve robot tanıtım sayfalarından oluşur. Tüm sayfalarda sağ alt köşede **NeebChat** (YİSA-S Robot) widget’ı açılır; ziyaretçi her yerden asistanla konuşabilir.

Teknik yığın: **Next.js 14**, **Tailwind CSS**, **Framer Motion**, **Supabase**, **Anthropic Claude API**. Bilgi bankası tek bir kaynak dosyada toplanmıştır: `lib/knowledge/yisas.ts`. Marka, renkler, kategoriler, AI motorları, PHV, branşlar, paketler, franchise, SSS, robot aksiyonları ve system prompt buradan beslenir.

---

## 2. NEEBCHAT BÖLÜMÜ — TAM AÇIKLAMA

**NeebChat**, YİSA-S web sitesindeki akıllı asistanın (YİSA-S Robotu) adıdır. Ziyaretçilerin sorularını yanıtlayan, demo / fiyat / franchise / iletişim gibi aksiyonlara yönlendiren, her sayfada sağ altta sabit duran sohbet arayüzüdür.

### 2.1 NeebChat’in Konumu ve Amacı

NeebChat, sitede **her sayfada** yer alır. `app/layout.tsx` içinde root layout’a `<ChatWidget />` olarak eklenmiştir; bu bileşen aslında NeebChat arayüzünü taşır. Amaç:

- Ziyaretçiye anında, Türkçe ve YİSA-S’e özel bilgi vermek.
- “YİSA-S nedir?”, “900 alan ne demek?”, “PHV nedir?”, “Hangi paket bana uygun?”, “Franchise nasıl alınır?”, “Demo alabilir miyim?” gibi soruları yanıtlamak.
- Kullanıcıyı tek tıkla ilgili sayfaya (özellikler, fiyatlandırma, franchise, demo, iletişim) yönlendirmek.
- Konuşmaları oturum bazlı saklayıp raporlama ve iyileştirme için kullanmak.

NeebChat, tek bir “chat” ürünü olarak düşünüldüğünde hem **frontend (widget)** hem **API (backend)** hem de **veri katmanı (loglama)** ile tarif edilebilir.

### 2.2 NeebChat Arayüzü (ChatWidget)

**Dosya:** `components/robot/ChatWidget.tsx`

- **Tetikleyici:** Sağ alt köşede sabit, amber–turuncu gradient yuvarlak bir buton. Üzerinde bot ikonu vardır; hafif ping animasyonu ile dikkat çeker. Tıklanınca sohbet penceresi açılır.

- **Pencere:** Yaklaşık 350–380px genişlik, 500–550px yükseklik, koyu slate arka plan, blur efektli bir kart. Üstte “YİSA-S Robotu” başlığı, “Çevrimiçi” göstergesi, küçültme ve kapatma butonları vardır.

- **İlk mesaj (karşılama):** Pencere açıldığında tek bir hoş geldin mesajı gösterilir. Metin, `BRAND.name` ve `BRAND.tagline` ile üretilir; örneğin: *“Merhaba! Ben YİSA-S Robotu, Türkiye’de öncü çocuk sporcu analiz sisteminin asistanıyım. Size nasıl yardımcı olabilirim?”*

- **Hızlı aksiyonlar (quick actions):** Bu ilk mesajın altında şu butonlar yer alır (içerik `ROBOT_ACTIONS.quick` ile gelir):
  - Özellikler → `/ozellikler`
  - Fiyatlar → `/fiyatlandirma`
  - Franchise → `/franchise`
  - Demo Talep Et → `/demo`
  - İletişim → `/hakkimizda#iletisim`

- **Öneri sorular (suggestions):** İlk mesajda ayrıca 3 adet “tıklanabilir soru” gösterilir: “YİSA-S nedir?”, “900 alan ne demek?”, “PHV nedir?” vb. (`ROBOT_ACTIONS.suggestions` listesinden alınır). Bunlara tıklanınca otomatik olarak o metin kullanıcı mesajı gibi gönderilir.

- **Mesajlaşma:**
  - Kullanıcı mesajları sağda, amber kutucukta; asistan mesajları solda, koyu slate kutucukta.
  - Her mesajda küçük avatar (User / Bot ikonu) vardır.
  - Asistan cevabından sonra API’den dönen **actions** ve **suggestions** varsa, mesajın altında butonlar olarak gösterilir. Aksiyonlara tıklanınca `action.url`’e gidilir; öneri metinlerine tıklanınca yine otomatik gönderim yapılır.

- **Yükleme:** Mesaj gönderildiğinde “typing” göstergesi (üç nokta animasyonu) çıkar; cevap gelene kadar input devre dışı kalır.

- **Oturum (session):** Tarayıcıda `localStorage` anahtarı `yisa_robot_session` ile bir UUID tutulur. İlk girişte yoksa `crypto.randomUUID()` ile üretilir ve saklanır. Aynı session_id tüm isteklerde API’ye gönderilir; böylece konuşma ve loglar oturum bazlı ilişkilendirilir.

- **Küçültme:** Pencere açıkken “minimize” ile sadece başlık çubuğu kalacak şekilde küçültülebilir; mesaj alanı ve input gizlenir.

Tüm bu davranışlar, NeebChat’in **kullanıcıya görünen** tarafını oluşturur.

### 2.3 NeebChat API (Robot Chat Route)

**Dosya:** `app/api/robot/chat/route.ts`

- **Method:** POST. Body’de `message` ve `session_id` zorunludur; `context`, `page_url` ve isteğe bağlı `conversation_history` gönderilebilir.

- **Akış:**
  1. Body parse edilir; `message` ve `session_id` yoksa 400 dönülür.
  2. `conversation_history` varsa mesaj listesi oluşturulur, en sona kullanıcının yeni `message`’ı eklenir.
  3. **Anthropic SDK** ile `claude-sonnet-4-20250514` modeline istek atılır. `ROBOT_SYSTEM_PROMPT` system prompt olarak verilir; mesajlar `messages` dizisi ile gönderilir.
  4. Model cevabı metin olarak gelir; bu metin **JSON** blok içerecek şekilde prompt’ta yönlendirilmiştir. `parseAIResponse` ile metin içinden `{ ... }` regex ile bulunup parse edilir. Beklenen yapı:
     - `message`: Cevap metni
     - `actions`: `[{ type, label, url }]` dizisi
     - `suggestions`: Öneri soru dizisi
  5. Parse hata verirse varsayılan bir cevap ve varsayılan aksiyonlar (demo, iletişim) atanır.
  6. **Supabase** üzerinden `robot_chat_logs` tablosuna bir satır eklenir: `session_id`, `user_message`, `robot_response`, `ai_model`, `tokens_used`, `response_time_ms`, `context`, `page_url`, `actions_suggested`.
  7. İstek başarılıysa 200 ile birlikte `message`, `actions`, `suggestions` (ve meta bilgiler) döndürülür; hata durumunda 500 ve kullanıcıya gösterilecek kısa bir hata mesajı + iletişim aksiyonu döner.

GET ile çağrıldığında sadece servis adı ve sürüm bilgisi döner (`status: 'ok'`, `service: 'yisa-s-robot'`, `version: '2.0.0'`).

Bu API, NeebChat’in **beyin ve kayıt** tarafını oluşturur: Claude ile cevap üretimi ve her etkileşimin veritabanına yazılması.

### 2.4 NeebChat ve Bilgi Bankası (System Prompt)

**Dosya:** `lib/knowledge/yisas.ts` → `ROBOT_SYSTEM_PROMPT`

NeebChat’in “ne söyleyeceği” tamamen bu prompt ile belirlenir. Prompt’ta özetle şunlar tanımlıdır:

- **Kimlik:** YİSA-S Robot; görevi ziyaretçiye yardım, bilgi verme, demo/iletişim yönlendirme. Ton: profesyonel, samimi, yardımsever. Dil: Türkçe.

- **Bilgi bankası özeti:**
  - 900 alan: 30 ana kategori × 30 alt alan.
  - 6 AI motoru: Claude (derin analiz), GPT (hızlı iletişim), Gemini (görsel analiz), LLaMA (hassas veri, on-premise), Together (ekonomik işlem), Ollama (lokal).
  - PHV: Peak Height Velocity, büyüme plağı koruması, sakatlık önleme.
  - 10 branş: Artistik / Ritmik Jimnastik, Trampolin, Aerobik, Akrobatik, Parkur, TeamGym, Tumbling, Fitness, Genel Spor.

- **Fiyatlandırma tablosu:** Starter (₺2.500/ay, 50 sporcu), Professional (₺7.500/ay, 250 sporcu), Enterprise (₺15.000/ay, sınırsız), Franchise (₺50.000 giriş + ₺15.000/ay, bölgesel tekel).

- **Davranış kuralları:** Kısa cevap (3–4 paragraf üst sınır), her cevapta aksiyon önerme, demo veya iletişime yönlendirme.

- **Çıktı formatı:** Yanıtın mutlaka bir JSON objesi içermesi; bu objede `message`, `actions`, `suggestions` alanları.

NeebChat’in “NeebChat bölümü” denildiğinde, hem widget’ın bu prompt’a dayanarak konuşması hem de tüm bu bilgi setinin tek yerden yönetilmesi kastedilir.

### 2.5 NeebChat Veri Tarafı (Supabase)

**Tablo:** `robot_chat_logs` (tanım: `supabase.sql`)

Her NeebChat konuşma turu isteğe bağlı olarak loglanır. Kaydedilen alanlar özetle:

- `session_id`, `user_message`, `robot_response`, `ai_model`, `tokens_used`, `response_time_ms`
- `context` (örn. “website”), `page_url`
- `actions_suggested` (JSONB)
- İleride kullanım için `tenant_id`, `branch_id`, `action_taken`, `lead_converted`, `ip_hash`, `user_agent` gibi alanlar da şemada tanımlıdır.

RLS açık; anonim kullanıcı insert yapabilir, okuma sadece authenticated kullanıcılaradır (admin paneli için). Böylece NeebChat hem anında yardım sağlar hem de konuşma verisini raporlama ve iyileştirme için saklar.

### 2.6 NeebChat’i Özetleyen Cümleler

- NeebChat, YİSA-S sitesindeki **her sayfada** açılan, **YİSA-S Robotu** kimliğiyle çalışan **akıllı sohbet** arayüzüdür.
- **Claude (Sonnet 4)** ile çalışır; cevaplar **Türkçe**, **kısa** ve **aksiyon odaklı**dır.
- **Hızlı aksiyonlar** ve **öneri sorular** ile kullanıcıyı demo, fiyat, franchise ve iletişim sayfalarına yönlendirir.
- **Oturum** tarayıcıda `localStorage` ile tutulur; **her konuşma** isterse `robot_chat_logs` üzerinden Supabase’e yazılır.
- Tüm **bilgi ve davranış kuralları** `lib/knowledge/yisas.ts` içindeki `ROBOT_SYSTEM_PROMPT` ve ilgili sabitlerle yönetilir; tek kaynak (single source of truth) prensibi burada da geçerlidir.

Bu metin, “NeebChat bölümü”nü tek bir yerden, baştan sona okuyabileceğiniz **tam açıklama** olarak bir araya getirir. İsterseniz bu belgeyi “tüm sistem + NeebChat konuşmasının yazıya dökülmüş hali” olarak kullanabilirsiniz.
