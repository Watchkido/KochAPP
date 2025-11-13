"""
projekt_analyse.py
Dieses Modul bietet Funktionen zur Analyse von Python-Projekten hinsichtlich ihrer Datei- und Importstruktur sowie zur Durchführung einer Flake8-Codeprüfung.
Funktionen:
-----------
- finde_python_dateien(root):
    Durchsucht rekursiv ein Verzeichnis nach allen Python-Dateien (.py) und gibt deren Pfade zurück.
- print_verwendete_module(verwendet_von):
    Gibt eine strukturierte Übersicht darüber aus, welche Module von welchen Dateien im Projekt verwendet werden.
- extrahiere_imports(dateipfad):
    Extrahiert alle importierten Module aus einer gegebenen Python-Datei und gibt diese als Set zurück.
- analysiere_imports(py_dateien):
    Analysiert die Importbeziehungen zwischen den gefundenen Python-Dateien, ermittelt verwendete und nicht verwendete Module und gibt entsprechende Zuordnungen zurück.
- flake8_pruefen(dateien):
    Führt eine Flake8-Codeanalyse für eine Liste von Python-Dateien durch und gibt die Ergebnisse aus.
- hauptfunktion(startverzeichnis):
    Hauptfunktion zur Durchführung der Analyse: Findet alle Python-Dateien, analysiert die Importe, listet nicht verwendete Dateien auf, speichert die Ergebnisse in einer Datei und führt eine Flake8-Prüfung durch.
Verwendung:
-----------
Das Skript kann direkt ausgeführt werden. Es verwendet einen Basis-Pfad aus einer Konfigurationsdatei (CONFIG.BASIS_PFAD) als Startpunkt für die Analyse.
Abhängigkeiten:
---------------
- os
- re
- subprocess
- collections.defaultdict
- config.CONFIG (externe Konfigurationsdatei)
- flake8 (muss installiert sein)
Ergebnis:
---------
Die Analyseergebnisse werden sowohl auf der Konsole ausgegeben als auch in der Datei 'import_analyse_ergebnis.txt' gespeichert.
"""
import os
import re
import subprocess
from collections import defaultdict


# -------------------------------------------
# 🔎 Datei- & Import-Analyse (wie oben)
# -------------------------------------------

def finde_html_css_dateien(root: str) -> dict:
    """
    Durchsucht rekursiv den angegebenen Projektordner und alle Unterordner nach HTML- und CSS-Dateien.
    :param root: Startverzeichnis
    :return: Dict mit Listen von 'html' und 'css' Dateien
    """
    html_files = []
    css_files = []
    for ordner, verzeichnisse, dateien in os.walk(root):
        if ".venv" in verzeichnisse:
            verzeichnisse.remove(".venv")
        for datei in dateien:
            if datei.endswith(".html"):
                html_files.append(os.path.normpath(os.path.join(ordner, datei)))
            elif datei.endswith(".css"):
                css_files.append(os.path.normpath(os.path.join(ordner, datei)))
    return {"html": html_files, "css": css_files}


def print_verwendete_module(verwendet_von):
    """
    Gibt eine strukturierte Übersicht darüber aus, welche Module von welchen Dateien verwendet werden.
    Baut einen Baum zur besseren Visualisierung der Modulabhängigkeiten.
    """
    print("\n🔗 \033[1mVerwendete Module:\033[0m")
    print("".ljust(60, "─"))
    for modul, verwendet_durch in verwendet_von.items():
        print(f"📦 \033[94m{modul}\033[0m")
        # Gruppiere nach Wurzelverzeichnis
        baum = {}
        for pfad in verwendet_durch:
            teile = pfad.split(os.sep)
            d = baum
            for teil in teile:
                d = d.setdefault(teil, {})
        def print_baum(d, prefix="  "):
            for i, (name, sub) in enumerate(d.items()):
                connector = "└── " if i == len(d)-1 else "├── "
                print(prefix + connector + name)
                if sub:
                    print_baum(sub, prefix + ("    " if i == len(d)-1 else "│   "))
        print_baum(baum)
        print("".ljust(60, "─"))

def schreibe_python_dateien_baum_alle(dateipfad: str, wurzelverzeichnis: str) -> None:
    """
    Schreibt eine vollständige Baumstruktur aller Dateien und Unterordner (außer .git und .venv)
    in die angegebene Textdatei.

    :param dateipfad: Name der Ausgabedatei.
    :type dateipfad: str
    :param wurzelverzeichnis: Startverzeichnis für die Baumdarstellung.
    :type wurzelverzeichnis: str
    """
    import os

    def schreibe_baum(pfad: str, prefix: str, f):
        eintraege = sorted(
            [e for e in os.listdir(pfad)
             if e not in (".git", ".venv")],
            key=lambda x: (not os.path.isdir(os.path.join(pfad, x)), x.lower())
        )
        for i, eintrag in enumerate(eintraege):
            vollpfad = os.path.join(pfad, eintrag)
            ist_letzter = (i == len(eintraege) - 1)
            connector = "└── " if ist_letzter else "├── "
            f.write(f"{prefix}{connector}{eintrag}\n")
            if os.path.isdir(vollpfad):
                neues_prefix = prefix + ("    " if ist_letzter else "│   ")
                schreibe_baum(vollpfad, neues_prefix, f)

    with open(dateipfad, "w", encoding="utf-8") as f:
        f.write("📄 Alle Dateien und Ordner:\n")
        schreibe_baum(wurzelverzeichnis, "", f)





