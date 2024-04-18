// ServerMangeList.js
import React from 'react';
import ChannelList from './Channellist';
import GroupList from './Grouplist';
import "../CSS/ServerMangeList.css"


function ServerMangeList({ onChannelSelect }) {
  return (
    <div className="menu-list">
    
      <ChannelList onChannelSelect={onChannelSelect} />
      <GroupList onChannelSelect={onChannelSelect} />
    </div>
  );
}

export default ServerMangeList;
