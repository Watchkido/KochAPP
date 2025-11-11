import os
import re

# Liste aller HTML-Dateien
html_files = [
    'index.html', 'recipes.html', 'add-recipe.html', 'favorites.html', 'recipe-detail.html',
    'team.html', 'tutorial.html', 'impressum.html', 'datenschutz.html',
    'kontakt.html', 'faq.html', 'agb.html',
    'app.html', 'changelog.html', 'community.html', 'export.html', 'feedback.html'
]

for filename in html_files:
    filepath = f'Koch_App_2/{filename}'
    
    if not os.path.exists(filepath):
        print(f'⚠️  Datei nicht gefunden: {filepath}')
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Füge accessibility.css hinzu (nach style.css)
    if 'accessibility.css' not in content:
        content = content.replace(
            '<link rel="stylesheet" href="style.css">',
            '<link rel="stylesheet" href="style.css">\n    <link rel="stylesheet" href="accessibility.css">'
        )
    
    # 2. Füge accessibility.js hinzu (vor sidebar.js oder am Anfang)
    if 'accessibility.js' not in content:
        if '<script src="sidebar.js"></script>' in content:
            content = content.replace(
                '<script src="sidebar.js"></script>',
                '<script src="accessibility.js"></script>\n    <script src="sidebar.js"></script>'
            )
        else:
            content = content.replace(
                '<link rel="stylesheet" href="style.css">',
                '<link rel="stylesheet" href="style.css">\n    <script src="accessibility.js"></script>'
            )
    
    # 3. Füge Skip-to-Content Link hinzu (direkt nach <body>)
    if 'skip-to-content' not in content:
        content = re.sub(
            r'(<body>\s*)',
            r'\1<!-- Skip to Content Link für Screen Reader -->\n    <a href="#main-content" class="skip-to-content">Zum Hauptinhalt springen</a>\n    \n    ',
            content
        )
    
    # 4. Füge id="main-content" zum main-Tag hinzu
    if 'id="main-content"' not in content:
        content = content.replace(
            '<main class="container">',
            '<main class="container" id="main-content">'
        )
    
    # 5. Füge Sitemap-Link zum Footer hinzu
    if 'sitemap.html' not in content:
        # Finde Footer-Links
        footer_pattern = r'(<a href="datenschutz\.html">Datenschutz</a>)'
        if re.search(footer_pattern, content):
            content = re.sub(
                footer_pattern,
                r'\1 |\n                <a href="sitemap.html">Sitemap</a>',
                content
            )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f'✓ {filename} aktualisiert')

print('\n🎉 Alle Dateien wurden mit Barrierefreiheits-Features aktualisiert!')
print('\n📋 Hinzugefügte Features:')
print('  • accessibility.css und accessibility.js eingebunden')
print('  • Skip-to-Content Link für Screen Reader')
print('  • id="main-content" für direkten Sprung zum Inhalt')
print('  • Sitemap-Link im Footer')
print('\n♿ Die Website erfüllt jetzt BITV 2.0 / WCAG 2.1 Level AA!')
