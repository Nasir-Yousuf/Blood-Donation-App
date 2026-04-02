import React, { useState } from 'react';

// ==========================================
// 1. MOCK API DATA (Cleaned up)
// ==========================================
// Notice how buttonTheme and buttonText are removed.
// We now rely purely on the "urgency" data field.
const MOCK_REQUESTS = [
  {
    id: 1,
    urgency: 'CRITICAL',
    urgencyColor: 'red',
    timeAgo: '10 mins ago',
    patientName: 'Sarah Mitchell',
    location: 'City Central Hospital',
    description:
      'Urgent requirement for rare O-Negative blood for an emergency surgery following a road accident. Immediate donors within the city are requested to proceed to the main trauma wing.',
    bloodType: 'O-',
    typeLabel: 'NEGATIVE',
    isSpecial: false,
  },
  {
    id: 2,
    urgency: 'HIGH PRIORITY',
    urgencyColor: 'orange',
    timeAgo: '45 mins ago',
    patientName: 'Robert Henderson',
    location: 'St. Jude Medical Center',
    description:
      'Scheduled chemotherapy session requires A+ platelets. Patient is currently stable but needs a transfusion within the next 4 hours to maintain vitals.',
    bloodType: 'A+',
    typeLabel: 'POSITIVE',
    isSpecial: false,
  },
  {
    id: 3,
    urgency: 'MEDIUM',
    urgencyColor: 'blue',
    timeAgo: '2 hours ago',
    patientName: 'Elena Rodriguez',
    location: "City Children's Medical Center",
    description:
      'Routine transfusion therapy for hereditary anemia management. Donors with multiple previous successful donations preferred for consistency in vitals.',
    bloodType: 'A+',
    typeLabel: 'POSITIVE',
    isSpecial: false,
  },
  {
    id: 4,
    isSpecial: true,
    urgency: 'SPECIAL CASE',
    timeAgo: 'Urgent Appeal',
    title: 'Rare Antibody Requirement',
    description:
      'A specific AB- rare phenotype is required for a neonatal transfusion. If you match this rare profile, please contact our clinical director immediately.',
    hotline: '+1 (555) VITAL-01',
  },
];

const BLOOD_GROUPS = ['A+', 'O-', 'B+', 'AB-', 'A-', 'O+', 'B-', 'AB+'];

// ==========================================
// 2. LAYOUT COMPONENTS
// ==========================================

const MobileHeader = () => (
  <div className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-100 bg-white px-4 py-4 lg:hidden">
    <div className="flex items-center gap-3">
      <img
        src="https://i.pravatar.cc/150?img=32"
        alt="User"
        className="h-10 w-10 rounded-full border border-gray-200"
      />
      <h1 className="text-xl font-extrabold text-[#D32F2F]">
        Clinical Vitality
      </h1>
    </div>
    <button className="text-gray-500 hover:text-gray-900">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6"
      >
        <path
          fillRule="evenodd"
          d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  </div>
);

const MobileFilters = () => (
  <div className="scrollbar-hide flex gap-2 overflow-x-auto bg-[#F9FAFB] px-4 py-4 lg:hidden">
    <button className="flex shrink-0 items-center gap-2 rounded-full bg-[#D32F2F] px-5 py-2 text-sm font-bold text-white shadow-sm">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-4 w-4"
      >
        <path
          fillRule="evenodd"
          d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
          clipRule="evenodd"
        />
      </svg>
      All Types
    </button>
    {['A+', 'O-', 'B+'].map((type) => (
      <button
        key={type}
        className="shrink-0 rounded-full border border-gray-200 bg-white px-6 py-2 text-sm font-bold text-gray-700"
      >
        {type}
      </button>
    ))}
  </div>
);

