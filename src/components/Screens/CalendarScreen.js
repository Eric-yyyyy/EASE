import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Modal from '../Modal';
import '../../CSS/Calendarscreen.css';

function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [showModal, setShowModal] = useState(false);

  const onDateClick = (value) => {
    setSelectedDate(value);
    setShowModal(true);
  };

  const saveEvent = (time, description) => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    setEvents({
      ...events,
      [dateKey]: { time, description }
    });
    setShowModal(false);
  };

  const deleteEvent = () => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    const newEvents = { ...events };
    delete newEvents[dateKey];
    setEvents(newEvents);
    setShowModal(false);
  };

  const isDateInCurrentMonth = (date, activeStartDate) => {
    const startOfMonth = new Date(activeStartDate.getFullYear(), activeStartDate.getMonth(), 1);
    const endOfMonth = new Date(activeStartDate.getFullYear(), activeStartDate.getMonth() + 1, 0);
    return date >= startOfMonth && date <= endOfMonth;
  };

  return (
    <div>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        onClickDay={onDateClick}
        tileClassName={({ date, view, activeStartDate }) =>
          isDateInCurrentMonth(date, activeStartDate) ? '' : 'calendar__tile--faded'
        }
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
