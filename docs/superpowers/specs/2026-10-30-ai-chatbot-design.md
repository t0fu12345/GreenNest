# Design Document: GreenNest AI Botanist & Plant Disease Diagnosis

**Date:** 2026-10-30  
**Status:** Ready for User Approval  
**Target Delivery:** GreenNest Fullstack MERN Application  

---

## 1. Intent & Purpose (The Why)
GreenNest is a biophilic botanical web application designed to help urban plant lovers discover, collect, and nurture botanical specimens. 
Currently, users can browse plants and read static care instructions, but when a plant experiences health issues (e.g., yellowing leaves, drooping, root rot, leaf spots) or when users have specific environmental constraints (e.g., low light, pets at home), they lack an interactive assistant to guide them.

The **GreenNest AI Botanist** introduces a smart virtual botanist assistant capable of:
1. Natural language consultation regarding botanical care, watering schedules, and microclimate suitability.
2. Multimodal plant disease diagnosis: users can snap or upload a plant photo directly in the chat to identify symptoms, possible causes, and actionable treatment steps.
3. Botanical Context Grounding (RAG): cross-referencing user queries with the local GreenNest specimen catalog in MongoDB to suggest relevant in-catalog plants with direct links.

---

## 2. Goals, Non-Goals & Anti-Goals

### Goals
- **Natural Language Interaction**: Friendly, knowledgeable botanical expert tone in both Vietnamese and English.
- **Visual Plant Health Diagnosis**: Accept image uploads (JPG, PNG, WebP, max 4MB) via inline Base64 and diagnose symptoms using Google Gemini Multimodal API (`gemini-1.5-flash`).
- **Catalog Grounding (RAG)**: Automatically detect plant names or taxonomy keywords in user queries, search the MongoDB `Plant` collection, and supply real specimen details into the prompt; output plant recommendation cards in the chat UI with links to `/specimen-detail` or `/plants`.
- **Global Floating Widget UI**: Present on all pages via a floating trigger button at bottom-right, expandable into a sleek biophilic chat window without interrupting page navigation.
- **Resilient Fallback Mode**: If `GEMINI_API_KEY` is unset or an upstream API error occurs, seamlessly fallback to an internal rule-based botanical knowledge engine instead of throwing unhandled 500 errors.
- **Test Coverage**: Comprehensive unit/integration tests for the backend endpoint and frontend Vitest component tests.

### Non-Goals
- Persistent database storage of chat message histories across browser reloads (session state in client memory is sufficient for phase 1).
- Voice recognition/audio chat.
- Live video stream diagnosis.

### Anti-Goals
- Blocking guest users: Asking questions must NOT require mandatory login (accessible to both guest and authenticated users).
- Storing uploaded diagnostic images on server disk (no disk clutter, no server storage leaks).
- Modifying existing database seed counts or schema migrations that could break existing integration test assertions.

---

## 3. Approaches Considered & Selected Architecture

### Model Selection
- **Gemini 1.5 Flash (Selected)**: Multimodal native support, near-instant response time (~1-2s), generous free-tier allocation, excellent Vietnamese/English botanical reasoning.
- *OpenAI GPT-4o-mini (Rejected)*: Requires paid billing accounts, external dependencies outside Google Antigravity ecosystem.

### Image Processing Pipeline
- **Approach 1: Inline Base64 Data URL (Selected)**: Frontend reads uploaded image file as Base64, verifies size (<= 4MB), sends inline within JSON payload `POST /api/chatbot/message`. Backend feeds `inlineData` directly to Gemini. Zero disk I/O, no multipart parsing complexity, instant disposal.
- *Approach 2: Multer File Upload & Disk Buffer (Rejected)*: Requires saving files to `uploads/temp/` and managing garbage collection cron tasks.

