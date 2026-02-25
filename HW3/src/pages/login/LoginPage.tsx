import { Box, Paper, Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '@/features/auth';

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="background.default"
      p={2}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 420,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Typography variant="h4" textAlign="center" fontWeight={700}>
          {t('auth.loginTitle')}
        </Typography>
        <LoginForm />
        <Typography variant="body2" textAlign="center" color="text.secondary">
          {t('auth.noAccount')}{' '}
          <MuiLink component={Link} to="/register">
            {t('auth.registerLink')}
          </MuiLink>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginPage;
