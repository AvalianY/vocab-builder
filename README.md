<div align="center">

# VocabBuilder

### Eine responsive React-Anwendung zum Aufbau und Trainieren des englischen Wortschatzes

[![React](https://img.shields.io/badge/React-19-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](https://developer.mozilla.org/de/docs/Web/JavaScript)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?logo=reacthookform&logoColor=white)](https://react-hook-form.com/)

[Deutsch](README.md) · [Українська](README.uk.md) · [English](README.en.md)

[Repository](https://github.com/AvalianY/vocab-builder)

</div>

## Inhaltsverzeichnis

- [Über das Projekt](#über-das-projekt)
- [Funktionen](#funktionen)
- [Seiten und Routen](#seiten-und-routen)
- [Technologien](#technologien)
- [Architektur und Datenfluss](#architektur-und-datenfluss)
- [Projektstruktur](#projektstruktur)
- [Installation und Start](#installation-und-start)
- [Umgebungsvariable](#umgebungsvariable)
- [Verfügbare Skripte](#verfügbare-skripte)
- [Projektressourcen](#projektressourcen)
- [Autor](#autor)

## Über das Projekt

**VocabBuilder** ist eine Single-Page-Anwendung zum Aufbau eines persönlichen englisch-ukrainischen Wortschatzes und zum anschließenden Training der gespeicherten Wörter.

Nutzer können sich registrieren und anmelden, eigene Wörter verwalten, Empfehlungen durchsuchen, Wörter nach Kategorien filtern und in einer separaten Trainingsansicht wiederholen. Die Anwendung verwendet eine REST API, geschützte Routen und serverseitige Pagination.

Das Interface wurde auf Basis eines Figma-Designs umgesetzt und ist für Mobile, Tablet und Desktop optimiert.

## Funktionen

- Registrierung, Login, Logout und Wiederherstellung der Sitzung
- geschützte private Routen
- persönliches Wörterbuch mit:
  - Suche mit 300-ms-Debounce
  - Kategorie-Filterung
  - Unterscheidung zwischen regelmäßigen und unregelmäßigen Verben
  - serverseitiger Pagination
  - Fortschrittsanzeige pro Wort
  - Hinzufügen, Bearbeiten und Löschen von Wörtern
- Empfehlungsseite mit:
  - Suche und Filterung
  - serverseitiger Pagination
  - Hinzufügen empfohlener Wörter zum eigenen Wörterbuch
- Trainingsmodus mit:
  - Aufgaben aus der API
  - dynamischer Fortschrittsanzeige
  - Eingabe von Übersetzungen
  - Speicherung der Antworten
  - Ergebnisübersicht mit richtigen Antworten und Fehlern
  - leerem Zustand, wenn aktuell keine Wörter zum Trainieren vorhanden sind
- wiederverwendbare Dashboard-, Tabellen-, Pagination-, Modal- und Progress-Komponenten
- eigenes Notification-/Toast-System für Backend-Fehler
- Formularvalidierung mit React Hook Form und Yup
- gemeinsamer SVG-Sprite mit wiederverwendbarer `Icon`-Komponente
- responsive Navigation mit Burger-Menü auf kleineren Viewports
- Fixel Display als lokaler Projektschrift
- responsive Layouts für 320 px, 375 px, 768 px und 1440 px

## Seiten und Routen

### `/register`

Registrierung eines neuen Nutzers mit Formularvalidierung und Passwort-Sichtbarkeit.

### `/login`

Anmeldung, Session-Wiederherstellung und Weiterleitung in den geschützten Anwendungsbereich.

### `/dictionary`

Persönliches Wörterbuch mit Suche, Filtern, Statistik, Tabelle, Pagination und vollständigen CRUD-Aktionen.

### `/recommend`

Empfohlene Wörter aus der API mit Filtern, Pagination und direktem Hinzufügen zum eigenen Wörterbuch.

### `/training`

Trainingsansicht für gespeicherte Wörter mit Fortschritt, Antworterfassung und Ergebnis-Modal.

## Technologien

- **React 19** — komponentenbasierte Benutzeroberfläche
- **JavaScript** — Anwendungslogik
- **Vite 8** — Entwicklungsserver und Production Build
- **Redux Toolkit** — globaler Zustand
- **RTK Query** — API-Anfragen, Caching und Cache-Invalidierung
- **React Redux** — Verbindung zwischen React und Redux Store
- **React Router** — Routing und geschützte Routen
- **React Hook Form** — Formularzustand und Formularverarbeitung
- **Yup** — Validierungsschemata
- **TanStack React Table** — Tabellenlogik
- **CSS3** — Layout, Responsive Design und Komponentenstile
- **SVG Sprite** — zentrale Verwaltung wiederverwendbarer Icons
- **ESLint** — statische Codeanalyse
- **REST API** — Authentifizierung, Wörter, Empfehlungen, Statistik und Training
- **Git und GitHub** — Versionskontrolle

## Architektur und Datenfluss

Die Anwendung verwendet einen gemeinsamen RTK-Query-API-Layer. Private Requests erhalten automatisch den aktuellen Bearer Token aus dem Session-State.

Die API-Endpunkte für Authentifizierung und Wörter werden über `baseApi.injectEndpoints()` erweitert. Dadurch bleiben Authentifizierung, Caching und Cache-Invalidierung zentral organisiert.

Wichtige Datenbereiche:

- **Session State** — Nutzer, Access Token und Status der Session-Wiederherstellung
- **OwnWords** — persönliches Wörterbuch
- **RecommendedWords** — empfohlene Wörter
- **Statistics** — Anzahl der Wörter im Wörterbuch
- **TrainingTasks** — aktuell verfügbare Trainingsaufgaben

Mutationen wie Hinzufügen, Bearbeiten, Löschen und das Absenden von Trainingsergebnissen invalidieren die zugehörigen Cache-Tags, sodass abhängige Daten automatisch aktualisiert werden.

## Projektstruktur

```text
vocab-builder/
├── scripts/
│   └── verify-icons.mjs
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── icons/
│   │   │   └── icons.svg
│   │   └── images/
│   ├── components/
│   │   ├── Brand/
│   │   ├── CategorySelect/
│   │   ├── Dashboard/
│   │   ├── Header/
│   │   ├── Icon/
│   │   ├── Modal/
│   │   ├── Notification/
│   │   ├── Pagination/
│   │   ├── PasswordField/
│   │   ├── ProgressBar/
│   │   ├── VerbTypeOptions/
│   │   └── WordsTable/
│   ├── features/
│   │   ├── auth/
│   │   ├── dictionary/
│   │   └── training/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   │   ├── DictionaryPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RecommendPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── TrainingPage.jsx
│   ├── redux/
│   │   ├── sessionSlice.js
│   │   └── store.js
│   ├── routes/
│   ├── services/
│   │   └── api/
│   │       ├── authApi.js
│   │       ├── baseApi.js
│   │       └── wordsApi.js
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── eslint.config.js
├── package.json
└── vite.config.js
```

## Installation und Start

### Voraussetzungen

- [Node.js](https://nodejs.org/) LTS
- npm
- Git

### Lokale Installation

```bash
git clone https://github.com/AvalianY/vocab-builder.git
cd vocab-builder
npm install
```

Erstelle anschließend eine lokale Umgebungsdatei:

```bash
cp .env.example .env
```

Unter Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Starte den Entwicklungsserver:

```bash
npm run dev
```

Vite zeigt anschließend die lokale Entwicklungsadresse im Terminal an, normalerweise:

```text
http://localhost:5173
```

## Umgebungsvariable

Die Backend-Adresse wird über folgende Vite-Variable konfiguriert:

```env
VITE_API_BASE_URL=https://vocab-builder-backend.p.goit.global/api
```

Die Beispielkonfiguration befindet sich in `.env.example`.

## Verfügbare Skripte

```bash
npm run dev
```

Startet den lokalen Entwicklungsserver.

```bash
npm run build
```

Erstellt den optimierten Production Build.

```bash
npm run preview
```

Startet eine lokale Vorschau des Production Builds.

```bash
npm run lint
```

Prüft den Quellcode mit ESLint.

```bash
npm run verify:icons
```

Prüft den SVG-Sprite und die registrierten Icon-IDs.

```bash
npm run check
```

Führt nacheinander Linting, Icon-Prüfung und Production Build aus.

## Projektressourcen

- [Figma Design](https://www.figma.com/design/MbABlCaTJXxoER9D1cuyUO/VocabBuilder--Copy-?node-id=0-1)
- [Backend Swagger](https://vocab-builder-backend.p.goit.global/api-docs/)
- [Technische Aufgabenbeschreibung](https://docs.google.com/spreadsheets/d/15zCxbWA7ubDmFzjmzzXe6ysiHVMd4iD2PcZ7ilN2gRc/edit?gid=1060862504)

## Autor

**Erik Avalian**

GitHub: [@AvalianY](https://github.com/AvalianY)

---

<div align="center">

Entwickelt als React-Projekt mit Fokus auf Authentifizierung, serverseitige Datenverwaltung, wiederverwendbare Komponenten und responsives UI.

</div>
