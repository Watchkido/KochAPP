# 📚 Studienleitfaden: Agiles Projektmanagement mit ScrumStudienleitfaden: Agiles Projektmanagement mit Scrum

Quiz: Kurzfragen

> **Praxisbeispiel:** Smart Recipe HubBeantworten Sie die folgenden zehn Fragen in jeweils zwei bis drei Sätzen, basierend auf den bereitgestellten Quellentexten.

1. Was sind die wesentlichen Unterschiede zwischen klassischem und agilem Projektmanagement in Bezug auf Planung und Flexibilität?

Dieser Leitfaden begleitet Sie durch die wichtigsten Konzepte des agilen Projektmanagements mit Scrum und nutzt den **Smart Recipe Hub** als praktisches Anwendungsbeispiel.2. Beschreiben Sie die Rolle und die Hauptverantwortlichkeiten des Product Owners im Scrum-Framework.

3. Was ist das Ziel des Daily Scrum und welche drei zentralen Fragen werden dort vom Entwicklungsteam beantwortet?

---4. Erklären Sie, was eine User Story ist und geben Sie das Standardformat an, in dem sie geschrieben wird.

5. Was versteht man unter der "Definition of Ready" (DoR) und welche Kriterien muss eine User Story erfüllen, um diesen Status zu erreichen?

## 📝 Quiz: Kurzfragen6. Beschreiben Sie die technische Architektur des "Smart Recipe Hub" und erläutern Sie, warum dieser Ansatz gewählt wurde.

7. Nennen Sie drei Kernfunktionen, die im Minimum Viable Product (MVP) des "Smart Recipe Hub" enthalten waren.

Beantworten Sie die folgenden zehn Fragen in jeweils **zwei bis drei Sätzen**, basierend auf den bereitgestellten Quellentexten.8. Was sind Story Points und welche Zahlenskala wird typischerweise für die Schätzung im Planning Poker verwendet?

9. Welchen Zweck erfüllt die Sprint Retrospektive und wer nimmt daran teil?

### ❓ Fragen10. Wie realisiert die "Smart Recipe Hub"-Anwendung die dauerhafte Speicherung von Daten ohne ein serverseitiges Backend?

--------------------------------------------------------------------------------

1. **Was sind die wesentlichen Unterschiede zwischen klassischem und agilem Projektmanagement in Bezug auf Planung und Flexibilität?**Antwortschlüssel

1. Im klassischen Projektmanagement erfolgt die Planung detailliert und fix zu Beginn, während sie im agilen Vorgehen nur einen groben Rahmen vorgibt und Details je Iteration geplant werden. In Bezug auf Flexibilität sind Änderungen im klassischen Modell teuer und schwierig, wohingegen sie im agilen Modell jederzeit möglich und sogar erwünscht sind.

2. **Beschreiben Sie die Rolle und die Hauptverantwortlichkeiten des Product Owners im Scrum-Framework.**2. Der Product Owner repräsentiert den Kunden und ist für das Ergebnis sowie den wirtschaftlichen Erfolg des Projekts verantwortlich. Seine Hauptaufgaben sind das Erheben, Verfeinern und Priorisieren von Anforderungen im Product Backlog sowie das Treffen von Entscheidungen bezüglich Produkt und Umfang.

3. Das Daily Scrum dient der täglichen Synchronisation des Entwicklungsteams, um einen einheitlichen Informationsstand zu gewährleisten und Hindernisse (Impediments) zu identifizieren. Die drei Fragen sind: Was habe ich gestern getan, um dem Team beim Erreichen des Sprintziels zu helfen? Was werde ich heute tun? Sehe ich ein Hindernis, das mich oder das Team am Erreichen des Sprintziels hindert?

