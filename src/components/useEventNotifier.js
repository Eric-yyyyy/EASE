import { useContext, useEffect } from 'react';
import { NotificationContext } from './Notificationcontext';

const useEventNotifier = () => {
    const { events } = useContext(NotificationContext);
    console.log(events)
  
    useEffect(() => {
        const interval = setInterval(() => {
          const now = new Date().getTime(); 
          events.forEach(event => {
            const eventTime = new Date(event.date + ' ' + event.time).getTime();
            const thirtySecondsBeforeEvent = eventTime - 30000; 
            if (now >= thirtySecondsBeforeEvent && now < eventTime) {
              alert(`Reminder: ${event.eventType} - ${event.time} - ${event.description}`);
            }
          });
        }, 30000); 
      
        return () => clearInterval(interval);
      }, [events]);
  
    return null; 
  };
  
  export default useEventNotifier;
