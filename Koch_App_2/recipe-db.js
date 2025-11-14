/**
 * recipe-db.js Frank
 * Datenbank-Logik für YummyGo (SQL.js, LocalStorage).
 * Entwicklerhinweis: Hier werden alle Datenbankoperationen für Rezepte umgesetzt.
 */

// SQL.js Initialisierung und Datenbank-Funktionen
let db = null;
let SQL = null;

// Initialisiert die SQLite-Datenbank
async function initDatabase() {
    if (db) return; // Bereits initialisiert
    
    try {
        // SQL.js laden
        SQL = await initSqlJs({
            locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
        });
        
        // Versuche Datenbank aus LocalStorage zu laden
        const savedDb = localStorage.getItem('recipeDatabase');
        if (savedDb) {
            // Konvertiere Base64 String zurück zu Uint8Array
            const uint8Array = Uint8Array.from(atob(savedDb), c => c.charCodeAt(0));
            db = new SQL.Database(uint8Array);
            console.log("Datenbank aus LocalStorage geladen");
        } else {
            // Neue Datenbank erstellen
            db = new SQL.Database();
            console.log("Neue Datenbank erstellt");
        }
        
        // Tabellen erstellen, falls sie nicht existieren
        createTables();
        
        // Prüfe ob image_url Spalte existiert und füge sie hinzu falls nicht
        try {
            const tableInfo = db.exec("PRAGMA table_info(recipes)");
            const columns = tableInfo[0]?.values || [];
            
            const hasImageUrl = columns.some(row => row[1] === 'image_url');
            const hasCalories = columns.some(row => row[1] === 'calories');
            
            if (!hasImageUrl) {
                console.log("Füge image_url-Spalte zur bestehenden Datenbank hinzu");
                db.run("ALTER TABLE recipes ADD COLUMN image_url TEXT");
                saveDatabase();
            }
            
            if (!hasCalories) {
                console.log("Füge calories-Spalte zur bestehenden Datenbank hinzu");
                db.run("ALTER TABLE recipes ADD COLUMN calories INTEGER");
                saveDatabase();
            }
        } catch (error) {
            console.log("Konnte Spalten nicht prüfen:", error);
        }
        
        // Demodaten einfügen, falls die Tabelle leer ist
        insertDemoData();
        
        console.log("Datenbank erfolgreich initialisiert");
    } catch (error) {
        console.error("Fehler beim Initialisieren der Datenbank:", error);
    }
}

// Speichert die Datenbank in LocalStorage
function saveDatabase() {
    try {
        const data = db.export();
        const base64 = btoa(String.fromCharCode.apply(null, data));
        localStorage.setItem('recipeDatabase', base64);
        console.log("Datenbank in LocalStorage gespeichert");
    } catch (error) {
        console.error("Fehler beim Speichern der Datenbank:", error);
    }
}