3. **Was ist das Ziel des Daily Scrum und welche drei zentralen Fragen werden dort vom Entwicklungsteam beantwortet?**4. Eine User Story ist eine Anforderung, die aus der Perspektive des Nutzers formuliert wird und den Fokus auf den Mehrwert legt, ohne das "Wie" der Umsetzung vorzugeben. Das Standardformat lautet: "In der Rolle xxx benötige ich Funktion xy, damit ich Zielsetzung xx erreiche".

5. Die "Definition of Ready" (DoR) legt fest, wann eine User Story bereit ist, vom Product Backlog in den Sprint Backlog übernommen zu werden. Die Kriterien dafür sind: Die Story muss geschätzt, klein genug für einen Sprint, mit Akzeptanzkriterien versehen und von allen Teammitgliedern verstanden worden sein.

4. **Erklären Sie, was eine User Story ist und geben Sie das Standardformat an, in dem sie geschrieben wird.**6. Der "Smart Recipe Hub" ist eine komplett clientseitige Anwendung, die nur HTML, CSS und JavaScript nutzt und ohne serverseitiges Backend auskommt. Die Daten werden über SQL.js (SQLite via WebAssembly) direkt im Browser gespeichert. Dieser Ansatz wurde wegen Vorteilen wie keinen Serverkosten, maximalem Datenschutz, Offline-Fähigkeit und einfachem Deployment gewählt.

7. Das MVP des "Smart Recipe Hub" umfasste die folgenden drei Kernfunktionen: 1. Eine Rezeptdarstellung auf der Startseite mit Titeln und Beschreibungen. 2. Eine Detailansicht für Rezepte mit Zutaten, Schritten und Zubereitungszeit. 3. Ein Formular, mit dem Benutzer neue Rezepte hinzufügen können, die dauerhaft gespeichert werden.

5. **Was versteht man unter der "Definition of Ready" (DoR) und welche Kriterien muss eine User Story erfüllen, um diesen Status zu erreichen?**8. Story Points sind eine relative Maßeinheit, um den Umfang und die Komplexität einer User Story zu schätzen. Für die Schätzung im Planning Poker wird typischerweise die Fibonacci-Zahlenreihe (1, 2, 3, 5, 8, 13, ...) verwendet, wobei Stories mit einem Wert über 13 als zu groß für einen Sprint gelten (Epic).

9. Die Sprint Retrospektive dient dazu, den Arbeitsprozess und die Zusammenarbeit im Scrum Team kontinuierlich zu verbessern. Die Teilnehmer sind das Entwicklungsteam und der Scrum Master, der das Meeting moderiert; der Product Owner kann ebenfalls teilnehmen.

6. **Beschreiben Sie die technische Architektur des "Smart Recipe Hub" und erläutern Sie, warum dieser Ansatz gewählt wurde.**10. Die Anwendung nutzt SQL.js, eine Implementierung von SQLite, die mittels WebAssembly direkt im Browser läuft. Die so erstellte Datenbank wird persistent im LocalStorage des Browsers gespeichert, wodurch die Daten auch nach dem Schließen des Fensters erhalten bleiben.

--------------------------------------------------------------------------------

7. **Nennen Sie drei Kernfunktionen, die im Minimum Viable Product (MVP) des "Smart Recipe Hub" enthalten waren.**Essay-Fragen

Formulieren Sie fundierte Antworten auf die folgenden Fragen.

8. **Was sind Story Points und welche Zahlenskala wird typischerweise für die Schätzung im Planning Poker verwendet?**1. Diskutieren Sie, wie die fünf Scrum-Werte (Fokus, Mut, Offenheit, Respekt, Verbindlichkeit) für den Erfolg eines selbstorganisierten Entwicklungsteams, wie es im "Smart Recipe Hub"-Projekt beschrieben wird, unerlässlich sind.

2. Vergleichen und kontrastieren Sie das Sprint Review und die Sprint Retrospektive. Erläutern Sie die unterschiedlichen Ziele, Teilnehmer und Ergebnisse beider Ereignisse und begründen Sie, warum beide für den agilen Prozess von entscheidender Bedeutung sind.

