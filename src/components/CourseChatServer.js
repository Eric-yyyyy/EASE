import React, { useState, useEffect } from 'react';
import '../CSS/CourseChatServer.css';

function CourseChatServer({ selectedChannel }) {
  const [courseMessages, setCourseMessages] = useState([]);
  const [newCourseMessage, setNewCourseMessage] = useState('');
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (selectedChannel) {
      const storedMessages = localStorage.getItem(`course_messages_${selectedChannel.id}`);
      setCourseMessages(storedMessages ? JSON.parse(storedMessages) : []);
    }
  }, [selectedChannel]);

  const handleCourseMessageSend = () => {
    if (!newCourseMessage.trim()) return;
    const message = {
      text: newCourseMessage,
      senderId: loggedInUser.user_id,
      timestamp: new Date().toISOString()
    };
    const updatedMessages = [...courseMessages, message];
    setCourseMessages(updatedMessages);
    localStorage.setItem(`course_messages_${selectedChannel.id}`, JSON.stringify(updatedMessages));
    setNewCourseMessage("");

    setTimeout(() => {
      const reply = { 
        text: "Received your message!", //response
        senderId: 'system', 
        timestamp: new Date().toISOString() 
      };
      const updatedMessagesWithReply = [...updatedMessages, reply];
      setCourseMessages(updatedMessagesWithReply);
      localStorage.setItem(`course_messages_${selectedChannel.id}`, JSON.stringify(updatedMessagesWithReply));
    }, 1000);
  };

  const clearHistory = () => {
    if (selectedChannel) {
      localStorage.removeItem(`course_messages_${selectedChannel.id}`);
      setCourseMessages([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCourseMessageSend();
    }
  };

  if (!selectedChannel) {
    return <div className="course-chat-placeholder">Please select a channel to start chatting.</div>;
  }

  return (
    <div className="course-chat-server">
      <h2>Course Chat: {selectedChannel.name}</h2>
      <div className="course-message-history">
        {courseMessages.map((msg, index) => (
          <div key={index} className={`message ${msg.senderId === loggedInUser.user_id ? 'user' : 'them'}`}>
            <div className="message-bubble">
              <span>{msg.text}</span>
              <span className="message-time">{new Date(msg.timestamp).toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="course-message-input-area">
        <textarea
          value={newCourseMessage}
          onChange={(e) => setNewCourseMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          rows="3"
        />
        <button onClick={handleCourseMessageSend}>Send</button>
      </div>
      <button onClick={clearHistory} className="clear-history-button">Clear History</button>
    </div>
  );
}

export default CourseChatServer;