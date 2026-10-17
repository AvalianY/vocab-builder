import { Icon } from '../../components/Icon';

export function WordField({ id, label, flag, error, registration }) {
  return (
    <div className="word-field">
      <label className="word-field__label" htmlFor={id}>
        <Icon name={flag} />
        <span>{label}</span>
      </label>
      <input
        {...registration}
        className="word-field__input"
        id={id}
        type="text"
        autoComplete="off"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? (
        <p className="word-field__error" id={`${id}-error`}>
          {error.message}
        </p>
      ) : null}
    </div>
  );
}
