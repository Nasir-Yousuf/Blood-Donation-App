import React, { useState, useEffect } from 'react';
import axios from 'axios';

// ==========================================
// 1. STATIC DATA & HELPERS
// ==========================================
const MOCK_BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

// Helper to format blood type for the small badge (e.g., "A+" -> "A POS")
const formatGroupLabel = (bloodType) => {
  if (!bloodType) return '';
  return bloodType.replace('+', ' POS').replace('-', ' NEG');
};

// ==========================================
// 2. SUB-COMPONENTS
// ==========================================
const Header = () => (
  <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
        <span className="md:hidden">Find Donors</span>
        <span className="hidden md:block">Find Life-Saving Donors</span>
      </h1>
      <p className="mt-1 hidden text-sm text-gray-500 md:block">
        Browse available donors in your vicinity and connect instantly.
      </p>
    </div>

    {/* View Toggle */}
    <div className="flex w-max items-center self-end rounded-xl bg-gray-100 p-1 shadow-sm md:self-auto">
      <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-1.5 text-sm font-bold text-red-700 shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
        <span className="hidden md:inline">List View</span>
        <span className="md:hidden">List</span>
      </button>
      <button className="flex items-center gap-2 rounded-lg px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
        <span className="hidden md:inline">Map View</span>
        <span className="md:hidden">Map</span>
      </button>
    </div>
  </div>
);

const MobileFilters = () => (
  <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-4 lg:hidden">
    <div className="flex shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-gray-100 px-4 py-2">
      <span className="text-xs font-bold text-gray-500">GROUP</span>
      <span className="text-sm font-bold text-red-700">O Positive</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-red-700"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </div>
    <div className="flex shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-gray-100 px-4 py-2">
      <span className="text-xs font-bold text-gray-500">LOCATION</span>
      <span className="text-sm font-bold text-gray-800">Local Area</span>
    </div>
  </div>
);

