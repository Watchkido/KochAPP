# 📁 Datei-Dokumentation - YummyGo

**Stand:** November 2025  
**Version:** Koch_App_2 (Produktionsversion)

Diese Dokumentation beschreibt **alle Dateien** des YummyGo und ihre Funktion im System.

---

## 🎯 Haupt-HTML-Seiten (Core Application)

### `index.html`
**Startseite der Anwendung**
- Zeigt 3 vorgestellte Rezepte (Featured Recipes)
- Willkommenstext und Produktbeschreibung
- Einstiegspunkt für neue Benutzer
- Lädt: `style.css`, `script.js`, `recipe-db.js`, `sidebar.js`, `accessibility.js`
- Benötigt: SQL.js (CDN), Datenbank-Initialisierung

### `recipes.html`
**Komplette Rezeptliste mit Suchfunktion**
- Zeigt alle gespeicherten Rezepte als Karten-Layout
- Live-Suche nach Titel, Zutaten und Kategorie
- Kategorie-Filter (Frühstück, Mittagessen, Abendessen, etc.)
- Favoriten-Button auf jeder Rezeptkarte
- Sortierung nach Datum
- JavaScript-Funktionen: `loadAllRecipes()`, `searchRecipes()`

### `add-recipe.html`
**Formular zum Hinzufügen neuer Rezepte**
- Eingabefelder: Titel, Beschreibung, Zutaten, Anleitung
- Zusatzfelder: Zubereitungszeit, Kategorie, Kalorien, Bild-URL
- Formular-Validierung (alle Pflichtfelder müssen ausgefüllt sein)
- Speichert Rezept in SQL.js Datenbank
- Redirect zu `recipes.html` nach erfolgreichem Speichern
- JavaScript-Funktion: `setupRecipeForm()`

### `favorites.html`
**Zeigt alle als Favorit markierten Rezepte**
- Filtert Rezepte mit `is_favorite = 1`
- Gleiche Karten-Darstellung wie `recipes.html`
- Zeigt Meldung, wenn keine Favoriten vorhanden
- JavaScript-Funktion: `loadFavoriteRecipes()`

### `recipe-detail.html`
**Detailansicht eines einzelnen Rezepts**
- Zeigt vollständige Rezeptinformationen
- Große Bilddarstellung
- Strukturierte Zutatenliste und Schritt-für-Schritt-Anleitung
- Favoriten-Toggle-Button (Stern-Icon)
- Zurück-Button zur Rezeptliste
- URL-Parameter: `?id=123` (Rezept-ID)
- JavaScript-Funktion: `loadRecipeDetail()`

---

## 📄 Informations- und Rechtsseiten

### `team.html`
**Team-Vorstellung**
- Zeigt Entwicklerteam und Mitwirkende
- Profilbilder und Rollen
- Kontaktinformationen
- Verlinkung zu GitHub-Profilen

### `tutorial.html`
**Benutzerhandbuch und Anleitung**
- Schritt-für-Schritt-Erklärung aller Funktionen
- Screenshots und Beispiele
- Tipps zur Nutzung der App
- FAQ-ähnlicher Aufbau

### `kontakt.html`
**Kontaktformular**
- Eingabefelder: Name, E-Mail, Betreff, Nachricht
- Formular-Validierung
- ⚠️ **Hinweis:** Derzeit nur Frontend - Backend-Integration erforderlich für echten Versand

### `faq.html`
**Häufig gestellte Fragen (FAQ)**
- Accordion-Layout (Ein-/Ausklappbare Fragen)
- Kategorien: Allgemein, Rezepte, Technisches, Datenschutz
- Suchfunktion für Fragen
- Antworten zu häufigen Problemen

### `impressum.html`
**Impressum (Rechtlich erforderlich in Deutschland)**
- Angaben gemäß § 5 TMG (Telemediengesetz)
- Verantwortliche Personen/Firma
- Kontaktdaten (Adresse, E-Mail, Telefon)
- Haftungsausschluss