9. **Welchen Zweck erfüllt die Sprint Retrospektive und wer nimmt daran teil?**3. Der "Smart Recipe Hub" wurde mit einer reinen clientseitigen Architektur entwickelt. Analysieren Sie die Vorteile und potenziellen Nachteile dieser technischen Entscheidung im Kontext der Produktvision und der definierten Zielgruppen.

4. Beschreiben Sie den Weg einer Feature-Idee von der "Produktvision" bis zu einem fertigen "Produktinkrement". Detaillieren Sie dabei die Rollen des Product Owners und des Entwicklungsteams sowie die entscheidenden Scrum-Artefakte und -Ereignisse, die diesen Prozess begleiten.

10. **Wie realisiert die "Smart Recipe Hub"-Anwendung die dauerhafte Speicherung von Daten ohne ein serverseitiges Backend?**5. Erläutern Sie das Konzept eines "dynamischen und lebendigen Artefakts" am Beispiel des Product Backlogs. Diskutieren Sie die im Quelltext genannten Priorisierungsmethoden (z. B. MSCW, Kano-Diagramm, Wert/Risiko-Matrix) und wie sie dem Product Owner helfen, den maximalen Wert zu schaffen.

--------------------------------------------------------------------------------

---Glossar

Begriff

## ✅ AntwortschlüsselDefinition

Agiles Manifest

### 1. Klassisches vs. Agiles ProjektmanagementEin Dokument, das vier zentrale Werte für die Softwareentwicklung definiert, wie z.B. "Individuen und Interaktionen mehr als Prozesse und Werkzeuge".

Artefakte

Im **klassischen Projektmanagement** erfolgt die Planung detailliert und fix zu Beginn, während sie im **agilen Vorgehen** nur einen groben Rahmen vorgibt und Details je Iteration geplant werden. In Scrum sind dies Werkzeuge, um Probleme zu lösen oder Transparenz zu schaffen. Die drei offiziellen Artefakte sind das Product Backlog, das Sprint Backlog und das Produktinkrement.

Burndown Chart

In Bezug auf **Flexibilität** sind Änderungen im klassischen Modell teuer und schwierig, wohingegen sie im agilen Modell jederzeit möglich und sogar erwünscht sind.Eine Grafik, die die verbleibende Arbeit im Sprint visualisiert. Sie zeigt, ob das Team im Plan ist, das Sprintziel zu erreichen.

Daily Scrum

---Ein tägliches, maximal 15-minütiges Meeting für das Entwicklungsteam zur Synchronisation und Identifizierung von Hindernissen.

Definition of Done (DoD)

### 2. Rolle des Product OwnersEine vom Team gemeinsam festgelegte Checkliste, die definiert, wann eine User Story als vollständig umgesetzt gilt (z.B. Code geschrieben, getestet, Peer-Review durchgeführt).

Definition of Ready (DoR)

Der **Product Owner** repräsentiert den Kunden und ist für das Ergebnis sowie den **wirtschaftlichen Erfolg** des Projekts verantwortlich. Eine Checkliste, die definiert, wann eine User Story bereit ist, in einen Sprint aufgenommen zu werden (z.B. geschätzt, verstanden, klein genug).

Entwicklungsteam

Seine Hauptaufgaben sind:Eine selbstorganisierte Gruppe von Fachleuten, die für die Umsetzung der Anforderungen und die Lieferung eines fertigen Produktinkrements verantwortlich ist.

- Das **Erheben, Verfeinern und Priorisieren** von Anforderungen im Product BacklogEpic

- Das **Treffen von Entscheidungen** bezüglich Produkt und UmfangEine große User Story, die zu umfangreich ist, um in einem einzigen Sprint umgesetzt zu werden. Sie muss vor der Umsetzung in kleinere User Stories aufgeteilt werden.

Impediment

