from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
import csv
import os
from datetime import datetime

# Setze das Arbeitsverzeichnis auf den Ordner, in dem app.py liegt
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(BASE_DIR)

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'

# CSV Datei für Rezepte (jetzt relativ zum Script-Verzeichnis)
RECIPES_FILE = os.path.join(BASE_DIR, 'recipes.csv')
FAVORITES_FILE = os.path.join(BASE_DIR, 'favorites.csv')

def init_csv():
    """Initialisiert die CSV-Dateien falls nicht vorhanden"""
    if not os.path.exists(RECIPES_FILE):
        with open(RECIPES_FILE, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow(['id', 'title', 'description', 'ingredients', 'steps', 'prep_time', 'category', 'created_at'])
    
    if not os.path.exists(FAVORITES_FILE):
        with open(FAVORITES_FILE, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow(['recipe_id'])

def get_next_recipe_id():
    """Generiert die nächste Recipe ID"""
    try:
        with open(RECIPES_FILE, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            recipes = list(reader)
            if recipes:
                return max(int(recipe['id']) for recipe in recipes) + 1
            return 1
    except:
        return 1

def get_all_recipes():
    """Holt alle Rezepte aus der CSV"""
    recipes = []
    try:
        with open(RECIPES_FILE, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            recipes = list(reader)
    except Exception as e:
        print(f"Error reading recipes: {e}")
    return recipes

def get_favorites():
    """Holt alle Favoriten"""
    favorites = []
    try:
        with open(FAVORITES_FILE, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            favorites = [row['recipe_id'] for row in reader]
    except:
        pass
    return favorites

def save_recipe(recipe_data):
    """Speichert ein neues Rezept"""
    try:
        with open(RECIPES_FILE, 'a', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow([
                recipe_data['id'],
                recipe_data['title'],
                recipe_data['description'],
                recipe_data['ingredients'],
                recipe_data['steps'],
                recipe_data['prep_time'],
                recipe_data['category'],
                recipe_data['created_at']
            ])
        return True
    except Exception as e:
        print(f"Error saving recipe: {e}")
        return False

def toggle_favorite(recipe_id):
    """Fügt Rezept zu Favoriten hinzu oder entfernt es"""
    favorites = get_favorites()
    
    if recipe_id in favorites:
        favorites.remove(recipe_id)
    else:
        favorites.append(recipe_id)
    
    try:
        with open(FAVORITES_FILE, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow(['recipe_id'])
            for fav in favorites:
                writer.writerow([fav])
        return True
    except Exception as e:
        print(f"Error updating favorites: {e}")
        return False

@app.route('/')
def index():
    """Startseite mit Rezeptliste"""
    recipes = get_all_recipes()
    favorites = get_favorites()
    
    # Markiere Favoriten
    for recipe in recipes:
        recipe['is_favorite'] = recipe['id'] in favorites
    
    return render_template('index.html', recipes=recipes)

@app.route('/recipe/<recipe_id>')
def recipe_detail(recipe_id):
    """Rezept-Detailseite"""
    recipes = get_all_recipes()
    favorites = get_favorites()
    
    recipe = next((r for r in recipes if r['id'] == recipe_id), None)
    
    if recipe:
        recipe['is_favorite'] = recipe['id'] in favorites
        # Konvertiere Zutaten und Schritte zurück zu Listen
        recipe['ingredients_list'] = recipe['ingredients'].split('|')
        recipe['steps_list'] = recipe['steps'].split('|')
        return render_template('recipe_detail.html', recipe=recipe)
    else:
        flash('Rezept nicht gefunden!', 'error')
        return redirect(url_for('index'))

@app.route('/add-recipe', methods=['GET', 'POST'])
def add_recipe():
    """Neues Rezept hinzufügen"""
    if request.method == 'POST':
        # Formulardaten verarbeiten
        title = request.form.get('title', '').strip()
        description = request.form.get('description', '').strip()
        ingredients = request.form.get('ingredients', '').strip()
        steps = request.form.get('steps', '').strip()
        prep_time = request.form.get('prep_time', '').strip()
        category = request.form.get('category', 'Hauptgericht')
        
        # Validierung
        if not title or not ingredients or not steps:
            flash('Bitte füllen Sie alle Pflichtfelder aus!', 'error')
            return render_template('add_recipe.html')
        
        # Rezept speichern
        recipe_data = {
            'id': str(get_next_recipe_id()),
            'title': title,
            'description': description,
            'ingredients': ingredients.replace('\n', '|'),  # Zeilenumbrüche durch | ersetzen
            'steps': steps.replace('\n', '|'),
            'prep_time': prep_time,
            'category': category,
            'created_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        
        if save_recipe(recipe_data):
            flash('Rezept erfolgreich hinzugefügt!', 'success')
            return redirect(url_for('index'))
        else:
            flash('Fehler beim Speichern des Rezepts!', 'error')
    
    return render_template('add_recipe.html')

@app.route('/toggle-favorite/<recipe_id>')
def toggle_favorite_route(recipe_id):
    """Favorit umschalten"""
    if toggle_favorite(recipe_id):
        return jsonify({'success': True})
    return jsonify({'success': False}), 400

@app.route('/favorites')
def favorites():
    """Favoriten-Seite"""
    recipes = get_all_recipes()
    favorites_list = get_favorites()
    
    favorite_recipes = [r for r in recipes if r['id'] in favorites_list]
    
    for recipe in favorite_recipes:
        recipe['is_favorite'] = True
    
    return render_template('favorites.html', recipes=favorite_recipes)

if __name__ == '__main__':
    init_csv()
    # host='0.0.0.0' macht die App im Netzwerk verfügbar
    app.run(debug=True, host='0.0.0.0', port=5000)