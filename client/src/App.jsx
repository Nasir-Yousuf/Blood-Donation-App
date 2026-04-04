import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Import components
import Home from './features/Landing/Home.jsx';
import Register from './features/Registration/Register.jsx';
import SearchDonor from './features/DonorSearch/SearchDonor.jsx';
import DashBoard, { dashboardLoader } from './features/Dashboard/DashBoard.jsx';
import AppLayout from './ui/AppLayout.jsx';

// 👇 1. FIXED: Removed the loader and action imports for Emergency
import Emergency from './features/Emergency/Emergency.jsx';

import DonateNow from './features/DonateNow/DonateNow.jsx';
import Login, { loginAction } from './features/Login/Login.jsx';
import Impact from './features/Impact/Impact.jsx';
import { Provider } from 'react-redux';
import Profile, { profileAction } from './features/Profile/Profile.jsx';

// Import Loaders
import { rootAuthLoader, requireAuthLoader } from './utils/authLoaders.js';
import { store } from './store.js';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    loader: rootAuthLoader, // 1. Runs ONCE when the app starts to hydrate Redux
    id: 'root', // Good practice to id your root route
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/registration',
        element: <Register />,
      },
      {
        path: '/impact',
        element: <Impact />,
      },
      {
        path: '/login',
        element: <Login />,
        action: loginAction, // 2. Handles the login form submission automatically
      },
      // ==========================================
      // PROTECTED ROUTES (Require Authentication)
      // ==========================================
      {
        path: '/dashboard',
        element: <DashBoard />,
        loader: dashboardLoader, // 3. The Bouncer: Kicks unauthenticated users to /login
      },
      {
        path: '/profile',
        element: <Profile />,
        action: profileAction,
        // loader: requireAuthLoader, // (If you are using your auth guard)
      },
      {
        path: '/donor',
        element: <SearchDonor />,
        loader: requireAuthLoader, // Example: Only logged in users can search donors
      },
      {
        path: '/emergency',
        element: <Emergency />,
        // 👇 2. FIXED: Removed the loader and action here.
        // It now uses useEffect to load instantly without blocking the UI!
      },
      {
        path: '/donate',
        element: <DonateNow />,
        loader: requireAuthLoader,
      },
    ],
  },
]);

export default function App() {
  return (
    // Wrap your RouterProvider with the Redux Provider
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
