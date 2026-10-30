import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, X, Send, Paperclip, Sprout, Bot, Sparkles, Image as ImageIcon } from 'lucide-react';
import chatbotApi from '../../services/chatbotApi';
import './ChatbotWidget.css';

const QUICK_PROMPTS = [
  'How to treat yellow leaves?',
  'Pet-safe indoor species',
  'Best air-purifying plants',
  'How often should I water?'
];

const INITIAL_BOT_MESSAGE = {
  role: 'model',
  text: 'Hello! I am **GreenNest AI Botanist** 🌿.\nI can provide expert care guidance, suggest ideal specimens for your home, or diagnose plant issues from foliage photos.\n\n*How can I assist your green sanctuary today?*',
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
      alert('Please choose an image under 4MB.');
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
        text: response?.reply || 'I apologize, I am temporarily unable to respond to this inquiry. Please try again!',
        suggestedPlants: response?.suggestedPlants || [],
        source: response?.source || 'gemini'
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: `⚠️ **Unable to connect to server:** ${error.message || 'Please check your connection and try again.'}`,
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
                  Botanical Care Specialist
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
                    alt="Specimen photo"
                    className="gn-chat-msg-image"
                  />
                )}

                {/* Formatted Text Content */}
                {renderFormattedText(msg.text)}

                {/* Source indicator for Bot */}
                {msg.role === 'model' && msg.source === 'fallback' && (
                  <span className="gn-chat-msg-source">⚡ Offline Knowledge Mode</span>
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
                          View Details
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
                  alt="Selected specimen"
                  className="gn-chat-preview-img"
                />
                <span className="gn-chat-preview-name">{selectedImage.name}</span>
              </div>
              <button
                type="button"
                className="gn-chat-preview-remove"
                onClick={handleRemoveImage}
                title="Remove image"
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
              title="Attach plant photo for health diagnosis"
              aria-label="Attach plant photo"
            >
              <Paperclip size={18} />
            </button>

            {/* Text Input */}
            <input
              type="text"
              className="gn-chat-input"
              placeholder="Ask about plant care, diagnosis, or upload photo..."
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
              aria-label="Send message"
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
