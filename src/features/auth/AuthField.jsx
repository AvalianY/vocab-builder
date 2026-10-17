export function AuthField({ error, id, label, registration, ...inputProps }) {
  return (
    <div className="auth-field">
      <label className="visually-hidden" htmlFor={id}>
        {label}
      </label>
      <div className={`auth-field__control${error ? ' auth-field__control--error' : ''}`}>
        <input
          {...registration}
          {...inputProps}
          id={id}
          className="auth-field__input"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </div>
      {error ? (
        <p className="auth-field__error" id={`${id}-error`}>
          {error.message}
        </p>
      ) : null}
    </div>
  );
}
