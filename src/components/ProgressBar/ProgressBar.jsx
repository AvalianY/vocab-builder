export function ProgressBar({
  value = 0,
  variant = 'table',
  displayValue,
  ariaLabel,
}) {
  const normalizedValue = Math.min(100, Math.max(0, Number(value) || 0));
  const percentage = Math.round(normalizedValue);
  const visibleValue = displayValue ?? percentage;

  return (
    <div
      className={`progress-bar progress-bar--${variant}`}
      role="progressbar"
      aria-label={ariaLabel ?? `${percentage}% completed`}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow={percentage}
    >
      <span className="progress-bar__value">{percentage}%</span>
      <span
        className="progress-bar__indicator"
        style={{ '--progress-value': `${normalizedValue}%` }}
        aria-hidden="true"
      >
        <span className="progress-bar__inside-value">{visibleValue}</span>
      </span>
    </div>
  );
}
