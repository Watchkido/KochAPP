import csv
import os

# Test ob Rezepte gelesen werden können
RECIPES_FILE = 'recipes.csv'

print(f"Arbeitsverzeichnis: {os.getcwd()}")
print(f"Datei existiert: {os.path.exists(RECIPES_FILE)}")
print(f"Absoluter Pfad: {os.path.abspath(RECIPES_FILE)}")

try:
    with open(RECIPES_FILE, 'r', encoding='utf-8-sig') as f:
        content = f.read()
        print(f"\nDateigröße: {len(content)} Zeichen")
        print(f"Erste 200 Zeichen:\n{content[:200]}")
        
    with open(RECIPES_FILE, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        print(f"\nHeader/Fieldnames: {reader.fieldnames}")
        recipes = list(reader)
        print(f"Anzahl Rezepte gefunden: {len(recipes)}")
        print("\nErste 3 Rezepte:")
        for i, recipe in enumerate(recipes[:3]):
            print(f"\nRezept {i+1}:")
            print(f"  ID: {recipe.get('id', 'FEHLT')}")
            print(f"  Titel: {recipe.get('title', 'FEHLT')}")
            print(f"  Alle Keys: {list(recipe.keys())}")
except Exception as e:
    print(f"FEHLER beim Lesen: {e}")
    import traceback
    traceback.print_exc()
