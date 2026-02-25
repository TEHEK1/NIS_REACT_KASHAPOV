import { memo, useCallback } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import TranslateIcon from '@mui/icons-material/Translate';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { selectCurrentUser } from '@/features/auth';
import { selectTheme, selectLanguage, setTheme, setLanguage } from '@/features/settings';

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header = memo(({ onMenuToggle }: HeaderProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const theme = useAppSelector(selectTheme);
  const language = useAppSelector(selectLanguage);

  const handleThemeToggle = useCallback(() => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  }, [dispatch, theme]);

  const handleLanguageToggle = useCallback(() => {
    dispatch(setLanguage(language === 'en' ? 'ru' : 'en'));
  }, [dispatch, language]);

  return (
    <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          E-Commerce Admin
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Tooltip title={language === 'en' ? 'Русский' : 'English'}>
            <IconButton color="inherit" onClick={handleLanguageToggle}>
              <TranslateIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={theme === 'light' ? t('settings.darkTheme') : t('settings.lightTheme')}>
            <IconButton color="inherit" onClick={handleThemeToggle}>
              {theme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Tooltip>
          {user && (
            <Box display="flex" alignItems="center" gap={1} ml={1}>
              <Avatar src={user.image} alt={user.firstName} sx={{ width: 32, height: 32 }} />
              <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                {user.firstName}
              </Typography>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
});

Header.displayName = 'Header';
