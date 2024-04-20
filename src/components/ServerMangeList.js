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
      <ChannelList onChannelSelect={onChannelSelect} course={course} onChannelDeletion={onChannelDeletion}/>
      <GroupList onChannelSelect={onChannelSelect} course={course} onChannelDeletion={onChannelDeletion}/>
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
