// import axios from 'axios';

// // Create a custom Axios instance with your backend base URL
// // const api = axios.create({
// //   baseURL: 'http://127.0.0.1:3000/api/v1',
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// // });

// const api = axios.create({
//   baseURL: 'https://blood-donation-app-c6ft.onrender.com/api/v1',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // REQUEST INTERCEPTOR: Attach the token to outgoing requests
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('jwt_token');
//     // If we have a token, add it to the Authorization header
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // RESPONSE INTERCEPTOR: Catch expired tokens globally
// api.interceptors.response.use(
//   (response) => {
//     return response; // If the request succeeds, just pass it through
//   },
//   (error) => {
//     // If the backend says "401 Unauthorized", the token is dead.
//     if (error.response && error.response.status === 401) {
//       console.warn('Token expired or invalid. Logging out...');
//       // Clear out the dead token
//       localStorage.removeItem('jwt_token');
//       // Hard redirect to the login page
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;

// #ffffff
// fixing the Reload Problem
import axios from 'axios';

// Create a custom Axios instance with your backend base URL
const api = axios.create({
  baseURL: 'https://blood-donation-app-c6ft.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// REQUEST INTERCEPTOR: Attach the token to outgoing requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    // If we have a token, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR: Catch expired tokens globally
api.interceptors.response.use(
  (response) => {
    return response; // If the request succeeds, just pass it through
  },
  (error) => {
    // Grab the original request configuration so we know what URL was called
    const originalRequest = error.config;

    // Check if error is 401 AND the request was NOT to the login endpoint
    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest.url &&
      !originalRequest.url.includes('/users/login')
    ) {
      console.warn('Token expired or invalid. Logging out...');
      // Clear out the dead token
      localStorage.removeItem('jwt_token');
      // Hard redirect to the login page
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
