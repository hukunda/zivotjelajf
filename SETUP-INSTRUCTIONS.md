# Život je lajf - WordPress Website Setup Instructions

Tento dokument obsahuje kompletní návod pro instalaci a nastavení webových stránek "Život je lajf" pro management hudebních kapel.

## 📋 Požadavky

Před instalací se ujistěte, že máte:
- WordPress 6.0 nebo novější
- PHP 7.4 nebo novější
- MySQL 5.6 nebo novější
- Přístup k administraci WordPress webu
- FTP/SFTP přístup nebo možnost nahrávat soubory

## 🚀 Krok 1: Instalace tématu

### Nahrání souborů tématu

1. **Přes WordPress administraci:**
   - Přejděte na `Vzhled` → `Témata`
   - Klikněte na `Přidat nové` → `Nahrát téma`
   - Vyberte ZIP soubor s tématem a klikněte `Instalovat nyní`
   - Po instalaci klikněte `Aktivovat`

2. **Přes FTP:**
   - Nahrajte složku `zivot-je-lajf-theme` do `/wp-content/themes/`
   - V administraci WordPress jděte na `Vzhled` → `Témata`
   - Najděte "Život je lajf" a klikněte `Aktivovat`

## 🔧 Krok 2: Instalace potřebných pluginů

### Povinné pluginy

1. **WooCommerce** (pro prodej vinylů)
   - Jděte na `Pluginy` → `Přidat nový`
   - Vyhledejte "WooCommerce"
   - Klikněte `Instalovat nyní` a poté `Aktivovat`

### Custom plugin pro Google Calendar

1. **Nahrání pluginu:**
   - Nahrajte složku `zivot-google-calendar` do `/wp-content/plugins/`
   - V administraci jděte na `Pluginy`
   - Najděte "Život je lajf - Google Calendar Sync" a klikněte `Aktivovat`

## 📄 Krok 3: Vytvoření stránek

### Vytvoření hlavních stránek

1. **Přejděte na `Stránky` → `Přidat novou` a vytvořte následující stránky:**

   - **Hlavní stránka**
     - Název: "Domů"
     - Slug: prázdný (bude automaticky "domu")
     - Obsah: můžete nechat prázdný

   - **O ŽIVOTĚ**
     - Název: "O ŽIVOTĚ"
     - Slug: `o-zivote`
     - Obsah: váš text o společnosti

   - **KONCERTY**
     - Název: "KONCERTY"
     - Slug: `koncerty`
     - Obsah: můžete nechat prázdný

   - **O KAPELÁCH**
     - Název: "O KAPELÁCH"
     - Slug: `kapely`
     - Obsah: můžete nechat prázdný

   - **O VINYLECH**
     - Název: "O VINYLECH"
     - Slug: `vinyly`
     - Obsah: můžete nechat prázdný

### Nastavení hlavní stránky

1. Jděte na `Nastavení` → `Čtení`
2. V sekci "Zobrazení vaší domovské stránky" vyberte "Statická stránka"
3. Jako "Domovská stránka" vyberte stránku "Domů"
4. Klikněte `Uložit změny`

## 🎨 Krok 4: Nastavení tématu

### Customizer nastavení

1. **Jděte na `Vzhled` → `Přizpůsobit`**

2. **Sekce "Nastavení webu":**
   - **Telefon:** `+420 727 273 372`
   - **Email:** `cau@zivotjelajf.com`
   - **Facebook URL:** váš Facebook profil
   - **Instagram URL:** váš Instagram profil
   - **Twitter URL:** váš Twitter profil (volitelné)

3. **Klikněte `Publikovat` pro uložení změn**

## 🛒 Krok 5: Nastavení WooCommerce

### Základní konfigurace

1. **Po aktivaci WooCommerce spusťte průvodce nastavením:**
   - Zadejte informace o obchodě
   - Nastavte měnu na **CZK (Koruny české)**
   - Vyberte platební metody (doporučujeme bankovní převod a dobírku)
   - Nastavte dopravu

2. **Nastavení produktů:**
   - Jděte na `WooCommerce` → `Nastavení` → `Produkty`
   - V záložce "Obecné" nastavte:
     - **Shop Page:** vytvořte novou stránku "Obchod" nebo použijte existující
     - **Přidat do košíku chování:** podle potřeby

3. **Nastavení inventáře:**
   - Zaškrtněte "Povolit správu skladových zásob"
   - Nastavte výchozí stav skladu

### Vytvoření kategorie produktů

