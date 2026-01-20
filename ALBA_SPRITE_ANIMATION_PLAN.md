# Alba Sprite Animasyon Eylem Planı 🐱

## 📊 Araştırma Sonuçları (2026)

### 🎯 En İyi AI Sprite Animasyon Araçları

#### 1. **Ludo.ai** ⭐⭐⭐⭐⭐ (ÖNERİLEN)
- **URL**: https://ludo.ai/features/sprite-generator
- **Özellikler**:
  - Statik PNG'den animasyonlu sprite sheet oluşturma
  - "Animate Sprite" workflow'u ile walking cycle oluşturma
  - Text prompt ile animasyon kontrolü
  - Transparent PNG export
  - Game-ready sprite sheet formatı
- **Kullanım**: Upload PNG → "Animate Sprite" → "Walk/Run (Right Facing)" → Generate
- **Fiyat**: Ücretsiz deneme, sonra ücretli

#### 2. **Pixelcut.ai** ⭐⭐⭐⭐
- **URL**: https://www.pixelcut.ai/create/walking-animation-pixel-art-generator
- **Özellikler**:
  - PNG'den walking cycle oluşturma
  - Text prompt ile animasyon tanımlama
  - High-resolution MP4 veya PNG sprite sheet export
  - Side-view karakterler için optimize
- **Kullanım**: Upload PNG → Describe animation → Generate → Download
- **Fiyat**: Ücretsiz deneme, sonra ücretli

#### 3. **Komiko.app** ⭐⭐⭐⭐
- **URL**: https://komiko.app/playground/ai-sprite-sheet-generator
- **Özellikler**:
  - Fotoğrafı sprite sheet'e dönüştürme
  - Otomatik walk/idle/run frame'leri
  - Platformer ve RPG için optimize
  - Ücretsiz başlangıç
- **Kullanım**: Upload image → Select style → Generate → Download

#### 4. **Rosebud.ai** ⭐⭐⭐
- **URL**: https://rosebud.ai/sprites-animation
- **Özellikler**:
  - AI ile sprite animasyon oluşturma
  - Text prompt ile kontrol
  - Run, jump, attack animasyonları
  - Transparent background desteği

#### 5. **PixelLab.ai** ⭐⭐⭐
- **URL**: https://www.pixellab.ai/
- **Özellikler**:
  - Skeleton-based animation
  - Text prompt ile animasyon
  - One-click animations
  - 4 & 8 directional views

#### 6. **Spriteful.io** ⭐⭐⭐
- **URL**: https://www.spriteful.io/
- **Özellikler**:
  - Character reference'dan sprite sheet
  - Walk cycle generation
  - HD quality
  - Game engine desteği

---

## 🎬 Eylem Planı: Alba Walking Animation

### **ADIM 1: Hazırlık** 📦

1. **Mevcut Sprite'ları Kontrol Et**
   - ✅ `alba-walking.png` (mevcut)
   - ✅ `alba-walking-2.png` (mevcut)
   - ✅ Diğer state sprite'ları (sitting, sleeping, etc.)

2. **Hangi Sprite'ı Kullanacağız?**
   - **Öneri**: `alba-walking.png` veya `alba-sitting.png` (en net olanı)
   - Side-view (yan görünüm) tercih edilir (walking animasyonu için)

3. **Sprite Özelliklerini Not Et**
   - Boyut: 128x128px (mevcut)
   - Format: PNG (transparent background)
   - Stil: Pixel art / retro

---

### **ADIM 2: AI Tool ile Sprite Sheet Oluşturma** 🤖

#### **Seçenek A: Ludo.ai (ÖNERİLEN)** ⭐

1. **Siteye Git**: https://ludo.ai/features/sprite-generator
2. **"Animate Sprite" Tab'ına Tıkla**
3. **Upload Yap**:
   - `alba-walking.png` veya `alba-sitting.png` dosyasını yükle
4. **Pose Ayarla** (gerekirse):
   - "Change Pose" → "Walk / Run (Right Facing)" seç
