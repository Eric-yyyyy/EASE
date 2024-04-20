// ServerMangeList.js
import React from 'react';
import ChannelList from './Channellist';
import GroupList from './Grouplist';
import "../CSS/ServerMangeList.css"


function ServerMangeList({ onChannelSelect,courseId  }) {
  return (
    <div className="menu-list">
    
      <ChannelList onChannelSelect={onChannelSelect}  courseId={courseId} />
      <GroupList onChannelSelect={onChannelSelect}  courseId={courseId}/>
    </div>
  );
}

export default ServerMangeList;
