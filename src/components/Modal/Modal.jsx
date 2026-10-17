import { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';

import { Icon } from '../Icon';

export function Modal({
  children,
  onClose,
  title,
  ariaLabel,
  className = '',
  backdropClassName = '',
  mobileCloseIcon,
}) {
  const titleId = useId();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [onClose]);

  return createPortal(
    <div
      className={`modal-backdrop ${backdropClassName}`.trim()}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className={`modal ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-label={title ? undefined : (ariaLabel ?? 'Edit word')}
        aria-labelledby={title ? titleId : undefined}
      >
        <button
          className="modal__close"
          type="button"
          aria-label="Close modal"
          onClick={onClose}
        >
          <Icon
            className="modal__close-icon modal__close-icon--default"
            name="close"
            color="currentColor"
          />
          {mobileCloseIcon ? (
            <Icon
              className="modal__close-icon modal__close-icon--mobile"
              name={mobileCloseIcon}
              color="currentColor"
            />
          ) : null}
        </button>
        {title ? (
          <h2 className="modal__title" id={titleId}>
            {title}
          </h2>
        ) : null}
        {children}
      </section>
    </div>,
    document.body,
  );
}
