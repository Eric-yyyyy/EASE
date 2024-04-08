// ChatScreen.js
import React, { useState } from 'react';
import ChatList from '../Userlist';
import ChatServer from '../CourseChat';
import '../../CSS/Chatscreen.css';
function ChatScreen() {
    const [activeContact, setActiveContact] = useState(null);
  
    return (
      <div className="chat-screen">
        <ChatList activeContact={activeContact} setActiveContact={setActiveContact} />
        <ChatServer contact={activeContact} />
      </div>
    );
  }

export default ChatScreen;
