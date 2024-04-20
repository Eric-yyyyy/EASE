import React, { useState } from 'react';
import { useParams,useLocation } from 'react-router-dom';
import ServerMange from '../ServerMangeList';
import CourseChatServer from '../CourseChatServer';
import '../../CSS/CourseServerScreen.css';

function CourseServerScreen() {
  const location = useLocation();
  const { course } = location.state || {};
  const [selectedChannel, setSelectedChannel] = useState(null);
  const isLoggedIn = localStorage.getItem('user') !== null;

  return (
    <div className="course-server-screen">
      {isLoggedIn ? (
        <>
          <div className="server-manage-list">
            <ServerMange onChannelSelect={setSelectedChannel} course={course}/>
          </div>
          <div className="course-chat-server">
            <CourseChatServer selectedChannel={selectedChannel} />
          </div>
        </>
      ) : (
        <p>Please log in to view this page.</p>
      )}
    </div>
  );
}


export default CourseServerScreen;
