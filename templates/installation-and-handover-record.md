---
document:
  id: EXAMPLE-IHR-001
  type: IHR
  language: de-DE
  status: draft
  phase: readiness
  target_gate: draft
  classification: PUBLIC
  ruleset: LIT-DOC-IHR
  ruleset_version: 1.0.0
  editorial_status: review-candidate
  approval_status: pending
  version: "0.1"
  owner: "René Cañas"
---

<!-- cspell:ignore Cañas -->

# [Lösung] – Projektdokumentation [Organisation]

## 1. Allgemeine Informationen

Die folgenden Angaben ordnen Auftrag, Zuständigkeiten und Dokumentstand ein. Sie bilden die gemeinsame Grundlage für Vorbereitung, Umsetzung und Übergabe.

### 1.1 Zweck und Verwendung

Diese Projektdokumentation beschreibt Anforderungen, technische Umsetzung und Ergebnisse des Projekts. Sie wird während der Durchführung um Konfiguration, Prüfergebnisse und offene Punkte ergänzt.

| **Dokumentinformation** | **Angabe**                                                                                           |
| ----------------------- | ---------------------------------------------------------------------------------------------------- |
| Dokument-ID             | [Stabile Kennung]                                                                                    |
| Dokumentversion         | 0.1                                                                                                  |
| Stand / Sprache         | [Datum]; Dokumentensprache und Ausgangssprache: Deutsch (de-DE); Übersetzungsstatus: Originalfassung |
| Klassifikation          | [Vereinbarte Klassifikation]                                                                         |
| Geltungsbereich         | [Lösung und Zielumgebung]                                                                            |
| Technische Bezeichner   | Befehle, Pfade, Variablen, API-Felder, Regel- und Phasen-IDs unverändert übernehmen                  |
| Dokumentverantwortung   | René Cañas; Kontakt gemäß 1.3                                                                        |
| Prüfung und Freigabe    | [Zuständige Rolle gemäß 1.3]                                                                         |
| Freigabenachweis        | Ausstehend; Entscheidung und Referenz gemäß 1.4 und 14.1                                             |
| Reviewdatum / Auslöser  | [Datum / relevante Änderungen]                                                                       |

[YAML-Metadaten und sichtbare Dokumentinformationen vor Verwendung gemeinsam anpassen: Kennung, Sprache, Klassifikation und tatsächlichen Lifecycle-Stand konsistent halten. Die Beispielkennung und PUBLIC-Klassifikation der neutralen Vorlage sind keine Projektfreigabe.]

### 1.2 Projektauftrag

Ziel ist [konkretes Projektergebnis]. Der Umfang umfasst [Leistungen und Komponenten]. Die zuständigen Betriebs- und Fachstellen stellen [Infrastruktur, Zugänge, Informationen] bereit. Projekt- und Anwendungsverantwortliche legen fachlichen Umfang, Abnahmekriterien, Umschaltfenster und Rückfallkriterien fest; die technische Planung baut darauf auf.

Zur Übergabe gehört eine Einweisung der zuständigen Betriebsteams. Bestehende Konzepte werden berücksichtigt. [Abgrenzungen und separate Dokumente, beispielsweise Betriebshandbuch, benennen.]

### 1.3 Ansprechpartner

Die Rollen koordinieren Bereitstellungen und Entscheidungen in ihrem Verantwortungsbereich. Persönliche Namen und Kontaktdaten werden ausschließlich hier gepflegt.

| **Zuständigkeit**                                          | **Name**           | **Kontakt** |
| ---------------------------------------------------------- | ------------------ | ----------- |
| Projektkoordination                                        | [Noch zu benennen] | [Kontakt]   |
| Dokumentverantwortung, Umsetzung und technische Abstimmung | René Cañas         | [Kontakt]   |
| Systembetrieb                                              | [Noch zu benennen] | [Kontakt]   |
| Prüfung und Freigabe                                       | [Noch zu benennen] | [Kontakt]   |

[Weitere tatsächlich benötigte Betriebs- und Fachrollen ergänzen.]

### 1.4 Dokumentstatus und Freigabe

Der Dokumentstatus unterscheidet Entwurf, Prüfung und Freigabe. Inhaltliche Bestätigung, technische Ausführungsfreigabe, Betriebsübernahme und Projektabnahme werden getrennt dokumentiert. Eine inhaltlich bestätigte Erstfassung wird mit Version, Datum und Entscheidungsreferenz als abgestimmter initialer Projektentwurf festgehalten.

| **Stand** | **Status** | **Entscheidung / Referenz** |
| --------- | ---------- | --------------------------- |
| 0.1       | Entwurf    | Noch keine Freigabe         |

### 1.5 Versionierung

Die Dokument-ID bleibt unverändert. Die Version kennzeichnet den inhaltlichen Stand; wesentliche Änderungen stehen in Kapitel 15.3. Vor der ersten Freigabe werden 0.x-Fassungen geführt, die erste freigegebene Ausgabe erhält 1.0. Hauptversionen kennzeichnen wesentliche Überarbeitungen, Nebenversionen fachliche Ergänzungen und Revisionen redaktionelle Korrekturen. Verbindliche Vorgaben der Organisation haben Vorrang.

## 2. Architektur

Die Architektur zeigt das Zusammenspiel der relevanten Systeme und ihre Abhängigkeiten. Sie bildet die Grundlage für Kommunikation, Umsetzung und Betriebszuständigkeiten.

### 2.1 Lösungsaufbau

[Aufbau, Instanzen und Beziehungen erklären. Draw.io-Quelle und daraus exportierte Grafik erstellen; Export hier mit relativem Pfad einbinden und Quelle verlinken. Keine fremden Kundendiagramme übernehmen.]

### 2.2 Komponenten und Betriebsanbindungen

Die Übersicht ordnet den Komponenten ihre Aufgaben und ihren Leistungsumfang zu.

| **Komponente** | **Aufgabe** | **Bereitstellung / Zuständigkeit** |
| -------------- | ----------- | ---------------------------------- |
| [Komponente]   | [Aufgabe]   | [Rolle]                            |

### 2.3 Zielsysteme

Die Ausstattung wird je benötigtem System beziehungsweise Instanz festgehalten.

