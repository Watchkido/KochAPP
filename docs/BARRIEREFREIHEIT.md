# Barrierefreiheit (BITV 2.0 / WCAG 2.1 Konformität)

## ♿ Übersicht

Die Website YummyGo erfüllt die Anforderungen der **BITV 2.0** (Barrierefreie-Informationstechnik-Verordnung) und **WCAG 2.1 Level AA** (Web Content Accessibility Guidelines).

## 🎯 Implementierte Features

### 1. Barrierefreiheits-Widget
Ein permanentes Accessibility-Tool unten links auf jeder Seite (blauer Button mit ♿-Symbol):

**Funktionen:**
- **Textgröße anpassen:** 80% - 200% (Schritte: 10%)
- **Graustufen-Modus:** Für Nutzer mit Farbblindheit
- **Hoher Kontrast:** Schwarze Schrift auf weißem Hintergrund
- **Negativer Kontrast:** Dunkelmodus (weiße Schrift auf dunklem Hintergrund)
- **Heller Hintergrund:** Reduziert visuelle Ablenkungen
- **Links unterstreichen:** Bessere Sichtbarkeit von Hyperlinks
- **Lesbare Schriftart:** Arial/Helvetica mit erhöhtem Zeilenabstand
- **Zurücksetzen:** Alle Einstellungen auf Standard zurücksetzen

### 2. Tastaturnavigation

**Shortcuts:**
- `Alt + A` - Barrierefreiheits-Menü öffnen/schließen
- `Alt + +` - Text vergrößern
- `Alt + -` - Text verkleinern
- `ESC` - Menüs schließen
- `Tab` - Durch Elemente navigieren
- `Enter` / `Space` - Links/Buttons aktivieren

### 3. Screen Reader Support

**Technische Implementierung:**
- **ARIA-Labels:** Alle interaktiven Elemente haben beschreibende Labels
- **Skip-to-Content Link:** Direkter Sprung zum Hauptinhalt
- **Semantisches HTML:** Korrekte Verwendung von `<header>`, `<nav>`, `<main>`, `<footer>`
- **Alt-Texte:** Alle Bilder haben alternative Textbeschreibungen
- **Focus-Indikatoren:** Sichtbare gelbe Umrandung bei Tastaturnavigation

### 4. Persistente Einstellungen

Alle Barrierefreiheits-Einstellungen werden in **LocalStorage** gespeichert und bleiben auch nach dem Schließen des Browsers erhalten.

## 📁 Dateien

- **`accessibility.js`** - JavaScript-Logik für alle Barrierefreiheits-Funktionen
- **`accessibility.css`** - Styling für das Widget und alle Modi
- **`sitemap.html`** - Übersichtsseite aller Inhalte

## 🔧 Integration

Alle HTML-Seiten enthalten:

```html
<head>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="accessibility.css">
    <script src="accessibility.js"></script>
</head>
<body>
    <!-- Skip-to-Content für Screen Reader -->
    <a href="#main-content" class="skip-to-content">Zum Hauptinhalt springen</a>
    
    <!-- Hauptinhalt mit ID für direkten Sprung -->
    <main class="container" id="main-content">
        <!-- Seiteninhalt -->
    </main>
</body>
```

## ✅ WCAG 2.1 Level AA Konformität

### Wahrnehmbar
- ✓ Textgröße anpassbar (1.4.4)
- ✓ Ausreichender Kontrast (1.4.3)
- ✓ Keine reinen Farb-Informationen (1.4.1)
- ✓ Alternative Texte für Bilder (1.1.1)

### Bedienbar
- ✓ Vollständige Tastaturzugänglichkeit (2.1.1)
- ✓ Sichtbarer Fokus-Indikator (2.4.7)
- ✓ Skip-to-Content Link (2.4.1)
- ✓ Konsistente Navigation (3.2.3)

### Verständlich
- ✓ Deutschsprachiger Inhalt mit lang="de" (3.1.1)
- ✓ Klare Beschriftungen (3.3.2)
- ✓ Sitemap für Struktur-Übersicht (2.4.5)

### Robust
- ✓ Valides HTML5 (4.1.1)
- ✓ ARIA-Attribute korrekt verwendet (4.1.2)
- ✓ Funktioniert ohne JavaScript (Graceful Degradation)

## 📱 Responsive Design

Das Barrierefreiheits-Widget passt sich verschiedenen Bildschirmgrößen an:
- **Desktop:** 380px breites Panel von links
- **Mobile:** Vollbild-Panel (100% Breite)
- **Button:** Responsive Größe (60px → 50px auf Mobile)

## 🎨 Kontrast-Verhältnisse

Alle Texte erfüllen **WCAG AA Mindest-Kontrast** von 4.5:1:
- Normal-Text: Mindestens 4.5:1
- Großer Text (18pt+): Mindestens 3:1
- UI-Komponenten: Mindestens 3:1

## 🔗 Weitere Ressourcen

- [BITV 2.0 Gesetzestext](https://www.gesetze-im-internet.de/bitv_2_0/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [BIK BITV-Test](https://www.bitvtest.de/)

## 🛠️ Wartung

Bei Änderungen an der Website:

1. **Neue Seiten:** Skript `add_accessibility.py` ausführen
2. **Neue Funktionen:** ARIA-Labels und Tastatur-Support prüfen
3. **Design-Änderungen:** Kontrast mit Tools wie [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) testen
4. **Screen Reader Test:** Mit NVDA (Windows) oder VoiceOver (Mac) testen

## 📞 Kontakt bei Barrierefreiheits-Problemen

Sollten Sie auf Barrieren stoßen, kontaktieren Sie uns über:
- **Kontaktformular:** [kontakt.html](kontakt.html)
- **Feedback:** [feedback.html](feedback.html)

Wir bemühen uns, Probleme innerhalb von 14 Tagen zu beheben.
