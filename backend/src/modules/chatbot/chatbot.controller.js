const chatbotService = require('./chatbot.service');

class ChatbotController {
  async handleMessage(req, res, next) {
    try {
      const { message, image, history } = req.body;

      const hasText = typeof message === 'string' && message.trim().length > 0;
      const hasImage = image && typeof image.data === 'string' && image.data.length > 0;

      if (!hasText && !hasImage) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a message or an image to analyze.'
        });
      }

      // If image is supplied, validate mimeType
      if (hasImage && image.mimeType) {
        const allowedMime = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        if (!allowedMime.includes(image.mimeType.toLowerCase())) {
          return res.status(400).json({
            success: false,
            message: 'Unsupported image format. Please upload JPG, PNG, or WebP.'
          });
        }
      }

      const result = await chatbotService.generateReply({
        message: hasText ? message.trim() : '',
        image: hasImage ? image : null,
        history: Array.isArray(history) ? history : []
      });

      return res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ChatbotController();
