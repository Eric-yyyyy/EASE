// ServerMangeList.js
import React from 'react';
import ChannelList from './Channellist';
import GroupList from './Grouplist';
import ChatList from './ChatList';
import { useState,useEffect } from 'react';
import "../CSS/ServerMangeList.css"


function ServerMangeList({ onChannelSelect,course,setActiveContact,onChannelDeletion }) {

  return (
    <div className="menu-list">
      <h2>{removeCourseIdFromTitle(course.title)}</h2>
      <ChannelList onChannelSelect={onChannelSelect} courseId={course.course_id} onChannelDeletion={onChannelDeletion}/>
      {/* {console.log(course.course_id)} */}
      <GroupList onChannelSelect={onChannelSelect} courseId={course.course_id} onChannelDeletion={onChannelDeletion}/>
      <ChatList setActiveContact={setActiveContact} />
    </div>
  );
}
function removeCourseIdFromTitle(courseTitle) {
  let titleParts = courseTitle.split(' ');
  titleParts.pop(); 
  return titleParts.join(' '); 
}


export default ServerMangeList;