| **Merkmal**              | **[Zielsystem / Instanz]**             |
| ------------------------ | -------------------------------------- |
| Anzahl / Zweck           | [Anzahl und Zweck ausdrücklich nennen] |
| Name / Adresse           | [Wert oder offen]                      |
| Plattform / Hauptversion | [Wert]                                 |
| Ressourcen / Datenablage | [Wert]                                 |

### 2.4 Verfügbarkeit und Abhängigkeiten

[Verfügbarkeitsgrenzen, externe Abhängigkeiten und vereinbarte Wiederanlaufziele beschreiben. Keine Hochverfügbarkeit unterstellen.]

## 3. Voraussetzungen

Die Umsetzung setzt die Bereitstellung der benötigten Systeme, Zugänge und projektspezifischen Angaben voraus. Die Übersicht zeigt Anforderungen, Bearbeitungsstand, Zuständigkeiten und benötigte Zeitpunkte.

### 3.1 Bereitstellungen

Die Anforderungen bilden die Arbeitsliste für die Vorbereitung. Die Standardbereitstellung der Plattform erfolgt durch das zuständige Betriebsteam.

| **ID**  | **Bereitzustellen / Soll**                       | **Zuständigkeit** | **Benötigt bis** | **Status / Nachweis** |
| ------- | ------------------------------------------------ | ----------------- | ---------------- | --------------------- |
| REQ-001 | [Anzahl und Ausstattung der Zielsysteme]         | [Rolle]           | [Zeitpunkt]      | Offen                 |
| REQ-002 | [Benötigte Zugänge / Dienstkonten]               | [Rolle]           | [Zeitpunkt]      | Offen                 |
| REQ-003 | [Dienstnamen, Zertifikate und Netzwerkfreigaben] | [Rolle]           | [Zeitpunkt]      | Offen                 |

[Projektbezogene Anforderungen ergänzen; keine bereits erfüllten Voraussetzungen ohne Bestätigung behaupten.]

### 3.2 Anforderungsdetails und Startvoraussetzungen

Die Details machen Mindestanforderungen, vereinbarte Ausprägung und bestätigten Iststand vergleichbar. Eine offene Anforderung blockiert nur die davon abhängigen Arbeiten. Ausnahmen benötigen eine zuständige Entscheidung mit nachvollziehbarer Auswirkung.

| **Anforderung**  | **Kategorie** | **Mindestwert**                           | **Vereinbarter Sollwert** | **Bestätigter Istwert** | **Blockierwirkung**  | **Quelle**                 | **Nachweis / Ausnahme** |
| ---------------- | ------------- | ----------------------------------------- | ------------------------- | ----------------------- | -------------------- | -------------------------- | ----------------------- |
| [REQ-ID aus 3.1] | [Bereich]     | [Mindestwert / begründet nicht anwendbar] | Offen                     | Noch nicht geprüft      | [Abhängiger Schritt] | [Versionsgebundene Quelle] | Offen                   |

Vor dem Umsetzungsstart werden die relevanten Voraussetzungen und eine erforderliche Ausführungsfreigabe im Meilenstein M1 mit zuständiger Rolle und Entscheidungsreferenz nachgewiesen. Eine Vorlage oder inhaltliche Dokumentbestätigung erteilt keine technische Ausführungsfreigabe.

### 3.3 Plattformbaseline

Die Plattform-Grundanforderungen werden getrennt von den Produkt- und Topologie-Netzwerkflüssen in Kapitel 6 geprüft. Die Betriebssystembereitstellung bleibt beim zuständigen Betriebsteam.

| **Bereich**                | **Anforderung**                              | **Zuständigkeit** | **Prüfung**                     | **Status / Nachweis**             |
| -------------------------- | -------------------------------------------- | ----------------- | ------------------------------- | --------------------------------- |
| Namensauflösung            | [Benötigte Namen und gültiges Namenskonzept] | [Rolle]           | [Auflösungsprüfung]             | Offen                             |
| Zeitsynchronisation        | [Zulässiger Zeitdienst]                      | [Rolle]           | [Synchronisierungsstatus]       | Offen                             |
| Paket- und Artefaktquellen | [Freigegebene Bezugswege]                    | [Rolle]           | [Erreichbarkeit / Berechtigung] | Offen                             |
| Proxy                      | [Bei Bedarf gemäß 6.4]                       | [Rolle]           | [Zielspezifische Prüfung]       | Offen / begründet nicht anwendbar |
| Vertrauenskette            | [Benötigte Zertifizierungsstellen]           | [Rolle]           | [TLS-Verifikation]              | Offen                             |
| Basisnetz                  | [Routing und Plattformkonnektivität]         | [Rolle]           | [Vorprüfung]                    | Offen                             |

## 4. Realisierungsplanung

Die Meilensteine gliedern die Umsetzung von der Vorbereitung bis zur Betriebsübergabe. Sie zeigen die erwarteten Ergebnisse, Zuständigkeiten und den aktuellen Stand.

### 4.1 Meilensteine

Jeder Meilenstein beschreibt ein nachprüfbares Ergebnis. Termine und Referenzen werden nach Vereinbarung ergänzt.

| **Nr.** | **Meilenstein**        | **Erreicht, wenn**                                                                                                                      | **Zuständigkeit** | **Zieltermin** | **Status** | **Referenz**     |
| ------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | -------------- | ---------- | ---------------- |
| M1      | Umsetzung vorbereitet  | Benötigte Voraussetzungen erfüllt oder dokumentiert ausgenommen, technische Planung abgestimmt und erforderliche Ausführung autorisiert | [Rolle]           | Offen          | Offen      | [Vorgang / Link] |
| M2      | Lösung eingerichtet    | Vereinbarte Komponenten und Integrationen eingerichtet                                                                                  | [Rolle]           | Offen          | Offen      | [Vorgang / Link] |
| M3      | Prüfung abgeschlossen  | Vereinbarte Prüfkriterien nachweislich erfüllt                                                                                          | [Rolle]           | Offen          | Offen      | [Vorgang / Link] |
| M4      | Übergabe und Abschluss | Betriebsaufgaben übernommen und Abschlussentscheidung dokumentiert                                                                      | [Rolle]           | Offen          | Offen      | [Vorgang / Link] |

## 5. Installation und Konfiguration

Die Installations- und Konfigurationsbeschreibung hält fest, wie die Lösung eingerichtet wird und welche Einstellungen dafür erforderlich sind. Sie macht den Aufbau für spätere Prüfungen und Änderungen nachvollziehbar.

### 5.1 Systemvorbereitung

