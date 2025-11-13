## Deployment-Anleitung

**Alle Dateien auf Ihren Webspace hochladen:**

**HTML:**
- index.html
- recipes.html
- add-recipe.html
- favorites.html
- recipe-detail.html
- export.html
- feedback.html
- changelog.html
- community.html
- app.html
- team.html
- kontakt.html
- faq.html
- impressum.html
- datenschutz.html
- agb.html
- sitemap.html
- update-images.html

**CSS & JS:**
- style.css
- accessibility.css
- recipe-db.js
- script.js
- sidebar.js
- accessibility.js
- export-share.js
- feedback.js

**Daten & Sonstiges:**
- recipes.csv (optional für Import)
- images/ (Bilder-Ordner)

---

## Funktionsweise

- Die App verwendet **SQL.js** für eine clientseitige SQLite-Datenbank
- Alle Daten werden im Browser des Benutzers gespeichert (LocalStorage)
- Keine Server-Komponenten erforderlich
- Funktioniert auf jedem Standard-Webspace
- Barrierefreiheit nach BITV 2.0 / WCAG 2.1

---

## Hauptfunktionen

✅ Rezeptdarstellung (Liste + Details)
✅ Rezepterstellung über Formular
✅ Persistente Speicherung (clientseitig)
✅ Favoriten-Funktion
✅ Responsive Design (Mobile First)
✅ Suchfunktion
✅ PDF-Export & Social Sharing (Facebook, Twitter, WhatsApp, E-Mail, Clipboard)
✅ Datenbank-Backup & Import
✅ Feedback-Formular & Feature-Voting
✅ Community-Seite & Changelog
✅ Barrierefreiheit (Screenreader, Tastatur, Kontrast)

---

## Hinweise

- **Bilder:** Lege Rezeptbilder im Ordner `images/` ab und gib den Pfad in der App an (z.B. `images/mein-rezept.jpg`).
- **Import/Export:** Rezepte können als PDF exportiert oder als JSON gesichert/importiert werden.
- **Feedback:** Rückmeldungen und Feature-Wünsche direkt über die App möglich.
- **Externe Links:** Kanbanboard, Stadtwettkampf, GitHub sind in der Sidebar verlinkt.

---

Diese Implementierung erfüllt alle MVP- und Zusatzanforderungen und kann sofort auf jedem Webspace deployed werden!

