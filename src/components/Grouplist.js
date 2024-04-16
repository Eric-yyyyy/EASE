import React, { useState } from 'react';
import Channel from './Channel';

function GroupList({ onChannelSelect }) {
  const [groups, setGroups] = useState([]);

  const addGroup = () => {
    const newChannel = { id: Date.now(), name: 'New Channel' };
    setGroups([...groups, newChannel]);

  };
  const deleteGroup = (groupId) => {/* ... */};

  return (
    <div className="group-list">
      {groups.map(group => 
        <Channel key={group.id} channel={group} onSelect={() => onChannelSelect(group)} />
      )}
      <button onClick={addGroup}>Add Group</button>
      {}
    </div>
  );
}

export default GroupList;
