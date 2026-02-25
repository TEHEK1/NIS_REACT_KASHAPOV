import { useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/shared/lib/hooks';
import { logout } from '@/features/auth';
import { baseApi } from '@/shared/api/baseApi';

const LogoutPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    const timer = setTimeout(() => {
      navigate('/login', { replace: true });
    }, 1000);
    return () => clearTimeout(timer);
  }, [dispatch, navigate]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="60vh"
      gap={3}
    >
      <CircularProgress />
      <Typography variant="h5">{t('auth.logoutTitle')}</Typography>
      <Typography color="text.secondary">{t('auth.logoutMessage')}</Typography>
    </Box>
  );
};

export default LogoutPage;
