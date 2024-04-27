import React, { useState, useEffect } from 'react';
import '../CSS/Modal.css';

const Modal = ({ onSave, onDelete, event = {}, onClose, eventIndex }) => {
  const [eventType, setEventType] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  // This effect will update the modal's state with the event details whenever the event prop changes.
  useEffect(() => {
    if (event) {
      setEventType(event.eventType || '');
      setTime(event.time || '');
      setDescription(event.description || '');
    }
  }, [event]);

  const handleSave = () => {
    onSave(eventType, time, description, eventIndex);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <label>Event Type</label>
        <input
          value={eventType}
          onChange={e => setEventType(e.target.value)}
          placeholder="Homework, Meeting, etc..."
        />
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
