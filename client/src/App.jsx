import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Import components
import Home from './features/landing/Home';
import Register from './features/registration/Register';
import SearchDonor from './features/donor search/SearchDonor';
import DashBoard, { dashboardLoader } from './features/dashboard/DashBoard';
import AppLayout from './ui/AppLayout';

// 👇 1. FIXED: Removed the loader and action imports for Emergency
import Emergency from './features/Emergency/Emergency';

import DonateNow from './features/DonateNow/DonateNow';
import Login, { loginAction } from './features/login/Login';
import Impact from './features/Impact/Impact';
import { Provider } from 'react-redux';
import Profile, { profileAction } from './features/profile/Profile';

// Import Loaders
import { rootAuthLoader, requireAuthLoader } from './utils/authLoaders';
import { store } from './store';

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
