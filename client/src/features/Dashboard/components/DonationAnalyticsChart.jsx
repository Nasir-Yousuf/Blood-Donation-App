'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

export default function DonationAnalyticsChart() {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState('6m'); // '6m' or '1y'
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const data6m = [
    { label: 'May', donations: 1, livesSaved: 3, requests: 2 },
    { label: 'Jun', donations: 0, livesSaved: 0, requests: 4 },
    { label: 'Jul', donations: 2, livesSaved: 6, requests: 3 },
    { label: 'Aug', donations: 1, livesSaved: 3, requests: 5 },
    { label: 'Sep', donations: 2, livesSaved: 6, requests: 2 },
    { label: 'Oct', donations: 3, livesSaved: 9, requests: 6 },
  ];

  const data1y = [
    { label: 'Nov', donations: 1, livesSaved: 3, requests: 1 },
    { label: 'Dec', donations: 2, livesSaved: 6, requests: 3 },
    { label: 'Jan', donations: 1, livesSaved: 3, requests: 2 },
    { label: 'Feb', donations: 0, livesSaved: 0, requests: 4 },
    { label: 'Mar', donations: 2, livesSaved: 6, requests: 3 },
    { label: 'Apr', donations: 1, livesSaved: 3, requests: 2 },
    { label: 'May', donations: 1, livesSaved: 3, requests: 2 },
    { label: 'Jun', donations: 0, livesSaved: 0, requests: 4 },
    { label: 'Jul', donations: 2, livesSaved: 6, requests: 3 },
    { label: 'Aug', donations: 1, livesSaved: 3, requests: 5 },
    { label: 'Sep', donations: 2, livesSaved: 6, requests: 2 },
    { label: 'Oct', donations: 3, livesSaved: 9, requests: 6 },
  ];

  const currentData = viewMode === '6m' ? data6m : data1y;
  const maxVal = Math.max(...currentData.map((d) => Math.max(d.livesSaved, d.requests)), 10);

  return (
    <div className="rounded-[28px] border border-gray-200/70 bg-white p-6 shadow-xs transition-colors duration-300 dark:border-gray-800/80 dark:bg-[#111827]">
      {/* Chart Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-400">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
              {t('impactAnalytics', 'Donation & Impact Analytics')}
            </h3>
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Monthly overview of blood units donated and estimated lives touched.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center rounded-xl bg-gray-100/80 p-1 dark:bg-gray-800/80 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('6m')}
            className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
              viewMode === '6m'
                ? 'bg-white text-red-600 shadow-xs dark:bg-gray-900 dark:text-red-400 font-extrabold'
                : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            {t('monthly', '6-Month Trend')}
          </button>
          <button
            onClick={() => setViewMode('1y')}
            className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
              viewMode === '1y'
                ? 'bg-white text-red-600 shadow-xs dark:bg-gray-900 dark:text-red-400 font-extrabold'
                : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            {t('yearly', 'Yearly View')}
          </button>
        </div>
      </div>

      {/* Legend & Stats Banner */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-y border-gray-100 py-3 dark:border-gray-800/80">
        <div className="flex items-center gap-4 text-xs font-bold">
          <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
            <span className="h-3 w-3 rounded-sm bg-gradient-to-t from-red-600 to-rose-500" />
            <span>Lives Saved (Est.)</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
            <span className="h-3 w-3 rounded-sm bg-teal-500" />
            <span>Donations Made</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
            <span className="h-3 w-3 rounded-sm bg-blue-400/60" />
            <span>Nearby Appeals</span>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span>+28% impact response this quarter</span>
        </div>
      </div>

      {/* Interactive Bar Chart Graphic */}
      <div className="relative mt-6 pt-4 pb-2">
        {/* Hover Tooltip Card */}
        {hoveredIndex !== null && (
          <div
            className="pointer-events-none absolute -top-3 z-30 -translate-x-1/2 rounded-xl border border-gray-200/80 bg-gray-900/95 px-3.5 py-2 text-white shadow-xl backdrop-blur-md transition-all dark:border-gray-700 dark:bg-black/90"
            style={{
              left: `${((hoveredIndex + 0.5) / currentData.length) * 100}%`,
            }}
          >
            <p className="text-[11px] font-bold text-gray-300">
              {currentData[hoveredIndex].label} 2026
            </p>
            <div className="mt-1 space-y-0.5 text-xs font-extrabold">
              <p className="text-rose-400">
                ❤ {currentData[hoveredIndex].livesSaved} Lives Impacted
              </p>
              <p className="text-teal-400">
                🩸 {currentData[hoveredIndex].donations} Blood Units
              </p>
              <p className="text-blue-300 text-[10px] font-normal">
                📡 {currentData[hoveredIndex].requests} Area SOS Signals
              </p>
            </div>
          </div>
        )}

        {/* Chart Bars Grid */}
        <div className="flex h-52 items-end justify-between gap-2 sm:gap-4 px-2">
          {currentData.map((item, idx) => {
            const livesHeight = Math.max(12, Math.round((item.livesSaved / maxVal) * 180));
            const donHeight = Math.max(10, Math.round((item.donations / maxVal) * 180));
            const reqHeight = Math.max(8, Math.round((item.requests / maxVal) * 180));
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={item.label}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative flex flex-1 cursor-pointer flex-col items-center justify-end h-full"
              >
                {/* Visual grouping of 3 metric bars */}
                <div className="flex items-end gap-1 w-full justify-center">
                  {/* Requests Signal Bar */}
                  <div
                    style={{ height: `${reqHeight}px` }}
                    className="w-1.5 sm:w-2 rounded-t-full bg-blue-300/60 dark:bg-blue-600/40 transition-all duration-300 group-hover:bg-blue-400"
                  />
                  {/* Blood Donations Bar */}
                  <div
                    style={{ height: `${donHeight}px` }}
                    className="w-2 sm:w-3 rounded-t-full bg-teal-500 transition-all duration-300 group-hover:bg-teal-400"
                  />
                  {/* Lives Saved Primary Bar */}
                  <div
                    style={{ height: `${livesHeight}px` }}
                    className={`w-3 sm:w-4 rounded-t-full bg-gradient-to-t from-red-600 via-rose-500 to-red-400 transition-all duration-300 shadow-sm ${
                      isHovered ? 'scale-y-105 brightness-110 shadow-md shadow-red-500/30' : ''
                    }`}
                  />
                </div>

                {/* X-Axis Label */}
                <span
                  className={`mt-3 text-[11px] font-bold transition-colors ${
                    isHovered
                      ? 'text-red-600 dark:text-red-400 font-black'
                      : 'text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
