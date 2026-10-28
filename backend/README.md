# GreenNest Backend

Express and Mongoose API for GreenNest. A MongoDB instance running on the same machine is the only runtime database.

## Requirements

- Node.js 18 or newer
- MongoDB Community Server running locally on port `27017`
- Runtime database `GreenNest`
- Isolated automated-test database `GreenNestTest`

## Configuration

Copy `.env.example` to `.env`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/GreenNest
MONGO_TEST_URI=mongodb://127.0.0.1:27017/GreenNestTest
JWT_SECRET=<strong-random-secret>
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173
```

Do not commit `.env`. Runtime accepts only a loopback `mongodb://` URI whose database is exactly `GreenNest`. The application connects to MongoDB before opening the HTTP port and exits when the initial connection fails.

## Run

Start the local MongoDB service, then run:

```bash
npm install
npm run dev
```

The default API base URL is `http://localhost:5000/api`. Check availability at `GET /api/health`.

GreenNest does not automatically seed or destroy the runtime database. Populate it through controlled administration or authenticated CMS APIs.

## Tests

Set `MONGO_TEST_URI=mongodb://127.0.0.1:27017/GreenNestTest`, then run:

```bash
npm test
```

The test runner rejects remote hosts, refuses to use `GreenNest`, creates minimum fixtures in `GreenNestTest`, and cleans those fixtures after the run.

## Data ownership

- Curated collections are managed by administrators through `/api/collections`.
- Personal collections are owned by the authenticated user through `/api/personal-collections`.
- Garden items, bookmarks, gallery likes, users, plants, gardeners, gallery images, contacts, and both collection types are stored in local MongoDB.
- Browser storage is limited to the Bearer token and remembered email; it is not a source of domain data or authentication truth.

## Optional manual backup

Atlas may be used as a manual backup destination through an explicit `mongodump`/`mongorestore` workflow. It is not a runtime fallback and the application never switches databases automatically.
