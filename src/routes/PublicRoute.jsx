import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../hooks/useAppSelector';
import {
  selectIsAuthenticated,
  selectIsSessionReady,
} from '../redux/sessionSlice';
import { ROUTES } from './routePaths';

export function PublicRoute({ restricted = false }) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isSessionReady = useAppSelector(selectIsSessionReady);

  if (!isSessionReady) {
    return null;
  }

  if (restricted && isAuthenticated) {
    return <Navigate to={ROUTES.dictionary} replace />;
  }

  return <Outlet />;
}
