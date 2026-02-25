import { useCallback } from 'react';
import {
  Box,
  Typography,
  Chip,
  Rating,
  Divider,
  Paper,
  Button,
  Avatar,
  Card,
  CardContent,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetProductByIdQuery } from '@/entities/product';
import type { ProductReview } from '@/entities/product';
import { Spinner, ErrorMessage } from '@/shared/ui';

const ReviewItem = ({ review }: { review: ProductReview }) => (
  <Card variant="outlined" sx={{ mb: 1.5 }}>
    <CardContent sx={{ display: 'flex', gap: 2, py: 1.5, '&:last-child': { pb: 1.5 } }}>
      <Avatar sx={{ width: 32, height: 32, fontSize: 14 }}>
        {review.reviewerName[0]}
      </Avatar>
      <Box flexGrow={1}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2">{review.reviewerName}</Typography>
          <Rating value={review.rating} readOnly size="small" />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {review.comment}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date(review.date).toLocaleDateString()}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const ProductDetailPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, error, refetch } = useGetProductByIdQuery(Number(id));

  const handleBack = useCallback(() => {
    navigate('/products');
  }, [navigate]);

  if (isLoading) return <Spinner />;
  if (error || !product) return <ErrorMessage onRetry={refetch} />;

  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ mb: 2 }}>
        {t('common.back')}
      </Button>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.50' }}>
            <Box
              component="img"
              src={product.images[0] || product.thumbnail}
              alt={product.title}
              sx={{ maxWidth: '100%', maxHeight: 400, objectFit: 'contain' }}
            />
          </Paper>
          {product.images.length > 1 && (
            <Box display="flex" gap={1} mt={1} overflow="auto">
              {product.images.map((img, i) => (
                <Box
                  key={i}
                  component="img"
                  src={img}
                  alt={`${product.title} ${i + 1}`}
                  sx={{
                    width: 80,
                    height: 80,
                    objectFit: 'contain',
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 0.5,
                  }}
                />
              ))}
            </Box>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {product.title}
          </Typography>

          <Box display="flex" gap={1} mb={2} flexWrap="wrap">
            <Chip label={product.category} color="primary" variant="outlined" />
            {product.brand && <Chip label={product.brand} variant="outlined" />}
            <Chip
              label={product.availabilityStatus}
              color={product.stock > 0 ? 'success' : 'error'}
              size="small"
            />
          </Box>

          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Rating value={product.rating} precision={0.1} readOnly />
            <Typography variant="body1" fontWeight={600}>
              {product.rating.toFixed(1)}
            </Typography>
          </Box>

          <Box display="flex" alignItems="baseline" gap={2} mb={3}>
            <Typography variant="h4" color="primary" fontWeight={700}>
              ${discountedPrice.toFixed(2)}
            </Typography>
            {product.discountPercentage > 0 && (
              <>
                <Typography variant="h6" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                  ${product.price.toFixed(2)}
                </Typography>
                <Chip label={`-${product.discountPercentage.toFixed(0)}%`} color="error" size="small" />
              </>
            )}
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>{t('products.description')}</Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {product.description}
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}>
              <Typography variant="body2" color="text.secondary">{t('products.sku')}</Typography>
              <Typography variant="body1">{product.sku}</Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="body2" color="text.secondary">{t('products.weight')}</Typography>
              <Typography variant="body1">{product.weight} g</Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="body2" color="text.secondary">{t('products.dimensions')}</Typography>
              <Typography variant="body1">
                {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm
              </Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="body2" color="text.secondary">{t('products.minOrder')}</Typography>
              <Typography variant="body1">{product.minimumOrderQuantity}</Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="body2" color="text.secondary">{t('products.warranty')}</Typography>
              <Typography variant="body1">{product.warrantyInformation}</Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="body2" color="text.secondary">{t('products.shipping')}</Typography>
              <Typography variant="body1">{product.shippingInformation}</Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="body2" color="text.secondary">{t('products.returnPolicy')}</Typography>
              <Typography variant="body1">{product.returnPolicy}</Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography variant="body2" color="text.secondary">{t('products.stock')}</Typography>
              <Typography variant="body1">{product.stock}</Typography>
            </Grid>
          </Grid>

          {product.tags.length > 0 && (
            <Box mt={2}>
              <Typography variant="body2" color="text.secondary" gutterBottom>{t('products.tags')}</Typography>
              <Box display="flex" gap={0.5} flexWrap="wrap">
                {product.tags.map((tag) => (
                  <Chip key={tag} label={tag} size="small" />
                ))}
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" fontWeight={700} gutterBottom>
        {t('products.reviews')} ({product.reviews.length})
      </Typography>
      {product.reviews.length === 0 ? (
        <Typography color="text.secondary">{t('products.noReviews')}</Typography>
      ) : (
        product.reviews.map((review, i) => (
          <ReviewItem key={i} review={review} />
        ))
      )}
    </Box>
  );
};

export default ProductDetailPage;
