import { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    {
      text: 'Hi! Paste a website link and ask me anything about it.',
      sender: 'bot',
    },
  ]);

  const [url, setUrl] = useState('');
  const [question, setQuestion] = useState('');

  const handleAsk = async () => {
    if (!url || !question) return;

    setMessages((prev) => [...prev, { text: question, sender: 'user' }]);

    try {
      const response = await fetch(
        'https://webibot-backend.onrender.com/analyze',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url, question }),
        }
      );

      const data = await response.json();

      setMessages((prev) => [...prev, { text: data.answer, sender: 'bot' }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: 'Error connecting to server',
          sender: 'bot',
        },
      ]);
    }

    setQuestion('');
  };

  return (
    <div className="app">
      <h3 className="welcome">🚀 Welcome to WebiBot AI</h3>

      <p className="creator">Created by Dhivya GL</p>

      <h1 className="title">🐹 WebiBot AI</h1>

      <p className="tagline">Your Intelligent Website Research Assistant</p>

      <div className="chat-box">
        <div className="bot-avatar">🐹</div>

        <div className="chat-area">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={msg.sender === 'user' ? 'user-msg' : 'bot-msg'}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <input
          className="input"
          type="text"
          placeholder="Enter website URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <input
          className="input"
          type="text"
          placeholder="Ask your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button className="ask-btn" onClick={handleAsk}>
          🚀 Ask WebiBot
        </button>
      </div>
    </div>
  );
}

export default App;
