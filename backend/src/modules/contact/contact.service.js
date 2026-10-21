const ContactMessage = require('./contact.model');

class ContactService {
  async sendMessage({ fullName, email, subject, message }) {
    const newMessage = await ContactMessage.create({
      fullName,
      email,
      subject,
      message
    });
    return newMessage;
  }

  async getMessages({ status, page = 1, limit = 15 }) {
    const query = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 15));
    const skip = (pageNum - 1) * limitNum;

    const [totalItems, messages] = await Promise.all([
      ContactMessage.countDocuments(query),
      ContactMessage.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
    ]);

    const totalPages = Math.ceil(totalItems / limitNum);

    return {
      messages,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalItems,
        totalPages
      }
    };
  }

  async updateMessageStatus(id, status) {
    if (!['pending', 'resolved'].includes(status)) {
      const error = new Error('Trạng thái chỉ có thể là pending hoặc resolved');
      error.statusCode = 400;
      error.errorCode = 'INVALID_STATUS';
      throw error;
    }

    const msg = await ContactMessage.findById(id);
    if (!msg) {
      const error = new Error('Không tìm thấy tin nhắn liên hệ');
      error.statusCode = 404;
      error.errorCode = 'MESSAGE_NOT_FOUND';
      throw error;
    }

    msg.status = status;
    await msg.save();
    return msg;
  }
}

module.exports = new ContactService();
