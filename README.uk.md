<div align="center">

# VocabBuilder

### Адаптивний React-застосунок для створення та тренування англійського словникового запасу

[![React](https://img.shields.io/badge/React-19-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](https://developer.mozilla.org/docs/Web/JavaScript)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?logo=reacthookform&logoColor=white)](https://react-hook-form.com/)

[Deutsch](README.md) · [Українська](README.uk.md) · [English](README.en.md)

[Репозиторій](https://github.com/AvalianY/vocab-builder)

</div>

## Зміст

- [Про проєкт](#про-проєкт)
- [Функціональність](#функціональність)
- [Сторінки та маршрути](#сторінки-та-маршрути)
- [Технології](#технології)
- [Архітектура та потік даних](#архітектура-та-потік-даних)
- [Структура проєкту](#структура-проєкту)
- [Встановлення та запуск](#встановлення-та-запуск)
- [Змінна середовища](#змінна-середовища)
- [Доступні скрипти](#доступні-скрипти)
- [Ресурси проєкту](#ресурси-проєкту)
- [Автор](#автор)

## Про проєкт

**VocabBuilder** — це Single-Page Application для створення персонального англо-українського словника та подальшого тренування збережених слів.

Користувачі можуть реєструватися та входити до системи, керувати власним словником, переглядати рекомендовані слова, фільтрувати їх за категоріями та проходити окремі тренування. Застосунок працює з REST API, захищеними маршрутами та серверною пагінацією.

Інтерфейс реалізовано за Figma-макетом і адаптовано для mobile, tablet та desktop.

## Функціональність

- реєстрація, login, logout і відновлення сесії
- захищені приватні маршрути
- персональний словник із:
  - пошуком із debounce 300 мс
  - фільтрацією за категоріями
  - поділом дієслів на regular / irregular
  - серверною пагінацією
  - прогресом вивчення кожного слова
  - додаванням, редагуванням і видаленням слів
- сторінка рекомендацій із:
  - пошуком і фільтрами
  - серверною пагінацією
  - додаванням рекомендованих слів до власного словника
- режим тренування з:
  - завданнями з API
  - динамічним прогресом
  - введенням перекладу
  - збереженням відповідей
  - підсумком правильних відповідей і помилок
  - empty state, якщо слів для тренування немає
- повторно використовувані Dashboard, Table, Pagination, Modal і Progress-компоненти
- власна система Notification / Toast для backend-помилок
- валідація форм через React Hook Form і Yup
- спільний SVG sprite та reusable `Icon`-компонент
- адаптивна навігація з burger menu
- локальний шрифт Fixel Display
- адаптивні layout-и для 320 px, 375 px, 768 px і 1440 px

## Сторінки та маршрути

### `/register`

Реєстрація нового користувача з валідацією форми та перемикачем видимості пароля.

### `/login`

Авторизація, відновлення сесії та перехід до захищеної частини застосунку.

### `/dictionary`

Персональний словник із пошуком, фільтрами, статистикою, таблицею, пагінацією та CRUD-операціями.

### `/recommend`

Рекомендовані слова з API з фільтрами, пагінацією та додаванням до власного словника.

### `/training`

Тренування збережених слів із прогресом, введенням відповідей і фінальним result modal.

## Технології

- **React 19** — побудова UI
- **JavaScript** — логіка застосунку
- **Vite 8** — dev server і production build
- **Redux Toolkit** — глобальний state
- **RTK Query** — API-запити, кешування та invalidation
- **React Redux** — інтеграція React із Redux Store
- **React Router** — маршрутизація та protected routes
- **React Hook Form** — робота з формами
- **Yup** — validation schemas
- **TanStack React Table** — логіка таблиць
- **CSS3** — стилі, layout і responsive design
- **SVG Sprite** — централізоване керування іконками
- **ESLint** — статичний аналіз коду
- **REST API** — авторизація, слова, рекомендації, статистика та тренування
- **Git і GitHub** — контроль версій

## Архітектура та потік даних

Застосунок використовує спільний RTK Query API layer. Приватні запити автоматично отримують актуальний Bearer token зі session state.

Auth та words endpoints розширюють спільний `baseApi` через `injectEndpoints()`, тому авторизація, кешування та invalidation залишаються централізованими.

Основні групи даних:

- **Session State** — користувач, access token і стан відновлення сесії
- **OwnWords** — персональний словник
- **RecommendedWords** — рекомендовані слова
- **Statistics** — кількість слів у словнику
- **TrainingTasks** — поточні завдання для тренування

Операції додавання, редагування, видалення та збереження результатів тренування інвалідують відповідні cache tags, тому залежні дані оновлюються автоматично.

## Структура проєкту

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

## Встановлення та запуск

### Вимоги

- [Node.js](https://nodejs.org/) LTS
- npm
- Git

### Локальне встановлення

```bash
git clone https://github.com/AvalianY/vocab-builder.git
cd vocab-builder
npm install
```

Створіть локальний `.env`:

```bash
cp .env.example .env
```

У Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Запустіть dev server:

```bash
npm run dev
```

Зазвичай Vite буде доступний за адресою:

```text
http://localhost:5173
```

## Змінна середовища

Backend URL задається через Vite-змінну:

```env
VITE_API_BASE_URL=https://vocab-builder-backend.p.goit.global/api
```

Приклад знаходиться у `.env.example`.

## Доступні скрипти

```bash
npm run dev
```

Запускає локальний dev server.

```bash
npm run build
```

Створює production build.

```bash
npm run preview
```

Запускає локальний preview production build.

```bash
npm run lint
```

Перевіряє код через ESLint.

```bash
npm run verify:icons
```

Перевіряє SVG sprite та зареєстровані icon IDs.

```bash
npm run check
```

Послідовно запускає lint, перевірку іконок і production build.

## Ресурси проєкту

- [Figma Design](https://www.figma.com/design/MbABlCaTJXxoER9D1cuyUO/VocabBuilder--Copy-?node-id=0-1)
- [Backend Swagger](https://vocab-builder-backend.p.goit.global/api-docs/)
- [Технічне завдання](https://docs.google.com/spreadsheets/d/15zCxbWA7ubDmFzjmzzXe6ysiHVMd4iD2PcZ7ilN2gRc/edit?gid=1060862504)

## Автор

**Erik Avalian**

GitHub: [@AvalianY](https://github.com/AvalianY)

---

<div align="center">

React-проєкт із фокусом на авторизації, серверному керуванні даними, повторно використовуваних компонентах та адаптивному UI.

</div>