5. **Animasyon Tanımla**:
   - Prompt: `"Create a smooth walking cycle with 8 frames, side view, pixel art style"`
   - Veya: `"walking cycle, 8 frames, facing right"`
6. **Generate'e Bas**
7. **Sonucu İncele**:
   - 8 frame'lik walking cycle olmalı
   - Sprite sheet formatında (horizontal veya grid)
8. **Export Et**:
   - "Sprite Sheet Export" → PNG formatında indir
   - Transparent background seçeneğini aktif et

#### **Seçenek B: Pixelcut.ai (Alternatif)**

1. **Siteye Git**: https://www.pixelcut.ai/create/walking-animation-pixel-art-generator
2. **Upload Character Image**: `alba-walking.png`
3. **Prompt Yaz**:
   ```
   Create a 8-frame walking cycle animation, side view, 
   pixel art style, smooth movement, transparent background
   ```
4. **Generate'e Bas**
5. **Download**: MP4 veya PNG sprite sheet olarak indir

#### **Seçenek C: Komiko.app (Ücretsiz Alternatif)**

1. **Siteye Git**: https://komiko.app/playground/ai-sprite-sheet-generator
2. **Upload Image**: Alba sprite'ını yükle
3. **Style Seç**: "Sprite Sheet" veya "Pixel Art"
4. **Generate**
5. **Download**: Sprite sheet PNG

---

### **ADIM 3: Sprite Sheet'i Projeye Entegre Etme** 💻

#### **3.1. Dosya Yapısı**

```
public/sprites/alba/
  ├── alba-walking-sheet.png  (YENİ - 8 frame sprite sheet)
  ├── alba-walking-1.png      (Opsiyonel - individual frames)
  ├── alba-walking-2.png
  ├── ...
  └── alba-walking-8.png
```

#### **3.2. Sprite Sheet Formatı**

**Seçenek 1: Horizontal Sprite Sheet** (Önerilen)
```
[Frame1][Frame2][Frame3][Frame4][Frame5][Frame6][Frame7][Frame8]
```
- Toplam genişlik: 128px × 8 = 1024px
- Yükseklik: 128px
- Her frame: 128×128px

**Seçenek 2: Grid Sprite Sheet**
```
[Frame1][Frame2][Frame3][Frame4]
[Frame5][Frame6][Frame7][Frame8]
```
- 4 sütun × 2 satır
- Her frame: 128×128px

#### **3.3. Kod Entegrasyonu**

**Yeni Component: `AlbaWalkingSprite.tsx`**

```typescript
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface AlbaWalkingSpriteProps {
  isWalking: boolean;
  speed?: number; // frames per second
}

export function AlbaWalkingSprite({ 
  isWalking, 
  speed = 8 
}: AlbaWalkingSpriteProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const totalFrames = 8; // Sprite sheet'teki frame sayısı
  const frameWidth = 128; // Her frame'in genişliği
  const frameHeight = 128; // Her frame'in yüksekliği

  useEffect(() => {
    if (!isWalking) {
      setCurrentFrame(0); // İlk frame'e dön
      return;
    }

    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % totalFrames);
    }, 1000 / speed); // speed FPS'ye göre interval

    return () => clearInterval(interval);
  }, [isWalking, speed, totalFrames]);

  // Sprite sheet'ten frame pozisyonunu hesapla
  const backgroundPosition = `-${currentFrame * frameWidth}px 0`;

  return (
    <div
      className="relative w-32 h-32 overflow-hidden"
      style={{
        imageRendering: "pixelated",
      }}
    >
      <Image
        src="/sprites/alba/alba-walking-sheet.png"
        alt="Alba walking"
        width={frameWidth * totalFrames}
        height={frameHeight}
        className="w-full h-full object-none"
        style={{
          objectPosition: backgroundPosition,
          imageRendering: "pixelated",
        }}
        unoptimized
      />
    </div>
  );
}
```

