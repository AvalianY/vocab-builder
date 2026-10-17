import { useEffect } from 'react';

import peopleReading from '../../assets/images/people-reading.png';
import { Icon } from '../Icon';
import { LogoutButton } from './LogoutButton';
import { UserNav } from './UserNav';
import { UserSummary } from './UserSummary';

export function MobileMenu({ isOpen, name, onClose }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="mobile-menu-backdrop" onMouseDown={onClose}>
      <div
        className="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="mobile-menu__top">
          <UserSummary name={name} light />
          <button
            className="mobile-menu__close"
            type="button"
            aria-label="Close navigation menu"
            onClick={onClose}
            autoFocus
          >
            <Icon name="close" />
          </button>
        </div>

        <div className="mobile-menu__navigation">
          <UserNav onNavigate={onClose} />
          <LogoutButton onComplete={onClose} />
        </div>

        <img
          className="mobile-menu__illustration"
          src={peopleReading}
          alt=""
          width="498"
          height="435"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
