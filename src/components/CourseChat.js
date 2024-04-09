import React, { useState, useEffect } from 'react';
import '../CSS/Dmchat.css';

function ChatServer({ contact }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
 
    if (contact) {
      const storedMessages = localStorage.getItem(`messages_${contact.id}`);
      setMessages(storedMessages ? JSON.parse(storedMessages) : []);
    }
  }, [contact]);

  const handleSend = () => {
  
    if (newMessage.trim()) {
      const updatedMessages = [...messages, { text: newMessage, sender: 'user', timestamp: new Date().toISOString() }];
      setMessages(updatedMessages);
      localStorage.setItem(`messages_${contact.id}`, JSON.stringify(updatedMessages));
      setNewMessage("");
      
     
      setTimeout(() => {
        const reply = { text: "Thanks for your message!", sender: 'them', timestamp: new Date().toISOString() };
        const updatedMessagesWithReply = [...updatedMessages, reply];
        setMessages(updatedMessagesWithReply);
        localStorage.setItem(`messages_${contact.id}`, JSON.stringify(updatedMessagesWithReply));
      }, 1000); 
    }
  };

  const clearHistory = () => {
    if (contact) {
      localStorage.removeItem(`messages_${contact.id}`);
      setMessages([]);
    }
  };

  if (!contact) {
    return <div className="chat-server">Please select a contact to chat with.</div>;
  }

  return (
    <div className="chat-server">
      <h2>Chat with {contact.name}</h2>
      <div className="message-history">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <div className="message-bubble">
              <span>{message.text}</span>
              <span className="message-time">{new Date(message.timestamp).toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="message-input-area">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
      <button onClick={clearHistory} className="clear-history-button">Clear History</button>
    </div>
  );
}

export default ChatServer;
