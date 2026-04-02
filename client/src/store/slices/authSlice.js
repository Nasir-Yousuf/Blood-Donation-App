import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Call this when the user logs in, OR when the app loads and we verify their token
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
    },
    // Call this to wipe the slate clean
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('jwt_token'); // Ensure storage is cleared
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