Die zuständigen Betriebsteams stellen [Plattform und Ausführungswerkzeuge] nach dem bestehenden Standard bereit. Die anwendungsbezogenen Voraussetzungen und Zuständigkeiten sind in Abschnitt 5.2.2 zusammengefasst.

[Ausführungsort der Automatisierung, Installationskonto und dauerhaftes Anwendungskonto unterscheiden. Ein gemeinsamer Controller-/Anwendungshost ist eine Projektentscheidung.]

Die administrativen Zugänge und das geschützte Abrufverfahren für Zugangsdaten sind in Abschnitt 13.2 beschrieben. Geheimnisse und private Schlüssel werden nicht in der Dokumentation gespeichert.

### 5.2 Produktinstallation

Installation und technische Konfiguration erfolgen über [belegtes Automatisierungsverfahren]. Die Konfiguration wird [versioniert als Code / vereinbartes Verfahren] gepflegt. Manuelle Tätigkeiten sind ausdrücklich abgegrenzt.

[Die folgenden Unterabschnitte an das eingesetzte Verfahren anpassen. Nicht benötigte Schritte begründet zusammenfassen; Ansible und Vault nur bei tatsächlicher Verwendung übernehmen.]

#### 5.2.1 Installationsabläufe und Bausteine

Die Übersicht benennt den Einstiegspunkt und erklärt die Aufgaben eingebundener Abläufe.

| **Playbook / Installationsablauf** | **Collection / Paket** | **Rolle / Baustein** | **Aufgabe**             |
| ---------------------------------- | ---------------------- | -------------------- | ----------------------- |
| [Vollständige Referenz]            | [Name]                 | [Name]               | [Komponenten / Aufgabe] |

#### 5.2.2 Projektwerte und Ausführungsumgebung

Die Projektwerte und Werkzeuge bilden die Grundlage der Installation. Plattformbereitstellung und anwendungsspezifische Konfiguration werden den zuständigen Rollen zugeordnet.

| **Bereich**               | **Anforderung / Projektwert**                                   | **Bereitstellung / Stand**        |
| ------------------------- | --------------------------------------------------------------- | --------------------------------- |
| Plattform / Hostwerkzeuge | [Standard und benötigte Werkzeuge]                              | [Betriebsrolle / offen]           |
| Ausführungsumgebung       | [Controller, Runtime und gegebenenfalls EE samt Version/Digest] | [Betriebsrolle / offen]           |
| Automatisierungswerkzeuge | [Werkzeuge und benötigte Python-/Systemabhängigkeiten]          | [Builddefinition / Betriebsrolle] |
| Anwendungsabhängigkeiten  | [Collections / Pakete mit Requirements und Versionen]           | [Projektrolle / offen]            |
| Konten und Datenablage    | [Konten, Berechtigungen und Pfade]                              | [Rolle / offen]                   |
| Projektkonfiguration      | [Explizite Werte ohne Geheimnisse]                              | [Festgelegt / offen]              |

[Bei Ansible unterscheiden: Collection-Requirements beschreiben Collections; Python-/Systempakete gehören in die passende Host- oder EE-Bereitstellung. Keine zusätzliche Hostinstallation unterstellen, wenn das vereinbarte Modell Container verwendet.]

#### 5.2.3 Quellen bereitstellen

Die Quellen werden aus den vereinbarten Repositorys oder Paketablagen bezogen und anhand ihrer unveränderlichen Referenzen geprüft. Lokale Ablagen und ursprüngliche Bezeichnungen der Repositorys werden getrennt benannt.

[Arbeitsverzeichnis, vollständige Bezugsbefehle, Revisionen, Prüfsummen beziehungsweise Digests und benötigte Zugriffsrechte ergänzen. Vorbereitete oder unveröffentlichte Bezugswege ausdrücklich kennzeichnen. Keine bestehenden Arbeitsstände überschreiben.]

[Bei Ansible-Projekten gelten folgende neutrale lokale Ablagen als Ausgangspunkt, sofern keine abweichende Projektvorgabe besteht. Nur die tatsächlich verwendete Bezugsvariante in die ausgefüllte Dokumentation übernehmen.]

```text
/opt/automation/
├── artifacts/
│   ├── ansible-project.bundle
│   └── ansible-playbooks.bundle
├── ansible-project/
└── ansible-playbooks/
```

| **Lokale Ablage / Bereitstellung** | **Inhalt**                                                  | **Quellenbindung / Stand**                                                                            |
| ---------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `ansible-project`                  | Inventar, Projektwerte, Playbooks für Prüfungen und Wrapper | [Repository oder bereitgestelltes Bundle; vollständiger Commit; tatsächlicher Veröffentlichungsstand] |
| `ansible-playbooks`                | Allgemeine Playbooks und Ausführungshilfen                  | [Repository oder bereitgestelltes Bundle; vollständiger Commit]                                       |
| `artifacts/`                       | Geschützt bereitgestellte Quellenpakete, falls benötigt     | [Bundle-Dateien und gebundene Revisionen; keine Secret-Dateien]                                       |

[Bei Git-Bezug den lokalen Zielnamen im Clone-Aufruf ausdrücklich angeben. Benötigt die Anleitung noch unveröffentlichte Wrapper, einen tatsächlich bereitgestellten Quellenstand verwenden, beispielsweise ein Git-Bundle mit gebundener Revision. Ein älterer GitHub-Klon enthält diese Anpassungen nicht. Wrapper-Standardpfade, Nachbarverzeichnisse, Prüfpfade und Grafikbeschriftungen gemeinsam abgleichen; historische Quellenlinks und Rohprotokollpfade erhalten.]

#### 5.2.4 Arbeitsumgebung vorbereiten

Die Vorbereitung prüft das vorgesehene Installationskonto, benötigte Werkzeuge, Pfade und geschützte Eingabedateien. Anschließend werden die auszuführenden Instanzen eindeutig ausgewählt.

[Konkrete Befehle mit Variablen, Voraussetzungen und erwarteter Erfolgsmeldung ergänzen. Falls Variablen nur in derselben Shell gelten, darauf hinweisen und den Wiedereinstieg nach neuer Anmeldung beschreiben. Bei fehlenden Eingaben vor abhängigen Änderungen stoppen.]

#### 5.2.5 Installationskonfiguration bereitstellen

