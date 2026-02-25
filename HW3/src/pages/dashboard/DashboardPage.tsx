import { useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import StarIcon from '@mui/icons-material/Star';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/shared/lib/hooks';
import { selectCurrentUser } from '@/features/auth';
import { useGetProductsQuery } from '@/entities/product';
import { Spinner, ErrorMessage } from '@/shared/ui';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => (
  <Card sx={{ height: '100%' }}>
    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box
        sx={{
          bgcolor: color,
          borderRadius: 2,
          p: 1.5,
          display: 'flex',
          color: 'white',
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h5" fontWeight={700}>
          {value}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const DashboardPage = () => {
  const { t } = useTranslation();
  const user = useAppSelector(selectCurrentUser);
  const { data, isLoading, error, refetch } = useGetProductsQuery({ limit: 0, skip: 0 });

  const stats = useMemo(() => {
    if (!data?.products) return null;
    const products = data.products;
    const categories = new Set(products.map((p) => p.category));
    const avgRating = products.reduce((sum, p) => sum + p.rating, 0) / products.length;
    const avgPrice = products.reduce((sum, p) => sum + p.price, 0) / products.length;
    return {
      total: data.total,
      categories: categories.size,
      avgRating: avgRating.toFixed(1),
      avgPrice: `$${avgPrice.toFixed(2)}`,
    };
  }, [data]);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage onRetry={refetch} />;

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        {t('dashboard.welcome')}, {user?.firstName}!
      </Typography>
      {stats && (
        <Grid container spacing={3} mt={1}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title={t('dashboard.totalProducts')}
              value={stats.total}
              icon={<ShoppingCartIcon />}
              color="#1976d2"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title={t('dashboard.categories')}
              value={stats.categories}
              icon={<CategoryIcon />}
              color="#2e7d32"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title={t('dashboard.avgRating')}
              value={stats.avgRating}
              icon={<StarIcon />}
              color="#ed6c02"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              title={t('dashboard.avgPrice')}
              value={stats.avgPrice}
              icon={<AttachMoneyIcon />}
              color="#9c27b0"
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default DashboardPage;
