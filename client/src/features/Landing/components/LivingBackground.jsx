'use client';
import React from 'react';

const LivingBackground = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#fafafa]">
      {/* Liquid Flow Blobs */}
      <div className="animate-blob absolute top-[-10%] left-[-10%] h-[50vw] w-[50vw] rounded-full bg-rose-100/40 mix-blend-multiply blur-[100px]"></div>
      <div className="animate-blob animation-delay-2000 absolute top-[20%] right-[-10%] h-[40vw] w-[40vw] rounded-full bg-red-100/30 mix-blend-multiply blur-[120px]"></div>
      <div className="animate-blob animation-delay-4000 absolute bottom-[-20%] left-[20%] h-[60vw] w-[60vw] rounded-full bg-pink-100/30 mix-blend-multiply blur-[150px]"></div>

      {/* Floating Life Particles */}
      {mounted && [...Array(30)].map((_, i) => (
        <div
          key={i}
          className="animate-particle-drift absolute rounded-full bg-gradient-to-t from-red-400 to-rose-200 opacity-0 blur-[1px]"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `-5%`,
            width: `${Math.random() * 5 + 2}px`,
            height: `${Math.random() * 5 + 2}px`,
            animationDuration: `${Math.random() * 15 + 10}s`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}

      {/* Global Glowing Lifeline (Vertical) */}
      <svg
        className="absolute top-0 left-[5%] h-full w-2 opacity-20"
        preserveAspectRatio="none"
      >
        <path
          d="M 4 0 Q 8 200 4 400 T 4 800 T 4 1200 T 4 1600 T 4 2000 T 4 2400"
          stroke="url(#lifeline-grad)"
          strokeWidth="2"
          fill="none"
          className="animate-lifeline-flow"
          strokeDasharray="100 100"
        />
        <defs>
          <linearGradient id="lifeline-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c81e1e" stopOpacity="0" />
            <stop offset="50%" stopColor="#c81e1e" stopOpacity="1" />
            <stop offset="100%" stopColor="#c81e1e" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        className="absolute top-0 right-[5%] h-full w-2 opacity-20"
        preserveAspectRatio="none"
      >
        <path
          d="M 4 0 Q 0 200 4 400 T 4 800 T 4 1200 T 4 1600 T 4 2000 T 4 2400"
          stroke="url(#lifeline-grad)"
          strokeWidth="2"
          fill="none"
          className="animate-lifeline-flow-reverse"
          strokeDasharray="150 150"
        />
      </svg>
    </div>
  );
};

export default LivingBackground;
