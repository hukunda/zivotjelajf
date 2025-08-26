# 🎵 Music Player Demo & Usage Guide

## Jak vypadá Music Player

Sticky music player se zobrazí v dolní části webu a obsahuje:

### 🎨 Vizuální design
- **Tmavý gradient** pozadí (matching s tématem)
- **Červený accent** border (#ff4444)
- **Album artwork** thumbnail (pokud je nastaven)
- **Track info** s názvem skladby a umělce
- **Smooth animations** při show/hide

### 🎛️ Ovládací prvky
- **Play/Pause** tlačítko (hlavní červené)
- **Previous/Next** track buttony
- **Progress bar** s časem
- **Volume slider** s ikonami
- **Close button** (✕)

### 📱 Responsive chování
- **Desktop:** Horizontální layout s plnými controls
- **Mobile:** Vertikální stacking, skryté volume controls
- **Auto-adjust** body padding při zobrazení

## 🔧 Nastavení pro non-codery

### Jednoduché admin rozhraní

V `Vzhled` → `Music Player` najdete:

#### ✅ Checkbox aktivace
```
☑ Zobrazit music player na webu
```

#### 🎵 Dropdown výběr služby
```
Typ služby: [Bandcamp ▼]
           [SoundCloud]
           [Spotify]
           [YouTube]
           [Custom HTML]
```

#### 📝 Textové pole pro embed
```
URL / Embed kód:
┌─────────────────────────────────────────┐
│ <iframe src="https://bandcamp.com/..."> │
│                                         │
└─────────────────────────────────────────┘
```

#### 📋 Metadata formulář
```
Název skladby:  [Get LAJF               ]
Umělec/Kapela:  [ACID ROW              ]
Obrázek alba:   [https://example.com/...] (volitelné)
```

#### ⚡ Auto-play nastavení
```
☐ Automaticky spustit přehrávání
```

### 👁️ Live preview
Admin stránka zobrazuje **náhled přehrávače** v reálném čase:

```
┌─────────────────────────────────────────┐
│ Náhled přehrávače:                      │
│                                         │
│ [🎵] GET LAJF                          │
│      ACID ROW                          │
│                                         │
│ [Bandcamp player embed zde]            │
└─────────────────────────────────────────┘
```

## 🎯 Příklady použití

### 🎸 Pro kapelu
```
Název skladby: "Stoner's Paradise"
Umělec: "ACID ROW"
Typ: Bandcamp
Embed: <iframe z Bandcamp share>
```

### 🎤 Pro management
```
Název skladby: "Best of Život je lajf"
Umělec: "Various Artists"
Typ: Spotify
Embed: <iframe z Spotify playlist>
```

### 📻 Pro promo
```
Název skladby: "Latest Release"
Umělec: "KAPELA PIVÍČKO"
Typ: SoundCloud
Embed: <iframe z SoundCloud track>
```

## 🖱️ Uživatelské ovládání

### Pro návštěvníky webu:

#### 🎵 Floating button
- **Pozice:** Vpravo dole
- **Akce:** Klik → otevře/zavře player
- **Design:** Červené kolečko s music ikonou

#### ⌨️ Klávesové zkratky
- `Mezerník` → Play/Pause (když není focus v input poli)
- `Escape` → Zavře player
- `Klik na track info` → Pokus o přesměrování na band page

#### 📱 Touch gestures
- **Mobile swipe** možnosti (budoucí rozšíření)
- **Tap na progress bar** → Skip to position
- **Tap na volume** → Mute/unmute

## ⚙️ Technické detaily

### 🔌 Podporované platformy

#### ✅ Bandcamp
- **Format:** Plný iframe embed kód
- **Features:** Nativní Bandcamp player
- **Best for:** Albums, EPs, single tracks

#### ✅ SoundCloud
- **Format:** SoundCloud embed iframe
- **Features:** Waveform, sharing options
- **Best for:** Singles, remixes, demos

#### ✅ Spotify
- **Format:** Spotify embed iframe
- **Features:** Track/album/playlist embeds
- **Best for:** Playlists, released albums

#### ✅ YouTube
- **Format:** URL nebo embed iframe
- **Features:** Video player (audio focus)
- **Best for:** Music videos, live performances

#### ✅ Custom HTML
- **Format:** Jakýkoli HTML/iframe kód
- **Features:** Unlimited flexibility
- **Best for:** Vlastní řešení, jiné platformy

### 🎨 CSS Customization Ready

```css
/* Player color scheme - snadno editovatelné */
.music-player-bar {
    background: linear-gradient(135deg, #1a2332 0%, #0a0f1c 100%);
    border-top: 2px solid #ff4444; /* Accent color */
}

.player-btn.play-pause {
    background-color: #ff4444; /* Main action button */
}
```

### 📊 Performance optimized
- **CSS animations** místo JS where possible
- **Lazy loading** embedded content
- **Minimal DOM** manipulation
- **Mobile-first** responsive approach

## 🚀 Výhody pro "Život je lajf"

### 🎯 Pro business
- **Professional appearance** s music industry standards
- **Increased engagement** díky sticky player
- **Cross-platform promotion** všech hudebních služeb
- **SEO friendly** structured content

### 👥 Pro fanoušky
- **Nepřerušený listening** při browsování webu
- **Snadný access** k hudbě kapel
- **Visual consistency** s brand identity
- **Mobile-optimized** experience

### 🛠️ Pro správu
- **No coding required** pro změny
- **Quick updates** nových releases
- **Multiple platforms** v jednom interface
- **Preview functionality** před publikováním

---

**🎵 Music Player je připraven okamžitě po aktivaci tématu!**

Stačí vyplnit embed kód z vaší oblíbené platformy a máte profesionální music player na webu. 🎸
