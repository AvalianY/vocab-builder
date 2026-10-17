import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAppSelector } from '../hooks/useAppSelector';
import {
  selectIsAuthenticated,
  selectIsSessionReady,
} from '../redux/sessionSlice';
import { ROUTES } from './routePaths';

export function PrivateRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isSessionReady = useAppSelector(selectIsSessionReady);
  const location = useLocation();

  if (!isSessionReady) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.login}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
}
