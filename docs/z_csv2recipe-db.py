#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
CSV zu JavaScript Recipe-DB Converter
Konvertiert recipes.csv in JavaScript-Code für recipe-db.js
"""

import csv
import json
import os

# Pfad zur CSV-Datei (relativ oder absolut)
CSV_FILE = '../Koch_app_1/z_recipes.csv'
OUTPUT_FILE = 'recipe-db.js'

def convert_csv_to_js():
    """Liest CSV und konvertiert zu JavaScript-Code"""
    
    if not os.path.exists(CSV_FILE):
        print(f"❌ Fehler: CSV-Datei nicht gefunden: {CSV_FILE}")
        return
    
    recipes = []
    
    # CSV einlesen
    try:
        with open(CSV_FILE, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                # CSV Format: ingredients und steps mit | getrennt
                # JS Format: mit \n getrennt
                ingredients = row['ingredients'].replace('|', '\n')
                steps = row['steps'].replace('|', '\n')
                
                recipe = {
                    'title': row['title'],
                    'description': row['description'],
                    'ingredients': ingredients,
                    'instructions': steps,  # steps -> instructions
                    'preparation_time': int(row['prep_time']),
                    'category': row['category']
                }
                recipes.append(recipe)
        
        print(f"✅ {len(recipes)} Rezepte aus CSV gelesen")
        
    except Exception as e:
        print(f"❌ Fehler beim Lesen der CSV: {e}")
        return
    
    # JavaScript-Code generieren
    js_code = generate_js_code(recipes)
    
    # In recipe-db.js schreiben
    try:
        # Alte recipe-db.js lesen
        with open(OUTPUT_FILE, 'r', encoding='utf-8') as f:
            old_content = f.read()
        
        # Finde den Teil mit demoRecipes
        start_marker = "const demoRecipes = ["
        end_marker = "];"
        
        start_idx = old_content.find(start_marker)
        end_idx = old_content.find(end_marker, start_idx) + len(end_marker)
        
        if start_idx == -1:
            print("❌ Fehler: Konnte demoRecipes Array nicht finden")
            return
        
        # Ersetze demoRecipes
        new_content = (
            old_content[:start_idx] + 
            js_code + 
            old_content[end_idx:]
        )
        
        # Schreibe zurück
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✅ recipe-db.js erfolgreich aktualisiert!")
        print(f"   {len(recipes)} Rezepte eingefügt")
        
    except Exception as e:
        print(f"❌ Fehler beim Schreiben der JS-Datei: {e}")

def generate_js_code(recipes):
    """Generiert JavaScript-Code für das demoRecipes Array"""
    
    js_recipes = []
    
    for recipe in recipes:
        # Escape Anführungszeichen und Backslashes
        title = escape_js_string(recipe['title'])
        description = escape_js_string(recipe['description'])
        ingredients = escape_js_string(recipe['ingredients'])
        instructions = escape_js_string(recipe['instructions'])
        category = escape_js_string(recipe['category'])
        prep_time = recipe['preparation_time']
        
        js_recipe = f"""            {{
                title: "{title}",
                description: "{description}",
                ingredients: "{ingredients}",
                instructions: "{instructions}",
                preparation_time: {prep_time},
                category: "{category}"
            }}"""
        
        js_recipes.append(js_recipe)
    
    # Kombiniere alle Rezepte
    recipes_code = ",\n".join(js_recipes)
    
    return f"""const demoRecipes = [
{recipes_code}
        ];"""

def escape_js_string(text):
    """Escaped einen String für JavaScript"""
    if not text:
        return ""
    
    # Ersetze spezielle Zeichen
    text = text.replace('\\', '\\\\')  # Backslash
    text = text.replace('"', '\\"')     # Anführungszeichen
    text = text.replace('\n', '\\n')    # Zeilenumbruch
    text = text.replace('\r', '')       # Carriage Return entfernen
    text = text.replace('\t', '\\t')    # Tab
    
    return text

def print_preview():
    """Zeigt eine Vorschau der ersten 3 Rezepte"""
    try:
        with open(CSV_FILE, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            recipes = list(reader)[:3]
        
        print("\n📋 Vorschau der ersten 3 Rezepte:")
        print("=" * 60)
        
        for i, recipe in enumerate(recipes, 1):
            print(f"\n{i}. {recipe['title']}")
            print(f"   Kategorie: {recipe['category']}")
            print(f"   Zeit: {recipe['prep_time']} Min")
            print(f"   Beschreibung: {recipe['description'][:50]}...")
        
        print("\n" + "=" * 60)
        
    except Exception as e:
        print(f"❌ Fehler bei Vorschau: {e}")

if __name__ == '__main__':
    print("🍳 CSV zu Recipe-DB Converter")
    print("=" * 60)
    
    # Vorschau anzeigen
    print_preview()
    
    # Konvertierung starten
    print("\n🔄 Starte Konvertierung...")
    convert_csv_to_js()
    
    print("\n✨ Fertig!")
