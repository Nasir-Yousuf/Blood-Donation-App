'use client';

import React, { useState, useRef } from 'react';

const StoryCard = ({
  quote,
  name,
  role,
  isMetric,
  metricValue,
  metricLabel,
}) => {
  const [style, setStyle] = useState({});
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      boxShadow: `${-rotateY}px ${rotateX}px 40px rgba(200,30,30,0.15)`,
      transition: 'transform 0.1s ease-out, box-shadow 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      boxShadow: `0 10px 30px rgba(0,0,0,0.05)`,
      transition:
        'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.6s ease-out',
    });
  };

  if (isMetric) {
    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={style}
        className="group relative flex h-full cursor-crosshair flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-gray-200/80 bg-white/80 p-8 text-center shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-[#141620]/90"
      >
        {/* Ambient Red Glow */}
        <div className="pointer-events-none absolute -top-12 -right-12 h-36 w-36 rounded-full bg-red-500/20 blur-3xl"></div>

        {/* Stopwatch Icon */}
        <div className="relative z-10 mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-500 dark:text-red-400">
          <svg
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="13" r="8" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4l2.5 2.5M12 2v3M9 2h6" />
          </svg>
        </div>

        <h3 className="relative z-10 mb-2 text-6xl font-black tracking-tight text-gray-900 drop-shadow-sm dark:text-white lg:text-7xl">
          {metricValue}
        </h3>
        <p className="relative z-10 mb-5 max-w-xs text-xs font-medium text-gray-500 dark:text-gray-400 leading-relaxed">
          {metricLabel}
        </p>

        {/* Efficiency Badge */}
        <div className="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 font-mono text-[10px] font-bold text-gray-700 uppercase dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
          94.7% RESPONSE EFFICIENCY
        </div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className="group relative flex h-full cursor-crosshair flex-col justify-between overflow-hidden rounded-[2rem] border border-gray-200/80 bg-white/80 p-8 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-[#12141C]/90"
    >
      <div className="relative z-10">
        <div className="mb-4 flex text-base tracking-widest text-amber-500 dark:text-amber-400">
          ★★★★★
        </div>
        <p className="text-xs leading-relaxed font-normal text-gray-700 dark:text-gray-300 italic">
          "{quote}"
        </p>
      </div>
      <div className="relative z-10 mt-6 flex items-center gap-3.5 border-t border-gray-100 dark:border-white/5 pt-4">
        <div className="relative">
          <img
            src={`https://images.unsplash.com/photo-${name.includes('Marcus') ? '1500648767791-00dcc994a43e' : '1494790108377-be9c29b29330'}?auto=format&fit=crop&w=120&q=80`}
            alt={name}
            className="h-11 w-11 rounded-full object-cover ring-2 ring-gray-100 dark:ring-white/10"
          />
        </div>
        <div>
          <h5 className="text-sm font-bold text-gray-900 dark:text-white">
            {name}
          </h5>
          <p className="text-[10px] font-bold tracking-wider text-gray-500 dark:text-gray-400 uppercase">
            {role.replace('O- ', '')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
