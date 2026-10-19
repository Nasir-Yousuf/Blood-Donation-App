'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../context/LanguageContext';

export default function EligibilityCountdownRing({ user }) {
  const { t } = useLanguage();

  // Standard safe recovery interval is 90 days.
  // If nextAvailableDate is provided, compute diff; otherwise calculate from last donation or set eligible.
  const targetDate = user?.nextAvailableDate ? new Date(user.nextAvailableDate) : null;
  const now = new Date();
  
  let daysRemaining = 0;
  if (targetDate && targetDate > now) {
    const diffTime = Math.abs(targetDate - now);
    daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  const totalCycleDays = 90;
  const daysCompleted = Math.max(0, totalCycleDays - daysRemaining);
  const percentage = Math.min(100, Math.round((daysCompleted / totalCycleDays) * 100));

  // Circular gauge math (radius = 42, circumference = 2 * PI * 42 ≈ 263.89)
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const isEligible = daysRemaining <= 0;

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-gray-200/70 bg-white p-6 shadow-xs transition-colors duration-300 dark:border-gray-800/80 dark:bg-[#111827]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-100 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
            {t('recoveryProgress', 'Safe Interval Recovery')}
          </h3>
        </div>

        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${
          isEligible
            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
            : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
        }`}>
          {isEligible ? t('readyToDonate', 'Ready to Donate') : t('restingPhase', 'Resting Cycle')}
        </span>
      </div>

      {/* Ring Gauge & Readiness Content */}
      <div className="flex flex-col sm:flex-row items-center gap-6 py-2">
        {/* SVG Circular Ring Gauge */}
        <div className="relative flex h-28 w-28 shrink-0 items-center justify-center">
          <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
            {/* Background Track */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="text-gray-100 dark:text-gray-800"
              strokeWidth="9"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Animated Progress Arc */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className={`transition-all duration-1000 ease-out ${
                isEligible
                  ? 'text-emerald-500'
                  : 'text-gradient-red stroke-red-600 dark:stroke-rose-500'
              }`}
              strokeWidth="9"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>

          {/* Center Inner Readout */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            {isEligible ? (
              <>
                <span className="text-2xl">🩸</span>
                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase">
                  100%
                </span>
              </>
            ) : (
              <>
                <span className="text-xl font-black text-gray-900 dark:text-white">
                  {daysRemaining}
                </span>
                <span className="text-[9px] font-extrabold uppercase text-gray-400">
                  {t('daysRemaining', 'Days Left')}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Narrative & Action */}
        <div className="flex-1 text-center sm:text-left">
          {isEligible ? (
            <>
              <h4 className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                {t('eligibleToday', 'You are eligible to donate today!')}
              </h4>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Your body has fully regenerated red blood cells. Multiple patients with {user?.bloodType || 'compatible'} blood need immediate assistance.
              </p>
              <div className="mt-3">
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:brightness-110"
                >
                  <span>Pledge Blood Now</span>
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </>
          ) : (
            <>
              <h4 className="text-sm font-extrabold text-gray-800 dark:text-gray-200">
                Recovery in Progress ({percentage}%)
              </h4>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                A 90-day interval ensures your iron and hemoglobin levels remain strong and healthy. Estimated ready date: <strong className="text-gray-700 dark:text-gray-300">{targetDate ? targetDate.toLocaleDateString() : 'Next Month'}</strong>.
              </p>
              <div className="mt-2 flex items-center gap-2 text-[11px] font-bold text-gray-400">
                <span>Healthy diet & hydration advised</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
