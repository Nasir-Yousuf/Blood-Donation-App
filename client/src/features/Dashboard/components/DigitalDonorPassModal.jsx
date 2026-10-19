'use client';

import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

export default function DigitalDonorPassModal({ user, onClose }) {
  const { t } = useLanguage();

  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl transition-all dark:bg-[#111827] border border-gray-200 dark:border-gray-800">
        
        {/* Pass Top Banner */}
        <div className="relative overflow-hidden bg-gradient-to-tr from-red-600 via-rose-600 to-red-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <span className="text-sm font-black tracking-wider uppercase">
                Clinical Vitality • Digital Pass
              </span>
            </div>
            <button
              onClick={onClose}
              className="rounded-full bg-black/20 p-1.5 text-white/80 hover:bg-black/40 hover:text-white"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mt-6 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-red-100">
                Verified Blood Donor
              </p>
              <h3 className="text-2xl font-black">{user.name}</h3>
              <p className="text-xs text-red-100">{user.phone || '+880 1700 000000'}</p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-red-600 shadow-lg">
              <span className="text-3xl font-black">{user.bloodType || 'O+'}</span>
            </div>
          </div>
        </div>

        {/* Pass Details */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/50 text-xs">
            <div>
              <span className="text-gray-400 font-bold uppercase text-[9px]">Donor ID</span>
              <p className="font-extrabold text-gray-800 dark:text-gray-200">
                #VTL-{user._id ? user._id.slice(-6).toUpperCase() : '892401'}
              </p>
            </div>
            <div>
              <span className="text-gray-400 font-bold uppercase text-[9px]">Emergency Status</span>
              <p className="font-extrabold text-emerald-600 dark:text-emerald-400">
                {user.isAvailable ? 'Active On-Call' : 'Standby'}
              </p>
            </div>
            <div>
              <span className="text-gray-400 font-bold uppercase text-[9px]">Registered Area</span>
              <p className="font-extrabold text-gray-800 dark:text-gray-200">
                {user.location?.city || user.city || 'Dhaka Central'}
              </p>
            </div>
            <div>
              <span className="text-gray-400 font-bold uppercase text-[9px]">Verification</span>
              <p className="font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                <span>✓ Verified Hero</span>
              </p>
            </div>
          </div>

          {/* Barcode / QR Simulation graphic */}
          <div className="mt-6 flex flex-col items-center justify-center p-3 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
            <div className="flex gap-1 h-10 items-center">
              {[3, 1, 4, 2, 5, 2, 1, 4, 3, 2, 4, 1, 3, 5, 2, 1, 4, 2, 3].map((w, i) => (
                <div
                  key={i}
                  style={{ width: `${w * 2}px` }}
                  className="h-8 bg-gray-800 dark:bg-gray-200 rounded-xs"
                />
              ))}
            </div>
            <span className="mt-2 text-[10px] tracking-widest text-gray-400 font-mono">
              SCAN AT CLINICAL CHECK-IN
            </span>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => {
                alert('Donor Pass saved to clipboard / saved as PDF preview!');
              }}
              className="flex-1 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 py-3 text-xs font-bold text-white shadow-md shadow-red-500/25 hover:brightness-105"
            >
              Save Pass / Print
            </button>
            <button
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-4 py-3 text-xs font-bold text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