Inventar, technische Projektwerte und geschützte Zugangsdaten werden getrennt zugeordnet. Vorlagen werden vor der Ausführung mit den bestätigten Angaben vervollständigt.

| **Datei / Konfigurationsquelle** | **Inhalt**                                              | **Bereitstellung / Stand** |
| -------------------------------- | ------------------------------------------------------- | -------------------------- |
| [Inventar / Zielauswahl]         | [Instanzen, Verbindungen und Installationskonto]        | [Rolle / offen]            |
| [Projektwerte]                   | [Dienstnamen, Pfade und explizite technische Parameter] | [Rolle / offen]            |
| [Geschützte Geheimnisquelle]     | [Variablennamen oder Referenzen, keine Werte]           | [Rolle / offen]            |
| [Requirements]                   | [Abhängigkeiten, Versionen und Bezugsweg]               | [Rolle / offen]            |

[Konkrete Bereitstellungsbefehle ergänzen. Vorhandene Dateien erhalten; Ausgangsvorlagen und noch fehlende Projektwerte ausdrücklich benennen. Keine produktiven Werte durch Testwerte ersetzen.]

#### 5.2.6 Abhängigkeiten bereitstellen

Die benötigten Pakete oder Collections werden über den festgelegten Bezugsweg bereitgestellt. Ein lokaler Entwicklungskandidat ist von der freigegebenen Fassung zu unterscheiden.

[Installationsbefehle, Versionen, Requirements, Paketidentität und Erfolgskriterium ergänzen. Bei erforderlichem Build dessen Quelle, Ausführungsumgebung und Prüfsumme dokumentieren.]

[Bei lokal bereitgestellten Collection-Paketen den folgenden Nachweis ausfüllen. Kundennamen, konkrete Produktpakete, getestete Hashes und Freigaben werden erst im jeweiligen Projekt ergänzt.]

| **Paketangabe**                     | **Projektstand**                                                                                                       |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Datei / Version in den Metadaten    | [Tatsächlich bereitgestellter Dateiname und Version]                                                                   |
| Quelle                              | [Repository und vollständiger Quellcommit]                                                                             |
| Paketidentität                      | [SHA-256 des tatsächlich geprüften Archivs; Version in den Metadaten allein reicht nicht]                              |
| Build-Umgebung                      | [Belegtes Verfahren für den Build und unveränderliche Image-Referenz, soweit verwendet]                                |
| Bereitstellung auf den Zielsystemen | [Beispielsweise `ansible/.local/packages/` innerhalb von `ansible-project`; tatsächlicher Dateipfad]                   |
| Mount und Installation im EE        | [Schreibgeschützter Archivpfad im Container, neue Collection-Ablage und tatsächlicher Rollen-/Plugin-Ladepfad]         |
| Abhängigkeiten                      | [Festgelegte Requirements, Versionen und Online-/Offline-Bezugsweg]                                                    |
| Prüfergebnis und Veröffentlichung   | [Lokal gebaut / Paket frisch installiert und getestet / zentral veröffentlicht / aus Galaxy getestet; offene Schritte] |

[Vollständige Befehle für Prüfung der Prüfsumme, Abhängigkeiten und Paketinstallation ergänzen und tatsächlich ausführen. Bei einer abweichenden Prüfsumme stoppen. Beim Pakettest keinen Collection-Quellmount, Symlink oder Entwicklungs-Override verwenden und keine fremden Installationen löschen. `--no-deps` setzt die vollständige Bereitstellung der festgelegten Abhängigkeiten voraus. Hilfsskripte mit einem abweichenden Git-/Galaxy-Bezug nicht ungeprüft für den Paketweg verwenden. Ein erneuter Build benötigt eine Prüfung der neuen Archividentität.]

[Ein lokales Collection-Paket ist noch keine vollständige Offline-Bereitstellung: verbleibenden Netzbezug für weitere Collections, Images sowie Python-/Systempakete benennen. Eine Galaxy-Veröffentlichung und der Bezug daraus bleiben getrennte, erst nach tatsächlicher Ausführung bestätigte Schritte.]

#### 5.2.7 Geschützte Zugangsdaten prüfen

Die Prüfung bestätigt die Verfügbarkeit der benötigten Geheimnisse, ohne deren Werte auszugeben. Sie ersetzt keinen fachlichen Login- oder Verbindungstest.

[Prüfaufruf, Variablennamen, Vorhandensein, Verschlüsselungsstatus, Dateieigentümer, Zugriffsrechte und Prüfergebnis ohne Geheimniswerte dokumentieren. Bei Ansible Vault Dateiformat, Entschlüsselung und Vollständigkeit unterscheiden; Werte auch bei Fehlern verbergen. Bei anderen Verfahren das vereinbarte Prüfverfahren dokumentieren.]

#### 5.2.8 Zielauswahl und Syntax prüfen

Vor Änderungen werden die tatsächlich ausgewählten Instanzen und die Gültigkeit der Automatisierung geprüft.

[Vollständige Aufrufe und erwartete Zielauswahl ergänzen. Syntaxprüfung oder Check-Modus sind kein Nachweis eines erfolgreichen Rollouts. Leere beziehungsweise unbeschränkte Zielauswahl verhindern.]

#### 5.2.9 Installationsvoraussetzungen prüfen

Die Vorprüfung kontrolliert die bereitgestellten anwendungsrelevanten Voraussetzungen. Die Einrichtung der Plattform verbleibt bei den zuständigen Betriebsteams.

[Lesenden Prüfaufruf, geprüfte Voraussetzungen, Erfolgskriterium und Aussagegrenzen ergänzen. Fehlende Automatisierung als offen ausweisen. Beispielsweise ersetzt die Lesbarkeit eines Zertifikats weder Namens- noch Vertrauenskettentest.]

#### 5.2.10 Produktinstallation ausführen

Die Installation wird mit der bestätigten Konfiguration und eindeutiger Zielauswahl ausgeführt.

[Vollständigen Installationsaufruf samt Arbeitsverzeichnis, Zielauswahl, Variablenreferenzen und erwarteten Ergebnissen ergänzen. Bei Fehlern nicht zum nächsten abhängigen Schritt wechseln; Vorgehen gemäß 5.5.]

#### 5.2.11 Funktion und Wiederholbarkeit prüfen

Die Prüfung bestätigt die technische und fachliche Funktion. Ein unveränderter Wiederholungslauf prüft die Wiederholbarkeit der Automatisierung.

