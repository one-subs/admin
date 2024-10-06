import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from './pages/components/Navigation';
import Loading from './pages/Loading';
import NotFound from './pages/NotFound';

// Lazy load components for unauthenticated routes
const Login = lazy(() => import('./pages/Login'));
const CreateAccount = lazy(() => import('./pages/CreateAccount'));
const Database = lazy(() => import('./pages/Database'));
const Admins = lazy(() => import('./pages/Admins'));
const Finance = lazy(() => import('./pages/Finance'));
const Partners = lazy(() => import('./pages/Partners'));

const useRoutes = isAuthenticated => {
  const AuthenticatedRoutes = (
    <Router>
      <Navigation />
      <Suspense fallback={<Loading/>}>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Finance />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/database" element={<Database />} />
          <Route path="/admins" element={<Admins />} />
          <Route path="/create-account" element={<CreateAccount />} />
        </Routes>
      </Suspense>
    </Router>
  );

  const UnauthenticatedRoutes = (
    <Suspense fallback={<Loading/>}>
      <Router>
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </Suspense>
  );

  return isAuthenticated ? AuthenticatedRoutes : UnauthenticatedRoutes;
};

export default useRoutes;
