# Bilder zu Rezepten hinzufügen

## Methode 1: Lokale Bilder (empfohlen für Webspace)

### Schritt 1: Bilder vorbereiten
1. Speichere deine Rezeptbilder im Ordner `images/`
2. Verwende aussagekräftige Namen, z.B.:
   - `hackbraten.jpg`
   - `spaghetti-carbonara.jpg`
   - `apfelkuchen.jpg`

### Schritt 2: Bild-URL im Rezept angeben

**Option A: Über das Formular "Rezept hinzufügen"**
1. Öffne `add-recipe.html`
2. Fülle alle Felder aus
3. Im Feld "Bild-URL" gibst du ein: `images/dateiname.jpg`
4. Speichern

**Option B: Direkt in der Datenbank (für Demo-Rezepte)**
Bearbeite `recipe-db.js` und füge `image_url` hinzu:
```javascript
{
    title: "Hackbraten",
    description: "...",
    ingredients: "...",
    instructions: "...",
    preparation_time: 30,
    category: "Hauptgericht",
    calories: 650,
    image_url: "images/hackbraten.jpg"  // <-- Hier!
}
```

## Methode 2: Externe Bilder (z.B. von Pixabay, Unsplash)

Verwende direkte URLs von Bilderdiensten:
```
image_url: "https://images.unsplash.com/photo-..."
```

## Methode 3: Platzhalter

Wenn kein Bild vorhanden ist, zeigt die App automatisch ein 📷 Emoji als Platzhalter.

## Tipps für Bilder

- **Format**: JPG oder PNG
- **Größe**: Ca. 800x600 Pixel (nicht zu groß!)
- **Dateigröße**: Max. 200 KB pro Bild
- **Namen**: Ohne Umlaute und Leerzeichen (verwende `-` statt Leerzeichen)

## Beispiel-Workflow

1. Bild `spaghetti.jpg` in Ordner `images/` kopieren
2. Neues Rezept anlegen über die Web-App
3. Bei "Bild-URL" eingeben: `images/spaghetti.jpg`
4. Speichern → Bild wird angezeigt! ✅
