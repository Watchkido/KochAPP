// Export & Share Funktionen für Smart Recipe Hub
let selectedRecipe = null;

// Initialisierung
document.addEventListener('DOMContentLoaded', async function() {
    await initDatabase();
    loadRecipeSelector();
    
    // Event Listener für Rezept-Auswahl
    document.getElementById('recipe-select').addEventListener('change', function() {
        const recipeId = this.value;
        if (recipeId) {
            selectedRecipe = getRecipeById(parseInt(recipeId));
            document.getElementById('share-buttons').style.display = 'block';
        } else {
            selectedRecipe = null;
            document.getElementById('share-buttons').style.display = 'none';
        }
    });
    
    // File Input für Datenbank-Import
    document.getElementById('import-file').addEventListener('change', handleDatabaseImport);
});

// Lädt alle Rezepte in die Auswahlliste
function loadRecipeSelector() {
    const recipes = getAllRecipes();
    const select = document.getElementById('recipe-select');
    
    recipes.forEach(recipe => {
        const option = document.createElement('option');
        option.value = recipe.id;
        option.textContent = recipe.title;
        select.appendChild(option);
    });
}

// ========================================
// PDF-Export Funktionen
// ========================================

// Exportiert alle Rezepte als PDF
async function exportAllRecipesAsPDF() {
    const recipes = getAllRecipes();
    if (recipes.length === 0) {
        alert('❌ Keine Rezepte zum Exportieren vorhanden!');
        return;
    }
    
    await generateRecipesPDF(recipes, 'Smart_Recipe_Hub_Alle_Rezepte.pdf');
}

// Exportiert nur Favoriten als PDF
async function exportFavoritesAsPDF() {
    const favorites = getFavoriteRecipes();
    if (favorites.length === 0) {
        alert('❌ Keine Favoriten zum Exportieren vorhanden!');
        return;
    }
    
    await generateRecipesPDF(favorites, 'Smart_Recipe_Hub_Favoriten.pdf');
}

// Generiert PDF aus Rezept-Array
async function generateRecipesPDF(recipes, filename) {
    try {
        // jsPDF importieren
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        let yPosition = 20;
        const pageHeight = doc.internal.pageSize.height;
        const margin = 20;
        const lineHeight = 7;
        
        // Titel
        doc.setFontSize(20);
        doc.setFont(undefined, 'bold');
        doc.text('Smart Recipe Hub', margin, yPosition);
        yPosition += 10;
        
        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');
        doc.text(`${recipes.length} Rezept(e) - Exportiert am ${new Date().toLocaleDateString('de-DE')}`, margin, yPosition);
        yPosition += 15;
        
        // Rezepte durchgehen
        recipes.forEach((recipe, index) => {
            // Neue Seite wenn nötig
            if (yPosition > pageHeight - 40) {
                doc.addPage();
                yPosition = 20;
            }
            
            // Rezept-Nummer und Titel
            doc.setFontSize(16);
            doc.setFont(undefined, 'bold');
            doc.text(`${index + 1}. ${recipe.title}`, margin, yPosition);
            yPosition += lineHeight + 2;
            
            // Beschreibung
            doc.setFontSize(10);
            doc.setFont(undefined, 'italic');
            const descLines = doc.splitTextToSize(recipe.description || 'Keine Beschreibung', 170);
            descLines.forEach(line => {
                if (yPosition > pageHeight - 40) {
                    doc.addPage();
                    yPosition = 20;
                }
                doc.text(line, margin, yPosition);
                yPosition += lineHeight;
            });
            yPosition += 3;
            
            // Infos (Kategorie, Zeit, Kalorien)
            doc.setFont(undefined, 'normal');
            doc.text(`📁 Kategorie: ${recipe.category || 'Keine'}`, margin, yPosition);
            yPosition += lineHeight;
            doc.text(`⏱️ Zubereitungszeit: ${recipe.preparation_time || '?'} Min`, margin, yPosition);
            yPosition += lineHeight;
            doc.text(`🔥 Kalorien: ${recipe.calories || '?'} kcal`, margin, yPosition);
            yPosition += lineHeight + 2;
            
            // Zutaten
            doc.setFont(undefined, 'bold');
            doc.text('Zutaten:', margin, yPosition);
            yPosition += lineHeight;
            doc.setFont(undefined, 'normal');
            
            const ingredients = recipe.ingredients ? recipe.ingredients.split('\n') : [];
            ingredients.forEach(ingredient => {
                if (yPosition > pageHeight - 40) {
                    doc.addPage();
                    yPosition = 20;
                }
                doc.text(`• ${ingredient.trim()}`, margin + 5, yPosition);
                yPosition += lineHeight;
            });
            yPosition += 2;
            
            // Anleitung
            doc.setFont(undefined, 'bold');
            doc.text('Zubereitung:', margin, yPosition);
            yPosition += lineHeight;
            doc.setFont(undefined, 'normal');
            
            const instructions = recipe.instructions ? recipe.instructions.split('\n') : [];
            instructions.forEach((step, idx) => {
                if (yPosition > pageHeight - 40) {
                    doc.addPage();
                    yPosition = 20;
                }
                const stepLines = doc.splitTextToSize(`${idx + 1}. ${step.trim()}`, 165);
                stepLines.forEach(line => {
                    if (yPosition > pageHeight - 40) {
                        doc.addPage();
                        yPosition = 20;
                    }
                    doc.text(line, margin + 5, yPosition);
                    yPosition += lineHeight;
                });
            });
            
            // Trennlinie
            yPosition += 5;
            doc.setDrawColor(200, 200, 200);
            doc.line(margin, yPosition, 190, yPosition);
            yPosition += 10;
        });
        
        // PDF speichern
        doc.save(filename);
        
        // Erfolgs-Nachricht
        showToast(`✅ PDF erfolgreich erstellt: ${filename}`, 'success');
        
    } catch (error) {
        console.error('PDF-Fehler:', error);
        alert('❌ Fehler beim Erstellen der PDF-Datei!');
    }
}

