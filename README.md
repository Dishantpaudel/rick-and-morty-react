# Rick and Morty Portal (React Edition)

A custom single-page character explorer built with React and Vite. This app fetches live data from the Rick and Morty API, supports search and status filtering, and includes route-level character details.

## Live Website
https://rick-and-morty-react-gray.vercel.app/

## Screenshot
![Rick and Morty Portal React screenshot](./docs/screenshots/app-preview.png)

## Core Features
- API integration with `https://rickandmortyapi.com/api/character`
- User interactions for searching, filtering, pagination, and navigating to character details
- Matching UI and behavior with the Vue version of the same app
- Component stories with Storybook
- Component tests with Vitest
- End-to-end user flow tests with Playwright

## Run Locally
1. Install dependencies.
2. Start the development server.

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Available Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Build production assets. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint checks. |
| `npm run format` | Format source files with Prettier. |
| `npm run format:check` | Validate Prettier formatting without writing changes. |
| `npm run test:unit` | Run component and unit tests with Vitest. |
| `npm run test:e2e` | Run browser end-to-end tests with Playwright. |
| `npm run storybook` | Start Storybook for component isolation. |
| `npm run build-storybook` | Build static Storybook assets. |

## CI/CD
GitHub Actions runs on each pull request to `main` and executes:
- `format:check`
- `lint`
- `test:unit`
- `test:e2e`
- `build`

If all checks pass, the workflow deploys a preview build to Vercel.

Required repository secrets:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Author
Dipshant Paudel
