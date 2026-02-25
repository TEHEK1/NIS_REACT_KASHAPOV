import { Box, Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import { useTranslation } from 'react-i18next';

interface EmptyStateProps {
  message?: string;
}

export const EmptyState = ({ message }: EmptyStateProps) => {
  const { t } = useTranslation();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="200px"
      gap={2}
      color="text.secondary"
    >
      <InboxIcon sx={{ fontSize: 64, opacity: 0.4 }} />
      <Typography variant="h6">{message || t('common.empty')}</Typography>
    </Box>
  );
};
