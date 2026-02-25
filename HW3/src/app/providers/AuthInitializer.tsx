import { useEffect, type ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { selectAuthToken, setUser, setInitialized, logout } from '@/features/auth';
import { useLazyGetMeQuery } from '@/features/auth';

interface AuthInitializerProps {
  children: ReactNode;
}

export const AuthInitializer = ({ children }: AuthInitializerProps) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectAuthToken);
  const [triggerGetMe] = useLazyGetMeQuery();

  useEffect(() => {
    if (token) {
      triggerGetMe()
        .unwrap()
        .then((user) => {
          dispatch(setUser(user));
        })
        .catch(() => {
          dispatch(logout());
          dispatch(setInitialized());
        });
    } else {
      dispatch(setInitialized());
    }
  }, [token, dispatch, triggerGetMe]);

  return <>{children}</>;
};