### Interface & Placement
- **Approach A: Global Floating Widget (Selected)**: Persistent bottom-right FAB button visible across all views (`Home`, `Plants`, `Gallery`, `My Garden`, etc.). Offers quick prompt chips, image attachment button with preview thumbnail, and plant card snippets.
- *Approach B: Dedicated `/ai-doctor` Page (Rejected as primary)*: Forces user to leave their current browsing context.

---

## 4. Technical Architecture & Resolved Design Decisions

### 4.1 Backend Module (`backend/src/modules/chatbot/`)

```
backend/src/modules/chatbot/
├── chatbot.service.js       # Gemini API client, Plant DB RAG query, bilingual alias map, rule-based fallback
├── chatbot.controller.js    # Request validation, payload size limit, HTTP response
└── chatbot.routes.js        # POST /api/chatbot/message
```

#### Resolved Engineering Calls:
1. **Bilingual Mapping Strategy (Builder Call)**:
   - The existing MongoDB database holds 15 specimens with English common names (`Snake Plant`, `Swiss Cheese Plant`, `Peace Lily Plant`, etc.).
   - Rather than altering database records and risking test breakages, `chatbot.service.js` contains a built-in bilingual dictionary mapping Vietnamese common names to the 15 catalog plants (e.g., `lưỡi hổ` -> `Snake Plant`, `trầu bà lá xẻ / monstera` -> `Swiss Cheese Plant`, `lan ý` -> `Peace Lily Plant`, `hoa sứ` -> `Desert Rose`, `thường xuân` -> `English Ivy`, `sen đá / xương rồng` -> `Agave`, `tai phật / môn` -> `Caladium / Heart of Jesus`).
   - The system prompt also includes a summary list of the 15 catalog plants so Gemini understands which species exist in the GreenNest collection.

2. **`suggestedPlants` Derivation for Image & Attribute Queries (Builder Call)**:
   - For text queries with plant names or attributes (e.g. "cây an toàn cho chó mèo"), the service queries `Plant` collection (e.g., `{ 'toxicity.isToxicToPets': false }`) and returns top matches.
   - For image-only queries, the system prompt instructs Gemini to mention the identified plant name and tag whether it matches one of the 15 GreenNest catalog plants. The backend resolves this to attach the relevant plant card(s) in `suggestedPlants`. If the user uploads a plant not in the 15 GreenNest specimens, Gemini still diagnoses the health issue accurately and provides recovery advice.

3. **Fallback Mode for Image Uploads (Builder Call)**:
   - When `GEMINI_API_KEY` is not present, the system returns a 200 response with a clear, polite advisory:
     *"Hệ thống đang hoạt động ở chế độ ngoại tuyến (chưa kích hoạt Gemini Vision). Bạn vui lòng mô tả thêm triệu chứng (ví dụ: vàng lá, úng nước, đốm nâu) hoặc tên cây để trợ lý hỗ trợ phân tích ngay nhé!"*
   - It also attaches universal plant first-aid tips (water drainage check, indirect light adjustment) and suggests safe starter plants.

4. **API Timeout (Builder Call)**:
   - `frontend/src/services/apiClient.js` default timeout is 10s. In `frontend/src/services/chatbotApi.js`, we configure a dedicated `timeout: 25000` (25s) for chatbot requests to ensure image diagnosis never aborts prematurely on slower connections.

#### API Specification: `POST /api/chatbot/message`
- **Request Body**:
  ```json
  {
    "message": "Cây trầu bà của tôi bị vàng lá và đốm nâu ở viền, cho tôi biết cách khắc phục?",
    "image": {
      "data": "data:image/jpeg;base64,...", // optional
      "mimeType": "image/jpeg"
    },
    "history": [ // optional, last 2-4 turns
      { "role": "user", "text": "Chào bạn" },
      { "role": "model", "text": "Chào bạn! Tôi là Trợ lý Thực vật GreenNest..." }
    ]
  }
  ```
