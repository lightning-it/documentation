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

## 0.1 Inhaltsverzeichnis

Das Inhaltsverzeichnis führt zu den Projektangaben und technischen Kapiteln.

<details>
<summary>Inhaltsverzeichnis anzeigen</summary>

- [01 Allgemeine Informationen](#01-allgemeine-informationen)
- [02 Architektur](#02-architektur)
- [03 Voraussetzungen](#03-voraussetzungen)
- [04 Realisierungsplanung](#04-realisierungsplanung)
- [05 Installation und Konfiguration](#05-installation-und-konfiguration)
- [06 Kommunikation und Verschlüsselung](#06-kommunikation-und-verschlüsselung)
- [07 Identitäten und Sicherheit](#07-identitäten-und-sicherheit)
- [08 Observability](#08-observability)
- [09 Datensicherung und Wiederherstellung](#09-datensicherung-und-wiederherstellung)
- [10 Wartung und Betrieb](#10-wartung-und-betrieb)
- [11 Prüfung und Qualitätssicherung](#11-prüfung-und-qualitätssicherung)
- [12 Projektstatus](#12-projektstatus)
- [13 Betriebsübergabe](#13-betriebsübergabe)
- [14 Abschluss und Abnahme](#14-abschluss-und-abnahme)
- [15 Referenzen und Änderungshistorie](#15-referenzen-und-änderungshistorie)

</details>

## 01 Allgemeine Informationen

Die allgemeinen Informationen ordnen Auftrag, Zuständigkeiten und Dokumentstand ein. Sie bilden die gemeinsame Grundlage für Vorbereitung, Umsetzung und Übergabe.

### 1.1 Zweck und Verwendung

Diese Projektdokumentation beschreibt Anforderungen, technische Umsetzung und Ergebnisse des Projekts. Sie wird während der Durchführung um Konfiguration, Prüfergebnisse und offene Punkte ergänzt.

| **Dokumentinformation** | **Angabe**                                                                                                       |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Dokument-ID             | [Stabile Kennung]                                                                                                |
| Dokumentversion         | 0.1                                                                                                              |
| Stand                   | [Datum]                                                                                                          |
| Sprache                 | Dokumentensprache und Ausgangssprache: Deutsch (de-DE); Übersetzungsstatus: Originalfassung                      |
| Klassifikation          | [Vereinbarte Klassifikation]                                                                                     |
| Geltungsbereich         | [Lösung und Zielumgebung]                                                                                        |
| Technische Bezeichner   | Befehle, Pfade, Variablen, API-Felder, Regel- und Phasen-IDs unverändert übernehmen                              |
| Dokumentverantwortung   | René Cañas; Kontakt gemäß [1.3](#13-ansprechpartner)                                                             |
| Prüfung und Freigabe    | [Zuständige Rolle gemäß [1.3](#13-ansprechpartner)]                                                              |
| Freigabenachweis        | Ausstehend; Entscheidung und Referenz gemäß [1.4](#14-dokumentstatus-und-freigabe) und [14.1](#141-abnahmestand) |
| Reviewdatum / Auslöser  | [Datum / relevante Änderungen]                                                                                   |

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

| **Aktuelle Version** | **Status** | **Entscheidung / Referenz** |
| -------------------- | ---------- | --------------------------- |
| 0.1                  | Entwurf    | Noch keine Freigabe         |

### 1.5 Versionierung

Die Dokument-ID bleibt unverändert. Die Version kennzeichnet den inhaltlichen Stand; wesentliche Änderungen stehen in [Kapitel 15.3](#153-änderungshistorie). Vor der ersten Freigabe werden 0.x-Fassungen geführt, die erste freigegebene Ausgabe erhält 1.0. Hauptversionen kennzeichnen wesentliche Überarbeitungen, Nebenversionen fachliche Ergänzungen und Revisionen redaktionelle Korrekturen. Verbindliche Vorgaben der Organisation haben Vorrang.

## 02 Architektur

Die Architektur beschreibt das Zusammenspiel der Komponenten und ihre Abhängigkeiten. Sie bildet die Grundlage für die technische Umsetzung, erforderliche Kommunikationswege und die Zuordnung von Betriebsaufgaben.

### 2.1 Lösungsaufbau

[Aufbau, Instanzen und Beziehungen erklären. Draw.io-Quelle und daraus exportierte Grafik erstellen; Export hier mit relativem Pfad einbinden und Quelle verlinken. Keine fremden Kundendiagramme übernehmen.]

### 2.2 Komponenten und Betriebsanbindungen

Die Übersicht ordnet den Komponenten ihre Aufgaben und ihren Leistungsumfang zu.

| **Komponente** | **Aufgabe** | **Bereitstellung / Zuständigkeit** |
| -------------- | ----------- | ---------------------------------- |
| [Komponente]   | [Aufgabe]   | [Rolle]                            |

#### 2.2.1 Technische Festlegungen

[Übergreifende Betriebs- und Konfigurationsentscheidungen getrennt von der Übersicht der Komponenten erläutern; Detailwerte in [Kapitel 05](#05-installation-und-konfiguration) pflegen.]

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

## 03 Voraussetzungen

Die Voraussetzungen benennen die erforderlichen Bereitstellungen und Mitwirkungen. Zuständigkeiten und Prüfkriterien machen nachvollziehbar, wann die jeweiligen Umsetzungsschritte beginnen können.

### 3.1 Bereitstellungen

Die Anforderungen bilden die Arbeitsliste für die Vorbereitung. Die Standardbereitstellung der Plattform erfolgt durch das zuständige Betriebsteam.

| **ID**  | **Bereitzustellen / Soll**                       | **Zuständigkeit** | **Benötigt bis** | **Status** | **Nachweis** | **Kommentar**    |
| ------- | ------------------------------------------------ | ----------------- | ---------------- | ---------- | ------------ | ---------------- |
| REQ-001 | [Anzahl und Ausstattung der Zielsysteme]         | [Rolle]           | [Zeitpunkt]      | Offen      | [Referenz]   | [Klärungsbedarf] |
| REQ-002 | [Benötigte Zugänge / Dienstkonten]               | [Rolle]           | [Zeitpunkt]      | Offen      | [Referenz]   | [Klärungsbedarf] |
| REQ-003 | [Dienstnamen, Zertifikate und Netzwerkfreigaben] | [Rolle]           | [Zeitpunkt]      | Offen      | [Referenz]   | [Klärungsbedarf] |

[Projektbezogene Anforderungen ergänzen; keine bereits erfüllten Voraussetzungen ohne Bestätigung behaupten.]

### 3.2 Anforderungsdetails und Startvoraussetzungen

Die Details machen Mindestanforderungen, vereinbarte Ausprägung und bestätigten Iststand vergleichbar. Eine offene Anforderung blockiert nur die davon abhängigen Arbeiten. Ausnahmen benötigen eine zuständige Entscheidung mit nachvollziehbarer Auswirkung.

| **Anforderung**  | **Kategorie** | **Mindestwert**                           | **Vereinbarter Sollwert** | **Bestätigter Istwert** | **Blockierwirkung**  | **Quelle**                 | **Nachweis / Ausnahme** |
| ---------------- | ------------- | ----------------------------------------- | ------------------------- | ----------------------- | -------------------- | -------------------------- | ----------------------- |
| [REQ-ID aus 3.1] | [Bereich]     | [Mindestwert / begründet nicht anwendbar] | Offen                     | Noch nicht geprüft      | [Abhängiger Schritt] | [Versionsgebundene Quelle] | Offen                   |

Vor dem Umsetzungsstart werden die relevanten Voraussetzungen und eine erforderliche Ausführungsfreigabe im Meilenstein M1 mit zuständiger Rolle und Entscheidungsreferenz nachgewiesen. Eine Vorlage oder inhaltliche Dokumentbestätigung erteilt keine technische Ausführungsfreigabe.

### 3.3 Plattformbaseline

Die Plattform-Grundanforderungen werden getrennt von den Produkt- und Topologie-Netzwerkflüssen in [Kapitel 6](#06-kommunikation-und-verschlüsselung) geprüft. Die Betriebssystembereitstellung bleibt beim zuständigen Betriebsteam.

| **Bereich**                | **Anforderung**                                                | **Zuständigkeit** | **Prüfung**                     | **Status** | **Nachweis** | **Kommentar**                                    |
| -------------------------- | -------------------------------------------------------------- | ----------------- | ------------------------------- | ---------- | ------------ | ------------------------------------------------ |
| Namensauflösung            | [Benötigte Namen]                                              | [Rolle]           | [Auflösungsprüfung]             | Offen      | [Referenz]   | [Vorgabe]                                        |
| Zeitsynchronisation        | [Zulässiger Zeitdienst]                                        | [Rolle]           | [Synchronisierungsstatus]       | Offen      | [Referenz]   | [Vorgabe]                                        |
| Paket- und Artefaktquellen | [Freigegebene Bezugswege]                                      | [Rolle]           | [Erreichbarkeit / Berechtigung] | Offen      | [Referenz]   | [Vorgabe]                                        |
| Proxy                      | [Bei Bedarf gemäß 6.4](#64-internetzugang-und-freischaltungen) | [Rolle]           | [Zielspezifische Prüfung]       | Offen      | [Referenz]   | [Bei fehlendem Bedarf begründet nicht anwendbar] |
| Vertrauenskette            | [Benötigte Zertifizierungsstellen]                             | [Rolle]           | [TLS-Verifikation]              | Offen      | [Referenz]   | [Vorgabe]                                        |
| Basisnetz                  | [Routing und Plattformkonnektivität]                           | [Rolle]           | [Vorprüfung]                    | Offen      | [Referenz]   | [Vorgabe]                                        |

## 04 Realisierungsplanung

Die Realisierungsplanung gliedert die Umsetzung in nachvollziehbare Meilensteine. Ergebnisse, Zuständigkeiten und Termine ermöglichen die Abstimmung von Abhängigkeiten und Fortschritt.

### 4.1 Meilensteine

Jeder Meilenstein beschreibt ein nachprüfbares Ergebnis. Termine und Referenzen werden nach Vereinbarung ergänzt.

| **Nr.** | **Meilenstein**        | **Erreicht, wenn**                                                                                                                      | **Zuständigkeit** | **Zieltermin** | **Status** | **Kommentar** | **Referenz**     |
| ------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | -------------- | ---------- | ------------- | ---------------- |
| M1      | Umsetzung vorbereitet  | Benötigte Voraussetzungen erfüllt oder dokumentiert ausgenommen, technische Planung abgestimmt und erforderliche Ausführung autorisiert | [Rolle]           | Offen          | Offen      | —             | [Vorgang / Link] |
| M2      | Lösung eingerichtet    | Vereinbarte Komponenten und Integrationen eingerichtet                                                                                  | [Rolle]           | Offen          | Offen      | —             | [Vorgang / Link] |
| M3      | Prüfung abgeschlossen  | Vereinbarte Prüfkriterien nachweislich erfüllt                                                                                          | [Rolle]           | Offen          | Offen      | —             | [Vorgang / Link] |
| M4      | Übergabe und Abschluss | Betriebsaufgaben übernommen und Abschlussentscheidung dokumentiert                                                                      | [Rolle]           | Offen          | Offen      | —             | [Vorgang / Link] |

## 05 Installation und Konfiguration

Die Installations- und Konfigurationsbeschreibung hält fest, wie eine Lösung eingerichtet wird und welche Einstellungen dafür erforderlich sind. Sie ermöglicht eine nachvollziehbare Umsetzung und bildet die Grundlage für spätere Prüfungen und Änderungen.

### 5.1 Systemvorbereitung

Die zuständigen Betriebsteams stellen [Plattform und Ausführungswerkzeuge] nach dem bestehenden Standard bereit. Die anwendungsbezogenen Voraussetzungen und Zuständigkeiten sind in [Abschnitt 5.2.2](#522-projektwerte-und-ausführungsumgebung) zusammengefasst.

[Ausführungsort der Automatisierung, Installationskonto und dauerhaftes Anwendungskonto unterscheiden. Ein gemeinsamer Controller-/Anwendungshost ist eine Projektentscheidung.]

Die administrativen Zugänge und das geschützte Abrufverfahren für Zugangsdaten sind in [Abschnitt 13.2](#132-zugänge-und-administration) beschrieben. Geheimnisse und private Schlüssel werden nicht in der Dokumentation gespeichert.

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

[Vollständigen Installationsaufruf samt Arbeitsverzeichnis, Zielauswahl, Variablenreferenzen und erwarteten Ergebnissen ergänzen. Bei Fehlern nicht zum nächsten abhängigen Schritt wechseln; Vorgehen gemäß [5.5](#55-fehlerbehandlung-und-wiederaufnahme).]

#### 5.2.11 Funktion und Wiederholbarkeit prüfen

Die Prüfung bestätigt die technische und fachliche Funktion. Ein unveränderter Wiederholungslauf prüft die Wiederholbarkeit der Automatisierung.

[Konkrete Funktions-, Negativ- und Wiederholungsprüfungen mit Befehlen und Erfolgskriterien ergänzen. Erwartete Änderungen erklären. Technische Abschlusskriterien und Nachweise mit [Kapitel 11](#11-prüfung-und-qualitätssicherung) und [Kapitel 13](#13-betriebsübergabe) verknüpfen; eine Wiederholung ist kein Daten-Rollback. Frische Collection-Installation, Erstaufbau mit leerem Anwendungsbestand und Weiterverwendung vorhandener Daten unterscheiden. Testumgebung, Plattform und tatsächlichen Rollen-/Plugin-Ladepfad zuordnen; Testresultate nicht als produktiven Ausführungsnachweis übernehmen.]

#### 5.2.12 Phasenbezogener Ausführungsplan

Der Ausführungsplan ordnet die Schritte den stabilen IHR-Phasen zu. Die technischen Phasen-IDs bleiben bei Übersetzungen unverändert. Dieselbe Phase kann mehrere dokumentierte Schritte umfassen; nicht beauftragte Tätigkeiten werden mit Begründung und Zuständigkeit als nicht anwendbar gekennzeichnet.

| **Phase ID**                 | **Zuordnung im Dokument**                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------------------------- |
| `initial-preflight`          | Arbeitsumgebung und anfängliche Voraussetzungen, 5.1 und 5.2.4                                     |
| `artifact-staging`           | Quellen, Konfiguration und Abhängigkeiten, 5.2.3 bis 5.2.6                                         |
| `host-preparation`           | Vereinbarte Plattformbereitstellung und anwendungsbezogene Vorbereitung, 5.1 und 5.2.2             |
| `complete-preflight`         | Geheimnis-, Ziel-, Syntax- und Installationsvorprüfung, 5.2.7 bis 5.2.9                            |
| `tls-certificates`           | Zertifikatsbereitstellung und -prüfung, 5.2.5, 5.2.9 und 6.3                                       |
| `product-installation`       | Produktinstallation, 5.2.10                                                                        |
| `completion-verification`    | Funktions- und Abschlussprüfung, 5.2.11 und [Kapitel 11](#11-prüfung-und-qualitätssicherung)       |
| `idempotency-verification`   | Unveränderte Wiederholung, 5.2.11                                                                  |
| `evidence-handling`          | Ausführungsnachweise, 5.3 und 15.2                                                                 |
| `safe-stop-restart-recovery` | Fehlerbehandlung und Wiederaufnahme, 5.5 und [Kapitel 9](#09-datensicherung-und-wiederherstellung) |

Für jede anwendbare Phase den folgenden Datensatz mit konkreten Angaben ausfüllen oder eindeutig auf die zugehörigen Angaben verweisen. Die Vorlage enthält keine freigegebenen Befehle oder tatsächlich ausgeführten Ergebnisse. Solange notwendige Angaben fehlen, bleibt der Stand vor `ready-for-installation`.

| **Feld / technischer Bezeichner**                  | **Geplanter Inhalt**                                                                                     |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Phase ID                                           | [ID aus der obigen Tabelle]                                                                              |
| Zweck                                              | [Beabsichtigtes Ergebnis]                                                                                |
| Operationstyp                                      | [Lesend / konfigurationsändernd / weiterer begründeter Typ]                                              |
| Ausführende Rolle                                  | [Rolle gemäß [1.3](#13-ansprechpartner)]                                                                 |
| Arbeitsverzeichnis (Working directory)             | [Konkreter Pfad]                                                                                         |
| Quellen und Artefakte                              | [Unveränderliche Referenzen gemäß [5.2.3](#523-quellen-bereitstellen) und 5.2.6]                         |
| Inventar (Inventory)                               | [Geschützte Referenz und Zielauswahl]                                                                    |
| Ausführungsumgebung (Execution environment)        | [Version und vollständiger Digest / begründet nicht anwendbar]                                           |
| Voraussetzungen und Guards                         | [Geprüfte Eingaben, Berechtigungen und Abbruchbedingungen]                                               |
| Vorschau (Check command)                           | [Getesteter Aufruf / begründet nicht anwendbar]                                                          |
| Ausführung (Real-run command)                      | [Vollständiger Aufruf / begründet nicht anwendbar]                                                       |
| Wiederholungsprüfung (Idempotency command)         | [Vollständiger Aufruf / begründet nicht anwendbar]                                                       |
| Verifikation (Verification commands)               | [Befehle und fachliche Erfolgskriterien]                                                                 |
| Erwarteter Marker / Recap                          | [Tatsächlich implementierter Marker und erwartete Ergebnisse]                                            |
| Sicherer Halt (Safe stop)                          | [Vor dem nächsten abhängigen Änderungsschritt anhalten, wenn …]                                          |
| Wiederaufnahme (Restart)                           | [Korrektur, erneut erforderliche Vorprüfungen und Einstieg]                                              |
| Rückfall / Wiederherstellung (Rollback / recovery) | [Voraussetzung, Zuständigkeit und Verfahren gemäß [Kapitel 9](#09-datensicherung-und-wiederherstellung)] |
| Geplante Nachweise (Planned evidence)              | [Geschützter Ablageort, Klassifikation und benötigte Ergebnisse]                                         |

### 5.3 Ausführungsprotokoll

Das Ausführungsprotokoll hält tatsächlich durchgeführte Arbeiten und Ergebnisse fest. Je Schritt werden Zeitpunkt, verantwortliche Rolle, betroffenes System und Ergebnis dokumentiert; zugehörige Nachweise werden verlinkt. Abweichungen werden in [Kapitel 12](#12-projektstatus) nachverfolgt.

#### 5.3.1 Tatsächlicher Aufbau

Nach der Installation werden die beobachteten Versionen, Topologie, Ressourcen, Pfade und wesentlichen Einstellungen erfasst. Geplante Werte werden nicht ungeprüft als Iststand übernommen.

| **Bereich**                  | **Geplanter Wert / Referenz** | **Beobachteter Istwert** | **Nachweis / Abweichung**              |
| ---------------------------- | ----------------------------- | ------------------------ | -------------------------------------- |
| [Komponente / Konfiguration] | [Referenz]                    | Noch nicht erhoben       | [Nachweis oder stabile Abweichungs-ID] |

#### 5.3.2 Tatsächliche Ausführung

Jeder Lauf wird mit seinen tatsächlich verwendeten Eingaben, Befehlen und Ergebnissen dokumentiert. Unterschiede zum Ausführungsplan erhalten eine stabile Abweichungsreferenz in [Kapitel 12](#12-projektstatus).

| **Feld**                                | **Tatsächlicher Inhalt**                                                       |
| --------------------------------------- | ------------------------------------------------------------------------------ |
| Lauf-ID / Phase ID                      | [Bei Ausführung ergänzen]                                                      |
| Beginn / Ende / Zeitzone                | [Zeitpunkte]                                                                   |
| Zielsysteme / auszuführende Instanz     | [Referenz]                                                                     |
| Ausführende Rolle                       | [Rolle gemäß [1.3](#13-ansprechpartner)]                                       |
| Automation / Collection / Pakete        | [Tatsächliche vollständige Revisionen und Prüfsummen]                          |
| Execution Environment                   | [Tatsächlich aufgelöster vollständiger Digest / nicht anwendbar]               |
| Inventar / Konfigurationsstand          | [Geschützte unveränderliche Referenz]                                          |
| Ausgeführter Befehl                     | [Tatsächlicher Aufruf ohne Geheimniswerte]                                     |
| Ergebnis / Recap                        | Noch nicht ausgeführt                                                          |
| Funktionsprüfung / Wiederholungsprüfung | [Ergebnis und Nachweis]                                                        |
| Nachweisablage / Abweichung             | [Geschützte Referenz / stabile Abweichungs-ID / keine Abweichung festgestellt] |

### 5.4 Migration und Übernahme

Die Migration unterscheidet die Übernahme einzelner Bereiche von einer abschließenden Umschaltung. Nicht benötigte Teilverfahren werden begründet als nicht anwendbar gekennzeichnet.

#### 5.4.1 Schrittweise Übernahme

[Umfang, Reihenfolge, Verantwortliche, Testumgebung und Rückfall je Anwendung oder Bereich festlegen. Bestands- und Zielkonfiguration getrennt dokumentieren.]

#### 5.4.2 Abschließende Umschaltung

[Falls erforderlich: Umschaltfenster und Freigabe, endgültige Dienstnamen, betroffene Integrationen, Verifikation und Rückfall festhalten. Namensänderungen gemäß [Abschnitt 6.3.3](#633-dienstnamen-und-namenswechsel) berücksichtigen.]

#### 5.4.3 Übernahmeprüfung

[Vollständigkeit, aktive Anwendungen und Berechtigungen anhand bestätigter Prüfkriterien abgleichen. Bestehende Referenzen erhalten, ohne historische Endpunkte ungeprüft als neue Zielwerte zu übernehmen.]

### 5.5 Fehlerbehandlung und Wiederaufnahme

Nach einem Fehler wird die Ursache eingegrenzt, bevor abhängige Schritte fortgesetzt werden. Wiederholung und Wiederherstellung haben unterschiedliche Zwecke.

#### 5.5.1 Fehler eingrenzen

Betroffene Instanzen, Schritt und bereinigtes Fehlerbild werden im Ausführungsprotokoll festgehalten; offene Maßnahmen werden in [Kapitel 12](#12-projektstatus) nachverfolgt.

| **Fehlerbereich**                              | **Korrektur / zuständige Rolle** | **Erneute Prüfung** |
| ---------------------------------------------- | -------------------------------- | ------------------- |
| [Plattform / Zugang / Konfiguration / Produkt] | [Vorgehen und Rolle]             | [Prüfschritt]       |

#### 5.5.2 Ablauf wiederaufnehmen

Nach neuer Anmeldung wird die Arbeitsumgebung erneut vorbereitet. Nach Korrekturen werden die betroffenen Vorprüfungen und der dokumentierte vollständige Installationsaufruf wiederholt.

[Konkrete Wiederaufnahmebefehle und anschließend erforderliche Prüfungen ergänzen. Keine ungetestete Teilbereinigung oder automatische Neuerzeugung bestehender Zugangsdaten als Standardweg vorgeben.]

#### 5.5.3 Wiederherstellung abgrenzen

Eine erneute Ausführung setzt nicht automatisch bereits veränderte Daten oder Datenbankschemata zurück. Eine benötigte Wiederherstellung folgt [Kapitel 9](#09-datensicherung-und-wiederherstellung) und dem abgestimmten Rückfallverfahren.

[Grenzen und Zuständigkeiten konkretisieren. Keine Löschung persistenter Daten, Deinstallation oder Neuinstallation ohne tatsächlichen Bedarf und eigenen Auftrag als Fehlerbehebung einführen.]

## 06 Kommunikation und Verschlüsselung

Die Kommunikations- und Verschlüsselungsanforderungen legen fest, welche Systeme miteinander kommunizieren und wie Verbindungen geschützt werden. Sie bilden die Grundlage für Freischaltungen, Zertifikatsbereitstellung und Verbindungstests.

### 6.1 Verbindungsmatrix

Die Matrix ordnet initiierte Verbindungen nach Quelle, Ziel und Zweck zu. Rückverkehr und interne Verbindungen werden entsprechend der vorhandenen Netzarchitektur behandelt.

| **ID**   | **Quelle** | **Ziel** | **Protokoll / Zielport** | **Zweck** | **Status** | **Nachweis** | **Kommentar**                            |
| -------- | ---------- | -------- | ------------------------ | --------- | ---------- | ------------ | ---------------------------------------- |
| FLOW-001 | [Quelle]   | [Ziel]   | [Protokoll / Port]       | [Zweck]   | Offen      | [Referenz]   | [Quellbeschränkung / interne Verbindung] |

### 6.2 Kommunikationsübersicht

Die Übersicht ergänzt die Verbindungsmatrix um die räumliche Zuordnung und den Zusammenhang der Kommunikationswege.

#### 6.2.1 Verbindungsdarstellung

Die Grafik zeigt die beteiligten Systeme und ihre Kommunikationsbeziehungen. Details zu Verbindungen und Freischaltungen stehen in [Abschnitt 6.1](#61-verbindungsmatrix).

[Draw.io-Grafik mit FLOW-IDs, tatsächlichen Richtungen des Verbindungsaufbaus und gegebenenfalls getrennten Browser- und Serverwegen einbinden; bearbeitbare Quelle verlinken. Keine Statusangaben in die Systemkästen aufnehmen.]

#### 6.2.2 Kommunikationsablauf

[Besondere Anmelde-, Verwaltungs- oder Integrationsabläufe erläutern. Logische Beziehungen von tatsächlich initiierten Verbindungen unterscheiden. Prüfwege der Überwachung in [Kapitel 08](#08-observability), administrative Zugänge in [Abschnitt 13.2](#132-zugänge-und-administration) pflegen.]

### 6.3 TLS und Zertifikate

Die Angaben ordnen Zertifikate, geschützte Endpunkte und externe Dienstnamen ein.

#### 6.3.1 Zertifikatsbereitstellung

[Zertifizierungsstelle bei Bedarf kurz erklären; Namen/SANs, Kette, Gültigkeit, Erneuerungsverantwortung und geschützten Bereitstellungsweg festhalten. Private Schlüssel nicht dokumentieren.]

#### 6.3.2 TLS-Terminierung und Weiterleitung

[TLS-Endpunkt, Weiterleitung, Vertrauensgrenzen und Proxyheader festlegen. Interne Verschlüsselung anhand des konkreten Schutzbedarfs bestimmen; ausgehende Vertrauensprüfungen getrennt behandeln.]

#### 6.3.3 Dienstnamen und Namenswechsel

[Dienstnamen und technische Systemnamen unterscheiden. Bei Namenswechsel Zertifikate, veröffentlichte URLs, Vertrauensbeziehungen, abhängige Anwendungen und Rückfallverfahren konsistent behandeln; Ablauf in [Abschnitt 5.4](#54-migration-und-übernahme) dokumentieren.]

### 6.4 Internetzugang und Freischaltungen

Die Angaben unterscheiden den Netzpfad von der Freigabe konkreter Ziele.

#### 6.4.1 Zugangswege

Die Übersicht ordnet den Bereichen ihre freigegebenen Zugangswege zu.

| **Bereich**                | **Zugangsweg**                         | **Referenz** | **Status** | **Kommentar** |
| -------------------------- | -------------------------------------- | ------------ | ---------- | ------------- |
| [Zielsystem / Netzbereich] | [Direkt / Proxy / kein Internetzugang] | [FLOW-ID]    | Offen      | [Festlegung]  |

#### 6.4.2 Ziel-Freischaltungen

Die Liste enthält nur die für den ausgewählten Bezug und Betrieb tatsächlich erforderlichen Ziele.

| **URL / Zieldomain** | **Verwendung** | **Port** | **Status** | **Kommentar**              |
| -------------------- | -------------- | -------- | ---------- | -------------------------- |
| [Geprüftes Ziel]     | [Zweck]        | [Port]   | Offen      | [Nachweis / Einschränkung] |

#### 6.4.3 Verbindungskonfiguration

[Proxyparameter, Ausnahmen und Zuordnung zur Ausführungsumgebung festhalten, soweit erforderlich. Der Firewallpfad zum Proxy gehört in [Abschnitt 6.1](#61-verbindungsmatrix).]

#### 6.4.4 Vertrauensprüfung

[Vertrauensanker und Zertifikatsprüfung ausgehender Verbindungen festhalten. Nicht benötigte Internet-/Funktionen des Proxys begründet als nicht anwendbar kennzeichnen.]

## 07 Identitäten und Sicherheit

Die Identitäts- und Zugriffsregelungen legen fest, wer eine Lösung nutzen, administrieren und betreiben darf. Sie machen die Zuordnung von Identitäten, Gruppen und Rechten sowie den Zugang im Störungsfall nachvollziehbar.

### 7.1 Anmeldung und Identitätsquellen

Die Übersicht ordnet den Bereichen ihre Identitätsquellen und Anmeldeverfahren zu.

| **Bereich** | **Identitätsquelle** | **Anbindung**                     | **Status** | **Kommentar**                     |
| ----------- | -------------------- | --------------------------------- | ---------- | --------------------------------- |
| [Bereich]   | [Quelle]             | [Verfahren / Vertrauensbeziehung] | Offen      | [Endpunkte und benötigte Angaben] |

[Bei föderierter Anmeldung Rollen der beteiligten Systeme, tatsächlich erreichbare Kommunikationswege, Metadaten, Prüfung der Signatur und Abmeldeverhalten festhalten. Keine projektspezifische Protokollentscheidung als allgemeine Vorgabe übernehmen.]

### 7.2 Gruppenübernahme und Zuordnung

Die Zuordnungsmatrix verbindet Quellgruppen mit Zielgruppen und Berechtigungsprofilen.

| **Zuordnung** | **Quellgruppe / Referenz** | **Übertragungsweg** | **Zielgruppe** | **Berechtigungsprofil** | **Geltungsbereich** | **Status** | **Kommentar**    |
| ------------- | -------------------------- | ------------------- | -------------- | ----------------------- | ------------------- | ---------- | ---------------- |
| [Zuordnung]   | [Bestätigte Referenz]      | [Verfahren]         | [Ziel]         | [Profil]                | [Bereich]           | Offen      | [Klärungsbedarf] |

[Übernahme, Aktualisierung und Entzug von Mitgliedschaften sowie Auswirkungen auf bestehende Sitzungen festlegen. Konkrete Gruppennamen und Verzeichnisstrukturen nur aus bestätigten Angaben übernehmen.]

### 7.3 Rollen und Berechtigungen

Berechtigungsprofile beschreiben die erlaubten Tätigkeiten und ihre Grenzen.

#### 7.3.1 Berechtigungsprofile

| **Profil** | **Erlaubter Zugriff** | **Begrenzung**                            | **Zuweisung**    | **Status** | **Kommentar**    |
| ---------- | --------------------- | ----------------------------------------- | ---------------- | ---------- | ---------------- |
| [Profil]   | [Tätigkeiten]         | [Verbotene / ausgeschlossene Tätigkeiten] | [Gruppe / Rolle] | Offen      | [Klärungsbedarf] |

#### 7.3.2 Technische Rollenzuweisung

[Profile den tatsächlich verfügbaren Produktrollen und Verwaltungsbereichen zuordnen. Globale und auf einzelne Bereiche begrenzte Rechte unterscheiden; Namen und Rechteumfang gegen die eingesetzte Version prüfen.]

#### 7.3.3 Berechtigungsprüfung

[Erlaubte und unzulässige Aktionen mit repräsentativen Testidentitäten prüfen, einschließlich Rechteentzug. Prüffälle und Ergebnisse in [Kapitel 11](#11-prüfung-und-qualitätssicherung) verknüpfen.]

### 7.4 Konten und Zuständigkeiten

Technische Konten werden nach ihrem Zweck und den tatsächlich benötigten Rechten zugeordnet.

| **Konto / Bereich** | **Zweck** | **Verantwortung** | **Status** | **Kommentar**                 |
| ------------------- | --------- | ----------------- | ---------- | ----------------------------- |
| [Konto]             | [Aufgabe] | [Rolle]           | Offen      | [Rechte / Verwaltungsbereich] |

[Einrichtung, Änderung und Entzug nach bestehenden IAM-Prozessen behandeln. Zugangsdaten ausschließlich über den vereinbarten geschützten Bereitstellungsweg verwalten.]

### 7.5 Administrativer Notfallzugang

[Bedarf, unabhängigen Zugang, Verwahrung, Rotation und Funktionstest festlegen. Ersteinrichtung und dauerhaft verwahrten Notfallzugang unterscheiden; keine produktspezifische Kontenart voraussetzen.]

## 08 Observability

Observability macht den Zustand und das Verhalten einer Lösung nachvollziehbar. Monitoring, Logging und Alarmierung unterstützen die Früherkennung, Diagnose und Bearbeitung von Störungen.

### 8.1 Überblick und Zuständigkeiten

Die Übersicht trennt die Bereitstellung von Prüfmöglichkeiten von der tatsächlichen Betriebsanbindung.

| **Bereich** | **Umfang**                                      | **Verantwortung** | **Status** | **Kommentar** |
| ----------- | ----------------------------------------------- | ----------------- | ---------- | ------------- |
| Monitoring  | [Prüfmöglichkeiten / vereinbarte Einbindung]    | [Rolle]           | Offen      | [Umfang]      |
| Logging     | [Lokale Protokolle / vereinbarte Weiterleitung] | [Rolle]           | Offen      | [Umfang]      |
| Alarmierung | [Empfänger und Bearbeitung]                     | [Rolle]           | Offen      | [Umfang]      |

### 8.2 Überwachungskonzept

Das zuständige Betriebsteam legt Verfahren, Zugriffswege und Bewertung fest.

| **Thema**   | **Vorgabe / Klärungsbedarf**                      | **Status** | **Kommentar** |
| ----------- | ------------------------------------------------- | ---------- | ------------- |
| Prüfumfang  | [Komponenten / Abhängigkeiten / Betriebszeiten]   | Offen      | [Referenz]    |
| Prüfzugriff | [Geschützter Zugangsweg / erforderliche Rechte]   | Offen      | [Referenz]    |
| Bewertung   | [Intervalle / Grenzwerte / Wartungsunterdrückung] | Offen      | [Referenz]    |

[Keine bestimmte Plattform voraussetzen. Hostüberwachung nach bestehendem Standard referenzieren. Unter Monitoring, Logging und Alarmierung jede tatsächlich betriebene Komponente einzeln bewerten; die folgenden Unterkapitel je Komponente entsprechend wiederholen und fortlaufend nummerieren.]

### 8.3 Monitoring

Die Prüfpunkte werden je Komponente mit Verfahren und Erfolgskriterium festgelegt.

#### 8.3.1 [Komponente]

Die Übersicht beschreibt die für diese Komponente benötigten Zustandsprüfungen.

| **Prüfpunkt** | **Verfahren / Quelle** | **Bewertung / Grenzwert** | **Status** | **Kommentar**        |
| ------------- | ---------------------- | ------------------------- | ---------- | -------------------- |
| [Prüfpunkt]   | [Verfahren]            | [Erfolgskriterium]        | Offen      | [Zugriff / Nachweis] |

### 8.4 Logging

Die Protokolle unterstützen Fehleranalyse und Nachvollziehbarkeit relevanter Ereignisse.

#### 8.4.1 [Komponente]

Die Übersicht ordnet Ereignisse ihren Quellen, Ablageorten und Schutzvorgaben zu.

| **Protokoll / Ereignis** | **Quelle** | **Ablage / Weiterleitung**              | **Zugriff / Aufbewahrung** | **Status** | **Kommentar** |
| ------------------------ | ---------- | --------------------------------------- | -------------------------- | ---------- | ------------- |
| [Ereignis]               | [Quelle]   | [Lokale Ablage / Logziel und Transport] | [Vorgabe]                  | Offen      | [Nachweis]    |

[Zentrale Weiterleitung nur im vereinbarten Umfang aufnehmen. Kennwörter, Tokens und private Schlüssel nicht protokollieren; personenbezogene Ereignisse nach geltenden Vorgaben behandeln.]

### 8.5 Alarmierung

Die Alarmierung verbindet erkannte Störungen mit den zuständigen Betriebsrollen.

#### 8.5.1 Alarmwege und Eskalation

Die Festlegungen verbinden Alarmzustellung, Bearbeitung und Eskalation.

| **Thema**                  | **Festlegung / Nachweis**                                 | **Verantwortung** | **Status** | **Kommentar** |
| -------------------------- | --------------------------------------------------------- | ----------------- | ---------- | ------------- |
| Zustellung und Bearbeitung | [Empfänger / Betriebszeiten / Eskalationsweg / Testalarm] | [Rolle]           | Offen      | [Referenz]    |

#### 8.5.2 [Komponente]

Die Übersicht beschreibt die für diese Komponente relevanten Alarmauslöser.

| **Auslöser** | **Schweregrad / Schwelle** | **Zuständige Rolle** | **Status** | **Kommentar** |
| ------------ | -------------------------- | -------------------- | ---------- | ------------- |
| [Störung]    | [Bewertung]                | [Rolle]              | Offen      | [Nachweis]    |

## 09 Datensicherung und Wiederherstellung

Datensicherung und Wiederherstellung schützen vor Datenverlust und ermöglichen einen geordneten Wiederanlauf. Ziele, Verfahren und Tests machen den Sicherungsumfang und die Grenzen der Wiederherstellung nachvollziehbar.

### 9.1 Sicherungsziele und Zuständigkeiten

Die Ziele bestimmen den zulässigen Datenverlust und die erwartete Dauer der Wiederherstellung.

| **Angabe**                    | **Festlegung**                    | **Verantwortung** | **Status** | **Kommentar** |
| ----------------------------- | --------------------------------- | ----------------- | ---------- | ------------- |
| Wiederherstellungspunkt (RPO) | [Maximal zulässiger Datenverlust] | [Rolle]           | Offen      | [Bestätigung] |
| Wiederherstellungsdauer (RTO) | [Maximal zulässige Ausfallzeit]   | [Rolle]           | Offen      | [Bestätigung] |

### 9.2 Sicherungsumfang und Abhängigkeiten

Die Übersicht unterscheidet gesicherte Daten von Voraussetzungen für den Wiederaufbau.

| **Gegenstand** | **Verfahren / Umfang**                       | **Verantwortung** | **Grenze / Abhängigkeit**                                   |
| -------------- | -------------------------------------------- | ----------------- | ----------------------------------------------------------- |
| [Datenbestand] | [Konsistente Sicherung / Wiederaufbauquelle] | [Rolle]           | [Granularität / benötigte Zugänge / manuelle Konfiguration] |

[Grenzen ausdrücklich nennen, etwa vollständiger Datenbestand statt einzelner Mandanten. Konfiguration als Code und geschützte Geheimnisbereitstellung nur bei tatsächlicher Verfügbarkeit als Wiederaufbauquelle nennen; daraus keine pauschale zusätzliche Aufgabe zur Datensicherung ableiten.]

### 9.3 Sicherungsverfahren

Die Verfahren verbinden konsistente Anwendungssicherungen mit der bestehenden Datensicherung.

#### 9.3.1 Anwendungssicherung

Die Parameter beschreiben das tatsächlich verwendete Sicherungsverfahren.

| **Parameter**                              | **Festlegung** | **Status** | **Kommentar**                |
| ------------------------------------------ | -------------- | ---------- | ---------------------------- |
| [Verfahren / Format / Ablage / Konsistenz] | [Projektwert]  | Offen      | [Implementierung / Nachweis] |

#### 9.3.2 Übernahme in die bestehende Datensicherung

[Zuständige Rolle, Reihenfolge, Übertragung, Aufbewahrung und Schutz der unabhängigen Sicherung festhalten. Lokale Kopien oder Snapshots nicht als alleinigen Nachweis einer unabhängigen Datensicherung behandeln.]

#### 9.3.3 Überwachung und Zugriffsschutz

[Erfolg, Alter und Nutzbarkeit der Sicherung sowie Zugriff und Verschlüsselung festlegen; Überwachung mit [Kapitel 08](#08-observability) verknüpfen.]

### 9.4 Sicherungszeitplan

Die Intervalle werden aus den vereinbarten Zielen und bestehenden Backupvorgaben abgeleitet.

| **Sicherung** | **Intervall / Anlass** | **Zeit / Reihenfolge** | **Aufbewahrung** | **Verantwortung** | **Status** | **Kommentar** |
| ------------- | ---------------------- | ---------------------- | ---------------- | ----------------- | ---------- | ------------- |
| [Sicherung]   | [Zu vereinbaren]       | [Reihenfolge]          | [Vorgabe]        | [Rolle]           | Offen      | [Bestätigung] |

### 9.5 Wiederherstellungsverfahren

Die Verfahren beschreiben Wiederherstellungsziel, Abhängigkeiten und anschließende Funktionsprüfung.

#### 9.5.1 Datenwiederherstellung

[Ziel, konsistenten Sicherungsstand, Kompatibilität, Umfang und Integritätsprüfung beschreiben. Einzelobjektwiederherstellung nur zusagen, wenn das Verfahren sie tatsächlich unterstützt.]

#### 9.5.2 Vollständiger Wiederanlauf

[Plattform, Artefakte, Konfiguration, Geheimnisse und Daten in erforderlicher Reihenfolge wiederherstellen. Funktionsprüfung und gemessene Wiederanlaufzeit dokumentieren.]

### 9.6 Wiederherstellungstests

Die Tests prüfen, ob Sicherungen und Wiederaufbauverfahren die vereinbarten Ziele erfüllen.

| **Testumfang**       | **Intervall / Anlass**                          | **Erfolgskriterium**           | **Verantwortung** | **Status** | **Nachweis** | **Kommentar** |
| -------------------- | ----------------------------------------------- | ------------------------------ | ----------------- | ---------- | ------------ | ------------- |
| Erstprüfung          | Vor Betriebsübergabe                            | [Integrität / Funktion / Zeit] | [Rolle]           | Offen      | [Referenz]   | [Testziel]    |
| Wiederholungsprüfung | [Zu vereinbaren / nach wesentlichen Änderungen] | [Ergebnis und Dauer]           | [Rolle]           | Offen      | [Referenz]   | [Testziel]    |

## 10 Wartung und Betrieb

Die Betriebsaufgaben beschreiben die regelmäßige Pflege und den Umgang mit Änderungen und Störungen. Klare Zuständigkeiten und Verfahren unterstützen einen verlässlichen Betrieb.

### 10.1 Betriebsumfang und Zuständigkeiten

Die Übersicht grenzt Plattformaufgaben von anwendungsspezifischen Betriebsaufgaben ab.

| **Bereich** | **Betriebsaufgabe** | **Verantwortung** | **Status** | **Kommentar**                     |
| ----------- | ------------------- | ----------------- | ---------- | --------------------------------- |
| [Bereich]   | [Aufgabe / Grenze]  | [Rolle]           | Offen      | [Referenz auf Betriebsunterlagen] |

### 10.2 Dienstverwaltung

[Start, Stopp, Neustart, Abhängigkeiten, Berechtigung und automatischen Wiederanlauf dokumentieren. Keine bestimmte Laufzeit oder Dienstverwaltung für alle Projekte voraussetzen.]

### 10.3 Wartung und Änderungen

Wartungsaufgaben werden mit Voraussetzungen und Rückfallgrenzen beschrieben.

#### 10.3.1 Aktualisierung

[Versionen, Wartungsfenster, Freigabe, Kompatibilität und Verifikation festhalten; Plattform- und Produktupdates trennen.]

#### 10.3.2 Zertifikatserneuerung

[Verantwortung, Bezug, Verteilung und erforderlichen Reload oder Neustart festhalten. Zertifikatsdaten gemäß [Abschnitt 6.3](#63-tls-und-zertifikate) referenzieren.]

#### 10.3.3 Rückfallverfahren

[Entscheidung, Auslöser, Verfahren und Prüfung festhalten. Änderungen an Datenformaten oder Schemata berücksichtigen; ein altes Anwendungsartefakt allein belegt keinen erfolgreichen Datenrückfall.]

### 10.4 Störungsbehandlung

[Diagnosezugang, relevante Protokolle, zuständige Rolle und Eskalationsweg festhalten. Kontakte ausschließlich in [Abschnitt 1.3](#13-ansprechpartner) pflegen.]

### 10.5 Außerbetriebnahme

[Aufbewahrung, Rückfallfrist und gesonderte Entscheidung zur Stilllegung festhalten. Eine Installation oder Dokumentbestätigung nimmt die Abschaltung einer Altumgebung nicht vorweg.]

## 11 Prüfung und Qualitätssicherung

Die Prüfungen bewerten, ob eine Lösung die vereinbarten Anforderungen erfüllt. Erfolgskriterien und dokumentierte Ergebnisse bilden die Grundlage für Fehlerbehebung, Übergabe und Abnahme.

### 11.1 Prüfgrundlage

Prüfumfang, Zuständigkeit, Testzugänge und Erfolgskriterien werden vor der Ausführung festgelegt.

[Anwendungsrelevante Voraussetzungen der Plattform je Zielsystem bestätigen. Vorhandene Betriebssystembereitstellung nach Standard nicht als zusätzliches Installationsprojekt behandeln.]

### 11.2 Prüfplan

Der Prüfplan trennt technische Funktion, Sicherheit, Betriebsverfahren sowie Anwendungen und Migration.

| **ID**   | **Prüfbereich** | **Prüfung**             | **Erwartetes Ergebnis**      | **Status** | **Kommentar**   | **Nachweis** |
| -------- | --------------- | ----------------------- | ---------------------------- | ---------- | --------------- | ------------ |
| TEST-001 | [Bereich]       | [Prüffall / Zielsystem] | [Messbares Erfolgskriterium] | Offen      | [Voraussetzung] | [Referenz]   |

[Bei umfangreicherem Plan die Bereiche als 11.2.1 bis 11.2.4 gliedern. Bestehende Test-IDs bei Umstrukturierung erhalten; nicht ausgeführte Prüfungen sind kein Erfolgsnachweis.]

### 11.3 Prüfergebnisse und Nachweise

Die Ergebnisse werden den tatsächlich ausgeführten Prüfungen und Zielsystemen zugeordnet.

| **Prüfung / Zielsystem** | **Datum**             | **Ausführende Rolle** | **Ergebnis**             | **Nachweis**          |
| ------------------------ | --------------------- | --------------------- | ------------------------ | --------------------- |
| [Test-ID]                | [Tatsächliches Datum] | [Rolle]               | [Beobachtung / Messwert] | [Geschützte Referenz] |

### 11.4 Abweichungen und Wiederholungsprüfungen

[Fehler, Auswirkung, Korrektur und betroffene Wiederholungsprüfungen nachvollziehbar verknüpfen. Ausstehende Entscheidungen in [Kapitel 12](#12-projektstatus) führen; abhängige Arbeiten bei einem relevanten Fehlschlag anhalten.]

## 12 Projektstatus

Der Projektstatus bündelt offene Fragen und getroffene Entscheidungen. Die Übersicht macht Zuständigkeiten und Auswirkungen sichtbar und verweist bei Bedarf auf die zugehörigen Vorgänge.

### 12.1 Offene Punkte

Die Liste enthält den Klärungsbedarf; bereits dokumentierte Anforderungen, Meilensteine und Prüfergebnisse werden verlinkt.

| **ID**   | **Thema**            | **Klärungsbedarf**  | **Verantwortung** | **Status** | **Vorgang**                                      | **Kommentar**                    |
| -------- | -------------------- | ------------------- | ----------------- | ---------- | ------------------------------------------------ | -------------------------------- |
| OPEN-001 | [Thema / Abweichung] | [Zu klärende Frage] | [Rolle]           | Offen      | [Jira / gleichwertiger Vorgang, falls vorhanden] | [Auswirkung / benötigter Termin] |

[Konkrete Folgearbeiten im verlinkten Vorgang pflegen, statt eine zweite Aufgabenliste mit nächsten Schritten aufzubauen. Ohne Vorgang die notwendige Behandlung hier knapp dokumentieren. Bestehende IDs erhalten.]

### 12.2 Entscheidungen

Die Übersicht hält wesentliche Entscheidungen mit ihrer tatsächlichen Referenz fest.

| **ID / Bezug** | **Entscheidung**            | **Datum** | **Zuständige Rolle** | **Vorgang / Nachweis** |
| -------------- | --------------------------- | --------- | -------------------- | ---------------------- |
| [Referenz]     | [Tatsächliche Entscheidung] | [Datum]   | [Rolle]              | [Referenz]             |

## 13 Betriebsübergabe

Die Betriebsübergabe überführt die bereitgestellte Lösung in die vereinbarten Betriebszuständigkeiten. Dokumentation, Einweisung und Übergabenachweise sichern das erforderliche Wissen und die Übernahme der Aufgaben.

### 13.1 Übergabeumfang

Die Übersicht ordnet die bereitzustellenden Ergebnisse den übernehmenden Rollen zu.

| **Gegenstand**           | **Übergabeinhalt**                                 | **Übernehmende Rolle** | **Status** | **Kommentar**    | **Referenz**                               |
| ------------------------ | -------------------------------------------------- | ---------------------- | ---------- | ---------------- | ------------------------------------------ |
| Technische Dokumentation | [Tatsächlicher Aufbau und Konfiguration]           | [Rolle]                | Offen      | [Offene Angaben] | [Geschützte Ablage / Version / Integrität] |
| Betriebsverfahren        | [Wartung / Überwachung / Datensicherung / Störung] | [Rolle]                | Offen      | [Umfang]         | [Referenz]                                 |

[Eine vor unberechtigtem Zugriff geschützte Offline-Fassung für den Ausfall der zentralen Dokumentationsablage berücksichtigen; Ablage, Aktualisierung und Zugriff benennen.]

### 13.2 Zugänge und Administration

Die Übersicht bündelt administrative Zugänge und das vereinbarte geschützte Abrufverfahren. [Kapitel 05](#05-installation-und-konfiguration) verweist hierher; Kontakte werden in [Abschnitt 1.3](#13-ansprechpartner) gepflegt.

#### 13.2.1 Administrative Zugänge

Die Angaben beschreiben bestätigte Endpunkte und berechtigte Rollen.

| **Angabe**              | **Zielsystem / Bereich**                   | **Status** | **Kommentar**                               |
| ----------------------- | ------------------------------------------ | ---------- | ------------------------------------------- |
| Administrationsendpunkt | [Bestätigte Adresse / Port]                | Offen      | [Zugriffsgrenze]                            |
| Konto / Rolle           | [Referenz]                                 | Offen      | [Anmeldeverfahren / geprüfte Hostidentität] |
| Betriebsrolle           | [Zuordnung gemäß 1.3](#13-ansprechpartner) | Offen      | [Übernahmestand]                            |

#### 13.2.2 Geheimnisbereitstellung

[Geschützte Quelle, Variablenreferenzen, Abrufverfahren und zugriffsberechtigte Rolle dokumentieren. Das vereinbarte geschützte Verfahren verwenden; bei Ansible Vault ausschließlich verschlüsselte Vault-Dateien übernehmen. Passwörter, Vault-Kennwörter, private Schlüssel und abgerufene Werte nicht speichern. Konkrete Zugriffs- und Abrufbefehle nur mit bestätigten Angaben ergänzen; lokale Testzugänge getrennt halten.]

### 13.3 Einweisung

Die Einweisung vermittelt den zuständigen Betriebsteams die für ihre Aufgaben benötigten Verfahren.

| **Thema** | **Inhalt**                    | **Beteiligte Rollen** | **Status** | **Kommentar / Nachweis** |
| --------- | ----------------------------- | --------------------- | ---------- | ------------------------ |
| [Thema]   | [Betriebsaufgabe / Verfahren] | [Rollen]              | Offen      | [Termin / Durchführung]  |

### 13.4 Betriebsübernahme und Nachweis

Die Übernahme wird bei der tatsächlichen Übergabe mit Datum, Beteiligten und verbleibenden Aufgaben dokumentiert.

| **Datum**                    | **Übernehmende Rolle** | **Übernahmeumfang**   | **Restpunkte / Referenz** |
| ---------------------------- | ---------------------- | --------------------- | ------------------------- |
| [Bei tatsächlicher Übergabe] | [Rolle]                | [Bestätigte Aufgaben] | [Nachweis]                |

[Zugangsprüfung, Einweisung, Aufgabenübernahme und formelle Abnahme unterscheiden. Die bloße Ablage von Unterlagen ist keine Betriebsübernahme.]

## 14 Abschluss und Abnahme

Der Projektabschluss stellt den vereinbarten Umfang den erbrachten Leistungen und Prüfergebnissen gegenüber. Die Abnahme hält die Entscheidung der zuständigen Rolle sowie mögliche Restpunkte und Bedingungen fest.

### 14.1 Abnahmestand

Eine Abschlussentscheidung benennt Datum, zuständige Rolle, Ergebnis und Referenz. Inhaltliche Dokumentbestätigung ist keine technische Projektabnahme.

| **Datum**                   | **Rolle** | **Entscheidung**   | **Restpunkte / Referenz** |
| --------------------------- | --------- | ------------------ | ------------------------- |
| [Bei Entscheidung ergänzen] | [Rolle]   | Noch keine Abnahme | [Referenz]                |

## 15 Referenzen und Änderungshistorie

Referenzen erschließen die verwendeten Unterlagen und Nachweise. Die Änderungshistorie hält wesentliche Änderungen an weitergegebenen Dokumentfassungen nachvollziehbar fest.

### 15.1 Projektunterlagen

Die technischen Festlegungen und Ausführungsstände werden an den jeweiligen Stellen gepflegt.

| **Unterlage**                   | **Inhalt / Verweis**                                                                                                  |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Installationsgrundlage          | Quellen, Paketstände, Prüfsummen und Befehle in [Kapitel 5.2](#52-produktinstallation)                                |
| Architektur und Kommunikation   | Grafiken mit bearbeitbaren Quellen in [Kapitel 2.1](#21-lösungsaufbau) und [Kapitel 6.2](#62-kommunikationsübersicht) |
| Bestands- und Planungsgrundlage | [Benötigte Unterlagen und deren Ablageverweis; nicht zutreffende Einträge entfernen]                                  |

### 15.2 Nachweise

Ausgeführte Arbeiten und Prüfungen werden je Zielsystem mit Datum, zuständiger Rolle und Ergebnis in [Kapitel 5.3](#53-ausführungsprotokoll) und [Kapitel 11](#11-prüfung-und-qualitätssicherung) dokumentiert. Zugehörige Protokolle liegen in [geschützte Projektablage / Zugriff durch zuständige Rollen]. Geheimnisse und personenbezogene Rohlogs werden nicht in die Dokumentation übernommen.

[Den tatsächlichen Prüfstand knapp benennen und Testumgebung von produktiver Ausführung unterscheiden. Für ergänzende technische Nachweise Ablageverweis, Klassifikation, Integrität, zuständige Rolle sowie vereinbarte Aufbewahrung und Löschung angeben oder auf die bestehende Regelung verweisen. Offene Festlegungen kennzeichnen.]

### 15.3 Änderungshistorie

Die bisherigen Arbeitsversionen sind zum ersten Entwurf für die Weitergabe zusammengefasst. Künftig werden nur wesentliche Änderungen an weitergegebenen Fassungen aufgenommen; neue Versionsnummern allein bedeuten keine Freigabe.

| **Version**                | **Datum** | **Änderung**                                                                                                                                                                             |
| -------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Aktuelle Entwurfsversion] | [Datum]   | Initialer Entwurf für die Projektabstimmung: Projektauftrag, Architektur, Voraussetzungen, Umsetzung, Prüfung und Übergabe. [Vorhandene Arbeitsfassungen bei Bedarf als Bereich nennen.] |
