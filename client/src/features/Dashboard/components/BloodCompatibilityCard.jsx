'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

const COMPATIBILITY_MAP = {
  'O-': {
    give: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
    receive: ['O-'],
    typeNote: 'Universal Red Cell Donor',
  },
  'O+': {
    give: ['O+', 'A+', 'B+', 'AB+'],
    receive: ['O+', 'O-'],
    typeNote: 'High Demand Provider',
  },
  'A-': {
    give: ['A-', 'A+', 'AB-', 'AB+'],
    receive: ['A-', 'O-'],
    typeNote: 'Rare Negative Profile',
  },
  'A+': {
    give: ['A+', 'AB+'],
    receive: ['A+', 'A-', 'O+', 'O-'],
    typeNote: 'Very Common & Vital',
  },
  'B-': {
    give: ['B-', 'B+', 'AB-', 'AB+'],
    receive: ['B-', 'O-'],
    typeNote: 'Critical Emergency Need',
  },
  'B+': {
    give: ['B+', 'AB+'],
    receive: ['B+', 'B-', 'O+', 'O-'],
    typeNote: 'High Frequency Recipient',
  },
  'AB-': {
    give: ['AB-', 'AB+'],
    receive: ['AB-', 'A-', 'B-', 'O-'],
    typeNote: 'Universal Plasma Donor',
  },
  'AB+': {
    give: ['AB+'],
    receive: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
    typeNote: 'Universal Red Cell Recipient',
  },
};

export default function BloodCompatibilityCard({ currentBloodType = 'O+' }) {
  const { t } = useLanguage();
  const [activeType, setActiveType] = useState(
    COMPATIBILITY_MAP[currentBloodType] ? currentBloodType : 'O+'
  );

  const bloodTypes = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];
  const info = COMPATIBILITY_MAP[activeType] || COMPATIBILITY_MAP['O+'];

  return (
    <div className="rounded-[28px] border border-gray-200/70 bg-white p-6 shadow-xs transition-colors duration-300 dark:border-gray-800/80 dark:bg-[#111827]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
            {t('compatibilityMatrix', 'Blood Type Compatibility')}
          </h3>
        </div>

        <span className="text-[11px] font-bold text-gray-400">
          Tap any group to inspect
        </span>
      </div>

      {/* Blood Group Selectors */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 mb-5">
        {bloodTypes.map((type) => {
          const isSelected = activeType === type;
          return (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`rounded-xl py-2 text-xs font-black transition-all ${
                isSelected
                  ? 'bg-gradient-to-tr from-red-600 to-rose-500 text-white shadow-sm scale-105 ring-2 ring-red-500/20'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {type}
            </button>
          );
        })}
      </div>

      {/* Selected Type Diagnostic Card */}
      <div className="rounded-2xl bg-gray-50/80 p-4 border border-gray-100 dark:bg-gray-800/50 dark:border-gray-800">
        <div className="flex items-center justify-between mb-3 border-b border-gray-200/60 pb-2 dark:border-gray-700/60">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-red-600 dark:text-red-400">
              Type {activeType}
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              • {info.typeNote}
            </span>
          </div>
          {activeType === currentBloodType && (
            <span className="rounded-full bg-red-100 px-2 py-0.5 text-[9px] font-bold text-red-600 uppercase dark:bg-red-950 dark:text-red-400">
              Your Type
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Can Donate To */}
          <div>
            <p className="font-extrabold text-gray-800 dark:text-gray-200 mb-1.5 flex items-center gap-1.5">
              <span className="text-emerald-500">↑</span> {t('canGiveTo', 'Can donate to:')}
            </p>
            <div className="flex flex-wrap gap-1">
              {info.give.map((t) => (
                <span
                  key={t}
                  className="rounded-lg bg-emerald-50 px-2 py-1 font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Can Receive From */}
          <div>
            <p className="font-extrabold text-gray-800 dark:text-gray-200 mb-1.5 flex items-center gap-1.5">
              <span className="text-blue-500">↓</span> {t('canReceiveFrom', 'Can receive from:')}
            </p>
            <div className="flex flex-wrap gap-1">
              {info.receive.map((t) => (
                <span
                  key={t}
                  className="rounded-lg bg-blue-50 px-2 py-1 font-bold text-blue-700 dark:bg-blue-950/50 dark:text-blue-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
