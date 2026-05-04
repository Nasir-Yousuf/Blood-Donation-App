import { Manrope } from 'next/font/google';
import './globals.css';
import StoreProvider from '@/store/StoreProvider';
import Menu from '@/features/Landing/Menu';
import Footer from '@/features/Landing/Footer';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

export const metadata = {
  title: 'Blood Donation Application',
  description: 'Save lives by donating blood',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-manrope" suppressHydrationWarning>
        <StoreProvider>
          <div className="relative grid h-screen grid-rows-[auto_1fr_auto]">
            <Menu />
            <div className="overflow-auto">
              <main className="pb-32 md:pb-0">{children}</main>
            </div>
            <Footer />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
