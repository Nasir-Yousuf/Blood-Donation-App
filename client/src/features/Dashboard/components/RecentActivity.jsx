'use client';

import React from 'react';
import Link from 'next/link';
import { Icons } from './DashboardIcons';
import { useLanguage } from '../../../context/LanguageContext';

export default function RecentActivity({ activity }) {
  const { t } = useLanguage();

  return (
    <div className="rounded-[28px] border border-gray-200/70 bg-white p-6 shadow-xs transition-colors duration-300 dark:border-gray-800/80 dark:bg-[#111827]">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
            {t('recentActivity', 'Recent Activity')}
          </h3>
        </div>

        <Link
          href="/emergency"
          className="text-xs font-bold tracking-wider text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 uppercase"
        >
          {t('seeAll', 'See All')} →
        </Link>
      </div>

      {!activity || activity.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 p-8 text-center text-xs font-medium text-gray-400 dark:border-gray-800">
          {t('noActivity', 'No recent activity found.')}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {activity.map((item) => {
            const IconComp = Icons[item.icon] || Icons.Heart;
            return (
              <div
                key={item.id}
                className="flex items-start gap-3.5 rounded-2xl p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.bg} ${item.text} dark:bg-opacity-20`}
                >
                  <IconComp />
                </div>
                <div className="flex-1 border-b border-gray-100 pb-3 last:border-0 last:pb-0 dark:border-gray-800">
                  <div className="flex items-start justify-between">
                    <p className="text-xs font-extrabold text-gray-900 dark:text-gray-100">
                      {item.title}
                    </p>
                    <span className="text-[10px] font-bold text-gray-400">
                      {item.timeAgo}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
