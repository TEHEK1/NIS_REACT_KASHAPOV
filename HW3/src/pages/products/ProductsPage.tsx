import { useState, useCallback, useMemo } from 'react';
import { Box, Typography, Pagination } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/shared/lib/hooks';
import { selectPageSize } from '@/features/settings';
import { ProductSearch } from '@/features/product-search';
import { useGetProductsQuery, ProductCard } from '@/entities/product';
import { Spinner, ErrorMessage, EmptyState } from '@/shared/ui';

const ProductsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = useAppSelector(selectPageSize);

  const currentPage = Number(searchParams.get('page') || '1');
  const searchQuery = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(searchQuery);

  const skip = useMemo(() => (currentPage - 1) * pageSize, [currentPage, pageSize]);

  const { data, isLoading, isFetching, error, refetch } = useGetProductsQuery({
    limit: pageSize,
    skip,
    q: searchQuery || undefined,
  });

  const totalPages = useMemo(
    () => (data ? Math.ceil(data.total / pageSize) : 0),
    [data, pageSize],
  );

  const handleSearch = useCallback(
    (value: string) => {
      setSearchInput(value);
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set('q', value);
      } else {
        params.delete('q');
      }
      params.set('page', '1');
      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const handlePageChange = useCallback(
    (_: React.ChangeEvent<unknown>, page: number) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', String(page));
      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const handleProductClick = useCallback(
    (id: number) => {
      navigate(`/products/${id}`);
    },
    [navigate],
  );

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage onRetry={refetch} />;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
        <Typography variant="h4" fontWeight={700}>
          {t('products.title')}
        </Typography>
        <ProductSearch value={searchInput} onChange={handleSearch} />
      </Box>

      {isFetching && !isLoading && (
        <Box sx={{ opacity: 0.6 }}>
          <Spinner />
        </Box>
      )}

      {!isFetching && data?.products.length === 0 && (
        <EmptyState message={t('products.noProducts')} />
      )}

      {!isFetching && data && data.products.length > 0 && (
        <>
          <Grid container spacing={3}>
            {data.products.map((product) => (
              <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <ProductCard product={product} onClick={handleProductClick} />
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default ProductsPage;
