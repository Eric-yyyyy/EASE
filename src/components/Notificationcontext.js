import React, { createContext, useState, useEffect } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user'))?.user_id;
    const storedEvents = JSON.parse(localStorage.getItem(`events_${userId}`)) || {};
    console.log(userId);
    console.log(storedEvents);
    const eventsArray = Object.entries(storedEvents).map(([date, eventDetails]) => ({
      date,
      ...eventDetails
    }));
    setEvents(eventsArray);
  }, []);

  return (
    <NotificationContext.Provider value={{ events }}>
      {children}
    </NotificationContext.Provider>
  );
};