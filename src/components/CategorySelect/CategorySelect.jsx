import { useEffect, useRef, useState } from 'react';

import { Icon } from '../Icon';

function formatCategory(category) {
  if (!category) {
    return 'Categories';
  }

  return category.charAt(0).toUpperCase() + category.slice(1);
}

export function CategorySelect({
  id,
  value,
  options,
  onChange,
  inverse = false,
  error,
}) {
  const rootRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const closeOnOutsideClick = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  const selectCategory = (category) => {
    onChange(category);
    setIsOpen(false);
  };

  return (
    <div
      ref={rootRef}
      className={`category-select${inverse ? ' category-select--inverse' : ''}`}
    >
      <button
        id={id}
        className="category-select__trigger"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span>{formatCategory(value)}</span>
        <Icon name="chevron-down" color="currentColor" />
      </button>

      {isOpen ? (
        <ul className="category-select__menu" role="listbox" aria-label="Categories">
          {options.map((category) => (
            <li key={category} role="presentation">
              <button
                className="category-select__option"
                type="button"
                role="option"
                aria-selected={value === category}
                onClick={() => selectCategory(category)}
              >
                {formatCategory(category)}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
