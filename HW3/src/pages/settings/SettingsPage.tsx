import { useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
  Divider,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import {
  selectTheme,
  selectLanguage,
  selectPageSize,
  setTheme,
  setLanguage,
  setPageSize,
} from '@/features/settings';

const PAGE_SIZE_OPTIONS = [6, 12, 24, 48];

const SettingsPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const language = useAppSelector(selectLanguage);
  const pageSize = useAppSelector(selectPageSize);

  const handleThemeChange = useCallback(
    (e: SelectChangeEvent) => {
      dispatch(setTheme(e.target.value as 'light' | 'dark'));
    },
    [dispatch],
  );

  const handleLanguageChange = useCallback(
    (e: SelectChangeEvent) => {
      dispatch(setLanguage(e.target.value as 'en' | 'ru'));
    },
    [dispatch],
  );

  const handlePageSizeChange = useCallback(
    (e: SelectChangeEvent) => {
      dispatch(setPageSize(Number(e.target.value)));
    },
    [dispatch],
  );

  return (
    <Box maxWidth={600} mx="auto">
      <Typography variant="h4" fontWeight={700} gutterBottom>
        {t('settings.title')}
      </Typography>

      <Paper sx={{ p: 4, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {t('settings.appearance')}
        </Typography>

        <Box display="flex" flexDirection="column" gap={3}>
          <FormControl fullWidth>
            <InputLabel>{t('settings.language')}</InputLabel>
            <Select value={language} onChange={handleLanguageChange} label={t('settings.language')}>
              <MenuItem value="en">{t('settings.english')}</MenuItem>
              <MenuItem value="ru">{t('settings.russian')}</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>{t('settings.theme')}</InputLabel>
            <Select value={theme} onChange={handleThemeChange} label={t('settings.theme')}>
              <MenuItem value="light">{t('settings.lightTheme')}</MenuItem>
              <MenuItem value="dark">{t('settings.darkTheme')}</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      <Paper sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>
          {t('settings.catalog')}
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <FormControl fullWidth>
          <InputLabel>{t('settings.pageSize')}</InputLabel>
          <Select
            value={String(pageSize)}
            onChange={handlePageSizeChange}
            label={t('settings.pageSize')}
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <MenuItem key={size} value={String(size)}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>
    </Box>
  );
};

export default SettingsPage;
