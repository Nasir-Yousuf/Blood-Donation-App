import { redirect } from 'react-router-dom';
import { store } from '../store/index';
import { setCredentials, logout } from '../store/slices/authSlice';
import api from './../api/axiousInstance';

// 1. ROOT LOADER: Hydrates Redux on Initial Load
export const rootAuthLoader = async () => {
  const token = localStorage.getItem('jwt_token');

  if (token) {
    try {
      // Ask the backend who this token belongs to
      const response = await api.get('/users/me');
      const user = response.data.data.user; // Adjust based on your API response

      // Put them back into Redux!
      store.dispatch(setCredentials({ user, token }));
    } catch (error) {
      // If the token is invalid/expired, log them out
      store.dispatch(logout());
      console.log(error);
    }
  }
  return null; // Loaders must return something
};

// 2. PROTECTED ROUTE LOADER: The Bouncer
export const requireAuthLoader = () => {
  const state = store.getState(); // Peek inside Redux

  if (!state.auth.isAuthenticated) {
    // If they aren't logged in, kick them to login page immediately
    return redirect('/login');
  }
  return null;
};
