import { useContext, useEffect, useState } from 'react';
import { NotificationContext } from './Notificationcontext';

const useEventNotifier = () => {
  const { events } = useContext(NotificationContext);
  const [alertedEvents, setAlertedEvents] = useState(new Set());
  console.log(events);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime(); 
      events.forEach(event => {
        const eventTime = new Date(event.date + ' ' + event.time).getTime();
        const thirtySecondsBeforeEvent = eventTime - 30000;
        
        if (now >= thirtySecondsBeforeEvent && now < eventTime) {
          const eventKey = `${event.date} ${event.time}`;
          if (!alertedEvents.has(eventKey)) {
            alert(`Reminder: ${event.eventType} - ${event.time} - ${event.description}`);
            setAlertedEvents(prev => new Set(prev.add(eventKey)));
          }
        }
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [events, alertedEvents]);

  return null; 
};

export default useEventNotifier;
