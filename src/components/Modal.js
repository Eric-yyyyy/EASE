
import React, { useState } from 'react';

import '../CSS/Modal.css';


const Modal = ({ onSave, onDelete, event, onClose }) => {
  const [time, setTime] = useState(event.time || '');
  const [description, setDescription] = useState(event.description || '');

  const handleSave = () => {
    onSave(time, description);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <label>Time:</label>
        <input type="time" value={time} onChange={e => setTime(e.target.value)} />
        <label>Description:</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
        <button onClick={handleSave}>Save</button>
        <button onClick={onDelete}>Delete</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