---Ein Hindernis, das das Entwicklungsteam daran hindert, produktiv zu arbeiten oder das Sprintziel zu erreichen. Die Beseitigung ist Aufgabe des Scrum Masters.

Jira

### 3. Daily ScrumEin im Quelltext erwähntes Software-Tool für agiles Projektmanagement.

Kano-Diagramm

Das **Daily Scrum** dient der täglichen **Synchronisation** des Entwicklungsteams, um einen einheitlichen Informationsstand zu gewährleisten und Hindernisse (Impediments) zu identifizieren. Ein Modell zur Priorisierung von Anforderungen, das zwischen Basis-, Leistungs- und Begeisterungsmerkmalen unterscheidet.

Klassisches PM

**Die drei zentralen Fragen:**Ein lineares, phasenbasiertes Vorgehensmodell (z.B. Wasserfall), bei dem Planung, Umsetzung und Test nacheinander erfolgen und Änderungen schwierig sind.

1. ✅ Was habe ich **gestern** getan, um dem Team beim Erreichen des Sprintziels zu helfen?MSCW-Priorisierung

2. ✅ Was werde ich **heute** tun?Eine Methode zur Priorisierung von Anforderungen in vier Kategorien: Must have, Should have, Could have, Won't have.

3. ✅ Sehe ich ein **Hindernis**, das mich oder das Team am Erreichen des Sprintziels hindert?MVP (Minimum Viable Product)

Die erste, minimal funktionsfähige Version eines Produkts, die den Kernnutzen für den Kunden erfüllt und schnelles Feedback ermöglicht.

---Product Backlog

Eine priorisierte, dynamische Liste aller bekannten Anforderungen, Wünsche und Features für ein Produkt. Es wird vom Product Owner verantwortet.

### 4. User StoryProduct Owner (PO)

Die Scrum-Rolle, die den Kunden repräsentiert, für den wirtschaftlichen Erfolg verantwortlich ist und das Product Backlog priorisiert.

Eine **User Story** ist eine Anforderung, die aus der Perspektive des Nutzers formuliert wird und den Fokus auf den **Mehrwert** legt, ohne das "Wie" der Umsetzung vorzugeben. Produktinkrement

Die Summe aller im Sprint fertiggestellten Product-Backlog-Einträge plus der Inkremente aller vorherigen Sprints. Es muss potenziell auslieferbar und nutzbar sein.

**Standardformat:**Retrospektive

> "In der Rolle **XXX** benötige ich Funktion **XY**, damit ich Zielsetzung **XX** erreiche"Ein Meeting am Ende eines Sprints, in dem das Scrum Team den Arbeitsprozess und die Zusammenarbeit reflektiert, um Verbesserungsmaßnahmen zu definieren.

Scrum

---Ein Framework für die Zusammenarbeit, um komplexe Aufgabenstellungen zu lösen und Produkte mit höchstmöglichem Wert auszuliefern.

Scrum Master (SM)

### 5. Definition of Ready (DoR)Die Scrum-Rolle, die für die Einhaltung des Scrum-Frameworks verantwortlich ist, Hindernisse beseitigt und das Team als Coach und Moderator unterstützt.

Sprint

Die **"Definition of Ready"** (DoR) legt fest, wann eine User Story bereit ist, vom Product Backlog in den Sprint Backlog übernommen zu werden. Ein fest definierter Zeitrahmen (Iteration) von maximal vier Wochen, in dem ein fertiges und potenziell auslieferbares Produktinkrement erstellt wird.

Sprint Backlog

**Kriterien:**Eine Liste der für den aktuellen Sprint ausgewählten Product-Backlog-Einträge (User Stories) sowie der Plan (Tasks) zu deren Umsetzung.

- ✅ Die Story muss **geschätzt** seinSprint Planning

- ✅ **Klein genug** für einen SprintEin Meeting zu Beginn des Sprints, in dem das Team plant, WAS im Sprint umgesetzt wird (Sprintziel) und WIE es umgesetzt wird (Tasks).

