import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const DEFAULT_API_BASE_URL =
  'https://vocab-builder-backend.p.goit.global/api';

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;

export const baseApi = createApi({
  reducerPath: 'api',
  tagTypes: [
    'Categories',
    'OwnWords',
    'RecommendedWords',
    'Statistics',
    'TrainingTasks',
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    timeout: 10000,
    prepareHeaders(headers, { getState }) {
      const token = getState().session.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});