// ========================================
// Social Media Share Funktionen
// ========================================

// Facebook teilen
function shareOnFacebook() {
    if (!selectedRecipe) return;
    
    const url = encodeURIComponent(getRecipeURL());
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// Twitter / X teilen
function shareOnTwitter() {
    if (!selectedRecipe) return;
    
    const text = encodeURIComponent(`${selectedRecipe.title} - Smart Recipe Hub`);
    const url = encodeURIComponent(getRecipeURL());
    const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// WhatsApp teilen
function shareOnWhatsApp() {
    if (!selectedRecipe) return;
    
    const text = encodeURIComponent(`🍳 ${selectedRecipe.title}\n\n${selectedRecipe.description}\n\nRezept ansehen: ${getRecipeURL()}`);
    
    // Mobile oder Desktop
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const shareUrl = isMobile 
        ? `whatsapp://send?text=${text}`
        : `https://web.whatsapp.com/send?text=${text}`;
    
    window.open(shareUrl, '_blank');
}

// Per E-Mail teilen
function shareViaEmail() {
    if (!selectedRecipe) return;
    
    const subject = encodeURIComponent(`Rezept: ${selectedRecipe.title}`);
    const body = encodeURIComponent(
        `Hallo,\n\n` +
        `ich möchte dieses Rezept mit dir teilen:\n\n` +
        `📋 ${selectedRecipe.title}\n` +
        `${selectedRecipe.description}\n\n` +
        `⏱️ Zubereitungszeit: ${selectedRecipe.preparation_time || '?'} Min\n` +
        `🔥 Kalorien: ${selectedRecipe.calories || '?'} kcal\n\n` +
        `Rezept ansehen: ${getRecipeURL()}\n\n` +
        `Viele Grüße!`
    );
    
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

// Link kopieren
function copyRecipeLink() {
    if (!selectedRecipe) return;
    
    const url = getRecipeURL();
    
    // In Zwischenablage kopieren
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            showToast('✅ Link in Zwischenablage kopiert!', 'success');
        }).catch(err => {
            // Fallback für ältere Browser
            copyToClipboardFallback(url);
        });
    } else {
        copyToClipboardFallback(url);
    }
}