- ✅ Mit **Akzeptanzkriterien** versehenSprint Review

- ✅ Von allen **Teammitgliedern verstanden**Ein Meeting am Ende des Sprints, bei dem das Entwicklungsteam das erstellte Produktinkrement dem Product Owner und den Stakeholdern vorstellt, um Feedback zu erhalten.

Story Points

---Eine relative Schätzeinheit zur Bewertung von Aufwand, Komplexität und Risiko einer User Story, oft unter Verwendung der Fibonacci-Reihe.

User Story

### 6. Technische Architektur des Smart Recipe HubEine Anforderung, formuliert aus der Perspektive eines Nutzers, die beschreibt, welche Funktion er benötigt und welchen Nutzen er sich davon verspricht.

Velocity

Der **Smart Recipe Hub** ist eine komplett **clientseitige Anwendung**, die nur HTML, CSS und JavaScript nutzt und ohne serverseitiges Backend auskommt. Die Daten werden über **SQL.js** (SQLite via WebAssembly) direkt im Browser gespeichert. Eine Metrik, die die Summe der Story Points misst, die ein Team pro Sprint durchschnittlich abschließt. Sie dient der Planung zukünftiger Sprints.


**Gründe für diesen Ansatz:**
- 💰 Keine Serverkosten
- 🔒 Maximaler Datenschutz
- 📶 Offline-Fähigkeit
- 🚀 Einfaches Deployment

---

### 7. MVP-Kernfunktionen

Das **MVP des Smart Recipe Hub** umfasste drei Kernfunktionen:

1. 📋 **Rezeptdarstellung** auf der Startseite mit Titeln und Beschreibungen
2. 🔍 **Detailansicht** für Rezepte mit Zutaten, Schritten und Zubereitungszeit
3. ➕ **Formular** zum Hinzufügen neuer Rezepte mit dauerhafter Speicherung

---

### 8. Story Points

**Story Points** sind eine **relative Maßeinheit**, um den Umfang und die Komplexität einer User Story zu schätzen. 

Für die Schätzung im **Planning Poker** wird typischerweise die **Fibonacci-Zahlenreihe** verwendet:
```
1, 2, 3, 5, 8, 13, ...
```

⚠️ Stories mit einem Wert **über 13** gelten als zu groß für einen Sprint (**Epic**)

---

### 9. Sprint Retrospektive

Die **Sprint Retrospektive** dient dazu, den Arbeitsprozess und die Zusammenarbeit im Scrum Team kontinuierlich zu **verbessern**. 

**Teilnehmer:**
- 👥 Das **Entwicklungsteam**
- 🎯 Der **Scrum Master** (moderiert das Meeting)
- 📊 Der **Product Owner** (kann optional teilnehmen)

---

### 10. Datenspeicherung ohne Backend

Die Anwendung nutzt **SQL.js**, eine Implementierung von SQLite, die mittels **WebAssembly** direkt im Browser läuft. 

Die so erstellte Datenbank wird **persistent im LocalStorage** des Browsers gespeichert, wodurch die Daten auch nach dem Schließen des Fensters erhalten bleiben.

---

## 📖 Essay-Fragen

Formulieren Sie **fundierte Antworten** auf die folgenden Fragen.

### 1. Scrum-Werte und Selbstorganisation

> **Thema:** Diskutieren Sie, wie die fünf Scrum-Werte (Fokus, Mut, Offenheit, Respekt, Verbindlichkeit) für den Erfolg eines selbstorganisierten Entwicklungsteams, wie es im "Smart Recipe Hub"-Projekt beschrieben wird, unerlässlich sind.

**Erwartete Punkte:**
- Erläuterung der fünf Scrum-Werte
- Zusammenhang mit Selbstorganisation
- Praktische Beispiele aus dem Smart Recipe Hub
- Auswirkungen auf Teamerfolg

---

### 2. Sprint Review vs. Sprint Retrospektive

