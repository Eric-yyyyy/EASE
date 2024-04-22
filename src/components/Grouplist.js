import React, { useState, useEffect } from 'react';
import Channel from './Channel';
import "../CSS/Channellist.css"; 
import AddButton from "../assets/plus.svg";

function GroupList({ onChannelSelect , courseId,onChannelDeletion, groupRole}) {
  const GROUPS_STORAGE_KEY = `myApp_${courseId}_groups`;
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [groupDraftName, setGroupDraftName] = useState('');
  const [groups, setGroups] = useState(() => {
    const savedGroups = localStorage.getItem(GROUPS_STORAGE_KEY );
    return savedGroups ? JSON.parse(savedGroups) : [];
  });

  useEffect(() => {
    localStorage.setItem(GROUPS_STORAGE_KEY , JSON.stringify(groups));
  }, [groups]);
  useEffect(() => {
    
    const savedGroups = localStorage.getItem(GROUPS_STORAGE_KEY);
    setGroups(savedGroups ? JSON.parse(savedGroups) : []);
  }, [courseId]); 

  const handleRightClick = (e, groupId) => {
    e.preventDefault(); 
    handleGroupEdit(groupId); 
  };

  const handleAddGroup = () => {
    const newGroup = { id: Date.now(), name: 'new group' };
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
    const confirmDelete = window.confirm("Are you sure you want to delete this channel?");
    if(confirmDelete){
      setGroups(groups.filter(group => group.id !== groupId));
      onChannelDeletion(groupId);
    }
    
  };

  return (
    <div className="group-list">
      <div className="add_channel">
        <h2>Groups</h2>
        <button onClick={handleAddGroup} className="add_channel_button"><img width='20px' src={AddButton} alt='add'></img></button>
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
          groupRole = {groupRole}
        />
      ))}
    </div>
  );
}

export default GroupList;