def schreibe_python_dateien_baum(modulnamen_to_dateien: dict[str, str], dateiname: str) -> None:
    """
    Schreibt eine Baumstruktur aller Python-Dateien mit └──-Zeichen in die angegebene Textdatei.

    :param modulnamen_to_dateien: Mapping von Modulnamen zu Dateipfaden.
    :type modulnamen_to_dateien: dict[str, str]
    :param dateiname: Name der Ausgabedatei.
    :type dateiname: str
    :returns: None
    :rtype: None
    :example:
        >>> schreibe_python_dateien_baum({'main': 'src/main.py'}, 'baum.txt')
    """
    import os

    # Baumstruktur aufbauen
    baum = {}
    for pfad in modulnamen_to_dateien.values():
        teile = os.path.normpath(pfad).split(os.sep)
        d = baum
        for teil in teile[:-1]:
            d = d.setdefault(teil, {})
        d.setdefault('__files__', []).append(teile[-1])

    def schreibe_baum(d: dict, prefix: str, f):
        files = d.get('__files__', [])
        for i, datei in enumerate(files):
            connector = "└── " if (i == len(files) - 1 and not d.keys() - {'__files__'}) else "├── "
            f.write(f"{prefix}{connector}{datei}\n")
        ordner = [k for k in d.keys() if k != '__files__']
        for j, ordname in enumerate(sorted(ordner)):
            ist_letzter = (j == len(ordner) - 1)
            connector = "└── " if ist_letzter else "├── "
            f.write(f"{prefix}{connector}{ordname}\n")
            neues_prefix = prefix + ("    " if ist_letzter else "│   ")
            schreibe_baum(d[ordname], neues_prefix, f)

    with open(dateiname, "w", encoding="utf-8") as f:
        f.write("📄 Python-Dateien:\n")
        schreibe_baum(baum, "", f)

# ...restlicher Code bleibt unverändert...

