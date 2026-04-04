import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// ==========================================
// 1. MOCK DATA
// ==========================================
const STATS_DATA = [
  {
    id: 1,
    value: '1.2M',
    label: 'Lives Saved Annually',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    theme: 'white',
    valueColor: 'text-rose-600 lg:text-gray-900',
  },
  {
    id: 2,
    value: '450+',
    label: 'Partner Hospitals',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    theme: 'gray',
    valueColor: 'text-gray-900',
  },
  {
    id: 3,
    value: '8 min',
    label: 'Avg. Donation Time',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    theme: 'red',
    valueColor: 'text-white',
  },
  {
    id: 4,
    value: '85k',
    label: 'Active Donors',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    theme: 'white',
    valueColor: 'text-gray-900',
  },
];

const BENEFITS_DATA = [
  {
    id: 1,
    title: 'Heart Health',
    desc: 'Reduces blood viscosity and helps maintain healthy iron levels, lowering cardiovascular risks.',
    iconTheme: 'text-rose-600 bg-rose-100',
  },
  {
    id: 2,
    title: 'Free Checkup',
    desc: 'Every donation includes a screen of pulse, blood pressure, temperature, and hemoglobin.',
    iconTheme: 'text-blue-600 bg-blue-100',
  },
  {
    id: 3,
    title: 'Iron Balance',
    desc: 'Helps prevent conditions where the body absorbs too much iron from your daily diet.',
    iconTheme: 'text-teal-600 bg-teal-100',
  },
  {
    id: 4,
    title: 'Mental Wellbeing',
    desc: 'The "helper\'s high" triggers endorphins, reducing stress and fostering community belonging.',
    iconTheme: 'text-amber-600 bg-amber-100',
  },
];

const WISDOM_DATA = [
  {
    id: 1,
    quote:
      'And whoever saves one life—it is as if he had saved mankind entirely.',
    source: 'QURAN 5:32',
    tag: 'ISL',
    highlight: false,
  },
  {
    id: 2,
    quote:
      'Blood donation is the greatest gift of life. To save a life is the highest service.',
    source: 'HINDU PHILOSOPHY',
    tag: 'HIN',
    highlight: false,
  },
  {
    id: 3,
    quote:
      'Generosity is the most natural outward expression of an inner attitude of compassion.',
    source: 'BUDDHISM',
    tag: 'BUD',
    highlight: false,
  },
  {
    id: 4,
    quote:
      "Greater love has no one than this: to lay down one's life for one's friends.",
    source: 'CHRISTIANITY | JOHN 15:13',
    tag: 'CHR',
    highlight: true,
  },
];

// ==========================================
// 2. SECTION COMPONENTS
// ==========================================

