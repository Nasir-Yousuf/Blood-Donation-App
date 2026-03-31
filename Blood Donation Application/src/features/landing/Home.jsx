// features/landing/LandingPage.jsx
import Hero from './Hero';
import Stats from './Stats';
import HowItWorks from './HowItWorks';
import CTA from './CTA';
import Footer from './Footer';
import Menu from './Menu';
import Bottom from './Bottom';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* <Menu /> */}
      <Hero />
      <Stats />
      <HowItWorks />
      <CTA />
      <Bottom />
      {/* <Footer /> */}
    </div>
  );
}
