import React, { useState, useEffect } from 'react';
import "../CSS/Notification.css"

function Notification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user'))?.user_id;
    const events = JSON.parse(localStorage.getItem(`events_${userId}`)) || {};
    const notificationsArray = Object.keys(events).map(date => {
      return {
        date,
        ...events[date]
      };
    });
    notificationsArray.sort((a, b) => new Date(a.date) - new Date(b.date));
    setNotifications(notificationsArray);
  }, []);

  return (
    <div className="notification-page">
      <h1>Notifications</h1>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>
              <h2>{notification.eventType}</h2>
              <p>Time: {notification.time}</p>
              <p>Description: {notification.description}</p>
              <p>Date: {notification.date}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications to display</p>
      )}
    </div>
  );
}

export default Notification;
