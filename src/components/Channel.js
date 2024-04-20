import React from 'react';
import "../CSS/Channel.css"
import icon from "../assets/hashtag.svg";
import minus from "../assets/minus.svg";

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
            <button className="delete-channel" onClick={(e) => {
              e.stopPropagation();  // Stop the event from bubbling up to the parent div
              onDelete();
            }}><img width='15px' src={minus} alt='delete'></img></button>
          
        </div>
      )}
     
    </div>
  );
}

export default Channel;
