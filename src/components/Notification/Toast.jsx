import { useEffect } from 'react';

import { Icon } from '../Icon';
import './notification.css';

const AUTO_DISMISS_DELAY = 3000;

export function Toast({ message, onClose }) {
  useEffect(() => {
    const timeoutId = window.setTimeout(onClose, AUTO_DISMISS_DELAY);

    return () => window.clearTimeout(timeoutId);
  }, [onClose]);

  return (
    <div className="toast" role="alert" aria-live="assertive">
      <p className="toast__message">{message}</p>
      <button
        className="toast__close"
        type="button"
        aria-label="Close notification"
        onClick={onClose}
      >
        <Icon name="close" width={20} height={20} color="currentColor" />
      </button>
    </div>
  );
}
