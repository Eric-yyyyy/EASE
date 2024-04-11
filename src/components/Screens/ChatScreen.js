// ChatScreen.js
import React, { useState } from 'react';
import ChatList from '../ChatList';
import ChatServer from '../ChatServer';
import '../../CSS/Chatscreen.css';
function ChatScreen() {
  const [activeContact, setActiveContact] = useState(null);

  const isLoggedIn = localStorage.getItem('user') !== null;

  return (
    <div className="chat-screen">
      {isLoggedIn ? (
        <>
          <ChatList activeContact={activeContact} setActiveContact={setActiveContact} />
          <ChatServer contact={activeContact} />
        </>
      ) : (
        <p>Please log in to view this page.</p>
      )}
    </div>
  );
}

export default ChatScreen;
