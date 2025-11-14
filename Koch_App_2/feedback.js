/**
 * feedback.js
 * Feedback- und Voting-Logik für YummyGo.
 * Entwicklerhinweis: Hier werden Formularverarbeitung, Mailto und Feature-Voting umgesetzt.
 */
// Feedback-Formular JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    const successMsg = document.getElementById('feedback-success');
    const errorMsg = document.getElementById('feedback-error');

    // Formular absenden
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Formular-Daten sammeln
        const formData = {
            type: document.getElementById('feedback-type').value,
            name: document.getElementById('feedback-name').value || 'Anonym',
            email: document.getElementById('feedback-email').value || 'Keine E-Mail angegeben',
            subject: document.getElementById('feedback-subject').value,
            message: document.getElementById('feedback-message').value,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };

        // Validierung
        if (!formData.type || !formData.subject || !formData.message) {
            showError('Bitte fülle alle Pflichtfelder aus!');
            return;
        }

        // Feedback speichern und per E-Mail senden
        sendFeedback(formData);
    });

    // Feedback senden
    function sendFeedback(data) {
        // Zeige Lade-Animation
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '⏳ Wird gesendet...';
        submitBtn.disabled = true;

        // Feedback in LocalStorage speichern (als Backup)
        saveFeedbackToLocalStorage(data);

        // E-Mail-Body erstellen
        const emailBody = createEmailBody(data);
        
        // Versuch 1: mailto: Link (öffnet Standard-E-Mail-Client)
        try {
            const mailtoLink = `mailto:feedback@smartrecipehub.de?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(emailBody)}`;
            
            // Öffne E-Mail-Client
            window.location.href = mailtoLink;
            
            // Zeige Erfolgs-Nachricht nach kurzer Verzögerung
            setTimeout(() => {
                showSuccess();
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1000);
            
        } catch (error) {
            console.error('Fehler beim Senden:', error);
            
            // Fallback: Zeige alternative Kontaktmöglichkeiten
            showError('Dein E-Mail-Client konnte nicht geöffnet werden. Bitte nutze eine der alternativen Kontaktmöglichkeiten unten.');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    // E-Mail-Body formatieren
    function createEmailBody(data) {
        const typeLabels = {
            'bug': '🐛 Bug / Fehler melden',
            'feature': '💡 Feature-Wunsch',
            'improvement': '✨ Verbesserungsvorschlag',
            'praise': '👍 Lob / Kompliment',
            'other': '💬 Sonstiges'
        };

        return `
YummyGo - Feedback

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Art: ${typeLabels[data.type] || data.type}
Von: ${data.name}
E-Mail: ${data.email}
Datum: ${new Date(data.timestamp).toLocaleString('de-DE')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Betreff: ${data.subject}

Nachricht:
${data.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Technische Informationen:
User Agent: ${data.userAgent}
        `.trim();
    }

    // Feedback in LocalStorage speichern (als Backup)
    function saveFeedbackToLocalStorage(data) {
        try {
            let feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
            feedbacks.push(data);
            // Nur die letzten 50 Feedbacks behalten
            if (feedbacks.length > 50) {
                feedbacks = feedbacks.slice(-50);
            }
            localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
            console.log('Feedback gespeichert:', data);
        } catch (error) {
            console.error('LocalStorage Fehler:', error);
        }
    }

    // Erfolgs-Nachricht anzeigen
    function showSuccess() {
        errorMsg.style.display = 'none';
        successMsg.style.display = 'block';
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Nach 5 Sekunden ausblenden
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 5000);
    }

    // Fehler-Nachricht anzeigen
    function showError(message) {
        successMsg.style.display = 'none';
        errorMsg.textContent = '❌ ' + message;
        errorMsg.style.display = 'block';
        errorMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Nach 8 Sekunden ausblenden
        setTimeout(() => {
            errorMsg.style.display = 'none';
        }, 8000);
    }
});

