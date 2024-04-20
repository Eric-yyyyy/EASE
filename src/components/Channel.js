import React from 'react';
import "../CSS/Channel.css"
import icon from "../assets/hashtag.svg";

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
            <div class="channel-name">
              <img src={icon} alt='hashtag icon' className='channel-hashtag'></img>
              <p>{channel.name}</p>
            </div>
            <button className="delete-channel" onClick={onDelete}>-</button>
          
        </div>
      )}
     
    </div>
  );
}

export default Channel;
