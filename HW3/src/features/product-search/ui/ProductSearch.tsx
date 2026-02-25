import { memo } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const ProductSearch = memo(({ value, onChange }: ProductSearchProps) => {
  const { t } = useTranslation();

  return (
    <TextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={t('products.searchPlaceholder')}
      size="small"
      fullWidth
      sx={{ maxWidth: 400 }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
});

ProductSearch.displayName = 'ProductSearch';
