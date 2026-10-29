# GreenNest

GreenNest is a full-stack botanical discovery and plant-management platform. It helps people find plants that suit their environment, understand practical care requirements, keep a personal garden and collections, and interact with a curated botanical gallery. Administrators use the same system to manage plants, gardeners, curated collections, gallery content, contact messages, and user accounts.

The application is built as a MERN project with a React frontend, an Express API, and MongoDB running locally as the single source of application data.

## What GreenNest Does

### For visitors

- Browse and search the plant catalog.
- View botanical profiles, care requirements, toxicity information, and related plants.
- Explore curated seasonal collections, gardeners, and the image gallery.
- Send contact messages to the GreenNest team.
- Register and sign in to a personal account.

### For signed-in users

- Build a personal garden and maintain plant-care checklists.
- Bookmark plants and like gallery images.
- Create personal collections and add or remove published plants.
- Keep personal data synchronized through the API instead of browser-based mock data.

### For administrators

- View operational statistics from the admin dashboard.
- Create, update, and delete plants, gardener profiles, curated collections, and gallery entries.
- Review and resolve contact messages.
- Search and remove user accounts.
- Access protected content through JWT authentication and role-based authorization.

## Architecture

```text
React + Vite frontend
        |
        | HTTP / JSON + Bearer token
        v
Express REST API
        |
        | Mongoose
        v
Local MongoDB
  - GreenNest      (runtime)
  - GreenNestTest  (automated tests)
```

The backend connects to MongoDB before it starts listening for HTTP requests. It accepts only a loopback MongoDB URI targeting `GreenNest` during normal operation. There is no Atlas or local fallback chain: if the local database is unavailable, startup fails instead of silently switching data sources.

## Technology Stack

| Area | Technology |
| --- | --- |
| Frontend | React 19, React Router, Vite 8, Tailwind CSS 4, Axios, Lucide React |
| Backend | Node.js, Express 4, Mongoose 8 |
| Database | MongoDB Community Server |
| Authentication | JWT Bearer tokens, bcrypt password hashing, role-based access control |
| Testing | Node test runner, API integration tests, Vitest, React Testing Library |
| Quality | Oxlint, Vite production build |

## Project Structure

```text
GreenNest/
|-- backend/
|   |-- src/
|   |   |-- config/          # MongoDB connection
|   |   |-- middlewares/     # Authentication, validation, errors and RBAC
|   |   |-- modules/         # Domain models, services, controllers and routes
|   |   `-- server.js        # Express application and startup
|   |-- tests/               # Unit, startup and API integration tests
|   `-- .env.example
|-- frontend/
|   |-- src/
|   |   |-- components/      # Public and admin UI components
|   |   |-- context/         # Authentication state
|   |   |-- pages/           # Public, user and admin pages
|   |   |-- services/        # API clients
|   |   `-- utils/           # View-model and shared utilities
|   `-- vite.config.js
|-- database/seedData/       # Legacy/reference JSON
|-- design_spec/             # Design references
|-- docs/                    # Project analysis and specification documents
`-- stitch/                  # Original dashboard design references
```

## Prerequisites

- [Node.js](https://nodejs.org/) `^20.19.0` or `>=22.12.0`, matching the current Vite requirement.
- npm.
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) running locally on port `27017`.

MongoDB may run as a Windows service or as a manually started `mongod` process. MongoDB Compass is optional.

## Installation

Clone the repository:

```bash
git clone https://github.com/t0fu12345/GreenNest.git
cd GreenNest
```

Install backend and frontend dependencies:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Environment Configuration

Copy `backend/.env.example` to `backend/.env` and provide a strong JWT secret:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/GreenNest
MONGO_TEST_URI=mongodb://127.0.0.1:27017/GreenNestTest
JWT_SECRET=<generate_a_strong_random_secret>
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173
```

Do not commit `.env`. The runtime and test database URIs must remain separate so automated cleanup cannot affect application data.

The frontend uses `http://localhost:5000/api` by default. To override it, create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Running the Application

Make sure the MongoDB service is running, then open two terminals.

Terminal 1 — backend:

```bash
cd backend
npm run dev
```

Terminal 2 — frontend:

```bash
cd frontend
npm run dev
```

Open `http://localhost:5173`. The REST API is available at `http://localhost:5000/api`, and its health endpoint is `GET http://localhost:5000/api/health`.

GreenNest does not seed `GreenNest` automatically. A new local database therefore starts empty; populate it through registration and the authenticated administration APIs.

## Creating the First Local Administrator

Register a normal account through the application, then promote it only in your local development database with MongoDB Compass or `mongosh`:

```javascript
use GreenNest
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

Sign out and sign in again so the new JWT contains the administrator role. Never commit real account credentials to the repository.

## Main API Groups

All endpoints use the `/api` prefix.

| Route group | Purpose | Access |
| --- | --- | --- |
| `/auth` | Registration, login, current profile and password changes | Public / authenticated |
| `/plants` | Plant catalog and plant CMS operations | Public read / admin write |
| `/garden` | Personal garden, checklists and bookmarks | Authenticated |
| `/gardeners` | Gardener profiles | Public read / admin write |
| `/collections` | Curated botanical collections | Public read / admin write |
| `/personal-collections` | User-owned plant collections | Authenticated owner |
| `/gallery` | Gallery browsing, likes and CMS operations | Public read / authenticated like / admin write |
| `/contact` | Contact submission and inbox management | Public submit / admin manage |
| `/admin` | Dashboard statistics and user management | Admin |
| `/metadata` | Plant-filter metadata | Public |

Protected requests use:

```http
Authorization: Bearer <token>
```

## Testing and Quality Checks

MongoDB must be running before backend integration tests. Tests create fixtures only in `GreenNestTest` and clean them after execution.

Backend:

```bash
cd backend
npm test
```

Frontend:

```bash
cd frontend
npm run test
npm run lint
npm run build
```

The test database guard rejects Atlas URIs, remote hosts, the runtime `GreenNest` database, and any database name other than `GreenNestTest`.

## Data and Security Notes

- MongoDB local is the authoritative source for users and domain data.
- Passwords are hashed with bcrypt and are never returned by user-management APIs.
- JWTs are sent as Bearer tokens. Browser storage is limited to session-related values such as the token and remembered email; cached domain data is not an authentication source.
- Public catalog endpoints expose published plants only. Administrators can manage drafts through protected endpoints.
- Personal collections are scoped to their owner.
- `.env`, build output, logs, and dependencies are excluded by `.gitignore`.
- Files in `database/seedData` are retained as legacy/reference data and are not imported at runtime.

## Troubleshooting

### Backend exits during startup

Confirm that MongoDB is running and that `MONGO_URI` is exactly:

```text
mongodb://127.0.0.1:27017/GreenNest
```

The application intentionally rejects Atlas, remote hosts, and incorrectly named runtime databases.

### Login fails on a fresh clone

A fresh `GreenNest` database has no users. Register an account first. If administrator access is required, follow the first-administrator procedure above.

### Frontend reports a network error

Check that the backend is running on port `5000`, `CLIENT_URL` matches the frontend origin, and `VITE_API_BASE_URL` points to the `/api` base URL.

### Backend tests refuse to run

Confirm that `MONGO_TEST_URI` targets `mongodb://127.0.0.1:27017/GreenNestTest` and does not equal `MONGO_URI`.