1. **Jděte na `Produkty` → `Kategorie`**
2. **Vytvořte kategorii "Vinyly":**
   - Název: `Vinyly`
   - Slug: `vinyly`
   - Popis: `Vinylové desky našich kapel`

## 🗓️ Krok 6: Nastavení Google Calendar Sync

### Získání Google Calendar API přístupu

1. **Jděte na [Google Cloud Console](https://console.cloud.google.com/)**

2. **Vytvořte nový projekt nebo vyberte existující**

3. **Povolte Calendar API:**
   - Jděte na "APIs & Services" → "Library"
   - Vyhledejte "Google Calendar API"
   - Klikněte na něj a stiskněte "Enable"

4. **Vytvořte API klíč:**
   - Jděte na "APIs & Services" → "Credentials"
   - Klikněte "Create credentials" → "API key"
   - Zkopírujte vytvořený API klíč

5. **Získejte Calendar ID:**
   - Otevřete Google Calendar
   - V levém menu klikněte na tři tečky vedle názvu kalendáře
   - Vyberte "Settings and sharing"
   - Zkopírujte "Calendar ID" (v sekci "Integrate calendar")

### Konfigurace v WordPressu

1. **Jděte na `Nastavení` → `Google Calendar`**

2. **Vyplňte:**
   - **Google Calendar API Key:** váš API klíč
   - **Calendar ID:** ID vašeho kalendáře
   - **Automatická synchronizace:** zaškrtněte pro hodinovou synchronizaci

3. **Klikněte `Uložit změny`**

4. **Otestujte synchronizaci:**
   - Klikněte na "Synchronizovat nyní"
   - Zkontrolujte, zda se načetly události

## 🎵 Krok 7: Přidávání obsahu

### Vytvoření kapel

1. **Jděte na `Kapely` → `Přidat novou`**

2. **Vyplňte informace:**
   - **Název:** název kapely (např. "ACID ROW")
   - **Obsah:** dlouhý popis/bio kapely
   - **Náhledový obrázek:** logo nebo foto kapely
   - **Krátký popis:** stručné představení
   - **Booking URL:** odkaz pro booking
   - **Sociální sítě:** odkazy na web, Facebook, Instagram

3. **Publikujte kapelu**

### Vytvoření vinylů

1. **Jděte na `Vinyly` → `Přidat nový`**

2. **Vyplňte informace:**
   - **Název:** název alba/vinylu
   - **Obsah:** popis alba, seznam skladeb, atd.
   - **Náhledový obrázek:** obal alba
   - **Kapela:** vyberte kapelu ze seznamu
   - **Cena:** cena v Kč
   - **Odkazy:** BandCamp, Apple Music, atd.

3. **Publikujte vinyl**

**Poznámka:** Po uložení vinylu se automaticky vytvoří WooCommerce produkt pro prodej.

### Přidání koncertů manuálně

1. **Jděte na `Koncerty` → `Přidat nový`**

2. **Vyplňte informace:**
   - **Název:** název akce/koncertu
   - **Obsah:** popis akce
   - **Datum:** datum koncertu
   - **Od kolika:** čas začátku
   - **Kde ten koncert je:** název místa/venue
   - **Kapela:** vyberte kapelu
   - **Cena:** vstupné (volitelné)
   - **Lupeny:** odkaz na prodej vstupenek
   - **Sociální odkazy:** web, Facebook, Instagram

3. **Publikujte koncert**

### Vytvoření blog příspěvků

1. **Jděte na `Příspěvky` → `Přidat nový`**

2. **Vytvořte příspěvky pro sekci "CO NOVÝHO U ŽIVOTĚ":**
   - Novinky o kapelách
   - Informace o nových albumech
   - Oznámení o koncertech
   - Rozhovory a články

## 📧 Krok 8: Správa email formuláře

### Zobrazení registrací

1. **V administraci najděte menu "Email registrace"**
2. **Zde uvidíte všechny email adresy zaslané přes formulář v patičce**
3. **Automaticky se posílají notifikace na email `cau@zivotjelajf.com`**

## 🎵 Krok 9: Nastavení Music Player

### Konfigurace sticky music player

1. **Jděte na `Vzhled` → `Music Player`**

2. **Základní nastavení:**
   - **Aktivovat přehrávač:** zaškrtněte pro zobrazení playeru
   - **Typ služby:** vyberte podle toho, odkud chcete přehrávat hudbu
   - **Název skladby/Umělec:** vyplňte informace, které se zobrazí
   - **Obrázek alba:** URL obrázku (volitelné)

### Podporované služby

#### 🎵 Bandcamp
1. Jděte na váš Bandcamp album/track
2. Klikněte na "Share / Embed"
3. Zkopírujte celý embed kód `<iframe src="..."></iframe>`
4. Vložte do pole "URL / Embed kód"
5. Nastavte typ na "Bandcamp"

#### 🎵 SoundCloud
1. Jděte na váš SoundCloud track/playlist
2. Klikněte na "Share" → "Embed"
3. Zkopírujte embed kód
4. Vložte do pole a nastavte typ na "SoundCloud"

#### 🎵 Spotify
1. Jděte na Spotify Web Player
2. Najděte váš album/playlist
3. Klikněte na "..." → "Share" → "Embed playlist/album"
4. Zkopírujte embed kód
5. Nastavte typ na "Spotify"

#### 🎵 YouTube
1. Jděte na YouTube video
2. Klikněte na "Share" → "Embed"
3. Zkopírujte embed kód nebo jen URL videa
4. Nastavte typ na "YouTube"

#### 🎵 Custom HTML
- Můžete vložit jakýkoli vlastní HTML/embed kód
- Vhodné pro jiné hudební služby nebo vlastní přehrávače

### Ovládání playeru

**Pro návštěvníky:**
- **🎵 tlačítko (vpravo dole):** otevře/zavře player
- **Play/Pause:** ovládání přehrávání (simulované UI)
- **Progress bar:** zobrazení postupu přehrávání
- **Volume:** ovládání hlasitosti
- **✕ tlačítko:** zavře player
- **Klávesové zkratky:**
  - `Mezerník`: play/pause
  - `Escape`: zavření playeru

**Poznámka:** Kvůli omezením iframe embedů, některé ovládací prvky slouží jako vizuální zpětná vazba. Skutečné ovládání probíhá v embedded přehrávači (Bandcamp, SoundCloud, atd.).

## 🔄 Krok 10: Pravidelná údržba

### Synchronizace Google Calendar

- **Automatická:** Synchronizace probíhá každou hodinu automaticky
- **Manuální:** Klikněte na "Synchronizovat nyní" v `Nastavení` → `Google Calendar`

### Správa objednávek

1. **Jděte na `WooCommerce` → `Objednávky`**
2. **Zde najdete všechny objednávky vinylů:**
   - Nové objednávky
   - Zpracované objednávky
   - Dokončené objednávky

### Správa skladových zásob

1. **Jděte na `Produkty` → `Všechny produkty`**
2. **Aktualizujte skladové zásoby podle potřeby**
3. **Produkty se automaticky označí jako "Vyprodáno" při nulovém skladu**

## 🎨 Krok 10: Přizpůsobení designu

### Změna barev a stylů

Pokud chcete upravit barvy nebo styly, editujte soubor `style.css` v tématu:

```css
/* Primární barva (tlačítka, akcenty) */
--primary-color: #ff4444;

/* Barva pozadí */
--background-color: #0a0f1c;

/* Barva karet */
--card-color: #1a2332;
```

### Nahrazení loga

1. **Jděte na `Vzhled` → `Přizpůsobit` → `Identita webu`**
2. **Nahrajte své logo**
3. **Nebo ponechte textový název "ŽIVOT JE LAJF"**

## 🛠️ Řešení problémů

### Časté problémy

1. **Google Calendar se nesynchronizuje:**
   - Zkontrolujte API klíč
   - Ověřte Calendar ID
   - Ujistěte se, že je kalendář veřejný

2. **Vinyly se nepřidávají do košíku:**
   - Zkontrolujte, zda je WooCommerce aktivní
   - Ověřte, že vinyl má nastavenou cenu
   - Zkontrolujte skladové zásoby

3. **Email formulář nefunguje:**
   - Zkontrolujte nastavení WordPress emailů
   - Ověřte, že server podporuje wp_mail()

4. **Stránky se nezobrazují správně:**
   - Zkontrolujte permalinky v `Nastavení` → `Trvalé odkazy`
   - Zkuste uložit permalinky znovu

### Kontakt na podporu

Pokud máte problémy s instalací nebo nastavením, kontaktujte nás:
- **Email:** cau@zivotjelajf.com
- **Telefon:** +420 727 273 372

## 📚 Dodatečná dokumentace

### 📖 Kompletní sada návodů

**K dispozici máte tyto detailní návody:**

1. **`USER-MANAGEMENT-GUIDE.md`** 
   - Kompletní manuál pro správu obsahu
   - Google Calendar setup
   - E-commerce workflow
   - Music player konfigurace

2. **`IMAGE-USAGE-GUIDE.md`**
   - Jak použít vaše skvělé obrázky
   - Technické specifikace  
   - Brand guidelines based on your artwork
   - Optimalizace pro web

3. **`COMPLETE-WEBSITE-SUMMARY.md`**
   - Přehled všech funkcí
   - Quick start checklist
   - Business workflow návody

### 🎨 Vaše poskytnuté obrázky

**Máte perfektní materiály pro:**
- **ACID ROW:** Černobílé band photos + vinyl artwork
- **OOBBT:** Psychedelic electronic designs
- **KAPELA PIVÍČKO:** Autentické underground fotky
- **KAPELA LÁSKA:** Artistic rabbit artwork
- **Concert photos:** Purple stage lighting effects
- **Studio shots:** Behind-the-scenes content

**Všechny obrázky jsou připravené k nahrání a použití podle návodu v `IMAGE-USAGE-GUIDE.md`**

## 🎨 Placeholder obsah

### Jak funguje placeholder systém

**Váš web bude vypadat profesionálně i před přidáním skutečného obsahu!**

#### ✨ Automatické placeholdery
- **Stránky s placeholdery:** O KAPELÁCH, O VINYLECH, KONCERTY, O ŽIVOTĚ
- **Obsahují:** Ukázkové kapely, vinyly, koncerty a novinky
- **Zmizí automaticky:** Jakmile přidáte první skutečný obsah
- **Červené upozornění:** Informuje administrátora o placeholder obsahu

#### 🎵 Ukázkové kapely
- ACID ROW (🎸)
- OOBBT (🥁) 
- KAPELA PIVÍČKO (🎤)
- ČAU (🎹)

#### 💿 Ukázkové vinyly
- POISONED MIND / ACID ROW
- ELECTRONIC DREAMS
- PIVNÍ SEZÓNA
- GET LAJF
- UNDERGROUND HITS

#### 🎪 Ukázkové koncerty
- 19.4. ACID ROW - Rock Café
- 20.4. OOBBT - Cross Club
- 21.4. KAPELA PIVÍČKO - Palác Akropolis
- 22.5. ČAU - Café V lese

### Jak přidat skutečný obsah

1. **Kapely:** `Kapely → Přidat novou`
2. **Vinyly:** `Vinyly → Přidat nový`
3. **Koncerty:** `Koncerty → Přidat nový`
4. **Novinky:** `Příspěvky → Přidat nový`

**Placeholdery zmizí automaticky po přidání prvního skutečného obsahu!**

### 🎨 Vizuální vylepšení placeholderů

**Nové placeholder funkce:**
- **Gradient artworky** místo emoji pro kapely
- **Vinyl disc efekty** pro vinyly s realistickými covers
- **Concert lighting effects** pro event stránky
- **Hover animace** pro interaktivní experience
- **Brand-specific colors** pro každou kapelu

**Technické vylepšení:**
- **Enhanced CSS styling** pro vaše budoucí obrázky
- **Image optimization** pro web performance
- **Responsive design** pro všechna zařízení
- **Print-friendly** styles pro marketing materials

## 🎯 Tipy pro úspěšné používání

### Pravidelné aktualizace

1. **Aktualizujte obsah pravidelně:**
   - Přidávejte nové koncerty
   - Publikujte novinky a články
   - Aktualizujte informace o kapelách

2. **Sledujte objednávky:**
   - Kontrolujte nové objednávky denně
   - Zpracovávejte objednávky rychle
   - Udržujte aktuální skladové zásoby

3. **Propagujte web:**
   - Sdílejte odkazy na sociálních sítích
   - Přidávejte QR kódy na propagační materiály
   - Informujte fanoušky o novém webu

### SEO optimalizace

1. **Instalujte SEO plugin (doporučujeme Yoast SEO)**
2. **Vyplňte meta popisky pro všechny stránky**
3. **Používejte alt texty pro obrázky**
4. **Vytvářejte kvalitní obsah pravidelně**

---

## ✅ Checklist pro dokončení

- [ ] Téma nainstalováno a aktivováno
- [ ] WooCommerce nainstalován a nakonfigurován
- [ ] Google Calendar plugin aktivován
- [ ] Všechny hlavní stránky vytvořené
- [ ] Nastavení tématu vyplněno
- [ ] Alespoň jedna kapela přidána
- [ ] Alespoň jeden vinyl přidán
- [ ] Google Calendar synchronizace funguje
- [ ] Email formulář testován
- [ ] WooCommerce objednávky testovány
- [ ] Music Player nakonfigurován a testován
- [ ] Playlist z Bandcamp/SoundCloud/Spotify přidán

**Gratulujeme! Váš web "Život je lajf" je připraven k používání! 🎉🎵**