> **Thema:** Vergleichen und kontrastieren Sie das Sprint Review und die Sprint Retrospektive. Erläutern Sie die unterschiedlichen Ziele, Teilnehmer und Ergebnisse beider Ereignisse und begründen Sie, warum beide für den agilen Prozess von entscheidender Bedeutung sind.

**Vergleichstabelle:**

| Aspekt | Sprint Review | Sprint Retrospektive |
|--------|---------------|---------------------|
| **Fokus** | Produkt (WAS) | Prozess (WIE) |
| **Ziel** | Feedback zum Inkrement | Verbesserung der Zusammenarbeit |
| **Teilnehmer** | Team + PO + Stakeholder | Team + SM (+ optional PO) |
| **Ergebnis** | Angepasstes Product Backlog | Verbesserungsmaßnahmen |
| **Zeitpunkt** | Am Ende des Sprints | Nach dem Review |

---

### 3. Clientseitige Architektur - Vor- und Nachteile

> **Thema:** Der "Smart Recipe Hub" wurde mit einer reinen clientseitigen Architektur entwickelt. Analysieren Sie die Vorteile und potenziellen Nachteile dieser technischen Entscheidung im Kontext der Produktvision und der definierten Zielgruppen.

**Vorteile (✅):**
- Keine Serverkosten → Ideal für Studierende (Zielgruppe)
- Maximaler Datenschutz → Privacy First
- Offline-Fähigkeit → Überall nutzbar
- Einfaches Deployment → Schneller Start
- Keine Registrierung nötig → Niedrige Einstiegshürde

**Nachteile (⚠️):**
- Keine zentrale Datenverwaltung → Kein Geräte-Sync
- Begrenzte Speicherkapazität → LocalStorage-Limits
- Keine Kollaboration → Kein Rezept-Sharing
- Abhängigkeit vom Browser → Daten können verloren gehen

---

### 4. Von der Vision zum Produktinkrement

> **Thema:** Beschreiben Sie den Weg einer Feature-Idee von der "Produktvision" bis zu einem fertigen "Produktinkrement". Detaillieren Sie dabei die Rollen des Product Owners und des Entwicklungsteams sowie die entscheidenden Scrum-Artefakte und -Ereignisse, die diesen Prozess begleiten.

**Der Weg:**

```
📍 Produktvision
    ↓
📋 Product Backlog (PO erstellt User Stories)
    ↓
🎯 Sprint Planning (Team wählt Stories aus)
    ↓
📝 Sprint Backlog (Team plant Tasks)
    ↓
👨‍💻 Sprint-Umsetzung (Team entwickelt)
    ↓ (Daily Scrum zur Synchronisation)
📦 Produktinkrement (Fertige Features)
    ↓
🔍 Sprint Review (Feedback einholen)
    ↓
🔄 Sprint Retrospektive (Prozess verbessern)
    ↓
🔁 Zurück zum Product Backlog
```

**Rollen:**
- **Product Owner:** Priorisiert, definiert Akzeptanzkriterien, gibt Feedback
- **Entwicklungsteam:** Schätzt, plant, entwickelt, testet, liefert

---

### 5. Product Backlog als dynamisches Artefakt

> **Thema:** Erläutern Sie das Konzept eines "dynamischen und lebendigen Artefakts" am Beispiel des Product Backlogs. Diskutieren Sie die im Quelltext genannten Priorisierungsmethoden (z. B. MSCW, Kano-Diagramm, Wert/Risiko-Matrix) und wie sie dem Product Owner helfen, den maximalen Wert zu schaffen.

**Dynamisches Artefakt bedeutet:**
- 🔄 Ständig im Wandel (neue Einträge, Änderungen, Löschungen)
- 📊 Kontinuierliches Refinement (Verfeinerung der Stories)
- 🎯 Anpassung an neue Erkenntnisse und Feedback
- 📈 Reaktion auf Marktveränderungen

