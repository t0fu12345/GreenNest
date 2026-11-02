const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const express = require('express');

// Import chatbot routes and service
const chatbotRoutes = require('../src/modules/chatbot/chatbot.routes');
const chatbotService = require('../src/modules/chatbot/chatbot.service');

test('Chatbot Module Unit & Integration Tests', async (t) => {
  const app = express();
  app.use(express.json({ limit: '10mb' }));
  app.use('/api/chatbot', chatbotRoutes);

  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}/api/chatbot`;

  t.after(() => {
    server.close();
  });

  await t.test('POST /api/chatbot/message rejects empty payloads with 400', async () => {
    const res = await fetch(`${baseUrl}/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });

    const body = await res.json();
    assert.equal(res.status, 400);
    assert.equal(body.success, false);
    assert.match(body.message, /provide a message or an image/i);
  });

  await t.test('POST /api/chatbot/message rejects whitespace-only messages with 400', async () => {
    const res = await fetch(`${baseUrl}/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: '    ' })
    });

    const body = await res.json();
    assert.equal(res.status, 400);
    assert.equal(body.success, false);
  });

  await t.test('ChatbotService fallback handles general care question in fallback mode', async () => {
    const response = await chatbotService.generateReply({
      message: 'Why are the leaves on my indoor plant turning yellow?'
    });

    assert.equal(typeof response.reply, 'string');
    assert.ok(response.reply.length > 20);
    assert.ok(response.source === 'fallback' || response.source === 'gemini');
    assert.ok(Array.isArray(response.suggestedPlants));
  });

  await t.test('ChatbotService identifies plant keywords for catalog matching', async () => {
    const matches = chatbotService.matchCatalogKeywords('I want to learn about Snake Plant and Monstera');
    assert.ok(Array.isArray(matches));
    assert.ok(matches.some(m => m.toLowerCase().includes('snake')));
    assert.ok(matches.some(m => m.toLowerCase().includes('cheese')));
  });

  await t.test('Heart of Jesus resolves to its own catalog entry', () => {
    assert.deepEqual(chatbotService.matchCatalogKeywords('How do I care for Heart of Jesus?'), ['Heart of Jesus']);
    assert.deepEqual(chatbotService.matchCatalogKeywords('How do I care for Caladium?'), ['Caladium']);
  });

  await t.test('ChatbotService sends the user question to a supported Gemini model', async () => {
    const originalFetch = global.fetch;
    const originalKey = process.env.GEMINI_API_KEY;
    let upstreamRequest;

    process.env.GEMINI_API_KEY = 'test-gemini-key';
    global.fetch = async (url, options) => {
      upstreamRequest = { url, options };
      return {
        ok: true,
        json: async () => ({
          candidates: [{ finishReason: 'STOP', content: { parts: [
            { text: 'Internal reasoning', thought: true },
            { text: 'Water when ' },
            { text: 'the topsoil is dry.' }
          ] } }]
        })
      };
    };

    try {
      const result = await chatbotService.generateReply({ message: 'When should I water my plant?' });
      const payload = JSON.parse(upstreamRequest.options.body);

      assert.equal(result.source, 'gemini');
      assert.equal(result.reply, 'Water when the topsoil is dry.');
      assert.equal(upstreamRequest.url, 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent');
      assert.equal(upstreamRequest.options.headers['x-goog-api-key'], 'test-gemini-key');
      assert.equal(payload.contents.at(-1).parts.at(-1).text, 'When should I water my plant?');
      assert.equal(Object.hasOwn(payload.generationConfig, 'temperature'), false);
      assert.ok(payload.generationConfig.maxOutputTokens >= 4096);
      assert.equal(payload.generationConfig.thinkingConfig.thinkingLevel, 'low');
    } finally {
      global.fetch = originalFetch;
      if (originalKey === undefined) delete process.env.GEMINI_API_KEY;
      else process.env.GEMINI_API_KEY = originalKey;
    }
  });

  await t.test('fallback advice keeps the plant requested by the user instead of the rule default', async () => {
    const originalFind = chatbotService.findCatalogMatches;
    chatbotService.findCatalogMatches = async (text) => chatbotService.matchCatalogKeywords(text)
      .map(name => ({ name, specimenId: 'specimen-heart-of-jesus' }));
    try {
      const result = await chatbotService.fallbackReply({ message: 'Heart of Jesus has crispy edges' });
      assert.deepEqual(result.suggestedPlants.map(p => p.name), ['Heart of Jesus']);
    } finally {
      chatbotService.findCatalogMatches = originalFind;
    }
  });

  await t.test('POST /api/chatbot/message accepts valid message and returns 200 with expected shape', async () => {
    const res = await fetch(`${baseUrl}/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Please advise me on optimal watering frequency for indoor foliage.' })
    });

    const body = await res.json();
    assert.equal(res.status, 200);
    assert.equal(body.success, true);
    assert.ok(body.data.reply);
    assert.ok(Array.isArray(body.data.suggestedPlants));
    assert.ok(['gemini', 'fallback'].includes(body.data.source));
  });

  await t.test('POST /api/chatbot/message handles image payload without crash', async () => {
    const dummyImage = {
      data: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP...',
      mimeType: 'image/jpeg'
    };

    const res = await fetch(`${baseUrl}/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'My plant leaves show unfamiliar brown spots',
        image: dummyImage
      })
    });

    const body = await res.json();
    assert.equal(res.status, 200);
    assert.equal(body.success, true);
    assert.ok(body.data.reply);
  });
});
