import React, { useState,useEffect } from 'react';
import Channel from './Channel';

function ChannelList({ onChannelSelect }) {
 
  const [editingChannelId, setEditingChannelId] = useState(null);
  const [channelDraftName, setChannelDraftName] = useState('');
  const [channels, setChannels] = useState(() => {
    const savedChannels = localStorage.getItem('channels');
    return savedChannels ? JSON.parse(savedChannels) : [];
  });
  useEffect(() => {
    localStorage.setItem('channels', JSON.stringify(channels));
  }, [channels]);

  const handleAddChannel = () => {
    const newChannel = { id: Date.now(), name: 'New Channel' };
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
    setChannels(channels.filter(channel => channel.id !== channelId));
  };

  return (
    <div className="channel-list">
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
        />
      ))}
      <button onClick={handleAddChannel}>Add Channel</button>
    </div>
  );
}

export default ChannelList;
