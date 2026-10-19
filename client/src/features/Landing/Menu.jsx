"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { useLanguage } from "../../context/LanguageContext";
import ThemeToggle from "../../components/ThemeToggle";
import LanguageToggle from "../../components/LanguageToggle";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { t } = useLanguage();

  // Pull authentication state from Redux
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    closeMenu();
    router.push("/login");
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    {
      href: "/donor",
      label: t("navFindDonors", "Find Donors"),
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      href: "/emergency",
      label: t("navEmergency", "Emergency"),
      isEmergency: true,
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z" />
        </svg>
      ),
    },
    {
      href: "/donate",
      label: t("navDonate", "Donate Blood"),
      icon: (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ),
    },
    {
      href: "/impact",
      label: t("navImpact", "Impact"),
      icon: (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200/60 bg-white/85 backdrop-blur-xl transition-all duration-300 dark:border-slate-800/80 dark:bg-[#090d16]/85 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_25px_-4px_rgba(0,0,0,0.5)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <div className="flex flex-shrink-0 items-center">
            <Link
              href="/"
              onClick={closeMenu}
              className="group flex items-center gap-3 transition-transform hover:scale-[1.01]"
            >
              {/* Animated Emblem Badge */}
              <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-red-500 text-white shadow-lg shadow-red-500/30 ring-2 ring-red-500/20 transition-all duration-300 group-hover:shadow-red-500/50 group-hover:ring-red-500/40">
                <svg
                  className="h-5 w-5 transform transition-transform duration-300 group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                {/* Micro heart pulse highlight */}
                <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-[#090d16] animate-pulse" />
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-tight text-gray-900 dark:text-white">
                    Clinical
                  </span>
                  <span className="text-xl font-black tracking-tight bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent">
                    Vitality
                  </span>
                </div>
                <div className="flex items-center gap-1.5 -mt-0.5">
                  <span className="text-[9px] font-mono font-bold tracking-widest text-red-600/90 dark:text-red-400/90 uppercase">
                    VITALPULSE NETWORK
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links (Floating Dark Capsule) */}
          <div className="hidden md:flex items-center gap-1.5 rounded-full bg-gray-100/60 p-1.5 border border-gray-200/50 backdrop-blur-md dark:bg-[#12141C]/80 dark:border-white/10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-white text-red-600 shadow-sm dark:bg-[#1A1D27] dark:text-red-400 ring-1 ring-black/5 dark:ring-white/10"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/60 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5"
                  }`}
                >
                  {link.isEmergency && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                    </span>
                  )}
                  <span>{link.label}</span>
                  {link.isEmergency && (
                    <span className="ml-0.5 rounded-full bg-red-100 px-1.5 py-0.2 text-[9px] font-extrabold text-red-600 uppercase dark:bg-red-950/80 dark:text-red-400">
                      {t("urgentBadge", "Urgent")}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Toolbar & Authentication */}
          <div className="hidden md:flex items-center gap-3">
            {/* Live Network Pill Badge */}
            <div className="hidden xl:flex items-center gap-2 rounded-full border border-gray-200/80 bg-gray-50/80 px-3 py-1.5 text-[10px] font-mono tracking-wider dark:border-white/10 dark:bg-white/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-gray-500 dark:text-gray-400 font-bold uppercase">NETWORK :</span>
              <span className="font-extrabold text-red-600 dark:text-red-400 uppercase">LIVE</span>
            </div>

            {/* Integrated Language & Theme Capsule */}
            <div className="flex items-center gap-1 rounded-full bg-gray-100/80 p-1 border border-gray-200/60 dark:bg-[#12141C]/80 dark:border-white/10 backdrop-blur-sm">
              <LanguageToggle />
              <div className="h-4 w-px bg-gray-300 dark:bg-white/10" />
              <ThemeToggle />
            </div>

            <div className="h-5 w-px bg-gray-200 dark:bg-white/10 mx-0.5" />

            {!isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="rounded-full px-4 py-2 text-xs font-bold text-gray-700 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
                >
                  {t("navLogin", "Login")}
                </Link>
                <Link
                  href="/registration"
                  className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-red-600 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-red-600/30 transition-all duration-200 hover:shadow-red-600/50 hover:brightness-110 active:scale-[0.98]"
                >
                  <svg
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span>{t("navRegister", "Register")}</span>
                </Link>
              </div>
            ) : (
              <div className="relative flex items-center gap-3" ref={dropdownRef}>
                <Link
                  href="/dashboard"
                  className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                    pathname === "/dashboard"
                      ? "bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-400"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                  }`}
                >
                  {t("navDashboard", "Dashboard")}
                </Link>

                {/* Profile Avatar Pill with Blood Badge */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 rounded-2xl border border-gray-200/80 bg-gray-50/80 p-1.5 pr-2.5 transition-all hover:border-gray-300 hover:bg-gray-100 dark:border-slate-700/80 dark:bg-slate-800/80 dark:hover:bg-slate-700"
                >
                  <div className="relative">
                    <img
                      src={`https://ui-avatars.com/api/?name=${user?.name || "Donor"}&background=D32F2F&color=fff&bold=true`}
                      alt="Profile"
                      className="h-7 w-7 rounded-full object-cover ring-2 ring-white dark:ring-slate-900"
                    />
                    {user?.bloodType && (
                      <span className="absolute -bottom-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[8px] font-black text-white ring-1 ring-white dark:ring-slate-900">
                        {user.bloodType}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-gray-800 dark:text-white">
                    {user?.name?.split(" ")[0] || "User"}
                  </span>
                  <svg
                    className={`h-3.5 w-3.5 text-gray-400 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180 text-red-600" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu Modal Card */}
                {isDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2.5 w-56 overflow-hidden rounded-2xl border border-gray-200/80 bg-white/95 p-1.5 shadow-2xl backdrop-blur-xl transition-all dark:border-slate-800 dark:bg-slate-900/95">
                    <div className="border-b border-gray-100 px-3 py-2.5 dark:border-slate-800">
                      <p className="text-xs font-extrabold text-gray-900 dark:text-white">
                        {user?.name}
                      </p>
                      <p className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
                        {user?.bloodType || "Volunteer"} {t("donor", "Donor")}
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/dashboard"
                        onClick={closeMenu}
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-white"
                      >
                        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        {t("navDashboard", "Dashboard")}
                      </Link>
                      <Link
                        href="/profile"
                        onClick={closeMenu}
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-white"
                      >
                        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {t("navProfile", "My Profile")}
                      </Link>
                    </div>

                    <div className="border-t border-gray-100 pt-1 dark:border-slate-800">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-bold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        {t("navLogout", "Logout")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Right Controls: Compact switches + Menu toggle button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageToggle variant="compact" />
            <ThemeToggle />

            <button
              onClick={toggleMenu}
              type="button"
              aria-label="Toggle navigation menu"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              {!isOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isOpen && (
        <div className="border-t border-gray-200/60 bg-white/95 pb-6 pt-3 shadow-2xl backdrop-blur-2xl md:hidden dark:border-slate-800 dark:bg-[#090d16]/95 transition-all">
          {/* Authenticated User Banner */}
          {isAuthenticated && (
            <div className="mx-4 mb-3 flex items-center gap-3.5 rounded-2xl border border-red-100 bg-red-50/60 p-3.5 dark:border-red-950/60 dark:bg-red-950/30">
              <div className="relative">
                <img
                  src={`https://ui-avatars.com/api/?name=${user?.name || "Donor"}&background=D32F2F&color=fff&bold=true`}
                  alt="Profile"
                  className="h-11 w-11 rounded-full ring-2 ring-white dark:ring-gray-900"
                />
                {user?.bloodType && (
                  <span className="absolute -bottom-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[9px] font-black text-white ring-1 ring-white dark:ring-gray-900">
                    {user.bloodType}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-extrabold text-gray-900 dark:text-gray-100">{user?.name}</p>
                <p className="text-[11px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
                  {user?.bloodType} {t("donor", "Donor")}
                </p>
              </div>
            </div>
          )}

          {/* Mobile Navigation Links */}
          <div className="flex flex-col space-y-1 px-4">
            {isAuthenticated && (
              <>
                <Link
                  href="/dashboard"
                  onClick={closeMenu}
                  className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${
                    pathname === "/dashboard"
                      ? "bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-400"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>{t("navDashboard", "Dashboard")}</span>
                  </div>
                  <span className="text-xs text-gray-400">→</span>
                </Link>
                <Link
                  href="/profile"
                  onClick={closeMenu}
                  className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${
                    pathname === "/profile"
                      ? "bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-400"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{t("navProfile", "My Profile")}</span>
                  </div>
                  <span className="text-xs text-gray-400">→</span>
                </Link>
                <div className="my-1.5 border-t border-gray-100 dark:border-gray-800" />
              </>
            )}

            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${
                    isActive
                      ? "bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-400"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? "text-red-600 dark:text-red-400" : "text-gray-400"}>
                      {link.icon}
                    </span>
                    <span>{link.label}</span>
                  </div>
                  {link.isEmergency && (
                    <span className="flex items-center gap-1.5 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-black text-red-600 uppercase dark:bg-red-950 dark:text-red-400">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-600"></span>
                      </span>
                      {t("urgentBadge", "Urgent")}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Quick Preference row in mobile drawer */}
            <div className="mt-3 flex items-center justify-between rounded-2xl bg-gray-50/90 p-3.5 border border-gray-200/60 dark:bg-gray-800/60 dark:border-gray-700/60">
              <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
                {t("language", "Language")} & {t("lightMode", "Theme")}
              </span>
              <div className="flex items-center gap-2">
                <LanguageToggle />
                <ThemeToggle showLabel />
              </div>
            </div>

            {/* Bottom Mobile Action Buttons */}
            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
              {!isAuthenticated ? (
                <div className="flex flex-col gap-2.5">
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white py-3 text-sm font-bold text-gray-800 shadow-sm transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    {t("navLogin", "Login")}
                  </Link>
                  <Link
                    href="/registration"
                    onClick={closeMenu}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 py-3.5 text-sm font-bold text-white shadow-md shadow-red-500/25 transition-all hover:brightness-105"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span>{t("navRegister", "Register as Donor")}</span>
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 py-3 text-sm font-bold text-red-600 transition-colors hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-950/60"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>{t("navLogout", "Logout")}</span>
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