[Konkrete Funktions-, Negativ- und Wiederholungsprüfungen mit Befehlen und Erfolgskriterien ergänzen. Erwartete Änderungen erklären. Technische Abschlusskriterien und Nachweise mit Kapitel 11 und 13 verknüpfen; eine Wiederholung ist kein Daten-Rollback. Frische Collection-Installation, Erstaufbau mit leerem Anwendungsbestand und Weiterverwendung vorhandener Daten unterscheiden. Testumgebung, Plattform und tatsächlichen Rollen-/Plugin-Ladepfad zuordnen; Testresultate nicht als produktiven Ausführungsnachweis übernehmen.]

#### 5.2.12 Phasenbezogener Ausführungsplan

Der Ausführungsplan ordnet die Schritte den stabilen IHR-Phasen zu. Die technischen Phasen-IDs bleiben bei Übersetzungen unverändert. Dieselbe Phase kann mehrere dokumentierte Schritte umfassen; nicht beauftragte Tätigkeiten werden mit Begründung und Zuständigkeit als nicht anwendbar gekennzeichnet.

| **Phase ID**                 | **Zuordnung im Dokument**                                                              |
| ---------------------------- | -------------------------------------------------------------------------------------- |
| `initial-preflight`          | Arbeitsumgebung und anfängliche Voraussetzungen, 5.1 und 5.2.4                         |
| `artifact-staging`           | Quellen, Konfiguration und Abhängigkeiten, 5.2.3 bis 5.2.6                             |
| `host-preparation`           | Vereinbarte Plattformbereitstellung und anwendungsbezogene Vorbereitung, 5.1 und 5.2.2 |
| `complete-preflight`         | Geheimnis-, Ziel-, Syntax- und Installationsvorprüfung, 5.2.7 bis 5.2.9                |
| `tls-certificates`           | Zertifikatsbereitstellung und -prüfung, 5.2.5, 5.2.9 und 6.3                           |
| `product-installation`       | Produktinstallation, 5.2.10                                                            |
| `completion-verification`    | Funktions- und Abschlussprüfung, 5.2.11 und Kapitel 11                                 |
| `idempotency-verification`   | Unveränderte Wiederholung, 5.2.11                                                      |
| `evidence-handling`          | Ausführungsnachweise, 5.3 und 15.2                                                     |
| `safe-stop-restart-recovery` | Fehlerbehandlung und Wiederaufnahme, 5.5 und Kapitel 9                                 |

Für jede anwendbare Phase den folgenden Datensatz mit konkreten Angaben ausfüllen oder eindeutig auf die zugehörigen Angaben verweisen. Die Vorlage enthält keine freigegebenen Befehle oder tatsächlich ausgeführten Ergebnisse. Solange notwendige Angaben fehlen, bleibt der Stand vor `ready-for-installation`.

| **Feld / technischer Bezeichner**                  | **Geplanter Inhalt**                                             |
| -------------------------------------------------- | ---------------------------------------------------------------- |
| Phase ID                                           | [ID aus der obigen Tabelle]                                      |
| Zweck                                              | [Beabsichtigtes Ergebnis]                                        |
| Operationstyp                                      | [Lesend / konfigurationsändernd / weiterer begründeter Typ]      |
| Ausführende Rolle                                  | [Rolle gemäß 1.3]                                                |
| Arbeitsverzeichnis (Working directory)             | [Konkreter Pfad]                                                 |
| Quellen und Artefakte                              | [Unveränderliche Referenzen gemäß 5.2.3 und 5.2.6]               |
| Inventar (Inventory)                               | [Geschützte Referenz und Zielauswahl]                            |
| Ausführungsumgebung (Execution environment)        | [Version und vollständiger Digest / begründet nicht anwendbar]   |
| Voraussetzungen und Guards                         | [Geprüfte Eingaben, Berechtigungen und Abbruchbedingungen]       |
| Vorschau (Check command)                           | [Getesteter Aufruf / begründet nicht anwendbar]                  |
| Ausführung (Real-run command)                      | [Vollständiger Aufruf / begründet nicht anwendbar]               |
| Wiederholungsprüfung (Idempotency command)         | [Vollständiger Aufruf / begründet nicht anwendbar]               |
| Verifikation (Verification commands)               | [Befehle und fachliche Erfolgskriterien]                         |
| Erwarteter Marker / Recap                          | [Tatsächlich implementierter Marker und erwartete Ergebnisse]    |
| Sicherer Halt (Safe stop)                          | [Vor dem nächsten abhängigen Änderungsschritt anhalten, wenn …]  |
| Wiederaufnahme (Restart)                           | [Korrektur, erneut erforderliche Vorprüfungen und Einstieg]      |
| Rückfall / Wiederherstellung (Rollback / recovery) | [Voraussetzung, Zuständigkeit und Verfahren gemäß Kapitel 9]     |
| Geplante Nachweise (Planned evidence)              | [Geschützter Ablageort, Klassifikation und benötigte Ergebnisse] |

### 5.3 Ausführungsprotokoll

Das Ausführungsprotokoll hält tatsächlich durchgeführte Arbeiten und Ergebnisse fest. Je Schritt werden Zeitpunkt, verantwortliche Rolle, betroffenes System und Ergebnis dokumentiert; zugehörige Nachweise werden verlinkt. Abweichungen werden in Kapitel 12 nachverfolgt.

#### 5.3.1 Tatsächlicher Aufbau

Nach der Installation werden die beobachteten Versionen, Topologie, Ressourcen, Pfade und wesentlichen Einstellungen erfasst. Geplante Werte werden nicht ungeprüft als Iststand übernommen.

| **Bereich**                  | **Geplanter Wert / Referenz** | **Beobachteter Istwert** | **Nachweis / Abweichung**              |
| ---------------------------- | ----------------------------- | ------------------------ | -------------------------------------- |
| [Komponente / Konfiguration] | [Referenz]                    | Noch nicht erhoben       | [Nachweis oder stabile Abweichungs-ID] |

#### 5.3.2 Tatsächliche Ausführung

Jeder Lauf wird mit seinen tatsächlich verwendeten Eingaben, Befehlen und Ergebnissen dokumentiert. Unterschiede zum Ausführungsplan erhalten eine stabile Abweichungsreferenz in Kapitel 12.

