import { useEffect, useState } from 'react';

import { Icon } from '../Icon';

const MOBILE_PAGINATION_QUERY = '(max-width: 767px)';

function getPageItems(page, totalPages, compact = false) {
  const visiblePages = compact ? 4 : 5;

  if (totalPages <= visiblePages) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (compact) {
    if (page <= 2) {
      return [1, 2, 'end-gap', totalPages];
    }

    if (page >= totalPages - 1) {
      return [1, 'start-gap', totalPages - 1, totalPages];
    }

    return [1, 'start-gap', page, totalPages];
  }

  if (page <= 3) {
    return [1, 2, 3, 'end-gap', totalPages];
  }

  if (page >= totalPages - 2) {
    return [1, 'start-gap', totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, 'start-gap', page, 'end-gap', totalPages];
}

function useCompactPagination() {
  const [isCompact, setIsCompact] = useState(() =>
    typeof window === 'undefined'
      ? false
      : window.matchMedia(MOBILE_PAGINATION_QUERY).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_PAGINATION_QUERY);
    const updatePaginationMode = () => setIsCompact(mediaQuery.matches);

    updatePaginationMode();
    mediaQuery.addEventListener('change', updatePaginationMode);

    return () => mediaQuery.removeEventListener('change', updatePaginationMode);
  }, []);

  return isCompact;
}

export function Pagination({ page, totalPages, onPageChange }) {
  const isCompact = useCompactPagination();

  if (totalPages <= 1) {
    return null;
  }

  const goToPage = (nextPage) => {
    onPageChange(Math.min(totalPages, Math.max(1, nextPage)));
  };

  const pageItems = getPageItems(page, totalPages, isCompact);

  return (
    <nav className="pagination" aria-label="Words pages">
      <button
        className="pagination__button"
        type="button"
        aria-label="First page"
        disabled={page === 1}
        onClick={() => goToPage(1)}
      >
        <Icon name="pagination-first" color="currentColor" />
      </button>
      <button
        className="pagination__button"
        type="button"
        aria-label="Previous page"
        disabled={page === 1}
        onClick={() => goToPage(page - 1)}
      >
        <Icon name="pagination-prev" color="currentColor" />
      </button>

      {pageItems.map((item) =>
        typeof item === 'number' ? (
          <button
            className={`pagination__button${item === page ? ' pagination__button--active' : ''}`}
            type="button"
            aria-label={`Page ${item}`}
            aria-current={item === page ? 'page' : undefined}
            key={item}
            onClick={() => goToPage(item)}
          >
            {item}
          </button>
        ) : (
          <span className="pagination__ellipsis" aria-hidden="true" key={item}>
            ...
          </span>
        ),
      )}

      <button
        className="pagination__button"
        type="button"
        aria-label="Next page"
        disabled={page === totalPages}
        onClick={() => goToPage(page + 1)}
      >
        <Icon name="pagination-next" color="currentColor" />
      </button>
      <button
        className="pagination__button"
        type="button"
        aria-label="Last page"
        disabled={page === totalPages}
        onClick={() => goToPage(totalPages)}
      >
        <Icon name="pagination-last" color="currentColor" />
      </button>
    </nav>
  );
}
