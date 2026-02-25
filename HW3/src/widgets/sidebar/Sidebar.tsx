import { memo, useCallback } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const DRAWER_WIDTH = 240;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

interface NavItem {
  path: string;
  labelKey: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { path: '/', labelKey: 'nav.dashboard', icon: <DashboardIcon /> },
  { path: '/products', labelKey: 'nav.products', icon: <ShoppingCartIcon /> },
  { path: '/profile', labelKey: 'nav.profile', icon: <PersonIcon /> },
  { path: '/settings', labelKey: 'nav.settings', icon: <SettingsIcon /> },
];

export const Sidebar = memo(({ open, onClose }: SidebarProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleNavigate = useCallback((path: string) => {
    navigate(path);
    if (isMobile) onClose();
  }, [navigate, isMobile, onClose]);

  const isActive = useCallback((path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  }, [location.pathname]);

  const drawerContent = (
    <>
      <Toolbar />
      <List sx={{ flexGrow: 1 }}>
        {NAV_ITEMS.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={isActive(item.path)}
              onClick={() => handleNavigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={t(item.labelKey)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigate('/logout')}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary={t('nav.logout')} />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isMobile ? open : true}
      onClose={onClose}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
});

Sidebar.displayName = 'Sidebar';