### `datenschutz.html`
**Datenschutzerklärung (DSGVO-konform)**
- Welche Daten werden gespeichert (LocalStorage)
- Zweck der Datenverarbeitung
- Nutzung von SQL.js (clientseitig, keine Server-Übertragung)
- Rechte der Nutzer (Auskunft, Löschung)
- Keine Cookies, keine externen Tracker

### `agb.html`
**Allgemeine Geschäftsbedingungen (AGB)**
- Nutzungsbedingungen der App
- Haftungsausschluss für Rezeptinhalte
- Urheberrechte
- Rechtliche Hinweise

### `sitemap.html`
**Übersichtsseite aller Inhalte (Sitemap)**
- Strukturierte Liste aller Seiten
- 6 Kategorien: Hauptfunktionen, Informationen, Weitere Funktionen, Rechtliches, Externe Links, Entwickler-Tools
- Barrierefreiheits-Informationen
- Tastatur-Shortcuts aufgelistet
- **Wichtig für BITV 2.0 Konformität**

---

## 🔧 Feature-Seiten (Zusatzfunktionen)

### `app.html`
**Progressive Web App (PWA) Informationen**
- Erklärt Installation als Desktop/Mobile App
- Vorteile der PWA-Nutzung
- Anleitungen für verschiedene Browser
- Offline-Funktionalität (geplant)

### `changelog.html`
**Versions-Historie und Updates**
- Chronologische Liste aller Änderungen
- Versionsnummern und Datum
- Bug-Fixes und neue Features
- Geplante Features (Roadmap)

### `community.html`
**Community-Funktionen und Social Features**
- Rezept-Teilen (geplant)
- Kommentare und Bewertungen (geplant)
- User-Beiträge
- Integration mit Social Media (geplant)

### `export.html`
**Daten-Export & Social Media Sharing** ⭐ **NEU ERWEITERT**
- **PDF-Export:**
  - Alle Rezepte als PDF exportieren
  - Nur Favoriten als PDF exportieren
  - Professionelles Layout mit Titel, Zutaten, Anleitung
  - Automatischer Seitenumbruch
  - Verwendet jsPDF-Bibliothek (CDN)
- **Social Media Sharing:**
  - Facebook teilen
  - Twitter/X teilen
  - WhatsApp teilen (Mobile & Desktop)
  - E-Mail versenden
  - Link in Zwischenablage kopieren
  - Rezept-Auswahl über Dropdown
- **Datenbank-Backup:**
  - Export als JSON-Datei
  - Import-Funktion für Wiederherstellung
  - Versionierung und Datumsangabe
- **JavaScript:** `export-share.js` (alle Export/Share-Funktionen)

### `feedback.html`
**Feedback und Verbesserungsvorschläge**
- Formular für Feature-Requests
- Bug-Reports
- Bewertung der App
- ⚠️ **Hinweis:** Backend-Integration erforderlich

---

## 🎨 CSS-Dateien (Styling)

### `style.css`
**Haupt-Stylesheet für die gesamte Anwendung**
- **Globale Styles:** Reset, Variablen, Typography
- **Layout:** Container (max-width: 1200px), Grid-System, Flexbox
- **Navigation:** Header, Navbar, Sidebar
- **Komponenten:** 
  - Rezeptkarten (`.recipe-card`)
  - Buttons (`.btn`, `.btn-primary`)
  - Formulare (`.form-group`, `input`, `textarea`)
  - Footer
- **Sidebar:** 
  - Position: `fixed right: -300px` (versteckt)
  - Toggle mit `.active` Klasse (right: 0)
  - Overlay (`.sidebar-overlay`)
  - Startet ab Zeile ~350
