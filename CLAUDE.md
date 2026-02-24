# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Workflow Orchestration

### 1. Plan Mode Default
- ANY non-trivial task (3+ adım veya mimari karar) → plan mode'a gir
- Bir şey ters giderse DUR, hemen yeniden planla — körü körüne devam etme
- Plan mode'u sadece build için değil, doğrulama adımları için de kullan
- Belirsizliği azaltmak için detaylı spec'leri önceden yaz

### 2. Subagent Strategy
- Main context window'u temiz tut — subagent'ları cömertçe kullan
- Araştırma, keşif ve paralel analizi subagent'lara yolla
- Karmaşık problemlerde daha fazla compute at — subagent üzerinden
- Her subagent'a tek bir odaklı görev ver

### 3. Self-Improvement Loop
- Kaze'den herhangi bir düzeltme gelirse → `tasks/lessons.md`'ye yaz
- Aynı hatayı tekrar yapmayı engelleyen kurallar yaz
- Bu dersler üzerinde acımasızca iterate et — hata oranı düşene kadar
- Her oturum başında ilgili proje için lessons'ı gözden geçir

### 4. Verification Before Done
- Çalıştığını kanıtlamadan bir görevi tamamlandı olarak işaretleme
- Değişikliklerini main ile diff'le — davranış farkını kontrol et
- Kendine sor: "Bir senior engineer bunu approve eder mi?"
- Test çalıştır, logları kontrol et, doğruluğu göster

### 5. Demand Elegance (Balanced)
- Non-trivial değişikliklerde dur ve sor: "Daha zarif bir yol var mı?"
- Fix hacky hissediyorsa: "Şu an bildiklerimle, zarif çözümü uygula"
- Basit, bariz fix'lerde bunu atla — over-engineer yapma
- Sunmadan önce kendi işini sorgula

### 6. Autonomous Bug Fixing
- Bug raporu geldiğinde direkt fix'le. El tutma bekleme.
- Loglara, hatalara, fail eden testlere bak — sonra çöz
- Kullanıcıdan sıfır context switching gereksin
- Fail eden CI testlerini söylenmeden git düzelt

## Task Management

1. **Plan First:** Planı checkable item'larla `tasks/todo.md`'ye yaz
2. **Verify Plan:** Uygulamaya başlamadan önce check-in yap
3. **Track Progress:** İlerledikçe item'ları tamamlandı olarak işaretle
4. **Explain Changes:** Her adımda high-level özet ver
5. **Document Results:** `tasks/todo.md`'ye review bölümü ekle
6. **Capture Lessons:** Düzeltmelerden sonra `tasks/lessons.md`'yi güncelle

## Core Principles

- **Simplicity First:** Her değişikliği mümkün olduğunca basit yap. Minimal kod etkisi.
- **No Laziness:** Kök nedeni bul. Geçici çözüm yok. Senior developer standartları.
- **Minimal Impact:** Değişiklikler sadece gerekli yerlere dokunmalı. Bug üretmekten kaçın.

---

## Proje Bilgisi

**KazeOS** — Kaze'nin (Kadir Zeyrek, AI Automation Developer) retro-futuristik desktop environment portfolyo sitesi.
**Domain:** kazeai.dev | **Mail:** hey@kazeai.dev
**Durum:** Canlı, tüm veriler şu an statik/hardcoded. Sonraki hedef: Supabase backend + Admin panel.

## Komutlar

```bash
npm run dev      # Dev server → localhost:3000
npm run build    # Production build
npm run lint     # ESLint
npm start        # Production server
```

Test suite yok.

## Mimari

Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, Zustand.

### Sayfalar

Tüm sayfalar `app/` altında, `"use client"` directive ile client component. Oyun içi isimleri farklı:

| Route | Oyun İçi İsim | İçerik |
|---|---|---|
| `/` | Desktop | Ana ekran, ikonlar, terminal, Alba |
| `/skills` | Inventory | RPG envanter formatında skill'ler |
| `/projects` | Quest Log | Projeler RPG görevi formatında |
| `/about` | Research Lab | Blog / teknik yazılar |
| `/research/[id]` | Research Detail | Tekil blog yazısı |
| `/timeline` | Timeline Archives | Kariyer geçmişi |
| `/contact` | Comms Link | İletişim + takvim |

### State Management (Zustand — `store/`)

- **navigationStore** — mevcut section, geçiş durumu
- **diceStore** — D20 zar atma state'i, sonuç (1–20), outcome tipi (`standard`/`criticalSuccess`/`criticalFail`), geçmiş
- **albaStore** — kedi companion: state (`sleeping`/`awake`/`walking`/`purring`/`curious`/`angry`/`eating`), pozisyon, yön (`left`/`right`), mesaj

### Navigasyon Akışı (D20 Dice Sistemi)

Masaüstü ikon/taskbar tıklamalarında TTRPG tarzı zar atılır:
1. `useNavigation()` → `useSkillCheck()` → `diceStore.rollDice()`
2. `D20Dice` component → 3D animasyon, sonuca göre glow/shake
3. `diceStore.completeTransition()` → `router.push()` ile yönlendirme

### Veri Katmanı

Tüm içerikler (blog, projeler, skill'ler, timeline) sayfa/feature component'lerinin içinde hardcoded. API route veya harici veri çekimi yok.

### Temel Dizinler

- `components/features/` — bağımsız feature modüller (alba, dice, inventory, quests, hydroponic)
- `components/layout/` — yapısal shell (DesktopEnvironment, Taskbar, TerminalWindow, DesktopHeader, DesktopIcons)
- `lib/` — paylaşılan utility'ler: `animations.ts` (Framer Motion variant'ları), `constants.ts`, `designTokens.ts`, `utils.ts` (`cn` helper)
- `hooks/` — `useNavigation`, `useSkillCheck`, `useAlbaInteraction`
- `types/` — `alba.ts`, `dice.ts`
- `store/` — Zustand store'ları