| **Feld**                                | **Tatsächlicher Inhalt**                                                       |
| --------------------------------------- | ------------------------------------------------------------------------------ |
| Lauf-ID / Phase ID                      | [Bei Ausführung ergänzen]                                                      |
| Beginn / Ende / Zeitzone                | [Zeitpunkte]                                                                   |
| Zielsysteme / auszuführende Instanz     | [Referenz]                                                                     |
| Ausführende Rolle                       | [Rolle gemäß 1.3]                                                              |
| Automation / Collection / Pakete        | [Tatsächliche vollständige Revisionen und Prüfsummen]                          |
| Execution Environment                   | [Tatsächlich aufgelöster vollständiger Digest / nicht anwendbar]               |
| Inventar / Konfigurationsstand          | [Geschützte unveränderliche Referenz]                                          |
| Ausgeführter Befehl                     | [Tatsächlicher Aufruf ohne Geheimniswerte]                                     |
| Ergebnis / Recap                        | Noch nicht ausgeführt                                                          |
| Funktionsprüfung / Wiederholungsprüfung | [Ergebnis und Nachweis]                                                        |
| Nachweisablage / Abweichung             | [Geschützte Referenz / stabile Abweichungs-ID / keine Abweichung festgestellt] |

### 5.4 Migration und Übernahme

[Sofern erforderlich: Umfang, Verfahren, Testumgebung, Umschaltung und Rückfall festhalten; andernfalls begründet als nicht anwendbar kennzeichnen.]

### 5.5 Fehlerbehandlung und Wiederaufnahme

Nach einem Fehler wird die Ursache eingegrenzt, bevor abhängige Schritte fortgesetzt werden. Wiederholung und Wiederherstellung haben unterschiedliche Zwecke.

#### 5.5.1 Fehler eingrenzen

Betroffene Instanzen, Schritt und bereinigtes Fehlerbild werden im Ausführungsprotokoll festgehalten; offene Maßnahmen werden in Kapitel 12 nachverfolgt.

| **Fehlerbereich**                              | **Korrektur / zuständige Rolle** | **Erneute Prüfung** |
| ---------------------------------------------- | -------------------------------- | ------------------- |
| [Plattform / Zugang / Konfiguration / Produkt] | [Vorgehen und Rolle]             | [Prüfschritt]       |

#### 5.5.2 Ablauf wiederaufnehmen

Nach neuer Anmeldung wird die Arbeitsumgebung erneut vorbereitet. Nach Korrekturen werden die betroffenen Vorprüfungen und der dokumentierte vollständige Installationsaufruf wiederholt.

[Konkrete Wiederaufnahmebefehle und anschließend erforderliche Prüfungen ergänzen. Keine ungetestete Teilbereinigung oder automatische Neuerzeugung bestehender Zugangsdaten als Standardweg vorgeben.]

#### 5.5.3 Wiederherstellung abgrenzen

Eine erneute Ausführung setzt nicht automatisch bereits veränderte Daten oder Datenbankschemata zurück. Eine benötigte Wiederherstellung folgt Kapitel 9 und dem abgestimmten Rückfallverfahren.

[Grenzen und Zuständigkeiten konkretisieren. Keine Löschung persistenter Daten, Deinstallation oder Neuinstallation ohne tatsächlichen Bedarf und eigenen Auftrag als Fehlerbehebung einführen.]

## 6. Kommunikation und Verschlüsselung

Die Kommunikationswege bilden die Grundlage für Netzwerkfreigaben und die sichere Verbindung der Systeme.

### 6.1 Verbindungsmatrix

Die Matrix dokumentiert Produkt- und Topologie-Netzwerkflüsse und unterscheidet externe Freigaben von internen Verbindungen. Jede Verbindung erhält eine initiierende Quelle und Richtung. Monitoringpfade werden vom zuständigen Betriebsteam vorgegeben.

| **ID**   | **Quelle** | **Ziel** | **Protokoll / Zielport** | **Richtung / Zweck**              | **Zuständigkeit** | **Status / Referenz** |
| -------- | ---------- | -------- | ------------------------ | --------------------------------- | ----------------- | --------------------- |
| FLOW-001 | [Quelle]   | [Ziel]   | [Protokoll / Port]       | [Initiierende Richtung und Zweck] | [Rolle]           | Offen                 |

### 6.2 Kommunikationsübersicht

[Separate Draw.io-Kommunikationsgrafik mit Verbindungsrichtungen und FLOW-IDs erstellen, Export einbinden und Quelle verlinken.]

### 6.3 TLS und Zertifikate

[TLS-Endpunkte, Terminierung, Vertrauenskette, Dienstnamen und Zuständigkeit für Erneuerung festhalten. Interne Verschlüsselung aus dem konkreten Sicherheitsbedarf ableiten.]

### 6.4 Proxyzugriff und Freischaltungen

[Bei benötigtem Proxy: Firewallpfad zum Proxy in 6.1 erfassen; hier konkrete, geprüfte Domains für den ausgewählten Artefaktbezug dokumentieren. Andernfalls nicht anwendbar kennzeichnen.]

| **URL / Zieldomain** | **Verwendung** | **Port** | **Status** |
| -------------------- | -------------- | -------- | ---------- |
| [Bestätigtes Ziel]   | [Zweck]        | [Port]   | Offen      |

## 7. Identitäten und Sicherheit

Die Zugriffsregelungen ordnen Anmeldeverfahren, Konten und Berechtigungen zu und ermöglichen einen kontrollierten Betrieb.

### 7.1 Anmeldung und Berechtigungen

Die Übersicht ordnet den Zugriffsbereichen ihre Anmeldeverfahren und benötigten Rechte zu.

| **Bereich** | **Anmeldeverfahren** | **Berechtigungen** | **Noch festzulegen** |
| ----------- | -------------------- | ------------------ | -------------------- |
| [Bereich]   | [Identitätsquelle]   | [Rollen]           | [Punkte]             |

### 7.2 Konten und Zuständigkeiten

Die Konten erhalten nur die benötigten Rechte. Geheimnisse werden über den geschützten Bereitstellungsweg verwaltet.

| **Konto / Bereich** | **Zweck** | **Zuständigkeit / Stand** |
| ------------------- | --------- | ------------------------- |
| [Konto]             | [Aufgabe] | [Rolle / offen]           |

### 7.3 Administrativer Notfallzugang

[Bedarf, unabhängigen Zugang, Verwahrung und Funktionstest festlegen; keine produktspezifische Kontenart voraussetzen.]

## 8. Observability