// Fallback für ältere Browser
function copyToClipboardFallback(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        showToast('✅ Link in Zwischenablage kopiert!', 'success');
    } catch (err) {
        alert('Link konnte nicht kopiert werden: ' + text);
    }
    
    document.body.removeChild(textarea);
}

// Generiert URL zum Rezept
function getRecipeURL() {
    const baseUrl = window.location.origin + window.location.pathname.replace('export.html', '');
    return `${baseUrl}recipe-detail.html?id=${selectedRecipe.id}`;
}

// ========================================
// Datenbank Backup Funktionen
// ========================================

// Exportiert Datenbank als JSON
function exportDatabaseAsJSON() {
    try {
        const recipes = getAllRecipes();
        if (recipes.length === 0) {
            alert('❌ Keine Rezepte zum Exportieren vorhanden!');
            return;
        }
        
        const backup = {
            exportDate: new Date().toISOString(),
            version: '1.0',
            recipeCount: recipes.length,
            recipes: recipes
        };
        
        const json = JSON.stringify(backup, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `Smart_Recipe_Hub_Backup_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showToast(`✅ Backup erstellt: ${recipes.length} Rezepte`, 'success');
        
    } catch (error) {
        console.error('Export-Fehler:', error);
        alert('❌ Fehler beim Exportieren der Datenbank!');
    }
}

// Triggert Datei-Auswahl für Import
function importDatabase() {
    document.getElementById('import-file').click();
}

// Verarbeitet importierte Datei
async function handleDatabaseImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
        const text = await file.text();
        const backup = JSON.parse(text);
        
        if (!backup.recipes || !Array.isArray(backup.recipes)) {
            alert('❌ Ungültiges Backup-Format!');
            return;
        }
        
        const confirm = window.confirm(
            `📦 Backup vom ${new Date(backup.exportDate).toLocaleDateString('de-DE')}\n\n` +
            `${backup.recipeCount} Rezepte gefunden.\n\n` +
            `⚠️ Dies wird alle aktuellen Rezepte überschreiben!\n\n` +
            `Fortfahren?`
        );
        
        if (!confirm) return;
        
        // Datenbank leeren und neue Rezepte einfügen
        db.run('DELETE FROM recipes');
        
        let imported = 0;
        backup.recipes.forEach(recipe => {
            try {
                addRecipe(recipe);
                imported++;
            } catch (err) {
                console.warn('Rezept konnte nicht importiert werden:', recipe.title, err);
            }
        });
        
        showToast(`✅ ${imported} Rezepte erfolgreich importiert!`, 'success');
        
        // Seite neu laden
        setTimeout(() => {
            window.location.reload();
        }, 2000);
        
    } catch (error) {
        console.error('Import-Fehler:', error);
        alert('❌ Fehler beim Importieren der Datenbank!\n\nStellen Sie sicher, dass die Datei ein gültiges Backup ist.');
    }
    
    // Input zurücksetzen
    event.target.value = '';
}

// ========================================
// Hilfsfunktionen
// ========================================

// Toast-Benachrichtigung anzeigen
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : '#2196f3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// CSS für Animationen
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .export-section {
        background: #f8f9fa;
        padding: 25px;
        border-radius: 8px;
        margin-bottom: 20px;
    }
    
    .export-section h3 {
        margin-top: 0;
        color: #333;
    }
    
    .button-group {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin-top: 15px;
    }
    
    .btn-social {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s;
        min-width: 120px;
    }
    
    .btn-social.facebook {
        background: #1877f2;
        color: white;
    }
    
    .btn-social.twitter {
        background: #1da1f2;
        color: white;
    }
    
    .btn-social.whatsapp {
        background: #25d366;
        color: white;
    }
    
    .btn-social.email {
        background: #ea4335;
        color: white;
    }
    
    .btn-social.copy {
        background: #666;
        color: white;
    }
    
    .btn-social:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
    
    #recipe-selector {
        margin-top: 15px;
    }
    
    #recipe-selector label {
        display: block;
        margin-bottom: 8px;
        font-weight: bold;
        color: #333;
    }
    
    #recipe-select {
        width: 100%;
        max-width: 400px;
    }
`;
document.head.appendChild(style);
