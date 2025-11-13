// Barrierefreiheits-Funktionen (BITV 2.0 / WCAG 2.1 konform)
class AccessibilityTools {
    constructor() {
        this.settings = this.loadSettings();
        this.init();
    }

    init() {
        this.createWidget();
        this.applySettings();
        this.setupKeyboardShortcuts();
    }

    loadSettings() {
        const saved = localStorage.getItem('accessibilitySettings');
        return saved ? JSON.parse(saved) : {
            textSize: 100,
            grayscale: false,
            highContrast: false,
            negativeContrast: false,
            lightBackground: false,
            underlineLinks: false,
            readableFont: false
        };
    }

    saveSettings() {
        localStorage.setItem('accessibilitySettings', JSON.stringify(this.settings));
    }

    createWidget() {
        const widget = document.createElement('div');
        widget.id = 'accessibility-widget';
        widget.innerHTML = `
            <button id="accessibility-toggle" aria-label="Barrierefreiheit-Menü öffnen" title="Barrierefreiheit">
                <span aria-hidden="true">♿</span>
            </button>
            <div id="accessibility-panel" class="accessibility-panel" role="dialog" aria-label="Barrierefreiheits-Einstellungen">
                <div class="accessibility-header">
                    <h2>Barrierefreiheit</h2>
                    <button id="accessibility-close" aria-label="Menü schließen">×</button>
                </div>
                <div class="accessibility-content">
                    <div class="accessibility-section">
                        <h3>Textgröße</h3>
                        <div class="button-group">
                            <button data-action="increaseText" aria-label="Text vergrößern">
                                <span aria-hidden="true">A+</span> Text vergrößern
                            </button>
                            <button data-action="decreaseText" aria-label="Text verkleinern">
                                <span aria-hidden="true">A-</span> Text verkleinern
                            </button>
                        </div>
                        <div class="text-size-indicator">
                            Aktuelle Größe: <span id="text-size-value">100%</span>
                        </div>
                    </div>

                    <div class="accessibility-section">
                        <h3>Farbschema</h3>
                        <div class="button-group-vertical">
                            <button data-action="grayscale" class="toggle-btn" aria-pressed="false">
                                <span aria-hidden="true">◐</span> Graustufen
                            </button>
                            <button data-action="highContrast" class="toggle-btn" aria-pressed="false">
                                <span aria-hidden="true">◑</span> Hoher Kontrast
                            </button>
                            <button data-action="negativeContrast" class="toggle-btn" aria-pressed="false">
                                <span aria-hidden="true">◒</span> Negativer Kontrast
                            </button>
                            <button data-action="lightBackground" class="toggle-btn" aria-pressed="false">
                                <span aria-hidden="true">☀</span> Heller Hintergrund
                            </button>
                        </div>
                    </div>

                    <div class="accessibility-section">
                        <h3>Lesbarkeit</h3>
                        <div class="button-group-vertical">
                            <button data-action="underlineLinks" class="toggle-btn" aria-pressed="false">
                                <span aria-hidden="true">_</span> Links unterstreichen
                            </button>
                            <button data-action="readableFont" class="toggle-btn" aria-pressed="false">
                                <span aria-hidden="true">Aa</span> Lesbare Schriftart
                            </button>
                        </div>
                    </div>

                    <div class="accessibility-section">
                        <button data-action="reset" class="reset-btn" aria-label="Alle Einstellungen zurücksetzen">
                            <span aria-hidden="true">↺</span> Zurücksetzen
                        </button>
                    </div>

                    <div class="accessibility-footer">
                        <a href="sitemap.html">📋 Sitemap</a>
                        <a href="impressum.html">Impressum</a>
                        <a href="datenschutz.html">Datenschutz</a>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(widget);

        // Event Listeners
        document.getElementById('accessibility-toggle').addEventListener('click', () => this.togglePanel());
        document.getElementById('accessibility-close').addEventListener('click', () => this.togglePanel());

        // Button Actions
        document.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this[action]();
            });
        });

        // Click außerhalb schließt Panel
        document.getElementById('accessibility-panel').addEventListener('click', (e) => {
            if (e.target.id === 'accessibility-panel') {
                this.togglePanel();
            }
        });
    }

    togglePanel() {
        const panel = document.getElementById('accessibility-panel');
        const toggle = document.getElementById('accessibility-toggle');
        const isOpen = panel.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen);
    }

    increaseText() {
        this.settings.textSize = Math.min(this.settings.textSize + 10, 200);
        this.applyTextSize();
        this.saveSettings();
    }

    decreaseText() {
        this.settings.textSize = Math.max(this.settings.textSize - 10, 80);
        this.applyTextSize();
        this.saveSettings();
    }

    grayscale() {
        this.settings.grayscale = !this.settings.grayscale;
        this.applyGrayscale();
        this.updateToggleButton('grayscale');
        this.saveSettings();
    }

    highContrast() {
        this.settings.highContrast = !this.settings.highContrast;
        this.applyHighContrast();
        this.updateToggleButton('highContrast');
        this.saveSettings();
    }

    negativeContrast() {
        this.settings.negativeContrast = !this.settings.negativeContrast;
        this.applyNegativeContrast();
        this.updateToggleButton('negativeContrast');
        this.saveSettings();
    }

    lightBackground() {
        this.settings.lightBackground = !this.settings.lightBackground;
        this.applyLightBackground();
        this.updateToggleButton('lightBackground');
        this.saveSettings();
    }

    underlineLinks() {
        this.settings.underlineLinks = !this.settings.underlineLinks;
        this.applyUnderlineLinks();
        this.updateToggleButton('underlineLinks');
        this.saveSettings();
    }

    readableFont() {
        this.settings.readableFont = !this.settings.readableFont;
        this.applyReadableFont();
        this.updateToggleButton('readableFont');
        this.saveSettings();
    }

    reset() {
        this.settings = {
            textSize: 100,
            grayscale: false,
            highContrast: false,
            negativeContrast: false,
            lightBackground: false,
            underlineLinks: false,
            readableFont: false
        };
        this.applySettings();
        this.saveSettings();
        
        // Update alle Toggle-Buttons
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
    }

    applySettings() {
        this.applyTextSize();
        this.applyGrayscale();
        this.applyHighContrast();
        this.applyNegativeContrast();
        this.applyLightBackground();
        this.applyUnderlineLinks();
        this.applyReadableFont();

        // Update UI
        Object.keys(this.settings).forEach(key => {
            if (typeof this.settings[key] === 'boolean' && this.settings[key]) {
                const btn = document.querySelector(`[data-action="${key}"]`);
                if (btn) {
                    btn.classList.add('active');
                    btn.setAttribute('aria-pressed', 'true');
                }
            }
        });
    }

    applyTextSize() {
        document.documentElement.style.fontSize = `${this.settings.textSize}%`;
        const indicator = document.getElementById('text-size-value');
        if (indicator) indicator.textContent = `${this.settings.textSize}%`;
    }

    applyGrayscale() {
        document.body.classList.toggle('a11y-grayscale', this.settings.grayscale);
    }

    applyHighContrast() {
        document.body.classList.toggle('a11y-high-contrast', this.settings.highContrast);
    }

    applyNegativeContrast() {
        document.body.classList.toggle('a11y-negative-contrast', this.settings.negativeContrast);
    }

    applyLightBackground() {
        document.body.classList.toggle('a11y-light-background', this.settings.lightBackground);
    }

    applyUnderlineLinks() {
        document.body.classList.toggle('a11y-underline-links', this.settings.underlineLinks);
    }

    applyReadableFont() {
        document.body.classList.toggle('a11y-readable-font', this.settings.readableFont);
    }

    updateToggleButton(action) {
        const btn = document.querySelector(`[data-action="${action}"]`);
        if (btn) {
            const isActive = this.settings[action];
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive);
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Alt + A = Toggle Accessibility Panel
            if (e.altKey && e.key === 'a') {
                e.preventDefault();
                this.togglePanel();
            }
            // Alt + + = Increase Text
            if (e.altKey && e.key === '+') {
                e.preventDefault();
                this.increaseText();
            }
            // Alt + - = Decrease Text
            if (e.altKey && e.key === '-') {
                e.preventDefault();
                this.decreaseText();
            }
        });
    }
}

// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    new AccessibilityTools();
});
