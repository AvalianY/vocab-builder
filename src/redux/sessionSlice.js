import { createSlice } from '@reduxjs/toolkit';

import { getStoredToken } from '../utils/authStorage';

const initialState = {
  token: getStoredToken(),
  user: null,
  isInitialized: false,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { token, ...user } = action.payload;

      state.token = token;
      state.user = user;
      state.isInitialized = true;
    },
    setCurrentUser(state, action) {
      state.user = action.payload;
      state.isInitialized = true;
    },
    finishSessionRestore(state) {
      state.isInitialized = true;
    },
    clearSession(state) {
      state.token = null;
      state.user = null;
      state.isInitialized = true;
    },
  },
});

export const {
  clearSession,
  finishSessionRestore,
  setCredentials,
  setCurrentUser,
} = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;

export const selectAccessToken = (state) => state.session.token;
export const selectCurrentUser = (state) => state.session.user;
export const selectIsSessionReady = (state) => state.session.isInitialized;
export const selectIsAuthenticated = (state) => Boolean(state.session.token);
