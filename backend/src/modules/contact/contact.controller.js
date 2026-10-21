const contactService = require('./contact.service');
const { successResponse, errorResponse } = require('../../utils/apiResponse');

class ContactController {
  async sendMessage(req, res, next) {
    try {
      const { fullName, email, subject, message } = req.body;

      if (!fullName || !email || !subject || !message) {
        return errorResponse(res, 'Please provide full name, email, subject, and message content', 400, 'MISSING_FIELDS');
      }

      const newMessage = await contactService.sendMessage(req.body);
      return successResponse(
        res,
        newMessage,
        'Your message has been sent successfully. The GreenNest team will be in touch soon!',
        201
      );
    } catch (error) {
      next(error);
    }
  }

  async getMessages(req, res, next) {
    try {
      const { status, page, limit } = req.query;
      const { messages, pagination } = await contactService.getMessages({ status, page, limit });

      return successResponse(
        res,
        messages,
        'Contact messages retrieved successfully',
        200,
        pagination
      );
    } catch (error) {
      next(error);
    }
  }

  async updateMessageStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updated = await contactService.updateMessageStatus(id, status);
      return successResponse(res, updated, `Message status updated to: ${status}`);
    } catch (error) {
      if (error.statusCode) {
        return errorResponse(res, error.message, error.statusCode, error.errorCode);
      }
      next(error);
    }
  }
}

module.exports = new ContactController();
