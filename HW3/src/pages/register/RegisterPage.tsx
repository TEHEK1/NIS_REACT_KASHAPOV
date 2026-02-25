import { useState, type FormEvent } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Link as MuiLink,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const RegisterPage = () => {
  const { t } = useTranslation();
  const [showStub, setShowStub] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowStub(true);
  };

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
          {t('auth.registerTitle')}
        </Typography>
        {showStub && (
          <Alert severity="info">{t('auth.registerStub')}</Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField label={t('auth.firstName')} fullWidth />
          <TextField label={t('auth.lastName')} fullWidth />
          <TextField label={t('auth.email')} type="email" fullWidth />
          <TextField label={t('auth.username')} fullWidth />
          <TextField label={t('auth.password')} type="password" fullWidth />
          <TextField label={t('auth.confirmPassword')} type="password" fullWidth />
          <Button type="submit" variant="contained" size="large" sx={{ mt: 1 }}>
            {t('auth.registerButton')}
          </Button>
        </Box>
        <Typography variant="body2" textAlign="center" color="text.secondary">
          {t('auth.hasAccount')}{' '}
          <MuiLink component={Link} to="/login">
            {t('auth.loginLink')}
          </MuiLink>
        </Typography>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
