import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

// --- UTILITY: SCROLL REVEAL COMPONENT ---
const FadeInSection = ({ children, className = '', delay = 0 }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(domRef.current);
          }
        });
      },
      { rootMargin: '0px 0px -50px 0px', threshold: 0.1 }
    );

    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- SYSTEM: LIVING BACKGROUND & PARTICLES ---
const LivingBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#fafafa]">
      {/* Liquid Flow Blobs */}
      <div className="animate-blob absolute top-[-10%] left-[-10%] h-[50vw] w-[50vw] rounded-full bg-rose-100/40 mix-blend-multiply blur-[100px]"></div>
      <div className="animate-blob animation-delay-2000 absolute top-[20%] right-[-10%] h-[40vw] w-[40vw] rounded-full bg-red-100/30 mix-blend-multiply blur-[120px]"></div>
      <div className="animate-blob animation-delay-4000 absolute bottom-[-20%] left-[20%] h-[60vw] w-[60vw] rounded-full bg-pink-100/30 mix-blend-multiply blur-[150px]"></div>

      {/* Floating Life Particles */}
      {[...Array(30)].map((_, i) => (
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

// --- INTERACTIVE STORY CARD ---
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

// --- MAIN HOME COMPONENT ---
const Home = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#fafafa] font-sans text-gray-900 selection:bg-red-200 selection:text-red-900">
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
            <div className="animate-float-1 mb-6 inline-flex items-center gap-2 rounded-full border border-red-100 bg-white/60 px-4 py-1.5 text-xs font-bold tracking-widest text-[#c81e1e] uppercase shadow-sm backdrop-blur-md">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#c81e1e]"></span>
              Living Network Active
            </div>
          </FadeInSection>

          <FadeInSection delay={200}>
            <h1 className="mb-6 text-5xl leading-[1.05] font-extrabold tracking-tight text-gray-900 drop-shadow-sm md:text-6xl lg:text-[4.5rem]">
              Every Second <br />
              Counts. <br />
              <span className="animate-pulse bg-gradient-to-r from-[#c81e1e] via-[#e11d48] to-[#be123c] bg-clip-text text-transparent">
                Every Drop <br className="hidden md:block" /> Matters.
              </span>
            </h1>
          </FadeInSection>

          <FadeInSection delay={300}>
            <p className="mb-10 max-w-md text-lg leading-relaxed font-medium text-gray-600 md:text-xl">
              VitalPulse connects urgent blood needs with volunteer donors in
              real-time. We've optimized the flow between life and emergency.
            </p>
          </FadeInSection>

          <FadeInSection delay={400}>
            <div className="relative mb-12 flex flex-wrap items-center gap-4">
              {/* Energy line connecting buttons */}
              <div className="absolute top-1/2 left-0 -z-10 h-px w-full bg-gradient-to-r from-red-200 via-red-400 to-transparent opacity-50 blur-[2px]"></div>

              <Link
                to="/registration"
                className="group relative overflow-hidden rounded-xl border border-red-500/50 bg-gradient-to-b from-[#dc2626] to-[#b91c1c] px-8 py-4 text-center font-bold text-white shadow-[0_8px_20px_rgb(220,38,38,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_15px_30px_rgb(220,38,38,0.5)]"
              >
                <div className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 ease-out group-hover:translate-y-0"></div>
                <span className="relative z-10 flex items-center gap-2">
                  Become a Donor
                  {/* FIXED: Added viewBox="0 0 24 24", set width/height to 20, 
        adjusted strokeWidth to 2.5, and added overflow-visible 
      */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-realistic-heartbeat overflow-visible"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </span>
              </Link>
              <Link
                to="/donor"
                className="rounded-xl border border-red-100 bg-white/80 px-8 py-4 text-center font-bold text-[#c81e1e] backdrop-blur-md transition-all hover:-translate-y-1 hover:border-red-300 hover:bg-white hover:shadow-lg hover:shadow-red-100/50"
              >
                Find Blood
              </Link>
            </div>
          </FadeInSection>

          <FadeInSection delay={500}>
            <div className="animate-float-2 group flex max-w-fit items-center gap-4 rounded-2xl border border-gray-100 bg-white/60 p-4 shadow-sm backdrop-blur-xl transition-colors hover:bg-white">
              <div className="flex -space-x-3">
                <div className="z-30 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-blue-100 shadow-sm">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                    alt="avatar"
                  />
                </div>
                <div className="z-20 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-green-100 shadow-sm">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sam"
                    alt="avatar"
                  />
                </div>
                <div className="z-10 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-amber-100 shadow-sm">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan"
                    alt="avatar"
                  />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600">
                Joined by{' '}
                <span className="inline-block text-base font-extrabold text-[#c81e1e] transition-transform group-hover:scale-110">
                  12,000+
                </span>
                <br />
                active donors this month
              </p>
            </div>
          </FadeInSection>
        </div>

        {/* Right Animation - The Living Heart & ECG */}
        <FadeInSection
          delay={200}
          className="relative order-1 flex aspect-square max-h-[500px] w-full items-center justify-center lg:order-2"
        >
          <div className="group absolute inset-0 flex items-center justify-center overflow-hidden rounded-[3rem] border border-white/60 bg-white/40 shadow-2xl backdrop-blur-3xl">
            {/* Interactive Grid Background */}
            <svg
              className="absolute inset-0 h-full w-full opacity-[0.03] transition-opacity duration-1000 group-hover:opacity-[0.06]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="#c81e1e"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            <svg
              viewBox="0 0 800 400"
              className="relative z-10 h-[150%] w-[150%] drop-shadow-2xl md:h-[120%] md:w-[120%]"
            >
              <defs>
                <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#c81e1e" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#c81e1e" stopOpacity="0" />
                </radialGradient>
                <filter id="shadow">
                  <feDropShadow
                    dx="0"
                    dy="20"
                    stdDeviation="25"
                    floodColor="#c81e1e"
                    floodOpacity="0.3"
                  />
                </filter>
              </defs>

              <circle
                cx="400"
                cy="200"
                r="130"
                fill="white"
                filter="url(#shadow)"
                className="animate-realistic-heartbeat"
              />
              <circle
                cx="400"
                cy="200"
                r="160"
                fill="url(#glow)"
                className="animate-realistic-heartbeat"
              />

              {/* Dynamic Connecting Lines (Veins) */}
              <path
                d="M 400 200 Q 200 50 0 100"
                stroke="url(#glow)"
                strokeWidth="2"
                fill="none"
                className="animate-lifeline-flow opacity-50"
                strokeDasharray="50 50"
              />
              <path
                d="M 400 200 Q 600 350 800 300"
                stroke="url(#glow)"
                strokeWidth="2"
                fill="none"
                className="animate-lifeline-flow opacity-50"
                strokeDasharray="50 50"
              />

              {/* Abstract Heart Shape */}
              <path
                d="M 400 160 C 370 115, 305 130, 305 195 C 305 260, 400 315, 400 315 C 400 315, 495 260, 495 195 C 495 130, 430 115, 400 160 Z"
                fill="url(#glow)"
                stroke="#c81e1e"
                strokeWidth="4"
                className="animate-realistic-heartbeat drop-shadow-lg"
              />

              {/* Ultra-Wide Futuristic ECG Line spanning screen */}
              <path
                d="M -100 200 L 250 200 L 280 100 L 320 340 L 360 60 L 400 260 L 430 200 L 900 200"
                stroke="#dc2626"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-ecg"
                style={{ filter: 'drop-shadow(0 0 12px rgba(220,38,38,0.8))' }}
              />
            </svg>
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
          <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 drop-shadow-sm md:text-5xl">
            The Flow of Life
          </h2>
          <p className="mx-auto mb-16 max-w-xl text-lg font-medium text-gray-600">
            Watch how a single pulse turns hours of waiting into minutes of
            action. Our system is alive and routing energy where it's needed
            most.
          </p>
        </FadeInSection>

        <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1 */}
          <FadeInSection delay={100}>
            <div className="group relative overflow-hidden rounded-[2rem] border border-white bg-white/70 p-8 text-left shadow-lg backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-100">
              <div className="absolute top-0 left-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-red-100 to-[#c81e1e] transition-transform duration-500 group-hover:scale-x-100"></div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#c81e1e] shadow-inner transition-colors duration-300 group-hover:bg-[#c81e1e] group-hover:text-white">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  className="group-hover:animate-realistic-heartbeat"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  ></path>
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-extrabold text-gray-900">
                Urgent Signal
              </h3>
              <p className="text-sm leading-relaxed font-medium text-gray-600">
                Hospitals initiate a pulse specifying blood type and exact
                medical urgency.
              </p>
            </div>
          </FadeInSection>

          {/* Card 2 */}
          <FadeInSection delay={200}>
            <div className="group relative overflow-hidden rounded-[2rem] border border-white bg-white/70 p-8 text-left shadow-lg backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-100">
              <div className="absolute top-0 left-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-blue-100 to-blue-600 transition-transform duration-500 group-hover:scale-x-100"></div>
              <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-inner transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                <span className="absolute inset-0 animate-ping rounded-2xl border-2 border-blue-400 opacity-0 group-hover:opacity-40"></span>
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-extrabold text-gray-900">
                Proximity Scan
              </h3>
              <p className="text-sm leading-relaxed font-medium text-gray-600">
                Our system scans the living network to locate compatible donors
                actively in the area.
              </p>
            </div>
          </FadeInSection>

          {/* Card 3 */}
          <FadeInSection delay={300}>
            <div className="group relative overflow-hidden rounded-[2rem] border border-white bg-white/70 p-8 text-left shadow-lg backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-100">
              <div className="absolute top-0 left-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-orange-100 to-orange-500 transition-transform duration-500 group-hover:scale-x-100"></div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 shadow-inner transition-colors duration-300 group-hover:bg-orange-500 group-hover:text-white">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-extrabold text-gray-900">
                Connection Made
              </h3>
              <p className="text-sm leading-relaxed font-medium text-gray-600">
                Donors view details, connect with families, and receive
                real-time map navigation.
              </p>
            </div>
          </FadeInSection>

          {/* Card 4 */}
          <FadeInSection delay={400}>
            <div className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#c81e1e] to-[#991515] p-8 text-left shadow-[0_15px_40px_rgb(200,30,30,0.3)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgb(200,30,30,0.5)]">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

              {/* Glowing Pulse behind Icon */}
              <div className="animate-realistic-heartbeat-slow absolute top-8 left-8 h-14 w-14 rounded-full bg-white/30 blur-xl group-hover:bg-white/50"></div>

              <div className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/30 bg-white/20 text-white shadow-inner backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <h3 className="relative z-10 mb-3 text-xl font-extrabold text-white">
                Energy Restored
              </h3>
              <p className="relative z-10 text-sm leading-relaxed font-medium text-red-100">
                Donation completed. Energy transfers. Lives change. The pulse
                continues stronger.
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* #ff0000 */}
      <section className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-12 lg:grid-cols-2">
        <div className="order-2 pr-0 lg:order-1 lg:pr-10">
          <FadeInSection>
            <div className="animate-float-2 mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600 shadow-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-600"></span>
              Spatial Intelligence
            </div>
            <h2 className="mb-6 text-4xl leading-[1.1] font-extrabold tracking-tight text-gray-900 drop-shadow-sm md:text-5xl">
              Precision in Every <br />
              <span className="bg-gradient-to-r from-[#c81e1e] to-[#ff4b4b] bg-clip-text text-transparent">
                Connection
              </span>
            </h2>
            <p className="mb-10 text-lg leading-relaxed font-medium text-gray-600">
              We weave a protective web across the city. When a signal is sent,
              we don't cause panic—we quietly illuminate the heroes closest to
              the scene.
            </p>
          </FadeInSection>

          <FadeInSection delay={200}>
            <div className="group relative space-y-6 overflow-hidden rounded-[2rem] border border-white bg-white/70 p-8 shadow-xl backdrop-blur-xl">
              <div className="absolute top-0 right-0 -z-10 h-32 w-32 rounded-full bg-blue-100/50 blur-3xl transition-colors duration-1000 group-hover:bg-red-100/50"></div>

              <div className="flex gap-5 transition-transform duration-300 hover:translate-x-2">
                <div className="mt-1 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-red-50 text-[#c81e1e] shadow-inner">
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">
                    Fluid Geo-Routing
                  </h4>
                  <p className="mt-1 text-base font-medium text-gray-600">
                    Real-time donor locations are mapped anonymously, creating
                    dynamic pathways to those in need.
                  </p>
                </div>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-gray-100 via-gray-200 to-transparent"></div>
              <div className="flex gap-5 transition-transform duration-300 hover:translate-x-2">
                <div className="mt-1 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-inner">
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">
                    Type Resonance
                  </h4>
                  <p className="mt-1 text-base font-medium text-gray-600">
                    Instant biological filtering ensures only perfectly matched
                    frequencies are alerted.
                  </p>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>

        {/* Highly Interactive Flow Visual */}
        <FadeInSection
          delay={300}
          className="group relative order-1 flex h-[400px] items-center justify-center overflow-hidden rounded-[3rem] border border-white bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] p-4 shadow-2xl md:h-[500px] lg:order-2"
        >
          {/* Abstract Network Lines */}
          <div className="absolute inset-0 opacity-40">
            <svg className="h-full w-full" viewBox="0 0 800 600">
              <path
                d="M 400 300 Q 500 150 700 200"
                stroke="#94a3b8"
                strokeWidth="1"
                fill="none"
                strokeDasharray="5 5"
                className="animate-lifeline-flow"
              />
              <path
                d="M 400 300 Q 300 450 100 400"
                stroke="#94a3b8"
                strokeWidth="1"
                fill="none"
                strokeDasharray="5 5"
                className="animate-lifeline-flow-reverse"
              />
              <path
                d="M 400 300 Q 200 100 150 250"
                stroke="#94a3b8"
                strokeWidth="1"
                fill="none"
                strokeDasharray="5 5"
                className="animate-lifeline-flow"
              />
            </svg>
          </div>

          <div className="relative flex h-full w-full items-center justify-center">
            {/* Center Pulse Area */}
            <div className="absolute top-1/2 left-[45%] z-20 flex items-center justify-center">
              {/* Glowing Aura */}
              <div className="animate-realistic-heartbeat absolute h-40 w-40 rounded-full bg-red-400/20 blur-2xl"></div>

              <div className="animate-radar absolute h-48 w-48 rounded-full border border-[#c81e1e] mix-blend-color-burn md:h-[22rem] md:w-[22rem]"></div>

              {/* Dynamic Popup - FIXED FOR MOBILE */}
              <div className="absolute -top-24 left-1/2 z-30 flex w-max -translate-x-1/2 items-center gap-3 rounded-2xl border border-white bg-white/90 px-4 py-2.5 shadow-xl backdrop-blur transition-transform duration-700 ease-out group-hover:-translate-y-3 md:-top-20 md:left-6 md:translate-x-0 md:gap-4 md:px-5 md:py-3">
                <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-red-100 to-red-200 text-xs font-black text-[#c81e1e] shadow-inner md:h-10 md:w-10 md:text-sm">
                  <div className="absolute inset-0 animate-pulse rounded-full bg-white/50"></div>
                  <span className="relative z-10">O+</span>
                </div>
                <div>
                  <div className="mb-0.5 text-sm leading-none font-extrabold text-gray-900 md:mb-1 md:text-base">
                    Energy Match
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-[#c81e1e] md:text-xs">
                    <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[#c81e1e] md:h-2 md:w-2"></span>
                    Routing connection...
                  </div>
                </div>
              </div>

              {/* Core Node */}
              <div className="animate-realistic-heartbeat relative z-20 h-8 w-8 rounded-full border-2 border-white bg-gradient-to-tr from-[#991515] to-[#ef4444] shadow-[0_0_20px_rgba(200,30,30,0.6)]">
                <div className="absolute inset-0 animate-ping rounded-full bg-white opacity-50"></div>
              </div>
            </div>

            {/* Surrounding Nodes (Donors) */}
            <div className="animate-float-1 absolute top-[30%] left-[25%] z-10 h-4 w-4 rounded-full border-2 border-white bg-[#c81e1e] shadow-[0_0_10px_rgba(200,30,30,0.5)]"></div>
            <div className="animate-float-2 absolute bottom-[20%] left-[35%] z-10 h-5 w-5 rounded-full border-2 border-white bg-[#c81e1e] shadow-[0_0_10px_rgba(200,30,30,0.5)]"></div>
            <div className="animate-float-3 absolute top-[40%] right-[20%] z-10 h-4 w-4 rounded-full border-2 border-white bg-[#c81e1e] shadow-[0_0_10px_rgba(200,30,30,0.5)]"></div>
          </div>
        </FadeInSection>
      </section>
      {/* #ff0000 */}

      {/* 4. HUMAN STORIES (Crazy Interactive 3D Cards) */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <div className="pointer-events-none absolute top-1/2 left-0 -z-10 h-[400px] w-full -skew-y-3 bg-gradient-to-r from-red-50/0 via-red-50/50 to-red-50/0 blur-xl"></div>

        <FadeInSection>
          <div className="relative z-10 mb-16 flex flex-col items-start justify-between md:flex-row md:items-end">
            <div>
              <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 drop-shadow-sm md:text-5xl">
                Echoes of Life
              </h2>
              <p className="text-xl font-medium text-gray-600">
                Real people. Real energy. Real survival.
              </p>
            </div>
            <div className="mt-6 hidden gap-4 md:mt-0 md:flex">
              {/* Decorative Orbital Element */}
              <div
                className="relative flex h-14 w-14 animate-spin items-center justify-center rounded-full border border-red-200"
                style={{ animationDuration: '8s' }}
              >
                <div
                  className="absolute inset-2 animate-spin rounded-full border border-blue-200"
                  style={{
                    animationDuration: '12s',
                    animationDirection: 'reverse',
                  }}
                ></div>
                <div className="absolute top-0 h-2.5 w-2.5 rounded-full bg-[#c81e1e] shadow-[0_0_10px_rgba(200,30,30,0.5)]"></div>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* 3D Interactive Masonry/Grid */}
        <div className="perspective-1000 relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <FadeInSection delay={100} className="h-[350px]">
            <StoryCard
              quote="I received a signal while getting coffee. Within 20 minutes, I was at the center. Knowing my energy helped sustain a life before noon is indescribable."
              name="Marcus Chen"
              role="O- Energy Provider"
              isMetric={false}
            />
          </FadeInSection>

          <FadeInSection delay={200} className="h-[350px] lg:-translate-y-8">
            <StoryCard
              isMetric={true}
              metricValue="20m"
              metricLabel="Average pulse-to-arrival time in critical emergency events last year."
            />
          </FadeInSection>

          <FadeInSection delay={300} className="h-[350px]">
            <StoryCard
              quote="The network made it seamless. I didn't have to panic. VitalPulse routed a match for my father in minutes. It felt like the city itself answered."
              name="Sarah J."
              role="Recipient Family"
              isMetric={false}
            />
          </FadeInSection>
        </div>
      </section>

      {/* 5. CRAZY CTA SECTION - THE BEATING HEART */}
      <section className="relative z-10 mx-auto mb-20 max-w-7xl px-6 py-20">
        <FadeInSection>
          <div className="group relative flex min-h-[550px] flex-col items-center justify-center overflow-hidden rounded-[3rem] border border-red-400/50 bg-gradient-to-br from-[#c81e1e] to-[#800f0f] p-10 text-center text-white shadow-[0_30px_60px_rgb(200,30,30,0.4)] md:p-20">
            {/* Deep Ambient Glow */}
            <div className="pointer-events-none absolute inset-0 bg-black/10 mix-blend-overlay"></div>

            {/* Massive Glowing Orb Behind Content */}
            <div className="animate-realistic-heartbeat-slow pointer-events-none absolute h-[80vw] max-h-[800px] w-[80vw] max-w-[800px] rounded-full bg-red-500/30 mix-blend-screen blur-[100px]"></div>

            {/* Flowing Energy Lines Background */}
            <div className="pointer-events-none absolute inset-0 opacity-30">
              <svg className="h-full w-full" preserveAspectRatio="none">
                <path
                  d="M 0 500 Q 300 200 600 400 T 1200 300"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                  className="animate-lifeline-flow"
                  strokeDasharray="50 50"
                />
                <path
                  d="M 0 100 Q 400 300 800 100 T 1200 400"
                  stroke="white"
                  strokeWidth="1"
                  fill="none"
                  className="animate-lifeline-flow-reverse"
                  strokeDasharray="30 30"
                />
              </svg>
            </div>

            {/* Upward Floating Light Cells */}
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="pointer-events-none absolute h-2 w-2 rounded-full bg-white/60 blur-[2px]"
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: `-10%`,
                  animation: `particle-drift ${5 + Math.random() * 5}s linear infinite ${Math.random() * 3}s`,
                }}
              ></div>
            ))}

            <div className="relative z-20 flex max-w-3xl flex-col items-center">
              {/* Beating Core Icon */}
              <div className="animate-realistic-heartbeat mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-white/30 bg-white/10 shadow-[0_0_40px_rgba(255,255,255,0.2)] backdrop-blur-xl">
                <svg width="48" height="48" fill="white" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>

              <h2 className="mb-8 text-5xl leading-[1.05] font-black tracking-tighter drop-shadow-2xl md:text-6xl lg:text-[5rem]">
                You could be the <br className="hidden md:block" /> reason
                someone <br /> survives today.
              </h2>
              <p className="mb-12 max-w-2xl text-xl leading-relaxed font-medium text-red-100 drop-shadow-md md:text-2xl">
                Every drop donated is a heartbeat continued. Join our living
                network of heroes and make an impact that pulses forever.
              </p>

              <div className="relative z-30 flex w-full flex-wrap justify-center gap-6">
                <Link
                  to="/donate"
                  className="flex items-center gap-3 rounded-2xl bg-white px-12 py-5 text-center text-xl font-extrabold text-[#c81e1e] shadow-[0_10px_30px_rgba(0,0,0,0.3)] ring-4 ring-white/20 transition-all duration-300 hover:scale-105 hover:bg-red-50 hover:shadow-[0_20px_50px_rgba(255,255,255,0.4)]"
                >
                  Pulse Life Now
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* 6. BEAUTIFUL FOOTER */}
      <footer className="relative z-10 overflow-hidden border-t border-gray-200 bg-white/80 pt-16 pb-8 backdrop-blur-xl">
        {/* Animated Energy Flow Border */}
        <div className="absolute top-0 left-0 h-1 w-full">
          <div className="animate-lifeline-flow h-full w-[200%] bg-gradient-to-r from-transparent via-[#c81e1e] to-transparent"></div>
        </div>

        <div className="mx-auto max-w-7xl px-6 text-center">
          <Link to="/" className="group mb-8 inline-flex items-center gap-2">
            <div className="rounded-xl bg-red-50 p-2 text-[#c81e1e] shadow-sm transition-all duration-300 group-hover:bg-[#c81e1e] group-hover:text-white">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <span className="text-2xl font-black tracking-tight text-gray-900">
              VitalPulse
            </span>
          </Link>

          <p className="mx-auto mb-10 max-w-md text-lg font-medium text-gray-500">
            Connecting life and emergency through real-time living networks,
            making every pulse matter.
          </p>

          <div className="mb-12 flex justify-center gap-6">
            <a
              href="mailto:nasiryousuf200511@gmail.com"
              className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:bg-red-50 hover:text-[#c81e1e] hover:shadow-lg"
              title="Contact via Gmail"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/nasir-yousuf200511/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 hover:shadow-lg"
              title="Connect on LinkedIn"
            >
              <svg
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>

          <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

          <p className="font-medium tracking-wide text-gray-400">
            © {new Date().getFullYear()} VitalPulse by{' '}
            <span className="font-bold text-gray-600">Nasir Yousuf</span>. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
