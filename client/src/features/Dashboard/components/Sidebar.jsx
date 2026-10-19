'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from './DashboardIcons';
import { useLanguage } from '../../../context/LanguageContext';

export default function Sidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    {
      to: '/dashboard',
      text: t('navDashboard', 'Dashboard'),
      icon: <Icons.Dashboard />,
    },
    {
      to: '/donor',
      text: t('navFindDonors', 'Find Donors'),
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      to: '/emergency',
      text: t('navEmergency', 'Emergency'),
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z" />
        </svg>
      ),
    },
    {
      to: '/donate',
      text: t('navDonate', 'Donate Blood'),
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ),
    },
    {
      to: '/profile',
      text: t('navProfile', 'Profile'),
      icon: <Icons.Profile />,
    },
  ];

  return (
    <aside className="sticky top-18 hidden h-[calc(100vh-72px)] w-[240px] shrink-0 flex-col border-r border-gray-200/60 bg-white/60 py-6 backdrop-blur-md transition-colors duration-300 dark:border-gray-800/80 dark:bg-[#0b0f19]/60 lg:flex">
      <nav className="flex flex-1 flex-col gap-1.5 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.to;
          return (
            <Link
              key={item.to}
              href={item.to}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 font-bold text-xs transition-all ${
                isActive
                  ? 'bg-red-50 text-red-600 shadow-xs dark:bg-red-950/60 dark:text-red-400 font-extrabold ring-1 ring-red-500/20'
                  : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/60 dark:hover:text-white'
              }`}
            >
              <span className={isActive ? 'text-red-600 dark:text-red-400' : 'text-gray-400'}>
                {item.icon}
              </span>
              <span>{item.text}</span>
            </Link>
          );
        })}
      </nav>

      {/* Emergency Hotline Widget */}
      <div className="mx-3 mt-auto rounded-2xl bg-gradient-to-tr from-red-600 to-rose-600 p-4 text-white shadow-md shadow-red-500/20">
        <p className="text-[10px] font-extrabold uppercase tracking-wider text-red-100">
          24/7 Hotline
        </p>
        <p className="mt-1 text-sm font-black">+880 9612-444888</p>
        <p className="mt-1 text-[10px] text-red-100/80">
          Immediate ambulance & emergency blood routing.
        </p>
      </div>
    </aside>
  );
}
