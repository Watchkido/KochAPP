# Beispiel: Bilder zu Rezepten hinzufügen

## Methode 1: Demo-Daten in recipe-db.js erweitern

Öffnen Sie `recipe-db.js` und fügen Sie `image_url` zu den Demo-Rezepten hinzu:

```javascript
const demoRecipes = [
    {
        title: "Pasta Aglio e Olio",
        description: "Einfache Nudeln mit Knoblauch",
        ingredients: "...",
        instructions: "...",
        preparation_time: 15,
        category: "Hauptgericht",
        image_url: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400"
    },
    // ... weitere Rezepte
];
```

## Methode 2: Über das Add-Recipe Formular

1. Öffnen Sie `add-recipe.html`
2. Fügen Sie ein neues Feld hinzu:

```html
<div class="form-group">
    <label for="image_url">Bild-URL (optional)</label>
    <input type="url" id="image_url" name="image_url" 
           placeholder="https://beispiel.de/bild.jpg">
</div>
```

## Methode 3: CSV-Datei erweitern

Fügen Sie eine `image_url` Spalte zur CSV hinzu:

```csv
id,title,description,ingredients,steps,prep_time,category,image_url,created_at
1,Hackbraten,Lecker,Hack|Sauce,Braten|Kochen,30,Hauptgericht,images/hackbraten.jpg,2025-11-10
```

Dann `csv2recipe-db.py` aktualisieren, um `image_url` zu lesen.

## Kostenlose Beispiel-Bilder (Unsplash Food):

- Pasta: https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400
- Toast: https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400
- Pancakes: https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400
- Salat: https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400
- Suppe: https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400
