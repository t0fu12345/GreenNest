const mongoose = require('mongoose');
const Plant = require('../plant/plant.model');

// Botanical keywords dictionary mapping colloquial terms to GreenNest catalog names
const BOTANICAL_PLANT_MAP = [
  { keywords: ['snake plant', 'sansevieria', 'dracaena', 'mother in laws tongue'], catalogName: 'Snake Plant' },
  { keywords: ['swiss cheese plant', 'monstera', 'monstera deliciosa', 'split leaf'], catalogName: 'Swiss Cheese Plant' },
  { keywords: ['peace lily', 'peace lily plant', 'spathiphyllum', 'white flower'], catalogName: 'Peace Lily Plant' },
  { keywords: ['agave', 'succulent', 'cactus', 'desert plant'], catalogName: 'Agave' },
  { keywords: ['desert rose', 'adenium', 'flowering succulent'], catalogName: 'Desert Rose' },
  { keywords: ['caladium', 'heart of jesus', 'angel wings'], catalogName: 'Caladium' },
  { keywords: ['english ivy', 'hedera', 'ivy vine', 'climbing ivy'], catalogName: 'English Ivy' },
  { keywords: ['dwarf umbrella plant', 'dwarf umbrella', 'schefflera', 'umbrella tree'], catalogName: 'Dwarf Umbrella Plant' },
  { keywords: ['frangipani', 'plumeria', 'tropical flower'], catalogName: 'Frangipani' },
  { keywords: ['begonia', 'wax begonia', 'polka dot begonia'], catalogName: 'Begonia' },
  { keywords: ['ajuga', 'bugleweed', 'carpet bugle'], catalogName: 'Ajuga' },
  { keywords: ['persian shield', 'strobilanthes', 'purple leaf'], catalogName: 'Persian Shield' },
  { keywords: ['oakleaf hydrangea', 'hydrangea', 'white hydrangea'], catalogName: 'Oakleaf Hydrangea' },
  { keywords: ['armeria', 'sea thrift', 'thrift flower'], catalogName: 'Armeria' }
];

// Fallback botanical rules when Gemini API is unavailable or offline (English)
const FALLBACK_KNOWLEDGE = [
  {
    triggers: ['yellow leaf', 'yellow leaves', 'yellowing', 'chlorosis'],
    title: 'Treating Yellowing Foliage in Indoor Plants',
    diagnosis: 'Yellow leaves are the most common stress signal in indoor houseplants. The predominant cause (approx. 70%) is **overwatering leading to root rot and oxygen deprivation**, followed by **insufficient natural light** or **micronutrient deficiency (iron, nitrogen)**.',
    actionSteps: [
      'Check soil moisture: Probe 3–5 cm into the potting mix. If soggy or waterlogged, pause watering immediately.',
      'Ensure the container has active drainage holes and never allow standing water in the saucer for over 15 minutes.',
      'Relocate the plant to a spot with bright, indirect daylight (1–2 meters from an unobstructed window).',
      'Prune severely yellowed or decaying leaves at the stem base with sterile shears to channel energy to new growth.'
    ],
    relatedPlant: 'Snake Plant'
  },
  {
    triggers: ['brown spot', 'leaf spot', 'burned leaves', 'crispy edges', 'brown tips'],
    title: 'Diagnosing Brown Spots and Crispy Leaf Margins',
    diagnosis: 'Brown spots surrounded by a yellow halo typically indicate **fungal or bacterial leaf spot infection** caused by overhead moisture and poor air circulation. Dry, crispy leaf edges usually stem from **low ambient humidity**, **excess direct sun**, or **tap water minerals (chlorine/fluoride)**.',
    actionSteps: [
      'Never mist or splash foliage late in the day; keep leaves dry going into the evening.',
      'Increase gentle air circulation around your plant containers.',
      'Sterilize shears with rubbing alcohol and prune heavily affected diseased leaves.',
      'Allow tap water to sit in an open container for 24 hours prior to watering to dissipate chlorine.'
    ],
    relatedPlant: 'Peace Lily Plant'
  },
  {
    triggers: ['watering', 'water schedule', 'how often to water', 'hydration', 'thirsty'],
    title: 'Essential Plant Hydration Guidelines',
    diagnosis: 'Horticultural golden rule: **"It is far safer to underwater than overwater"**. Most indoor flora flourish when allowed a gentle drying interval between deep soakings rather than residing in continuously wet soil.',
    actionSteps: [
      'Water only when the top 2–3 cm of potting substrate feels completely dry to the touch.',
      'Soak thoroughly until water streams freely from the base drainage holes, then discard excess tray runoff.',
      'Reduce watering frequency by 50% during colder winter months or in air-conditioned environments.',
      'Drought-tolerant specimens (succulents, snake plants, cacti) generally need water only every 2–3 weeks.'
    ],
    relatedPlant: 'Snake Plant'
  },
  {
    triggers: ['pet', 'pets', 'cat', 'cats', 'dog', 'dogs', 'toxic', 'poisonous', 'safe for cats'],
    title: 'Pet-Friendly & Non-Toxic Houseplants',
    diagnosis: 'Many popular Araceae family species (Monstera, Dieffenbachia, Peace Lily) contain insoluble calcium oxalate crystals which can induce mouth pain and digestive upset if ingested by cats or dogs.',
    actionSteps: [
      'Safe non-toxic recommendations: Boston Ferns, Spider Plants, Calatheas, and Phalaenopsis Orchids.',
      'If growing mildly toxic species like Monstera or Snake Plant: Position on high pedestals or wall mounts out of reach.',
      'Deter curious pets by providing pet grass or non-toxic catnip alternatives.'
    ],
    relatedPlant: 'Caladium'
  }
];

