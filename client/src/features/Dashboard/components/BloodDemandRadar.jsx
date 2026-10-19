'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

export default function BloodDemandRadar({ userBloodType = 'O+' }) {
  const { t } = useLanguage();
  const [selectedGroup, setSelectedGroup] = useState(userBloodType);

  const inventoryData = [
    { type: 'O-', demand: 94, status: 'Critical', color: 'bg-red-600', ringColor: 'ring-red-500/30' },
    { type: 'B-', demand: 88, status: 'Critical', color: 'bg-rose-600', ringColor: 'ring-rose-500/30' },
    { type: 'A-', demand: 82, status: 'High', color: 'bg-amber-500', ringColor: 'ring-amber-500/30' },
    { type: 'O+', demand: 76, status: 'High', color: 'bg-amber-500', ringColor: 'ring-amber-500/30' },
    { type: 'B+', demand: 64, status: 'Moderate', color: 'bg-blue-500', ringColor: 'ring-blue-500/30' },
    { type: 'A+', demand: 58, status: 'Moderate', color: 'bg-blue-500', ringColor: 'ring-blue-500/30' },
    { type: 'AB-', demand: 50, status: 'Stable', color: 'bg-emerald-500', ringColor: 'ring-emerald-500/30' },
    { type: 'AB+', demand: 38, status: 'Stable', color: 'bg-emerald-500', ringColor: 'ring-emerald-500/30' },
  ];

  const activeItem = inventoryData.find((d) => d.type === selectedGroup) || inventoryData[0];

  return (
    <div className="rounded-[28px] border border-gray-200/70 bg-white p-6 shadow-xs transition-colors duration-300 dark:border-gray-800/80 dark:bg-[#111827]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
              {t('bloodDemandIndex', 'Regional Blood Demand Index')}
            </h3>
          </div>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Real-time urgency metrics aggregated across connected emergency centers.
          </p>
        </div>

        <span className="flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-red-600 dark:bg-red-950/40 dark:text-red-400">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-600"></span>
          </span>
          {t('liveBadge', 'LIVE')}
        </span>
      </div>

      {/* Selected Blood Type Quick Card */}
      <div className="my-4 rounded-2xl bg-gray-50/80 p-3.5 border border-gray-100 dark:bg-gray-800/50 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 text-white font-black text-lg shadow-sm">
            {activeItem.type}
          </div>
          <div>
            <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
              Type {activeItem.type} Network Need
            </p>
            <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400">
              Urgency level is rated <span className="font-bold text-red-600 dark:text-red-400 uppercase">{activeItem.status}</span> today.
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-black text-gray-900 dark:text-white">
            {activeItem.demand}%
          </p>
          <span className="text-[10px] uppercase font-bold text-gray-400">
            Deficit Index
          </span>
        </div>
      </div>

      {/* Blood Demand Distribution Progress Bars */}
      <div className="space-y-2.5 pt-1">
        {inventoryData.map((item) => {
          const isSelected = selectedGroup === item.type;
          return (
            <button
              key={item.type}
              type="button"
              onClick={() => setSelectedGroup(item.type)}
              className={`w-full group flex items-center gap-3 text-left p-1.5 rounded-xl transition-all ${
                isSelected
                  ? 'bg-red-50/60 dark:bg-red-950/30 ring-1 ring-red-500/20'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800/40'
              }`}
            >
              <span className={`w-8 text-center text-xs font-black ${
                isSelected ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'
              }`}>
                {item.type}
              </span>

              {/* Progress Track */}
              <div className="flex-1 h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden relative">
                <div
                  style={{ width: `${item.demand}%` }}
                  className={`h-full rounded-full ${item.color} transition-all duration-700`}
                />
              </div>

              <span className="w-10 text-right text-xs font-extrabold text-gray-900 dark:text-gray-200">
                {item.demand}%
              </span>

              <span className={`hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                item.status === 'Critical'
                  ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400'
                  : item.status === 'High'
                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                  : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
              }`}>
                {item.status}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
