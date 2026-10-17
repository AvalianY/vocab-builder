import { baseApi } from './baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: '/users/signup',
        method: 'POST',
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/users/signin',
        method: 'POST',
        body: credentials,
      }),
    }),
    getCurrentUser: builder.query({
      query: () => '/users/current',
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/users/signout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
} = authApi;
