/**
 * script.js
 * UI- und Rezeptlogik für YummyGo.
 * Entwicklerhinweis: Hier werden alle Interaktionen und die Anzeige der Rezepte gesteuert.
 */
// Gemeinsame Funktionen für alle Seiten
document.addEventListener('DOMContentLoaded', function() {
    // Navigation aktiver Link
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Lädt die vorgestellten Rezepte auf der Startseite
async function loadFeaturedRecipes() {
    let allRecipes = getAllRecipes();
    // Rezepte mischen (Fisher-Yates)
    for (let i = allRecipes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allRecipes[i], allRecipes[j]] = [allRecipes[j], allRecipes[i]];
    }
    const recipes = allRecipes.slice(0, 3); // 3 zufällige Rezepte
    
    const container = document.getElementById('featured-recipes-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (recipes.length === 0) {
        container.innerHTML = '<p>Noch keine Rezepte vorhanden. <a href="add-recipe.html">Fügen Sie das erste Rezept hinzu!</a></p>';
        return;
    }
    
    recipes.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        container.appendChild(recipeCard);
    });
}

// Erstellt eine Rezept-Karte
function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    
    // Debug: Zeige an, ob image_url vorhanden ist
    console.log(`Rezept "${recipe.title}": image_url = "${recipe.image_url}"`);
    
    // Bild-URL oder Platzhalter
    const imageHtml = recipe.image_url 
        ? `<img src="${escapeHtml(recipe.image_url)}" alt="${escapeHtml(recipe.title)}" onerror="this.parentElement.innerHTML='<span>📷</span>'">`
        : `<span>📷</span>`;
    
    card.innerHTML = `
        <div class="recipe-image">
            ${imageHtml}
        </div>
        <div class="recipe-content">
            <h3 class="recipe-title">${escapeHtml(recipe.title)}</h3>
            <p class="recipe-description">${escapeHtml(recipe.description || '')}</p>
            <div class="recipe-meta">
                <span>${recipe.preparation_time} Min.</span>
                <span>${recipe.category || 'Sonstige'}</span>
                <button class="favorite-btn ${recipe.is_favorite ? 'active' : ''}" 
                        onclick="toggleFavoriteUI(${recipe.id}, this)">
                    ${recipe.is_favorite ? '♥' : '♡'}
                </button>
            </div>
            <a href="recipe-detail.html?id=${recipe.id}" class="btn secondary" style="margin-top: 10px; display: inline-block;">
                Zum Rezept
            </a>
        </div>
    `;
    return card;
}

// Aktualisiert die Statistiken auf der Startseite
async function updateStats() {
    const stats = getStats();
    
    const totalElement = document.getElementById('total-recipes');
    const quickElement = document.getElementById('quick-recipes');
    const favoritesElement = document.getElementById('favorite-count');
    
    if (totalElement) totalElement.textContent = stats.total;
    if (quickElement) quickElement.textContent = stats.quick;
    if (favoritesElement) favoritesElement.textContent = stats.favorites;
}

// Favoriten umschalten
async function toggleFavoriteUI(recipeId, button) {
    const success = toggleFavorite(recipeId);
    
    if (success) {
        // Neuen Status aus DB holen
        const recipe = getRecipeById(recipeId);
        
        // UI aktualisieren
        if (button && recipe) {
            if (recipe.is_favorite) {
                button.classList.add('active');
                button.innerHTML = '♥';
            } else {
                button.classList.remove('active');
                button.innerHTML = '♡';
            }
        }
    }
}

// Hilfsfunktion zur HTML-Escape
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Formular-Handling für neue Rezepte
function setupRecipeForm() {
    const form = document.getElementById('add-recipe-form');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const recipe = {
            title: formData.get('title'),
            description: formData.get('description'),
            ingredients: formData.get('ingredients'),
            instructions: formData.get('instructions'),
            preparation_time: parseInt(formData.get('preparation_time')),
            category: formData.get('category'),
            calories: formData.get('calories') ? parseInt(formData.get('calories')) : null,
            image_url: formData.get('image_url') || null
        };
        
        if (addRecipe(recipe)) {
            alert('Rezept erfolgreich hinzugefügt!');
            form.reset();
            window.location.href = 'recipes.html';
        } else {
            alert('Fehler beim Hinzufügen des Rezepts. Bitte versuchen Sie es erneut.');
        }
    });
}

// Lädt alle Rezepte auf der Rezepte-Seite
async function loadAllRecipes() {
    let recipes = getAllRecipes();
    // Filter aus URL auslesen
    const params = new URLSearchParams(window.location.search);
    const filter = params.get('filter');
    if (filter === 'vegan') {
        recipes = recipes.filter(r => (r.description || '').toLowerCase().includes('vegan'));
    } else if (filter === 'vegetarisch') {
        recipes = recipes.filter(r => (r.description || '').toLowerCase().includes('vegetarisch'));
    }
    
    const container = document.getElementById('all-recipes-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (recipes.length === 0) {
        container.innerHTML = '<p>Noch keine Rezepte vorhanden. <a href="add-recipe.html">Fügen Sie das erste Rezept hinzu!</a></p>';
        return;
    }
    
    recipes.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        container.appendChild(recipeCard);
    });
}

