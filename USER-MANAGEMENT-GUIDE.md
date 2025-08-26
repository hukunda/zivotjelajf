# 🎸 Život je lajf - Kompletní uživatelský manuál

## 📋 Obsah

1. [🏠 Přihlášení do administrace](#přihlášení-do-administrace)
2. [📅 Správa koncertů](#správa-koncertů)
3. [🎵 Správa kapel](#správa-kapel)
4. [💿 Správa vinylů](#správa-vinylů)
5. [📰 Správa novinek](#správa-novinek)
6. [🛒 Správa obchodu](#správa-obchodu)
7. [🎵 Music Player](#music-player)
8. [📧 Email registrace](#email-registrace)
9. [⚙️ Nastavení webu](#nastavení-webu)
10. [🎨 Práce s obrázky](#práce-s-obrázky)

---

## 🏠 Přihlášení do administrace

### Jak se přihlásit
1. **Jděte na:** `vašedomena.cz/wp-admin`
2. **Zadejte:** své přihlašovací údaje
3. **Dostanete se do:** WordPress dashboard

### Co uvidíte v menu
- **Příspěvky** - Novinky a články
- **Stránky** - Hlavní stránky webu
- **Koncerty** - Správa koncertů
- **Kapely** - Správa kapel
- **Vinyly** - Správa vinylových desek
- **Produkty** - WooCommerce obchod
- **Objednávky** - Nákupy vinylů
- **Email registrace** - Formulář z patičky
- **Vzhled** - Nastavení tématu a music player

---

## 📅 Správa koncertů

### ➕ Jak přidat nový koncert

1. **Jděte na:** `Koncerty` → `Přidat nový`
2. **Vyplňte základní informace:**
   - **Název:** Název akce (např. "ACID ROW Live at Rock Café")
   - **Obsah:** Podrobný popis koncertu

3. **Vyplňte detaily koncertu:**
   - **Datum:** Vyberte datum koncertu
   - **Od kolika:** Čas začátku (např. 20:00)
   - **Kde ten koncert je:** Název venue (např. "Rock Café, Praha")
   - **Kapela:** Vyberte ze seznamu existujících kapel
   - **Cena:** Vstupné (např. "250 Kč" nebo "5€")
   - **Lupeny (URL):** Odkaz na prodej vstupenek
   - **Sociální odkazy:** Web, Facebook, Instagram

4. **Přidejte obrázek:** Náhledový obrázek koncertu (volitelné)
5. **Klikněte:** `Publikovat`

### 🔄 Google Calendar synchronizace

#### Nastavení Google Calendar
1. **Jděte na:** `Nastavení` → `Google Calendar`
2. **Vyplňte:**
   - **API Key:** Váš Google Calendar API klíč
   - **Calendar ID:** ID vašeho Google Calendar
   - **Aktivujte:** Automatickou synchronizace

#### Získání API klíče
1. **Jděte na:** [Google Cloud Console](https://console.cloud.google.com/)
2. **Vytvořte:** nový projekt
3. **Povolte:** Google Calendar API
4. **Vytvořte:** API klíč v sekci "Credentials"
5. **Zkopírujte:** klíč do nastavení

#### Získání Calendar ID
1. **Otevřete:** Google Calendar
2. **Klikněte:** na tři tečky vedle názvu kalendáře
3. **Vyberte:** "Settings and sharing"
4. **Zkopírujte:** "Calendar ID" ze sekce "Integrate calendar"

#### Manual synchronizace
- **Automatická:** Každou hodinu
- **Manuální:** Tlačítko "Synchronizovat nyní" na stránce nastavení

### 📋 Správa existujících koncertů
- **Upravit:** Klikněte na název koncertu v seznamu
- **Smazat:** Zaškrtněte koncert a vyberte "Smazat trvale"
- **Publikovat/Skrýt:** Změňte stav publikace

---

## 🎵 Správa kapel

### ➕ Jak přidat novou kapelu

1. **Jděte na:** `Kapely` → `Přidat novou`
2. **Vyplňte základní informace:**
   - **Název:** Název kapely (např. "ACID ROW")
   - **Obsah:** Dlouhý popis, bio kapely
   - **Náhledový obrázek:** Hlavní foto kapely

3. **Vyplňte detaily kapely:**
   - **Krátký popis:** Stručné představení (zobrazí se v kartách)
   - **Booking URL:** Odkaz pro booking (např. email nebo formulář)
   - **Sociální sítě:** Web, Facebook, Instagram

4. **Klikněte:** `Publikovat`

### 🔗 Propojení s koncerty
- **Koncerty se automaticky propojí:** když vyberete kapelu v koncertu
- **Na stránce kapely se zobrazí:** všechny jejich nadcházející koncerty
- **V koncertech se zobrazí:** odkaz na kapelu

### 📸 Tipy pro fotky kapel
- **Rozměry:** 300×200 px (minimálně)
- **Formát:** JPG nebo PNG
- **Kvalita:** Ostré, dobře osvětlené
- **Styl:** Underground/alternativní estetika

---

## 💿 Správa vinylů

### ➕ Jak přidat nový vinyl

1. **Jděte na:** `Vinyly` → `Přidat nový`
2. **Vyplňte základní informace:**
   - **Název:** Název alba/EP (např. "GET LAJF")
   - **Obsah:** Popis alba, seznam skladeb, zajímavosti
   - **Náhledový obrázek:** Obal alba

3. **Vyplňte detaily vinylu:**
   - **Kapela:** Vyberte ze seznamu
   - **Cena (Kč):** Prodejní cena
   - **Odkazy:** BandCamp, Apple Music, atd.

4. **Klikněte:** `Publikovat`

### 🛒 Automatické vytvoření produktu
- **WooCommerce produkt se vytvoří automaticky**
- **Cena se synchronizuje** z pole "Cena (Kč)"
- **Obrázek se zkopíruje** z náhledového obrázku
- **Tlačítko "Kup vinyl" funguje okamžitě**

### 💰 Správa cen a skladu
1. **Jděte na:** `Produkty` → `Všechny produkty`
2. **Najděte:** váš vinyl
3. **Upravte:** cenu nebo skladové zásoby
4. **Alternativně:** upravte cenu přímo ve vinylu

### 📦 Jak funguje prodej
- **Zákazník klikne:** "Kup vinyl"
- **Přidá se do košíku** automaticky
- **Zákazník pokračuje** na checkout
- **Dostane email** s potvrzením objednávky
- **Vy dostanete notifikaci** o nové objednávce

---

## 📰 Správa novinek

### ➕ Jak přidat nový článek

1. **Jděte na:** `Příspěvky` → `Přidat nový`
2. **Vyplňte:**
   - **Název:** Titulek článku
   - **Obsah:** Text článku
   - **Náhledový obrázek:** Obrázek k článku (volitelné)
   - **Kategorie:** Vyberte nebo vytvořte novou
   - **Tagy:** Klíčová slova

3. **Nastavte publikaci:**
   - **Publikovat ihned:** Článek se objeví okamžitě
   - **Naplánovat:** Vyberte datum a čas budoucí publikace

### 📍 Kde se články zobrazí
- **Hlavní stránka:** V sekci "CO NOVÝHO U ŽIVOTĚ"
- **Stránka O ŽIVOTĚ:** Kompletní seznam článků
- **Blog archiv:** `/blog` stránka

### ✍️ Tipy pro psaní článků
- **Titulky:** Jasné a výstižné
- **Perex:** První odstavec shrňte hlavní info
- **Délka:** 200-500 slov je ideální
- **Obrázky:** Přidávají na atraktivitě

---

## 🛒 Správa obchodu

### 📦 Správa objednávek

1. **Jděte na:** `WooCommerce` → `Objednávky`
2. **Uvidíte:**
   - **Nové objednávky:** Čekající na zpracování
   - **Zpracované:** Připravené k odeslání
   - **Dokončené:** Odeslané zákazníkům

### 🔄 Workflow objednávky
1. **Zákazník objedná:** Vinyl přes web
2. **Dostanete email:** O nové objednávce
3. **Změníte stav:** Na "Zpracovává se"
4. **Připravíte balík:** Podle údajů v objednávce
5. **Změníte stav:** Na "Dokončeno"
6. **Zákazník dostane:** Email o odeslání

### 💳 Platební metody
- **Bankovní převod:** Zákazník zaplatí na účet
- **Dobírka:** Platba při převzetí
- **PayPal:** Online platby (volitelné)

### 🚚 Nastavení dopravy
1. **Jděte na:** `WooCommerce` → `Nastavení` → `Dorava`
2. **Nastavte:**
   - **Česká pošta:** Cena a doba doručení
   - **PPL:** Kurýrní služba
   - **Osobní odběr:** Zdarma v Praze

---

## 🎵 Music Player

### ⚙️ Nastavení přehrávače

1. **Jděte na:** `Vzhled` → `Music Player`
2. **Aktivujte:** Checkbox "Zobrazit music player"
3. **Vyberte typ služby:**
   - **Bandcamp:** Pro alba na Bandcamp
   - **SoundCloud:** Pro tracky na SoundCloud
   - **Spotify:** Pro playlisty na Spotify
   - **YouTube:** Pro videa
   - **Custom:** Vlastní HTML

### 🎧 Jak přidat hudbu z Bandcamp

1. **Jděte na:** váš Bandcamp album
2. **Klikněte:** "Share / Embed"
3. **Zkopírujte:** celý `<iframe>` kód
4. **Vložte:** do pole "URL / Embed kód"
5. **Nastavte typ:** "Bandcamp"
6. **Vyplňte:** název skladby a umělce
7. **Uložte změny**

### 🎤 Jak přidat z SoundCloud

1. **Jděte na:** váš SoundCloud track
2. **Klikněte:** "Share" → "Embed"
3. **Zkopírujte:** embed kód
4. **Nastavte typ:** "SoundCloud"
5. **Zbytek:** stejně jako u Bandcamp

### 🎨 Přizpůsobení
- **Artwork:** URL obrázku alba
- **Název skladby:** Co se zobrazí v playeru
- **Umělec:** Jméno kapely
- **Autoplay:** Automatické spuštění (negarantované)

### 👀 Jak to vypadá návštěvníkům
- **Sticky bar:** V dolní části webu
- **Floating button:** 🎵 vpravo dole
- **Ovládání:** Play/pause, volume, progress
- **Klávesy:** Mezerník (play/pause), Escape (zavřít)

---

## 📧 Email registrace

### 📋 Správa registrací

1. **Jděte na:** `Email registrace` v menu
2. **Uvidíte:** Všechny email adresy z formuláře
3. **Data:** Email adresa + datum registrace

### 📨 Automatické notifikace
- **Při každé registraci:** Dostanete email
- **Na adresu:** cau@zivotjelajf.com
- **Obsah:** Email návštěvníka + čas registrace

### 📤 Export dat
- **Zkopírujte emaily:** Přímo ze seznamu
- **Pro newsletter:** Vložte do MailChimp apod.
- **GDPR compliance:** Data lze smazat na požádání

---

## ⚙️ Nastavení webu

### 🎨 Vzhled a nastavení

1. **Jděte na:** `Vzhled` → `Přizpůsobit`
2. **Nastavte:**
   - **Telefon:** +420 727 273 372
   - **Email:** cau@zivotjelajf.com
   - **Sociální sítě:** Facebook, Instagram, Twitter

### 🔧 Základní nastavení WordPress

1. **Jděte na:** `Nastavení` → `Obecné`
2. **Nastavte:**
   - **Název webu:** "ŽIVOT JE LAJF"
   - **Popis:** "Hudební management a produkce"
   - **Časová zóna:** Praha

### 🌐 SEO nastavení
1. **Instalujte:** Plugin "Yoast SEO"
2. **Vyplňte:** Meta popisky stránek
3. **Nastavte:** Sitemap.xml
4. **Sledujte:** Google Analytics

---

## 🎨 Práce s obrázky

### 📏 Doporučené rozměry

| Typ obsahu | Rozměr | Popis |
|------------|--------|-------|
| **Kapely** | 300×200 px | Poměr 3:2 |
| **Vinyly** | 300×300 px | Čtvercové |
| **Koncerty** | 150×100 px | Náhled |
| **Články** | 800×400 px | Banner |
| **Logo** | 200×60 px | Header |

### 🖼️ Jak nahrát obrázek

1. **V editoru:** Klikněte "Nastavit náhledový obrázek"
2. **Vyberte:** "Nahrát soubory"
3. **Přetáhněte:** obrázek z počítače
4. **Nebo klikněte:** "Vybrat soubory"
5. **Upravte:** Alt text pro přístupnost
6. **Klikněte:** "Nastavit náhledový obrázek"

### 🎯 Použití vašich obrázků

**Perfektní obrázky jste už poskytli!** Zde je jak je použít:

#### 🎸 Pro kapely:
- **ACID ROW:** Použijte černobílé foto tří členů
- **OOBBT:** Abstraktní barevný artwork
- **KAPELA PIVÍČKO:** Foto dvou členů s čepicemi
- **KAPELA LÁSKA:** Artwork s králíčkem

#### 💿 Pro vinyly:
- **ACID ROW albums:** Červeno-černé artworky
- **Electronic releases:** Barevné psychedelické designy
- **Underground compilation:** Tmavé technické artworky

#### 🎪 Pro koncerty:
- **Live photos:** Fialové/růžové stage lighting
- **Studio shots:** Modrý monochrome setup
- **Equipment shots:** Technické vybavení

### 💡 Tipy pro optimalizaci
- **Velikost souboru:** Maximálně 2MB
- **Formát:** JPG pro fotky, PNG pro loga
- **Kvalita:** 80-90% komprese je ideální
- **Názvy:** Používejte popisné názvy souborů

---

## 🆘 Časté problémy a řešení

### ❓ Často kladené otázky

**Q: Placeholder obsah se nezměnil po přidání kapely/vinylu**
**A:** Zkuste vymazat cache prohlížeče (Ctrl+F5)

**Q: Google Calendar se nesynchronizuje**
**A:** Zkontrolujte API klíč a Calendar ID v nastavení

**Q: Music player nefunguje**
**A:** Ověřte, že embed kód obsahuje kompletní `<iframe>` tag

**Q: Objednávky nepřicházejí**
**A:** Zkontrolujte nastavení emailů v WooCommerce

**Q: Stránky se nezobrazují správně**
**A:** Jděte do `Nastavení` → `Trvalé odkazy` a klikněte "Uložit"

### 🔧 Základní troubleshooting

1. **Vymazání cache:** Ctrl+F5 v prohlížeči
2. **Kontrola pluginů:** Deaktivujte a znovu aktivujte
3. **Aktualizace:** Zkontrolujte dostupné aktualizace
4. **Backup:** Vždy před většími změnami

### 📞 Podpora

**Pokud potřebujete pomoc:**
- **Email:** cau@zivotjelajf.com
- **Telefon:** +420 727 273 372
- **Nejlepší čas:** Pracovní dny 9-17h

---

## ✅ Rychlý checklist pro začátečníky

### První kroky:
- [ ] Přihlásit se do administrace
- [ ] Nastavit kontaktní údaje v Vzhled → Přizpůsobit
- [ ] Přidat první kapelu
- [ ] Přidat první vinyl
- [ ] Přidat první koncert
- [ ] Nastavit music player
- [ ] Otestovat objednávku vinylu
- [ ] Zkontrolovat email notifikace

### Týdenní rutina:
- [ ] Zkontrolovat nové objednávky
- [ ] Přidat nové koncerty
- [ ] Publikovat nové články
- [ ] Odpovědět na email registrace
- [ ] Aktualizovat music player

### Měsíční úkoly:
- [ ] Backup webu
- [ ] Kontrola Google Analytics
- [ ] Aktualizace pluginů
- [ ] Vyčištění starých objednávek

---

**🎸 Váš web "Život je lajf" je připraven k rocku! Užijte si správu svého hudebního impéria! 🤘**
