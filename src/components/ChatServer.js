import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push, remove, serverTimestamp,off } from 'firebase/database';
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
  const loggedInUser = JSON.parse(localStorage.getItem('user')) || {};
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getMessagesPath = (user1, user2) => {
    const sortedUsers = [user1, user2].sort();
    return `messages/${sortedUsers[0]}_${sortedUsers[1]}`;
  };
  

  useEffect(() => {
    if (contact && loggedInUser.user_id) {
      setMessages([]);
      const messagesRef1 = ref(database, getMessagesPath(loggedInUser.user_id, contact.id));
      const messagesRef2 = ref(database, getMessagesPath(contact.id, loggedInUser.user_id));

      const onMessage = (snapshot) => {
        const messageData = snapshot.val();
        if (messageData) {
          setMessages((prevMessages) => {
            const incomingMessages = Object.values(messageData).flat();
            const combinedMessages = [...prevMessages, ...incomingMessages];
      
            const timestampDifferenceThreshold = 100; 
            let uniqueMessages = [];
      
            combinedMessages.forEach((newMsg) => {
              let isUnique = true;
      
              for (let i = 0; i < uniqueMessages.length; i++) {
                const existingMsg = uniqueMessages[i];
      
                
                if (existingMsg.senderId === newMsg.senderId && existingMsg.text === newMsg.text) {
                  const timeDiff = Math.abs(existingMsg.timestamp - newMsg.timestamp);
                  

                  if (timeDiff < timestampDifferenceThreshold) {
                    isUnique = false;
                    break;
                  }
                }
              }
      
              
              if (isUnique) {
                uniqueMessages.push(newMsg);
              }
            });
      
            uniqueMessages.sort((a, b) => a.timestamp - b.timestamp);
      
            return uniqueMessages;
          });
        }
      };
      
      

      onValue(messagesRef1, onMessage);
      onValue(messagesRef2, onMessage);

    
      return () => {
        off(messagesRef1, 'value', onMessage);
        off(messagesRef2, 'value', onMessage);
      };
    }
  }, [contact, loggedInUser.user_id]);

  const handleSend = () => {
    if (newMessage.trim()) {
      const newMessageObj = {
        text: newMessage,
        senderId: loggedInUser.user_id,
        sender: 'user',
        timestamp: serverTimestamp() 
      };
      const messagePath = getMessagesPath(loggedInUser.user_id, contact.id);
      const newMessageRef = ref(database, messagePath);

      push(newMessageRef, newMessageObj)
        .then(() => {
          setNewMessage("");
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    }
  };
  

  const clearHistory = () => {
    const messagesRef1 = ref(database, getMessagesPath(loggedInUser.user_id, contact.id));
    const messagesRef2 = ref(database, getMessagesPath(contact.id, loggedInUser.user_id));

    remove(messagesRef1);
    remove(messagesRef2);

    setMessages([]);
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
        <div ref={messagesEndRef} />
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