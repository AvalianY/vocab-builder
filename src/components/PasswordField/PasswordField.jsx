import { useState } from 'react';

import { Icon } from '../Icon';

export function PasswordField({
  autoComplete = 'current-password',
  error,
  id,
  registration,
}) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="auth-field">
      <label className="visually-hidden" htmlFor={id}>
        Password
      </label>
      <div className={`auth-field__control${error ? ' auth-field__control--error' : ''}`}>
        <input
          {...registration}
          id={id}
          className="auth-field__input auth-field__input--password"
          type={isVisible ? 'text' : 'password'}
          placeholder="Password"
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
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
        <p className="auth-field__error" id={`${id}-error`}>
          {error.message}
        </p>
      ) : null}
    </div>
  );
}
