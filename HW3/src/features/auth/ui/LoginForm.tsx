import { useState, useCallback, type FormEvent } from 'react';
import {
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLoginMutation } from '../api/authApi';
import { useAppDispatch } from '@/shared/lib/hooks';
import { setCredentials } from '../model/authSlice';

interface FormErrors {
  username?: string;
  password?: string;
}

export const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    if (!username.trim()) {
      newErrors.username = t('auth.usernameRequired');
    }
    if (!password.trim()) {
      newErrors.password = t('auth.passwordRequired');
    } else if (password.length < 4) {
      newErrors.password = t('auth.passwordMinLength');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [username, password, t]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) return;

    try {
      const response = await login({ username, password }).unwrap();
      const { accessToken, refreshToken: _, ...user } = response;
      dispatch(setCredentials({ user, token: accessToken }));
    } catch {
      setApiError(t('auth.invalidCredentials'));
    }
  }, [username, password, validate, login, dispatch, t]);

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {apiError && <Alert severity="error">{apiError}</Alert>}
      <TextField
        label={t('auth.username')}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={!!errors.username}
        helperText={errors.username}
        fullWidth
        autoFocus
        autoComplete="username"
      />
      <TextField
        label={t('auth.password')}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
        fullWidth
        autoComplete="current-password"
      />
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isLoading}
        sx={{ mt: 1 }}
      >
        {isLoading ? <CircularProgress size={24} /> : t('auth.loginButton')}
      </Button>
    </Box>
  );
};
