# maintain-ai frontend

React 19 and Vite 7 dashboard for the maintain-ai prototype. The screens use local sample data; they are not connected to the prediction API. See the [root README](../README.md) for backend setup and implementation limits.

## Run

Use Node.js 20.19+ or 22.12+.

```bash
npm ci
npm run dev
```

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite locally |
| `npm run build` | Compile assets into `dist/` |
| `npm run preview` | Preview a completed build |
| `npm run lint` | Run ESLint; existing failures remain |

`src/App.jsx` defines dashboard, sensor, prediction, maintenance, alert, report, settings, machine-detail, and login routes. `src/pages/` contains the sample data and page interactions. `src/components/` supplies the navigation and sidebar.

Authentication is simulated and `isLoggedIn` is hardcoded to true. There is no frontend API URL configuration yet. Connecting the dashboard requires an API client and backend CORS configuration.

For static hosting, build `dist/` and configure nested routes to serve `index.html`; `vercel.json` includes that SPA fallback. The page loads fonts from Google Fonts.
