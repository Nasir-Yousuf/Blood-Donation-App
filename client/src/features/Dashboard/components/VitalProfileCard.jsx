'use client';

import React from 'react';
import { getBloodTypeInfo, formatDate } from '../utils';
import { useLanguage } from '../../../context/LanguageContext';

export default function VitalProfileCard({ user, onOpenPassModal }) {
  const { t } = useLanguage();

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-gray-200/70 bg-white shadow-xs transition-colors duration-300 dark:border-gray-800/80 dark:bg-[#111827]">
      {/* Visual Header Banner */}
      <div className="relative h-28 overflow-hidden bg-gradient-to-r from-red-800 via-rose-900 to-red-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.4),transparent)]" />
        {user?.isAvailable && (
          <span className="absolute bottom-3 left-5 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[9px] font-black tracking-widest text-white uppercase backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span> {t('donorActive', 'Active Donor')}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {/* Blood Group Highlight */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="text-[10px] font-extrabold tracking-widest text-gray-400 dark:text-gray-500 uppercase">
              Vital Biological Profile
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <h3 className="text-3xl font-black text-gray-900 dark:text-white">
                Type {user?.bloodType || 'N/A'}
              </h3>
            </div>
            <p className="mt-1 text-xs font-bold text-red-600 dark:text-red-400">
              {getBloodTypeInfo(user?.bloodType)}
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 text-lg font-black text-white shadow-md shadow-red-500/30">
            {user?.bloodType || 'O+'}
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="space-y-3 border-y border-gray-100 py-4 dark:border-gray-800/80 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 dark:text-gray-400 font-medium">
              {t('nextEligibleDate', 'Next Eligible Date')}
            </span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              {formatDate(user?.nextAvailableDate) || 'Eligible Now'}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500 dark:text-gray-400 font-medium">Gender</span>
            <span className="font-bold text-gray-900 dark:text-gray-200 capitalize">
              {user?.gender || 'Not specified'}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500 dark:text-gray-400 font-medium">Registered Area</span>
            <span className="font-bold text-gray-900 dark:text-gray-200">
              {user?.location?.city || user?.city || 'Dhaka, BD'}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-500 dark:text-gray-400 font-medium">Emergency Phone</span>
            <span className="font-bold text-gray-900 dark:text-gray-200 font-mono">
              {user?.phone || 'Not added'}
            </span>
          </div>
        </div>

        {/* Digital Pass Trigger Button */}
        <div className="mt-6">
          <button
            onClick={onOpenPassModal}
            className="group flex w-full items-center justify-center gap-2 rounded-xl border border-red-200/80 bg-red-50/60 py-3 text-xs font-bold text-red-600 transition-all hover:bg-red-100/80 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-950/70"
          >
            <svg className="h-4 w-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v2H8V8zm0 4h8v2H8v-2z" />
            </svg>
            <span>{t('digitalDonorCard', 'View Digital Donor Pass')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
