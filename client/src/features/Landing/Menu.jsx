import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 1. Pull authentication state from Redux globally
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    closeMenu();
    navigate('/login');
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="relative z-50 w-full border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo / Brand Name */}
          <div className="flex flex-shrink-0 items-center">
            <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center gap-2"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D32F2F] text-white">
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-gray-900">
                Clinical Vitality
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center space-x-8 md:flex">
            <Link
              to="/donor"
              className="text-sm font-bold text-gray-500 transition-colors hover:text-gray-900"
            >
              Find Donors
            </Link>
            <Link
              to="/emergency"
              className="text-sm font-bold text-gray-500 transition-colors hover:text-gray-900"
            >
              Emergency
            </Link>
            <Link
              to="/impact"
              className="text-sm font-bold text-gray-500 transition-colors hover:text-gray-900"
            >
              Impact
            </Link>
          </div>

          {/* Desktop Right Side Actions */}
          <div className="hidden items-center space-x-4 md:flex">
            {!isAuthenticated ? (
              <>
                {/* 2. Logged Out View: Simple text link and bold CTA button */}
                <Link
                  to="/login"
                  className="px-4 text-sm font-bold text-gray-500 transition-colors hover:text-gray-900"
                >
                  Login
                </Link>
                <Link
                  to="/registration"
                  className="rounded-xl bg-[#D32F2F] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-red-500/20 transition-colors hover:bg-red-800"
                >
                  Register
                </Link>
              </>
            ) : (
              <div
                className="relative flex items-center gap-4"
                ref={dropdownRef}
              >
                {/* 3. Logged In View: Quick link to dashboard and Profile Dropdown */}
                <Link
                  to="/dashboard"
                  className="text-sm font-bold text-gray-500 transition-colors hover:text-gray-900"
                >
                  Dashboard
                </Link>

                {/* Profile Dropdown Toggle */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 border-l border-gray-200 pl-4 focus:outline-none"
                >
                  <div className="hidden text-right lg:block">
                    <p className="text-sm leading-none font-bold text-gray-900">
                      {user?.name?.split(' ')[0]}
                    </p>
                  </div>
                  <img
                    src={`https://ui-avatars.com/api/?name=${user?.name}&background=D32F2F&color=fff`}
                    alt="Profile"
                    className="h-9 w-9 rounded-full border-2 border-white shadow-sm transition-transform hover:scale-105"
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 overflow-hidden rounded-2xl border border-gray-100 bg-white py-2 shadow-xl">
                    <Link
                      to="/profile"
                      onClick={closeMenu}
                      className="block px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-[#D32F2F]"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full px-5 py-2.5 text-left text-sm font-bold text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {!isOpen ? (
                <svg
                  className="h-6 w-6"
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
        <div className="absolute top-full left-0 w-full border-t border-gray-100 bg-white pb-4 shadow-2xl md:hidden">
          {/* Mobile Authenticated User Header */}
          {isAuthenticated && (
            <div className="flex items-center gap-4 border-b border-gray-100 bg-gray-50 px-5 py-6">
              <img
                src={`https://ui-avatars.com/api/?name=${user?.name}&background=D32F2F&color=fff`}
                alt="Profile"
                className="h-12 w-12 rounded-full border-2 border-white shadow-sm"
              />
              <div>
                <p className="font-extrabold text-gray-900">{user?.name}</p>
                <p className="text-[10px] font-bold tracking-widest text-[#D32F2F] uppercase">
                  {user?.bloodType} Donor
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col px-3 pt-4 pb-2">
            {isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="block rounded-xl px-4 py-3 text-base font-bold text-gray-700 hover:bg-red-50 hover:text-[#D32F2F]"
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="block rounded-xl px-4 py-3 text-base font-bold text-gray-700 hover:bg-red-50 hover:text-[#D32F2F]"
                >
                  My Profile
                </Link>
                <div className="my-2 border-t border-gray-100"></div>
              </>
            )}

            <Link
              to="/donor"
              onClick={closeMenu}
              className="block rounded-xl px-4 py-3 text-base font-bold text-gray-700 hover:bg-gray-50"
            >
              Find Donors
            </Link>
            <Link
              to="/emergency"
              onClick={closeMenu}
              className="block rounded-xl px-4 py-3 text-base font-bold text-gray-700 hover:bg-gray-50"
            >
              Emergency
            </Link>
            <Link
              to="/impact"
              onClick={closeMenu}
              className="block rounded-xl px-4 py-3 text-base font-bold text-gray-700 hover:bg-gray-50"
            >
              Impact
            </Link>

            <div className="mt-4 flex flex-col gap-3 border-t border-gray-100 px-2 pt-4">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="block py-3 text-center text-base font-bold text-gray-700"
                  >
                    Login
                  </Link>
                  <Link
                    to="/registration"
                    onClick={closeMenu}
                    className="w-full rounded-xl bg-[#D32F2F] px-4 py-3.5 text-center text-base font-bold text-white shadow-md shadow-red-500/20"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full rounded-xl bg-gray-100 px-4 py-3.5 text-center text-base font-bold text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Menu;
