import { Outlet, useNavigation } from 'react-router-dom';
import Footer from '../features/landing/Footer';
import Menu from '../features/landing/Menu';

const Loader = () => (
  <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#D32F2F] border-t-transparent"></div>
  </div>
);

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="font-manrope relative grid h-screen grid-rows-[auto_1fr_auto]">
      <Menu />

      {isLoading && <Loader />}

      <div className="overflow-auto">
        {/* ADDED pb-32 HERE to protect content from the floating mobile menu! */}
        <main className="pb-32 md:pb-0">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default AppLayout;
