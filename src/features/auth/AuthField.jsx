import { Icon } from '../../components/Icon';

export function AuthField({
  error,
  id,
  label,
  registration,
  valid = false,
  ...inputProps
}) {
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
        {label}
      </label>
      <div className={controlClassName}>
        <input
          {...registration}
          {...inputProps}
          id={id}
          className="auth-field__input"
          aria-invalid={Boolean(error)}
          aria-describedby={messageId}
        />
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
          Success {label.toLowerCase()}
        </p>
      ) : null}
    </div>
  );
}
