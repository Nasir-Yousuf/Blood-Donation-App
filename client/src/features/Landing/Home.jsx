'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

import FadeInSection from './utils/FadeInSection';
import LivingBackground from './components/LivingBackground';
import StoryCard from './components/StoryCard';
import { useLanguage } from '../../context/LanguageContext';

// --- MAIN HOME COMPONENT ---
const Home = () => {
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#fafafa] dark:bg-[#08090C] font-sans text-gray-900 dark:text-gray-100 selection:bg-red-200 selection:text-red-900 transition-colors duration-200">
      <style>{`
        /* --- ADVANCED LIVING ANIMATIONS --- */
        @keyframes realistic-heartbeat {
          0% { transform: scale(1); filter: drop-shadow(0 0 0px rgba(200,30,30,0)); }
          15% { transform: scale(1.12); filter: drop-shadow(0 0 15px rgba(200,30,30,0.5)); }
          30% { transform: scale(1); filter: drop-shadow(0 0 0px rgba(200,30,30,0)); }
          45% { transform: scale(1.12); filter: drop-shadow(0 0 15px rgba(200,30,30,0.5)); }
          100% { transform: scale(1); filter: drop-shadow(0 0 0px rgba(200,30,30,0)); }
        }
        
        @keyframes ecgFlow {
          0% { stroke-dashoffset: 1600; }
          100% { stroke-dashoffset: 0; }
        }

        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        @keyframes particle-drift {
          0% { transform: translateY(0) scale(0.5); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.6; }
          100% { transform: translateY(-100vh) scale(1.5); opacity: 0; }
        }

        @keyframes lifeline-flow {
          0% { stroke-dashoffset: 200; }
          100% { stroke-dashoffset: 0; }
        }

        @keyframes lifeline-flow-reverse {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 300; }
        }

        @keyframes radar-ping {
          0% { transform: scale(0.5); opacity: 0.8; border-width: 4px; }
          100% { transform: scale(2.5); opacity: 0; border-width: 1px; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        /* --- UTILITY CLASSES --- */
        .animate-realistic-heartbeat { animation: realistic-heartbeat 2s infinite cubic-bezier(0.2, 0.8, 0.2, 1); transform-origin: center; }
        .animate-realistic-heartbeat-slow { animation: realistic-heartbeat 3s infinite cubic-bezier(0.2, 0.8, 0.2, 1); transform-origin: center; }
        .animate-ecg { stroke-dasharray: 800; stroke-dashoffset: 1600; animation: ecgFlow 3.5s linear infinite; }
        .animate-blob { animation: blob 15s infinite alternate ease-in-out; }
        .animate-lifeline-flow { animation: lifeline-flow 3s linear infinite; }
        .animate-lifeline-flow-reverse { animation: lifeline-flow-reverse 4s linear infinite; }
        .animate-radar { animation: radar-ping 3s infinite cubic-bezier(0.0, 0, 0.2, 1); }
        .animate-float-1 { animation: float 6s ease-in-out infinite; }
        .animate-float-2 { animation: float 5s ease-in-out infinite 1s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>

      {/* Background System Layer */}
      <LivingBackground />

      {/* 1. HERO SECTION */}
      <section className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-16 pb-24 lg:grid-cols-2 lg:gap-8">
        {/* Left Content */}
        <div className="relative z-10 order-2 max-w-xl lg:order-1">
          <FadeInSection delay={100}>
            <div className="animate-float-1 mb-6 inline-flex items-center gap-2.5 rounded-full border border-red-500/20 bg-red-50/80 px-3.5 py-1 text-[11px] font-mono tracking-wider text-red-600 uppercase shadow-sm backdrop-blur-md dark:border-red-500/30 dark:bg-red-950/30 dark:text-red-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              <span>LIVE LINK NETWORK : ACTIVE</span>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span className="font-bold">SYS PULSE : 99.2%</span>
            </div>
          </FadeInSection>

          <FadeInSection delay={200}>
            <h1 className="mb-6 text-5xl leading-[1.05] font-extrabold tracking-tight text-gray-900 drop-shadow-sm md:text-6xl lg:text-[4.5rem] dark:text-white">
              {t('heroTitleLine1', 'Every Second')} <br />
              {t('heroTitleLine2', 'Counts.')} <br />
              <span className="bg-gradient-to-r from-red-500 via-rose-500 to-red-400 bg-clip-text text-transparent">
                {t('heroTitleLine3', 'Every Drop')} <br className="hidden md:block" /> {t('heroTitleLine4', 'Matters.')}
              </span>
            </h1>
          </FadeInSection>

          <FadeInSection delay={300}>
            <p className="mb-10 max-w-md text-base leading-relaxed font-normal text-gray-600 md:text-lg dark:text-gray-400">
              {t(
                'heroDescription',
                "VitalPulse connects urgent blood needs with volunteer donors in real-time. We've optimized the flow between life and emergency."
              )}
            </p>
          </FadeInSection>

          <FadeInSection delay={400}>
            <div className="relative mb-12 flex flex-wrap items-center gap-4">
              <Link
                href="/registration"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#FF3B30] to-[#E02424] px-7 py-3.5 text-center text-sm font-bold text-white shadow-[0_0_25px_rgba(255,59,48,0.4)] transition-all hover:scale-[1.02] hover:brightness-110 active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('btnBecomeDonor', 'Become a Donor')}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-realistic-heartbeat"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </span>
              </Link>
              <Link
                href="/donor"
                className="rounded-full border border-gray-200 bg-white/80 px-7 py-3.5 text-center text-sm font-bold text-gray-800 backdrop-blur-md transition-all hover:scale-[1.02] hover:border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10 active:scale-[0.98] flex items-center gap-2"
              >
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                </svg>
                <span>{t('btnFindBlood', 'Find Blood')}</span>
              </Link>
            </div>
          </FadeInSection>

          <FadeInSection delay={500}>
            <div className="flex items-center gap-3.5">
              <div className="flex -space-x-2.5">
                <div className="z-30 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-white dark:border-[#08090C] bg-blue-100 shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="donor"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="z-20 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-white dark:border-[#08090C] bg-green-100 shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="donor"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="z-10 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-white dark:border-[#08090C] bg-amber-100 shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                    alt="donor"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="z-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white dark:border-[#08090C] bg-gradient-to-r from-red-600 to-rose-600 text-[10px] font-black text-white shadow-sm">
                  +12k
                </div>
              </div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                <span className="font-bold text-gray-800 dark:text-gray-200">
                  {t('joinedBy', 'Joined by 12,000+')}
                </span>{' '}
                <br />
                {t('activeDonorsText', 'active donors this month')}
              </p>
            </div>
          </FadeInSection>
        </div>

        {/* Right Animation - Futuristic HUD Terminal Card */}
        <FadeInSection
          delay={200}
          className="relative order-1 flex w-full items-center justify-center lg:order-2"
        >
          <div className="group relative w-full overflow-hidden rounded-[2.5rem] border border-gray-200 bg-white/80 p-6 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-[#10121A]/95 lg:p-8">
            {/* Ambient Radial Red Glow */}
            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-red-600/20 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-rose-600/15 blur-[90px]" />

            {/* Terminal Header Bar */}
            <div className="relative z-10 mb-6 flex items-center justify-between border-b border-gray-100 pb-4 dark:border-white/10">
              <div className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></span>
                <span>SYS_NODE: LIVE_VITALITY</span>
              </div>
              <div className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-gray-500 dark:border-white/10 dark:bg-white/5 dark:text-gray-400">
                72 BPM AVG
              </div>
            </div>

            {/* Center Heart Hologram & ECG Wireframe */}
            <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-gray-50/50 to-transparent dark:from-white/[0.02] dark:to-transparent">
              <svg viewBox="0 0 600 360" className="h-full w-full drop-shadow-2xl">
                <defs>
                  <radialGradient id="neonGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
                    <stop offset="60%" stopColor="#dc2626" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                  </radialGradient>
                  <filter id="ecgGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#ef4444" floodOpacity="0.9" />
                  </filter>
                </defs>

                {/* Concentric Dashed Radar Target Rings */}
                <circle cx="300" cy="180" r="140" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 8" opacity="0.15" />
                <circle cx="300" cy="180" r="105" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.3" className="animate-spin" style={{ animationDuration: '40s', transformOrigin: '300px 180px' }} />
                <circle cx="300" cy="180" r="70" fill="url(#neonGlow)" />

                {/* Wireframe Glowing Heart */}
                <path
                  d="M 300 130 C 275 90, 215 105, 215 165 C 215 225, 300 275, 300 275 C 300 275, 385 225, 385 165 C 385 105, 325 90, 300 130 Z"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="animate-realistic-heartbeat opacity-80"
                  style={{ transformOrigin: '300px 180px' }}
                />

                {/* Solid inner heart pulse line */}
                <path
                  d="M 300 145 C 280 115, 235 125, 235 170 C 235 215, 300 255, 300 255 C 300 255, 365 215, 365 170 C 365 125, 320 115, 300 145 Z"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                  className="animate-realistic-heartbeat"
                  style={{ transformOrigin: '300px 180px', filter: 'url(#ecgGlow)' }}
                />

                {/* ECG Pulse Signal cutting through center */}
                <path
                  d="M 20 180 L 190 180 L 210 130 L 230 230 L 255 100 L 285 250 L 305 70 L 330 260 L 350 140 L 370 200 L 390 180 L 580 180"
                  stroke="#ff4d4d"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-ecg"
                  filter="url(#ecgGlow)"
                />
              </svg>
            </div>

            {/* Bottom Telemetry HUD Bar */}
            <div className="relative z-10 mt-6 grid grid-cols-3 gap-2 border-t border-gray-100 pt-4 font-mono text-[10px] dark:border-white/10">
              <div>
                <p className="tracking-wider text-gray-400 uppercase">SUPPLY LEVEL</p>
                <p className="font-bold text-gray-900 dark:text-white uppercase">OPTIMAL</p>
              </div>
              <div className="text-center">
                <p className="tracking-wider text-gray-400 uppercase">TRIAGE STATUS</p>
                <p className="flex items-center justify-center gap-1.5 font-bold text-emerald-500 uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  ACTIVE
                </p>
              </div>
              <div className="text-right">
                <p className="tracking-wider text-gray-400 uppercase">SYNC FREQ</p>
                <p className="font-bold text-gray-900 dark:text-white">244.2 MHZ</p>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* 2. THE LIFE CHAIN (Connected by Flow Lines) */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 text-center">
        {/* Background Flow Line weaving through section */}
        <div className="pointer-events-none absolute top-0 left-0 -z-10 hidden h-full w-full overflow-hidden opacity-30 lg:block">
          <svg
            viewBox="0 0 1200 400"
            className="h-full w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 200 C 300 100, 600 300, 900 200 S 1200 100, 1200 200"
              stroke="url(#lifeline-grad)"
              strokeWidth="4"
              fill="none"
              className="animate-lifeline-flow"
              strokeDasharray="20 40"
            />
          </svg>
        </div>

        <FadeInSection>
          <div className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-widest text-red-600 dark:text-red-400 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-red-600 dark:bg-red-400"></span>
            DYNAMIC ACTIVATION
          </div>
          <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 drop-shadow-sm md:text-5xl dark:text-white">
            {t('flowTitle', 'The Flow of Life')}
          </h2>
          <p className="mx-auto mb-16 max-w-xl text-base font-normal text-gray-600 dark:text-gray-400">
            {t(
              'flowSubtitle',
              "Watch how a single pulse turns hours of waiting into minutes of action. Our system is alive and routing energy where it's needed most."
            )}
          </p>
        </FadeInSection>

        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1 */}
          <FadeInSection delay={100}>
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-gray-200/80 bg-white/80 p-7 text-left shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-white/10 dark:bg-[#12141C]/90 dark:hover:border-red-500/40">
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-gray-50 font-mono text-xs font-bold text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
                    01
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full text-red-500 dark:text-red-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-extrabold text-gray-900 dark:text-white">
                  {t('step1Title', 'Urgent Signal')}
                </h3>
                <p className="text-xs leading-relaxed font-normal text-gray-600 dark:text-gray-400">
                  {t(
                    'step1Desc',
                    'Hospitals initiate a pulse specifying blood type and exact medical urgency.'
                  )}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5 font-mono text-[10px] font-bold text-red-600 dark:text-red-400/90 flex items-center gap-1.5 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                LATENCY &lt; 60MS
              </div>
            </div>
          </FadeInSection>

          {/* Card 2 */}
          <FadeInSection delay={200}>
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-gray-200/80 bg-white/80 p-7 text-left shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-white/10 dark:bg-[#12141C]/90 dark:hover:border-red-500/40">
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-gray-50 font-mono text-xs font-bold text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
                    02
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full text-red-500 dark:text-red-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 3a9 9 0 0 1 9 9" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-extrabold text-gray-900 dark:text-white">
                  {t('step2Title', 'Proximity Scan')}
                </h3>
                <p className="text-xs leading-relaxed font-normal text-gray-600 dark:text-gray-400">
                  {t(
                    'step2Desc',
                    'Our system scans the living network to locate compatible donors actively in the area.'
                  )}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5 font-mono text-[10px] font-bold text-red-600 dark:text-red-400/90 flex items-center gap-1.5 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                RADIUS: 5.2 KM
              </div>
            </div>
          </FadeInSection>

          {/* Card 3 */}
          <FadeInSection delay={300}>
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-gray-200/80 bg-white/80 p-7 text-left shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-white/10 dark:bg-[#12141C]/90 dark:hover:border-red-500/40">
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-gray-50 font-mono text-xs font-bold text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
                    03
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full text-red-500 dark:text-red-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-extrabold text-gray-900 dark:text-white">
                  {t('step3Title', 'Connection Made')}
                </h3>
                <p className="text-xs leading-relaxed font-normal text-gray-600 dark:text-gray-400">
                  {t(
                    'step3Desc',
                    'Donors view details, connect with families, and receive real-time map navigation.'
                  )}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5 font-mono text-[10px] font-bold text-red-600 dark:text-red-400/90 flex items-center gap-1.5 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                ENCRYPTED DISPATCH
              </div>
            </div>
          </FadeInSection>

          {/* Card 4 */}
          <FadeInSection delay={400}>
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-gray-200/80 bg-white/80 p-7 text-left shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-white/10 dark:bg-[#12141C]/90 dark:hover:border-red-500/40">
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-gray-50 font-mono text-xs font-bold text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
                    04
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full text-red-500 dark:text-red-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="mb-2 text-lg font-extrabold text-gray-900 dark:text-white">
                  {t('step4Title', 'Energy Restored')}
                </h3>
                <p className="text-xs leading-relaxed font-normal text-gray-600 dark:text-gray-400">
                  {t(
                    'step4Desc',
                    'Donation completed. Energy transfers. Lives change. The pulse continues stronger.'
                  )}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5 font-mono text-[10px] font-bold text-red-600 dark:text-red-400/90 flex items-center gap-1.5 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                PULSE SUSTAINED
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 3. SPATIAL INTELLIGENCE */}
      <section className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-2">
        <div className="order-2 pr-0 lg:order-1 lg:pr-8">
          <FadeInSection>
            <div className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-widest text-red-600 dark:text-red-400 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600 dark:bg-red-400"></span>
              SPATIAL INTELLIGENCE
            </div>
            <h2 className="mb-6 text-4xl leading-[1.1] font-extrabold tracking-tight text-gray-900 drop-shadow-sm md:text-5xl dark:text-white">
              {t('spatialTitle', 'Precision in Every')} <br />
              <span className="bg-gradient-to-r from-red-500 via-rose-500 to-red-400 bg-clip-text text-transparent">
                {t('spatialHighlight', 'Connection')}
              </span>
            </h2>
            <p className="mb-10 text-base leading-relaxed font-normal text-gray-600 dark:text-gray-400">
              {t(
                'spatialDesc',
                "We weave a protective web across the city. When a signal is sent, we don't cause panic—we quietly illuminate the heroes closest to the scene."
              )}
            </p>
          </FadeInSection>

          <FadeInSection delay={200}>
            <div className="group relative space-y-5 overflow-hidden rounded-[2rem] border border-gray-200/80 bg-white/80 p-7 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#12141C]/90">
              <div className="flex gap-4">
                <div className="mt-1 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-white/5 dark:text-red-400 border border-red-100 dark:border-white/10">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-bold text-gray-900 dark:text-white">
                    {t('geoRoutingTitle', 'Fluid Geo-Routing')}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed font-normal text-gray-600 dark:text-gray-400">
                    {t(
                      'geoRoutingDesc',
                      'Real-time donor locations are mapped anonymously, creating dynamic pathways to those in need.'
                    )}
                  </p>
                </div>
              </div>

              <div className="h-px w-full bg-gray-100 dark:bg-white/5"></div>

              <div className="flex gap-4">
                <div className="mt-1 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-white/5 dark:text-red-400 border border-red-100 dark:border-white/10">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="8" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v2m0 16v2M2 12h2m16 0h2" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-bold text-gray-900 dark:text-white">
                    {t('typeResonanceTitle', 'Type Resonance')}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed font-normal text-gray-600 dark:text-gray-400">
                    {t(
                      'typeResonanceDesc',
                      'Instant biological filtering ensures only perfectly matched frequencies are alerted.'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>

        {/* Spatial Map HUD Terminal Card */}
        <FadeInSection
          delay={300}
          className="group relative order-1 flex w-full flex-col overflow-hidden rounded-[2.5rem] border border-gray-200 bg-white/80 p-6 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-[#10121A]/95 lg:order-2 lg:p-7"
        >
          {/* Simulated Dark City Map with Vector Pulse */}
          <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-gray-100 dark:border-white/5 bg-[#1a2233] dark:bg-[#0c101a]">
            {/* Map Canvas Background Grid */}
            <svg viewBox="0 0 600 400" className="h-full w-full object-cover">
              <defs>
                <pattern id="streetGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#253248" strokeWidth="0.8" opacity="0.4" />
                </pattern>
                {/* Coastline shape */}
                <linearGradient id="waterGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#080c14" />
                  <stop offset="100%" stopColor="#0d1424" />
                </linearGradient>
              </defs>

              <rect width="100%" height="100%" fill="url(#waterGrad)" />
              <path
                d="M 120 0 Q 180 140 260 200 T 400 400 L 600 400 L 600 0 Z"
                fill="#131926"
                stroke="#1f2c42"
                strokeWidth="1"
              />
              <rect width="100%" height="100%" fill="url(#streetGrid)" />

              {/* Highway network lines */}
              <path d="M 100 120 Q 250 180 500 240" fill="none" stroke="#2a3952" strokeWidth="2.5" />
              <path d="M 280 40 Q 320 220 360 380" fill="none" stroke="#2a3952" strokeWidth="2.5" />
              <path d="M 400 80 Q 450 200 550 320" fill="none" stroke="#1f2c42" strokeWidth="1.5" />

              {/* City Label */}
              <text x="370" y="220" fill="#506585" fontSize="13" fontWeight="bold" letterSpacing="1">
                San Francisco
              </text>

              {/* Glowing Pulse Vector Route between Donor & Hospital */}
              <path
                d="M 210 190 Q 310 260 420 180"
                fill="none"
                stroke="#ff4d4d"
                strokeWidth="3.5"
                strokeDasharray="6 6"
                className="animate-lifeline-flow"
                style={{ filter: 'drop-shadow(0 0 8px rgba(255,77,77,0.8))' }}
              />

              {/* Donor Node */}
              <circle cx="210" cy="190" r="14" fill="#ef4444" fillOpacity="0.2" className="animate-ping" />
              <circle cx="210" cy="190" r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />

              {/* Hospital Node */}
              <circle cx="420" cy="180" r="16" fill="#ef4444" fillOpacity="0.25" className="animate-pulse" />
              <circle cx="420" cy="180" r="7" fill="#dc2626" stroke="#ffffff" strokeWidth="2.5" />

              {/* Intermediate nodes */}
              <circle cx="160" cy="110" r="3.5" fill="#64748b" />
              <circle cx="340" cy="120" r="4" fill="#64748b" />
              <circle cx="480" cy="270" r="3.5" fill="#64748b" />
            </svg>

            {/* Floating Live Dispatch Badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-3 rounded-2xl border border-gray-200 bg-white/95 px-3.5 py-2 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-[#12141C]/90">
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-red-600 text-[10px] font-black text-white shadow-md">
                O+
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-900 dark:text-white">
                  Energy Match
                </p>
                <p className="flex items-center gap-1 font-mono text-[9px] font-bold text-red-600 dark:text-red-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping"></span>
                  Routing connection...
                </p>
              </div>
            </div>

            {/* Bottom Hospital Tag on Map */}
            <div className="absolute bottom-3 right-3 z-20 rounded-lg border border-white/10 bg-black/70 px-2.5 py-1 font-mono text-[9px] font-bold text-gray-300 backdrop-blur-md flex items-center gap-1.5">
              <span className="text-red-400">ST. JUDE EMERGENCY DISPATCH</span>
              <span className="text-white/40">|</span>
              <span className="text-amber-400">ETA: 4M</span>
            </div>
          </div>

          {/* Bottom Telemetry Stats Grid */}
          <div className="relative z-10 mt-5 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4 font-mono text-[10px] sm:grid-cols-4 dark:border-white/10">
            <div>
              <p className="text-gray-400 uppercase tracking-wider">SURGEON CLEARANCE</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">98.4%</p>
            </div>
            <div>
              <p className="text-gray-400 uppercase tracking-wider">DISPATCHED</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">3,481</p>
            </div>
            <div>
              <p className="text-gray-400 uppercase tracking-wider">ACTIVE VECTORS</p>
              <p className="text-sm font-bold text-red-600 dark:text-red-400">42 LIVE</p>
            </div>
            <div>
              <p className="text-gray-400 uppercase tracking-wider">SECURITY LAYER</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">AES-256</p>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* 4. HUMAN STORIES */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <div className="pointer-events-none absolute top-1/2 left-0 -z-10 h-[400px] w-full -skew-y-3 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 blur-3xl"></div>

        <FadeInSection>
          <div className="relative z-10 mb-16 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 font-mono text-[10px] tracking-wider text-red-500 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></span>
              SURVIVOR & HERO TELEMETRY
            </div>
            <h2 className="mb-3 text-4xl font-extrabold tracking-tight text-gray-900 drop-shadow-sm md:text-5xl dark:text-white">
              {t('storiesTitle', 'Echoes of Life')}
            </h2>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
              {t('storiesSubtitle', 'Real people. Real energy. Real survival.')}
            </p>
          </div>
        </FadeInSection>

        {/* 3D Interactive Masonry/Grid */}
        <div className="perspective-1000 relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-3 items-stretch">
          <FadeInSection delay={100} className="h-full">
            <StoryCard
              quote={t(
                'story1Quote',
                'I received a signal while getting coffee. Within 20 minutes, I was at the center. Knowing my energy helped sustain a life before noon is indescribable.'
              )}
              name={t('story1Name', 'Marcus Chen')}
              role={t('story1Role', 'O- Energy Provider')}
              isMetric={false}
            />
          </FadeInSection>

          <FadeInSection delay={200} className="h-full">
            <StoryCard
              isMetric={true}
              metricValue={t('story2Metric', '20m')}
              metricLabel={t(
                'story2Label',
                'Average pulse-to-arrival time in critical emergency events last year.'
              )}
            />
          </FadeInSection>

          <FadeInSection delay={300} className="h-full">
            <StoryCard
              quote={t(
                'story3Quote',
                "The network made it seamless. I didn't have to panic. VitalPulse routed a match for my father in minutes. It felt like the city itself answered."
              )}
              name={t('story3Name', 'Sarah J.')}
              role={t('story3Role', 'Recipient Family')}
              isMetric={false}
            />
          </FadeInSection>
        </div>
      </section>

      {/* 5. CTA SECTION - HIGH TECH PULSE CAPSULE */}
      <section className="relative z-10 mx-auto mb-24 max-w-7xl px-6">
        <FadeInSection>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-gray-200/80 bg-white p-10 md:p-16 dark:border-white/10 dark:bg-gradient-to-br dark:from-[#13151f] dark:via-[#0e1017] dark:to-[#17121b] shadow-2xl">
            {/* Ambient Red Glow on right */}
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-red-600/15 blur-[100px]"></div>

            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              <div className="relative z-10 lg:col-span-7">
                {/* Emergency Tag */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1 font-mono text-[10px] tracking-wider text-red-500 uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping"></span>
                  EMERGENCY AWARENESS
                </div>

                <h2 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-5xl dark:text-white">
                  {t('ctaTitle1', 'You could be the reason someone survives today.')}
                </h2>

                <p className="mb-8 max-w-xl text-base leading-relaxed text-gray-600 dark:text-gray-400">
                  {t(
                    'ctaDesc',
                    'Every drop donated is a heartbeat continued. Join our living network of heroes and make an impact that pulses forever.'
                  )}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/donate"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF3B30] to-[#E02424] px-8 py-3.5 text-sm font-bold text-white shadow-[0_0_30px_rgba(255,59,48,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,59,48,0.7)]"
                  >
                    <span>{t('ctaBtn', 'Pulse Life Now')}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-50 px-7 py-3.5 text-sm font-semibold text-gray-800 transition-all hover:bg-gray-100 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-300 dark:hover:bg-white/[0.08]"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="9" y1="9" x2="15" y2="9"></line>
                      <line x1="12" y1="9" x2="12" y2="15"></line>
                    </svg>
                    <span>{t('ctaSecondary', 'Hospital Dispatch Inquiries')}</span>
                  </Link>
                </div>
              </div>

              {/* Glowing Heartbeat Wave Graphic on Right */}
              <div className="relative flex items-center justify-center lg:col-span-5">
                <div className="relative h-48 w-full max-w-md">
                  <svg
                    viewBox="0 0 500 150"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-full overflow-visible"
                  >
                    <defs>
                      <filter id="ecgGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#ef4444" floodOpacity="0.8" />
                      </filter>
                      <linearGradient id="ecgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
                        <stop offset="50%" stopColor="#ff4d4d" stopOpacity="1" />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>

                    {/* Background baseline */}
                    <path
                      d="M 0 75 L 180 75"
                      stroke="rgba(239,68,68,0.2)"
                      strokeWidth="2"
                    />
                    <path
                      d="M 320 75 L 500 75"
                      stroke="rgba(239,68,68,0.2)"
                      strokeWidth="2"
                    />

                    {/* Animated Pulsing ECG Waveform */}
                    <path
                      d="M 0 75 L 160 75 L 175 60 L 190 90 L 210 20 L 235 130 L 255 50 L 275 85 L 290 75 L 500 75"
                      stroke="url(#ecgGrad)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#ecgGlow)"
                      className="animate-ecg"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* 6. BEAUTIFUL TELEMETRY FOOTER */}
      <footer className="relative z-10 border-t border-gray-200 bg-white/60 pt-16 pb-8 backdrop-blur-xl dark:border-white/10 dark:bg-[#08090C]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 pb-12 md:grid-cols-12">
            {/* Brand column */}
            <div className="md:col-span-5">
              <Link href="/" className="group mb-4 inline-flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-700 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                  </svg>
                </div>
                <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  VitalPulse
                </span>
              </Link>
              <p className="max-w-sm text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {t(
                  'footerDesc',
                  'VitalPulse — Connecting life and emergency through real-time living networks, making every pulse matter.'
                )}
              </p>
            </div>

            {/* Network Navigation */}
            <div className="md:col-span-4">
              <h3 className="mb-4 text-xs font-semibold tracking-wider text-gray-900 uppercase dark:text-gray-300">
                Network Navigation
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/find-donors" className="text-gray-500 transition-colors hover:text-red-500 dark:text-gray-400 dark:hover:text-white">
                    Find Donors
                  </Link>
                </li>
                <li>
                  <Link href="/emergency" className="text-gray-500 transition-colors hover:text-red-500 dark:text-gray-400 dark:hover:text-white">
                    Emergency Triage
                  </Link>
                </li>
                <li>
                  <Link href="/impact" className="text-gray-500 transition-colors hover:text-red-500 dark:text-gray-400 dark:hover:text-white">
                    Impact Telemetry
                  </Link>
                </li>
              </ul>
            </div>

            {/* Logistics & Support */}
            <div className="md:col-span-3">
              <h3 className="mb-4 text-xs font-semibold tracking-wider text-gray-900 uppercase dark:text-gray-300">
                Logistics & Support
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/privacy" className="text-gray-500 transition-colors hover:text-red-500 dark:text-gray-400 dark:hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/standards" className="text-gray-500 transition-colors hover:text-red-500 dark:text-gray-400 dark:hover:text-white">
                    Clinical Standards
                  </Link>
                </li>
                <li>
                  <Link href="/dispatch" className="text-gray-500 transition-colors hover:text-red-500 dark:text-gray-400 dark:hover:text-white">
                    Dispatch Center
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar matching screenshot */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 text-xs text-gray-500 md:flex-row dark:border-white/10 dark:text-gray-500">
            <p>
              © 2026 Clinical Vitality / VitalPulse. All rights reserved.
            </p>
            <div className="font-mono text-[10px] tracking-wider text-gray-400 uppercase dark:text-gray-500">
              SECURE NODE: VP-LS <span className="mx-2 text-red-500/40">|</span> ENCRYPTED CLINICAL DISPATCH
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
