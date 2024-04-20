// CourseServerScreen.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ServerMange from '../ServerMangeList';
import CourseChatServer from '../CourseChatServer';
import ChatServer from '../ChatServer'; 
import '../../CSS/CourseServerScreen.css';

function CourseServerScreen() {
  const location = useLocation();
  const { course } = location.state || {};
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [activeContact, setActiveContact] = useState(null); 
  const isLoggedIn = localStorage.getItem('user') !== null;

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
    setActiveContact(null); 
  };

  return (
    <div className="course-server-screen">
      {isLoggedIn ? (
        <>
          <div className="server-manage-list">
           
            <ServerMange onChannelSelect={handleChannelSelect} setActiveContact={setActiveContact} course={course} />
          </div>
          <div className="course-chat-server">
            {activeContact ? (
              <ChatServer contact={activeContact} /> 
            ) : (
              <CourseChatServer selectedChannel={selectedChannel} /> 
            )}
          </div>
        </>
      ) : (
        <p>Please log in to view this page.</p>
      )}
    </div>
  );
}

export default CourseServerScreen;
