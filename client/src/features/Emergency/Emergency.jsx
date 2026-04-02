import React, { useState } from 'react';

// ==========================================
// 1. PAGE HEADER COMPONENT
// ==========================================
const PageHeader = () => (
  <div className="w-full border-b border-red-50 bg-[#FFF5F5] px-4 pt-8 pb-12 md:px-8 md:pt-12 md:pb-16">
    <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
      {/* Header Text */}
      <div className="max-w-xl">
        <div className="mb-3 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 text-[#D32F2F]"
          >
            <path
              fillRule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-xs font-bold tracking-widest text-[#D32F2F] uppercase">
            Critical Action Required
          </span>
        </div>
        <h1 className="mb-3 text-3xl leading-tight font-extrabold text-gray-900 md:text-4xl">
          Post Emergency Blood Request
        </h1>
        <p className="hidden text-sm leading-relaxed text-gray-600 md:block md:text-base">
          Your request will be broadcasted immediately to our network of donors
          and nearby medical centers. Please provide accurate clinical details
          to expedite the process.
        </p>
      </div>

      {/* Red Stats Card (Adapts to be the primary warning on Mobile) */}
      <div className="relative w-full shrink-0 overflow-hidden rounded-2xl bg-[#D32F2F] p-6 text-white shadow-lg shadow-red-500/20 md:w-[280px]">
        <div className="relative z-10 text-left md:text-center">
          {/* Mobile Text */}
          <div className="md:hidden">
            <h3 className="mb-1 text-lg font-bold">CRITICAL ACTION REQUIRED</h3>
            <p className="text-sm leading-snug text-red-100">
              Submit this request to notify all compatible donors within a 15km
              radius immediately.
            </p>
          </div>
          {/* Desktop Text */}
          <div className="hidden md:block">
            <p className="mb-1 text-4xl font-extrabold">91%</p>
            <p className="text-sm leading-snug text-red-100">
              Emergency fulfillment rate within 60 minutes
            </p>
          </div>
        </div>
        {/* Decorative Background Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="absolute -right-4 -bottom-4 hidden h-24 w-24 text-white/10 md:block"
        >
          <path
            fillRule="evenodd"
            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  </div>
);

// ==========================================
// 2. CONTACT & PATIENT DETAILS COMPONENT
// ==========================================
const ContactPatientDetails = ({ formData, setFormData }) => {
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="space-y-8 rounded-3xl bg-white md:bg-[#F4F4F5] md:p-8">
      {/* Section Title (Desktop only) */}
      <div className="hidden items-center gap-3 md:flex">
        <div className="h-6 w-1.5 rounded-full bg-[#D32F2F]"></div>
        <h2 className="text-xl font-bold text-gray-900">
          Contact & Patient Details
        </h2>
      </div>

      {/* Inputs Container */}
      <div className="space-y-6">
        {/* Name & Number row */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-bold text-gray-700">
              Contact Name
            </label>
            <input
              type="text"
              placeholder="Full legal name"
              className="w-full rounded-xl border-none bg-[#F4F4F5] px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#D32F2F]/20 md:bg-white"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold text-gray-700">
              Contact Number
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="w-full rounded-xl border-none bg-[#F4F4F5] px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#D32F2F]/20 md:bg-white"
            />
          </div>
        </div>

        {/* Blood Type Grid */}
        <div className="rounded-2xl bg-[#F4F4F5] p-5 md:bg-transparent md:p-0">
          <label className="mb-3 block text-xs font-bold text-gray-700">
            Required Blood Type
          </label>
          <div className="grid grid-cols-4 gap-2.5">
            {bloodGroups.map((bg) => (
              <button
                key={bg}
                onClick={() => setFormData({ ...formData, bloodType: bg })}
                className={`rounded-xl border-2 py-3 text-sm font-bold transition-all ${
                  formData.bloodType === bg
                    ? 'border-[#D32F2F] bg-[#D32F2F] text-white shadow-md shadow-red-500/30'
                    : 'border-transparent bg-white text-gray-700 hover:border-red-200'
                }`}
              >
                {bg}
              </button>
            ))}
          </div>
        </div>

        {/* Urgency Level */}
        <div className="rounded-2xl bg-[#F4F4F5] p-5 md:bg-transparent md:p-0">
          <label className="mb-3 block text-xs font-bold text-gray-700">
            Urgency Level
          </label>
          <div className="flex flex-col gap-3 md:flex-row">
            {['Low', 'Medium', 'High'].map((level) => {
              const isActive = formData.urgency === level;
              return (
                <button
                  key={level}
                  onClick={() => setFormData({ ...formData, urgency: level })}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-2 px-4 py-3.5 transition-all ${isActive ? 'border-[#D32F2F] bg-red-50 font-bold text-[#D32F2F]' : 'border-transparent bg-white font-medium text-gray-600 hover:border-gray-200'}`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${isActive ? 'bg-[#D32F2F]' : 'bg-gray-400'}`}
                  ></span>
                  {level}{' '}
                  {level === 'High' && (
                    <span className="md:hidden">(Immediate)</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Case Details */}
        <div className="rounded-2xl bg-[#F4F4F5] p-5 md:bg-transparent md:p-0">
          <label className="mb-2 block text-xs font-bold text-gray-700">
            Case Details (Optional)
          </label>
          <textarea
            placeholder="Explain the situation for potential donors..."
            rows="4"
            className="w-full resize-none rounded-xl border-none bg-white px-4 py-3.5 text-sm shadow-sm focus:ring-2 focus:ring-[#D32F2F]/20 md:shadow-none"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. HOSPITAL LOCATION COMPONENT
// ==========================================
const HospitalLocation = () => (
  <div className="mt-6 space-y-6 rounded-3xl bg-[#F4F4F5] p-5 md:mt-8 md:p-8">
    <div className="flex items-center gap-3">
      <div className="hidden h-6 w-1.5 rounded-full bg-[#006064] md:block"></div>
      <h2 className="text-base font-bold text-gray-900 md:text-xl">
        Hospital / Medical Center Location
      </h2>
    </div>

    <div className="relative">
      <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search hospital name or address"
        className="w-full rounded-xl border-none bg-white py-4 pr-4 pl-12 text-sm shadow-sm focus:ring-2 focus:ring-[#006064]/20"
      />
    </div>

    {/* Map Placeholder */}
    <div className="relative hidden h-48 overflow-hidden rounded-2xl border border-gray-100 bg-gray-200 shadow-sm md:block md:h-64">
      {/* Fake Map Image */}
      <img
        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        alt="Map View"
        className="h-full w-full object-cover opacity-60 grayscale"
      />

      {/* Map Pin */}
      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[#D32F2F] text-white shadow-lg shadow-red-900/40">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="mt-2 rounded-md border border-gray-100 bg-white px-3 py-1.5 text-xs font-bold text-gray-800 shadow-md">
          St. Jude Memorial Hospital
        </div>
      </div>
    </div>
  </div>
);

// ==========================================
// 4. REQUEST SUMMARY & ACTION (SIDEBAR/FOOTER)
// ==========================================
const RequestSummary = () => (
  <div className="space-y-6 rounded-3xl bg-white md:border md:border-gray-100 md:bg-[#F9FAFB] md:p-8 md:shadow-sm">
    <h2 className="mb-6 hidden text-xl font-bold text-gray-900 md:block">
      Request Summary
    </h2>

    {/* Stats List (Desktop Only) */}
    <div className="mb-8 hidden flex-col gap-4 md:flex">
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <span className="text-sm text-gray-500">Priority Level</span>
        <span className="rounded-md bg-red-100 px-2 py-1 text-[10px] font-bold tracking-wide text-[#D32F2F] uppercase">
          Critical
        </span>
      </div>
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <span className="text-sm text-gray-500">Estimated Outreach</span>
        <span className="text-sm font-bold text-gray-900">~450 Donors</span>
      </div>
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <span className="text-sm text-gray-500">Broadcast Type</span>
        <span className="text-sm font-bold text-gray-900">
          System-wide Alert
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Radius</span>
        <span className="text-sm font-bold text-gray-900">15 Miles</span>
      </div>
    </div>

    {/* Warning Box */}
    <div className="flex items-start gap-3 rounded-xl border border-red-50 bg-[#FFF5F5] p-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="mt-0.5 h-5 w-5 shrink-0 text-[#D32F2F]"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
          clipRule="evenodd"
        />
      </svg>
      <p className="text-xs leading-relaxed text-gray-700">
        <span className="mb-1 block md:hidden">
          By clicking above, you confirm this is a verified medical emergency.
        </span>
        <span className="hidden md:block">
          By posting, you confirm this is a verified medical emergency.
        </span>
        Misuse of the emergency broadcast system may result in account
        restriction.
      </p>
    </div>

    {/* CTA Button */}
    <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D32F2F] py-4 text-base font-bold text-white shadow-xl shadow-red-900/20 transition-colors hover:bg-red-800">
      Post Urgent Request
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
        />
      </svg>
    </button>

    <p className="hidden text-center text-[10px] font-bold tracking-widest text-gray-400 uppercase md:block">
      Verified Request Status Pending
    </p>
  </div>
);

// ==========================================
// 5. SUPPORT CARD COMPONENT
// ==========================================
const SupportCard = () => (
  <div className="mt-6 rounded-3xl bg-[#E0F2FE] p-6 md:p-8">
    <h3 className="mb-2 text-sm font-bold text-[#0284C7] md:text-base">
      Don't have details?
    </h3>
    <p className="mb-5 text-xs leading-relaxed text-[#0369A1] md:text-sm">
      If you are at a hospital and need immediate assistance, call our 24/7
      Rapid Response team.
    </p>
    <button className="flex items-center gap-2 text-sm font-bold text-[#0284C7] hover:text-[#0369A1]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4"
      >
        <path
          fillRule="evenodd"
          d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
          clipRule="evenodd"
        />
      </svg>
      1-800-VITALITY-EMRG
    </button>
  </div>
);

// ==========================================
// PARENT COMPONENT: EMERGENCY REQUEST PAGE
// ==========================================
export default function Emergency() {
  const [formData, setFormData] = useState({
    bloodType: 'A+',
    urgency: 'High',
  });

  return (
    <div className="min-h-screen bg-white pb-10 font-sans md:bg-[#F9FAFB]">
      {/* 1. Header Area */}
      <PageHeader />

      {/* 2. Main Layout Wrapper */}
      <div className="mx-auto mt-6 max-w-6xl px-4 md:mt-12 md:px-8">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:gap-10">
          {/* Left Column (Form Content) */}
          <div className="w-full flex-1 space-y-6 md:space-y-0">
            <ContactPatientDetails
              formData={formData}
              setFormData={setFormData}
            />
            <HospitalLocation />
          </div>

          {/* Right Column (Sidebar / Footer elements) */}
          <div className="sticky top-10 flex w-full shrink-0 flex-col-reverse gap-0 md:flex-col md:gap-6 lg:w-[350px]">
            <RequestSummary />
            <SupportCard />
          </div>
        </div>
      </div>
    </div>
  );
}
