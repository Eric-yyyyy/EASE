import React from 'react';
import "../CSS/Channel.css"

function Channel({ channel, onSelect, onDelete, onEdit, isEditing, draftName, onDraftNameChange, onSave,onRightClick }) {
  return (
    <div className="channel-item" >
      {isEditing ? (
        <input
          value={draftName}
          onChange={(e) => onDraftNameChange(e, channel.id)}
          onBlur={() => onSave()}
          onKeyDown={(e) => { if (e.key === 'Enter') onSave(); }}
          autoFocus
        />
      ) : (
        <div className="channel" onClick={onSelect} onDoubleClick={() => onEdit() } onContextMenu={onRightClick}>
        
            {channel.name}
            <button className="delete-channel" onClick={onDelete}>-</button>
          
        </div>
      )}
     
    </div>
  );
}

export default Channel;
