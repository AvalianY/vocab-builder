import { useCallback, useMemo, useRef, useState } from 'react';

import { NotificationContext } from './NotificationContext';
import { Toast } from './Toast';

export function NotificationProvider({ children }) {
  const notificationId = useRef(0);
  const [notification, setNotification] = useState(null);

  const dismiss = useCallback(() => {
    setNotification(null);
  }, []);

  const notify = useCallback((message) => {
    notificationId.current += 1;
    setNotification({ id: notificationId.current, message });
  }, []);

  const value = useMemo(
    () => ({ dismiss, notify }),
    [dismiss, notify],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {notification ? (
        <Toast
          key={notification.id}
          message={notification.message}
          onClose={dismiss}
        />
      ) : null}
    </NotificationContext.Provider>
  );
}
