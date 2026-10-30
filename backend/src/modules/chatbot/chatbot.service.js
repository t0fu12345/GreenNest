const mongoose = require('mongoose');
const Plant = require('../plant/plant.model');

// Bilingual dictionary mapping Vietnamese botanical terms to GreenNest English catalog names
const BILINGUAL_PLANT_MAP = [
  { keywords: ['lưỡi hổ', 'luoi ho', 'snake plant', 'sansevieria', 'dracaena'], catalogName: 'Snake Plant' },
  { keywords: ['trầu bà', 'trau ba', 'lá xẻ', 'la xe', 'monstera', 'swiss cheese'], catalogName: 'Swiss Cheese Plant' },
  { keywords: ['lan ý', 'lan y', 'huệ hòa bình', 'peace lily', 'spathiphyllum'], catalogName: 'Peace Lily Plant' },
  { keywords: ['sen đá', 'sen da', 'xương rồng', 'xuong rong', 'agave'], catalogName: 'Agave' },
  { keywords: ['sứ sa mạc', 'hoa sứ', 'hoa su', 'desert rose', 'adenium'], catalogName: 'Desert Rose' },
  { keywords: ['cẩm nhung', 'cam nhung', 'lá gấm', 'caladium', 'môn kiểng', 'heart of jesus'], catalogName: 'Caladium' },
  { keywords: ['thường xuân', 'thuong xuan', 'english ivy', 'hedera'], catalogName: 'English Ivy' },
  { keywords: ['cây dù', 'dwarf umbrella', 'schefflera', 'chân chim'], catalogName: 'Dwarf Umbrella Plant' },
  { keywords: ['hoa đại', 'hoa dai', 'sứ trắng', 'frangipani', 'plumeria'], catalogName: 'Frangipani' },
  { keywords: ['thu hải đường', 'thu hai duong', 'begonia'], catalogName: 'Begonia' },
  { keywords: ['cỏ lưỡi hổ', 'ajuga', 'cỏ giáp thảo'], catalogName: 'Ajuga' },
  { keywords: ['lá khiên ba tư', 'persian shield', 'strobilanthes'], catalogName: 'Persian Shield' },
  { keywords: ['tú cầu lá sồi', 'oakleaf hydrangea', 'hydrangea'], catalogName: 'Oakleaf Hydrangea' },
  { keywords: ['thảo biển', 'armeria', 'sea thrift'], catalogName: 'Armeria' }
];