const DesktopSidebar = () => {
  const [activeGroup, setActiveGroup] = useState('O-');

  return (
    <div className="sticky top-10 hidden h-max w-[280px] shrink-0 flex-col gap-8 lg:flex">
      <h2 className="text-xl font-extrabold text-gray-800">Refine Requests</h2>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search hospital or patient..."
          className="w-full rounded-xl border-none bg-[#F4F4F5] py-3 pr-10 pl-4 text-sm focus:ring-2 focus:ring-red-200"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400"
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Blood Group Grid */}
      <div>
        <h3 className="mb-3 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
          Blood Group
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {BLOOD_GROUPS.map((bg) => (
            <button
              key={bg}
              onClick={() => setActiveGroup(bg)}
              className={`rounded-lg py-2 text-sm font-bold transition-colors ${activeGroup === bg ? 'bg-[#D32F2F] text-white shadow-md shadow-red-500/30' : 'bg-[#F4F4F5] text-gray-600 hover:bg-gray-200'}`}
            >
              {bg}
            </button>
          ))}
        </div>
      </div>

      {/* Urgency Checkboxes */}
      <div>
        <h3 className="mb-3 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
          Urgency Level
        </h3>
        <div className="space-y-3">
          {['Critical (Immediate)', 'High Priority', 'Routine Maintenance'].map(
            (level, idx) => (
              <label
                key={idx}
                className="flex cursor-pointer items-center gap-3"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-[#D32F2F] focus:ring-[#D32F2F]"
                />
                <span className="text-sm font-medium text-gray-700">
                  {level}
                </span>
              </label>
            )
          )}
        </div>
      </div>

      {/* Info Widget */}
      <div className="rounded-2xl border border-teal-100 bg-[#E0F2F1] p-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mb-2 h-6 w-6 text-[#006064]"
        >
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
        <h4 className="mb-1 text-sm font-bold text-[#006064]">Did you know?</h4>
        <p className="text-xs leading-relaxed text-[#006064]/80">
          One donation can save up to three lives. Your O- blood is currently in
          critical demand nationwide.
        </p>
      </div>
    </div>
  );
};

// ==========================================
// 3. CARD COMPONENTS (With Dynamic UI Logic)
// ==========================================

