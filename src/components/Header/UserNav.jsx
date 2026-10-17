import { NavLink } from 'react-router-dom';

import { ROUTES } from '../../routes/routePaths';

const NAV_ITEMS = [
  { label: 'Dictionary', to: ROUTES.dictionary },
  { label: 'Recommend', to: ROUTES.recommend },
  { label: 'Training', to: ROUTES.training },
];

export function UserNav({ onNavigate }) {
  return (
    <nav className="user-nav" aria-label="Main navigation">
      <ul className="user-nav__list">
        {NAV_ITEMS.map(({ label, to }) => (
          <li key={to}>
            <NavLink
              className={({ isActive }) =>
                `user-nav__link${isActive ? ' user-nav__link--active' : ''}`
              }
              to={to}
              onClick={onNavigate}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
