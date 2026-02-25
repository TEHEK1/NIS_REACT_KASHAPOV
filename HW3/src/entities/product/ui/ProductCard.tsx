import { memo } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Rating,
  CardActionArea,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { Product } from '../model/types';

interface ProductCardProps {
  product: Product;
  onClick: (id: number) => void;
}

export const ProductCard = memo(({ product, onClick }: ProductCardProps) => {
  const { t } = useTranslation();

  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea onClick={() => onClick(product.id)} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <CardMedia
          component="img"
          height="200"
          image={product.thumbnail}
          alt={product.title}
          sx={{ objectFit: 'contain', p: 1, bgcolor: 'grey.50' }}
        />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="subtitle1" fontWeight={600} noWrap>
            {product.title}
          </Typography>
          <Chip
            label={product.category}
            size="small"
            variant="outlined"
            sx={{ alignSelf: 'flex-start' }}
          />
          <Box display="flex" alignItems="center" gap={1}>
            <Rating value={product.rating} precision={0.1} readOnly size="small" />
            <Typography variant="body2" color="text.secondary">
              {product.rating.toFixed(1)}
            </Typography>
          </Box>
          <Box display="flex" alignItems="baseline" gap={1} mt="auto">
            <Typography variant="h6" color="primary" fontWeight={700}>
              ${discountedPrice.toFixed(2)}
            </Typography>
            {product.discountPercentage > 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                ${product.price.toFixed(2)}
              </Typography>
            )}
          </Box>
          <Typography variant="body2" color={product.stock > 0 ? 'success.main' : 'error.main'}>
            {product.stock > 0 ? `${t('products.stock')}: ${product.stock}` : t('products.outOfStock')}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

ProductCard.displayName = 'ProductCard';
