import React, { useState, useRef, useEffect } from 'react';

export default function App() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your DecodeLabs AI Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isEnded) return;

    const userText = input;
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'bot', text: data.response }]);

      if (data.is_exit) {
        setIsEnded(true);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Error connecting to backend API.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>🤖 DecodeLabs Logic Engine</h2>
        <span style={styles.badge}>Rule-Based AI v1.0</span>
      </header>

      <div style={styles.chatWindow}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.messageBubble,
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.sender === 'user' ? '#0070f3' : '#222',
            }}
          >
            <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong>
            <p style={{ margin: '4px 0 0 0', whiteSpace: 'pre-wrap' }}>{msg.text}</p>
          </div>
        ))}
        {loading && <div style={styles.typing}>Bot is processing...</div>}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={sendMessage} style={styles.inputArea}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isEnded ? "Session ended." : "Ask something..."}
          disabled={isEnded || loading}
          style={styles.input}
        />
        <button type="submit" disabled={isEnded || loading} style={styles.button}>
          Send
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: { display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif', backgroundColor: '#0f0f0f', color: '#fff' },
  header: { padding: '16px', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  badge: { fontSize: '12px', padding: '4px 8px', borderRadius: '4px', backgroundColor: '#333' },
  chatWindow: { flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' },
  messageBubble: { padding: '10px 14px', borderRadius: '12px', maxWidth: '80%', fontSize: '14px', lineHeight: '1.4' },
  typing: { color: '#888', fontSize: '12px', fontStyle: 'italic' },
  inputArea: { padding: '16px', borderTop: '1px solid #333', display: 'flex', gap: '8px' },
  input: { flex: 1, padding: '12px', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#1a1a1a', color: '#fff', fontSize: '14px' },
  button: { padding: '12px 20px', borderRadius: '6px', border: 'none', backgroundColor: '#0070f3', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }
};