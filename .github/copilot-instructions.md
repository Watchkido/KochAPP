# Smart Recipe Hub - AI Coding Agent Instructions

## Project Architecture

**Dual-Version Setup:** This is a recipe management app with two parallel implementations:
- `Koch_App_2/` - **Production version** (pure client-side: HTML/CSS/JS with SQL.js)
- `Koch_app_1/` - Development/Flask version (Python backend, not deployed)

**Always work in `Koch_App_2/` unless explicitly asked to modify the Flask version.**

## Core Technical Stack

- **Database:** SQL.js (SQLite in WebAssembly) with LocalStorage persistence
  - No backend needed - everything runs client-side in the browser
  - Database persisted as Base64-encoded string in LocalStorage
  - Schema: `recipes` table with fields: id, title, description, ingredients, instructions, preparation_time, category, image_url, calories, is_favorite, created_at

- **Key Files:**
  - `recipe-db.js` - Database layer (initDatabase, getAllRecipes, addRecipe, toggleFavorite, searchRecipes)
  - `script.js` - UI logic (loadFeaturedRecipes, createRecipeCard, setupRecipeForm, loadRecipeDetail)
  - `sidebar.js` - Sidebar toggle functionality (separated for reusability)
  - `style.css` - All styling including responsive sidebar

## Critical Patterns

### 1. Database Initialization
Always call `initDatabase()` before any database operations. Check existing implementations:
```javascript
document.addEventListener('DOMContentLoaded', function() {
    initDatabase().then(() => {
        // Your database operations here
    });
});
```

### 2. Sidebar Implementation
All HTML pages include a **toggle sidebar** (hidden by default):
- Menu button: `<button class="menu-toggle" id="menuToggle">☰</button>`
- Overlay: `<div class="sidebar-overlay" id="sidebarOverlay"></div>`
- Sidebar: `<aside class="sidebar" id="sidebar">` with class `active` to show
- Always include `<script src="sidebar.js"></script>` in the `<head>`

### 3. HTML Page Structure
Every page follows this pattern:
```html
<head>
    <link rel="stylesheet" href="style.css">
    <script src="sidebar.js"></script>
    <!-- SQL.js only on pages that need database -->
</head>
<body>
    <button class="menu-toggle" id="menuToggle">☰</button>
    <div class="sidebar-overlay" id="sidebarOverlay"></div>
    <aside class="sidebar" id="sidebar">
        <!-- Navigation links with proper .active class -->
    </aside>
    <header>...</header>
    <nav>...</nav>
    <main class="container">...</main>
    <footer>...</footer>
</body>
```

### 4. External Links in Sidebar
Three external links must appear in every sidebar:
- Kanbanboard: `https://kanban.multi-channel-network.de/`
- Stadtwettkampf: `https://dataanalyst.stadtwettkampf.de/`
- GitHub: `https://github.com/Watchkido/KochAPP` (NOT the github.io URL)

## Page Categories

1. **Main Pages** (full layout): index.html, recipes.html, add-recipe.html, favorites.html, recipe-detail.html
2. **Info Pages** (full layout): team.html, tutorial.html, kontakt.html, faq.html, impressum.html, datenschutz.html, agb.html
3. **Feature Pages** (minified HTML): app.html, changelog.html, community.html, export.html, feedback.html
4. **Test/Utility Pages** (prefix `z_` or no prefix): test-db.html, reset-db.html, update-images.html

## Development Workflows

### Bulk HTML Updates
Use Python scripts for consistent updates across all pages:
```bash
python update_sidebar.py      # Updates main HTML pages
python update_minified.py     # Updates minified HTML pages
```

### CSS Changes
- Sidebar styles start at line ~350 in `style.css`
- Container width: 1200px, centered with `margin: 0 auto`
- Sidebar: fixed position, right: -300px (hidden), right: 0 when `.active`
- No margin adjustments needed for main content (sidebar overlays, doesn't shift layout)

### Testing Database
- Open `test-db.html` to inspect database contents
- Use `reset-db.html` to clear LocalStorage and reset database
- Check browser console for database initialization logs

## Project-Specific Conventions

1. **German Language:** All UI text, comments, and documentation in German
2. **No Server Required:** Never suggest server-side solutions - everything must work client-side
3. **LocalStorage Persistence:** Database auto-saves to LocalStorage after every modification
4. **Image URLs:** Recipes use external image URLs (stored in `image_url` field), not uploaded files
5. **Responsive Design:** Mobile-first approach, sidebar becomes full-width overlay on mobile

## Common Pitfalls to Avoid

- ❌ Don't add margins to main content for sidebar (it overlays, doesn't push content)
- ❌ Don't use `body:has(.sidebar)` CSS rules (sidebar is always present but hidden)
- ❌ Never suggest Python/Flask changes for production features (use Koch_App_2 only)
- ❌ Don't forget `sidebar.js` when creating new HTML pages
- ❌ Don't hardcode recipe data - always use database functions from `recipe-db.js`

## When Making Changes

1. **Adding new pages:** Copy structure from existing page, update sidebar active states
2. **Database schema changes:** Add migration logic in `initDatabase()` (see ALTER TABLE examples)
3. **Multi-page updates:** Consider using Python scripts for consistency
4. **CSS modifications:** Test with sidebar both open and closed states