// Lädt Favoriten auf der Favoriten-Seite
async function loadFavorites() {
    const favorites = getFavorites();
    
    const container = document.getElementById('favorites-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (favorites.length === 0) {
        container.innerHTML = '<p>Noch keine Favoriten vorhanden. Markieren Sie Rezepte als Favorit, um sie hier zu sehen.</p>';
        return;
    }
    
    favorites.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        container.appendChild(recipeCard);
    });
}

// Suchfunktion
function setupSearch() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    
    if (!searchForm || !searchInput) return;
    
    searchForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        await performSearch(searchInput.value);
    });
    
    searchInput.addEventListener('input', function() {
        if (this.value === '') {
            loadAllRecipes();
        }
    });
}

async function performSearch(query) {
    const results = searchRecipes(query);
    
    const container = document.getElementById('all-recipes-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (results.length === 0) {
        container.innerHTML = `<p>Keine Rezepte gefunden für "${query}".</p>`;
        return;
    }
    
    results.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        container.appendChild(recipeCard);
    });
}

// Lädt Rezept-Details
async function loadRecipeDetail(recipeId) {
    await initDatabase();
    const recipe = getRecipeById(parseInt(recipeId));
    
    const container = document.getElementById('recipe-detail');
    if (!container) return;
    
    if (!recipe) {
        container.innerHTML = `
            <div class="error-message">
                <h2>Rezept nicht gefunden</h2>
                <p>Das gewünschte Rezept existiert nicht.</p>
                <a href="recipes.html" class="btn primary">Zurück zur Übersicht</a>
            </div>
        `;
        return;
    }
    
    // Zutaten und Schritte in Listen umwandeln
    const ingredientsList = recipe.ingredients.split('\n')
        .filter(i => i.trim())
        .map(i => `<li>${escapeHtml(i)}</li>`)
        .join('');
    
    const instructionsList = recipe.instructions.split('\n')
        .filter(s => s.trim())
        .map((s, index) => `<li><strong>Schritt ${index + 1}:</strong> ${escapeHtml(s)}</li>`)
        .join('');
    
    container.innerHTML = `
        <div class="recipe-detail-header">
            <a href="recipes.html" class="back-link">← Zurück zur Übersicht</a>
            <button class="favorite-btn ${recipe.is_favorite ? 'active' : ''}" 
                    onclick="toggleFavoriteUI(${recipe.id}, this)" style="float: right; font-size: 2rem;">
                ${recipe.is_favorite ? '♥' : '♡'}
            </button>
        </div>
        
        <h1>${escapeHtml(recipe.title)}</h1>
        
        ${recipe.image_url ? `
        <div class="recipe-detail-image" style="margin: 2rem 0;">
            <img src="${escapeHtml(recipe.image_url)}" 
                 alt="${escapeHtml(recipe.title)}" 
                 style="max-width: 100%; height: auto; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
                 onerror="this.style.display='none'">
        </div>
        ` : ''}
        
        <div class="recipe-meta" style="margin-bottom: 2rem;">
            <span><strong>⏱️ Zubereitungszeit:</strong> ${recipe.preparation_time} Minuten</span>
            <span><strong>🍽️ Kategorie:</strong> ${recipe.category || 'Sonstige'}</span>
            ${recipe.calories ? `<span><strong>🔥 Kalorien:</strong> ${recipe.calories} kcal</span>` : ''}
        </div>
        
        ${recipe.description ? `<p class="recipe-description" style="font-size: 1.1rem; color: #666; margin-bottom: 2rem;">${escapeHtml(recipe.description)}</p>` : ''}
        
        <div class="recipe-detail-content">
            <div class="ingredients-section">
                <h2>📋 Zutaten</h2>
                <ul>
                    ${ingredientsList}
                </ul>
            </div>
            
            <div class="instructions-section">
                <h2>👨‍🍳 Zubereitung</h2>
                <ol>
                    ${instructionsList}
                </ol>
            </div>
        </div>
    `;
}

// Initialisierung bei Seitenladung
document.addEventListener('DOMContentLoaded', async function() {
    // Datenbank initialisieren
    await initDatabase();

    // Seiten-spezifische Initialisierung
    if (document.getElementById('add-recipe-form')) {
        setupRecipeForm();
    }

    if (document.getElementById('all-recipes-list')) {
        await loadAllRecipes();
        setupSearch();
        // Zufallsrezept-Button
        const randomBtn = document.getElementById('randomRecipeBtn');
        if (randomBtn) {
            randomBtn.addEventListener('click', function() {
                const recipes = getAllRecipes();
                if (recipes.length === 0) return;
                const randomIndex = Math.floor(Math.random() * recipes.length);
                const recipe = recipes[randomIndex];
                if (recipe && recipe.id) {
                    window.location.href = `recipe-detail.html?id=${recipe.id}`;
                }
            });
        }
    }

    if (document.getElementById('favorites-list')) {
        await loadFavorites();
    }

    // Startseite
    if (document.getElementById('featured-recipes-list')) {
        await loadFeaturedRecipes();
        await updateStats();
    }
});