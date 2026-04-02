import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Import components
import Home from './features/landing/Home';
import Register from './features/registration/Register';
import SearchDonor from './features/donor search/SearchDonor';
import DashBoard from './features/dashboard/DashBoard';
import AppLayout from './ui/AppLayout';
import Emergency from './features/Emergency/Emergency';
import DonateNow from './features/DonateNow/DonateNow';
import Login, { loginAction } from './features/login/Login'; // Notice the action import
import Impact from './features/Impact/Impact';
import { Provider } from 'react-redux';

// Import Loaders
import { rootAuthLoader, requireAuthLoader } from './utils/authLoaders';

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
        loader: requireAuthLoader, // 3. The Bouncer: Kicks unauthenticated users to /login
      },
      {
        path: '/donor',
        element: <SearchDonor />,
        loader: requireAuthLoader, // Example: Only logged in users can search donors
      },
      {
        path: '/emergency',
        element: <Emergency />,
        loader: requireAuthLoader,
      },
      {
        path: '/donate',
        element: <DonateNow />,
        loader: requireAuthLoader,
      },
    ],
  },
]);
import { store } from './store';
export default function App() {
  return (
    // 2. Wrap your RouterProvider with the Redux Provider
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
