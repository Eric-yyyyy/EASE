import React, { useState, useEffect } from 'react';
import Channel from './Channel';
import "../CSS/Channellist.css"
import AddButton from "../assets/add_button1.png"


function ChannelList({ onChannelSelect, courseId  }) {
  const CHANNELS_STORAGE_KEY = `myApp_${courseId}_channels`;
  

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

  const handleAddChannel = () => {
    const newChannel = { id: Date.now(), name: 'new channel' };
    setChannels([...channels, newChannel]);
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
    const confirmDelete = window.confirm("Are you sure you want to delete this channel?");
    if(confirmDelete){
      setChannels(channels.filter(channel => channel.id !== channelId));
    }
    
  };

  return (
    <div className="channel-list">
      <div className="add_channel">
        <h2>Channels</h2>
        <button onClick={handleAddChannel} className="add_channel_button">+</button>

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
        />
      ))}


    </div>
  );
}

export default ChannelList;
