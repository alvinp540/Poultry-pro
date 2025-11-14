
---

## Technologies Used
- **React.js (Vite)** – Component-based front-end framework.
- **Tailwind CSS** – For clean and responsive styling.
- **React Router DOM** – For page navigation.
- **React Icons / Lucide** – For dashboard icons and visuals.
- **Recharts (optional)** – For simple data visualization charts.

---

##  Workflow Summary (Flow of Work)
1. **Home Page** – User selects their role: *Farmer* or *Seller*.
2. **Farmer Dashboard** – Enter chicken and resource data → System displays charts and summaries.
3. **Seller Dashboard** – View farmers’ progress → Choose to initiate a purchase or view detailed stats.
4. **Data Flow** – Handled entirely on the client side (use of React `useState` and mock JSON for now).
5. **UI Feedback** – Toast messages for actions like record update or interest submission.

---

##  Future Enhancements
- Add a backend (Node.js + MongoDB) for persistent data storage.
- Implement authentication for farmers and sellers.
- Integrate AI predictions for chicken growth rates and feed optimization.
- Enable payment processing and order tracking.

# Poultry-Pro

Poultry-Pro is a React + Vite single-page application that helps poultry farmers manage flocks, daily records, vaccinations, tasks, and basic farm accounting. The project uses client-side state and Firebase for authentication and (optionally) Firestore storage.

This README explains how the web app works, describes each feature and component, and provides instructions for local development, build, and deployment.

---

## Table of contents
- [How the app works](#how-the-web-app-works)
- [Features overview](#detailed-features-and-how-to-use-them)
- [Developer setup](#developer-setup-quick)
- [Firebase configuration](#environment-variables-recommended)
- [Build & deployment](#build--deploy)
- [Roadmap](#roadmap-prioritized)
- [Troubleshooting](#troubleshooting--common-notes)

---

## How the web app works

This is a single-page React application (Vite) with client-side routing and optional Firebase backend services. The app is organized into pages (top-level routes) and smaller UI components. Key runtime flows:

- **Authentication:** The app uses Firebase Authentication. The `auth` instance is exported from `src/firebase/firebase.js`. `App.jsx` subscribes to auth state via `onAuthStateChanged` and exposes protected routes using `ProtectedRoute`. When signed in, Navbar shows a profile icon and protected feature pages become accessible.
- **Client state & demo persistence:** Many features use local component state and `FarmContext` for demo persistence; `FarmContext` persists to `localStorage` so the app remains usable without a backend.
- **Optional persistence:** The Register page writes a `users/{uid}` document to Firestore. Other data (tasks, flocks, accounting) are currently client-side but structured so they can be moved to Firestore or a custom API easily.

## Detailed features and how to use them

Below is a feature-by-feature explanation showing where the code lives and how users interact with each piece.

### 1) Authentication
- **Files:** `src/pages/Login.jsx`, `src/pages/Register.jsx`, `src/firebase/firebase.js`
- **What it does:** Register and login with email and password using Firebase Auth. `Register.jsx` saves a `users/{uid}` doc in Firestore with the selected role.
- **UX:** Navbar shows `Login`/`Register` when signed out. When signed in, Navbar shows a profile icon with a dropdown containing user info and `Logout`.

### 2) Task & Work Management
- **File:** `src/components/TaskManagement.jsx`
- **Capabilities:** Create tasks, set assignee, priority, due date; toggle status (pending → in-progress → completed); delete tasks (confirmation prompt). A global helper `window.addTaskFromVaccination` is provided so Livestock actions can create tasks.

Usage notes:
- Tasks are stored in local component state. Integrate with Firestore or backend API to persist tasks across users/devices.

### 3) Livestock Management
- **File:** `src/components/LivestockManagement.jsx`
- **Capabilities:** Add flocks (batches), add daily records (including `mortality`, `feedConsumed`, and `sickCount`), manage vaccinations, and compute totals (total mortality, updated flock quantity).
- **Important logic:** If a daily record has `sickCount > 0`, the flock status is set to `attention`. Daily records are prepended to a flock's record list and totals are recalculated.

### 4) Farm Accounting
- **File:** `src/components/FarmAccounting.jsx`
- **Capabilities:** Track expenses and sales; simple totals display. Data currently persists to `FarmContext` (and localStorage).

### 5) Dashboards & Role Views
- **Files:** `src/components/FarmerDashboard.jsx`, `src/components/SellerDashboard.jsx`, `src/components/RoleSwitcher.jsx`
- **Capabilities:** Role-specific summaries, quick-links to features. `RoleSwitcher` allows switching the demo role stored in `FarmContext`.

### 6) Navigation & Layout
- **Files:** `src/components/Navbar.jsx`, `src/components/Footer.jsx`
- **Capabilities:** Top navigation, Features dropdown (links to supported feature pages), and auth/profile UX. Navbar only lists routes that exist; non-existent links were removed to avoid 404s.

### 7) Global context and utilities
- **File:** `src/context/FarmContext.jsx` — holds demo data (role, batches, feeds, vaccinations, sales, expenses) and persists to `localStorage`.

## Data flow & integration points (where to extend)

- **Authentication:** `auth` from `src/firebase/firebase.js` — use to gate API calls and identify the current user.
- **Firestore:** `db` exported from `firebase.js`. `Register.jsx` demonstrates creating a user doc. Expand this pattern for storing tasks, flocks, and accounting entries.
- **Local demo mode:** The app works without Firestore (client-only + localStorage). To persist, replace local writes with Firestore or API calls.

## Developer setup (quick)

1. Clone the repo and change into the `poultrypro` folder.
2. Install dependencies:
```powershell
npm install
```
3. Run the dev server:
```powershell
npm run dev
```
4. Open the app at `http://localhost:5173`.


## Build & deploy

Recommended platforms:

- **Vercel**: Connect the repository, set the Vite env vars in project settings, build command `npm run build`, output `dist`.

## Testing & quick checklist

- Register a user (`/register`) — Firestore `users/{uid}` document should be created.
- Login (`/login`) — Navbar updates to show profile icon.
- Access `/task-management` while logged out — you should be redirected to `/`.
- Create tasks, add daily records and vaccinations, and verify delete confirmations and totals update.

## Roadmap (prioritized)

**Short-term**
- Persist features to Firestore or a custom API (tasks, flocks, accounting).
- Replace `alert()` usages with a toast system (e.g., `react-toastify` or internal `ToastContext`).
- Fetch role from Firestore on login and enforce role-based navigation.

**Mid-term**
- Add unit tests (Jest + React Testing Library).
- Add CI to run lint/build/tests (GitHub Actions) and automated deploy to Vercel/Netlify.

**Long-term**
- Payments, order management, marketplace features.
- Advanced analytics and ML-based growth/feed predictions.

## Troubleshooting & notes

- If you see `auth` export errors, ensure `src/firebase/firebase.js` exports `auth` and `db` and that the file is saved.
- If protected routes redirect unexpectedly, confirm that `onAuthStateChanged` has finished (App shows a loading spinner while checking).

## Next steps I can implement for you

- Convert `src/firebase/firebase.js` to use environment variables and add `.env.example`.
- Implement a lightweight ToastContext and replace `alert()` usages for better UX.
- Add a GitHub Actions workflow that lints, builds and (optionally) deploys to Vercel/Netlify.

If you'd like one of these implemented now, tell me which and I'll do it.
