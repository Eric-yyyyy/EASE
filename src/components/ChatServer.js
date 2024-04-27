import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push, remove, serverTimestamp } from 'firebase/database';
import '../CSS/ChatServer.css';
import profile from '../assets/profile.svg';
import sendIcon from '../assets/send.svg';
import { getAnalytics } from "firebase/analytics";

// Firebase config structure
const firebaseConfig = {
  apiKey: "AIzaSyAt3FC8sPrHq-Qe5MXCCWx7d1o-v3mdd_Y",
  authDomain: "ease-55460.firebaseapp.com",
  projectId: "ease-55460",
  storageBucket: "ease-55460.appspot.com",
  messagingSenderId: "688391058373",
  appId: "1:688391058373:web:7bd587541012892fad91ac",
  measurementId: "G-2H898FSM3Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app, 'https://ease-55460-default-rtdb.firebaseio.com/');

const analytics = getAnalytics(app);


function ChatServer({ contact }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (contact) {
      const messagesRef = ref(database, `messages/${loggedInUser.user_id}_${contact.id}`);
      return onValue(messagesRef, snapshot => {
        const fetchedMessages = snapshot.val() ? Object.values(snapshot.val()) : [];
        setMessages(fetchedMessages);
      });
    }
  }, [contact, loggedInUser.user_id]);

  const handleSend = () => {
    if (newMessage.trim()) {
      const messagesRef = ref(database, `messages/${loggedInUser.user_id}_${contact.id}`);
      const newMessageObj = {
        text: newMessage,
        senderId: loggedInUser.user_id,
        sender: 'user',
        timestamp: serverTimestamp()
      };
      push(messagesRef, newMessageObj);
      setNewMessage("");
    }
  };

  const clearHistory = () => {
    const messagesRef = ref(database, `messages/${loggedInUser.user_id}_${contact.id}`);
    remove(messagesRef);
  };

  if (!contact) {
    return <div className="chat-server">Please select a contact to chat with.</div>;
  }

  return (
    <div className="chat-server">
      <h2>Chat with {contact.name}</h2>
      <div className="message-history">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.senderId === loggedInUser.user_id ? 'current-user' : 'previous-user'}`}>
            <div className="message-bubble">
              <div className="message-header">
                <div className="message-profile">
                  <img src={profile} alt='profile' className='message-profile-img'></img>
                  <span className='message-sender'>
                    {message.senderId === loggedInUser.user_id ? loggedInUser.name : contact.name}
                  </span>
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
