# GreenNest AI Botanist Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an AI-powered botanical virtual assistant and plant disease diagnosis feature with global floating widget UI, multimodal Gemini 1.5 Flash support, catalog context grounding (RAG), and a resilient offline fallback engine.

**Architecture:** Node.js/Express modular MCS architecture (`backend/src/modules/chatbot/`) receiving text and base64 inline images, querying local MongoDB `Plant` collection for catalog context, interfacing with Google Gemini API (or internal rule-based knowledge fallback); paired with a React 19 floating chat widget mounted globally in `frontend/src/App.jsx`.

**Tech Stack:** Node.js, Express 4.x, MongoDB & Mongoose 8.x, Google Gemini API (`@google/genai` or native fetch), React 19, Vite, Tailwind CSS v4, Lucide React icons, Vitest.

**Spec:** [`docs/superpowers/specs/2026-10-30-ai-chatbot-design.md`](file:///c:/Users/FPTSHOP/Documents/GitHub/GreenNest/docs/superpowers/specs/2026-10-30-ai-chatbot-design.md)

---

## Global Constraints

- Backend must remain strictly compatible with local MongoDB loopback validation (`mongodb://127.0.0.1:27017/GreenNest`).
- Database `Plant` collection remains read-only during chat operations; do not modify existing seed data counts in `database/seedData/plants.json`.
- Uploaded diagnostic images are sent inline as Base64 strings (max 4MB on client); do NOT store uploaded images on server disk.
- All endpoints must work seamlessly for unauthenticated guest visitors as well as authenticated users.
- When `GEMINI_API_KEY` is not provided, the service must gracefully fallback to internal botanical knowledge without throwing 500 errors.
- Existing backend test suite (`npm run test`) and frontend test suite (`npm test`) must pass with 100% success.

---

## Review Focus

- **Oversized payload rejection:** Request body > 10MB or image file > 4MB must be caught cleanly with `413 Payload Too Large` or `400 Bad Request` instead of crashing Express.
- **Empty or whitespace-only messages:** Submissions with neither text nor image must return `400 Bad Request` with message `Please provide a message or an image`.
- **Offline / Missing API key fallback:** When `GEMINI_API_KEY` is undefined, calling `POST /api/chatbot/message` must return `200 OK` with `source: "fallback"` and informative care advice.
- **Bilingual query resolution:** Vietnamese plant queries (`lưỡi hổ`, `trầu bà`, `lan ý`) must map to GreenNest catalog entries and attach correct `suggestedPlants` cards.
- **Client timeout resilience:** Chatbot API client must use a 25-second timeout so image diagnosis never fails with `ECONNABORTED` on 10-second standard timeout.

---

### Task 1: Backend Chatbot Module - Service, Controller & Routes

**Files:**
- Create: `backend/src/modules/chatbot/chatbot.service.js`
- Create: `backend/src/modules/chatbot/chatbot.controller.js`
- Create: `backend/src/modules/chatbot/chatbot.routes.js`
- Modify: `backend/src/server.js:20-49`
- Modify: `backend/.env.example:1-8`
- Test: `backend/tests/chatbot.test.js`

**Interfaces:**
- Consumes: Mongoose model `Plant` from `backend/src/modules/plant/plant.model.js`.
- Produces: `POST /api/chatbot/message` returning `{ success: true, data: { reply: string, suggestedPlants: Array, source: "gemini" | "fallback" } }`.

- [ ] **Step 1: Write the failing unit/integration test in `backend/tests/chatbot.test.js`**
  Assert that `POST /api/chatbot/message` validates empty inputs (400), responds to text queries with fallback mode when no API key is set, and resolves bilingual plant matches.
- [ ] **Step 2: Run test to verify it fails**
  Run: `node --test backend/tests/chatbot.test.js`
  Expected: FAIL with route not found (404) or module missing.
- [ ] **Step 3: Implement `ChatbotService` in `backend/src/modules/chatbot/chatbot.service.js`**
  Implement:
  - `bilingualAliases` mapping table for 15 GreenNest species (e.g. `lưỡi hổ` -> `Snake Plant`, `trầu bà` -> `Swiss Cheese Plant`, `lan ý` -> `Peace Lily Plant`).
  - `findCatalogMatches(text)` querying `Plant` collection by name/scientificName/tags/toxicity.
  - `generateReply({ message, image, history })` calling Gemini 1.5 Flash when `GEMINI_API_KEY` is set, or `fallbackReply({ message, image })` when unset/error.
- [ ] **Step 4: Implement `ChatbotController` & `ChatbotRoutes` in `chatbot.controller.js` and `chatbot.routes.js`**
  Validate input: if both `!message?.trim()` and `!image?.data`, return 400.
  Handle exceptions gracefully through global error handler.
- [ ] **Step 5: Mount chatbot route and configure payload limit in `backend/src/server.js`**
  Update `app.use(express.json({ limit: '10mb' }))` and `app.use('/api/chatbot', require('./modules/chatbot/chatbot.routes'))`.
- [ ] **Step 6: Update `backend/.env.example`**
  Add `GEMINI_API_KEY=your_gemini_api_key_here`.
- [ ] **Step 7: Run test to verify it passes**
  Run: `node --test backend/tests/chatbot.test.js`
  Expected: PASS all tests.
- [ ] **Step 8: Commit**
  ```bash
  git add backend/src/modules/chatbot/ backend/src/server.js backend/.env.example backend/tests/chatbot.test.js
  git commit -m "feat(backend): implement chatbot module with Gemini and offline fallback"
  ```

---

### Task 2: Backend Integration & Test Suite Verification

**Files:**
- Modify: `backend/tests/api.test.js:400-430`
- Modify: `backend/package.json:9-12`

**Interfaces:**
- Consumes: `POST /api/chatbot/message`.
- Produces: Integrated end-to-end API test verification step in `backend/tests/api.test.js`.

- [ ] **Step 1: Add Chatbot API test section in `backend/tests/api.test.js`**
  Add section `▶ [11/11] AI Botanist & Plant Diagnosis Chatbot Module`:
  - Test health/fallback response on `POST /api/chatbot/message` with a common botanical question.
  - Test validation error on empty payload.
  - Test plant suggestion cards returned in `suggestedPlants`.
- [ ] **Step 2: Update test script in `backend/package.json`**
  Include `tests/chatbot.test.js` in `test:unit` command.
- [ ] **Step 3: Run full backend test suite to verify 100% pass**
  Run: `npm --prefix backend test`
  Expected: All unit tests and all 11 API test suites PASS.
- [ ] **Step 4: Commit**
  ```bash
  git add backend/tests/api.test.js backend/package.json
  git commit -m "test(backend): integrate chatbot endpoint into automated test suite"
  ```

---

### Task 3: Frontend API Service & Chatbot Client

**Files:**
- Create: `frontend/src/services/chatbotApi.js`
- Modify: `frontend/src/services/index.js`
- Test: `frontend/src/services/chatbotApi.test.js`

**Interfaces:**
- Consumes: Backend `POST /api/chatbot/message` via `apiClient`.
- Produces: `chatbotApi.sendMessage({ message, image, history }) -> Promise<{ reply, suggestedPlants, source }>`.

- [ ] **Step 1: Write unit test in `frontend/src/services/chatbotApi.test.js`**
  Mock Axios to assert that `chatbotApi.sendMessage` posts to `/chatbot/message` with `timeout: 25000` and returns normalized payload.
- [ ] **Step 2: Run test to verify it fails**
  Run: `npm --prefix frontend test frontend/src/services/chatbotApi.test.js`
  Expected: FAIL (file does not exist).
- [ ] **Step 3: Implement `frontend/src/services/chatbotApi.js`**
  Use `apiClient.post('/chatbot/message', payload, { timeout: 25000 })`.
- [ ] **Step 4: Export `chatbotApi` in `frontend/src/services/index.js`**
- [ ] **Step 5: Run test to verify it passes**
  Run: `npm --prefix frontend test frontend/src/services/chatbotApi.test.js`
  Expected: PASS.
- [ ] **Step 6: Commit**
  ```bash
  git add frontend/src/services/chatbotApi.js frontend/src/services/index.js frontend/src/services/chatbotApi.test.js
  git commit -m "feat(frontend): create chatbotApi service with extended timeout"
  ```

---

### Task 4: Frontend UI Components - Floating Widget & Disease Diagnosis

**Files:**
- Create: `frontend/src/components/chatbot/ChatbotWidget.jsx`
- Create: `frontend/src/components/chatbot/ChatbotWidget.css` (or styles in `index.css`)
- Modify: `frontend/src/App.jsx:20-65`
- Test: `frontend/src/components/chatbot/ChatbotWidget.test.jsx`

**Interfaces:**
- Consumes: `chatbotApi.sendMessage` from `frontend/src/services/chatbotApi.js`.
- Produces: `<ChatbotWidget />` top-level React component mounted in `App.jsx`.

- [ ] **Step 1: Write Vitest component test in `frontend/src/components/chatbot/ChatbotWidget.test.jsx`**
  Test:
  - Widget renders collapsed button by default with accessible label.
  - Clicking trigger button opens the chat dialog.
  - Submitting a text question renders user bubble, loading indicator, then bot reply bubble.
  - Selecting an image updates preview thumbnail with remove button.
  - Clicking quick prompt chips populates input and auto-sends.
  - Plant cards render links navigating to `/specimen-detail?id=...`.
- [ ] **Step 2: Run test to verify it fails**
  Run: `npm --prefix frontend test frontend/src/components/chatbot/ChatbotWidget.test.jsx`
  Expected: FAIL (component not found).
- [ ] **Step 3: Implement `ChatbotWidget.jsx`**
  Features:
  - Collapsed FAB floating at bottom-right (`position: fixed; bottom: 24px; right: 24px; z-index: 999`).
  - Biophilic styling matching GreenNest palette: `#1c3d19`, `#2d5a27`, `#f0fdf4`, `#ffffff`.
  - Image file picker input (`accept="image/*"`), validating size (< 4MB) and converting to Base64 via `FileReader`.
  - Preview bar with thumbnail and `x` dismiss button.
  - Quick prompt chips: *"Cây lọc không khí"*, *"Cây an toàn cho thú cưng"*, *"Lá bị vàng & đốm nâu"*, *"Tư vấn tưới nước"*.
  - Plant recommendation cards displaying photo, common name, scientific name, and "Xem chi tiết" button.
  - Fallback indicator badge when response source is `"fallback"`.
- [ ] **Step 4: Mount `<ChatbotWidget />` in `frontend/src/App.jsx`**
  Add inside `<Router>` so it appears across all pages without layout shift.
- [ ] **Step 5: Run component test to verify it passes**
  Run: `npm --prefix frontend test frontend/src/components/chatbot/ChatbotWidget.test.jsx`
  Expected: PASS.
- [ ] **Step 6: Commit**
  ```bash
  git add frontend/src/components/chatbot/ frontend/src/App.jsx
  git commit -m "feat(frontend): implement biophilic floating chatbot widget with image diagnosis"
  ```

---

### Task 5: End-to-End Regression Testing & Documentation

**Files:**
- Modify: `README.md` (document chatbot endpoint and features)
- Verify: Full test suites for both frontend and backend

- [ ] **Step 1: Run backend tests**
  Run: `npm --prefix backend test`
  Expected: All unit & API tests PASS with 0 failures.
- [ ] **Step 2: Run frontend tests**
  Run: `npm --prefix frontend test`
  Expected: All Vitest suites PASS with 0 failures.
- [ ] **Step 3: Document AI Chatbot in `README.md`**
  Add `/api/chatbot/message` endpoint documentation, parameters, and environment variable `GEMINI_API_KEY`.
- [ ] **Step 4: Final verification commit**
  ```bash
  git add README.md
  git commit -m "docs: update README with AI chatbot documentation"
  ```

