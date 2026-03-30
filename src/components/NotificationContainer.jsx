import { useNotification } from '../hooks/useNotification';
import '../styles/Notification.css';

export default function NotificationContainer() {
  const { notifications } = useNotification();

  return (
    <div className="notification-container">
      {notifications.map(notification => (
        <div key={notification.id} className={`notification notification-${notification.type}`}>
          {notification.message}
        </div>
      ))}
    </div>
  );
}
