import { Link } from 'react-router-dom';

import { ROUTES } from '../../routes/routePaths';
import { CategorySelect } from '../CategorySelect';
import { Icon } from '../Icon';
import { VerbTypeOptions } from '../VerbTypeOptions';

export function Dashboard({
  keyword,
  onKeywordChange,
  categories,
  category,
  onCategoryChange,
  isIrregular,
  onVerbTypeChange,
  totalCount,
  onAddWord,
  idPrefix = 'dictionary',
  ariaLabel = 'Dictionary tools',
}) {
  return (
    <section
      className="dashboard"
      aria-labelledby={`${idPrefix}-tools-title`}
    >
      <h2 className="visually-hidden" id={`${idPrefix}-tools-title`}>
        {ariaLabel}
      </h2>
      <div className="dashboard__filters">
        <label className="dashboard__search">
          <span className="visually-hidden">Find the word</span>
          <input
            type="search"
            value={keyword}
            placeholder="Find the word"
            onChange={(event) => onKeywordChange(event.target.value)}
          />
          <Icon name="search" />
        </label>

        <CategorySelect
          id={`${idPrefix}-category`}
          value={category}
          options={categories}
          onChange={onCategoryChange}
        />

        {category === 'verb' ? (
          <VerbTypeOptions
            name={`${idPrefix}-verb-type`}
            value={isIrregular}
            onChange={onVerbTypeChange}
          />
        ) : null}
      </div>

      <div className="dashboard__summary">
        <p className="dashboard__statistic">
          To study: <strong>{totalCount}</strong>
        </p>
        <div className="dashboard__actions">
          {onAddWord ? (
            <button
              className="dashboard__action"
              type="button"
              onClick={onAddWord}
            >
              <span>Add word</span>
              <Icon name="plus" color="currentColor" />
            </button>
          ) : null}
          <Link className="dashboard__action" to={ROUTES.training}>
            <span>Train oneself</span>
            <Icon name="arrow-right" color="currentColor" />
          </Link>
        </div>
      </div>
    </section>
  );
}
