import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import Calendar from 'react-calendar';
import Modal from '../Modal';
import '../../CSS/Calendarscreen.css';
import homeworkIcon from '../../assets/plus.svg'; 
import meetingIcon from '../../assets/minus.svg';

function CalendarScreen() {
  const { userId } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Initialize events from local storage or set to empty object
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem(`events_${userId}`);
    return savedEvents ? JSON.parse(savedEvents) : {};
  });

  const [showModal, setShowModal] = useState(false);

  // Effect to save events to local storage when they change
  useEffect(() => {
    localStorage.setItem(`events_${userId}`, JSON.stringify(events));
  }, [events, userId]);

  const onDateClick = (value) => {
    setSelectedDate(value);
    setShowModal(true);
  };

  const saveEvent = (eventType, time, description) => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    setEvents(prev => ({
      ...prev,
      [dateKey]: { eventType, time, description }
    }));
    setShowModal(false);
  };

  const deleteEvent = () => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    setEvents(prev => {
      const updatedEvents = { ...prev };
      delete updatedEvents[dateKey];
      return updatedEvents;
    });
    setShowModal(false);
  };

  const getEventIcon = (eventType) => {
    switch (eventType.toLowerCase()) {
      case 'homework':
        return <img src={homeworkIcon} alt="Homework" className="event-icon" />;
      case 'meeting':
        return <img src={meetingIcon} alt="Meeting" className="event-icon" />;
      default:
        return null;
    }
    //return <img src={homeworkIcon} alt="Homework" className="event-icon" />;
  };

  return (
    <div>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        onClickDay={onDateClick}
        tileContent={({ date, view }) => {
          if (view === 'month') {
            const dateKey = date.toISOString().split('T')[0];
            return events[dateKey] ? (
              <div className="event-icon-container">
                {getEventIcon(events[dateKey].eventType)}
              </div>
            ) : null;
          }
        }}
      />
      {showModal && (
        <Modal
          onSave={saveEvent}
          onDelete={deleteEvent}
          event={events[selectedDate.toISOString().split('T')[0]] || {}}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default CalendarScreen;
