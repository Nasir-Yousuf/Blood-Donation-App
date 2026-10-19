'use client';

import React from 'react';
import { Icons } from './DashboardIcons';
import { useLanguage } from '../../../context/LanguageContext';

export default function StatsRow({ user, stats, isUpdatingStatus, handleToggleStatus }) {
  const { t } = useLanguage();
  const totalDonations = stats?.totalDonations || 0;
  const livesSaved = totalDonations * 3;
  const requestsMade = stats?.requestsMade || 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Donor Status Card */}
      <div className="relative flex min-h-[150px] flex-col justify-between overflow-hidden rounded-[24px] bg-gradient-to-tr from-red-600 via-rose-600 to-red-500 p-6 text-white shadow-lg shadow-red-500/25">
        <div className="absolute -top-6 -right-6 h-28 w-28 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">
            <Icons.Drop />
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <button
              onClick={handleToggleStatus}
              disabled={isUpdatingStatus}
              aria-label="Toggle donor availability"
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${
                user?.isAvailable ? 'bg-white' : 'bg-red-950/70 ring-1 ring-white/30'
              } disabled:opacity-50`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full transition-transform ${
                  user?.isAvailable ? 'translate-x-6 bg-red-600' : 'translate-x-1 bg-white'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="relative z-10 mt-2">
          <p className="text-[10px] font-extrabold tracking-widest text-red-100 uppercase">
            {t('donorActive', 'Donor Status')}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`h-2.5 w-2.5 rounded-full ${user?.isAvailable ? 'bg-emerald-300 animate-pulse' : 'bg-gray-300'}`} />
            <h3 className="text-xl font-black">
              {user?.isAvailable ? t('donorActive', 'Donor Active') : t('onStandby', 'On Standby')}
            </h3>
          </div>
          <p className="mt-1 text-[11px] text-red-100/90 leading-tight">
            {user?.isAvailable ? t('visibleToHospitals', 'Visible to local hospitals') : 'Resting from on-call duty'}
          </p>
        </div>
      </div>

      {/* 2. Total Donations */}
      <div className="flex min-h-[150px] flex-col justify-between rounded-[24px] border border-gray-200/70 bg-white p-6 shadow-xs transition-colors duration-300 dark:border-gray-800/80 dark:bg-[#111827]">
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400">
            <Icons.Heart />
          </div>
          <span className="text-[11px] font-extrabold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 px-2.5 py-0.5 rounded-full">
            All Time
          </span>
        </div>
        <div className="mt-2">
          <h3 className="text-3xl font-black text-gray-900 dark:text-white">
            {totalDonations}
          </h3>
          <p className="mt-0.5 text-xs font-bold tracking-wider text-gray-400 dark:text-gray-500 uppercase">
            {t('totalDonations', 'Total Donations')}
          </p>
        </div>
      </div>

      {/* 3. Lives Impacted */}
      <div className="flex min-h-[150px] flex-col justify-between rounded-[24px] border border-gray-200/70 bg-white p-6 shadow-xs transition-colors duration-300 dark:border-gray-800/80 dark:bg-[#111827]">
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <span className="text-[11px] font-extrabold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2.5 py-0.5 rounded-full">
            3x Factor
          </span>
        </div>
        <div className="mt-2">
          <h3 className="text-3xl font-black text-gray-900 dark:text-white">
            {livesSaved}
          </h3>
          <p className="mt-0.5 text-xs font-bold tracking-wider text-gray-400 dark:text-gray-500 uppercase">
            {t('livesImpacted', 'Lives Impacted')}
          </p>
        </div>
      </div>

      {/* 4. Requests Broadcasted */}
      <div className="flex min-h-[150px] flex-col justify-between rounded-[24px] border border-gray-200/70 bg-white p-6 shadow-xs transition-colors duration-300 dark:border-gray-800/80 dark:bg-[#111827]">
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
            <Icons.Speakerphone />
          </div>
          <span className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-0.5 rounded-full">
            Network SOS
          </span>
        </div>
        <div className="mt-2">
          <h3 className="text-3xl font-black text-gray-900 dark:text-white">
            {requestsMade}
          </h3>
          <p className="mt-0.5 text-xs font-bold tracking-wider text-gray-400 dark:text-gray-500 uppercase">
            {t('requestsMade', 'Requests Made')}
          </p>
        </div>
      </div>
    </div>
  );
}
