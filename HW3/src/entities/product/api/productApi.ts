import { baseApi } from '@/shared/api/baseApi';
import type { Product, ProductsResponse, ProductsQueryParams } from '../model/types';

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, ProductsQueryParams>({
      query: ({ limit, skip, q }) => {
        if (q) {
          return {
            url: '/products/search',
            params: { q, limit, skip },
          };
        }
        return {
          url: '/products',
          params: { limit, skip },
        };
      },
      providesTags: ['Products'],
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