Monitoring und Logging machen den Zustand der Lösung und mögliche Störungen nachvollziehbar. Die Anbindung erfolgt an die vorhandenen beziehungsweise vereinbarten Systeme zur Überwachung und Logauswertung.

### 8.1 Monitoring

Die Prüfpunkte werden getrennt je Anwendungskomponente festgelegt. Das Monitoring-Betriebsteam bestimmt Prüfwege und Bewertung.

| **Komponente** | **Prüfpunkte**                        | **Bereitstellung / Stand** |
| -------------- | ------------------------------------- | -------------------------- |
| [Komponente]   | [Erreichbarkeit / Zustand / Metriken] | [Offen]                    |

### 8.2 Logging

Die Ereignisse unterstützen Fehleranalyse und Nachvollziehbarkeit. Zentrale Weiterleitung erfolgt im vereinbarten Umfang.

| **Komponente** | **Ereignisse / Logquelle**                      | **Ziel / Transport**                | **Zugriff / Aufbewahrung** |
| -------------- | ----------------------------------------------- | ----------------------------------- | -------------------------- |
| [Komponente]   | [Zugriff / Anmeldung / Administration / Fehler] | [Lokale Ablage / Logserver / offen] | [Festzulegen]              |

### 8.3 Alarmierung und Prüfung

[Empfänger, Betriebszeiten, Reaktionswege sowie Prüfung der Alarmzustellung und Logweiterleitung festhalten. Hostüberwachung nach bestehendem Standard referenzieren.]

## 9. Datensicherung und Wiederherstellung

Die Sicherung schützt die erforderlichen Daten. Die Wiederherstellung führt sie mit der benötigten Konfiguration zu einem funktionsfähigen Dienst zusammen.

### 9.1 Datensicherung

Der Sicherungsumfang richtet sich nach den tatsächlich gespeicherten Daten und dem vereinbarten Wiederaufbauverfahren.

| **Gegenstand** | **Verfahren / Umfang** | **Zuständigkeit** | **Offene Festlegungen**           |
| -------------- | ---------------------- | ----------------- | --------------------------------- |
| [Datenbestand] | [Verfahren]            | [Rolle]           | [Pfad / Kapazität / Aufbewahrung] |

[Grenzen der Wiederherstellung ausdrücklich nennen, beispielsweise komplette Datenbank statt einzelner Realms. CaC und Geheimnisbereitstellung nur bei tatsächlicher Verfügbarkeit als Wiederaufbauquelle nennen; manuell erzeugte Konfiguration berücksichtigen.]

### 9.2 Sicherungszeitplan

Die Intervalle werden anhand des zulässigen Datenverlusts und der bestehenden Backupvorgaben festgelegt. Vorschläge als solche kennzeichnen.

| **Sicherung** | **Intervall / Anlass** | **Zuständigkeit** | **Status** |
| ------------- | ---------------------- | ----------------- | ---------- |
| [Sicherung]   | [Zu vereinbaren]       | [Rolle]           | Offen      |

### 9.3 Wiederherstellung

Die Wiederherstellung wird mit Ziel, Ablauf und erwarteter Wiederanlaufzeit beschrieben.

| **Gegenstand**   | **Wiederherstellung / Prüfung**  | **Zuständigkeit** |
| ---------------- | -------------------------------- | ----------------- |
| [Daten / System] | [Verfahren und Funktionsprüfung] | [Rolle]           |

### 9.4 Wiederherstellungstests

Tests prüfen die Nutzbarkeit der Sicherungen vor Übergabe und regelmäßig im Betrieb.

| **Test**             | **Zeitpunkt / Intervall**              | **Zuständigkeit** | **Nachweis**                  |
| -------------------- | -------------------------------------- | ----------------- | ----------------------------- |
| Erstprüfung          | Vor Betriebsübergabe                   | [Rolle]           | [Funktionsnachweis]           |
| Regelmäßiger Test    | [Zu vereinbaren]                       | [Rolle]           | [Ergebnis / Wiederanlaufzeit] |
| Anlassbezogener Test | Nach wesentlichen Verfahrensänderungen | [Rolle]           | [Ergebnis]                    |

## 10. Wartung und Betrieb

Die Betriebsanforderungen benennen die wiederkehrenden Aufgaben und Übergabepunkte. Detaillierte Anweisungen werden in bestehenden Betriebsunterlagen gepflegt.

### 10.1 Betriebsaufgaben und Zuständigkeiten

Die Übersicht hält die wiederkehrenden Aufgaben und ihre Zuordnung fest.

| **Thema**        | **Im Projekt festzulegen / zu übergeben** | **Zuständigkeit / Stand** |
| ---------------- | ----------------------------------------- | ------------------------- |
| Dienstverwaltung | [Start / Stopp / Wiederanlauf]            | [Rolle / offen]           |
| Updates          | [Verfahren, Wartungsfenster und Rückfall] | [Rolle / offen]           |
| Zertifikate      | [Überwachung / Erneuerung]                | [Rolle / offen]           |
| Störung          | [Diagnose und Eskalation]                 | [Rolle / offen]           |

## 11. Prüfung und Qualitätssicherung

Die Prüfungen zeigen, ob die Lösung die vereinbarten Anforderungen erfüllt. Ergebnisse bilden die Grundlage für Übergabe und Abschluss.

### 11.1 Systemprüfung

[Anwendungsrelevante Voraussetzungen je Zielsystem bestätigen; bestehende Plattformbereitstellung nicht als neues OS-Projekt behandeln.]

### 11.2 Produktprüfplan

Prüfungen erhalten konkrete Erfolgskriterien und nach Ausführung einen Ergebnisnachweis.

| **ID**   | **Prüfung** | **Erwartetes Ergebnis**  | **Status / Nachweis** |
| -------- | ----------- | ------------------------ | --------------------- |
| TEST-001 | [Prüffall]  | [Nachprüfbares Ergebnis] | Nicht ausgeführt      |

## 12. Projektstatus

Der Projektstatus bündelt Umsetzungsstand und offene Aufgaben.

### 12.1 Umsetzungsstand

Die Übersicht hält die nächsten Schritte je Projektbereich fest.

| **Bereich** | **Status**       | **Nächster Schritt** |
| ----------- | ---------------- | -------------------- |
| [Bereich]   | [Belegter Stand] | [Schritt]            |

### 12.2 Offene Punkte