- **Response Body (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "reply": "Chào bạn! Qua mô tả (hoặc hình ảnh), cây có dấu hiệu bị úng rễ do thừa nước...",
      "suggestedPlants": [
        {
          "_id": "...",
          "specimenId": "specimen-swiss-cheese",
          "name": "Swiss Cheese Plant",
          "scientificName": "Monstera deliciosa Liebm.",
          "category": "Foliage",
          "image": "https://..."
        }
      ],
      "source": "gemini" // or "fallback"
    }
  }
  ```

---

### 4.2 Frontend Architecture (`frontend/src/`)

```
frontend/src/
├── services/
│   └── chatbotApi.js             # Calls /api/chatbot/message with 25s timeout
└── components/
    └── chatbot/
        ├── ChatbotWidget.jsx     # Floating container, FAB trigger, input & image preview
        ├── ChatMessage.jsx       # Message bubble, bot diagnosis markdown, plant card links
        └── QuickPrompts.jsx      # Suggested prompt chips
```

#### UI Interactions:
1. **Collapsed State**: Sleek floating circular button with botanical icon and badge ("Ask AI") at bottom-right.
2. **Expanded State**: Floating card (approx 380px wide x 540px tall on desktop, responsive fullscreen on mobile `< 640px`).
   - Header: GreenNest AI Botanist avatar, status indicator ("Trợ lý Cây cảnh Xanh"), minimize/close button.
   - Message Area: Scrollable chat history, user messages, AI bot messages with markdown formatting.
   - Plant Cards: Mini cards embedded in bot response with thumbnail, common name, scientific name, and "Xem chi tiết" link (navigates to `/specimen-detail?id=...`).
   - Image Preview Bar: Shows chosen image thumbnail with remove `x` button before sending.
   - Quick Prompt Chips: *"Cây lọc không khí tốt"*, *"Cây an toàn cho thú cưng"*, *"Cứu cây vàng lá"*, *"Tư vấn tưới nước"*.
   - Input Bar: Text input, 📎 paperclip button to pick image (supports camera on mobile), send button.

---

## 5. Security, Validation & Reliability

1. **Payload Size Guard**:
   - `backend/src/server.js`: Update `express.json({ limit: '10mb' })` to safely receive base64 plant photos.
   - Client-side validation: Reject files > 4MB before reading base64.
2. **Fallback Reliability**:
   - If `GEMINI_API_KEY` is not provided in `.env`: Service uses an intelligent keyword-matching knowledge base (covering 10+ common plant diseases and care tips) and responds gracefully with helpful advice and suggested plants.
3. **Database Guard & Test Integrity**:
   - Read-only operations against `Plant` collection; no mutations to user databases during chat queries. Existing test suites (`npm test` in backend and `npm test` in frontend) remain 100% green.

---

## 6. Implementation Stages & Verification Plan

- **Phase 1: Backend**
  - Install `@google/genai` (official Google Gemini SDK).
  - Create `backend/src/modules/chatbot/` (`chatbot.service.js`, `chatbot.controller.js`, `chatbot.routes.js`).
  - Register route in `server.js` and set `express.json({ limit: '10mb' })`.
  - Add API test case in `backend/tests/api.test.js` to verify chatbot health and fallback behavior.
  - Verify backend test suite passes: `npm run test:unit && npm run test:api`.

- **Phase 2: Frontend**
  - Create `frontend/src/services/chatbotApi.js`.
  - Create `frontend/src/components/chatbot/ChatbotWidget.jsx` and styling.
  - Mount `<ChatbotWidget />` in `frontend/src/App.jsx`.
  - Add Vitest component test for `ChatbotWidget`.
  - Verify frontend test suite passes: `npm test`.

- **Phase 3: End-to-End Verification**
  - Test text conversation in Vietnamese and English.
  - Test image upload diagnosis with a plant photo.
  - Test RAG catalog linking (e.g. asking about "Swiss Cheese Plant" or "Monstera").
  - Test fallback mode without API key.
