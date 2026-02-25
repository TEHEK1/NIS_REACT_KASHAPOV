import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="60vh"
      gap={3}
      textAlign="center"
    >
      <Typography variant="h1" fontWeight={700} color="primary" sx={{ fontSize: { xs: '6rem', md: '10rem' } }}>
        404
      </Typography>
      <Typography variant="h5">{t('notFound.title')}</Typography>
      <Typography color="text.secondary" maxWidth={400}>
        {t('notFound.message')}
      </Typography>
      <Button variant="contained" size="large" onClick={() => navigate('/')}>
        {t('notFound.goHome')}
      </Button>
    </Box>
  );
};

export default NotFoundPage;
