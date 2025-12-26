# KazeOS Design System

## Genel Bakış

KazeOS, retro-futuristik bir desktop environment teması kullanan kişisel portfolio sitesidir. Tasarım dili, eski işletim sistemlerinden ilham alırken modern web teknolojileri ile birleştirilmiştir.

## Tasarım Prensipleri

### 1. Kompaktlık
- Window'lar ekranın %75'inden fazla yer kaplamamalı
- Padding ve spacing değerleri minimal tutulmalı
- Font size'lar küçük ve okunabilir olmalı

### 2. Retro-Futuristik Estetik
- Koyu arka plan (#102222, #102323)
- Neon cyan accent renkler (#25f4f4 - primary)
- Grid pattern arka planlar
- CRT scanline efektleri
- Terminal-style mesajlar

### 3. Responsive Yaklaşım
- Mobile-first tasarım
- `max-h-[calc(100vh-12rem)]` pattern'i kullanılmalı
- `min-h-0` ve `flex-shrink-0` ile overflow kontrolü
- Padding'ler responsive: `p-2 md:p-3` veya `p-3 md:p-4`

## Window Boyutları

### Standart Window Ölçüleri
```css
/* Inventory & Quest Log */
max-w-4xl (veya max-w-5xl)
max-h-[calc(100vh-12rem)] md:max-h-[75vh]

/* About & Contact */
max-w-4xl (veya max-w-2xl)
max-h-[calc(100vh-12rem)] md:max-h-[80vh]
```

### Window Header
- Height: `h-10` (40px)
- Padding: `px-3 py-2`
- Font size: `text-sm` (14px)
- Icon size: `16px`

## Typography Scale

### Başlıklar
- H1: `text-lg md:text-xl` (18px/20px)
- H2: `text-base md:text-lg` (16px/18px)
- H3: `text-sm` (14px)
- Window Title: `text-sm font-bold tracking-[0.1em]`

### Body Text
- Normal: `text-xs` (12px)
- Small: `text-[10px]` (10px)
- Tiny: `text-[9px]` (9px)

### Mono Font
- Terminal/Code: `font-mono text-xs` veya `text-[10px]`

## Spacing System

### Padding
- Window Header: `px-3 py-2`
- Window Body: `p-3 md:p-4`
- Panel Sections: `p-2 md:p-3`
- Compact Sections: `p-1.5`

### Gaps
- Between sections: `gap-3 md:gap-4`
- Between items: `gap-2` veya `gap-1.5`
- Grid gaps: `gap-2`

### Margins
- Section spacing: `space-y-2` veya `space-y-1.5`
- Top margins: `mt-2` veya `mt-1.5`

## Icon Sizes

- Window Header: `16px`
- Section Headers: `14px`
- Buttons: `12px` - `16px`
- Large Display: `40px` - `48px`
- Avatar: `40px` (mobile), `48px` (desktop)

## Color Palette

### Primary Colors
- Primary (Cyan): `#25f4f4` - `text-primary`
- Background Dark: `#102222` - `bg-background-dark`
- Background Light: `#f5f8f8` - `bg-background-light`
- Surface Dark: `#152a2a` - `bg-surface-dark`

### Accent Colors
- n8n Red: `#ff6d5a` - `text-n8n`
- Green: `#4ade80` - `text-green-400`
- Purple: `#cba6f7` - `text-[#cba6f7]`
- Yellow: `#f9e2af` - `text-[#f9e2af]`

### Status Colors
- Success: `text-green-400`
- Error: `text-red-400`
- Warning: `text-yellow-400`

## Component Patterns

### Window Structure
```tsx
<div className="relative flex flex-col w-full max-w-4xl max-h-[calc(100vh-12rem)] md:max-h-[75vh] bg-[#102323]/95 backdrop-blur-md border border-primary/30 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
  {/* Header */}
  <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-[#162a2a] to-[#102323] border-b border-primary/20">
    {/* Header content */}
  </div>
  
  {/* Body */}
  <div className="flex flex-1 overflow-hidden flex-col md:flex-row min-h-0 max-h-full">
    {/* Content */}
  </div>
  
  {/* Footer (optional) */}
</div>
```

### Scrollable Containers
```tsx
<div className="flex-1 overflow-y-auto p-2 md:p-3 min-h-0">
  {/* Scrollable content */}
</div>
```

### Character Avatar
```tsx
<div className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary shadow-[0_0_20px_rgba(37,244,244,0.2)] flex items-center justify-center">
  <Icon name="person" className="text-primary" size={40} />
</div>
```

### Item Cards
```tsx
<div className="flex flex-col gap-2 p-2 rounded-lg bg-[#162a2a] border border-white/5 cursor-pointer">
  <div className="w-full aspect-square bg-[#0f1919] rounded border border-white/5 flex items-center justify-center p-4">
    <Icon name="icon" className="text-primary" size={40} />
  </div>
  <div className="px-1">
    <p className="text-white text-sm font-medium truncate">Name</p>
    <p className="text-gray-400 text-xs truncate">Description</p>
  </div>
</div>
```

## Animation Guidelines

### Transitions
- Standard: `transition-all duration-200`
- Hover: `hover:bg-white/10 hover:border-primary/50`
- Scale: `group-hover:scale-105`

### Dice Roll
- Size: `80px` (w-20 h-20)
- Animation duration: `1.5s`
- Overlay: Dark background with grid pattern

## Responsive Breakpoints

- Mobile: Default (no prefix)
- Tablet: `md:` (768px+)
- Desktop: `lg:` (1024px+)

## Do's and Don'ts

### ✅ DO
- Kullan `max-h-[calc(100vh-12rem)]` pattern'i
- Küçük padding'ler kullan (`p-2`, `p-3`)
- Font size'ları küçük tut (`text-xs`, `text-sm`)
- `min-h-0` kullan flex container'larda
- `flex-shrink-0` kullan sabit boyutlu elementlerde

### ❌ DON'T
- Window'ları çok büyük yapma (`max-w-5xl` üzeri)
- Padding'leri fazla kullanma (`p-6` üzeri)
- Font size'ları büyük yapma (`text-2xl` üzeri)
- `h-screen` veya `h-full` kullanma window'larda
- Overflow kontrolü olmadan scroll ekleme

## Referans Görseller

Tasarım dili, kullanıcının sağladığı referans görsellere göre şekillendirilmiştir:
- Kompakt window'lar
- Minimal padding
- Küçük font size'lar
- Retro-futuristik renk paleti
- Desktop environment UI pattern'leri

