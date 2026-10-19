import { Manrope } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/StoreProvider";
import Menu from "@/features/Landing/Menu";
import Footer from "@/features/Landing/Footer";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata = {
  title: "Clinical Vitality | Blood Donation Application",
  description: "Save lives by donating blood in real-time",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var savedTheme = localStorage.getItem('theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                  document.documentElement.style.colorScheme = 'dark';
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.setAttribute('data-theme', 'light');
                  document.documentElement.style.colorScheme = 'light';
                }
                var savedLang = localStorage.getItem('preferred_language');
                if (savedLang) {
                  document.documentElement.lang = savedLang;
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col font-manrope bg-[#fafafa] text-gray-900 transition-colors duration-200 dark:bg-[#0b0f19] dark:text-gray-100"
        suppressHydrationWarning
      >
        <StoreProvider>
          <div className="relative grid h-screen grid-rows-[auto_1fr_auto] bg-[#fafafa] dark:bg-[#0b0f19] transition-colors duration-200">
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
