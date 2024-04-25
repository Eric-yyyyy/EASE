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
  
  // Initialize events from local storage or set to an empty array
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem(`events_${userId}`);
    return savedEvents ? JSON.parse(savedEvents) : {};
  });

  const [showModal, setShowModal] = useState(false);

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
      [dateKey]: [...(prev[dateKey] || []), { eventType, time, description }]
    }));
    setShowModal(false);
  };

  const deleteEvent = (index) => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    setEvents(prev => {
      const updatedEvents = { ...prev };
      updatedEvents[dateKey].splice(index, 1);
      if (updatedEvents[dateKey].length === 0) {
        delete updatedEvents[dateKey];
      }
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
            const dayEvents = events[dateKey];
            return dayEvents && (
              <div className="event-icon-container">
                {dayEvents.map((event, index) => (
                  <div key={index}>{getEventIcon(event.eventType)}</div>
                ))}
              </div>
            );
          }
        }}
      />
      {showModal && (
        <Modal
          onSave={saveEvent}
          onDelete={deleteEvent}
          event={events[selectedDate.toISOString().split('T')[0]] || []}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default CalendarScreen;
