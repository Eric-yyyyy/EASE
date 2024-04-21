import React, { useState, useEffect } from 'react';
import '../CSS/ChatServer.css';
import profile from '../assets/profile.svg';
import sendIcon from '../assets/send.svg';

function ChatServer({ contact }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const loggedInUser = JSON.parse(localStorage.getItem('user')); // Get the logged-in user

  useEffect(() => {
    if (contact) {
      // Use the loggedInUser ID and contact ID to create a unique key for fetching messages
      const chatKey = `messages_${loggedInUser.user_id}_${contact.id}`;
      const storedMessages = localStorage.getItem(chatKey);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      } else {
        setMessages([]);
      }
    }
  }, [contact]);

  const handleSend = () => {
    if (newMessage.trim()) {
      const updatedMessages = [...messages, { text: newMessage, sender: 'user', timestamp: new Date().toISOString() }];
      setMessages(updatedMessages);
      const chatKey = `messages_${loggedInUser.user_id}_${contact.id}`;
      localStorage.setItem(chatKey, JSON.stringify(updatedMessages));
      setNewMessage("");

      setTimeout(() => {
        const reply = { text: "Thanks for your message!", sender: 'them', timestamp: new Date().toISOString() };
        const updatedMessagesWithReply = [...updatedMessages, reply];
        setMessages(updatedMessagesWithReply);
        localStorage.setItem(chatKey, JSON.stringify(updatedMessagesWithReply));
      }, 1000);
    }
  };

  const clearHistory = () => {
    if (contact) {
      const chatKey = `messages_${loggedInUser.user_id}_${contact.id}`;
      localStorage.removeItem(chatKey);
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
            <div class="message-header">
                <div class="message-profile">
                  <img src={profile} alt='profile' className='message-profile-img'></img>
                  <span className='message-sender'>{message.sender === 'user' ? loggedInUser.user_id : contact.name}</span>
                </div>
                <span className="message-time">{new Date(message.timestamp).toLocaleTimeString()}</span>
              </div>
              <span className='message-text'>{message.text}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="course-message-input-area">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Type your message here..."
          rows="3"
        />
        <button onClick={handleSend}><img src={sendIcon} alt='send icon' color='rgb(85, 85, 85)'></img></button>
      </div>
      <button onClick={clearHistory} className="clear-history-button">Clear History</button>
    </div>
  );
}

export default ChatServer;
