import os
import re

# Liste der zu bearbeitenden HTML-Dateien
html_files = [
    'recipes.html', 'add-recipe.html', 'favorites.html', 'recipe-detail.html',
    'team.html', 'tutorial.html', 'impressum.html', 'datenschutz.html',
    'kontakt.html', 'faq.html', 'agb.html'
]

for filename in html_files:
    filepath = f'Koch_App_2/{filename}'
    
    if not os.path.exists(filepath):
        print(f'Datei nicht gefunden: {filepath}')
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Füge sidebar.js zum head hinzu (falls noch nicht vorhanden)
    if 'sidebar.js' not in content:
        content = content.replace(
            '<link rel="stylesheet" href="style.css">',
            '<link rel="stylesheet" href="style.css">\n    <script src="sidebar.js"></script>'
        )
    
    # 2. Füge Menu-Toggle-Button und Overlay hinzu (falls noch nicht vorhanden)
    if 'menu-toggle' not in content:
        # Finde die Stelle nach <body>
        content = re.sub(
            r'(<body>\s*)',
            r'\1<!-- Menu Toggle Button -->\n    <button class="menu-toggle" id="menuToggle" aria-label="Menü öffnen">☰</button>\n    \n    <!-- Overlay -->\n    <div class="sidebar-overlay" id="sidebarOverlay"></div>\n    \n    ',
            content
        )
    
    # 3. Füge ID zum sidebar hinzu
    content = content.replace(
        '<aside class="sidebar">',
        '<aside class="sidebar" id="sidebar">'
    )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f'✓ {filename} aktualisiert')

print('\nAlle Dateien wurden aktualisiert!')