// Fallback botanical rules when Gemini API is unavailable or offline
const FALLBACK_KNOWLEDGE = [
  {
    triggers: ['vàng lá', 'vang la', 'yellow leaf', 'yellowing'],
    title: 'Xử lý triệu chứng vàng lá ở cây trồng',
    diagnosis: 'Vàng lá là triệu chứng phổ biến nhất ở cây nội thất. Nguyên nhân thường gặp nhất (chiếm 70%) là **thừa nước dẫn đến úng rễ**, tiếp theo là **thiếu ánh sáng** hoặc **thiếu dinh dưỡng (vi lượng sắt, đạm)**.',
    actionSteps: [
      'Kiểm tra độ ẩm đất: Dùng ngón tay hoặc que gỗ cắm sâu 3-5cm vào chậu. Nếu đất còn ướt sũng, ngưng tưới ngay.',
      'Đảm bảo chậu có lỗ thoát nước tốt, không để nước đọng dưới đĩa lót quá 15 phút sau khi tưới.',
      'Di chuyển cây đến vị trí có ánh sáng tán xạ nhẹ (cách cửa sổ 1-2m), tránh nắng gắt trực tiếp làm cháy lá.',
      'Cắt bỏ những lá đã vàng úa hoàn toàn sát gốc cuống để cây dồn sức nuôi chồi mới.'
    ],
    relatedPlant: 'Snake Plant'
  },
  {
    triggers: ['đốm nâu', 'dom nau', 'đốm đen', 'cháy lá', 'chay la', 'brown spot', 'leaf spot'],
    title: 'Chẩn đoán đốm nâu và cháy rìa lá',
    diagnosis: 'Đốm nâu có quầng vàng xung quanh thường là dấu hiệu của **nhiễm nấm lá hoặc vi khuẩn** do độ ẩm quá cao và không khí bí bách. Nếu rìa lá khô giòn màu nâu thì thường do **không khí quá khô (thiếu độ ẩm)** hoặc **cháy nắng/nước máy có nhiều clo**.',
    actionSteps: [
      'Tránh tưới nước phun trực tiếp lên bề mặt lá vào buổi tối.',
      'Tăng cường độ thông thoáng gió xung quanh chậu cây.',
      'Dùng kéo đã khử trùng cồn cắt bỏ phần rìa bị thối hoặc lá bệnh nặng.',
      'Để nước máy lắng qua đêm trước khi tưới để bay hơi bớt clo và flo.'
    ],
    relatedPlant: 'Peace Lily Plant'
  },
  {
    triggers: ['tưới nước', 'tuoi nuoc', 'bao lâu tưới', 'watering', 'water schedule'],
    title: 'Nguyên tắc tưới nước cho cây nội thất',
    diagnosis: 'Nguyên tắc vàng: **"Thà để cây chịu hạn một chút còn hơn tưới quá nhiều"**. Đa số các loại cây nội thất thích chu kỳ khô nhẹ giữa hai lần tưới hơn là đất luôn ẩm ướt.',
    actionSteps: [
      'Chỉ tưới khi lớp đất bề mặt (2-3cm) đã khô ráo hoàn toàn.',
      'Tưới đẫm cho đến khi thấy nước chảy ra từ đáy chậu, sau đó đổ bỏ nước thừa ở đĩa hứng.',
      'Giảm tần suất tưới vào mùa mưa, mùa đông hoặc trong phòng máy lạnh kín.',
      'Cây mọng nước (xương rồng, sen đá, lưỡi hổ): 2-3 tuần mới tưới một lần.'
    ],
    relatedPlant: 'Snake Plant'
  },
  {
    triggers: ['thú cưng', 'thu cung', 'mèo', 'chó', 'meo', 'cho', 'pet', 'toxic'],
    title: 'Chọn cây cảnh an toàn cho thú cưng (Pet-friendly)',
    diagnosis: 'Nhiều loài cây họ Ráy (Araceae) như Trầu Bà (Monstera), Vạn Niên Thanh, Lan Ý có chứa tinh thể Canxi Oxalate có thể gây kích ứng khoang miệng và đường tiêu hóa của chó mèo nếu chúng cắn phải.',
    actionSteps: [
      'Nên chọn các loài cây an toàn: Dương Xỉ (Ferns), Cây Dây Nhện (Spider Plant), Cọ Lá Tre, Hoa Lan.',
      'Nếu trồng cây có độc tính nhẹ như Trầu Bà hay Lưỡi Hổ: Hãy đặt trên kệ cao, giá treo hoặc chậu đứng cao ngoài tầm với của thú cưng.',
      'Quan sát nếu thú cưng có thói quen gặm lá để có biện pháp cách ly an toàn.'
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

    for (const item of BILINGUAL_PLANT_MAP) {
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
      if (text && /thú cưng|chó|mèo|pet/i.test(text)) {
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
      reply = `🌿 **Trợ lý Thực vật GreenNest (Chế độ ngoại tuyến)**\n\nTôi đã nhận được hình ảnh cây của bạn! Hiện tại hệ thống đang chạy ở chế độ ngoại tuyến (chưa kết nối Gemini Vision API).\n\nĐể tôi hỗ trợ tốt nhất, bạn vui lòng **mô tả thêm các triệu chứng** bạn thấy (ví dụ: *lá bị vàng, có đốm nâu, lá bị héo rũ, rệp trắng ở nách lá*) hoặc gõ tên cây để tôi hướng dẫn cách chăm sóc và cứu cây ngay nhé!`;
    } else {
      // Find matching knowledge rule
      const matchedRule = FALLBACK_KNOWLEDGE.find((rule) =>
        rule.triggers.some((trigger) => text.toLowerCase().includes(trigger))
      );

      if (matchedRule) {
        targetPlantName = matchedRule.relatedPlant;
        const stepsFormatted = matchedRule.actionSteps.map((s, idx) => `${idx + 1}. ${s}`).join('\n');
        reply = `🌿 **${matchedRule.title}**\n\n${matchedRule.diagnosis}\n\n**Các bước xử lý khuyến nghị:**\n${stepsFormatted}\n\n*Nếu bạn có thêm câu hỏi cụ thể về loài cây nào, hãy cho tôi biết nhé!*`;
      } else {
        reply = `🌿 **Trợ lý Thực vật GreenNest**\n\nChào bạn! Tôi là chuyên gia chăm sóc cây cảnh GreenNest. Tôi có thể hỗ trợ bạn:\n- Chẩn đoán tình trạng lá vàng, đốm nâu, úng rễ, sâu bệnh.\n- Hướng dẫn chế độ tưới nước, ánh sáng và nhiệt độ thích hợp cho từng loài cây.\n- Gợi ý cây cảnh lọc không khí và an toàn cho gia đình có trẻ nhỏ/thú cưng.\n\n*Bạn hãy mô tả cụ thể tình trạng cây hoặc gửi ảnh chụp để tôi tư vấn chi tiết nhé!*`;
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
        `- ${p.name} (${p.scientificName}) | Phân loại: ${p.category} | Ánh sáng: ${p.light} | Tưới: ${p.watering} | Độc tính thú cưng: ${p.toxicity?.isToxicToPets ? 'Có độc' : 'An toàn'}`
      ).join('\n');

      const systemInstruction = `Bạn là GreenNest Chief Botanist - Chuyên gia thực vật học và chăm sóc cây cảnh thông minh của nền tảng GreenNest.
Vai trò của bạn:
1. Tư vấn chăm sóc cây trồng, chẩn đoán bệnh cây qua mô tả triệu chứng hoặc ảnh chụp một cách chuyên nghiệp, tận tâm và khoa học.
2. Khi người dùng gửi ảnh cây: Hãy quan sát cẩn thận màu sắc lá, thân, dấu hiệu sâu bệnh/úng rễ, nêu tên bệnh hoặc nguyên nhân và đưa ra các bước khắc phục cụ thể theo thứ tự 1, 2, 3.
3. Khi đề cập đến cây cảnh, hãy ưu tiên liên hệ với các loài cây trong bộ sưu tập GreenNest nếu phù hợp:
${catalogContext}
4. Giữ giọng văn thân thiện, súc tích, định dạng markdown rõ ràng với gạch đầu dòng hoặc in đậm. Trả lời bằng ngôn ngữ người dùng hỏi (chủ yếu là tiếng Việt).`;

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

      const promptText = message?.trim() || (image ? 'Hãy quan sát ảnh cây này và chẩn đoán tình trạng sức khỏe, tên bệnh và hướng dẫn cách điều trị giúp tôi.' : 'Xin chào');
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