Offene Entscheidungen und Abweichungen werden mit Auswirkungen und Zuständigkeiten nachverfolgt.

| **ID**   | **Typ / Sachverhalt**                                     | **Auswirkung / nächster Schritt** | **Zuständigkeit** | **Benötigt bis** | **Entscheidung / Nachweis** |
| -------- | --------------------------------------------------------- | --------------------------------- | ----------------- | ---------------- | --------------------------- |
| OPEN-001 | [Offener Punkt / Abweichung / nicht beauftragte Leistung] | [Auswirkung und Schritt]          | [Rolle]           | [Zeitpunkt]      | [Referenz / offen]          |

## 13. Betriebsübergabe

Die Betriebsübergabe umfasst die technische Dokumentation und eine Einweisung der zuständigen Betriebsteams. Dabei werden Aufbau, Betriebsabläufe und Verfahren für Wartung, Überwachung, Datensicherung und Störungsbehebung erläutert. Sie schließt die Übernahme der vereinbarten Aufgaben und Zuständigkeiten ein.

### 13.1 Übergabeumfang und Nachweise

Die Übergabe wird mit den benannten Betriebsverantwortlichen durchgeführt und dokumentiert.

| **Übergabegegenstand**        | **Ergebnis**                                         | **Zuständigkeit** | **Geschützter Ablageort / Version** | **Stand / Übernahmenachweis** |
| ----------------------------- | ---------------------------------------------------- | ----------------- | ----------------------------------- | ----------------------------- |
| Technische Dokumentation      | Tatsächlicher Aufbau und Konfiguration               | [Rolle]           | [Referenz / Integritätsnachweis]    | Offen                         |
| Betriebsverfahren und Zugänge | Zuständigkeiten, geschützte Zugänge, Betriebsabläufe | [Rolle]           | [Referenz / Version]                | Offen                         |
| Einweisung und Restpunkte     | Einweisung und bestätigte Restpunktliste             | [Rolle]           | [Referenz / Version]                | Offen                         |

### 13.2 Zugänge und Administration

Die administrativen Zugänge und das geschützte Abrufverfahren für Zugangsdaten werden zentral gepflegt. Kapitel 5 verweist auf diese Übersicht; persönliche Kontaktdaten verbleiben in Abschnitt 1.3.

| **Angabe**                                        | **[Instanz / Bereich]**                                 | **Stand** |
| ------------------------------------------------- | ------------------------------------------------------- | --------- |
| Administrationsendpunkte                          | [Name / Adresse / Port]                                 | Offen     |
| Installations- und Administrationskonten / Rollen | [Referenzen]                                            | Offen     |
| Anmeldeverfahren / Hostidentität                  | [Verfahren und geprüfte Referenz]                       | Offen     |
| Geschützte Geheimnisquelle                        | [Datei / Variablenreferenz / Abrufverfahren ohne Werte] | Offen     |
| Zuständige Betriebsrolle                          | [Zuordnung gemäß 1.3]                                   | Offen     |

[Konkrete Zugriffs- und Abrufbefehle erst mit bestätigten Angaben ergänzen. Geheimnisse, private Schlüssel und ausgegebene Tokens nicht speichern. Zugangsprüfung und tatsächliche Übergabe getrennt nachweisen; lokale Testzugänge separat dokumentieren.]

## 14. Abschluss und Abnahme

Der Projektabschluss stellt Umfang, Umsetzung und Prüfergebnisse gegenüber. Verbleibende Aufgaben werden mit Zuständigkeiten festgehalten.

### 14.1 Abnahmestand

Eine Abschlussentscheidung benennt Datum, zuständige Rolle, Ergebnis und Referenz. Inhaltliche Dokumentbestätigung ist keine technische Projektabnahme.

| **Datum**                   | **Rolle** | **Entscheidung**   | **Restpunkte / Referenz** |
| --------------------------- | --------- | ------------------ | ------------------------- |
| [Bei Entscheidung ergänzen] | [Rolle]   | Noch keine Abnahme | [Referenz]                |

## 15. Referenzen und Änderungshistorie

Die Referenzen führen zu den Projektunterlagen und Nachweisen. Die Änderungshistorie dokumentiert die wesentlichen Fassungen für die Weitergabe und Abstimmung.

### 15.1 Projektunterlagen

Die technischen Festlegungen und Ausführungsstände werden an den jeweiligen Stellen gepflegt.

| **Unterlage**                   | **Inhalt / Verweis**                                                                 |
| ------------------------------- | ------------------------------------------------------------------------------------ |
| Installationsgrundlage          | Quellen, Paketstände, Prüfsummen und Befehle in Kapitel 5.2                          |
| Architektur und Kommunikation   | Grafiken mit bearbeitbaren Quellen in Kapitel 2.1 und 6.2                            |
| Bestands- und Planungsgrundlage | [Benötigte Unterlagen und deren Ablageverweis; nicht zutreffende Einträge entfernen] |

### 15.2 Nachweise

Ausgeführte Arbeiten und Prüfungen werden je Zielsystem mit Datum, zuständiger Rolle und Ergebnis in Kapitel 5.3 und 11 dokumentiert. Zugehörige Protokolle liegen in [geschützte Projektablage / Zugriff durch zuständige Rollen]. Geheimnisse und personenbezogene Rohlogs werden nicht in die Dokumentation übernommen.

[Den tatsächlichen Prüfstand knapp benennen und Testumgebung von produktiver Ausführung unterscheiden. Für ergänzende technische Nachweise Ablageverweis, Klassifikation, Integrität, zuständige Rolle sowie vereinbarte Aufbewahrung und Löschung angeben oder auf die bestehende Regelung verweisen. Offene Festlegungen kennzeichnen.]

### 15.3 Änderungshistorie

Die bisherigen Arbeitsversionen sind zum ersten Entwurf für die Weitergabe zusammengefasst. Künftig werden nur wesentliche Änderungen an weitergegebenen Fassungen aufgenommen; neue Versionsnummern allein bedeuten keine Freigabe.

| **Version**                | **Datum** | **Änderung**                                                                                                                                                                             |
| -------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Aktuelle Entwurfsversion] | [Datum]   | Initialer Entwurf für die Projektabstimmung: Projektauftrag, Architektur, Voraussetzungen, Umsetzung, Prüfung und Übergabe. [Vorhandene Arbeitsfassungen bei Bedarf als Bereich nennen.] |
