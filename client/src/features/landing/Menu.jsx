import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Optional: Close menu when a link is clicked on mobile
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="relative z-50 w-full bg-white">
      {/* Desktop & Mobile Header Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-5">
          {/* Logo / Brand Name */}
          <div className="flex flex-shrink-0 items-center">
            <Link
              to="/"
              onClick={closeMenu}
              className="text-xl font-bold tracking-tight text-red-700"
            >
              Clinical Vitality
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center space-x-8 md:flex">
            <Link
              to="/donor"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              Find Donors
            </Link>
            <Link
              to="/registration"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              Register
            </Link>
            <Link
              to="/emergency"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              Emergency
            </Link>
            <Link
              to="/impact"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              Impact
            </Link>
          </div>

          {/* Desktop Right Side Actions (Login & CTA) */}
          <div className="hidden items-center space-x-6 md:flex">
            <Link
              to="/login"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              Login
            </Link>
            <Link
              to="/donate"
              className="rounded-lg bg-red-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-800"
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="p-2 text-gray-600 hover:text-gray-900 focus:ring-2 focus:ring-red-700 focus:outline-none focus:ring-inset"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon toggle based on menu state */}
              {!isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div
          className="absolute top-full left-0 w-full border-t border-gray-100 bg-white shadow-lg md:hidden"
          id="mobile-menu"
        >
          <div className="flex flex-col space-y-1 px-4 pt-2 pb-6 sm:px-3">
            <Link
              to="/find-donors"
              onClick={closeMenu}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-red-700"
            >
              Find Donors
            </Link>
            <Link
              to="/register"
              onClick={closeMenu}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-red-700"
            >
              Register
            </Link>
            <Link
              to="/emergency"
              onClick={closeMenu}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-red-700"
            >
              Emergency
            </Link>
            <Link
              to="/impact"
              onClick={closeMenu}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-red-700"
            >
              Impact
            </Link>

            <div className="mt-4 flex flex-col space-y-3 border-t border-gray-200 px-3 pt-4">
              <Link
                to="/login"
                onClick={closeMenu}
                className="block text-base font-medium text-gray-700 hover:text-red-700"
              >
                Login
              </Link>
              <Link
                to="/donate"
                onClick={closeMenu}
                className="w-full rounded-lg bg-red-700 px-4 py-3 text-center text-base font-semibold text-white shadow-sm transition-colors hover:bg-red-800"
              >
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Menu;
