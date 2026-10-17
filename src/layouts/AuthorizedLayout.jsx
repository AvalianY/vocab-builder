import { Outlet, useLocation } from 'react-router-dom';

import { Header } from '../components/Header';
import './authorized-layout.css';

export function AuthorizedLayout() {
  const location = useLocation();

  return (
    <div className="authorized-layout">
      <Header key={location.key} />
      <main className="authorized-layout__main">
        <Outlet />
      </main>
    </div>
  );
}