const RequestCard = ({ req }) => {
  // 1. Dynamic Button Logic based on Urgency
  const getButtonConfig = (urgency) => {
    switch (urgency.toUpperCase()) {
      case 'CRITICAL':
        return { theme: 'red', text: 'Help Now' };
      case 'HIGH PRIORITY':
      case 'HIGH':
        return { theme: 'gray', text: 'Donate', icon: true };
      case 'MEDIUM':
      case 'STANDARD':
      default:
        return { theme: 'red', text: 'Donate Now' };
    }
  };

  const buttonConfig = getButtonConfig(req.urgency);

  // 2. Visual Theme Mapping
  const borderColors = {
    red: 'border-l-[#D32F2F]',
    orange: 'border-l-orange-400',
    blue: 'border-l-[#0284C7]',
  };
  const badgeColors = {
    red: 'bg-red-100 text-[#D32F2F]',
    orange: 'bg-orange-100 text-orange-800',
    blue: 'bg-blue-100 text-[#0284C7]',
  };

  return (
    <div
      className={`flex flex-col justify-between rounded-2xl border border-l-[6px] border-gray-50 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] md:p-6 ${borderColors[req.urgencyColor] || 'border-l-gray-300'}`}
    >
      {/* Top Row: Badge & Time */}
      <div className="mb-4 flex items-start justify-between">
        <span
          className={`rounded-md px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase md:text-xs ${badgeColors[req.urgencyColor] || 'bg-gray-100'}`}
        >
          {req.urgency === 'CRITICAL' && <span className="mr-1">☼</span>}
          {req.urgency}
        </span>
        <span className="text-xs font-medium text-gray-400">{req.timeAgo}</span>
      </div>

      {/* Middle Row: Blood Box & Patient Info */}
      <div className="mb-4 flex items-center gap-4">
        <div
          className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl md:h-16 md:w-16 ${req.urgencyColor === 'red' ? 'bg-[#D32F2F] text-white shadow-md' : 'bg-[#F4F4F5] text-gray-800'}`}
        >
          <span className="text-xl leading-none font-extrabold md:text-2xl">
            {req.bloodType}
          </span>
          {req.typeLabel && (
            <span className="mt-0.5 text-[7px] font-bold tracking-widest md:text-[8px]">
              {req.typeLabel}
            </span>
          )}
        </div>

        <div>
          <h3 className="text-lg leading-tight font-bold text-gray-900 md:text-xl">
            {req.patientName}
          </h3>
          <p className="mt-1 flex items-center gap-1 text-xs text-gray-500 md:text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-3.5 w-3.5"
            >
              <path
                fillRule="evenodd"
                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            {req.location}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="mb-6 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600 md:line-clamp-none">
        {req.description}
      </p>

      {/* Dynamic Button Rendering */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
        {buttonConfig.theme === 'red' ? (
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D32F2F] py-3.5 text-sm font-bold text-white shadow-lg shadow-red-900/20 transition-colors hover:bg-red-800">
            {buttonConfig.text}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        ) : (
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-200 py-3.5 text-sm font-bold text-gray-800 transition-colors hover:bg-gray-300">
            {buttonConfig.text}
            {buttonConfig.icon && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                <path
                  fillRule="evenodd"
                  d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

// ... SpecialRequestCard and Main component remain identical
// but SpecialRequestCard also derives its button inside the component.

const SpecialRequestCard = ({ req }) => (
  <div className="flex flex-col justify-between rounded-2xl bg-[#231F20] p-6 shadow-2xl md:p-8">
    <div>
      <div className="mb-6 flex items-start justify-between">
        <span className="rounded-md bg-[#D32F2F] px-3 py-1.5 text-[10px] font-bold tracking-wider text-white uppercase md:text-xs">
          {req.urgency}
        </span>
        <span className="text-xs font-medium text-gray-400 italic">
          {req.timeAgo}
        </span>
      </div>

      <h3 className="mb-4 text-2xl leading-tight font-bold text-white">
        {req.title}
      </h3>
      <p className="mb-8 text-sm leading-relaxed text-gray-300">
        {req.description}
      </p>
    </div>

    <div>
      <div className="mb-4 flex items-center gap-3 rounded-xl border border-gray-700 bg-[#332F30] px-4 py-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5 text-white"
        >
          <path d="M10.5 18.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" />
          <path
            fillRule="evenodd"
            d="M8.625.75A3.375 3.375 0 005.25 4.125v15.75a3.375 3.375 0 003.375 3.375h6.75a3.375 3.375 0 003.375-3.375V4.125A3.375 3.375 0 0015.375.75h-6.75zM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 017.5 19.875V4.125z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-sm font-medium text-white">
          Emergency Hotline: {req.hotline}
        </span>
      </div>
      <button className="w-full rounded-xl bg-white py-3.5 text-sm font-extrabold tracking-widest text-[#D32F2F] transition-colors hover:bg-gray-100">
        {/* Derive special button text here */}
        INQUIRE NOW
      </button>
    </div>
  </div>
);

// ==========================================
// 4. PARENT PAGE COMPONENT
// ==========================================
export default function DonateNow() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-10 font-sans">
      <MobileHeader />
      <MobileFilters />

      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8 lg:py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          <DesktopSidebar />

          <div className="flex-1">
            <div className="mb-8 hidden items-baseline justify-between lg:flex">
              <h1 className="text-4xl font-extrabold text-gray-900">
                Urgent Donation Requests
              </h1>
              <p className="text-sm font-medium text-gray-500">
                Showing 12 active requests in your area
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              {MOCK_REQUESTS.map((req) =>
                req.isSpecial ? (
                  <SpecialRequestCard key={req.id} req={req} />
                ) : (
                  <RequestCard key={req.id} req={req} />
                )
              )}
            </div>

            <div className="mt-8 flex justify-center">
              <button className="flex items-center gap-2 rounded-full bg-gray-200 px-6 py-3 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-300">
                Load More Requests
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
