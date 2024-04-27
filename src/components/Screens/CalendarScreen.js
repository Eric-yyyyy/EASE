import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import Modal from '../Modal';
import '../../CSS/Calendarscreen.css';
// import homeworkIcon from '../../assets/plus.svg';
// import meetingIcon from '../../assets/minus.svg';

function CalendarScreen() {
  const { userId } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEventIndex, setSelectedEventIndex] = useState(null);

  // Initialize events from local storage or set to empty object
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem(`events_${userId}`);
    if (savedEvents) {
      const parsedEvents = JSON.parse(savedEvents);
      // Ensure each key maps to an array of events
      Object.keys(parsedEvents).forEach(key => {
        if (!Array.isArray(parsedEvents[key])) {
          parsedEvents[key] = [parsedEvents[key]]; // Convert to array if not already
        }
      });
      return parsedEvents;
    }
    return {};
  });

  const [showModal, setShowModal] = useState(false);

  // Effect to save events to local storage when they change
  useEffect(() => {
    localStorage.setItem(`events_${userId}`, JSON.stringify(events));
  }, [events, userId]);

  const onDateClick = (value, eventIndex) => {
    setSelectedDate(value);
    setSelectedEventIndex(eventIndex);
    setShowModal(true);
  };

  const saveEvent = (eventType, time, description, eventIndex) => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    setEvents(prev => {
      const updatedEvents = { ...prev };
      const newEvent = { eventType, time, description };
      if (prev[dateKey]) {
        if (typeof eventIndex === 'number') {
          updatedEvents[dateKey][eventIndex] = newEvent;
        } else {
          updatedEvents[dateKey].push(newEvent);
        }
      } else {
        updatedEvents[dateKey] = [newEvent];
      }
      return updatedEvents;
    });
    setShowModal(false);
  };

  const deleteEvent = (eventIndex) => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    setEvents(prev => {
      const updatedEvents = { ...prev };
      updatedEvents[dateKey].splice(eventIndex, 1);
      if (updatedEvents[dateKey].length === 0) {
        delete updatedEvents[dateKey];
      }
      return updatedEvents;
    });
    setShowModal(false);
  };

  const getEventIcon = (eventType) => {
    const baseStyle = "event-icon";
    // switch (eventType.toLowerCase()) {
    //   case 'homework':
    //     return <div className={baseStyle + " homework"} />;
    //   case 'meeting':
    //     return <div className={baseStyle + " meeting"} />;
    //   default:
    //     return <div className={baseStyle + " other"} />;;
    // }
    if(eventType.toLowerCase().includes('homework')) {
      return <div className={baseStyle + " homework"} />;
    }
    else if (eventType.toLowerCase().includes('meeting')) {
      return <div className={baseStyle + " meeting"} />;
    }
    else {
      return <div className={baseStyle + " other"} />;
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
            return events[dateKey] ? (
              <div className="event-icon-container">
                {events[dateKey].map((event, index) => (
                  <div key={index} className="event-block" onClick={() => onDateClick(date, index)}>
                    {getEventIcon(event.eventType)}
                  </div>
                ))}
              </div>
            ) : null;
          }
        }}
      />
      {showModal && (
        <Modal
          onSave={saveEvent}
          onDelete={() => deleteEvent(selectedEventIndex)}
          event={events[selectedDate.toISOString().split('T')[0]] ? events[selectedDate.toISOString().split('T')[0]][selectedEventIndex] : {}}
          onClose={() => setShowModal(false)}
          eventIndex={selectedEventIndex}
        />
      )}
    </div>
  );
}

export default CalendarScreen;
