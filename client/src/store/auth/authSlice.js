/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'not-authenticated', // ? authenticated or not-authenticated
    user: {},
    errorMessage: undefined,
  },
  reducers: {
    checking: (state) => {
      state.status = 'checking';
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }) => {
      state.status = 'authenticated';
      state.user = payload;
      state.errorMessage = undefined;
    },
    onRegistration: (state, { payload }) => {
      state.status = 'authenticated';
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.user = {};
      state.errorMessage = undefined || payload;
    },
    clearError: (state) => {
      state.status = 'not-authenticated';
      state.user = {};
      state.errorMessage = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  checking, onLogin, onRegistration, onLogout, clearError,
} = authSlice.actions;
