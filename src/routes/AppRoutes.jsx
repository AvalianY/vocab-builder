import { Route, Routes } from 'react-router-dom';

import { AuthorizedLayout } from '../layouts/AuthorizedLayout';
import { RootLayout } from '../layouts/RootLayout';
import { LoginPage } from '../pages/LoginPage';
import { RecommendPage } from '../pages/RecommendPage';
import { RegisterPage } from '../pages/RegisterPage';
import { DictionaryPage } from '../pages/DictionaryPage';
import { TrainingPage } from '../pages/TrainingPage';
import { HomeRedirect } from './HomeRedirect';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { ROUTES } from './routePaths';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path={ROUTES.home} element={<HomeRedirect />} />

        <Route element={<PublicRoute restricted />}>
          <Route path={ROUTES.register} element={<RegisterPage />} />
          <Route path={ROUTES.login} element={<LoginPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<AuthorizedLayout />}>
            <Route path={ROUTES.dictionary} element={<DictionaryPage />} />
            <Route path={ROUTES.recommend} element={<RecommendPage />} />
            <Route path={ROUTES.training} element={<TrainingPage />} />
          </Route>
        </Route>

        <Route path="*" element={<HomeRedirect />} />
      </Route>
    </Routes>
  );
}
