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
    const matchesEn = chatbotService.matchCatalogKeywords('I want to learn about Snake Plant and Monstera');
    assert.ok(Array.isArray(matchesEn));
    assert.ok(matchesEn.some(m => m.toLowerCase().includes('snake')));

    const matchesVn = chatbotService.matchCatalogKeywords('Tôi muốn tìm hiểu về cây lưỡi hổ và trầu bà');
    assert.ok(Array.isArray(matchesVn));
    assert.ok(matchesVn.some(m => m.toLowerCase().includes('snake')));
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