const HeroSection = () => (
  <div className="relative flex min-h-[600px] w-full flex-col-reverse overflow-hidden bg-gradient-to-br from-rose-50 via-white to-orange-50 lg:h-[750px] lg:flex-row">
    {/* Decorative Background Elements */}
    <div className="absolute top-20 -left-20 h-64 w-64 animate-pulse rounded-full bg-rose-200 opacity-20 mix-blend-multiply blur-3xl"></div>
    <div
      className="absolute right-20 bottom-20 h-72 w-72 animate-pulse rounded-full bg-orange-200 opacity-20 mix-blend-multiply blur-3xl"
      style={{ animationDelay: '2s' }}
    ></div>

    {/* Left Side: Text Area - FIXED ALIGNMENT */}
    <div className="relative z-10 flex w-full flex-col justify-center px-6 py-16 lg:w-1/2 lg:px-12 xl:px-24">
      <div className="mx-auto w-full max-w-2xl lg:mx-0 lg:ml-auto">
        <span className="mb-6 inline-block rounded-full bg-white px-5 py-2 text-xs font-extrabold tracking-widest text-rose-600 uppercase shadow-sm ring-1 ring-rose-100">
          Every Drop Matters
        </span>

        <h1 className="mb-6 text-5xl leading-[1.1] font-extrabold tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
          Your Blood,
          <br />
          <span className="bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
            Their Future.
          </span>
        </h1>

        <p className="mb-10 max-w-lg text-base leading-relaxed text-gray-600 md:text-lg">
          Transforming the landscape of emergency medicine through the selfless
          act of giving. Join a global network of lifesavers today.
        </p>

        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <Link to="/registration" className="w-full sm:w-auto">
            <button className="w-full transform rounded-2xl bg-rose-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-rose-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-rose-700 hover:shadow-xl hover:shadow-rose-600/30 active:scale-95">
              Start Your Journey
            </button>
          </Link>
          <a
            href="https://stanfordbloodcenter.org/sbc-stories/donor-stories"
            target="_blank"
            className="w-full sm:w-auto"
          >
            <button className="w-full transform rounded-2xl border-2 border-rose-100 bg-white px-8 py-4 text-sm font-bold text-rose-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:bg-rose-50 active:scale-95 sm:w-auto">
              Watch Impact Stories
            </button>
          </a>
        </div>
      </div>
    </div>

    {/* Right Side: Image Area - FIXED IMAGE URL */}
    <div className="relative h-[400px] w-full lg:absolute lg:top-0 lg:right-0 lg:h-full lg:w-1/2">
      <div className="absolute inset-0 z-10 bg-gradient-to-l from-transparent to-rose-50/90 lg:to-white/20"></div>
      <img
        src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80"
        alt="Compassionate Medical Care"
        className="h-full w-full rounded-bl-[100px] object-cover lg:rounded-bl-[200px]"
      />
    </div>
  </div>
);

