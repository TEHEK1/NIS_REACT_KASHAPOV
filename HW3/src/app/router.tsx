import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '@/widgets/layout/Layout';
import { Spinner } from '@/shared/ui';
import { ProtectedRoute } from './guards/ProtectedRoute';
import { PublicRoute } from './guards/PublicRoute';

const LoginPage = lazy(() => import('@/pages/login/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/register/RegisterPage'));
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'));
const ProductsPage = lazy(() => import('@/pages/products/ProductsPage'));
const ProductDetailPage = lazy(() => import('@/pages/product-detail/ProductDetailPage'));
const ProfilePage = lazy(() => import('@/pages/profile/ProfilePage'));
const SettingsPage = lazy(() => import('@/pages/settings/SettingsPage'));
const LogoutPage = lazy(() => import('@/pages/logout/LogoutPage'));
const NotFoundPage = lazy(() => import('@/pages/not-found/NotFoundPage'));

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<Spinner />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      { path: '/login', element: withSuspense(LoginPage) },
      { path: '/register', element: withSuspense(RegisterPage) },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          { path: '/', element: withSuspense(DashboardPage) },
          { path: '/products', element: withSuspense(ProductsPage) },
          { path: '/products/:id', element: withSuspense(ProductDetailPage) },
          { path: '/profile', element: withSuspense(ProfilePage) },
          { path: '/settings', element: withSuspense(SettingsPage) },
          { path: '/logout', element: withSuspense(LogoutPage) },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/not-found" replace /> },
  { path: '/not-found', element: withSuspense(NotFoundPage) },
]);
