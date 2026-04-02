import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // When you add features like 'requests' or 'notifications', you add their reducers here
  },
});
