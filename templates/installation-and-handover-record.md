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

<details>
<summary>Inhaltsverzeichnis</summary>

- [01 Allgemeine Informationen](#01-allgemeine-informationen)
  - [1.1 Zweck und Verwendung](#11-zweck-und-verwendung)
  - [1.2 Projektauftrag](#12-projektauftrag)
  - [1.3 Ansprechpartner](#13-ansprechpartner)
  - [1.4 Dokumentstatus und Freigabe](#14-dokumentstatus-und-freigabe)
  - [1.5 Versionierung](#15-versionierung)
- [02 Architektur](#02-architektur)
  - [2.1 Lösungsaufbau](#21-lösungsaufbau)
  - [2.2 Komponenten und Betriebsanbindungen](#22-komponenten-und-betriebsanbindungen)
  - [2.3 Zielsysteme](#23-zielsysteme)
  - [2.4 Verfügbarkeit und Abhängigkeiten](#24-verfügbarkeit-und-abhängigkeiten)
- [03 Voraussetzungen](#03-voraussetzungen)
  - [3.1 Betriebliche Voraussetzungen](#31-betriebliche-voraussetzungen)
  - [3.2 Projektspezifische Voraussetzungen](#32-projektspezifische-voraussetzungen)
  - [3.3 Leistungsanforderungen](#33-leistungsanforderungen)
  - [3.4 Anforderungsdetails und Startvoraussetzungen](#34-anforderungsdetails-und-startvoraussetzungen)
- [04 Implementierungsplan](#04-implementierungsplan)
  - [4.1 Vorgehen und Reihenfolge](#41-vorgehen-und-reihenfolge)
  - [4.2 Meilensteine und Termine](#42-meilensteine-und-termine)
  - [4.3 Umschaltung und Rückfall](#43-umschaltung-und-rückfall)
- [05 Installation und Konfiguration](#05-installation-und-konfiguration)
  - [5.1 Systemvorbereitung](#51-systemvorbereitung)
  - [5.2 Produktinstallation](#52-produktinstallation)
  - [5.3 Ausführungsnachweise](#53-ausführungsnachweise)
  - [5.4 Migration und Übernahme](#54-migration-und-übernahme)
  - [5.5 Fehlerbehandlung und Wiederaufnahme](#55-fehlerbehandlung-und-wiederaufnahme)
- [06 Kommunikation und Verschlüsselung](#06-kommunikation-und-verschlüsselung)
  - [6.1 Verbindungsmatrix](#61-verbindungsmatrix)
  - [6.2 Kommunikationsübersicht](#62-kommunikationsübersicht)
  - [6.3 TLS und Zertifikate](#63-tls-und-zertifikate)
  - [6.4 Internetzugang und Freischaltungen](#64-internetzugang-und-freischaltungen)
- [07 Identitäten und Sicherheit](#07-identitäten-und-sicherheit)
  - [7.1 Anmeldung und Identitätsquellen](#71-anmeldung-und-identitätsquellen)
  - [7.2 Gruppenübernahme und Zuordnung](#72-gruppenübernahme-und-zuordnung)
  - [7.3 Rollen und Berechtigungen](#73-rollen-und-berechtigungen)
  - [7.4 Konten und Zuständigkeiten](#74-konten-und-zuständigkeiten)
  - [7.5 Administrativer Notfallzugang](#75-administrativer-notfallzugang)
- [08 Observability](#08-observability)
  - [8.1 Überblick und Zuständigkeiten](#81-überblick-und-zuständigkeiten)
  - [8.2 Überwachungskonzept](#82-überwachungskonzept)
  - [8.3 Monitoring](#83-monitoring)
  - [8.4 Logging](#84-logging)
  - [8.5 Alarmierung](#85-alarmierung)
- [09 Datensicherung und Wiederherstellung](#09-datensicherung-und-wiederherstellung)
  - [9.1 Sicherungsziele und Zuständigkeiten](#91-sicherungsziele-und-zuständigkeiten)
  - [9.2 Sicherungsumfang und Abhängigkeiten](#92-sicherungsumfang-und-abhängigkeiten)
  - [9.3 Sicherungsverfahren](#93-sicherungsverfahren)
  - [9.4 Sicherungszeitplan](#94-sicherungszeitplan)
  - [9.5 Wiederherstellungsverfahren](#95-wiederherstellungsverfahren)
  - [9.6 Wiederherstellungstests](#96-wiederherstellungstests)
- [10 Wartung und Betrieb](#10-wartung-und-betrieb)
  - [10.1 Betriebsumfang und Zuständigkeiten](#101-betriebsumfang-und-zuständigkeiten)
  - [10.2 Dienstverwaltung](#102-dienstverwaltung)
  - [10.3 Wartung und Änderungen](#103-wartung-und-änderungen)
  - [10.4 Störungsbehandlung](#104-störungsbehandlung)
  - [10.5 Außerbetriebnahme](#105-außerbetriebnahme)
- [11 Prüfung und Qualitätssicherung](#11-prüfung-und-qualitätssicherung)
  - [11.1 Prüfgrundlage](#111-prüfgrundlage)
  - [11.2 Prüfplan](#112-prüfplan)
  - [11.3 Prüfergebnisse und Nachweise](#113-prüfergebnisse-und-nachweise)
  - [11.4 Abweichungen und Wiederholungsprüfungen](#114-abweichungen-und-wiederholungsprüfungen)
- [12 Projektstatus](#12-projektstatus)
  - [12.1 Offene Punkte](#121-offene-punkte)
  - [12.2 Entscheidungen](#122-entscheidungen)
- [13 Betriebsübergabe](#13-betriebsübergabe)
  - [13.1 Übergabeumfang](#131-übergabeumfang)
  - [13.2 Zugänge und Administration](#132-zugänge-und-administration)
  - [13.3 Einweisung](#133-einweisung)
  - [13.4 Betriebsübernahme und Nachweis](#134-betriebsübernahme-und-nachweis)
- [14 Abschluss und Abnahme](#14-abschluss-und-abnahme)
  - [14.1 Abnahmestand](#141-abnahmestand)
- [15 Referenzen und Änderungshistorie](#15-referenzen-und-änderungshistorie)
  - [15.1 Projektunterlagen](#151-projektunterlagen)
  - [15.2 Nachweise](#152-nachweise)
  - [15.3 Änderungshistorie](#153-änderungshistorie)

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

[Leistungen und Grenzen je Instanz zuordnen und auf die zugehörigen Anforderungen aus [Kapitel 3](#03-voraussetzungen) verlinken. Gemeinsame Projektanforderungen einmalig benennen.]

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

Der Dokumentstatus unterscheidet Entwurf, Prüfung und Freigabe. Inhaltliche Bestätigung, technische Ausführungsfreigabe, Betriebsübernahme und Projektabnahme werden getrennt dokumentiert.

| **Status**  | **Bedeutung**                                                |
| ----------- | ------------------------------------------------------------ |
| Entwurf     | Inhalte werden erstellt und abgestimmt                       |
| In Prüfung  | Der Dokumentstand liegt zur Prüfung vor                      |
| Freigegeben | Der Dokumentstand ist für den bezeichneten Zweck freigegeben |

| **Aktuelle Version** | **Status** | **Kommentar**                                                                    |
| -------------------- | ---------- | -------------------------------------------------------------------------------- |
| 0.1                  | Entwurf    | Vorläufige Dokumentfassung vor Version 1.0; noch keine formelle Dokumentfreigabe |

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

Nach der Umsetzung werden die tatsächlich beobachteten Versionen, Ressourcen, Pfade und Einstellungen ergänzt und mit dem Nachweis aus [Kapitel 11.3](#113-prüfergebnisse-und-nachweise) verknüpft. Planwerte sind kein belegter Iststand.

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

### 3.1 Betriebliche Voraussetzungen

Die betriebliche Basis wird vom zuständigen Betriebsteam nach bestehendem Standard bereitgestellt und gepflegt. Die Umsetzung setzt eine betriebsbereite Plattform voraus; deren Installation gehört nur bei ausdrücklichem Auftrag zum Projektumfang.

[Die Kennungen `A` und `B` zeigen das Muster für mehrere Instanzen. Durch die tatsächlichen stabilen Kennungen ersetzen und nur benötigte Zeilen übernehmen. Bei nur einer Instanz keine zweite Beispielinstanz anlegen. Jede instanzbezogene Anforderung erhält einen eigenen Status und Nachweis; bestehende Kennungen und Verweise erhalten. Beim Ausfüllen eindeutige Sprungziele je Anforderungs- und Prüffallkennung im unterstützten Format des verwendeten Renderers erzeugen. Die Confluence-Ausgabe muss Links und native Ziele einschließlich der Zusätze für die Instanzen erhalten.]

| **ID**    | **Instanz / Geltungsbereich** | **Bereitzustellen / Soll**                                   | **Zuständigkeit** | **Benötigt bis** | **Status** | **Nachweis** | **Kommentar**    |
| --------- | ----------------------------- | ------------------------------------------------------------ | ----------------- | ---------------- | ---------- | ------------ | ---------------- |
| REQ-001-A | A                             | [Ausstattung und Bereitstellung des zugehörigen Zielsystems] | [Rolle]           | [Zeitpunkt]      | Offen      | [Referenz]   | [Klärungsbedarf] |
| REQ-001-B | B                             | [Ausstattung und Bereitstellung des zugehörigen Zielsystems] | [Rolle]           | [Zeitpunkt]      | Offen      | [Referenz]   | [Klärungsbedarf] |
| REQ-002-A | A                             | [Benötigte Zugänge / Dienstkonten]                           | [Rolle]           | [Zeitpunkt]      | Offen      | [Referenz]   | [Klärungsbedarf] |
| REQ-002-B | B                             | [Benötigte Zugänge / Dienstkonten]                           | [Rolle]           | [Zeitpunkt]      | Offen      | [Referenz]   | [Klärungsbedarf] |

Die folgende Übersicht konkretisiert den benötigten Plattformstandard. Projektspezifische Verbindungen stehen in [Kapitel 6](#06-kommunikation-und-verschlüsselung). [Nur für die Anwendung erforderliche Prüfungen der Plattform übernehmen; zugehörige Anforderung und Instanz benennen. Status einmalig in der Anforderungstabelle führen.]

| **Bereich**                | **Instanz / Geltungsbereich**                       | **Anforderung**                                                | **Zuständigkeit** | **Prüfung**                     | **Kommentar**                                    |
| -------------------------- | --------------------------------------------------- | -------------------------------------------------------------- | ----------------- | ------------------------------- | ------------------------------------------------ |
| Namensauflösung            | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Benötigte Namen]                                              | [Rolle]           | [Auflösungsprüfung]             | [Vorgabe]                                        |
| Zeitsynchronisation        | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Zulässiger Zeitdienst]                                        | [Rolle]           | [Synchronisierungsstatus]       | [Vorgabe]                                        |
| Paket- und Artefaktquellen | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Freigegebene Bezugswege]                                      | [Rolle]           | [Erreichbarkeit / Berechtigung] | [Vorgabe]                                        |
| Proxy                      | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Bei Bedarf gemäß 6.4](#64-internetzugang-und-freischaltungen) | [Rolle]           | [Zielspezifische Prüfung]       | [Bei fehlendem Bedarf begründet nicht anwendbar] |
| Vertrauenskette            | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Benötigte Zertifizierungsstellen]                             | [Rolle]           | [TLS-Verifikation]              | [Vorgabe]                                        |
| Basisnetz                  | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Routing und Plattformkonnektivität]                           | [Rolle]           | [Vorprüfung]                    | [Vorgabe]                                        |

### 3.2 Projektspezifische Voraussetzungen

Die projektspezifischen Voraussetzungen benennen die benötigten Dienstnamen, Freischaltungen, Parameter der Anbindungen und fachlichen Angaben. Die zuständigen Stellen stellen diese für die konkrete Lösung bereit.

| **ID**    | **Instanz / Geltungsbereich** | **Bereitzustellen / Soll**                       | **Zuständigkeit** | **Benötigt bis** | **Status** | **Nachweis** | **Kommentar**     |
| --------- | ----------------------------- | ------------------------------------------------ | ----------------- | ---------------- | ---------- | ------------ | ----------------- |
| REQ-003-A | A                             | [Dienstnamen, Zertifikate und Netzwerkfreigaben] | [Rolle]           | [Zeitpunkt]      | Offen      | [Referenz]   | [Klärungsbedarf]  |
| REQ-003-B | B                             | [Dienstnamen, Zertifikate und Netzwerkfreigaben] | [Rolle]           | [Zeitpunkt]      | Offen      | [Referenz]   | [Klärungsbedarf]  |
| REQ-004   | Projektweit                   | [Tatsächlich gemeinsame Projektvorgabe]          | [Rolle]           | [Zeitpunkt]      | Offen      | [Referenz]   | [Geltungsbereich] |

### 3.3 Leistungsanforderungen

Die Leistungsanforderungen beschreiben die zu liefernden Ergebnisse. Sie verbinden den Projektauftrag mit der technischen Umsetzung, den Prüfungen und der tatsächlichen Übernahme je Instanz.

| **ID**    | **Instanz / Geltungsbereich** | **Zu lieferndes Ergebnis**                                    | **Zuständigkeit** | **Prüfung / Nachweisführung**                                                                                | **Status** | **Nachweis** | **Kommentar** |
| --------- | ----------------------------- | ------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------ | ---------- | ------------ | ------------- |
| REQ-005-A | A                             | [Installation und Konfiguration der vereinbarten Komponenten] | [Rolle]           | [Umsetzung](#05-installation-und-konfiguration), [Installationsprüfung](#1122-installationsprüfung)          | Offen      | [Referenz]   | [Umfang]      |
| REQ-005-B | B                             | [Installation und Konfiguration der vereinbarten Komponenten] | [Rolle]           | [Umsetzung](#05-installation-und-konfiguration), [Installationsprüfung](#1122-installationsprüfung)          | Offen      | [Referenz]   | [Umfang]      |
| REQ-006-A | A                             | [Vereinbarte Integration und Migration]                       | [Rolle]           | [Migration](#54-migration-und-übernahme), [Integrationsprüfung](#1123-integrationsprüfung)                   | Offen      | [Referenz]   | [Umfang]      |
| REQ-006-B | B                             | [Vereinbarte Integration und Migration]                       | [Rolle]           | [Migration](#54-migration-und-übernahme), [Integrationsprüfung](#1123-integrationsprüfung)                   | Offen      | [Referenz]   | [Umfang]      |
| REQ-007-A | A                             | [Vereinbarte Betriebsanbindungen und Übergabe]                | [Rolle]           | [Betriebsbereitschaft](#1124-betriebsbereitschaft), [Betriebsübernahme](#134-betriebsübernahme-und-nachweis) | Offen      | [Referenz]   | [Umfang]      |
| REQ-007-B | B                             | [Vereinbarte Betriebsanbindungen und Übergabe]                | [Rolle]           | [Betriebsbereitschaft](#1124-betriebsbereitschaft), [Betriebsübernahme](#134-betriebsübernahme-und-nachweis) | Offen      | [Referenz]   | [Umfang]      |

[Ergebnisse aus dem bestätigten Projektauftrag ableiten und bei eigenständigen Prüfkriterien weiter aufteilen. Gemeinsame Projektergebnisse einmalig mit tatsächlichem Geltungsbereich führen. Beispiele begründen keinen zusätzlichen Leistungsumfang.]

### 3.4 Anforderungsdetails und Startvoraussetzungen

Die Details machen Mindestanforderungen, vereinbarte Ausprägung und bestätigten Iststand je Instanz vergleichbar. Eine offene Anforderung blockiert nur die davon abhängigen Arbeiten. Ausnahmen benötigen eine zuständige Entscheidung mit nachvollziehbarer Auswirkung.

| **Anforderung**                       | **Instanz / Geltungsbereich**                       | **Kategorie** | **Mindestwert**                           | **Vereinbarter Sollwert** | **Bestätigter Istwert** | **Blockierwirkung**  | **Quelle**                 | **Nachweis / Ausnahme** |
| ------------------------------------- | --------------------------------------------------- | ------------- | ----------------------------------------- | ------------------------- | ----------------------- | -------------------- | -------------------------- | ----------------------- |
| [REQ-ID aus den Anforderungstabellen] | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Bereich]     | [Mindestwert / begründet nicht anwendbar] | Offen                     | Noch nicht geprüft      | [Abhängiger Schritt] | [Versionsgebundene Quelle] | Offen                   |

Vor dem Umsetzungsstart werden die relevanten Voraussetzungen und eine erforderliche Ausführungsfreigabe im Meilenstein M1 mit zuständiger Rolle und Entscheidungsreferenz nachgewiesen. Eine Vorlage oder inhaltliche Dokumentbestätigung erteilt keine technische Ausführungsfreigabe.

## 04 Implementierungsplan

Der Implementierungsplan verbindet Arbeitsschritte, Abhängigkeiten, Zuständigkeiten und Termine zu einem nachvollziehbaren Ablauf. Meilensteine kennzeichnen überprüfbare Ergebnisse; Umschaltung und Rückfall regeln den Übergang zur neuen Lösung.

### 4.1 Vorgehen und Reihenfolge

Das Vorgehen ordnet die Umsetzungsschritte nach ihren fachlichen und technischen Abhängigkeiten.

1. **Vorbereitung:** [Erforderliche Bereitstellungen aus [Kapitel 3](#03-voraussetzungen) und Projektwerte aus [Abschnitt 5.2.2](#522-projektwerte-und-ausführungsumgebung) zusammenführen; Ausführungsplan und Installationsablauf abstimmen.]
2. **Einrichtung und Integration:** [Aufbau und Anbindung der Komponenten in der projektspezifisch erforderlichen Reihenfolge beschreiben; auf die technischen Abläufe in [Kapitel 5](#05-installation-und-konfiguration) verweisen.]
3. **Migration und Prüfung:** [Übernahmeumfang und Reihenfolge festhalten; Prüfkriterien aus [Kapitel 11](#11-prüfung-und-qualitätssicherung) zuordnen. Falls keine Migration erforderlich ist, begründet kennzeichnen.]
4. **Übergabe und Abschluss:** [Voraussetzungen für [Betriebsübergabe](#13-betriebsübergabe) und [Projektabnahme](#14-abschluss-und-abnahme) zuordnen.]

[Parallele Arbeiten und Abhängigkeiten zwischen den Instanzen und Umsetzungsschritten projektspezifisch ergänzen. Gesamtmeilensteine anhand der zugehörigen Ergebnisse je Instanz bewerten. Anzahl und Reihenfolge an den tatsächlichen Umfang anpassen; ausführbare Befehle in [Kapitel 5](#05-installation-und-konfiguration) pflegen.]

### 4.2 Meilensteine und Termine

Die Meilensteine bündeln die angestrebten Ergebnisse mit Zuständigkeit, Zieltermin und Bearbeitungsstand. Die Referenzspalte verknüpft zugehörige Jira-Vorgänge oder vergleichbare Planungsnachweise.

| **Nr.** | **Meilenstein**        | **Erreicht, wenn**                                                                                                                      | **Zuständigkeit** | **Zieltermin** | **Status** | **Kommentar** | **Referenz**     |
| ------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | -------------- | ---------- | ------------- | ---------------- |
| M1      | Umsetzung vorbereitet  | Benötigte Voraussetzungen erfüllt oder dokumentiert ausgenommen, technische Planung abgestimmt und erforderliche Ausführung autorisiert | [Rolle]           | Offen          | Offen      | —             | [Vorgang / Link] |
| M2      | Lösung eingerichtet    | Vereinbarte Komponenten und Integrationen eingerichtet                                                                                  | [Rolle]           | Offen          | Offen      | —             | [Vorgang / Link] |
| M3      | Prüfung abgeschlossen  | Vereinbarte Prüfkriterien nachweislich erfüllt                                                                                          | [Rolle]           | Offen          | Offen      | —             | [Vorgang / Link] |
| M4      | Übergabe und Abschluss | Betriebsaufgaben übernommen und Abschlussentscheidung dokumentiert                                                                      | [Rolle]           | Offen          | Offen      | —             | [Vorgang / Link] |

### 4.3 Umschaltung und Rückfall

Umschaltung und Rückfall beschreiben den kontrollierten Wechsel auf die neue Lösung und die Rückkehr zu einem gesicherten vorherigen Stand bei Erreichen der vereinbarten Rückfallkriterien.

[Umfang, Reihenfolge, Umschaltfenster, fachliche Rückfallkriterien und zuständige Entscheidungsrolle anhand bestätigter Projektvorgaben benennen. Ohne erforderliche Umschaltung diesen Abschnitt begründet als nicht anwendbar kennzeichnen.]

Die technischen Übernahme- und Umschaltverfahren stehen in [Abschnitt 5.4](#54-migration-und-übernahme); die benötigten Sicherungs- und Wiederherstellungsverfahren in [Kapitel 9](#09-datensicherung-und-wiederherstellung). Zwischenzeitliche Datenänderungen und externe Abhängigkeiten werden bei der Rückfallplanung berücksichtigt. Offene Entscheidungen werden in [Kapitel 12](#12-projektstatus) geführt.

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

Die Übersicht benennt den Einstiegspunkt und die Reihenfolge eingebundener Abläufe. Automatisch aufgerufene Unterabläufe und separat auszuführende Prüfungen werden unterschieden.

| **Reihenfolge** | **Playbook / Installationsablauf**          | **Collection / Paket**    | **Rolle / Baustein** | **Aufgabe**                         |
| --------------- | ------------------------------------------- | ------------------------- | -------------------- | ----------------------------------- |
| Werkzeug        | [Wrapper, falls verwendet]                  | [Paket / nicht anwendbar] | [Baustein]           | [Ausführungsumgebung bereitstellen] |
| 1               | [Vollständige Referenz des Einstiegspunkts] | [Name]                    | [Name]               | [Aufgerufene Unterabläufe]          |
| 1.1             | [Eingebundener Ablauf]                      | [Name]                    | [Name]               | [Automatisch ausgeführter Schritt]  |
| 2               | [Separater Prüfaufruf]                      | [Name]                    | [Name]               | [Nachgelagerte Prüfung]             |

[Nur tatsächlich vorhandene Aufrufe aufführen. Deaktivierte optionale Bausteine mit ihrem ursprünglichen Ablauf und dem Grund der Nichtverwendung benennen; keine eigene Ausführungsnummer vergeben.]

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

Die Übersicht ordnet die Ausführungsphasen den beschriebenen Arbeitsschritten zu. Befehle, Voraussetzungen und Erfolgskriterien stehen ausschließlich in den verlinkten Abschnitten; tatsächliche Ergebnisse werden je Instanz in [Abschnitt 11.3](#113-prüfergebnisse-und-nachweise) dokumentiert.

| **Phase**                    | **Zugehöriger Abschnitt**                                                                                                                                                                                        |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `initial-preflight`          | [5.2.4 Arbeitsumgebung vorbereiten](#524-arbeitsumgebung-vorbereiten)                                                                                                                                            |
| `artifact-staging`           | [5.2.3 Quellen](#523-quellen-bereitstellen), [5.2.5 Konfiguration](#525-installationskonfiguration-bereitstellen) und [5.2.6 Abhängigkeiten](#526-abhängigkeiten-bereitstellen)                                  |
| `host-preparation`           | [5.1 Systemvorbereitung](#51-systemvorbereitung)                                                                                                                                                                 |
| `complete-preflight`         | [5.2.7 Zugangsdaten](#527-geschützte-zugangsdaten-prüfen), [5.2.8 Zielauswahl und Syntax](#528-zielauswahl-und-syntax-prüfen) und [5.2.9 Installationsvoraussetzungen](#529-installationsvoraussetzungen-prüfen) |
| `tls-certificates`           | [6.3 TLS und Zertifikate](#63-tls-und-zertifikate)                                                                                                                                                               |
| `product-installation`       | [5.2.10 Produktinstallation](#5210-produktinstallation-ausführen)                                                                                                                                                |
| `completion-verification`    | [5.2.11 Funktionsprüfung](#5211-funktion-und-wiederholbarkeit-prüfen)                                                                                                                                            |
| `idempotency-verification`   | [5.2.11 Unveränderter Wiederholungslauf](#5211-funktion-und-wiederholbarkeit-prüfen)                                                                                                                             |
| `evidence-handling`          | [11.3 Prüfergebnisse und Nachweise](#113-prüfergebnisse-und-nachweise)                                                                                                                                           |
| `safe-stop-restart-recovery` | [5.5 Fehlerbehandlung und Wiederaufnahme](#55-fehlerbehandlung-und-wiederaufnahme) sowie [Kapitel 9 Wiederherstellung](#09-datensicherung-und-wiederherstellung)                                                 |

[Nicht benötigte Phasen kurz begründet als nicht anwendbar kennzeichnen. Gemeinsame Abläufe einmalig beschreiben; abweichende Eingaben und Ergebnisse der jeweiligen Instanz zuordnen.]

### 5.3 Ausführungsnachweise

Die durchgeführten Installations- und Konfigurationsläufe werden mit Datum, Zielsystem, ausführender Rolle und Ergebnis in [Kapitel 11.3](#113-prüfergebnisse-und-nachweise) nachgewiesen. Zugehörige bereinigte Ausführungsprotokolle werden dort verlinkt. Zugangsdaten und andere Geheimnisse werden nicht übernommen.

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

Betroffene Instanzen, Schritt und bereinigtes Fehlerbild werden gemäß [Kapitel 11.3](#113-prüfergebnisse-und-nachweise) festgehalten; offene Maßnahmen werden in [Kapitel 12](#12-projektstatus) nachverfolgt.

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

| **ID**   | **Instanz / Geltungsbereich**                       | **Quelle** | **Ziel** | **Protokoll / Zielport** | **Zweck** | **Status** | **Nachweis** | **Kommentar**                            |
| -------- | --------------------------------------------------- | ---------- | -------- | ------------------------ | --------- | ---------- | ------------ | ---------------------------------------- |
| FLOW-001 | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Quelle]   | [Ziel]   | [Protokoll / Port]       | [Zweck]   | Offen      | [Referenz]   | [Quellbeschränkung / interne Verbindung] |

### 6.2 Kommunikationsübersicht

Die Übersicht ergänzt die Verbindungsmatrix um die räumliche Zuordnung und den Zusammenhang der Kommunikationswege.

#### 6.2.1 Verbindungsdarstellung

Die Grafik zeigt die beteiligten Systeme und ihre Kommunikationsbeziehungen. Details zu Verbindungen und Freischaltungen stehen in [Abschnitt 6.1](#61-verbindungsmatrix).

[Draw.io-Grafik mit FLOW-IDs, tatsächlichen Richtungen des Verbindungsaufbaus und gegebenenfalls getrennten Browser- und Serverwegen einbinden; bearbeitbare Quelle verlinken. Keine Statusangaben in die Systemkästen aufnehmen.]

#### 6.2.2 Kommunikationsablauf

[Benutzer- und Anwendungszugriff, Identitätsquellen, Datenhaltung, Integrationen und Artefaktbezug entsprechend dem tatsächlichen Umfang erläutern. Quelle, Ziel und Zweck mit der Verbindungsmatrix abgleichen. Logische Beziehungen, Verbindungen des Browsers und direkte Serververbindungen unterscheiden; die Erreichbarkeit eines Servers belegt keine Browser-Erreichbarkeit. Prüfwege der Überwachung in [Kapitel 08](#08-observability), administrative Zugänge in [Abschnitt 13.2](#132-zugänge-und-administration) pflegen.]

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

| **Instanz / Netzbereich**  | **Zugangsweg**                         | **Referenz** | **Status** | **Kommentar** |
| -------------------------- | -------------------------------------- | ------------ | ---------- | ------------- |
| [Zielsystem / Netzbereich] | [Direkt / Proxy / kein Internetzugang] | [FLOW-ID]    | Offen      | [Festlegung]  |

#### 6.4.2 Ziel-Freischaltungen

Die Liste enthält nur die für den ausgewählten Bezug und Betrieb tatsächlich erforderlichen Ziele.

| **URL / Zieldomain** | **Instanz / Geltungsbereich**                       | **Verwendung** | **Port** | **Status** | **Kommentar**              |
| -------------------- | --------------------------------------------------- | -------------- | -------- | ---------- | -------------------------- |
| [Geprüftes Ziel]     | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Zweck]        | [Port]   | Offen      | [Nachweis / Einschränkung] |

#### 6.4.3 Verbindungskonfiguration

[Proxyparameter, Ausnahmen und Zuordnung zur Ausführungsumgebung festhalten, soweit erforderlich. Der Firewallpfad zum Proxy gehört in [Abschnitt 6.1](#61-verbindungsmatrix).]

#### 6.4.4 Vertrauensprüfung

[Vertrauensanker und Zertifikatsprüfung ausgehender Verbindungen festhalten. Nicht benötigte Internet-/Funktionen des Proxys begründet als nicht anwendbar kennzeichnen.]

## 07 Identitäten und Sicherheit

Die Identitäts- und Zugriffsregelungen legen fest, wer eine Lösung nutzen, administrieren und betreiben darf. Sie machen die Zuordnung von Identitäten, Gruppen und Rechten sowie den Zugang im Störungsfall nachvollziehbar.

### 7.1 Anmeldung und Identitätsquellen

Die Übersicht ordnet den Bereichen ihre Identitätsquellen und Anmeldeverfahren zu.

| **Instanz / Bereich** | **Identitätsquelle** | **Anbindung**                     | **Status** | **Kommentar**                     |
| --------------------- | -------------------- | --------------------------------- | ---------- | --------------------------------- |
| [Bereich]             | [Quelle]             | [Verfahren / Vertrauensbeziehung] | Offen      | [Endpunkte und benötigte Angaben] |

[Bei föderierter Anmeldung Rollen der beteiligten Systeme, tatsächlich erreichbare Kommunikationswege, Metadaten, Prüfung der Signatur und Abmeldeverhalten festhalten. Keine projektspezifische Protokollentscheidung als allgemeine Vorgabe übernehmen.]

### 7.2 Gruppenübernahme und Zuordnung

Die Gruppenzuordnung verbindet die Mitgliedschaft in der Identitätsquelle mit den vorgesehenen Berechtigungsprofilen. Eine übernommene Gruppe erhält nur die ausdrücklich zugeordneten Rechte.

#### 7.2.1 Zuordnungsmatrix

Die Matrix ordnet jeder Zielgruppe ein definiertes Profil und dessen Geltungsbereich zu. Die Musterzuordnungen werden durch die bestätigten Projektwerte ersetzt.

| **Zuordnung**    | **Quellgruppe / Referenz** | **Übertragungsweg** | **Zielgruppe** | **Berechtigungsprofil**                                    | **Geltungsbereich** | **Status** | **Kommentar**    |
| ---------------- | -------------------------- | ------------------- | -------------- | ---------------------------------------------------------- | ------------------- | ---------- | ---------------- |
| [Administration] | [Bestätigte Referenz]      | [Verfahren]         | [Zielgruppe]   | [BP-001 Bereichsadministration](#731-berechtigungsprofile) | [Instanz / Bereich] | Offen      | [Klärungsbedarf] |
| [Lesezugriff]    | [Bestätigte Referenz]      | [Verfahren]         | [Zielgruppe]   | [BP-002 Bereichslesezugriff](#731-berechtigungsprofile)    | [Instanz / Bereich] | Offen      | [Klärungsbedarf] |

Gruppen erhalten die für ihren Geltungsbereich eingerichteten Profile. Einzelrechte werden über die darin enthaltenen technischen Rollen vergeben. Gesamtadministration gehört nicht automatisch zur regulären Administrationsgruppe.

#### 7.2.2 Übernahme und Entzug

Die Übernahmeregeln bestimmen, wie Mitgliedschaften aktualisiert und Berechtigungen entzogen werden.

[Übernahme, Aktualisierung und Entzug von Mitgliedschaften sowie Auswirkungen auf bestehende Sitzungen festlegen. Konkrete Gruppennamen und Verzeichnisstrukturen nur aus bestätigten Angaben übernehmen.]

### 7.3 Rollen und Berechtigungen

Das Berechtigungsmodell trennt die Zuordnung von Personen, die Berechtigungsprofile und die technischen Zugriffsrechte. Ein Profil enthält eine oder mehrere technische Rollen; jede technische Rolle definiert konkrete Rechte innerhalb eines festgelegten Geltungsbereichs.

**Zuordnung:** Benutzer → Gruppe → Berechtigungsprofil → technische Rollen → konkrete Berechtigungen.

#### 7.3.1 Berechtigungsprofile

Die Profile beschreiben zusammengehörige Aufgaben und verweisen auf die dafür benötigten technischen Rollen. Die folgenden Zeilen sind ein anpassbares Muster, keine bereits erteilte Berechtigungsfreigabe.

| **ID** | **Berechtigungsprofil** | **Aufgabe**                                                              | **Technische Rollen**                                     |
| ------ | ----------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------- |
| BP-001 | Bereichsadministration  | Objekte und Konfiguration im ausdrücklich zugeordneten Bereich verwalten | [TR-001, TR-002, TR-003](#732-technische-rollenzuweisung) |
| BP-002 | Bereichslesezugriff     | Vereinbarte Informationen im zugeordneten Bereich einsehen               | [TR-001](#732-technische-rollenzuweisung)                 |
| BP-003 | Gesamtadministration    | Ausdrücklich autorisierte Verwaltung der gesamten Lösung                 | [TR-004](#732-technische-rollenzuweisung)                 |

[Nicht benötigte Profile und Rechtepakete entfernen; zusätzliche Profile aus den tatsächlichen Aufgaben ableiten. Jedes Profil an den bestätigten Instanz- und Bereichsumfang binden. Fachliche Anwendungsprofile getrennt von administrativen Profilen definieren. Bestehende Namenskonzepte übernehmen; die BP- und TR-Kennungen dienen der Dokumentation.]

#### 7.3.2 Technische Rollenzuweisung

Der Katalog beschreibt die konkreten Rechtepakete, aus denen die Profile bestehen. Die Produktrollen, zulässigen Aktionen und Grenzen werden gegen die tatsächlich eingesetzte Version geprüft.

| **ID** | **Technische Rolle**          | **Produktrollen / konkrete Berechtigungen**                  | **Geltungsbereich**                             |
| ------ | ----------------------------- | ------------------------------------------------------------ | ----------------------------------------------- |
| TR-001 | Lesen                         | [Bestätigte Produktrollen für die benötigten Lesefunktionen] | [Instanz und ausdrücklich zugeordneter Bereich] |
| TR-002 | Objekte verwalten             | [Bestätigte Produktrollen und zulässige Verwaltungsaktionen] | [Instanz und ausdrücklich zugeordneter Bereich] |
| TR-003 | Konfiguration verwalten       | [Bestätigte Produktrollen für die vereinbarte Konfiguration] | [Instanz und ausdrücklich zugeordneter Bereich] |
| TR-004 | Gesamte Lösung administrieren | [Gesondert freigegebene privilegierte Produktrollen]         | [Gesamte Lösung / Instanz]                      |

Profile werden über die vom Produkt unterstützte Rollenbündelung umgesetzt, beispielsweise zusammengesetzte Rollen. Je technischer Rolle werden die tatsächlichen Produktrollen einschließlich ihres Verwaltungsbereichs dokumentiert. Unterstützt das Produkt keine Rollenbündelung, wird dieselbe Zuordnung mit dem verfügbaren Verfahren nachvollziehbar abgebildet.

**Beispiel:** Eine Lesegruppe erhält BP-002 für einen benannten Bereich. BP-002 enthält TR-001. Dessen bestätigte Produktrollen erlauben ausschließlich die dokumentierten Lesefunktionen dieses Bereichs.

Breite Produktrollen können zusätzliche Verwaltungs- oder Vergaberechte enthalten. Die wirksamen Berechtigungen einschließlich enthaltener Rollen werden geprüft; eine Rollenbezeichnung allein belegt keine ausreichende Begrenzung.

#### 7.3.3 Zuweisung und Berechtigungsprüfung

Die Prüfung bewertet die wirksamen Rechte aus Gruppen, Profilen und enthaltenen technischen Rollen.

| **Regel**                        | **Umsetzung und Prüfung**                                                                                                                                                                              |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Gruppenbasierte Vergabe          | Gruppen erhalten Profile; direkte Benutzerzuweisungen bleiben begründete und dokumentierte Ausnahmen.                                                                                                  |
| Begrenzter Geltungsbereich       | Instanz, Bereich, Produktrollen und zulässige Aktionen je Zuordnung festhalten und prüfen.                                                                                                             |
| Getrennte privilegierte Zugriffe | Gesamtadministration und besonders weitreichende Funktionen gesondert vergeben.                                                                                                                        |
| Effektive Rechte                 | Verschachtelte Rollen, direkte Zuweisungen und Mehrfachmitgliedschaften gemeinsam prüfen. Eine zusätzliche Leserolle hebt Verwaltungsrechte nicht auf.                                                 |
| Wirksamer Entzug                 | Gruppenentfernung und Kontosperre einschließlich bestehender Sitzungen und zulässiger Verzögerungen prüfen.                                                                                            |
| Positive und negative Tests      | Erlaubte Aktionen funktionieren; Änderungen durch Leserollen und Zugriffe außerhalb des zugeordneten Bereichs werden abgewiesen. Ohne passende Zuordnung werden keine administrativen Rechte vergeben. |

Der unabhängige lokale Notfallzugang folgt [Abschnitt 7.5](#75-administrativer-notfallzugang) und wird nicht automatisch über reguläre Gruppenprofile vergeben. Organisatorische Zuständigkeiten und Kontotypen begründen allein keine Produktberechtigung.

[Prüffälle mit repräsentativen Testidentitäten und tatsächlichen Ergebnissen in [Kapitel 11](#11-prüfung-und-qualitätssicherung) verknüpfen. Die Dokumentation des Modells von seiner Freigabe, technischen Einrichtung und Prüfung unterscheiden.]

### 7.4 Konten und Zuständigkeiten

Technische Konten werden nach ihrem Zweck und den tatsächlich benötigten Rechten zugeordnet.

| **Konto / Bereich** | **Instanz / Geltungsbereich**                       | **Zweck** | **Verantwortung** | **Status** | **Kommentar**                 |
| ------------------- | --------------------------------------------------- | --------- | ----------------- | ---------- | ----------------------------- |
| [Konto]             | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Aufgabe] | [Rolle]           | Offen      | [Rechte / Verwaltungsbereich] |

[Einrichtung, Änderung und Entzug nach bestehenden IAM-Prozessen behandeln. Zugangsdaten ausschließlich über den vereinbarten geschützten Bereitstellungsweg verwalten.]

### 7.5 Administrativer Notfallzugang

[Bedarf, unabhängigen Zugang, Verwahrung, Rotation und Funktionstest festlegen. Ersteinrichtung und dauerhaft verwahrten Notfallzugang unterscheiden; keine produktspezifische Kontenart voraussetzen.]

## 08 Observability

Observability macht den Zustand und das Verhalten einer Lösung nachvollziehbar. Monitoring, Logging und Alarmierung unterstützen die Früherkennung, Diagnose und Bearbeitung von Störungen.

### 8.1 Überblick und Zuständigkeiten

Die Übersicht trennt die Bereitstellung von Prüfmöglichkeiten von der tatsächlichen Betriebsanbindung.

| **Bereich** | **Instanz / Geltungsbereich**                       | **Umfang**                                      | **Verantwortung** | **Status** | **Kommentar** |
| ----------- | --------------------------------------------------- | ----------------------------------------------- | ----------------- | ---------- | ------------- |
| Monitoring  | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Prüfmöglichkeiten / vereinbarte Einbindung]    | [Rolle]           | Offen      | [Umfang]      |
| Logging     | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Lokale Protokolle / vereinbarte Weiterleitung] | [Rolle]           | Offen      | [Umfang]      |
| Alarmierung | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Empfänger und Bearbeitung]                     | [Rolle]           | Offen      | [Umfang]      |

### 8.2 Überwachungskonzept

Das zuständige Betriebsteam legt Verfahren, Zugriffswege und Bewertung fest.

| **Thema**   | **Instanz / Geltungsbereich**                       | **Vorgabe / Klärungsbedarf**                      | **Status** | **Kommentar** |
| ----------- | --------------------------------------------------- | ------------------------------------------------- | ---------- | ------------- |
| Prüfumfang  | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Komponenten / Abhängigkeiten / Betriebszeiten]   | Offen      | [Referenz]    |
| Prüfzugriff | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Geschützter Zugangsweg / erforderliche Rechte]   | Offen      | [Referenz]    |
| Bewertung   | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Intervalle / Grenzwerte / Wartungsunterdrückung] | Offen      | [Referenz]    |

[Keine bestimmte Plattform voraussetzen. Hostüberwachung nach bestehendem Standard referenzieren. Unter Monitoring, Logging und Alarmierung jede tatsächlich betriebene Komponente einzeln bewerten; die folgenden Unterkapitel je Komponente entsprechend wiederholen und fortlaufend nummerieren.]

### 8.3 Monitoring

Die Prüfpunkte werden je Komponente mit Verfahren und Erfolgskriterium festgelegt.

#### 8.3.1 [Komponente]

Die Übersicht beschreibt die für diese Komponente benötigten Zustandsprüfungen.

| **Prüfpunkt** | **Instanz / Geltungsbereich**                       | **Verfahren / Quelle** | **Bewertung / Grenzwert** | **Status** | **Kommentar**        |
| ------------- | --------------------------------------------------- | ---------------------- | ------------------------- | ---------- | -------------------- |
| [Prüfpunkt]   | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Verfahren]            | [Erfolgskriterium]        | Offen      | [Zugriff / Nachweis] |

### 8.4 Logging

Die Protokolle unterstützen Fehleranalyse und Nachvollziehbarkeit relevanter Ereignisse.

#### 8.4.1 [Komponente]

Die Übersicht ordnet Ereignisse ihren Quellen, Ablageorten und Schutzvorgaben zu.

| **Protokoll / Ereignis** | **Instanz / Geltungsbereich**                       | **Quelle** | **Ablage / Weiterleitung**              | **Zugriff / Aufbewahrung** | **Status** | **Kommentar** |
| ------------------------ | --------------------------------------------------- | ---------- | --------------------------------------- | -------------------------- | ---------- | ------------- |
| [Ereignis]               | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Quelle]   | [Lokale Ablage / Logziel und Transport] | [Vorgabe]                  | Offen      | [Nachweis]    |

[Zentrale Weiterleitung nur im vereinbarten Umfang aufnehmen. Kennwörter, Tokens und private Schlüssel nicht protokollieren; personenbezogene Ereignisse nach geltenden Vorgaben behandeln.]

### 8.5 Alarmierung

Die Alarmierung verbindet erkannte Störungen mit den zuständigen Betriebsrollen.

#### 8.5.1 Alarmwege und Eskalation

Die Festlegungen verbinden Alarmzustellung, Bearbeitung und Eskalation.

| **Thema**                  | **Instanz / Geltungsbereich**                       | **Festlegung / Nachweis**                                 | **Verantwortung** | **Status** | **Kommentar** |
| -------------------------- | --------------------------------------------------- | --------------------------------------------------------- | ----------------- | ---------- | ------------- |
| Zustellung und Bearbeitung | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Empfänger / Betriebszeiten / Eskalationsweg / Testalarm] | [Rolle]           | Offen      | [Referenz]    |

#### 8.5.2 [Komponente]

Die Übersicht beschreibt die für diese Komponente relevanten Alarmauslöser.

| **Auslöser** | **Instanz / Geltungsbereich**                       | **Schweregrad / Schwelle** | **Zuständige Rolle** | **Status** | **Kommentar** |
| ------------ | --------------------------------------------------- | -------------------------- | -------------------- | ---------- | ------------- |
| [Störung]    | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Bewertung]                | [Rolle]              | Offen      | [Nachweis]    |

## 09 Datensicherung und Wiederherstellung

Datensicherung und Wiederherstellung schützen vor Datenverlust und ermöglichen einen geordneten Wiederanlauf. Ziele, Verfahren und Tests machen den Sicherungsumfang und die Grenzen der Wiederherstellung nachvollziehbar.

### 9.1 Sicherungsziele und Zuständigkeiten

Die Ziele bestimmen den zulässigen Datenverlust und die erwartete Dauer der Wiederherstellung.

| **Angabe**                    | **Instanz / Geltungsbereich**                       | **Festlegung**                    | **Verantwortung** | **Status** | **Kommentar** |
| ----------------------------- | --------------------------------------------------- | --------------------------------- | ----------------- | ---------- | ------------- |
| Wiederherstellungspunkt (RPO) | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Maximal zulässiger Datenverlust] | [Rolle]           | Offen      | [Bestätigung] |
| Wiederherstellungsdauer (RTO) | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Maximal zulässige Ausfallzeit]   | [Rolle]           | Offen      | [Bestätigung] |

### 9.2 Sicherungsumfang und Abhängigkeiten

Die Übersicht unterscheidet gesicherte Daten von Voraussetzungen für den Wiederaufbau.

| **Gegenstand** | **Instanz / Geltungsbereich**                       | **Verfahren / Umfang**                       | **Verantwortung** | **Grenze / Abhängigkeit**                                   |
| -------------- | --------------------------------------------------- | -------------------------------------------- | ----------------- | ----------------------------------------------------------- |
| [Datenbestand] | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Konsistente Sicherung / Wiederaufbauquelle] | [Rolle]           | [Granularität / benötigte Zugänge / manuelle Konfiguration] |

[Grenzen ausdrücklich nennen, etwa vollständiger Datenbestand statt einzelner Mandanten. Konfiguration als Code und geschützte Geheimnisbereitstellung nur bei tatsächlicher Verfügbarkeit als Wiederaufbauquelle nennen; daraus keine pauschale zusätzliche Aufgabe zur Datensicherung ableiten.]

### 9.3 Sicherungsverfahren

Die Verfahren verbinden konsistente Anwendungssicherungen mit der bestehenden Datensicherung.

#### 9.3.1 Anwendungssicherung

Die Parameter beschreiben das tatsächlich verwendete Sicherungsverfahren.

| **Parameter**                              | **Instanz / Geltungsbereich**                       | **Festlegung** | **Status** | **Kommentar**                |
| ------------------------------------------ | --------------------------------------------------- | -------------- | ---------- | ---------------------------- |
| [Verfahren / Format / Ablage / Konsistenz] | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Projektwert]  | Offen      | [Implementierung / Nachweis] |

#### 9.3.2 Übernahme in die bestehende Datensicherung

[Zuständige Rolle, Reihenfolge, Übertragung, Aufbewahrung und Schutz der unabhängigen Sicherung festhalten. Lokale Kopien oder Snapshots nicht als alleinigen Nachweis einer unabhängigen Datensicherung behandeln.]

#### 9.3.3 Überwachung und Zugriffsschutz

[Erfolg, Alter und Nutzbarkeit der Sicherung sowie Zugriff und Verschlüsselung festlegen; Überwachung mit [Kapitel 08](#08-observability) verknüpfen.]

### 9.4 Sicherungszeitplan

Die Intervalle werden aus den vereinbarten Zielen und bestehenden Backupvorgaben abgeleitet.

| **Sicherung** | **Instanz / Geltungsbereich**                       | **Intervall / Anlass** | **Zeit / Reihenfolge** | **Aufbewahrung** | **Verantwortung** | **Status** | **Kommentar** |
| ------------- | --------------------------------------------------- | ---------------------- | ---------------------- | ---------------- | ----------------- | ---------- | ------------- |
| [Sicherung]   | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Zu vereinbaren]       | [Reihenfolge]          | [Vorgabe]        | [Rolle]           | Offen      | [Bestätigung] |

### 9.5 Wiederherstellungsverfahren

Die Verfahren beschreiben Wiederherstellungsziel, Abhängigkeiten und anschließende Funktionsprüfung.

#### 9.5.1 Datenwiederherstellung

[Ziel, konsistenten Sicherungsstand, Kompatibilität, Umfang und Integritätsprüfung beschreiben. Einzelobjektwiederherstellung nur zusagen, wenn das Verfahren sie tatsächlich unterstützt.]

#### 9.5.2 Vollständiger Wiederanlauf

[Plattform, Artefakte, Konfiguration, Geheimnisse und Daten in erforderlicher Reihenfolge wiederherstellen. Funktionsprüfung und gemessene Wiederanlaufzeit dokumentieren.]

### 9.6 Wiederherstellungstests

Die Tests prüfen, ob Sicherungen und Wiederaufbauverfahren die vereinbarten Ziele erfüllen.

| **Testumfang**       | **Instanz / Geltungsbereich**                       | **Intervall / Anlass**                          | **Erfolgskriterium**           | **Verantwortung** | **Status** | **Nachweis** | **Kommentar** |
| -------------------- | --------------------------------------------------- | ----------------------------------------------- | ------------------------------ | ----------------- | ---------- | ------------ | ------------- |
| Erstprüfung          | [Kennung der Instanz / gemeinsamer Geltungsbereich] | Vor Betriebsübergabe                            | [Integrität / Funktion / Zeit] | [Rolle]           | Offen      | [Referenz]   | [Testziel]    |
| Wiederholungsprüfung | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Zu vereinbaren / nach wesentlichen Änderungen] | [Ergebnis und Dauer]           | [Rolle]           | Offen      | [Referenz]   | [Testziel]    |

## 10 Wartung und Betrieb

Die Betriebsaufgaben beschreiben die regelmäßige Pflege und den Umgang mit Änderungen und Störungen. Klare Zuständigkeiten und Verfahren unterstützen einen verlässlichen Betrieb.

### 10.1 Betriebsumfang und Zuständigkeiten

Die Übersicht grenzt Plattformaufgaben von anwendungsspezifischen Betriebsaufgaben ab.

| **Bereich** | **Instanz / Geltungsbereich**                       | **Betriebsaufgabe** | **Verantwortung** | **Status** | **Kommentar**                     |
| ----------- | --------------------------------------------------- | ------------------- | ----------------- | ---------- | --------------------------------- |
| [Bereich]   | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Aufgabe / Grenze]  | [Rolle]           | Offen      | [Referenz auf Betriebsunterlagen] |

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

Der Prüfplan ordnet die Prüfungen ihrem Zeitpunkt im Umsetzungsablauf zu. Jede betroffene Instanz erhält eine eigene Prüffallkennung sowie einen eigenen Status und Nachweis. Bestehende TEST-IDs bleiben nachvollziehbar; bei Anwendungsprüfungen wird zusätzlich der Client zugeordnet. Ein gemeinsamer Schnittstellentest kann denselben Ablauf und Nachweis referenzieren, wenn beide Instanzen darin ausdrücklich bewertet sind.

#### 11.2.1 Installationsbereitschaft

Vor der Installation werden Plattform, Zugänge, Installationskonfiguration und Artefakte geprüft. Die konkreten Aufrufe aus [Kapitel 5.2](#52-produktinstallation) werden hier referenziert; die Ergebnisse stehen in [Kapitel 11.3](#113-prüfergebnisse-und-nachweise).

#### 11.2.2 Installationsprüfung

Nach der Installation werden die technische Funktion, Persistenz, Zugriffsbeschränkungen und die unveränderte Wiederholung des Aufbaus geprüft.

| **ID**     | **Instanz** | **Prüfung**                         | **Erwartetes Ergebnis**      | **Status** | **Kommentar**   | **Nachweis** |
| ---------- | ----------- | ----------------------------------- | ---------------------------- | ---------- | --------------- | ------------ |
| TEST-001-A | A           | [Technischer Prüffall / Zielsystem] | [Messbares Erfolgskriterium] | Offen      | [Voraussetzung] | [Referenz]   |
| TEST-001-B | B           | [Technischer Prüffall / Zielsystem] | [Messbares Erfolgskriterium] | Offen      | [Voraussetzung] | [Referenz]   |

#### 11.2.3 Integrationsprüfung

Nach der Konfiguration werden die vorgesehenen Schnittstellen, Identitätsquellen, Berechtigungen und repräsentativen Anwendungsabläufe geprüft.

| **ID**     | **Instanz** | **Prüfung**                       | **Erwartetes Ergebnis**      | **Status** | **Kommentar**   | **Nachweis** |
| ---------- | ----------- | --------------------------------- | ---------------------------- | ---------- | --------------- | ------------ |
| TEST-002-A | A           | [Integrationsprüfung / Anwendung] | [Messbares Erfolgskriterium] | Offen      | [Voraussetzung] | [Referenz]   |
| TEST-002-B | B           | [Integrationsprüfung / Anwendung] | [Messbares Erfolgskriterium] | Offen      | [Voraussetzung] | [Referenz]   |

#### 11.2.4 Betriebsbereitschaft

Vor der Betriebsübergabe werden die vereinbarten Betriebsverfahren einschließlich Überwachung, Protokollierung, Alarmierung und Wiederherstellung geprüft.

| **ID**     | **Instanz** | **Prüfung**                         | **Erwartetes Ergebnis**      | **Status** | **Kommentar**   | **Nachweis** |
| ---------- | ----------- | ----------------------------------- | ---------------------------- | ---------- | --------------- | ------------ |
| TEST-003-A | A           | [Betriebsverfahren / Notfallzugang] | [Messbares Erfolgskriterium] | Offen      | [Voraussetzung] | [Referenz]   |
| TEST-003-B | B           | [Betriebsverfahren / Notfallzugang] | [Messbares Erfolgskriterium] | Offen      | [Voraussetzung] | [Referenz]   |

#### 11.2.5 Abschlussprüfung

Vor der Abnahme werden die Ergebnisse für den vollständigen vereinbarten Umfang zusammengeführt. Änderungen seit einer Prüfung erfordern die Wiederholung der betroffenen Prüffälle; bereits gültige Nachweise werden verlinkt.

| **ID**     | **Instanz** | **Prüfung**                               | **Erwartetes Ergebnis**      | **Status** | **Kommentar**   | **Nachweis** |
| ---------- | ----------- | ----------------------------------------- | ---------------------------- | ---------- | --------------- | ------------ |
| TEST-004-A | A           | [Gesamtumfang / abschließende Umstellung] | [Messbares Erfolgskriterium] | Offen      | [Voraussetzung] | [Referenz]   |
| TEST-004-B | B           | [Gesamtumfang / abschließende Umstellung] | [Messbares Erfolgskriterium] | Offen      | [Voraussetzung] | [Referenz]   |

[Nicht benötigte Prüffälle begründet entfernen. Die Abschlussprüfung ersetzt keine formelle Abnahme gemäß [Kapitel 14](#14-abschluss-und-abnahme).]

### 11.3 Prüfergebnisse und Nachweise

Ausführungs- und Prüfergebnisse werden einmalig dem tatsächlich verwendeten Stand und Ziel zugeordnet. Die Übersicht beschreibt die benötigten Nachweisangaben; bereinigte Detailprotokolle werden verlinkt.

| **Nachweisangabe**      | **Inhalt**                                                                                                                                                           |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Zuordnung               | [Lauf-ID / Phase ID, Instanz, Zielsystem, instanzbezogene REQ- und TEST-IDs sowie gegebenenfalls Realm / Anwendung / Client]                                         |
| Durchführung            | [Beginn / Ende / Zeitzone und ausführende Rolle gemäß [Kapitel 1.3](#13-ansprechpartner)]                                                                            |
| Ausführungsstand        | [Vollständige Quellrevisionen, Paketprüfsummen, tatsächlicher EE-Digest und unveränderliche Inventar-/Konfigurationsreferenz; nicht anwendbare Angaben kennzeichnen] |
| Ausführung              | [Tatsächlicher Befehl oder manuelle Schritte ohne Geheimniswerte]                                                                                                    |
| Ergebnis                | [Soll-/Ist-Vergleich, Recap, Funktions- und Wiederholungsprüfung]                                                                                                    |
| Nachweis und Abweichung | [Geschützter Ablageverweis und stabile Abweichungs-ID oder ausdrücklich keine Abweichung]                                                                            |

[Istwerte in den zuständigen Fachkapiteln pflegen. Ein Testlauf aus einer anderen Umgebung belegt keine Ausführung auf dem Zielsystem.]

### 11.4 Abweichungen und Wiederholungsprüfungen

[Fehler, Auswirkung, Korrektur und betroffene Wiederholungsprüfungen nachvollziehbar verknüpfen. Ausstehende Entscheidungen in [Kapitel 12](#12-projektstatus) führen; abhängige Arbeiten bei einem relevanten Fehlschlag anhalten.]

## 12 Projektstatus

Der Projektstatus bündelt offene Fragen und getroffene Entscheidungen. Die Übersicht macht Zuständigkeiten und Auswirkungen sichtbar und verweist bei Bedarf auf die zugehörigen Vorgänge.

### 12.1 Offene Punkte

Die Liste bündelt fehlende Angaben, ausstehende Entscheidungen und Aufgaben. Bestätigte Ergebnisse werden in die zugehörigen Fachkapitel übernommen; Anforderungen, Meilensteine und Prüfergebnisse werden verlinkt.

| **ID**   | **Instanz / Geltungsbereich**                       | **Thema**            | **Klärungsbedarf**  | **Verantwortung** | **Status** | **Vorgang**                                      | **Kommentar**                    |
| -------- | --------------------------------------------------- | -------------------- | ------------------- | ----------------- | ---------- | ------------------------------------------------ | -------------------------------- |
| OPEN-001 | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Thema / Abweichung] | [Zu klärende Frage] | [Rolle]           | Offen      | [Jira / gleichwertiger Vorgang, falls vorhanden] | [Auswirkung / benötigter Termin] |

[Konkrete Folgearbeiten im verlinkten Vorgang pflegen, statt eine zweite Aufgabenliste mit nächsten Schritten aufzubauen. Projektfortschritt und Termine bleiben in den Meilensteinen aus [Abschnitt 4.2](#42-meilensteine-und-termine); keine zusätzliche Tabelle „Umsetzungsstand“ pflegen. Ohne Vorgang die notwendige Behandlung hier knapp dokumentieren. Bestehende IDs erhalten.]

### 12.2 Entscheidungen

Die Übersicht hält wesentliche Entscheidungen mit ihrer tatsächlichen Referenz fest.

| **ID / Bezug** | **Instanz / Geltungsbereich**                       | **Entscheidung**            | **Datum** | **Zuständige Rolle** | **Vorgang / Nachweis** |
| -------------- | --------------------------------------------------- | --------------------------- | --------- | -------------------- | ---------------------- |
| [Referenz]     | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Tatsächliche Entscheidung] | [Datum]   | [Rolle]              | [Referenz]             |

## 13 Betriebsübergabe

Die Betriebsübergabe überführt die bereitgestellte Lösung in die vereinbarten Betriebszuständigkeiten. Dokumentation, Einweisung und Übergabenachweise sichern das erforderliche Wissen und die Übernahme der Aufgaben.

### 13.1 Übergabeumfang

Die Übersicht hält je Instanz fest, welche Ergebnisse tatsächlich übernommen wurden. Der Nachweis nennt Datum, bestätigende Rolle und Referenz. Ein gemeinsamer Dokumentstand ersetzt keine getrennte Bestätigung der instanzbezogenen Aufgabenübernahme.

| **Übergabegegenstand**   | **Instanz** | **Übergabekriterium**                                        | **Übernahmestatus** | **Nachweis**                                                          |
| ------------------------ | ----------- | ------------------------------------------------------------ | ------------------- | --------------------------------------------------------------------- |
| Technische Dokumentation | A           | [Vereinbarter Dokumentstand und Bereitstellungsweg]          | Nicht übernommen    | [Bei Übernahme: Datum, Rolle und Referenz auf die übergebene Fassung] |
| Technische Dokumentation | B           | [Vereinbarter Dokumentstand und Bereitstellungsweg]          | Nicht übernommen    | [Bei Übernahme: Datum, Rolle und Referenz auf die übergebene Fassung] |
| Betriebsverfahren        | A           | [Vereinbarte Verfahren und Aufgaben erläutert und übergeben] | Nicht übernommen    | [Bei Übernahme: Datum, Rolle und Referenz]                            |
| Betriebsverfahren        | B           | [Vereinbarte Verfahren und Aufgaben erläutert und übergeben] | Nicht übernommen    | [Bei Übernahme: Datum, Rolle und Referenz]                            |

[„Übernommen“ nur bei belegter Bestätigung verwenden. Vorbereitungsaufgaben in [Kapitel 12](#12-projektstatus) führen. Keine zusätzliche Offline-Lieferung oder Pflegeverpflichtung ohne vereinbarten Umfang ableiten.]

### 13.2 Zugänge und Administration

Die Übersicht bündelt administrative Zugänge und das vereinbarte geschützte Abrufverfahren. [Kapitel 05](#05-installation-und-konfiguration) verweist hierher; Kontakte werden in [Abschnitt 1.3](#13-ansprechpartner) gepflegt.

#### 13.2.1 Administrative Zugänge

Die Angaben beschreiben bestätigte Endpunkte, berechtigte Rollen und den Zugangsstatus je Instanz.

| **Angabe**              | **Instanz / Geltungsbereich**                       | **Zielsystem / Bereich**                   | **Status** | **Kommentar**                               |
| ----------------------- | --------------------------------------------------- | ------------------------------------------ | ---------- | ------------------------------------------- |
| Administrationsendpunkt | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Bestätigte Adresse / Port]                | Offen      | [Zugriffsgrenze]                            |
| Konto / Rolle           | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Referenz]                                 | Offen      | [Anmeldeverfahren / geprüfte Hostidentität] |
| Betriebsrolle           | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Zuordnung gemäß 1.3](#13-ansprechpartner) | Offen      | [Übernahmestand]                            |

#### 13.2.2 Geheimnisbereitstellung

[Geschützte Quelle, Variablenreferenzen, Abrufverfahren und zugriffsberechtigte Rolle dokumentieren. Bei Ansible Vault ausschließlich verschlüsselte Vault-Dateien übernehmen. Passwörter, private Schlüssel und abgerufene Werte nicht speichern; lokale Testzugänge getrennt halten.]

Prüfung und Übergabe der benötigten Zugänge werden mit Datum, Rolle und Nachweis festgehalten. Geheimnisse werden nicht protokolliert.

#### 13.2.3 Zugänge zu den Bestandsinstanzen

Die Zugänge zu Migrationsquellen werden von denen der Zielsysteme getrennt erfasst und der jeweiligen Bestands- und Zielinstanz zugeordnet. Benötigt werden die für die vereinbarte Übernahme erforderlichen Anwendungszugänge und Berechtigungen.

| **Bestandsinstanz / Bereich** | **Anwendungszugang**               | **Berechtigung / geschützte Kontoreferenz** | **Status** | **Nachweis**     |
| ----------------------------- | ---------------------------------- | ------------------------------------------- | ---------- | ---------------- |
| [Migrationsquelle]            | [Bestätigter Endpunkt / Verfahren] | [Benötigter Umfang und geschützte Referenz] | Offen      | [Zugangsprüfung] |

[Nur bei Migration verwenden. Nicht benötigte SSH-, Betriebssystem- oder Datenbankzugriffe als nicht erforderlich kennzeichnen; der Anwendungszugang allein belegt noch keinen erfolgreichen vollständigen Datenexport. Das Übernahmeverfahren in [Kapitel 5.4](#54-migration-und-übernahme) prüfen.]

### 13.3 Einweisung

Die Einweisung vermittelt den zuständigen Betriebsteams die für ihre Aufgaben benötigten Verfahren.

| **Thema** | **Instanz / Geltungsbereich**                       | **Inhalt**                    | **Beteiligte Rollen** | **Status** | **Kommentar / Nachweis** |
| --------- | --------------------------------------------------- | ----------------------------- | --------------------- | ---------- | ------------------------ |
| [Thema]   | [Kennung der Instanz / gemeinsamer Geltungsbereich] | [Betriebsaufgabe / Verfahren] | [Rollen]              | Offen      | [Termin / Durchführung]  |

### 13.4 Betriebsübernahme und Nachweis

Die Übernahme wird je Instanz bei der tatsächlichen Übergabe mit Datum, Beteiligten, Status und Nachweis dokumentiert. Eine gemeinsame Einweisung kann beide Instanzen abdecken; die tatsächliche Aufgabenübernahme wird getrennt bestätigt.

| **Instanz** | **Datum**                    | **Übernehmende Rolle** | **Übernahmeumfang**   | **Übernahmestatus** | **Nachweis**             | **Restpunkte / Referenz** |
| ----------- | ---------------------------- | ---------------------- | --------------------- | ------------------- | ------------------------ | ------------------------- |
| A           | [Bei tatsächlicher Übergabe] | [Rolle]                | [Bestätigte Aufgaben] | Nicht übernommen    | [Bestätigung / Referenz] | [Restpunkte]              |
| B           | [Bei tatsächlicher Übergabe] | [Rolle]                | [Bestätigte Aufgaben] | Nicht übernommen    | [Bestätigung / Referenz] | [Restpunkte]              |

[Zugangsprüfung, Einweisung, Aufgabenübernahme und formelle Abnahme unterscheiden. Die bloße Ablage von Unterlagen ist keine Betriebsübernahme.]

## 14 Abschluss und Abnahme

Der Projektabschluss stellt den vereinbarten Umfang den erbrachten Leistungen und Prüfergebnissen gegenüber. Die Abnahme hält die Entscheidung der zuständigen Rolle sowie mögliche Restpunkte und Bedingungen fest.

### 14.1 Abnahmestand

Eine Abschlussentscheidung benennt Instanz beziehungsweise gemeinsamen Geltungsbereich, Datum, zuständige Rolle, Ergebnis und Referenz. Inhaltliche Dokumentbestätigung ist keine technische Projektabnahme. Die Abnahme einer Instanz gilt nicht für eine andere; die Projektabnahme führt die Ergebnisse je Instanz und gemeinsamen Projektanforderungen zusammen.

| **Instanz / Geltungsbereich** | **Datum**                   | **Rolle** | **Entscheidung** | **Status**       | **Nachweis**                    | **Restpunkte / Referenz** |
| ----------------------------- | --------------------------- | --------- | ---------------- | ---------------- | ------------------------------- | ------------------------- |
| A                             | [Bei Entscheidung ergänzen] | [Rolle]   | Ausstehend       | Nicht abgenommen | [Entscheidungsreferenz]         | [Restpunkte]              |
| B                             | [Bei Entscheidung ergänzen] | [Rolle]   | Ausstehend       | Nicht abgenommen | [Entscheidungsreferenz]         | [Restpunkte]              |
| Projektweit                   | [Bei Entscheidung ergänzen] | [Rolle]   | Ausstehend       | Nicht abgenommen | [Gesamtentscheidung / Referenz] | [Gemeinsame Restpunkte]   |

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

Ausgeführte Arbeiten und Prüfungen werden je Zielsystem mit Datum, zuständiger Rolle und Ergebnis in [Kapitel 11.3](#113-prüfergebnisse-und-nachweise) dokumentiert. Zugehörige Protokolle liegen in [geschützte Projektablage / Zugriff durch zuständige Rollen]. Geheimnisse und personenbezogene Rohlogs werden nicht in die Dokumentation übernommen.

[Den tatsächlichen Prüfstand knapp benennen und Testumgebung von produktiver Ausführung unterscheiden. Für ergänzende technische Nachweise Ablageverweis, Klassifikation, Integrität, zuständige Rolle sowie vereinbarte Aufbewahrung und Löschung angeben oder auf die bestehende Regelung verweisen. Offene Festlegungen kennzeichnen.]

### 15.3 Änderungshistorie

Die bisherigen Arbeitsversionen sind zum ersten Entwurf für die Weitergabe zusammengefasst. Künftig werden nur wesentliche Änderungen an weitergegebenen Fassungen aufgenommen; neue Versionsnummern allein bedeuten keine Freigabe.

| **Version**                | **Datum** | **Änderung**                                                                                                                                                                             |
| -------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Aktuelle Entwurfsversion] | [Datum]   | Initialer Entwurf für die Projektabstimmung: Projektauftrag, Architektur, Voraussetzungen, Umsetzung, Prüfung und Übergabe. [Vorhandene Arbeitsfassungen bei Bedarf als Bereich nennen.] |