**Priorisierungsmethoden:**

#### 1. MSCW-Priorisierung
- **M**ust have (zwingend erforderlich)
- **S**hould have (wichtig, aber nicht zwingend)
- **C**ould have (wünschenswert)
- **W**on't have (nicht in diesem Release)

#### 2. Kano-Diagramm
- **Basismerkmale** (erwartet, führen zu Unzufriedenheit, wenn fehlen)
- **Leistungsmerkmale** (je mehr, desto besser)
- **Begeisterungsmerkmale** (überraschen positiv)

#### 3. Wert/Risiko-Matrix
| Hohes Risiko | Hoher Wert, Hohes Risiko<br>→ Zuerst umsetzen (lernen) | Niedriger Wert, Hohes Risiko<br>→ Vermeiden |
|--------------|-------------------------------------------------------|---------------------------------------------|
| Niedriges Risiko | Hoher Wert, Niedriges Risiko<br>→ Quick Wins | Niedriger Wert, Niedriges Risiko<br>→ Später |

---

## 📖 Glossar

Alphabetisch sortierte Definitionen aller wichtigen Begriffe.

### A

**Agiles Manifest**  
Ein Dokument, das vier zentrale Werte für die Softwareentwicklung definiert, wie z.B. "Individuen und Interaktionen mehr als Prozesse und Werkzeuge".

**Artefakte**  
In Scrum sind dies Werkzeuge, um Probleme zu lösen oder Transparenz zu schaffen. Die drei offiziellen Artefakte sind das Product Backlog, das Sprint Backlog und das Produktinkrement.

---

### B

**Burndown Chart**  
Eine Grafik, die die verbleibende Arbeit im Sprint visualisiert. Sie zeigt, ob das Team im Plan ist, das Sprintziel zu erreichen.

---

### D

**Daily Scrum**  
Ein tägliches, maximal 15-minütiges Meeting für das Entwicklungsteam zur Synchronisation und Identifizierung von Hindernissen.

**Definition of Done (DoD)**  
Eine vom Team gemeinsam festgelegte Checkliste, die definiert, wann eine User Story als vollständig umgesetzt gilt (z.B. Code geschrieben, getestet, Peer-Review durchgeführt).

**Definition of Ready (DoR)**  
Eine Checkliste, die definiert, wann eine User Story bereit ist, in einen Sprint aufgenommen zu werden (z.B. geschätzt, verstanden, klein genug).

---

### E

**Entwicklungsteam**  
Eine selbstorganisierte Gruppe von Fachleuten, die für die Umsetzung der Anforderungen und die Lieferung eines fertigen Produktinkrements verantwortlich ist.

**Epic**  
Eine große User Story, die zu umfangreich ist, um in einem einzigen Sprint umgesetzt zu werden. Sie muss vor der Umsetzung in kleinere User Stories aufgeteilt werden.

---

### I

**Impediment**  
Ein Hindernis, das das Entwicklungsteam daran hindert, produktiv zu arbeiten oder das Sprintziel zu erreichen. Die Beseitigung ist Aufgabe des Scrum Masters.

---

### J

**Jira**  
Ein im Quelltext erwähntes Software-Tool für agiles Projektmanagement.

---

### K

**Kano-Diagramm**  
Ein Modell zur Priorisierung von Anforderungen, das zwischen Basis-, Leistungs- und Begeisterungsmerkmalen unterscheidet.

**Klassisches PM**  
Ein lineares, phasenbasiertes Vorgehensmodell (z.B. Wasserfall), bei dem Planung, Umsetzung und Test nacheinander erfolgen und Änderungen schwierig sind.

---

### M

**MSCW-Priorisierung**  
Eine Methode zur Priorisierung von Anforderungen in vier Kategorien: Must have, Should have, Could have, Won't have.

**MVP (Minimum Viable Product)**  
Die erste, minimal funktionsfähige Version eines Produkts, die den Kernnutzen für den Kunden erfüllt und schnelles Feedback ermöglicht.