### İnteraktif Özellikler

- **Alba Companion** — sürüklenebilir kedi, 7 state, sprite sheet animasyonları, yön takibi
  - **Idle döngüsü:** 5sn hareketsizlik → uyku (10sn) → uyanıp yürüme (5 wander) → tekrar uyku
  - **Yürüme:** `requestAnimationFrame` ile cubic ease-out, 300-600px rastgele mesafe, sprite sheet (4x4, 16 frame, 5fps)
  - **Tıklama:** 1x = mesaj + uzaklaşma, 2x = "Mrrow?", 3x (2sn içinde) = angry (5sn)
  - **Hover:** curious state, ayrılınca awake'e döner
  - **Mama yedirme:** Taskbar'daki DockFoodBowl'a tıkla → kab dolar → Alba kabın yanına yürür → eating state (sprite sheet 3x3, 9 frame, 4fps) → "nom nom" yazısı + mor glow → 3sn yedikten sonra purring + "That was delicious! 😺" → awake
  - **Easter egg:** 3 hızlı tıklama = angry mode, kırmızı aura, "HISSSS! 😾"
- **D20 Dice** — TTRPG temalı sayfa geçişleri, critical success (20) / fail (1) animasyonları
- **Live Terminal** — n8n otomasyon logları (mock)
- **Status Bar** — HYDRO: OPTIMAL, MEM, CPU göstergeleri (mock)

### Alba Dosya Yapısı

```
components/features/alba/
├── AlbaCompanion.tsx    — ana mantık: drag, click, idle cycle, yedirme yürüme
├── AlbaSprite.tsx       — sprite render: static png + walking/eating sprite sheet
├── AlbaBubble.tsx       — konuşma balonu
├── FoodBowl.tsx         — masaüstü mama kabı (fixed, sol alt)
└── DockFoodBowl.tsx     — taskbar mama kabı ikonu (SVG, dolu/boş state)
```

**Veri akışı:** `DesktopEnvironment` → `foodBowlPosition` state → `Taskbar.onFeedAlba` → `AlbaCompanion.foodBowlPosition` prop → yürüme animasyonu tetiklenir

## Design System

`.cursorrules` dosyasından — bu kuralları her zaman uygula:

**Boyutlandırma:**
- Pencereler: `max-w-4xl` veya `max-w-5xl` (asla daha büyük değil)
- Pencere yüksekliği: `max-h-[calc(100vh-12rem)] md:max-h-[75vh]`
- Pencere header: `h-10`, `px-3 py-2`
- Pencerelerde `h-screen` veya `h-full` KULLANMA

**Tipografi:**
- H1: `text-lg md:text-xl`, H2: `text-base md:text-lg`, H3: `text-sm`
- Body: `text-xs`, küçük: `text-[10px]`, çok küçük: `text-[9px]`
- Pencere başlıkları: `text-sm font-bold tracking-[0.1em]`
- `text-xl`'i asla aşma

**Boşluklar:**
- Pencere body: `p-3 md:p-4` — `p-4`'ten büyük padding KULLANMA
- Panel: `p-2 md:p-3`
- Öğe arası: `gap-2` veya `gap-1.5`; bölüm arası: `gap-3 md:gap-4`

**Renkler:**
- Primary: `#25f4f4` (`text-primary`)
- Background: `#102222` (`bg-background-dark`)
- Surface: `#152a2a` (`bg-surface-dark`)

**Layout kalıpları:**
- Kaydırılabilir container: `flex-1 overflow-y-auto min-h-0`
- Flex container'larda taşmayı önlemek için her zaman `min-h-0` ekle
- Sabit boyut: `flex-shrink-0`

**Responsive:** mobile-first, `md:` breakpoint 768px; padding her zaman responsive (ör. `p-2 md:p-3`)

**Path alias:** `@/*` → proje kökü (ör. `@/components/...`, `@/store/...`)

## Kod Stili

- 2 boşluk girinti
- Çift tırnak (double quotes)
- Her zaman noktalı virgül
- Satır max 80 karakter
- Strict TypeScript

## Planlanan: Supabase Entegrasyonu + Admin Panel

> Bu plan henüz uygulanmadı. Detay: `~/claude-assistant/memory/projects/kazeai-supabase-plan.md`

**Hedef:** Hardcoded veriler → Supabase DB. `admin.kazeai.dev` subdomain üzerinden admin panel. Aynı Next.js repo, tek deployment.

**Tablolar:** `quests`, `inventory_items`, `experiences`, `blog_posts` — RLS: public SELECT, authenticated ALL.

**Yeni eklenecek dosya yapısı:**
```
lib/supabase/          — client.ts, server.ts, types.ts, queries/
middleware.ts           — subdomain routing + auth guard
app/(admin)/admin/     — dashboard, login, CRUD sayfaları
components/admin/      — AdminShell, DataTable, form component'leri
scripts/seed.ts        — hardcoded veriyi Supabase'e yükle
```

**Değişecek mevcut dosyalar:**
- Sayfa component'leri → `"use client"` kaldırılıp server fetch'e geçilecek
- Feature component'ler (QuestLogWindow, InventoryWindow) → prop olarak veri alacak, hardcoded array kaldırılacak
- `next.config.js` → `images.remotePatterns` eklenecek

**Gerekli paketler:** `@supabase/supabase-js`, `@supabase/ssr`

**Env değişkenleri:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
