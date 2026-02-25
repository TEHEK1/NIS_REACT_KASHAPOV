import { baseApi } from '@/shared/api/baseApi';
import type { User, LoginRequest, LoginResponse } from '@/entities/user';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getMe: builder.query<User, void>({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery, useLazyGetMeQuery } = authApi;
