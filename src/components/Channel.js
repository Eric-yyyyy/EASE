import React from 'react';

function Channel({ channel, onSelect, onDelete, onEdit, isEditing, draftName, onDraftNameChange, onSave }) {
  return (
    <div className="channel-item">
      {isEditing ? (
        <input
          value={draftName}
          onChange={(e) => onDraftNameChange(e, channel.id)}
          onBlur={() => onSave()}
          onKeyDown={(e) => { if (e.key === 'Enter') onSave(); }}
          autoFocus
        />
      ) : (
        <div className="channel" onClick={onSelect} onDoubleClick={() => onEdit()}>
          {channel.name}
        </div>
      )}
      <button className="delete-channel" onClick={onDelete}>Delete</button>
    </div>
  );
}

export default Channel;
