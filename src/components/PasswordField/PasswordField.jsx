import { useState } from 'react';

import { Icon } from '../Icon';

export function PasswordField({
  autoComplete = 'current-password',
  error,
  id,
  registration,
  valid = false,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const messageId = error || valid ? `${id}-message` : undefined;
  const controlClassName = [
    'auth-field__control',
    error ? 'auth-field__control--error' : '',
    valid ? 'auth-field__control--valid' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="auth-field">
      <label className="visually-hidden" htmlFor={id}>
        Password
      </label>
      <div className={controlClassName}>
        <input
          {...registration}
          id={id}
          className="auth-field__input auth-field__input--password"
          type={isVisible ? 'text' : 'password'}
          placeholder="Password"
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={messageId}
        />
        <button
          className="auth-field__toggle"
          type="button"
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          aria-pressed={isVisible}
          onClick={() => setIsVisible((value) => !value)}
        >
          <Icon name={isVisible ? 'eye' : 'eye-off'} />
        </button>
      </div>
      {error ? (
        <p
          className="auth-field__message auth-field__message--error"
          id={messageId}
          role="alert"
        >
          <Icon className="auth-field__message-icon" name="validation-error" />
          {error.message}
        </p>
      ) : valid ? (
        <p
          className="auth-field__message auth-field__message--success"
          id={messageId}
          role="status"
        >
          <Icon className="auth-field__message-icon" name="validation-success" />
          Success password
        </p>
      ) : null}
    </div>
  );
}
