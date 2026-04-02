import { Outlet, useNavigation } from 'react-router-dom';
import Footer from '../features/landing/Footer';
import Menu from '../features/landing/Menu'; // Ensure this path is correct for your Menu

// 1. We define the Loader component right here so React knows what it is!
const Loader = () => (
  <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#D32F2F] border-t-transparent"></div>
  </div>
);

function AppLayout() {
  const navigation = useNavigation();
  // This tells us if React Router is currently fetching data using a loader
  const isLoading = navigation.state === 'loading';

  return (
    // Added 'relative' here so the absolute loader covers exactly this area
    <div className="font-manrope relative grid h-screen grid-rows-[auto_1fr_auto]">
      <Menu />

      {/* 2. Now the Loader will work perfectly when transitioning pages! */}
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