// Erstellt die benötigten Tabellen
function createTables() {
    // Rezepte-Tabelle
    db.run(`
        CREATE TABLE IF NOT EXISTS recipes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            ingredients TEXT NOT NULL,
            instructions TEXT NOT NULL,
            preparation_time INTEGER,
            category TEXT,
            image_url TEXT,
            calories INTEGER,
            is_favorite BOOLEAN DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
}

// Fügt Demodaten ein, falls keine Rezepte vorhanden sind
function insertDemoData() {
    const checkResult = db.exec("SELECT COUNT(*) as count FROM recipes");
    const count = checkResult[0]?.values[0][0] || 0;
    
    if (count === 0) {
        const demoRecipes = [
            {
                title: "Hackbraten",
                description: "Hack und Braten zusammen",
                ingredients: "200g Hackfleisch\n100g Tomatensauce\n200g Spaghetti\n100ml Wasser",
                instructions: "Hack zu einer Kugel formen\nHack in der Pfanne braten\nSauce hinzufügen\nNudeln kochen\nAlles zusammen servieren",
                preparation_time: 30,
                category: "Hauptgericht",
                image_url: "images/hackbraten.jpg",
            
                calories: 650,
                
            },
            {
                title: "Rührei mit Toast",
                description: "Schnelles Frühstück für Eilige (Vegetarisch)",
                ingredients: "3 Eier\n2 Scheiben Toast\n1 EL Butter\nSalz und Pfeffer",
                instructions: "Butter in der Pfanne erhitzen\nEier aufschlagen und verquirlen\nIn die Pfanne geben und rühren\nToast toasten\nMit Salz und Pfeffer würzen",
                preparation_time: 10,
                category: "Hauptgericht",
                calories: 380,
                image_url: "images/eier.jpg"
            },
            {
                title: "Käse-Toast",
                description: "Klassischer überbackener Toast (Vegetarisch)",
                ingredients: "2 Scheiben Toast\n100g Käse gerieben\n1 Tomate\nOregano",
                instructions: "Toast leicht toasten\nTomatenscheiben auf Toast legen\nKäse darüber streuen\nMit Oregano würzen\nIm Ofen bei 180°C 5 Min backen",
                preparation_time: 15,
                category: "Snack",image_url: "images/FrenchToast.jpg",
            
                calories: 420,
                image_url: "images/burger.jpg"
            },
            {
                title: "Nudeln mit Pesto",
                description: "Italienischer Klassiker (Vegetarisch)",
                ingredients: "250g Nudeln\n4 EL Pesto\nParmesan\nSalz",
                instructions: "Wasser zum Kochen bringen\nNudeln 8-10 Min kochen\nAbgießen\nPesto untermischen\nMit Parmesan bestreuen",
                preparation_time: 15,
                category: "Hauptgericht",image_url: "images/nudeln.jpg",
                calories: 580,
                image_url: "images/nudeln.jpg"
            },
            {
                title: "Tomatensuppe",
                description: "Wärmende Suppe aus der Dose (Vegetarisch)",
                ingredients: "1 Dose Tomatensuppe 400ml\nSahne 50ml\nBasilikum\n1 Scheibe Brot",
                instructions: "Tomatensuppe in Topf geben\nErhitzen bis sie kocht\nSahne einrühren\nMit Basilikum garnieren\nMit Brot servieren",
                preparation_time: 10,
                category: "Vorspeise",
                calories: 280,
                image_url: "images/suppe.jpg"
            },
            {
                title: "Obstsalat",
                description: "Frischer vitaminreicher Snack (Vegan)",
                ingredients: "1 Apfel\n1 Banane\n1 Orange\n100g Weintrauben\n1 EL Honig",
                instructions: "Apfel waschen und würfeln\nBanane schälen und in Scheiben schneiden\nOrange schälen und teilen\nWeintrauben halbieren\nAlles mit Honig vermischen",
                preparation_time: 10,
                category: "Dessert",
                image_url: "images/obstsalat.jpg",
            
                calories: 220,
                
            },
            {
                title: "Pancakes",
                description: "Fluffige amerikanische Pfannkuchen (Vegetarisch)",
                ingredients: "200g Mehl\n2 Eier\n250ml Milch\n1 EL Zucker\nButter zum Braten",
                instructions: "Mehl Eier Milch und Zucker verrühren\n10 Min Teig ruhen lassen\nButter in Pfanne erhitzen\nKleine Portionen einbraten\nVon beiden Seiten goldbraun braten",
                preparation_time: 20,
                category: "Dessert",
                calories: 450,
                image_url: "images/pancakes.jpg"
            },
            {
                title: "Avocado-Toast",
                description: "Gesunder Trend-Snack (Vegan)",
                ingredients: "2 Scheiben Vollkornbrot\n1 reife Avocado\nSalz Pfeffer Zitrone\nChiliflocken optional",
                instructions: "Brot toasten\nAvocado halbieren und Kern entfernen\nMit Gabel zerdrücken\nMit Zitronensaft Salz und Pfeffer würzen\nAuf Toast streichen",
                preparation_time: 8,
                category: "Snack",
                calories: 350,
                image_url: "images/avocadotoast.jpg"
            },
            {
                title: "Bananenshake",
                description: "Cremiger Energiespender (Vegetarisch)",
                ingredients: "2 Bananen\n300ml Milch\n1 EL Honig\nEiswürfel",
                instructions: "Bananen schälen\nAlle Zutaten in Mixer geben\n30 Sekunden mixen\nIn Glas füllen\nSofort servieren",
                preparation_time: 5,
                category: "Getränk",
                image_url: "images/bananenshake.jpg",
            
                calories: 320,
                
            },
            {
                title: "Ofenkartoffel",
                description: "Einfache Beilage oder Hauptgericht (Vegetarisch)",
                ingredients: "4 große Kartoffeln\nOlivenöl\nSalz\nSauerrahm 150g\nSchnittlauch",
                instructions: "Kartoffeln waschen und halbieren\nMit Olivenöl und Salz bestreichen\nBei 200°C 40 Min backen\nMit Sauerrahm und Schnittlauch servieren\nNoch warm genießen",
                preparation_time: 45,
                category: "Hauptgericht",
                image_url: "images/offenkartoffeln.jpg",
            
                calories: 480,
                
            },
            {
                title: "Griechischer Joghurt mit Honig",
                description: "Gesundes Dessert in 2 Minuten (Vegetarisch)",
                ingredients: "250g griechischer Joghurt\n2 EL Honig\nHandvoll Walnüsse\nZimt",
                instructions: "Joghurt in Schale geben\nHonig darüber träufeln\nWalnüsse grob hacken und darüber streuen\nMit Zimt bestäuben\nSofort genießen",
                preparation_time: 5,
                category: "Dessert",
                image_url: "images/GriechischerJoghurtmitHonig.jpg",
            
                calories: 380,
                
            },
            {
                title: "Gemüsepfanne",
                description: "Schnelle vegetarische Pfanne (Vegan)",
                ingredients: "1 Paprika\n1 Zucchini\n1 Karotte\n1 Zwiebel\n2 EL Öl",
                instructions: "Gemüse waschen und schneiden\nÖl in Pfanne erhitzen\nZwiebel anbraten\nGemüse hinzufügen\n10 Min braten",
                preparation_time: 20,
                category: "Hauptgericht",
                image_url: "images/Gemüsepfanne.jpg",
            
                calories: 260,
                
            },
            {
                title: "French Toast",
                description: "Süßes Frühstück für besondere Tage (Vegetarisch)",
                ingredients: "4 Scheiben Brot\n2 Eier\n100ml Milch\n1 EL Zucker\nButter",
                instructions: "Brot in Eiermilch tränken\nButter in Pfanne erhitzen\nBrot von beiden Seiten goldbraun braten\nMit Zucker bestreuen\nWarm servieren",
                preparation_time: 15,
                category: "Hauptgericht",
                image_url: "images/FrenchToast.jpg",
            
                calories: 480
            },
            {
                title: "Caprese-Salat",
                description: "Italienischer Vorspeisensalat (Vegetarisch)",
                ingredients: "2 Tomaten\n125g Mozzarella\nBasilikum\nOlivenöl\nBalsamico",
                instructions: "Tomaten in Scheiben schneiden\nMozzarella in Scheiben schneiden\nAbwechselnd auf Teller anrichten\nMit Basilikum belegen\nMit Öl und Balsamico beträufeln",
                preparation_time: 10,
                category: "Vorspeise",
                image_url: "images/CapreseSalat.jpg",
            
                calories: 280
            },
            {
                title: "Hühnersuppe",
                description: "Stärkende Suppe bei Erkältung",
                ingredients: "200g Hühnerfleisch\n1 Karotte\n1 Stange Lauch\n2 L Wasser\nSalz Pfeffer",
                instructions: "Wasser zum Kochen bringen\nHühnerfleisch 20 Min kochen\nGemüse schneiden und hinzufügen\nWeitere 15 Min köcheln\nWürzen und servieren",
                preparation_time: 40,
                category: "Vorspeise",
                image_url: "images/Hühnersuppe.jpg",
            
                calories: 320
            },
            {
                title: "Quinoa-Salat",
                description: "Proteinreicher Powersalat (Vegetarisch)",
                ingredients: "200g Quinoa\n1 Gurke\n1 Paprika\nFeta-Käse\nZitronensaft",
                instructions: "Quinoa nach Packungsanweisung kochen\nGemüse würfeln\nAlles vermischen\nFeta darüber bröckeln\nMit Zitronensaft abschmecken",
                preparation_time: 25,
                category: "Hauptgericht",
                image_url: "images/Quinoa-Salat.jpg",
            
                calories: 420
            },
            {
                title: "Schokoladen-Mousse",
                description: "Luftiges Dessert (Vegetarisch)",
                ingredients: "200g dunkle Schokolade\n4 Eier\n2 EL Zucker\n100ml Sahne",
                instructions: "Schokolade schmelzen\nEier trennen\nEigelb unter Schokolade rühren\nEiweiß steif schlagen\nVorsichtig unterheben und kalt stellen",
                preparation_time: 30,
                category: "Dessert",image_url: "images/Schokoladen-Mousse.jpg",
            
                calories: 380
            },
            {
                title: "Thunfisch-Sandwich",
                description: "Schneller Snack für Zwischendurch",
                ingredients: "2 Scheiben Brot\n1 Dose Thunfisch\n2 EL Mayo\nSalatblätter\nTomate",
                instructions: "Thunfisch abtropfen lassen\nMit Mayo vermischen\nBrotscheiben toasten\nSalat und Tomate darauf\nThunfischmasse verteilen",
                preparation_time: 10,
                category: "Snack",image_url: "images/Thunfisch-Sandwich.jpg",
            
                calories: 390
            },
            {
                title: "Iced Coffee",
                description: "Erfrischender Kaltgetränk (Vegetarisch)",
                ingredients: "200ml Kaffee\nEiswürfel\n100ml Milch\n1 TL Zucker\nSirup nach Wahl",
                instructions: "Kaffee kochen und abkühlen\nGlas mit Eis füllen\nKalten Kaffee eingießen\nMilch und Zucker hinzufügen\nUmrühren und genießen",
                preparation_time: 5,
                category: "Getränk",image_url: "images/icedcoffe.jpg",
            
                calories: 180
            },
            {
                title: "Lachs mit Gemüse",
                description: "Gesundes Fischgericht",
                ingredients: "2 Lachsfilets\n1 Brokkoli\n1 Karotte\nZitrone\nDill",
                instructions: "Brokkoli und Karotte schneiden\nLachs mit Zitrone beträufeln\nAlles im Ofen bei 180°C 20 Min garen\nMit Dill bestreuen\nHeiß servieren",
                preparation_time: 25,
                category: "Hauptgericht",image_url: "images/lachsmitgemuse.jpg",
            
                calories: 520
            },
            {
                title: "Energy Balls",
                description: "Energie-Kugeln für Sportler (Vegan)",
                ingredients: "100g Haferflocken\n2 EL Erdnussbutter\n1 EL Honig\nKokosraspeln\nKakao",
                instructions: "Alle Zutaten vermischen\nZu einer Masse kneten\nKleine Kugeln formen\nIn Kokosraspeln wälzen\n30 Min kühlen",
                preparation_time: 15,
                category: "Snack",image_url: "images/Energyballs.jpg",
            
                calories: 320
            },
            {
                title: "Minestrone",
                description: "Italienische Gemüsesuppe (Vegan)",
                ingredients: "2 Kartoffeln\n2 Karotten\n1 Zucchini\n100g Bohnen\nTomatenmark",
                instructions: "Gemüse würfeln\nIn Topf mit Öl anbraten\nMit Wasser ablöschen\n20 Min köcheln\nMit Balsamico abschmecken",
                preparation_time: 30,
                category: "Vorspeise",image_url: "images/minestrone.jpg",
            
                calories: 240
            },
            {
                title: "Zucchini-Nudeln",
                description: "Low-Carb Alternative (Vegetarisch)",
                ingredients: "2 Zucchini\n1 EL Öl\nKnoblauch\nParmesan\nBasilikum",
                instructions: "Zucchini mit Spiralschneider zu Nudeln formen\nÖl in Pfanne erhitzen\nKnoblauch anbraten\nZucchini-Nudeln 3 Min braten\nMit Parmesan und Basilikum servieren",
                preparation_time: 15,
                category: "Hauptgericht",image_url: "images/zuchini.jpg",
            
                calories: 220
            },
            {
                title: "Beeren-Smoothie",
                description: "Vitaminreicher Start in den Tag (Vegetarisch)",
                ingredients: "100g gemischte Beeren\n1 Banane\n200ml Joghurt\nHonig\nEiswürfel",
                instructions: "Beeren waschen\nBananen schälen\nAlle Zutaten in Mixer geben\nCremig mixen\nSofort trinken",
                preparation_time: 7,
                category: "Getränk",image_url: "images/beerensmoothie.jpg",
            
                calories: 260
            },
            {
                title: "Käseomelett",
                description: "Sättigendes Eigericht (Vegetarisch)",
                ingredients: "3 Eier\n50g Käse\n1 EL Milch\nButter\nSchnittlauch",
                instructions: "Eier mit Milch verquirlen\nButter in Pfanne schmelzen\nEiermasse eingießen\nKäse darüber streuen\nZuklappen und goldbraun braten",
                preparation_time: 12,
                category: "Hauptgericht",image_url: "images/kaeseomelett.webp",
            
                calories: 420
            },
            {
                title: "Guacamole",
                description: "Mexikanischer Avocado-Dip (Vegan)",
                ingredients: "2 Avocados\n1 Zwiebel\n1 Tomate\nLimettensaft\nKoriander",
                instructions: "Avocados zerdrücken\nZwiebel und Tomate fein hacken\nAlles vermischen\nMit Limettensaft beträufeln\nMit Koriander würzen",
                preparation_time: 10,
                category: "Snack",image_url: "images/Guacamole.jpeg",
            
                calories: 290
            },
            {
                title: "Reis mit Gemüse",
                description: "Einfache Beilage oder Hauptgericht (Vegan)",
                ingredients: "200g Reis\n1 Paprika\n1 Karotte\n1 Zwiebel\nSojasauce",
                instructions: "Reis nach Packungsanweisung kochen\nGemüse schneiden und anbraten\nReis hinzufügen\nMit Sojasauce würzen\nAlles vermengen",
                preparation_time: 25,
                category: "Hauptgericht",image_url: "images/reismitgemuse.jpg",
            
                calories: 450
            },
            {
                title: "Apfelmus",
                description: "Selbstgemachter Fruchtmus (Vegan)",
                ingredients: "4 Äpfel\n1 Zimtstange\n2 EL Zucker\n100ml Wasser\nZitronensaft",
                instructions: "Äpfel schälen und würfeln\nMit Wasser und Zucker kochen\n15 Min weich köcheln\nZimt entfernen\nMit Zitronensaft pürieren",
                preparation_time: 20,
                category: "Dessert",image_url: "images/apfelmuss.jpg",
            
                calories: 200
            },
            {
                title: "Hummus",
                description: "Cremiger Kichererbsen-Dip (Vegan)",
                ingredients: "1 Dose Kichererbsen\n2 EL Tahini\n1 Knoblauchzehe\nZitronensaft\nKreuzkümmel",
                instructions: "Kichererbsen abtropfen lassen\nAlle Zutaten in Mixer geben\nCremig mixen\nBei Bedarf Wasser hinzufügen\nMit Öl beträufeln",
                preparation_time: 15,
                category: "Snack",image_url: "images/hummus.jpg",
            
                calories: 340
            },
            {
                title: "Ratatouille",
                description: "Französisches Gemüsegericht (Vegan)",
                ingredients: "1 Aubergine\n2 Zucchini\n2 Tomaten\n1 Zwiebel\nKräuter der Provence",
                instructions: "Gemüse in Scheiben schneiden\nSchichtweise in Form anordnen\nMit Kräutern würzen\nBei 180°C 40 Min backen\nHeiß oder kalt servieren",
                preparation_time: 50,
                category: "Hauptgericht",image_url: "images/ratatoile.jpg",
            
                calories: 280
            },
            {
                title: "Grüner Smoothie",
                description: "Gesunder Vitaminboost (Vegan)",
                ingredients: "1 Handvoll Spinat\n1 Banane\n1 Apfel\n200ml Wasser\n1 TL Chiasamen",
                instructions: "Spinat waschen\nApfel entkernen\nAlle Zutaten in Mixer geben\nGlatt mixen\nSofort genießen",
                preparation_time: 8,
                category: "Getränk",image_url: "images/gruenersmoothie.jpg",
            
                calories: 180
            }
        ];
        
        demoRecipes.forEach(recipe => {
            db.run(
                `INSERT INTO recipes (title, description, ingredients, instructions, preparation_time, category, image_url, calories) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [recipe.title, recipe.description, recipe.ingredients, recipe.instructions, 
                 recipe.preparation_time, recipe.category, 'images/placeholder.svg', recipe.calories || null]
            );
        });
        
        console.log("Demodaten eingefügt");
    }
}

