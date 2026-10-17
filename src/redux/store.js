import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from '../services/api/baseApi';
import { sessionReducer } from './sessionSlice';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

