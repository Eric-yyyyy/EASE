import React, { useState, useEffect } from 'react';
import '../CSS/ChatServer.css';
import profile from '../assets/profile.svg';
import sendIcon from '../assets/send.svg';

function ChatServer({ contact }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatKey, setChatKey] = useState(""); 
  const loggedInUser = JSON.parse(localStorage.getItem('user')); 

  useEffect(() => {
    if (contact) {
      const key1 = `messages_${contact.id}_${loggedInUser.user_id}`;
      const key2 = `messages_${loggedInUser.user_id}_${contact.id}`;
      let storedMessages = localStorage.getItem(key1);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
        setChatKey(key1);
      } else {
        storedMessages = localStorage.getItem(key2);
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages));
          setChatKey(key2);
        } else {
          setMessages([]);
          setChatKey(key1); 
        }
      }
    }
  }, [contact, loggedInUser.user_id]);

  const handleSend = () => {
    if (newMessage.trim()) {
      const updatedMessages = [...messages, {
        text: newMessage,
        senderId: loggedInUser.user_id, 
        sender: 'user',
        timestamp: new Date().toISOString()
      }];
      setMessages(updatedMessages);
      localStorage.setItem(chatKey, JSON.stringify(updatedMessages));
      setNewMessage("");
      if(contact.id === "yyan" || contact.id === "jyang118" || contact.id === "ejeong4" || contact.id === "yjiang54" || contact.id === "sjeiterj"){
    
      }else{
        setTimeout(() => {
          const reply = {
            text: "Thanks for your message!",
            senderId: 'system', // Assuming system replies, adjust as needed
            sender: 'them',
            timestamp: new Date().toISOString()
          };
          const updatedMessagesWithReply = [...updatedMessages, reply];
          setMessages(updatedMessagesWithReply);
          localStorage.setItem(chatKey, JSON.stringify(updatedMessagesWithReply));
        }, 1000);
      }


    }
  };

  const clearHistory = () => {
    if (contact) {
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
