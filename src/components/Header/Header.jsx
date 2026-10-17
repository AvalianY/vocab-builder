import { useCallback, useState } from 'react';

import { useAppSelector } from '../../hooks/useAppSelector';
import { selectCurrentUser } from '../../redux/sessionSlice';
import { Brand } from '../Brand';
import { Icon } from '../Icon';
import { LogoutButton } from './LogoutButton';
import { MobileMenu } from './MobileMenu';
import { UserNav } from './UserNav';
import { UserSummary } from './UserSummary';
import './header.css';

export function Header() {
  const user = useAppSelector(selectCurrentUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <Brand linked />

        <div className="app-header__desktop-nav">
          <UserNav />
        </div>

        <div className="app-header__account">
          <UserSummary name={user?.name || 'User'} />
          <div className="app-header__desktop-logout">
            <LogoutButton />
          </div>
          <button
            className="app-header__menu-button"
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(true)}
          >
            <Icon name="menu" />
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} name={user?.name || 'User'} onClose={closeMenu} />
    </header>
  );
}