// Holt alle Rezepte
function getAllRecipes() {
    try {
        const result = db.exec(`
            SELECT id, title, description, ingredients, instructions, 
                   preparation_time, category, image_url, calories, is_favorite 
            FROM recipes 
            ORDER BY created_at DESC
        `);
        
        if (result.length === 0) return [];
        
        return result[0].values.map(row => ({
            id: row[0],
            title: row[1],
            description: row[2],
            ingredients: row[3],
            instructions: row[4],
            preparation_time: row[5],
            category: row[6],
            image_url: row[7],
            calories: row[8],
            is_favorite: row[9] === 1
        }));
    } catch (error) {
        console.error("Fehler beim Laden der Rezepte:", error);
        return [];
    }
}

// Holt ein bestimmtes Rezept
function getRecipeById(id) {
    try {
        const result = db.exec(
            `SELECT id, title, description, ingredients, instructions, 
                    preparation_time, category, image_url, calories, is_favorite 
             FROM recipes 
             WHERE id = ?`,
            [id]
        );
        
        if (result.length === 0 || result[0].values.length === 0) return null;
        
        const row = result[0].values[0];
        return {
            id: row[0],
            title: row[1],
            description: row[2],
            ingredients: row[3],
            instructions: row[4],
            preparation_time: row[5],
            category: row[6],
            image_url: row[7],
            calories: row[8],
            is_favorite: row[9] === 1
        };
    } catch (error) {
        console.error("Fehler beim Laden des Rezepts:", error);
        return null;
    }
}