class ChatbotService {
  /**
   * Match keywords in message to GreenNest catalog plant names
   */
  matchCatalogKeywords(text) {
    if (!text || typeof text !== 'string') return [];
    const normalized = text.toLowerCase();
    const matchedNames = new Set();

    for (const item of BOTANICAL_PLANT_MAP) {
      if (item.keywords.some((kw) => normalized.includes(kw))) {
        matchedNames.add(item.catalogName);
      }
    }

    return Array.from(matchedNames);
  }

  /**
   * Fetch matching Plant documents from MongoDB
   */
  async findCatalogMatches(text) {
    if (mongoose.connection.readyState !== 1) {
      return [];
    }
    try {
      const matchedCatalogNames = this.matchCatalogKeywords(text);
      if (matchedCatalogNames.length > 0) {
        const plants = await Plant.find({
          name: { $in: matchedCatalogNames },
          status: 'published'
        }).select('_id specimenId name scientificName category images toxicity careLevel light watering').limit(3);
        if (plants.length > 0) return plants;
      }

      // Check if user is asking for pet-friendly plants
      if (text && /pet|toxic|cat|dog/i.test(text)) {
        const safePlants = await Plant.find({
          'toxicity.isToxicToPets': false,
          status: 'published'
        }).select('_id specimenId name scientificName category images toxicity careLevel light watering').limit(2);
        if (safePlants.length > 0) return safePlants;
      }

      // Default fallback: return 1 popular easy plant if nothing matches
      return await Plant.find({ status: 'published' })
        .select('_id specimenId name scientificName category images toxicity careLevel light watering')
        .limit(1);
    } catch {
      // In standalone unit tests without MongoDB connection, return empty array gracefully
      return [];
    }
  }

  /**
   * Format plant records for suggestedPlants response
   */
  formatSuggestedPlants(plants) {
    if (!Array.isArray(plants)) return [];
    return plants.map((p) => ({
      _id: p._id,
      specimenId: p.specimenId,
      name: p.name,
      scientificName: p.scientificName,
      category: p.category,
      careLevel: p.careLevel,
      image: p.images?.hero || (Array.isArray(p.images?.gallery) ? p.images.gallery[0] : null) || ''
    }));
  }