def extrahiere_html_verlinkungen(dateipfad):
    """
    Extrahiert alle referenzierten CSS/JS/IMG-Dateien aus einer HTML-Datei.
    :param dateipfad: Pfad zur HTML-Datei
    :return: Set der referenzierten Dateien
    """
    links = set()
    with open(dateipfad, "r", encoding="utf-8", errors="ignore") as f:
        inhalt = f.read()
        # CSS
        links.update(re.findall(r'<link[^>]+href=["\']([^"\']+\.css)["\']', inhalt))
        # JS
        links.update(re.findall(r'<script[^>]+src=["\']([^"\']+\.js)["\']', inhalt))
        # IMG
        links.update(re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', inhalt))
    return links

def extrahiere_css_imports(dateipfad):
    """
    Extrahiert alle @import-Verweise aus einer CSS-Datei.
    :param dateipfad: Pfad zur CSS-Datei
    :return: Set der importierten CSS-Dateien
    """
    imports = set()
    with open(dateipfad, "r", encoding="utf-8", errors="ignore") as f:
        for zeile in f:
            match = re.match(r'@import\s+["\']([^"\']+\.css)["\']', zeile)
            if match:
                imports.add(match.group(1))
    return imports

def schreibe_kompletten_verzeichnisbaum(dateipfad: str, wurzelverzeichnis: str) -> None:
    """
    Schreibt eine vollständige Baumstruktur aller Dateien und Unterordner (außer Ordnern, die mit . beginnen)
    in die angegebene Textdatei.

    :param dateipfad: Name der Ausgabedatei.
    :type dateipfad: str
    :param wurzelverzeichnis: Startverzeichnis für die Baumdarstellung.
    :type wurzelverzeichnis: str
    :example:
        >>> schreibe_kompletten_verzeichnisbaum("baum.txt", "meinprojekt")
    """
    import os

    def schreibe_baum(pfad: str, prefix: str, f):
        try:
            eintraege = sorted(
                [e for e in os.listdir(pfad)
                 if not e.startswith(".")],
                key=lambda x: (not os.path.isdir(os.path.join(pfad, x)), x.lower())
            )
        except PermissionError:
            return  # Falls kein Zugriff auf einen Ordner besteht

        for i, eintrag in enumerate(eintraege):
            vollpfad = os.path.join(pfad, eintrag)
            ist_letzter = (i == len(eintraege) - 1)
            connector = "└── " if ist_letzter else "├── "
            f.write(f"{prefix}{connector}{eintrag}\n")
            if os.path.isdir(vollpfad):
                neues_prefix = prefix + ("    " if ist_letzter else "│   ")
                schreibe_baum(vollpfad, neues_prefix, f)

    with open(dateipfad, "w", encoding="utf-8") as f:
        f.write("📄 Alle Dateien und Ordner:\n")
        schreibe_baum(wurzelverzeichnis, "", f)




def analysiere_html_css_verlinkungen(dateien_dict):
    """
    Analysiert die Verlinkungen zwischen HTML- und CSS-Dateien.
    Gibt Übersicht der referenzierten und nicht referenzierten Dateien zurück.
    :param dateien_dict: Dict mit Listen von 'html' und 'css' Dateien
    :return: (referenzen, verwendet_von, nicht_verwendet)
    """
    alle_dateien = dateien_dict["html"] + dateien_dict["css"]
    verwendet_von = defaultdict(list)
    referenzen = set()
    # HTML: Links extrahieren
    for html in dateien_dict["html"]:
        links = extrahiere_html_verlinkungen(html)
        for l in links:
            referenzen.add(l)
            verwendet_von[l].append(html)
    # CSS: @import extrahieren
    for css in dateien_dict["css"]:
        imports = extrahiere_css_imports(css)
        for imp in imports:
            referenzen.add(imp)
            verwendet_von[imp].append(css)
    # Nicht verwendete Dateien
    nicht_verwendet = [f for f in alle_dateien if os.path.basename(f) not in referenzen]
    return referenzen, verwendet_von, nicht_verwendet

# -------------------------------------------
# ✅ Flake8-Analyse
# -------------------------------------------

def check_html_css_syntax(dateien_dict):
    """
    Führt einfache Syntaxchecks für HTML- und CSS-Dateien durch (prüft auf grundlegende Fehler).
    Gibt die Ergebnisse für jede Datei aus.
    """
    print("\n🧪 Syntaxprüfung HTML/CSS:")
    for html in dateien_dict["html"]:
        try:
            with open(html, "r", encoding="utf-8", errors="ignore") as f:
                inhalt = f.read()
                if "<html" not in inhalt:
                    print(f"❌ {html}: Kein <html>-Tag gefunden.")
                else:
                    print(f"✅ {html}: OK")
        except Exception as e:
            print(f"❌ {html}: Fehler beim Lesen: {e}")
    for css in dateien_dict["css"]:
        try:
            with open(css, "r", encoding="utf-8", errors="ignore") as f:
                inhalt = f.read()
                if "{" not in inhalt:
                    print(f"❌ {css}: Keine CSS-Regeln gefunden.")
                else:
                    print(f"✅ {css}: OK")
        except Exception as e:
            print(f"❌ {css}: Fehler beim Lesen: {e}")

# -------------------------------------------
# 🧰 Hauptfunktion
# -------------------------------------------

def hauptfunktion_html_css(startverzeichnis: str) -> None:
    """
    Führt die Analyse für HTML- und CSS-Dateien durch:
    - Findet alle HTML- und CSS-Dateien
    - Analysiert die Verlinkungen
    - Gibt verwendete und nicht verwendete Dateien aus
    - Speichert die Ergebnisse in einer Datei (mit Baumstruktur)
    - Führt eine Syntaxprüfung durch
    """
    print(f"🔍 Analyse im Projektordner: {startverzeichnis}\n")
    dateien = finde_html_css_dateien(startverzeichnis)
    referenzen, verwendet_von, nicht_genutzt = analysiere_html_css_verlinkungen(dateien)

    print("📄 Gefundene HTML-Dateien:")
    for html in dateien["html"]:
        print(f"  {html}")
    print("\n📄 Gefundene CSS-Dateien:")
    for css in dateien["css"]:
        print(f"  {css}")

    print("\n🔗 Verlinkte Dateien:")
    for ref in referenzen:
        print(f"  {ref} verwendet in:")
        for nutzer in verwendet_von[ref]:
            print(f"     └── {nutzer}")

    print("\n🧹 Nicht verwendete Dateien:")
    for pfad in nicht_genutzt:
        print(f"  ❌ {pfad}")

    schreibe_kompletten_verzeichnisbaum("analyse_ergebnis.txt", startverzeichnis)
    with open("analyse_ergebnis.txt", "a", encoding="utf-8") as f:
        f.write("\n🔗 Verlinkte Dateien:\n")
        for ref in referenzen:
            f.write(f"{ref} verwendet in:\n")
            for nutzer in verwendet_von[ref]:
                f.write(f"  └── {nutzer}\n")
        f.write("\n🧹 Nicht verwendete Dateien:\n")
        for pfad in nicht_genutzt:
            f.write(f"❌ {pfad}\n")

    check_html_css_syntax(dateien)
    print("\n✅ Analyse abgeschlossen. Ergebnisse gespeichert in 'analyse_ergebnis.txt'")
# -------------------------------------------

if __name__ == "__main__":
    # Beispiel: Analyse für HTML/CSS im aktuellen Verzeichnis
    hauptfunktion_html_css(os.getcwd())