- **Responsive Design:**
  - Mobile: < 768px (Sidebar wird Full-Screen)
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Farben:** 
  - Primary: `#ff6b6b` (Rot)
  - Secondary: `#4ecdc4` (Türkis)
  - Background: `#f8f9fa`

### `accessibility.css`
**Barrierefreiheits-Funktionen (BITV 2.0 / WCAG 2.1)**
- **Widget-Styling:**
  - Button: Fixed bottom-left, blau, 60px, ♿ Icon
  - Panel: 380px breit, sliding von links
  - Z-Index: 9999 (über allem)
- **Accessibility-Modi (Body-Klassen):**
  - `.a11y-grayscale` → `filter: grayscale(100%)`
  - `.a11y-high-contrast` → Schwarze Schrift auf Weiß, fette Links
  - `.a11y-negative-contrast` → Dark Mode (#1a1a1a Background)
  - `.a11y-light-background` → Weiße Hintergründe überall
  - `.a11y-underline-links` → Alle Links unterstrichen
  - `.a11y-readable-font` → Arial, größerer Zeilenabstand
- **Skip-to-Content:** Styling für Screen Reader Links
- **Responsive:** 
  - Mobile: Panel 100% Breite
  - Button: 50px auf kleinen Bildschirmen

---

## ⚙️ JavaScript-Dateien (Funktionalität)

### `recipe-db.js` ⭐ **KERNDATEI**
**Datenbank-Layer - Alle SQL.js Operationen**

**Hauptfunktionen:**
- `initDatabase()` - Initialisiert SQL.js, lädt DB aus LocalStorage oder erstellt neue
- `createTables()` - Erstellt Tabellen-Schema (`recipes` mit allen Feldern)
- `saveDatabase()` - Speichert DB als Base64 String in LocalStorage
- `getAllRecipes()` - Gibt alle Rezepte als Array zurück
- `getRecipeById(id)` - Holt einzelnes Rezept
- `addRecipe(recipe)` - Fügt neues Rezept hinzu
- `updateRecipe(id, recipe)` - Aktualisiert bestehendes Rezept
- `deleteRecipe(id)` - Löscht Rezept
- `toggleFavorite(id)` - Schaltet Favoriten-Status um
- `searchRecipes(query)` - Volltextsuche über Titel, Zutaten, Kategorie
- `getRecipesByCategory(category)` - Filtert nach Kategorie
- `getFavoriteRecipes()` - Gibt nur Favoriten zurück

**Technische Details:**
- Verwendet SQL.js 1.8.0 von CDN
- Schema-Migration mit ALTER TABLE (fügt neue Felder hinzu)
- LocalStorage Key: `'recipeDatabase'`
- Encoding: Base64 (binäre DB → String)
- **619 Zeilen Code**

### `script.js`
**UI-Logik für alle Seiten**

**Hauptfunktionen:**
- `loadFeaturedRecipes()` - Lädt 3 vorgestellte Rezepte für `index.html`
- `createRecipeCard(recipe)` - Erstellt HTML für Rezept-Karte
- `loadAllRecipes()` - Zeigt alle Rezepte auf `recipes.html`
- `loadFavoriteRecipes()` - Zeigt Favoriten auf `favorites.html`
- `loadRecipeDetail()` - Zeigt Detailansicht auf `recipe-detail.html`
- `setupRecipeForm()` - Formular-Handling für `add-recipe.html`
- `toggleRecipeFavorite(id)` - Favoriten-Button Handler
- Navigation: Setzt `.active` Klasse auf aktueller Seite

**Features:**
- Event-Delegation für dynamisch erstellte Elemente
- Formular-Validierung
- Error-Handling (leere Datenbank, fehlende Felder)
- Toast-Notifications (geplant)
- **319 Zeilen Code**

### `sidebar.js`
**Toggle-Funktionalität für Sidebar-Navigation**

**Funktionen:**
- Toggle Sidebar mit `#menuToggle` Button (☰)
- Schließen mit Overlay-Click
- ESC-Taste schließt Sidebar
- Fügt/entfernt `.active` Klasse auf `#sidebar` und `#sidebarOverlay`

**Event-Handler:**
- `menuToggle.addEventListener('click', toggleSidebar)`
- `overlay.addEventListener('click', toggleSidebar)`
- `document.addEventListener('keydown')` → ESC-Taste

**Kompakt:** Nur 24 Zeilen Code, wird in jede HTML-Seite eingebunden

### `accessibility.js` ⭐ **BITV 2.0 konform**
**Barrierefreiheits-Widget für gesetzliche Anforderungen**

**Klasse:** `AccessibilityTools`

**Features (7 Modi):**
1. **Text-Größe:** 80% - 200% (10% Schritte)
   - `increaseText()` - Alt++ Shortcut
   - `decreaseText()` - Alt+- Shortcut
2. **Graustufen:** `grayscale()` - Für Farbenblinde
3. **Hoher Kontrast:** `highContrast()` - Schwarz auf Weiß
4. **Negativer Kontrast:** `negativeContrast()` - Dark Mode
5. **Heller Hintergrund:** `lightBackground()` - Weiß überall
6. **Links unterstreichen:** `underlineLinks()` - Bessere Sichtbarkeit
7. **Lesbare Schrift:** `readableFont()` - Arial, größerer Abstand

**Methoden:**
- `createWidget()` - Baut HTML für Widget + Panel
- `loadSettings()` - Lädt aus LocalStorage
- `saveSettings()` - Speichert in LocalStorage
- `applySettings()` - Wendet Body-Klassen an
- `setupKeyboardShortcuts()` - Alt+A, Alt++, Alt+-
- `reset()` - Alle Einstellungen zurücksetzen

**Tastatur-Shortcuts:**
- `Alt + A` - Öffnet/Schließt Accessibility-Menü
- `Alt + +` - Text vergrößern
- `Alt + -` - Text verkleinern

**Technisch:**
- LocalStorage Key: `'accessibilitySettings'`
- Fügt CSS-Klassen zum `<body>` hinzu (z.B. `.a11y-grayscale`)
- ARIA-Labels für Screen Reader
- **291 Zeilen Code**

### `export-share.js` ⭐ **NEU**
**Export & Social Media Sharing Funktionen**

**PDF-Export:**
- `exportAllRecipesAsPDF()` - Alle Rezepte als PDF
- `exportFavoritesAsPDF()` - Nur Favoriten als PDF
- `generateRecipesPDF(recipes, filename)` - PDF-Generator mit jsPDF
  - Professionelles Layout
  - Automatischer Seitenumbruch
  - Strukturierte Darstellung (Titel, Zutaten, Anleitung)

**Social Media Sharing:**
- `shareOnFacebook()` - Öffnet Facebook Share Dialog
- `shareOnTwitter()` - Öffnet Twitter/X Share Dialog
- `shareOnWhatsApp()` - WhatsApp (Mobile/Desktop)
- `shareViaEmail()` - E-Mail mit Rezept-Details
- `copyRecipeLink()` - Kopiert Link in Zwischenablage
- `getRecipeURL()` - Generiert URL zum Rezept

**Datenbank-Backup:**
- `exportDatabaseAsJSON()` - Exportiert gesamte DB als JSON
- `importDatabase()` - Öffnet Datei-Dialog
- `handleDatabaseImport(event)` - Verarbeitet JSON-Import
  - Validierung des Backup-Formats
  - Überschreib-Warnung
  - Erfolgs-Meldung

**Hilfsfunktionen:**
- `loadRecipeSelector()` - Lädt Rezepte in Dropdown
- `showToast(message, type)` - Toast-Benachrichtigungen
- `copyToClipboardFallback(text)` - Fallback für ältere Browser

**Technische Details:**
- Verwendet jsPDF 2.5.1 von CDN
- Clipboard API mit Fallback
- Event-Delegation für dynamische Elemente
- Toast-Animationen mit CSS
- **~450 Zeilen Code**

**Abhängigkeiten:**
- `recipe-db.js` (Datenbank-Funktionen)
- jsPDF-Bibliothek (CDN)
- SQL.js (CDN)

---

## 🧪 Test- und Entwickler-Dateien

### `test-db.html`
**Datenbank-Inspektions-Tool**
- Zeigt alle Rezepte als JSON-Tabelle
- Debugging-Informationen
- LocalStorage-Inhalt anzeigen
- Button zum Testen der Datenbank-Funktionen

### `reset-db.html`
**Datenbank zurücksetzen**
- Löscht LocalStorage komplett
- Button: "Datenbank löschen"
- Bestätigungs-Dialog
- Neustart mit leerer Datenbank
- ⚠️ **VORSICHT:** Löscht alle Rezepte unwiderruflich!

### `update-images.html`
**Tool zum Aktualisieren von Rezept-Bildern**
- Liste aller Rezepte mit aktueller Bild-URL
- Input-Felder zum Ändern der `image_url`
- Bulk-Update-Funktion
- Für Wartung und Content-Management

### `test-images.html`
**Bildtest-Seite**
- Überprüft, ob alle Bild-URLs funktionieren
- Zeigt gebrochene Links
- Thumbnail-Vorschau
- Hilft beim Debugging von Bildproblemen

---

## 🐍 Python-Hilfsskripte

### `csv2recipe-db.py`
**CSV zu JavaScript Converter**

**Funktion:**
- Liest `recipes.csv` Datei
- Konvertiert zu JavaScript-Code
- Generiert `initDefaultRecipes()` Funktion
- Fügt Rezepte automatisch in DB ein

**Verwendung:**
```bash
python csv2recipe-db.py
```

**CSV-Format:**
```csv
title,description,ingredients,instructions,preparation_time,category,image_url,calories
Pasta Carbonara,"Klassisches...",Spaghetti|Eier|Speck,...,20,Mittagessen,https://...,650
```

**Output:** Ergänzt `recipe-db.js` mit `initDefaultRecipes()` Funktion

**167 Zeilen Python-Code**

---

## 📊 Daten-Dateien

### `recipes.csv`
**CSV-Quelldatei für Rezepte**
- Spalten: `title, description, ingredients, instructions, preparation_time, category, image_url, calories`
- Trennzeichen: `,` (Komma)
- Mehrzeilige Felder: `|` (Pipe) für Listen (Zutaten, Schritte)
- Encoding: UTF-8
- Wird von `csv2recipe-db.py` gelesen

**Beispiel:**
```csv
Rührei,Einfaches Rührei,Eier|Milch|Butter,Eier aufschlagen|In Pfanne braten,10,Frühstück,https://example.com/egg.jpg,200
```

### `favorites.csv`
**Favoriten-Export (optional)**
- Backup-Datei für Favoriten
- Gleiche Struktur wie `recipes.csv`
- Enthält nur Rezepte mit `is_favorite = 1`
- Nicht aktiv genutzt - nur für Backup-Zwecke

---

## 📂 Verzeichnisse

### `images/`
**Rezept-Bilder und Assets**
- Enthält alle hochgeladenen/verlinkten Rezept-Bilder
- Formate: `.jpg`, `.png`, `.webp`
- ⚠️ **Hinweis:** App nutzt externe URLs - dieser Ordner ist für lokale Kopien

**Empfohlene Struktur:**
```
images/
├── logo.png
├── recipes/
│   ├── pasta-carbonara.jpg
│   ├── pancakes.jpg
│   └── ...
└── icons/
    ├── favicon.ico
    └── ...
```

---

## 🔗 Externe Abhängigkeiten (CDN)

### SQL.js (SQLite für Browser)
**URL:** `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js`

**Was ist das?**
- SQLite kompiliert zu WebAssembly
- Läuft komplett im Browser (keine Server-Kommunikation)
- Ermöglicht SQL-Abfragen in JavaScript

**Verwendung:**
```javascript
const SQL = await initSqlJs({
    locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
});
```

**Dateien:**
- `sql-wasm.js` - JavaScript-Wrapper
- `sql-wasm.wasm` - WebAssembly-Binary

### jsPDF (PDF-Generierung im Browser)
**URL:** `https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js`

**Was ist das?**
- JavaScript-Bibliothek zur PDF-Erstellung
- Läuft komplett clientseitig
- Keine Server-Kommunikation nötig

**Verwendung:**
```javascript
const { jsPDF } = window.jspdf;
const doc = new jsPDF();
doc.text('Hello World', 10, 10);
doc.save('datei.pdf');
```

**Features:**
- Text-Rendering mit verschiedenen Schriftarten
- Automatischer Seitenumbruch
- Bilder einbetten (Base64)
- Linien und Formen zeichnen
- Mehrseitige PDFs

**Verwendet in:** `export.html` via `export-share.js`

---

## 📝 Dokumentations-Dateien

### `README.md`
**Projekt-Übersicht und Installationsanleitung**
- Produktvision und Ziele
- Technologie-Stack
- Funktionale Anforderungen (MVP)
- Installation und Deployment
- Entwickler-Hinweise
- **187 Zeilen**

### `BARRIEREFREIHEIT.md` (in `doc/`)
**Dokumentation der Accessibility-Features**
- BITV 2.0 / WCAG 2.1 Konformität
- Liste aller 7 Barrierefreiheits-Modi
- Tastatur-Shortcuts
- Screen Reader Support
- Technische Implementation
- Wartungshinweise
- Gesetzliche Anforderungen

### `DATEI_DOKUMENTATION.md` (diese Datei)
**Vollständige Datei-Beschreibungen**
- Erklärt jede einzelne Datei im Projekt
- Funktionen und Zweck
- Code-Beispiele
- Abhängigkeiten
- **Für Mitarbeiter-Einarbeitung**

---

## 🗂️ Duplikate mit `z_` Präfix

Diese Dateien sind **Backups oder alte Versionen** mit `z_` Präfix (werden ans Ende sortiert):

- `z_csv2recipe-db.py` → Alte Version von `csv2recipe-db.py`
- `z_reset-db.html` → Alte Version von `reset-db.html`
- `z_test-db.html` → Alte Version von `test-db.html`
- `z_test-images.html` → Alte Version von `test-images.html`
- `z_update-images.html` → Alte Version von `update-images.html`

**⚠️ Können gelöscht werden, wenn die neuen Versionen funktionieren!**

---

## 🔄 Abhängigkeiten und Reihenfolge

### Lade-Reihenfolge in HTML-Dateien:

```html
<head>
    <link rel="stylesheet" href="style.css">           <!-- 1. Haupt-CSS -->
    <link rel="stylesheet" href="accessibility.css">   <!-- 2. Accessibility-CSS -->
    <script src="accessibility.js"></script>           <!-- 3. Accessibility-JS -->
    <script src="sidebar.js"></script>                 <!-- 4. Sidebar-Toggle -->
</head>
<body>
    <!-- Inhalte -->
    
    <!-- Für Seiten mit Datenbank (index, recipes, etc.) -->
    <script src="https://cdnjs.../sql-wasm.js"></script>  <!-- 5. SQL.js laden -->
    <script src="recipe-db.js"></script>               <!-- 6. Datenbank-Logik -->
    <script src="script.js"></script>                  <!-- 7. UI-Logik -->
    
    <!-- Für Export-Seite (export.html) -->
    <script src="https://cdnjs.../jspdf.umd.min.js"></script>  <!-- 5. jsPDF laden -->
    <script src="https://cdnjs.../sql-wasm.js"></script>       <!-- 6. SQL.js laden -->
    <script src="recipe-db.js"></script>               <!-- 7. Datenbank-Logik -->
    <script src="export-share.js"></script>            <!-- 8. Export/Share-Funktionen -->
</body>
```

### Funktions-Abhängigkeiten:

1. **SQL.js muss geladen sein** → `recipe-db.js` kann arbeiten
2. **`initDatabase()`** muss aufgerufen werden → Datenbank ist bereit
3. **`recipe-db.js` Funktionen** → `script.js` kann Rezepte laden
4. **DOM muss geladen sein** → `DOMContentLoaded` Event
5. **jsPDF muss geladen sein** → `export-share.js` kann PDFs erstellen

---

## 📊 Statistik

### Gesamt-Übersicht:

- **HTML-Seiten:** 22 (17 aktive + 5 z_-Backups)
- **JavaScript-Dateien:** 5 (recipe-db.js, script.js, sidebar.js, accessibility.js, export-share.js)
- **CSS-Dateien:** 2 (style.css, accessibility.css)
- **Python-Skripte:** 1 aktiv + 1 Backup
- **Daten-Dateien:** 2 CSV-Dateien
- **Dokumentation:** 3 Markdown-Dateien

### Code-Zeilen (ca.):

- `recipe-db.js`: **619 Zeilen**
- `export-share.js`: **450 Zeilen** ⭐ **NEU**
- `script.js`: **319 Zeilen**
- `accessibility.js`: **291 Zeilen**
- `sidebar.js`: **24 Zeilen**
- `style.css`: **~1200 Zeilen** (geschätzt)
- `accessibility.css`: **~400 Zeilen** (geschätzt)

**Gesamt:** ~3300 Zeilen JavaScript + ~1600 Zeilen CSS = **~4900 Zeilen Code**

---

## 🚀 Schnellreferenz für neue Mitarbeiter

### Wichtigste Dateien zum Verstehen:

1. **`recipe-db.js`** - Datenbank-Kern (hier wird gespeichert/geladen)
2. **`script.js`** - UI-Logik (hier wird angezeigt)
3. **`export-share.js`** - Export & Sharing (PDF, Social Media, Backup) ⭐ **NEU**
4. **`style.css`** - Design und Layout
5. **`index.html`** - Einstiegspunkt

### Häufige Aufgaben:

**Neues Rezept hinzufügen:**
- Nutze `add-recipe.html` im Browser ODER
- Bearbeite `recipes.csv` und führe `csv2recipe-db.py` aus

**Rezepte exportieren/teilen:**
- Öffne `export.html` im Browser
- PDF erstellen: Button "Alle Rezepte als PDF" oder "Nur Favoriten als PDF"
- Social Media: Rezept auswählen → Plattform wählen
- Backup: "Datenbank als JSON" für vollständiges Backup

**Layout ändern:**
- Bearbeite `style.css`

**Neue Funktion hinzufügen:**
- JavaScript in `script.js` oder `recipe-db.js` ergänzen
- Export-Funktionen in `export-share.js` ergänzen

**Neue Seite erstellen:**
- Kopiere `template.html` (oder eine bestehende Seite)
- Ergänze Links in Sidebar (alle HTML-Dateien)
- Füge zu `sitemap.html` hinzu

**Datenbank zurücksetzen:**
- Öffne `reset-db.html` im Browser

---

## 📞 Support und Fragen

Bei Fragen zur Code-Struktur:
1. Lies diese Dokumentation
2. Schau in `README.md` für Gesamt-Übersicht
3. Debugging mit `test-db.html`
4. Kontakt über `kontakt.html` oder GitHub Issues

---

**Letzte Aktualisierung:** 11. November 2025  
**Autor:** YummyGo Team  
**GitHub:** [https://github.com/Watchkido/KochAPP](https://github.com/Watchkido/KochAPP)