---

### P

**Product Backlog**  
Eine priorisierte, dynamische Liste aller bekannten Anforderungen, Wünsche und Features für ein Produkt. Es wird vom Product Owner verantwortet.

**Product Owner (PO)**  
Die Scrum-Rolle, die den Kunden repräsentiert, für den wirtschaftlichen Erfolg verantwortlich ist und das Product Backlog priorisiert.

**Produktinkrement**  
Die Summe aller im Sprint fertiggestellten Product-Backlog-Einträge plus der Inkremente aller vorherigen Sprints. Es muss potenziell auslieferbar und nutzbar sein.

---

### R

**Retrospektive**  
Ein Meeting am Ende eines Sprints, in dem das Scrum Team den Arbeitsprozess und die Zusammenarbeit reflektiert, um Verbesserungsmaßnahmen zu definieren.

---

### S

**Scrum**  
Ein Framework für die Zusammenarbeit, um komplexe Aufgabenstellungen zu lösen und Produkte mit höchstmöglichem Wert auszuliefern.

**Scrum Master (SM)**  
Die Scrum-Rolle, die für die Einhaltung des Scrum-Frameworks verantwortlich ist, Hindernisse beseitigt und das Team als Coach und Moderator unterstützt.

**Sprint**  
Ein fest definierter Zeitrahmen (Iteration) von maximal vier Wochen, in dem ein fertiges und potenziell auslieferbares Produktinkrement erstellt wird.

**Sprint Backlog**  
Eine Liste der für den aktuellen Sprint ausgewählten Product-Backlog-Einträge (User Stories) sowie der Plan (Tasks) zu deren Umsetzung.

**Sprint Planning**  
Ein Meeting zu Beginn des Sprints, in dem das Team plant, WAS im Sprint umgesetzt wird (Sprintziel) und WIE es umgesetzt wird (Tasks).

**Sprint Review**  
Ein Meeting am Ende des Sprints, bei dem das Entwicklungsteam das erstellte Produktinkrement dem Product Owner und den Stakeholdern vorstellt, um Feedback zu erhalten.

**Story Points**  
Eine relative Schätzeinheit zur Bewertung von Aufwand, Komplexität und Risiko einer User Story, oft unter Verwendung der Fibonacci-Reihe.

---

### U

**User Story**  
Eine Anforderung, formuliert aus der Perspektive eines Nutzers, die beschreibt, welche Funktion er benötigt und welchen Nutzen er sich davon verspricht.

---

### V

**Velocity**  
Eine Metrik, die die Summe der Story Points misst, die ein Team pro Sprint durchschnittlich abschließt. Sie dient der Planung zukünftiger Sprints.

---

## 🎯 Lernziele

Nach dem Durcharbeiten dieses Leitfadens können Sie:

- ✅ Die Unterschiede zwischen klassischem und agilem Projektmanagement erklären
- ✅ Die drei Scrum-Rollen und ihre Verantwortlichkeiten beschreiben
- ✅ Die Scrum-Ereignisse (Events) verstehen und deren Zweck erläutern
- ✅ User Stories formulieren und priorisieren
- ✅ Die technische Architektur des Smart Recipe Hub analysieren
- ✅ Priorisierungsmethoden anwenden (MSCW, Kano, Wert/Risiko)
- ✅ Den agilen Entwicklungsprozess von der Vision zum Inkrement nachvollziehen

---

## 📚 Weitere Ressourcen

- **Scrum Guide:** [scrumguides.org](https://scrumguides.org/)
- **Agiles Manifest:** [agilemanifesto.org](https://agilemanifesto.org/)
- **Smart Recipe Hub Repository:** [github.com/Watchkido/KochAPP](https://github.com/Watchkido/KochAPP)

---

**Stand:** November 2025  
**Version:** 2.0  
**Autor:** Scrum-Team Smart Recipe Hub