  /**
   * Rule-based fallback response engine
   */
  async fallbackReply({ message = '', image = null }) {
    const text = message.trim();
    let reply = '';
    let targetPlantName = null;

    if (image && !text) {
      reply = `🌿 **GreenNest AI Botanist (Offline Mode)**\n\nI have received your plant image! The system is currently running in offline fallback mode (Gemini Vision API disconnected).\n\nTo give you the most accurate botanical advice, please **describe any visible symptoms** you notice (e.g., *yellow leaves, brown tips, wilting foliage, webbings, or pests*) or provide the plant's name!`;
    } else {
      // Find matching knowledge rule
      const matchedRule = FALLBACK_KNOWLEDGE.find((rule) =>
        rule.triggers.some((trigger) => text.toLowerCase().includes(trigger))
      );

      if (matchedRule) {
        targetPlantName = matchedRule.relatedPlant;
        const stepsFormatted = matchedRule.actionSteps.map((s, idx) => `${idx + 1}. ${s}`).join('\n');
        reply = `🌿 **${matchedRule.title}**\n\n${matchedRule.diagnosis}\n\n**Recommended Action Steps:**\n${stepsFormatted}\n\n*If you have specific questions about any specimen, let me know!*`;
      } else {
        reply = `🌿 **GreenNest AI Botanist**\n\nHello! I am your GreenNest botanical care specialist. I can assist you with:\n- Diagnosing yellowing foliage, leaf spots, root rot, and pest infestations.\n- Recommending optimal hydration, light exposure, and humidity for your plants.\n- Finding air-purifying and non-toxic species for homes with children or pets.\n\n*Please describe your plant's symptoms or upload a photo to begin diagnosis!*`;
      }
    }

    const matchedPlants = await this.findCatalogMatches(targetPlantName || text);
    return {
      reply,
      suggestedPlants: this.formatSuggestedPlants(matchedPlants),
      source: 'fallback'
    };
  }

  /**
   * Main reply generator using Gemini 2.5 Flash (with fallback)
   */
  async generateReply({ message = '', image = null, history = [] }) {
    const apiKey = process.env.GEMINI_API_KEY;

    // If API key is not configured, immediately use resilient fallback engine
    if (!apiKey || apiKey.trim() === '' || apiKey.includes('your_gemini_api_key')) {
      return this.fallbackReply({ message, image });
    }

    try {
      const catalogPlants = await this.findCatalogMatches(message);
      const catalogContext = catalogPlants.map(p => 
        `- ${p.name} (${p.scientificName}) | Category: ${p.category} | Light: ${p.light} | Watering: ${p.watering} | Pet Safety: ${p.toxicity?.isToxicToPets ? 'Toxic' : 'Pet-Friendly'}`
      ).join('\n');

      const systemInstruction = `You are GreenNest Chief Botanist - an expert AI botanist, horticulturist, and plant care specialist on the GreenNest platform.
Your responsibilities:
1. Provide caring, scientifically grounded, and actionable plant care advice and disease diagnosis in English based on user symptoms or uploaded photos.
2. When analyzing plant images: Examine leaf coloration, stem integrity, and signs of pest infestation or root distress. State the diagnosis clearly and outline step-by-step treatment in numbered points (1, 2, 3).
3. Connect recommendations to GreenNest catalog botanical specimens where appropriate:
${catalogContext}
4. Maintain a warm, encouraging, and authoritative tone using structured markdown (bold headings, bullet points). Always respond in clear, professional English.`;

      // Build Gemini request payload
      const parts = [];
      if (image && image.data) {
        // Strip data:image/...;base64, prefix if present
        const base64Data = image.data.includes(',') ? image.data.split(',')[1] : image.data;
        parts.push({
          inlineData: {
            mimeType: image.mimeType || 'image/jpeg',
            data: base64Data
          }
        });
      }

      const promptText = message?.trim() || (image ? 'Please examine this plant photograph, diagnose its health condition, identify any pests or diseases, and provide clear step-by-step treatment instructions.' : 'Hello');
      parts.push({ text: promptText });

      // Build conversation contents including history
      const contents = [];
      if (Array.isArray(history) && history.length > 0) {
        for (const item of history.slice(-4)) {
          if (item.text) {
            contents.push({
              role: item.role === 'model' ? 'model' : 'user',
              parts: [{ text: item.text }]
            });
          }
        }
      }
      contents.push({ role: 'user', parts });

      const requestPayload = {
        contents,
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 1024
        }
      };

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestPayload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`[Gemini API] Upstream error (${response.status}): ${errorText}. Engaging fallback.`);
        return this.fallbackReply({ message, image });
      }

      const data = await response.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!reply) {
        return this.fallbackReply({ message, image });
      }

      return {
        reply,
        suggestedPlants: this.formatSuggestedPlants(catalogPlants),
        source: 'gemini'
      };
    } catch (error) {
      console.warn(`[ChatbotService] Exception: ${error.message}. Engaging fallback.`);
      return this.fallbackReply({ message, image });
    }
  }
}

module.exports = new ChatbotService();