// Feature-Voting
function submitFeatureVotes() {
    const checkboxes = document.querySelectorAll('.feature-item input[type="checkbox"]:checked');
    const selectedFeatures = Array.from(checkboxes).map(cb => cb.value);
    
    if (selectedFeatures.length === 0) {
        alert('❌ Bitte wähle mindestens ein Feature aus!');
        return;
    }

    // Votes in LocalStorage speichern
    try {
        let votes = JSON.parse(localStorage.getItem('featureVotes') || '{}');
        selectedFeatures.forEach(feature => {
            votes[feature] = (votes[feature] || 0) + 1;
        });
        localStorage.setItem('featureVotes', JSON.stringify(votes));
        
        // Erfolgsmeldung
        showToast(`✅ Vielen Dank! Du hast für ${selectedFeatures.length} Feature(s) gestimmt!`, 'success');
        
        // Checkboxen zurücksetzen
        checkboxes.forEach(cb => cb.checked = false);
        
        // Optional: Ergebnisse anzeigen
        console.log('Aktuelle Feature-Votes:', votes);
        
    } catch (error) {
        console.error('Voting-Fehler:', error);
        alert('❌ Fehler beim Speichern der Stimmen!');
    }
}

// Toast-Benachrichtigung
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 350px;
        font-weight: 500;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 4000);
}

// CSS für Feedback-Seite
const style = document.createElement('style');
style.textContent = `
    .feedback-form-section {
        background: #f8f9fa;
        padding: 30px;
        border-radius: 10px;
        margin: 30px 0;
        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }

    .feedback-form .form-group {
        margin-bottom: 20px;
    }

    .feedback-form label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: #333;
    }

    .feedback-form input[type="text"],
    .feedback-form input[type="email"],
    .feedback-form select,
    .feedback-form textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 14px;
        font-family: inherit;
        transition: border-color 0.3s;
    }

    .feedback-form input:focus,
    .feedback-form select:focus,
    .feedback-form textarea:focus {
        outline: none;
        border-color: #4CAF50;
        box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
    }

    .feedback-form small {
        display: block;
        margin-top: 5px;
        color: #666;
        font-size: 12px;
    }

    .feedback-form textarea {
        resize: vertical;
        min-height: 120px;
    }

    .feedback-message {
        padding: 15px 20px;
        border-radius: 5px;
        margin: 20px 0;
        font-weight: 500;
    }

    .feedback-message.success {
        background: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }

    .feedback-message.error {
        background: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }

    .alternative-contact {
        background: #fff;
        padding: 30px;
        border-radius: 10px;
        border: 2px solid #e0e0e0;
    }

    .alternative-contact h3 {
        margin-top: 0;
        color: #333;
    }

    .contact-options {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin-top: 25px;
    }

    .contact-option {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
    }

    .contact-option h4 {
        margin-top: 0;
        color: #4CAF50;
    }

    .contact-option p {
        color: #666;
        margin-bottom: 15px;
    }

    .btn-email {
        background: #4CAF50;
        color: white;
        text-decoration: none;
        display: inline-block;
    }

    .btn-email:hover {
        background: #45a049;
        color: white;
    }

    .btn-github {
        background: #24292e;
        color: white;
        text-decoration: none;
        display: inline-block;
    }

    .btn-github:hover {
        background: #1a1e22;
        color: white;
    }

    .btn-discord {
        background: #5865F2;
        color: white;
    }

    .btn-discord:disabled {
        background: #ccc;
        cursor: not-allowed;
        opacity: 0.6;
    }

    .feature-voting {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }

    .feature-voting h3 {
        margin-top: 0;
        color: white;
    }

    .feature-voting p {
        color: rgba(255,255,255,0.9);
    }

    .feature-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 15px;
        margin: 25px 0;
    }

    .feature-item {
        background: rgba(255,255,255,0.15);
        padding: 15px;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        transition: all 0.3s;
        backdrop-filter: blur(10px);
    }

    .feature-item:hover {
        background: rgba(255,255,255,0.25);
        transform: translateY(-2px);
    }

    .feature-item input[type="checkbox"] {
        width: 20px;
        height: 20px;
        cursor: pointer;
    }

    .feature-item span {
        flex: 1;
        font-weight: 500;
    }

    .feature-voting .btn {
        margin-top: 20px;
    }

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

    /* Responsive */
    @media (max-width: 768px) {
        .feedback-form-section,
        .alternative-contact,
        .feature-voting {
            padding: 20px;
        }

        .contact-options {
            grid-template-columns: 1fr;
        }

        .feature-list {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(style);
