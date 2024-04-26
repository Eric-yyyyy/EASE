import React, { createContext, useState, useEffect } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user'))?.user_id;
    const storedEvents = JSON.parse(localStorage.getItem(`events_${userId}`)) || {};
    const eventsArray = Object.entries(storedEvents).flatMap(([date, eventList]) => {

      if (Array.isArray(eventList)) {
        return eventList.map(event => ({
          date,
          ...event
        }));
      } else {
        console.warn(`Expected an array for events on ${date}, received:`, eventList);
        return [];
      }
    });
    setEvents(eventsArray);
  }, []);

  return (
    <NotificationContext.Provider value={{ events }}>
      {children}
    </NotificationContext.Provider>
  );
};
