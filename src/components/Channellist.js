import React, { useState, useEffect } from 'react';
import Channel from './Channel';
import "../CSS/Channellist.css"
import AddButton from "../assets/plus.svg"



function ChannelList({ onChannelSelect, courseId ,onChannelDeletion,role  }) {
  const CHANNELS_STORAGE_KEY = `myApp_${courseId}_channels`;
  console.log(CHANNELS_STORAGE_KEY)
  

  const [editingChannelId, setEditingChannelId] = useState(null);
  const [channelDraftName, setChannelDraftName] = useState('');
  const [channels, setChannels] = useState(() => {
    const savedChannels = localStorage.getItem(CHANNELS_STORAGE_KEY);
    return savedChannels ? JSON.parse(savedChannels) : [];
  });
  useEffect(() => {
    localStorage.setItem(CHANNELS_STORAGE_KEY, JSON.stringify(channels));
  }, [channels]);
  const handleRightClick = (e, channelId) => {
    e.preventDefault(); 
    handleChannelEdit(channelId); 
  };
  useEffect(() => {
    
    const savedChannels = localStorage.getItem(CHANNELS_STORAGE_KEY);
    setChannels(savedChannels ? JSON.parse(savedChannels) : []);
  }, [courseId]); 
  

  const handleAddChannel = () => {
    console.log(role);
    if(role === "instructor"){
      const newChannel = { id: Date.now(), name: 'new channel' };
      setChannels([...channels, newChannel]);
    }else{
      alert("You do not have the permission to add channels");
    }
    
  };

  const handleChannelNameChange = (event, channelId) => {
    setChannelDraftName(event.target.value);
  };

  const handleChannelEdit = (channelId) => {
    setEditingChannelId(channelId);
    const channel = channels.find(c => c.id === channelId);
    setChannelDraftName(channel.name);
  };

  const handleSaveChannelName = (channelId) => {
    const updatedChannels = channels.map(channel => {
      if (channel.id === channelId) {
        return { ...channel, name: channelDraftName };
      }
      return channel;
    });
    setChannels(updatedChannels);
    setEditingChannelId(null);
  };

  const handleDeleteChannel = (channelId) => {
    if(role === "instructor"){
      const confirmDelete = window.confirm("Are you sure you want to delete this channel?");
      if(confirmDelete){
        setChannels(channels.filter(channel => channel.id !== channelId));
        onChannelDeletion(channelId);
      }
    }else{
      alert("You do not have the permission to delete channels");
    }
    
    
  };

  return (
    <div className="channel-list">
      <div className="add_channel">
        <h2>Channels</h2>
        <button onClick={handleAddChannel} className="add_channel_button"><img width="20px" src={AddButton} alt='add'></img></button>

      </div>
      {channels.map(channel => (
        <Channel
          key={channel.id}
          channel={channel}
          onSelect={() => onChannelSelect(channel)}
          onEdit={() => handleChannelEdit(channel.id)}
          onDelete={() => handleDeleteChannel(channel.id)}
          isEditing={editingChannelId === channel.id}
          draftName={editingChannelId === channel.id ? channelDraftName : ''}
          onDraftNameChange={handleChannelNameChange}
          onSave={() => handleSaveChannelName(channel.id)}
          onRightClick={(e) => handleRightClick(e, channel.id)}
          role = {role}
        />
      ))}


    </div>
  );
}

export default ChannelList;