// Fügt ein neues Rezept hinzu
function addRecipe(recipe) {
    try {
        db.run(
            `INSERT INTO recipes (title, description, ingredients, instructions, preparation_time, category, image_url, calories) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [recipe.title, recipe.description, recipe.ingredients, 
             recipe.instructions, recipe.preparation_time, recipe.category, 
             recipe.image_url || null, recipe.calories || null]
        );
        
        // Datenbank speichern
        saveDatabase();
        
        return true;
    } catch (error) {
        console.error("Fehler beim Hinzufügen des Rezepts:", error);
        return false;
    }
}

// Aktualisiert den Favoriten-Status
// Aktualisiert den Favoriten-Status
function toggleFavorite(recipeId) {
    try {
        const recipe = getRecipeById(recipeId);
        if (!recipe) return false;
        
        db.run(
            `UPDATE recipes SET is_favorite = ? WHERE id = ?`,
            [recipe.is_favorite ? 0 : 1, recipeId]
        );
        
        // Datenbank speichern
        saveDatabase();
        
        return true;
    } catch (error) {
        console.error("Fehler beim Aktualisieren des Favoriten-Status:", error);
        return false;
    }
}

// Holt Favoriten
function getFavorites() {
    try {
        const result = db.exec(`
            SELECT id, title, description, ingredients, instructions, 
                   preparation_time, category, image_url, calories, is_favorite 
            FROM recipes 
            WHERE is_favorite = 1 
            ORDER BY title
        `);
        
        if (result.length === 0) return [];
        
        return result[0].values.map(row => ({
            id: row[0],
            title: row[1],
            description: row[2],
            ingredients: row[3],
            instructions: row[4],
            preparation_time: row[5],
            category: row[6],
            image_url: row[7],
            calories: row[8],
            is_favorite: row[9] === 1
        }));
    } catch (error) {
        console.error("Fehler beim Laden der Favoriten:", error);
        return [];
    }
}

// Holt Rezepte nach Kategorie
function getRecipesByCategory(category) {
    try {
        const result = db.exec(`
            SELECT id, title, description, ingredients, instructions, 
                   preparation_time, category, is_favorite 
            FROM recipes 
            WHERE category = ? 
            ORDER BY title
        `, [category]);
        
        if (result.length === 0) return [];
        
        return result[0].values.map(row => ({
            id: row[0],
            title: row[1],
            description: row[2],
            ingredients: row[3],
            instructions: row[4],
            preparation_time: row[5],
            category: row[6],
            is_favorite: row[7] === 1
        }));
    } catch (error) {
        console.error("Fehler beim Laden der Rezepte nach Kategorie:", error);
        return [];
    }
}

// Sucht nach Rezepten
function searchRecipes(query) {
    try {
        const result = db.exec(`
            SELECT id, title, description, ingredients, instructions, 
                   preparation_time, category, image_url, calories, is_favorite 
            FROM recipes 
            WHERE title LIKE ? OR description LIKE ? OR ingredients LIKE ?
            ORDER BY title
        `, [`%${query}%`, `%${query}%`, `%${query}%`]);
        
        if (result.length === 0) return [];
        
        return result[0].values.map(row => ({
            id: row[0],
            title: row[1],
            description: row[2],
            ingredients: row[3],
            instructions: row[4],
            preparation_time: row[5],
            category: row[6],
            image_url: row[7],
            calories: row[8],
            is_favorite: row[9] === 1
        }));
    } catch (error) {
        console.error("Fehler bei der Suche:", error);
        return [];
    }
}

// Holt Statistik-Daten
function getStats() {
    try {
        const totalResult = db.exec("SELECT COUNT(*) FROM recipes");
        const quickResult = db.exec("SELECT COUNT(*) FROM recipes WHERE preparation_time <= 15");
        const favoritesResult = db.exec("SELECT COUNT(*) FROM recipes WHERE is_favorite = 1");
        
        return {
            total: totalResult[0]?.values[0][0] || 0,
            quick: quickResult[0]?.values[0][0] || 0,
            favorites: favoritesResult[0]?.values[0][0] || 0
        };
    } catch (error) {
        console.error("Fehler beim Laden der Statistiken:", error);
        return { total: 0, quick: 0, favorites: 0 };
    }
}