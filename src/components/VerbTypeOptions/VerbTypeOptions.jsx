import { Icon } from '../Icon';

const OPTIONS = [
  { label: 'Regular', value: false },
  { label: 'Irregular', value: true },
];

export function VerbTypeOptions({ value, onChange, inverse = false, name }) {
  return (
    <div
      className={`verb-type-options${inverse ? ' verb-type-options--inverse' : ''}`}
      role="radiogroup"
      aria-label="Verb type"
    >
      {OPTIONS.map((option) => {
        const checked = value === option.value;

        return (
          <label className="verb-type-options__option" key={option.label}>
            <input
              className="visually-hidden"
              type="radio"
              name={name}
              checked={checked}
              onChange={() => onChange(option.value)}
            />
            <Icon
              name={checked ? 'radio-checked' : 'radio-unchecked'}
              color="currentColor"
            />
            <span>{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}
