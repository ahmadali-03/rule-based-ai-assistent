import React, { useState, useRef, useEffect } from 'react';

export default function App() {
  const initialMessage = {
    sender: 'bot',
    text: 'Hello! I am your DecodeLabs AI Assistant. How can I help you today?',
    time: getCurrentTime(),
  };

  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  function getCurrentTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || isEnded || loading) return;

    const userMsg = { sender: 'user', text: query, time: getCurrentTime() };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();
      const botMsg = {
        sender: 'bot',
        text: data.response || data.error || 'No response received.',
        time: getCurrentTime(),
      };
      setMessages((prev) => [...prev, botMsg]);

      if (data.is_exit) {
        setIsEnded(true);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: '⚠️ Connection error with backend API.', time: getCurrentTime() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([{ ...initialMessage, time: getCurrentTime() }]);
    setIsEnded(false);
    setInput('');
  };

  const suggestions = [
    'What is DecodeLabs?',
    'Show topics',
    'Help me',
    'Exit',
  ];

  return (
    <div style={styles.pageWrapper}>
      {/* Dynamic Keyframe Animations */}
      <style>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={styles.card}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.headerLeft}>
            <div style={styles.botAvatar}>🤖</div>
            <div>
              <div style={styles.headerTitleContainer}>
                <h2 style={styles.title}>DecodeLabs Logic Engine</h2>
                <span style={styles.onlineStatus}>
                  <span style={styles.greenDot}></span>
                  Online
                </span>
              </div>
              <p style={styles.subtitle}>Deterministic Rule-Based AI Engine</p>
            </div>
          </div>
          <button onClick={resetChat} style={styles.resetButton} title="Reset Chat">
            🔄 Clear
          </button>
        </header>

        {/* Chat Window */}
        <div style={styles.chatWindow}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.messageRow,
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              {msg.sender === 'bot' && <div style={styles.msgAvatar}>🤖</div>}

              <div
                style={{
                  ...styles.bubble,
                  ...(msg.sender === 'user' ? styles.userBubble : styles.botBubble),
                }}
              >
                <p style={styles.messageText}>{msg.text}</p>
                <span
                  style={{
                    ...styles.timestamp,
                    color: msg.sender === 'user' ? 'rgba(255,255,255,0.7)' : '#a1a1aa',
                  }}
                >
                  {msg.time}
                </span>
              </div>

              {msg.sender === 'user' && <div style={styles.userAvatar}>👤</div>}
            </div>
          ))}

          {/* Animated Typing Indicator */}
          {loading && (
            <div style={styles.messageRow}>
              <div style={styles.msgAvatar}>🤖</div>
              <div style={{ ...styles.bubble, ...styles.botBubble, display: 'flex', gap: '6px', alignItems: 'center', padding: '12px 18px' }}>
                <span style={{ ...styles.typingDot, animationDelay: '0s' }}></span>
                <span style={{ ...styles.typingDot, animationDelay: '0.2s' }}></span>
                <span style={{ ...styles.typingDot, animationDelay: '0.4s' }}></span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        {!isEnded && messages.length < 5 && (
          <div style={styles.suggestionsContainer}>
            {suggestions.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(item)}
                disabled={loading}
                style={styles.chip}
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} style={styles.inputArea}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isEnded ? "Session ended. Click Clear to restart." : "Ask something or select a prompt..."}
            disabled={isEnded || loading}
            style={styles.input}
          />
          <button
            type="submit"
            disabled={isEnded || loading || !input.trim()}
            style={{
              ...styles.sendButton,
              opacity: isEnded || loading || !input.trim() ? 0.5 : 1,
              cursor: isEnded || loading || !input.trim() ? 'not-allowed' : 'pointer',
            }}
          >
            Send ➔
          </button>
        </form>
      </div>
    </div>
  );
}

// Styling Object (Sleek Zinc / Indigo Dark Theme)
const styles = {
  pageWrapper: {
    backgroundColor: '#09090b',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    boxSizing: 'border-box',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: '680px',
    height: '88vh',
    backgroundColor: '#18181b',
    borderRadius: '20px',
    border: '1px solid #27272a',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    padding: '18px 24px',
    backgroundColor: '#18181b',
    borderBottom: '1px solid #27272a',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '14px' },
  botAvatar: {
    fontSize: '24px',
    backgroundColor: '#27272a',
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: { display: 'flex', alignItems: 'center', gap: '10px' },
  title: { margin: 0, fontSize: '18px', fontWeight: '600', color: '#f4f4f5' },
  onlineStatus: {
    fontSize: '11px',
    color: '#22c55e',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    padding: '2px 8px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontWeight: '500',
  },
  greenDot: { width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e' },
  subtitle: { margin: '2px 0 0 0', fontSize: '12px', color: '#71717a' },
  resetButton: {
    backgroundColor: '#27272a',
    color: '#a1a1aa',
    border: '1px solid #3f3f46',
    borderRadius: '8px',
    padding: '6px 12px',
    fontSize: '12px',
    cursor: 'pointer',
    fontWeight: '500',
  },
  chatWindow: {
    flex: 1,
    padding: '20px 24px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    backgroundColor: '#09090b',
  },
  messageRow: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '8px',
    animation: 'fadeIn 0.25s ease-out forwards',
  },
  msgAvatar: { fontSize: '18px', marginBottom: '4px' },
  userAvatar: { fontSize: '18px', marginBottom: '4px' },
  bubble: {
    maxWidth: '78%',
    padding: '12px 16px',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    boxSizing: 'border-box',
  },
  botBubble: {
    backgroundColor: '#18181b',
    color: '#f4f4f5',
    border: '1px solid #27272a',
    borderBottomLeftRadius: '4px',
  },
  userBubble: {
    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    color: '#ffffff',
    borderBottomRightRadius: '4px',
  },
  messageText: { margin: 0, fontSize: '14px', lineHeight: '1.5', whiteSpace: 'pre-wrap' },
  timestamp: { fontSize: '10px', alignSelf: 'flex-end', marginTop: '2px' },
  typingDot: {
    width: '6px',
    height: '6px',
    backgroundColor: '#a1a1aa',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'pulseDot 1.2s infinite ease-in-out',
  },
  suggestionsContainer: {
    padding: '8px 24px',
    display: 'flex',
    gap: '8px',
    overflowX: 'auto',
    backgroundColor: '#09090b',
  },
  chip: {
    backgroundColor: '#18181b',
    color: '#818cf8',
    border: '1px solid #312e81',
    borderRadius: '16px',
    padding: '6px 14px',
    fontSize: '12px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  inputArea: {
    padding: '16px 24px',
    backgroundColor: '#18181b',
    borderTop: '1px solid #27272a',
    display: 'flex',
    gap: '12px',
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid #27272a',
    backgroundColor: '#09090b',
    color: '#f4f4f5',
    fontSize: '14px',
    outline: 'none',
  },
  sendButton: {
    padding: '12px 20px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#4f46e5',
    color: '#ffffff',
    fontWeight: '600',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
};