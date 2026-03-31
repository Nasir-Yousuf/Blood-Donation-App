import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './features/landing/Home';
import Register from './features/registration/Register';
import SearchDonor from './features/donor search/SearchDonor';
import DashBoard from './features/dashboard/DashBoard';
import AppLayout from './ui/AppLayout';
import Emergency from './features/Emergency/Emergency';
import DonateNow from './features/DonateNow/DonateNow';
import Login from './features/login/Login';
import Impact from './features/Impact/Impact';
const router = createBrowserRouter([
  {
    element: <AppLayout />,
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
        path: '/donor',
        element: <SearchDonor />,
      },
      {
        path: '/dashboard',
        element: <DashBoard />,
      },
      {
        path: '/emergency',
        element: <Emergency />,
      },
      {
        path: '/donate',
        element: <DonateNow />,
      },
      {
        path: '/impact',
        element: <Impact />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
