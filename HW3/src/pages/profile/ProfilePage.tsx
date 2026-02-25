import {
  Box,
  Typography,
  Paper,
  Avatar,
  Divider,
  Button,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/shared/lib/hooks';
import { selectCurrentUser } from '@/features/auth';

const InfoRow = ({ label, value }: { label: string; value?: string }) => (
  <Box>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body1">{value || '—'}</Typography>
  </Box>
);

const ProfilePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);

  if (!user) return null;

  const fullAddress = user.address
    ? `${user.address.address}, ${user.address.city}, ${user.address.state} ${user.address.postalCode}`
    : undefined;

  return (
    <Box maxWidth={800} mx="auto">
      <Typography variant="h4" fontWeight={700} gutterBottom>
        {t('profile.title')}
      </Typography>

      <Paper sx={{ p: 4, mb: 3 }}>
        <Box display="flex" alignItems="center" gap={3} mb={3}>
          <Avatar
            src={user.image}
            alt={user.firstName}
            sx={{ width: 96, height: 96 }}
          />
          <Box>
            <Typography variant="h5" fontWeight={600}>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography color="text.secondary">@{user.username}</Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Typography variant="h6" gutterBottom>
          {t('profile.personalInfo')}
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <InfoRow label={t('profile.name')} value={`${user.firstName} ${user.lastName}`} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <InfoRow label={t('profile.email')} value={user.email} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <InfoRow label={t('profile.username')} value={user.username} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <InfoRow label={t('profile.phone')} value={user.phone} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <InfoRow label={t('profile.birthDate')} value={user.birthDate} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <InfoRow label={t('profile.address')} value={fullAddress} />
          </Grid>
          {user.company && (
            <Grid size={{ xs: 12, sm: 6 }}>
              <InfoRow
                label={t('profile.company')}
                value={`${user.company.name} — ${user.company.title}`}
              />
            </Grid>
          )}
        </Grid>
      </Paper>

      <Button
        variant="outlined"
        color="error"
        startIcon={<LogoutIcon />}
        onClick={() => navigate('/logout')}
      >
        {t('common.logout')}
      </Button>
    </Box>
  );
};

export default ProfilePage;
