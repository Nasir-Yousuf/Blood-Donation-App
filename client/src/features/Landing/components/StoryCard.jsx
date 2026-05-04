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
        className="group relative flex h-full cursor-crosshair flex-col justify-center overflow-hidden rounded-[2rem] border border-red-500/30 bg-gradient-to-br from-[#c81e1e] via-[#a81919] to-[#800f0f] p-10 text-white"
      >
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/20 blur-3xl transition-colors duration-500 group-hover:bg-white/30"></div>
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-black/20 blur-3xl"></div>

        {/* Animated ECG inside Metric Card */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 150 L 100 150 L 120 100 L 150 250 L 180 120 L 200 150 L 400 150"
            stroke="white"
            strokeWidth="4"
            fill="none"
            className="animate-ecg"
          />
        </svg>

        <svg
          width="32"
          height="32"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="animate-realistic-heartbeat relative z-10 mb-6 text-red-200"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          ></path>
        </svg>
        <h3 className="relative z-10 mb-4 text-6xl font-black tracking-tighter drop-shadow-2xl lg:text-7xl">
          {metricValue}
        </h3>
        <p className="relative z-10 text-lg leading-relaxed font-medium text-red-100">
          {metricLabel}
        </p>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className="group relative flex h-full cursor-crosshair flex-col justify-between overflow-hidden rounded-[2rem] border border-white bg-white/60 p-10 shadow-xl backdrop-blur-2xl"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
      <div className="relative z-10">
        <div className="mb-6 flex text-xl tracking-widest text-[#166534] drop-shadow-sm">
          ★★★★★
        </div>
        <p className="mb-8 text-lg leading-relaxed font-medium text-gray-800 italic">
          "{quote}"
        </p>
      </div>
      <div className="relative z-10 flex items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-red-400 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-40"></div>
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
            alt={name}
            className="relative h-14 w-14 rounded-full bg-white shadow-md ring-4 ring-gray-50"
          />
        </div>
        <div>
          <h5 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-[#c81e1e]">
            {name}
          </h5>
          <p className="text-xs font-bold tracking-wider text-[#c81e1e] uppercase">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
