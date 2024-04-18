import React, { useState, useEffect } from 'react';
import Channel from './Channel';
import "../CSS/Channellist.css"; 

function GroupList({ onChannelSelect }) {
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [groupDraftName, setGroupDraftName] = useState('');
  const [groups, setGroups] = useState(() => {
    const savedGroups = localStorage.getItem('groups');
    return savedGroups ? JSON.parse(savedGroups) : [];
  });

  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups));
  }, [groups]);

  const handleRightClick = (e, groupId) => {
    e.preventDefault(); 
    handleGroupEdit(groupId); 
  };

  const handleAddGroup = () => {
    const newGroup = { id: Date.now(), name: 'New Group' };
    setGroups([...groups, newGroup]);
  };

  const handleGroupNameChange = (event, groupId) => {
    setGroupDraftName(event.target.value);
  };

  const handleGroupEdit = (groupId) => {
    setEditingGroupId(groupId);
    const group = groups.find(g => g.id === groupId);
    setGroupDraftName(group.name);
  };

  const handleSaveGroupName = (groupId) => {
    const updatedGroups = groups.map(group => {
      if (group.id === groupId) {
        return { ...group, name: groupDraftName };
      }
      return group;
    });
    setGroups(updatedGroups);
    setEditingGroupId(null);
  };

  const handleDeleteGroup = (groupId) => {
    setGroups(groups.filter(group => group.id !== groupId));
  };

  return (
    <div className="group-list">
      <div className="add_channel">
        <h2>Group List</h2>
        <button onClick={handleAddGroup} className="add_channel_button">+</button>
      </div>
      {groups.map(group => (
        <Channel
          key={group.id}
          channel={group} 
          onSelect={() => onChannelSelect(group)}
          onEdit={() => handleGroupEdit(group.id)}
          onDelete={() => handleDeleteGroup(group.id)}
          isEditing={editingGroupId === group.id}
          draftName={editingGroupId === group.id ? groupDraftName : ''}
          onDraftNameChange={handleGroupNameChange}
          onSave={() => handleSaveGroupName(group.id)}
          onRightClick={(e) => handleRightClick(e, group.id)}
        />
      ))}
    </div>
  );
}

export default GroupList;
