import { Alert, Button, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  const { t } = useTranslation();
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} p={3}>
      <Alert severity="error" sx={{ width: '100%', maxWidth: 500 }}>
        {message || t('common.error')}
      </Alert>
      {onRetry && (
        <Button variant="outlined" onClick={onRetry}>
          {t('common.retry')}
        </Button>
      )}
    </Box>
  );
};
