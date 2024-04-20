// ServerMangeList.js
import React from 'react';
import ChannelList from './Channellist';
import GroupList from './Grouplist';
import "../CSS/ServerMangeList.css"


function ServerMangeList({ onChannelSelect,course}) {
  return (
    <div className="menu-list">
      <h2>{removeCourseIdFromTitle(course.title)}</h2>
      <ChannelList onChannelSelect={onChannelSelect}  course={course} />
      <GroupList onChannelSelect={onChannelSelect}  course={course}/>
    </div>
  );
}
function removeCourseIdFromTitle(courseTitle) {
  let titleParts = courseTitle.split(' ');
  titleParts.pop(); 
  return titleParts.join(' '); 
}


export default ServerMangeList;
