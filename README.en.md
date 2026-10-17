<div align="center">

# VocabBuilder

### A responsive React application for building and training an English vocabulary

[![React](https://img.shields.io/badge/React-19-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](https://developer.mozilla.org/docs/Web/JavaScript)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?logo=reacthookform&logoColor=white)](https://react-hook-form.com/)

[Deutsch](README.md) · [Українська](README.uk.md) · [English](README.en.md)

[Repository](https://github.com/AvalianY/vocab-builder)

</div>

## Table of contents

- [About the project](#about-the-project)
- [Features](#features)
- [Pages and routes](#pages-and-routes)
- [Technologies](#technologies)
- [Architecture and data flow](#architecture-and-data-flow)
- [Project structure](#project-structure)
- [Installation and setup](#installation-and-setup)
- [Environment variable](#environment-variable)
- [Available scripts](#available-scripts)
- [Project resources](#project-resources)
- [Author](#author)

## About the project

**VocabBuilder** is a Single-Page Application for creating a personal English-Ukrainian vocabulary and training the saved words afterwards.

Users can register and sign in, manage their own dictionary, browse recommended words, filter words by category, and complete training sessions in a dedicated interface. The application uses a REST API, protected routes, and server-side pagination.

The UI was implemented from a Figma design and is optimized for mobile, tablet, and desktop layouts.

## Features

- registration, login, logout, and session restoration
- protected private routes
- personal dictionary with:
  - search with a 300 ms debounce
  - category filtering
  - regular / irregular verb filtering
  - server-side pagination
  - progress display for each word
  - create, edit, and delete operations
- recommendation page with:
  - search and filtering
  - server-side pagination
  - adding recommended words to the personal dictionary
- training mode with:
  - tasks loaded from the API
  - dynamic progress tracking
  - translation input
  - answer submission
  - result summary for correct answers and mistakes
  - empty state when there are no words available for training
- reusable Dashboard, Table, Pagination, Modal, and Progress components
- custom Notification / Toast layer for backend errors
- form validation with React Hook Form and Yup
- shared SVG sprite with a reusable `Icon` component
- responsive navigation with a burger menu on smaller viewports
- local Fixel Display font
- responsive layouts for 320 px, 375 px, 768 px, and 1440 px

## Pages and routes

### `/register`

Creates a new account with form validation and password visibility control.

### `/login`

Handles authentication, session restoration, and navigation to the protected application area.

### `/dictionary`

Personal dictionary with search, filters, statistics, table view, pagination, and full CRUD actions.

### `/recommend`

Recommended words from the API with filters, pagination, and direct addition to the personal dictionary.

### `/training`

Training interface for saved words with progress tracking, answer input, and a final results modal.

## Technologies

- **React 19** — component-based user interface
- **JavaScript** — application logic
- **Vite 8** — development server and production build
- **Redux Toolkit** — global state management
- **RTK Query** — API requests, caching, and cache invalidation
- **React Redux** — React integration with the Redux Store
- **React Router** — routing and protected routes
- **React Hook Form** — form state and submission handling
- **Yup** — validation schemas
- **TanStack React Table** — table logic
- **CSS3** — layouts, responsive design, and component styling
- **SVG Sprite** — centralized reusable icon management
- **ESLint** — static code analysis
- **REST API** — authentication, words, recommendations, statistics, and training
- **Git and GitHub** — version control

## Architecture and data flow

The application uses a shared RTK Query API layer. Private requests automatically receive the current Bearer token from the session state.

Authentication and word endpoints extend the shared `baseApi` through `injectEndpoints()`, keeping authorization, caching, and cache invalidation centralized.

Main data domains:

- **Session State** — user, access token, and session restoration status
- **OwnWords** — personal dictionary
- **RecommendedWords** — recommended vocabulary
- **Statistics** — dictionary word count
- **TrainingTasks** — currently available training tasks

Mutations such as adding, editing, deleting words, and submitting training results invalidate the related cache tags so dependent data is updated automatically.

## Project structure

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
│   ├── features/
│   │   ├── auth/
│   │   ├── dictionary/
│   │   └── training/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── redux/
│   ├── routes/
│   ├── services/
│   │   └── api/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── eslint.config.js
├── package.json
└── vite.config.js
```

## Installation and setup

### Requirements

- [Node.js](https://nodejs.org/) LTS
- npm
- Git

### Local installation

```bash
git clone https://github.com/AvalianY/vocab-builder.git
cd vocab-builder
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Start the development server:

```bash
npm run dev
```

Vite will print the local development address in the terminal, usually:

```text
http://localhost:5173
```

## Environment variable

The backend URL is configured through the following Vite variable:

```env
VITE_API_BASE_URL=https://vocab-builder-backend.p.goit.global/api
```

A ready-to-use example is provided in `.env.example`.

## Available scripts

```bash
npm run dev
```

Starts the local development server.

```bash
npm run build
```

Creates the optimized production build.

```bash
npm run preview
```

Runs a local preview of the production build.

```bash
npm run lint
```

Runs ESLint against the source code.

```bash
npm run verify:icons
```

Validates the SVG sprite and registered icon IDs.

```bash
npm run check
```

Runs linting, icon verification, and the production build in sequence.

## Project resources

- [Figma Design](https://www.figma.com/design/MbABlCaTJXxoER9D1cuyUO/VocabBuilder--Copy-?node-id=0-1)
- [Backend Swagger](https://vocab-builder-backend.p.goit.global/api-docs/)
- [Technical specification](https://docs.google.com/spreadsheets/d/15zCxbWA7ubDmFzjmzzXe6ysiHVMd4iD2PcZ7ilN2gRc/edit?gid=1060862504)

## Author

**Erik Avalian**

GitHub: [@AvalianY](https://github.com/AvalianY)

---

<div align="center">

Built as a React project focused on authentication, server-driven data management, reusable components, and responsive UI.

</div>
