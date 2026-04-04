import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

// ==========================================
// 1. REUSABLE NAV ITEM (Floating Pill Style)
// ==========================================
const FootItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex h-[60px] flex-col items-center justify-center rounded-2xl transition-all duration-300 ${
          isActive
            ? 'w-[76px] bg-red-50 text-[#D32F2F]' // Active: Light red background, brand red text
            : 'w-[64px] bg-transparent text-slate-400 hover:text-slate-600' // Inactive: Transparent, slate text
        }`
      }
    >
      {({ isActive }) => (
        <>
          {/* Icon Wrapper */}
          <div
            className={`mb-1 transition-transform duration-300 ${
              isActive ? 'scale-105' : 'scale-100'
            }`}
          >
            {icon}
          </div>
          {/* Label text */}
          <span
            className={`text-[11px] tracking-wide transition-all duration-300 ${
              isActive ? 'font-bold' : 'font-medium'
            }`}
          >
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
};

// ==========================================
// 2. MAIN MOBILE FOOTER COMPONENT
// ==========================================
const Footer = () => {
  // Pull authentication state from Redux
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    // Floating Pill Container: Fixed to bottom, centered, with soft shadow
    <div className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 md:hidden">
      <nav className="flex h-[76px] w-full items-center justify-between rounded-[2rem] border border-gray-50 bg-white px-3 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        {/* SLOT 1: Home (Guest) OR Dashboard (Logged In) */}
        {!isAuthenticated ? (
          <FootItem
            to="/"
            label="Home"
            icon={
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L3.5 10.5v10.5h17V10.5L12 3zm4 11h-3v3h-2v-3H8v-2h3V9h2v3h3v2z" />
              </svg>
            }
          />
        ) : (
          <FootItem
            to="/dashboard"
            label="Dashboard"
            icon={
              // Using the same Home/Hospital icon for Dashboard as it serves as their "Home Base"
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L3.5 10.5v10.5h17V10.5L12 3zm4 11h-3v3h-2v-3H8v-2h3V9h2v3h3v2z" />
              </svg>
            }
          />
        )}

        {/* SLOT 2: Search (Universal) */}
        <FootItem
          to="/donor"
          label="Search"
          icon={
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path strokeLinecap="round" d="M19.5 19.5l-4.5-4.5" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.5 10.5l1.5 1.5 2.5-2.5"
              />
            </svg>
          }
        />

        {/* SLOT 3: Emergency (Universal) */}
        <FootItem
          to="/emergency"
          label="Emergency"
          icon={
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.5C12 2.5 5 9.5 5 15.5a7 7 0 0014 0C19 9.5 12 2.5 12 2.5zm3 14h-2v2h-2v-2H8v-2h3v-2h2v2h3v2z" />
            </svg>
          }
        />

        {/* SLOT 4: Account/Login (Guest) OR Profile (Logged In) */}
        {!isAuthenticated ? (
          <FootItem
            to="/login"
            label="Account"
            icon={
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
              </svg>
            }
          />
        ) : (
          <FootItem
            to="/profile"
            label="Profile"
            icon={
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
              </svg>
            }
          />
        )}
      </nav>
    </div>
  );
};

export default Footer;
