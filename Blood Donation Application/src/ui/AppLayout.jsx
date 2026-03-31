import { Outlet, useNavigation } from 'react-router-dom';
import NavBar from '../features/landing/Footer';
import LandingPage from '../features/landing/Home';
import Footer from '../features/landing/Footer';
import Menu from '../features/landing/Menu';

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  return (
    <div className="font-manrope grid h-screen grid-rows-[auto_1fr_auto]">
      <Menu />
      {isLoading && <Loader />}

      <div className="overflow-auto">
        <main className="">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;
