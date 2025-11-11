# Smart Recipe Hub

## 🎯 Produktvision

Der **Smart Recipe Hub** ist die digitale Anlaufstelle für **schnelle, gesunde und inspirierende Rezepte**.

- **Kernziel:** Nutzer:innen sollen in **weniger als 5 Minuten** ein passendes Rezept finden, speichern oder teilen können
- **Slogan:** „Kochen leicht gemacht – in 5 Minuten zum passenden Rezept!"
- **Zielgruppe:** Studierende, Berufstätige und Kochanfänger:innen

![Smart Recipe Hub Screenshot](doc/Screenshot.png)

---

## 💻 Technische Architektur

### Voraussetzungen
Die Anwendung ist **komplett clientseitig** und läuft **ohne Backend/Server-Python** direkt im Webspace:

- ✅ **Nur HTML, CSS, JavaScript** - Keine Serverkomponenten
- ✅ **SQLite im Browser** via SQL.js (WebAssembly)
- ✅ **Keine Python-Installation** nötig auf dem Webspace
- ✅ **Statisches Hosting** - läuft auf jedem Standard-Webspace

### Technologie-Stack
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Datenbank:** SQL.js (SQLite im Browser via WebAssembly)
- **Speicherung:** Browser LocalStorage für Persistenz
- **Hosting:** Jeder Standard-Webspace (nur Dateien hochladen)

### Dateien hochladen
Laden Sie diese Dateien in Ihren Webspace:
```
/
├── index.html
├── recipes.html
├── add-recipe.html
├── favorites.html
├── style.css
├── script.js
├── recipe-db.js
└── images/
    └── (Rezeptbilder)
```

---

## 🚀 MVP - Funktionale Anforderungen (Must-Have)

Diese Funktionen sind im MVP (Minimum Viable Product) enthalten:

1. **Rezeptdarstellung:** Startseite zeigt Liste mit Rezepten (Titel + Beschreibung)
2. **Rezeptdetails:** Details mit Zutaten, Schritten, Zubereitungszeit
3. **Rezept erstellen:** Formular zum Hinzufügen neuer Rezepte
4. **Datenspeicherung:** Rezepte bleiben dauerhaft gespeichert (SQLite im Browser)
5. **Favoriten:** Rezepte können als Favorit markiert werden

---

## 🔮 Erweiterungen (2. Sprint)

Nach erfolgreichem MVP folgende Features:

- ✨ Suchfunktion (nach Zutaten oder Rezeptname)
- 🎯 Filter (vegetarisch, schnell, günstig)
- 🎲 Zufallsrezept („Überrasch mich!")
- 📄 Exportfunktion (PDF/Download)
- ⭐ Bewertungssystem (Sterne oder Likes)

---

## 🎨 Design & UX

- **Designstil:** Modern, clean, minimalistisch
- **Farbschema:** Frische Farben (Grün- und Orangetöne)
- **Responsive:** Mobile First - optimiert für Smartphones
- **Usability:** Intuitive Navigation, max. 3 Klicks zum Ziel

---

## 📋 Agiles Projektmanagement mit Scrum

### Scrum vs. Klassisches PM

| Aspekt | Klassisch | Agil (Scrum) |
|--------|-----------|--------------|
| **Vorgehensweise** | Linear, Phasen nacheinander | **Iterativ, in Sprints** |
| **Flexibilität** | Änderungen teuer | **Änderungen erwünscht** |
| **Fokus** | Zeit, Budget, Umfang | **Kundennutzen, Qualität** |
| **Ergebnis** | Fertiges Produkt am Ende | **Laufend nutzbare Inkremente** |

### Scrum-Rollen

1. **Product Owner (PO)**
   - Repräsentiert den Kunden
   - Verantwortet wirtschaftlichen Erfolg (ROI)
   - Priorisiert Product Backlog

2. **Scrum Master (SM)**
   - Stellt Scrum Framework sicher
   - Beseitigt Hindernisse (Impediments)
   - Moderiert Team-Zusammenarbeit

3. **Entwicklungsteam**
   - Setzt Anforderungen um
   - Selbstorganisiert
   - Verantwortlich für Qualität

### Product Backlog

- **User Stories:** Formulierung aus Nutzersicht
  - Beispiel: "Als Koch-Anfänger möchte ich einfache Rezepte finden, um schnell kochen zu lernen"
- **Akzeptanzkriterien:** Klare Definition von "fertig"
- **Story Points:** Schätzung via Planning Poker (Fibonacci)
- **Priorisierung:** Nach Wert, Aufwand und Risiko

### Definition of Ready (DoR)

Story muss erfüllen:
- ✅ Geschätzt (Story Points)
- ✅ Klein genug (max. 13 SP)
- ✅ Akzeptanzkriterien definiert
- ✅ Von Team verstanden

### Scrum Events

1. **Sprint Planning** (5% Sprintlänge)
   - *Planning 1 (WAS):* Sprintziel festlegen
   - *Planning 2 (WIE):* Tasks definieren

2. **Daily Scrum** (täglich 10-15 Min)
   - Team-Synchronisation
   - Impediments identifizieren

3. **Sprint Review** (2,5% Sprintlänge)
   - Produktinkrement vorstellen
   - Vom PO abnehmen lassen

4. **Sprint Retrospektive** (2,5% Sprintlänge)
   - Prozess reflektieren
   - Verbesserungsmaßnahmen entwickeln

---

## 📦 Installation & Deployment

### Lokale Entwicklung

1. Dateien in einen Ordner kopieren
2. `index.html` im Browser öffnen
3. Fertig - keine Installation nötig!

### Webspace-Deployment

1. Alle Dateien per FTP auf Webspace hochladen
2. `index.html` als Startseite festlegen
3. App ist sofort verfügbar unter: `https://ihre-domain.de/`

**Keine Konfiguration, keine Datenbank-Setup, kein Python - einfach hochladen und loslegen!**

---

## 🔧 Entwickler-Tools (Optional)

Im Projekt enthalten für Entwicklung:

- **Koch_app_1/**: Flask-Version (Python) - zum lokalen Testen
- **Koch_App_2/**: Produktiv-Version (nur HTML/JS) - für Webspace
- **csv2recipe-db.py**: Konverter CSV → JavaScript

---

## 📚 Analogie: Scrum wie ein Rugby-Spielzug

Scrum funktioniert wie ein **gut eingeübter Rugby-Spielzug**: 
- Jeder Spieler kennt seine Rolle
- Alle haben ein gemeinsames Ziel vor Augen
- Durch tägliche Abstimmungen (Daily Scrum) arbeiten sie als Einheit
- Fehler werden früh sichtbar und korrigiert
- Am Ende des Spielzugs (Sprint) gibt es ein nutzbares Ergebnis

---

## 📄 Lizenz & Copyright

© 2024 Smart Recipe Hub. Ein agiles Projekt umgesetzt mit Scrum.
