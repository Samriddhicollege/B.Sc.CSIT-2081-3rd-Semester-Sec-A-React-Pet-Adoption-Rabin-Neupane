import { createContext, useState, useRef } from 'react';

export const NotificationContext = createContext();

export default function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const idRef = useRef(0);

  const addNotification = (message, type = 'info', duration = 3000) => {
    const id = ++idRef.current;
    const notification = { id, message, type };
    setNotifications(prev => [...prev, notification]);

    if (duration) {
      setTimeout(() => removeNotification(id), duration);
    }
    return id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}