const DesktopSidebar = () => {
  const [activeGroup, setActiveGroup] = useState('A+');

  return (
    <div className="hidden w-[300px] shrink-0 flex-col gap-6 lg:flex">
      <div className="rounded-[20px] border border-gray-100 bg-[#F8F9FA] p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <h2 className="font-bold text-gray-900">Search Filters</h2>
        </div>

        <div className="mb-6">
          <p className="mb-3 text-xs font-bold tracking-wider text-gray-500 uppercase">
            Blood Group
          </p>
          <div className="grid grid-cols-4 gap-2">
            {MOCK_BLOOD_GROUPS.map((bg) => (
              <button
                key={bg}
                onClick={() => setActiveGroup(bg)}
                className={`rounded-lg border py-2 text-sm font-bold ${activeGroup === bg ? 'border-red-700 bg-red-700 text-white' : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                {bg}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="mb-3 text-xs font-bold tracking-wider text-gray-500 uppercase">
            Location
          </p>
          <div className="relative">
            <div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="City or Postal Code"
              className="w-full rounded-lg border border-gray-200 py-2.5 pr-3 pl-9 text-sm focus:border-red-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="mb-8">
          <p className="mb-3 text-xs font-bold tracking-wider text-gray-500 uppercase">
            Availability
          </p>
          <label className="mb-2 flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 rounded text-red-600 accent-red-700 focus:ring-red-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Available Now
            </span>
          </label>
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              className="h-4 w-4 rounded text-red-600 accent-red-700 focus:ring-red-500"
            />
            <span className="text-sm font-medium text-gray-700">
              On Standby
            </span>
          </label>
        </div>

        <button className="w-full rounded-xl bg-red-700 py-3 font-bold text-white transition-colors hover:bg-red-800">
          Apply Filters
        </button>
      </div>

      <div className="rounded-[20px] bg-[#007A99] p-6 text-white">
        <h3 className="mb-2 text-lg font-bold">Emergency?</h3>
        <p className="mb-5 text-sm leading-relaxed text-blue-100">
          Contact our 24/7 rapid response unit for urgent blood requirements.
        </p>
        <button className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-[#007A99] shadow-sm hover:bg-gray-50">
          Call Hotline
        </button>
      </div>
    </div>
  );
};

const DonorCard = ({ donor }) => (
  <div className="flex flex-col justify-between rounded-2xl border border-gray-50 bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)] md:p-5">
    <div className="flex gap-4">
      <div className="relative shrink-0">
        <img
          src={donor.avatar}
          alt={donor.name}
          className="h-14 w-14 rounded-full bg-gray-100 object-cover md:h-16 md:w-16"
        />
        {donor.isOnline && (
          <span className="absolute right-0 bottom-0 h-4 w-4 rounded-full border-2 border-white bg-green-500"></span>
        )}
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900 md:text-lg">
              {donor.name}
            </h3>
            <div className="mt-1 flex flex-col gap-1 text-xs text-gray-500 md:flex-row md:items-center md:gap-2 md:text-sm">
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {donor.location}
              </span>
              <span className="hidden text-gray-300 md:inline">•</span>
              <span>{donor.distance}</span>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-center justify-center rounded-xl border border-red-100 bg-red-100/60 px-2 py-1 md:px-3 md:py-2">
            <span className="text-[9px] leading-none font-bold text-red-800 uppercase md:text-[10px]">
              {donor.groupLabel}
            </span>
            <span className="text-sm leading-tight font-extrabold text-red-700 md:text-xl">
              {donor.bloodType}
            </span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2 md:mt-4">
          {donor.tags.map((tag, idx) => (
            <span
              key={idx}
              className={`rounded-md px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase md:text-xs ${
                tag.type === 'blue'
                  ? 'bg-cyan-100 text-cyan-800'
                  : tag.type === 'status-blue'
                    ? 'flex items-center gap-1 bg-cyan-100 text-cyan-800 before:h-1.5 before:w-1.5 before:rounded-full before:bg-cyan-600 before:content-[""]'
                    : tag.type === 'text'
                      ? 'bg-transparent text-gray-500 normal-case'
                      : 'bg-gray-200 text-gray-700'
              }`}
            >
              {tag.text}
            </span>
          ))}
        </div>
      </div>
    </div>

    <div className="mt-4 flex gap-3 md:mt-5">
      <button className="hidden flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 py-2.5 font-bold text-red-700 transition-colors hover:bg-red-50 md:flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        Message
      </button>
      <button className="ml-auto flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#D32F2F] py-2.5 font-bold text-white shadow-sm transition-colors hover:bg-red-800 md:w-32 md:flex-none lg:w-40">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 md:h-5 md:w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        Call
      </button>
    </div>
  </div>
);

const MobilePromoMap = () => (
  <div className="relative mt-4 flex flex-col items-center overflow-hidden rounded-3xl border border-dashed border-[#8ED5E3] bg-[#EAF7FA] p-6 text-center shadow-sm lg:hidden">
    <div className="mb-4 rounded-xl bg-white p-3 text-[#006064] shadow-sm">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
        />
      </svg>
    </div>
    <h3 className="mb-2 text-lg font-bold text-[#006064]">
      Prefer exploring by location?
    </h3>
    <p className="mb-6 max-w-[250px] text-sm text-[#006064]/80">
      Switch to map view to see donors on your current route or near hospitals.
    </p>
    <button className="w-full rounded-xl bg-[#006064] px-8 py-3 font-bold text-white shadow-lg shadow-[#006064]/20 hover:bg-[#004D40]">
      Open Visual Map
    </button>
  </div>
);

// ==========================================
// 3. MAIN PAGE LAYOUT
// ==========================================
export default function SearchDonor() {
  const [donors, setDonors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API when component mounts
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/api/v1/users/');

        // Map the API data structure to the format our UI expects
        const mappedDonors = response.data.data.users.map((user) => ({
          id: user._id,
          name: user.name,
          // Extracting coordinates for display. Longitude is index 0, Latitude is index 1 in GeoJSON
          location: `Lat: ${user.location.coordinates[1].toFixed(2)}, Lng: ${user.location.coordinates[0].toFixed(2)}`,
          distance: 'Location matched', // Placeholder since we can't calculate exact distance without a target origin
          bloodType: user.bloodType,
          groupLabel: formatGroupLabel(user.bloodType),
          isOnline: user.isAvailable,
          // Generate deterministic avatar based on their ID
          avatar: `https://i.pravatar.cc/150?u=${user._id}`,
          tags: [
            user.isAvailable
              ? { text: 'Available Now', type: 'status-blue' }
              : { text: 'Unavailable', type: 'gray' },
            { text: user.role.toUpperCase(), type: 'blue' },
          ],
        }));

        setDonors(mappedDonors);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching donors:', err);
        setError('Failed to load donors. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchDonors();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F4F5F7] pb-20 font-sans text-gray-900 md:pb-10 lg:bg-white">
      <div className="mx-auto max-w-7xl px-4 pt-6 md:px-8 md:pt-10">
        <Header />
        <MobileFilters />

        {/* Main Grid Layout */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Desktop Sidebar */}
          <DesktopSidebar />

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Results Meta Info */}
            <div className="mb-4 flex items-center justify-between text-sm font-medium text-gray-700">
              <p className="md:hidden">
                <span className="text-base font-bold text-gray-900">
                  {donors.length}
                </span>
                Compatible donors found
              </p>
              <p className="hidden text-base font-bold text-gray-900 md:block">
                Showing {donors.length} matches
              </p>

              <div className="hidden items-center gap-2 md:flex">
                <span className="text-gray-500">Sort by:</span>
                <select className="cursor-pointer bg-transparent font-bold text-gray-900 focus:outline-none">
                  <option>Closest Distance</option>
                  <option>Recently Active</option>
                  <option>Verified First</option>
                </select>
              </div>
            </div>

            {/* Handle Loading & Error States */}
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <svg
                  className="h-8 w-8 animate-spin text-[#D32F2F]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            ) : error ? (
              <div className="py-10 text-center font-bold text-red-600">
                {error}
              </div>
            ) : donors.length === 0 ? (
              <div className="py-10 text-center text-gray-500">
                No donors found in this area.
              </div>
            ) : (
              /* Donor Cards Grid */
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
                {donors.map((donor) => (
                  <DonorCard key={donor.id} donor={donor} />
                ))}
              </div>
            )}

            {/* Desktop "Load More" */}
            {!isLoading && donors.length > 0 && (
              <div className="mt-8 hidden justify-center md:flex">
                <button className="flex items-center gap-1 text-sm font-bold text-gray-600 transition-colors hover:text-gray-900">
                  Load more donors
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            )}

            <MobilePromoMap />
          </div>
        </div>
      </div>

      {/* Floating Action Button (Mobile Only) */}
      <button className="fixed right-4 bottom-6 z-50 rounded-full bg-[#C62828] p-4 text-white shadow-lg shadow-red-900/30 hover:bg-red-800 focus:outline-none lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  );
}
