import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/shared/lib/hooks';
import { selectIsAuthenticated, selectIsInitialized } from '@/features/auth';
import { Spinner } from '@/shared/ui';

export const PublicRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isInitialized = useAppSelector(selectIsInitialized);

  if (!isInitialized) {
    return <Spinner />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
