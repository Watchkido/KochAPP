import os
import re

# Liste der minimierten HTML-Dateien
html_files = ['changelog.html', 'community.html', 'export.html', 'feedback.html']

for filename in html_files:
    filepath = f'Koch_App_2/{filename}'
    
    if not os.path.exists(filepath):
        print(f'Datei nicht gefunden: {filepath}')
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Füge sidebar.js, button und overlay hinzu
    content = content.replace(
        '<link rel="stylesheet" href="style.css">',
        '<link rel="stylesheet" href="style.css"><script src="sidebar.js"></script>'
    )
    
    content = content.replace(
        '<body>',
        '<body>\n<button class="menu-toggle" id="menuToggle" aria-label="Menü öffnen">☰</button>\n<div class="sidebar-overlay" id="sidebarOverlay"></div>\n'
    )
    
    content = content.replace(
        '<aside class="sidebar">',
        '<aside class="sidebar" id="sidebar">'
    )
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f'✓ {filename} aktualisiert')

print('\nAlle minimierten Dateien wurden aktualisiert!')
