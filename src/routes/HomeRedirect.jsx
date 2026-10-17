import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../hooks/useAppSelector';
import {
  selectIsAuthenticated,
  selectIsSessionReady,
} from '../redux/sessionSlice';
import { ROUTES } from './routePaths';

export function HomeRedirect() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isSessionReady = useAppSelector(selectIsSessionReady);

  if (!isSessionReady) {
    return null;
  }

  return (
    <Navigate
      to={isAuthenticated ? ROUTES.dictionary : ROUTES.login}
      replace
    />
  );
}