const StatsSection = () => (
  <div className="bg-white pt-16 pb-16 lg:pt-0">
    <div className="relative z-20 mx-auto max-w-[1400px] px-6 lg:-mt-24 lg:px-12">
      {/* Mobile Title */}
      <div className="mb-8 flex items-center justify-center gap-2 lg:hidden">
        <div className="h-2 w-2 rounded-full bg-rose-600"></div>
        <h2 className="text-sm font-bold tracking-widest text-rose-600 uppercase">
          The Impact in Numbers
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STATS_DATA.map((stat) => (
          <div
            key={stat.id}
            className={`group flex transform flex-col items-center justify-center rounded-[2rem] p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
              stat.theme === 'red'
                ? 'bg-gradient-to-br from-rose-600 to-rose-700 shadow-rose-900/30'
                : stat.theme === 'gray'
                  ? 'border border-gray-100 bg-gray-50'
                  : 'border border-rose-50 bg-white shadow-xl shadow-rose-100/50'
            }`}
          >
            <div className="mb-5 flex items-center justify-center">
              <div
                className={`transform rounded-2xl p-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 ${stat.theme === 'red' ? 'bg-white/20' : 'bg-rose-50'}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className={`h-8 w-8 ${stat.theme === 'red' ? 'text-white' : 'text-rose-600'}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={stat.icon}
                  />
                </svg>
              </div>
            </div>

            <h3
              className={`mb-2 text-4xl font-extrabold lg:text-5xl ${stat.valueColor}`}
            >
              {stat.value}
            </h3>
            <p
              className={`text-xs font-bold tracking-wider uppercase md:text-sm ${stat.theme === 'red' ? 'text-rose-100' : 'text-gray-500'}`}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const BenefitsSection = () => (
  <div className="bg-white py-16 lg:py-32">
    <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
      {/* FIXED: Centered Header for Cohesive Layout */}
      <div className="mb-16 text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-rose-600"></div>
          <h2 className="text-sm font-bold tracking-widest text-rose-600 uppercase">
            Donor Benefits
          </h2>
          <div className="h-2 w-2 rounded-full bg-rose-600"></div>
        </div>
        <h2 className="mb-6 text-4xl leading-tight font-extrabold tracking-tight text-gray-900 lg:text-5xl">
          Good for them.{' '}
          <span className="bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
            Great for you.
          </span>
        </h2>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
          Beyond the profound emotional reward, regular blood donation offers
          scientifically proven health advantages for your own body.
        </p>
      </div>

      {/* FIXED: 4-Column Grid to match Stats Section */}
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS_DATA.map((benefit) => (
          <div
            key={benefit.id}
            className="group flex transform flex-col items-center gap-5 rounded-[2rem] border border-gray-100 bg-white p-8 text-center shadow-lg shadow-gray-100/50 transition-all duration-300 hover:-translate-y-2 hover:border-rose-100 hover:shadow-xl hover:shadow-rose-100/50"
          >
            <div
              className={`flex h-16 w-16 transform items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${benefit.iconTheme}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">
                {benefit.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">
                {benefit.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="mt-12 flex justify-center">
        <button className="group flex transform items-center justify-center gap-2 rounded-full border-2 border-rose-100 bg-white px-8 py-3 text-sm font-bold text-rose-600 transition-all hover:bg-rose-50 hover:text-rose-800 active:scale-95">
          Read Clinical Studies
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div> */}
    </div>
  </div>
);

const HumanStoriesSection = () => (
  <div className="relative overflow-hidden bg-gray-900 py-24 lg:py-40">
    <div className="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden opacity-20">
      <div className="absolute -top-[20%] -right-[10%] h-[70vw] w-[70vw] rounded-full bg-gradient-to-br from-rose-600 to-transparent blur-[100px]"></div>
      <div className="absolute -bottom-[20%] -left-[10%] h-[50vw] w-[50vw] rounded-full bg-gradient-to-tr from-orange-600 to-transparent blur-[100px]"></div>
    </div>

    <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
      <div className="mb-16 text-center">
        <span className="mb-4 inline-block text-sm font-bold tracking-widest text-rose-500 uppercase">
          Real Impact
        </span>
        <h2 className="text-4xl font-extrabold text-white md:text-5xl lg:text-7xl">
          Human{' '}
          <span className="bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">
            Stories.
          </span>
        </h2>
      </div>

      <div className="group relative mx-auto max-w-5xl overflow-hidden rounded-[40px] bg-white/5 p-1 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-orange-500 to-rose-500 opacity-30 blur-xl transition-opacity duration-500 group-hover:opacity-60"></div>

        <div className="relative flex flex-col overflow-hidden rounded-[36px] bg-[#121212] md:flex-row">
          <div className="relative h-72 shrink-0 overflow-hidden md:h-auto md:w-5/12">
            <img
              src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Emotional Connection"
              className="h-full w-full transform object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent md:bg-gradient-to-r"></div>
            <div className="absolute bottom-6 left-6">
              <span className="rounded-xl bg-rose-600/90 px-4 py-2 text-xs font-bold tracking-wider text-white uppercase backdrop-blur-md">
                Life Saved
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center p-8 md:w-7/12 md:p-14">
            <svg
              className="mb-6 h-10 w-10 text-rose-500/40"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <h3 className="mb-6 text-2xl leading-snug font-bold text-white md:text-3xl lg:text-4xl">
              "I'll never know their names, but I think of them every time I
              play with my daughter."
            </h3>
            <p className="mb-10 text-base leading-relaxed text-gray-400">
              "After my accident, I needed three units of O-negative blood. You
              didn't just give blood; you gave me a future, and you gave my
              daughter her mother back."
            </p>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-rose-500 opacity-50 blur-md"></div>
                <img
                  src="https://i.pravatar.cc/150?img=47"
                  alt="Sarah Jenkins"
                  className="relative h-14 w-14 rounded-full border-2 border-white/10"
                />
              </div>
              <div>
                <p className="text-base font-extrabold text-white">
                  Sarah Jenkins
                </p>
                <p className="mt-1 text-xs tracking-widest text-rose-400 uppercase">
                  Grateful Recipient
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const WisdomCarouselSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerView(3);
      else if (window.innerWidth >= 768) setItemsPerView(2);
      else setItemsPerView(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, WISDOM_DATA.length - itemsPerView);
  const next = () => setActiveIndex((prev) => Math.min(prev + 1, maxIndex));
  const prev = () => setActiveIndex((prev) => Math.max(prev - 1, 0));

  return (
    <div className="bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end lg:mb-16">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 lg:text-5xl">
              Wisdom Through Ages
            </h2>
          </div>

          <div className={`flex gap-3 ${maxIndex === 0 ? 'hidden' : 'flex'}`}>
            <button
              onClick={prev}
              disabled={activeIndex === 0}
              className="flex h-12 w-12 transform items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 shadow-sm transition-all duration-200 hover:scale-110 hover:border-rose-200 hover:text-rose-600 active:scale-95 disabled:scale-100 disabled:opacity-30"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              onClick={next}
              disabled={activeIndex === maxIndex}
              className="flex h-12 w-12 transform items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 shadow-sm transition-all duration-200 hover:scale-110 hover:border-rose-200 hover:text-rose-600 active:scale-95 disabled:scale-100 disabled:opacity-30"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(calc(-${activeIndex * (100 / itemsPerView)}%))`,
            }}
          >
            {WISDOM_DATA.map((item) => (
              <div
                key={item.id}
                className="w-full shrink-0 px-3 md:w-1/2 lg:w-1/3"
              >
                <div
                  className={`flex h-full transform flex-col justify-between rounded-[32px] p-10 transition-all duration-300 hover:-translate-y-2 ${item.highlight ? 'bg-gradient-to-br from-rose-600 to-rose-800 text-white shadow-xl shadow-rose-900/20' : 'border border-gray-100 bg-gray-50 text-gray-900 hover:shadow-lg'}`}
                >
                  <p
                    className={`mb-10 text-lg leading-relaxed font-medium italic ${item.highlight ? 'text-white' : 'text-gray-600'}`}
                  >
                    "{item.quote}"
                  </p>
                  <div className="mt-auto flex items-center gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-extrabold ${item.highlight ? 'bg-white text-rose-600' : 'bg-rose-100 text-rose-600'}`}
                    >
                      {item.tag}
                    </div>
                    <span
                      className={`text-xs font-bold tracking-widest uppercase ${item.highlight ? 'text-rose-200' : 'text-gray-400'}`}
                    >
                      {item.source}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const BottomCTASection = () => (
  <div className="bg-white px-6 pb-24 lg:px-8 lg:pb-32">
    <div className="mb-16 text-center">
      <h2 className="text-4xl leading-none font-black tracking-tighter text-gray-900 md:text-6xl lg:text-[5rem]">
        You could be the reason <br className="hidden md:block" />
        <span className="animate-pulse bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
          someone survives today.
        </span>
      </h2>
    </div>

    <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[3rem] bg-gray-900 p-10 text-center shadow-2xl lg:p-24">
      {/* Dynamic Wave Pattern CSS */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, #E11D48 2px, transparent 2.5px)',
          backgroundSize: '32px 32px',
        }}
      ></div>
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-rose-600 opacity-30 blur-[100px]"></div>
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-orange-600 opacity-30 blur-[100px]"></div>

      <div className="relative z-10">
        <h3 className="mb-6 text-3xl leading-tight font-extrabold tracking-tight text-white md:text-5xl">
          Don't wait for a hero. <br /> Be one.
        </h3>
        <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-gray-300">
          Your single donation can ignite a chain of survival. Take 15 minutes
          to give a lifetime to someone else.
        </p>

        <div className="mx-auto flex max-w-md flex-col justify-center gap-4 sm:max-w-none sm:flex-row">
          <Link
            to="/registration"
            className="flex w-full transform items-center justify-center rounded-2xl bg-gradient-to-r from-rose-600 to-rose-500 px-10 py-5 text-base font-bold text-white shadow-[0_0_40px_rgba(225,29,72,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(225,29,72,0.6)] active:scale-95 sm:w-auto"
          >
            Start Your Life-Saving Journey
          </Link>
          <Link
            to="/donor"
            className="flex w-full transform items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-10 py-5 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/10 active:scale-95 sm:w-auto"
          >
            Find a Local Clinic
          </Link>
        </div>
      </div>
    </div>
  </div>
);

// ==========================================
// 3. PARENT COMPONENT
// ==========================================
export default function Impact() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-rose-200 selection:text-rose-900">
      <HeroSection />
      <StatsSection />
      <BenefitsSection />
      <HumanStoriesSection />
      <WisdomCarouselSection />
      <BottomCTASection />
    </div>
  );
}
