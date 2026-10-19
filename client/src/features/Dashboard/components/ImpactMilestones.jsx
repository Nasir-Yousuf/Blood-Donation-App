'use client';

import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

export default function ImpactMilestones({ milestone }) {
  const { t } = useLanguage();

  const badges = [
    { name: 'First Drop', requirement: '1 Donation', unlocked: true, icon: '🩸' },
    { name: 'Life Saver', requirement: '3 Donations', unlocked: (milestone?.percent || 0) >= 30, icon: '🛡' },
    { name: 'Silver Hero', requirement: '5 Donations', unlocked: (milestone?.percent || 0) >= 50, icon: '⭐' },
    { name: 'Centurion', requirement: '10+ Donations', unlocked: (milestone?.percent || 0) >= 100, icon: '👑' },
  ];

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-gray-200/70 bg-gradient-to-br from-gray-900 via-gray-850 to-slate-900 p-6 text-white shadow-lg shadow-black/10 transition-colors duration-300 dark:border-gray-800">
      <div className="relative z-10">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🏆</span>
              <h3 className="text-base font-extrabold text-white">
                {t('badgesMilestones', 'Donor Milestones & Badges')}
              </h3>
            </div>
            <p className="mt-1 text-xs text-gray-300">
              You are only <strong className="text-rose-400 font-bold">{milestone?.donationsAway || 3} donations</strong> away from '{milestone?.level || 'Silver'}' tier.
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">
              Tier: {milestone?.level || 'Bronze'}
            </span>
            <p className="mt-1 text-sm font-black text-rose-400">
              {milestone?.percent || 0}% Complete
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-3 w-full overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-gradient-to-r from-red-500 via-rose-500 to-amber-400 transition-all duration-1000 shadow-sm"
            style={{ width: `${milestone?.percent || 0}%` }}
          />
        </div>

        {/* Badge Showcase Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {badges.map((b) => (
            <div
              key={b.name}
              className={`flex flex-col items-center justify-center rounded-2xl p-3 text-center border transition-all ${
                b.unlocked
                  ? 'border-red-500/30 bg-white/10 shadow-sm hover:scale-105'
                  : 'border-white/5 bg-white/5 opacity-50'
              }`}
            >
              <span className="text-2xl">{b.icon}</span>
              <p className="mt-1.5 text-xs font-black text-white">{b.name}</p>
              <p className="text-[10px] text-gray-400">{b.requirement}</p>
              <span className={`mt-2 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                b.unlocked ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-gray-400'
              }`}>
                {b.unlocked ? 'Unlocked' : 'Locked'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
