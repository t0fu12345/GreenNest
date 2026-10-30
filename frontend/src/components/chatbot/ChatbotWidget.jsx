import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, X, Send, Paperclip, Sprout, Bot, Sparkles, Image as ImageIcon } from 'lucide-react';
import chatbotApi from '../../services/chatbotApi';
import './ChatbotWidget.css';

const QUICK_PROMPTS = [
  'Cứu cây bị vàng lá',
  'Cây nào an toàn cho mèo?',
  'Cây lọc không khí tốt trong nhà',
  'Bao lâu nên tưới nước 1 lần?'
];

const INITIAL_BOT_MESSAGE = {
  role: 'model',
  text: 'Xin chào! Tôi là **GreenNest AI Botanist** 🌿.\nTôi có thể tư vấn chăm sóc cây trồng, gợi ý cây phù hợp không gian sống hoặc chẩn đoán bệnh qua ảnh chụp lá cây.\n\n*Bạn cần hỗ trợ gì cho khu vườn hôm nay?*',
  suggestedPlants: [],
  source: 'bot'
};

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_BOT_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    if (typeof messagesEndRef.current?.scrollIntoView === 'function') {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, loading]);

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      alert('Vui lòng chọn ảnh có kích thước dưới 4MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage({
        data: reader.result,
        mimeType: file.type || 'image/jpeg',
        name: file.name
      });
    };
    reader.readAsDataURL(file);
    // Reset input so same file can be selected again
    e.target.value = '';
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handleSendMessage = async (textToSend = inputValue) => {
    const trimmed = textToSend.trim();
    if (!trimmed && !selectedImage) return;

    const userMsg = {
      role: 'user',
      text: trimmed,
      image: selectedImage?.data || null
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    const imagePayload = selectedImage ? { data: selectedImage.data, mimeType: selectedImage.mimeType } : null;
    setSelectedImage(null);
    setLoading(true);

    try {
      // Build recent history for context (last 4 items)
      const history = messages.slice(-4).map((m) => ({
        role: m.role,
        text: m.text
      }));

      const response = await chatbotApi.sendMessage({
        message: trimmed,
        image: imagePayload,
        history
      });

      const botReply = {
        role: 'model',
        text: response?.reply || 'Xin lỗi, hiện tại tôi chưa thể phản hồi câu hỏi này. Bạn vui lòng thử lại nhé!',
        suggestedPlants: response?.suggestedPlants || [],
        source: response?.source || 'gemini'
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: `⚠️ **Không thể kết nối đến máy chủ:** ${error.message || 'Vui lòng kiểm tra lại kết nối mạng hoặc thử lại sau.'}`,
          suggestedPlants: [],
          source: 'error'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderFormattedText = (text) => {
    if (!text) return null;
    // Simple markdown formatter for bold and bullet points
    const lines = text.split('\n');
    return (
      <div className="gn-chat-msg-text">
        {lines.map((line, idx) => {
          if (!line.trim()) return <br key={idx} />;

          // Bold parsing **text**
          const parts = line.split(/(\*\*.*?\*\*)/g);
          const renderedLine = parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
            }
            return part;
          });

          if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
            return (
              <p key={idx} style={{ paddingLeft: '8px', margin: '3px 0' }}>
                • {renderedLine.slice(1)}
              </p>
            );
          }

          return <p key={idx}>{renderedLine}</p>;
        })}
      </div>
    );
  };

  return (
    <>
      {/* Floating Action Button (Collapsed) */}
      {!isOpen && (
        <div className="gn-chatbot-fab-container">
          <div className="gn-chatbot-tooltip" role="tooltip">
            Have any questions? Ask our AI plant expert now
          </div>
          <button
            type="button"
            className="gn-chatbot-fab"
            onClick={() => setIsOpen(true)}
            aria-label="Ask AI Botanist"
            title="Have any questions? Ask our AI plant expert now"
          >
            <Bot size={26} color="#86efac" />
          </button>
        </div>
      )}

      {/* Floating Chat Window (Expanded) */}
      {isOpen && (
        <div className="gn-chatbot-window" role="dialog" aria-label="GreenNest AI Botanist">
          {/* Header */}
          <div className="gn-chatbot-header">
            <div className="gn-chatbot-header-info">
              <div className="gn-chatbot-avatar">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="gn-chatbot-title">GreenNest AI Botanist</h3>
                <p className="gn-chatbot-subtitle">
                  <span className="gn-chatbot-status-dot"></span>
                  Trợ lý Cây cảnh Xanh
                </p>
              </div>
            </div>
            <button
              type="button"
              className="gn-chatbot-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="gn-chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`gn-chat-msg ${msg.role === 'user' ? 'gn-chat-msg-user' : 'gn-chat-msg-bot'}`}
              >
                {/* User Image Attachment */}
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="Cây cần chẩn đoán"
                    className="gn-chat-msg-image"
                  />
                )}

                {/* Formatted Text Content */}
                {renderFormattedText(msg.text)}

                {/* Source indicator for Bot */}
                {msg.role === 'model' && msg.source === 'fallback' && (
                  <span className="gn-chat-msg-source">⚡ Chế độ tri thức ngoại tuyến</span>
                )}

                {/* Plant Cards if suggested */}
                {msg.suggestedPlants && msg.suggestedPlants.length > 0 && (
                  <div className="gn-chat-plant-cards">
                    {msg.suggestedPlants.map((plant) => (
                      <div key={plant._id || plant.specimenId} className="gn-chat-plant-card">
                        {plant.image ? (
                          <img
                            src={plant.image}
                            alt={plant.name}
                            className="gn-chat-plant-thumb"
                          />
                        ) : (
                          <div className="gn-chat-plant-thumb" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Sprout size={16} color="#86efac" />
                          </div>
                        )}
                        <div className="gn-chat-plant-details">
                          <h4 className="gn-chat-plant-name">{plant.name}</h4>
                          <p className="gn-chat-plant-sci">{plant.scientificName}</p>
                        </div>
                        <Link
                          to={`/specimen-detail?id=${plant._id || plant.specimenId}`}
                          className="gn-chat-plant-link"
                          onClick={() => setIsOpen(false)}
                        >
                          Chi tiết
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {loading && (
              <div className="gn-chat-msg gn-chat-msg-bot">
                <div className="gn-chat-typing">
                  <span className="gn-chat-typing-dot"></span>
                  <span className="gn-chat-typing-dot"></span>
                  <span className="gn-chat-typing-dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="gn-chatbot-quick-prompts">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                className="gn-quick-chip"
                onClick={() => handleSendMessage(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Image Preview Bar before sending */}
          {selectedImage && (
            <div className="gn-chat-image-preview">
              <div className="gn-chat-preview-wrap">
                <img
                  src={selectedImage.data}
                  alt="Ảnh đã chọn"
                  className="gn-chat-preview-img"
                />
                <span className="gn-chat-preview-name">{selectedImage.name}</span>
              </div>
              <button
                type="button"
                className="gn-chat-preview-remove"
                onClick={handleRemoveImage}
                title="Bỏ chọn ảnh"
              >
                ✕
              </button>
            </div>
          )}

          {/* Input Bar */}
          <form
            className="gn-chatbot-input-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            {/* Hidden File Picker */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/png, image/jpeg, image/webp"
              style={{ display: 'none' }}
              onChange={handleImageSelect}
            />

            {/* Attach Image Button */}
            <button
              type="button"
              className="gn-chat-file-btn"
              onClick={() => fileInputRef.current?.click()}
              title="Đính kèm ảnh cây để chẩn đoán bệnh"
              aria-label="Đính kèm ảnh cây"
            >
              <Paperclip size={18} />
            </button>

            {/* Text Input */}
            <input
              type="text"
              className="gn-chat-input"
              placeholder="Hỏi về chăm sóc cây, chẩn đoán bệnh..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />

            {/* Send Button */}
            <button
              type="submit"
              className="gn-chat-send-btn"
              disabled={loading || (!inputValue.trim() && !selectedImage)}
              aria-label="Gửi tin nhắn"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