**`AlbaSprite.tsx` Güncellemesi:**

```typescript
// AlbaSprite.tsx içinde
import { AlbaWalkingSprite } from "./AlbaWalkingSprite";

// getSpriteFile() fonksiyonunu güncelle:
case "walking":
  return <AlbaWalkingSprite isWalking={true} speed={8} />;
```

---

### **ADIM 4: Test ve Optimizasyon** 🧪

1. **Frame Rate Testi**:
   - Speed: 6-12 FPS arası test et
   - En doğal görünen hızı seç

2. **Performance Kontrolü**:
   - Chrome DevTools → Performance tab
   - Frame rate 60 FPS'de kalmalı
   - Memory leak kontrolü

3. **Görsel Kalite**:
   - Pixelated rendering doğru çalışıyor mu?
   - Transparent background korunuyor mu?
   - Frame geçişleri smooth mu?

---

## 🎯 Önerilen Workflow (En Hızlı Yol)

### **Hızlı Başlangıç (30 dakika)**

1. ✅ **Ludo.ai'ye git** → https://ludo.ai/features/sprite-generator
2. ✅ **"Animate Sprite" tab'ına tıkla**
3. ✅ **`alba-walking.png` yükle**
4. ✅ **Pose: "Walk / Run (Right Facing)" seç**
5. ✅ **Prompt: `"8 frame walking cycle, smooth animation"`**
6. ✅ **Generate → Download PNG sprite sheet**
7. ✅ **Dosyayı `public/sprites/alba/alba-walking-sheet.png` olarak kaydet**
8. ✅ **`AlbaWalkingSprite.tsx` component'ini oluştur** (yukarıdaki kod)
9. ✅ **`AlbaSprite.tsx`'i güncelle** (walking case'inde yeni component'i kullan)
10. ✅ **Test et!**

---

## 📝 Notlar ve İpuçları

### **Sprite Sheet Oluştururken:**
- ✅ **8 frame** ideal (4 frame çok az, 12+ gereksiz)
- ✅ **Side view** (yan görünüm) walking için en iyi
- ✅ **Transparent background** şart
- ✅ **128×128px** frame size koru (mevcut sprite'larla uyumlu)

### **Kod Entegrasyonunda:**
- ✅ `imageRendering: "pixelated"` kullan (pixel art için)
- ✅ `unoptimized` prop'u Next.js Image'de kullan (sprite sheet için)
- ✅ Frame rate'i 6-10 FPS arası tut (çok hızlı olmasın)

### **Alternatif Yaklaşım (Individual Frames):**
Eğer sprite sheet yerine ayrı frame'ler istersen:
- AI tool'dan 8 ayrı PNG indir
- `alba-walking-1.png` ... `alba-walking-8.png` olarak kaydet
- Component'te frame array'i kullan:
```typescript
const frames = Array.from({ length: 8 }, (_, i) => 
  `/sprites/alba/alba-walking-${i + 1}.png`
);
```

---

## 🚀 Sonuç

**En Hızlı Yol**: Ludo.ai → Upload → Generate → Download → Integrate

**Tahmini Süre**: 
- AI tool ile sprite sheet oluşturma: 5-10 dakika
- Kod entegrasyonu: 15-20 dakika
- Test ve optimizasyon: 10 dakika
- **Toplam: ~30-40 dakika**

**Maliyet**: 
- Ludo.ai: Ücretsiz deneme (sonra ~$10-20/ay)
- Pixelcut.ai: Ücretsiz deneme
- Komiko.app: Ücretsiz başlangıç

---

## 📚 Referanslar

- Ludo.ai Docs: https://ludo.ai/docs/sprite-generator
- React Sprite Animation: https://github.com/danilosetra/react-responsive-spritesheet
- Sprite Sheet Best Practices: https://www.codeandweb.com/texturepacker/tutorials/how-to-create-a-sprite-sheet

---

**Hazırlayan**: AI Assistant  
**Tarih**: 2026  
**Versiyon**: 1.0
