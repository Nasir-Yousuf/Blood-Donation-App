// import React, { useState, useEffect } from 'react';
// // Assuming your custom axios instance is in an api.js file in the same or parent folder
// // import api from './api';
// import axios from 'axios';

// // For this code block, we'll recreate your custom api instance here for clarity if you don't import it.
// const api = axios.create({
//   baseURL: 'http://127.0.0.1:3000/api/v1',
// });
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('jwt_token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// // ==========================================
// // 1. HELPERS & MATH
// // ==========================================
// const MOCK_BLOOD_GROUPS = [
//   'All',
//   'A+',
//   'A-',
//   'B+',
//   'B-',
//   'O+',
//   'O-',
//   'AB+',
//   'AB-',
// ];

// const formatGroupLabel = (bloodType) => {
//   if (!bloodType) return '';
//   return bloodType.replace('+', ' POS').replace('-', ' NEG');
// };

// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//   if (!lat1 || !lon1 || !lat2 || !lon2) return null;
//   const R = 6371;
//   const dLat = (lat2 - lat1) * (Math.PI / 180);
//   const dLon = (lon2 - lon1) * (Math.PI / 180);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(lat1 * (Math.PI / 180)) *
//       Math.cos(lat2 * (Math.PI / 180)) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return (R * c).toFixed(1);
// };

// // ==========================================
// // 2. SUB-COMPONENTS
// // ==========================================
// const Header = () => (
//   <div className="mb-6">
//     <h1 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
//       Find Life-Saving Donors
//     </h1>
//     <p className="mt-1 text-sm text-gray-500">
//       Browse available donors in your vicinity and connect instantly.
//     </p>
//   </div>
// );

// const MobileFilters = ({
//   activeGroup,
//   setActiveGroup,
//   distance,
//   setDistance,
//   onApply,
// }) => (
//   <div className="mb-6 flex flex-col gap-4 lg:hidden">
//     <div className="scrollbar-hide flex gap-3 overflow-x-auto">
//       {MOCK_BLOOD_GROUPS.map((bg) => (
//         <button
//           key={bg}
//           onClick={() => setActiveGroup(bg)}
//           className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold ${
//             activeGroup === bg
//               ? 'border-red-700 bg-red-700 text-white'
//               : 'border-gray-200 bg-gray-100 text-gray-700'
//           }`}
//         >
//           {bg === 'All' ? 'Any Blood Type' : bg}
//         </button>
//       ))}
//     </div>
//     <div className="flex items-center gap-4 px-1">
//       <span className="shrink-0 text-sm font-bold text-gray-700">
//         Within {distance} km
//       </span>
//       <input
//         type="range"
//         min="1"
//         max="100"
//         value={distance}
//         onChange={(e) => setDistance(e.target.value)}
//         className="w-full accent-red-700"
//       />
//       <button
//         onClick={onApply}
//         className="rounded-lg bg-red-700 px-4 py-2 text-sm font-bold text-white"
//       >
//         Search
//       </button>
//     </div>
//   </div>
// );

// const DesktopSidebar = ({
//   activeGroup,
//   setActiveGroup,
//   distance,
//   setDistance,
//   onApply,
// }) => {
//   return (
//     <div className="hidden w-[300px] shrink-0 flex-col gap-6 lg:flex">
//       <div className="rounded-[20px] border border-gray-100 bg-[#F8F9FA] p-6 shadow-sm">
//         <div className="mb-6 flex items-center gap-2">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5 text-gray-700"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={2}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
//             />
//           </svg>
//           <h2 className="font-bold text-gray-900">Search Filters</h2>
//         </div>

//         {/* Blood Group Filter */}
//         <div className="mb-6">
//           <p className="mb-3 text-xs font-bold tracking-wider text-gray-500 uppercase">
//             Blood Group
//           </p>
//           <div className="grid grid-cols-4 gap-2">
//             {MOCK_BLOOD_GROUPS.map((bg) => (
//               <button
//                 key={bg}
//                 onClick={() => setActiveGroup(bg)}
//                 className={`rounded-lg border py-2 text-sm font-bold ${
//                   activeGroup === bg
//                     ? 'border-red-700 bg-red-700 text-white'
//                     : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
//                 } ${bg === 'All' ? 'col-span-4' : ''}`}
//               >
//                 {bg === 'All' ? 'Any Type' : bg}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Distance Filter */}
//         <div className="mb-6">
//           <div className="mb-3 flex items-center justify-between">
//             <p className="text-xs font-bold tracking-wider text-gray-500 uppercase">
//               Max Distance
//             </p>
//             <span className="text-sm font-bold text-red-700">
//               {distance} km
//             </span>
//           </div>
//           <input
//             type="range"
//             min="1"
//             max="100"
//             step="1"
//             value={distance}
//             onChange={(e) => setDistance(e.target.value)}
//             className="w-full accent-red-700"
//           />
//           <div className="mt-2 flex justify-between text-xs text-gray-400">
//             <span>1 km</span>
//             <span>100 km</span>
//           </div>
//         </div>

//         <button
//           onClick={onApply}
//           className="w-full rounded-xl bg-red-700 py-3 font-bold text-white transition-colors hover:bg-red-800"
//         >
//           Apply Filters
//         </button>
//       </div>
//     </div>
//   );
// };

// // ==========================================
// // 3. DONOR CARD
// // ==========================================
// const DonorCard = ({ donor, userLocation }) => {
//   const cleanPhone = donor.phone?.replace(/[^0-9+]/g, '') || '';

//   let mapUrl = `http://googleusercontent.com/maps.google.com/?q=${donor.lat},${donor.lng}`;
//   if (userLocation?.lat && userLocation?.lng) {
//     mapUrl += `&saddr=${userLocation.lat},${userLocation.lng}&daddr=${donor.lat},${donor.lng}`;
//   }

//   const exactDistance = calculateDistance(
//     userLocation?.lat,
//     userLocation?.lng,
//     donor.lat,
//     donor.lng
//   );

//   return (
//     <div className="flex flex-col justify-between rounded-2xl border border-gray-50 bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)] md:p-5">
//       <div className="flex gap-4">
//         <div className="relative shrink-0">
//           <img
//             src={donor.avatar}
//             alt={donor.name}
//             className="h-14 w-14 rounded-full bg-gray-100 object-cover md:h-16 md:w-16"
//           />
//           {donor.isOnline && (
//             <span className="absolute right-0 bottom-0 h-4 w-4 rounded-full border-2 border-white bg-green-500"></span>
//           )}
//         </div>

//         <div className="flex-1">
//           <div className="flex items-start justify-between">
//             <div>
//               <h3 className="text-base font-bold text-gray-900 md:text-lg">
//                 {donor.name}
//               </h3>
//               <div className="mt-1 flex flex-col gap-1 text-xs text-gray-500 md:flex-row md:items-center md:gap-2 md:text-sm">
//                 <span className="flex items-center gap-1 font-medium">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-3.5 w-3.5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                   </svg>
//                   {exactDistance
//                     ? `${exactDistance} km away`
//                     : 'Distance unknown'}
//                 </span>
//               </div>
//             </div>

//             <div className="flex shrink-0 flex-col items-center justify-center rounded-xl border border-red-100 bg-red-100/60 px-2 py-1 md:px-3 md:py-2">
//               <span className="text-[9px] leading-none font-bold text-red-800 uppercase md:text-[10px]">
//                 {donor.groupLabel}
//               </span>
//               <span className="text-sm leading-tight font-extrabold text-red-700 md:text-xl">
//                 {donor.bloodType}
//               </span>
//             </div>
//           </div>

//           <div className="mt-3 flex flex-wrap gap-2 md:mt-4">
//             {donor.tags.map((tag, idx) => (
//               <span
//                 key={idx}
//                 className={`rounded-md px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase md:text-xs ${tag.type === 'blue' ? 'bg-cyan-100 text-cyan-800' : tag.type === 'status-blue' ? 'flex items-center gap-1 bg-cyan-100 text-cyan-800 before:h-1.5 before:w-1.5 before:rounded-full before:bg-cyan-600 before:content-[""]' : 'bg-gray-200 text-gray-700'}`}
//               >
//                 {tag.text}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="mt-5 flex flex-wrap gap-2 md:flex-nowrap md:gap-3">
//         <a
//           href={mapUrl}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-xs font-bold text-gray-700 transition-colors hover:bg-gray-50 md:text-sm"
//         >
//           Map Route
//         </a>
//         <a
//           href={`https://wa.me/${cleanPhone}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 py-2.5 text-xs font-bold text-red-700 transition-colors hover:bg-red-50 md:text-sm"
//         >
//           Message
//         </a>
//         <a
//           href={`tel:${cleanPhone}`}
//           className="flex w-full flex-none items-center justify-center gap-2 rounded-xl bg-[#D32F2F] py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-red-800 md:w-32 md:text-sm lg:w-36"
//         >
//           Call
//         </a>
//       </div>
//     </div>
//   );
// };

// // ==========================================
// // 4. MAIN PAGE LAYOUT
// // ==========================================
// export default function SearchDonor() {
//   const [donors, setDonors] = useState([]);
//   const [userLocation, setUserLocation] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Filter States
//   const [activeGroup, setActiveGroup] = useState('All');
//   const [distance, setDistance] = useState(20); // Default 20km search radius
//   const [applyTrigger, setApplyTrigger] = useState(0); // Used to trigger API calls

//   // 1. Initial Mount - Get Location
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           setUserLocation({
//             lat: pos.coords.latitude,
//             lng: pos.coords.longitude,
//           });
//           setApplyTrigger((prev) => prev + 1); // Trigger fetch once we have location
//         },
//         (err) => {
//           console.warn(
//             'User denied location. Distance filters will be disabled.'
//           );
//           setUserLocation(false); // Set to false to indicate we tried but failed
//           setApplyTrigger((prev) => prev + 1); // Trigger fallback fetch
//         }
//       );
//     } else {
//       setUserLocation(false);
//       setApplyTrigger((prev) => prev + 1);
//     }
//   }, []);

//   // 2. Fetch Logic (Triggers when applyTrigger changes)
//   useEffect(() => {
//     // Prevent fetching before location logic has at least run once
//     if (userLocation === null) return;

//     const fetchDonors = async () => {
//       setIsLoading(true);
//       setError(null);

//       try {
//         let endpoint = '/users/';
//         let params = {};

//         // If they selected a specific blood type, pass it to the API
//         if (activeGroup !== 'All') {
//           params.bloodType = activeGroup;
//         }

//         // If location is approved, use the Geospatial Route!
//         if (userLocation) {
//           endpoint = `/users/donors-within/${distance}/center/${userLocation.lat},${userLocation.lng}`;
//         }

//         const response = await api.get(endpoint, { params });

//         // Handle payload differences (donors array from geo route, users array from default route)
//         let rawData =
//           response.data.data?.donors || response.data.data?.users || [];

//         // Manual Frontend Fallback Filter:
//         // If the user denied location, they hit the `/users/` route. The backend for `/users/`
//         // doesn't natively filter by req.query.bloodType in your setup, so we filter it here.
//         if (!userLocation && activeGroup !== 'All') {
//           rawData = rawData.filter((u) => u.bloodType === activeGroup);
//         }

//         const mappedDonors = rawData.map((user) => {
//           const lng = user.location?.coordinates[0];
//           const lat = user.location?.coordinates[1];

//           return {
//             id: user._id,
//             name: user.name,
//             lat: lat,
//             lng: lng,
//             phone: user.phone || user.mobileNumber || '+15551234567',
//             bloodType: user.bloodType,
//             groupLabel: formatGroupLabel(user.bloodType),
//             isOnline: user.isAvailable,
//             avatar: `https://i.pravatar.cc/150?u=${user._id}`,
//             tags: [
//               user.isAvailable
//                 ? { text: 'Available Now', type: 'status-blue' }
//                 : { text: 'Unavailable', type: 'gray' },
//               { text: user.role.toUpperCase(), type: 'blue' },
//             ],
//           };
//         });

//         // Optionally sort by exact calculated distance on the frontend
//         if (userLocation) {
//           mappedDonors.sort((a, b) => {
//             const distA = parseFloat(
//               calculateDistance(
//                 userLocation.lat,
//                 userLocation.lng,
//                 a.lat,
//                 a.lng
//               )
//             );
//             const distB = parseFloat(
//               calculateDistance(
//                 userLocation.lat,
//                 userLocation.lng,
//                 b.lat,
//                 b.lng
//               )
//             );
//             return distA - distB;
//           });
//         }

//         setDonors(mappedDonors);
//       } catch (err) {
//         console.error('Error fetching donors:', err);
//         setError('Failed to load donors. Please try again later.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDonors();
//   }, [applyTrigger, userLocation]);

//   const handleApplyFilters = () => {
//     setApplyTrigger((prev) => prev + 1);
//   };

//   return (
//     <div className="relative min-h-screen bg-[#F4F5F7] pb-20 font-sans text-gray-900 md:pb-10 lg:bg-white">
//       <div className="mx-auto max-w-7xl px-4 pt-6 md:px-8 md:pt-10">
//         <Header />

//         <MobileFilters
//           activeGroup={activeGroup}
//           setActiveGroup={setActiveGroup}
//           distance={distance}
//           setDistance={setDistance}
//           onApply={handleApplyFilters}
//         />

//         <div className="flex flex-col gap-8 lg:flex-row">
//           <DesktopSidebar
//             activeGroup={activeGroup}
//             setActiveGroup={setActiveGroup}
//             distance={distance}
//             setDistance={setDistance}
//             onApply={handleApplyFilters}
//           />

//           <div className="flex-1">
//             <div className="mb-4 flex items-center justify-between text-sm font-medium text-gray-700">
//               <p>
//                 <span className="text-base font-bold text-gray-900">
//                   {donors.length}
//                 </span>{' '}
//                 Compatible donors found
//                 {!userLocation && (
//                   <span className="ml-2 text-xs text-red-500">
//                     (Location disabled - showing all distances)
//                   </span>
//                 )}
//               </p>
//             </div>

//             {isLoading ? (
//               <div className="flex items-center justify-center py-20">
//                 <svg
//                   className="h-8 w-8 animate-spin text-[#D32F2F]"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//               </div>
//             ) : error ? (
//               <div className="py-10 text-center font-bold text-red-600">
//                 {error}
//               </div>
//             ) : donors.length === 0 ? (
//               <div className="py-10 text-center text-gray-500">
//                 No donors found matching your criteria.
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
//                 {donors.map((donor) => (
//                   <DonorCard
//                     key={donor.id}
//                     donor={donor}
//                     userLocation={userLocation}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
// Assuming your custom axios instance is in an api.js file in the same or parent folder
// import api from './api';
import axios from 'axios';

// For this code block, we'll recreate your custom api instance here for clarity if you don't import it.
const api = axios.create({
  baseURL: 'http://127.0.0.1:3000/api/v1',
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ==========================================
// 1. HELPERS & MATH
// ==========================================
const MOCK_BLOOD_GROUPS = [
  'All',
  'A+',
  'A-',
  'B+',
  'B-',
  'O+',
  'O-',
  'AB+',
  'AB-',
];

const formatGroupLabel = (bloodType) => {
  if (!bloodType) return '';
  return bloodType.replace('+', ' POS').replace('-', ' NEG');
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(1);
};

// HELPER: Get up to 2 initials from a name
const getInitials = (name) => {
  if (!name) return '??';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

// HELPER: Format phone numbers for WhatsApp and standard calling
const formatValidPhone = (phone) => {
  if (!phone) return '';

  // 1. Convert to string and strip out everything except raw digits
  let cleaned = String(phone).replace(/[^0-9]/g, '');

  // 2. Remove international '00' prefix if someone typed it
  if (cleaned.startsWith('00')) {
    cleaned = cleaned.substring(2);
  }

  // 3. If it's a standard BD local number (starts with 0 and is 11 digits long)
  // Example: 01712345678 -> turns into 8801712345678
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    return `88${cleaned}`;
  }

  // 4. If it already has the 880 prefix, just return it as is to avoid duplication
  if (cleaned.startsWith('880')) {
    return cleaned;
  }

  // 5. For any other international numbers, just return the cleaned digits
  return cleaned;
};

// ==========================================
// 2. SUB-COMPONENTS
// ==========================================
const Header = () => (
  <div className="mb-6">
    <h1 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
      Find Life-Saving Donors
    </h1>
    <p className="mt-1 text-sm text-gray-500">
      Browse available donors in your vicinity and connect instantly.
    </p>
  </div>
);

const MobileFilters = ({
  activeGroup,
  setActiveGroup,
  distance,
  setDistance,
  onApply,
}) => (
  <div className="mb-6 flex flex-col gap-4 lg:hidden">
    <div className="scrollbar-hide flex gap-3 overflow-x-auto">
      {MOCK_BLOOD_GROUPS.map((bg) => (
        <button
          key={bg}
          onClick={() => setActiveGroup(bg)}
          className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold ${
            activeGroup === bg
              ? 'border-red-700 bg-red-700 text-white'
              : 'border-gray-200 bg-gray-100 text-gray-700'
          }`}
        >
          {bg === 'All' ? 'Any Blood Type' : bg}
        </button>
      ))}
    </div>
    <div className="flex items-center gap-4 px-1">
      <span className="shrink-0 text-sm font-bold text-gray-700">
        Within {distance} km
      </span>
      <input
        type="range"
        min="1"
        max="100"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        className="w-full accent-red-700"
      />
      <button
        onClick={onApply}
        className="rounded-lg bg-red-700 px-4 py-2 text-sm font-bold text-white"
      >
        Search
      </button>
    </div>
  </div>
);

const DesktopSidebar = ({
  activeGroup,
  setActiveGroup,
  distance,
  setDistance,
  onApply,
}) => {
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

        {/* Blood Group Filter */}
        <div className="mb-6">
          <p className="mb-3 text-xs font-bold tracking-wider text-gray-500 uppercase">
            Blood Group
          </p>
          <div className="grid grid-cols-4 gap-2">
            {MOCK_BLOOD_GROUPS.map((bg) => (
              <button
                key={bg}
                onClick={() => setActiveGroup(bg)}
                className={`rounded-lg border py-2 text-sm font-bold ${
                  activeGroup === bg
                    ? 'border-red-700 bg-red-700 text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                } ${bg === 'All' ? 'col-span-4' : ''}`}
              >
                {bg === 'All' ? 'Any Type' : bg}
              </button>
            ))}
          </div>
        </div>

        {/* Distance Filter */}
        <div className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-bold tracking-wider text-gray-500 uppercase">
              Max Distance
            </p>
            <span className="text-sm font-bold text-red-700">
              {distance} km
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            step="1"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="w-full accent-red-700"
          />
          <div className="mt-2 flex justify-between text-xs text-gray-400">
            <span>1 km</span>
            <span>100 km</span>
          </div>
        </div>

        <button
          onClick={onApply}
          className="w-full rounded-xl bg-red-700 py-3 font-bold text-white transition-colors hover:bg-red-800"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 3. DONOR CARD
// ==========================================

// #ffffff
// const DonorCard = ({ donor, userLocation }) => {
//   // This gives us the perfect format for WhatsApp and calling
//   const validPhone = formatValidPhone(donor.phone);

//   let mapUrl = `http://googleusercontent.com/maps.google.com/?q=${donor.lat},${donor.lng}`;
//   if (userLocation?.lat && userLocation?.lng) {
//     mapUrl += `&saddr=${userLocation.lat},${userLocation.lng}&daddr=${donor.lat},${donor.lng}`;
//   }

//   const exactDistance = calculateDistance(
//     userLocation?.lat,
//     userLocation?.lng,
//     donor.lat,
//     donor.lng
//   );

//   return (
//     <div className="flex flex-col justify-between rounded-2xl border border-gray-50 bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)] md:p-5">
//       <div className="flex gap-4">
//         <div className="relative shrink-0">
//           <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-lg font-bold tracking-wide text-red-700 md:h-16 md:w-16 md:text-xl">
//             {getInitials(donor.name)}
//           </div>

//           {donor.isOnline && (
//             <span className="absolute right-0 bottom-0 h-4 w-4 rounded-full border-2 border-white bg-green-500"></span>
//           )}
//         </div>

//         <div className="flex-1">
//           <div className="flex items-start justify-between">
//             <div>
//               <h3 className="text-base font-bold text-gray-900 md:text-lg">
//                 {donor.name}
//               </h3>
//               <div className="mt-1 flex flex-col gap-1 text-xs text-gray-500 md:flex-row md:items-center md:gap-2 md:text-sm">
//                 <span className="flex items-center gap-1 font-medium">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-3.5 w-3.5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                   </svg>
//                   {exactDistance
//                     ? `${exactDistance} km away`
//                     : 'Distance unknown'}
//                 </span>
//               </div>
//             </div>

//             <div className="flex shrink-0 flex-col items-center justify-center rounded-xl border border-red-100 bg-red-100/60 px-2 py-1 md:px-3 md:py-2">
//               <span className="text-[9px] leading-none font-bold text-red-800 uppercase md:text-[10px]">
//                 {donor.groupLabel}
//               </span>
//               <span className="text-sm leading-tight font-extrabold text-red-700 md:text-xl">
//                 {donor.bloodType}
//               </span>
//             </div>
//           </div>

//           <div className="mt-3 flex flex-wrap gap-2 md:mt-4">
//             {donor.tags.map((tag, idx) => (
//               <span
//                 key={idx}
//                 className={`rounded-md px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase md:text-xs ${tag.type === 'blue' ? 'bg-cyan-100 text-cyan-800' : tag.type === 'status-blue' ? 'flex items-center gap-1 bg-cyan-100 text-cyan-800 before:h-1.5 before:w-1.5 before:rounded-full before:bg-cyan-600 before:content-[""]' : 'bg-gray-200 text-gray-700'}`}
//               >
//                 {tag.text}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="mt-5 flex flex-wrap gap-2 md:flex-nowrap md:gap-3">
//         <a
//           href={mapUrl}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-xs font-bold text-gray-700 transition-colors hover:bg-gray-50 md:text-sm"
//         >
//           Map Route
//         </a>
//         <a
//           // WhatsApp API format for highest mobile compatibility
//           href={`https://api.whatsapp.com/send?phone=${validPhone}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 py-2.5 text-xs font-bold text-red-700 transition-colors hover:bg-red-50 md:text-sm"
//         >
//           Message
//         </a>
//         <a
//           // Phone format with explicit + for international dialing
//           href={`tel:+${validPhone}`}
//           className="flex w-full flex-none items-center justify-center gap-2 rounded-xl bg-[#D32F2F] py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-red-800 md:w-32 md:text-sm lg:w-36"
//         >
//           Call
//         </a>
//       </div>
//     </div>
//   );
// };

// ==========================================
// 3. DONOR CARD
// ==========================================
const DonorCard = ({ donor, userLocation }) => {
  // This gives us the perfect format for WhatsApp and calling
  const validPhone = formatValidPhone(donor.phone);

  // Safely construct Map URLs using official Google Maps formatting
  let mapUrl = '#';
  if (donor.lat && donor.lng) {
    // Default search if we don't have the user's current location
    mapUrl = `https://www.google.com/maps/search/?api=1&query=${donor.lat},${donor.lng}`;

    // Exact directions if we DO have the user's current location
    if (userLocation?.lat && userLocation?.lng) {
      mapUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${donor.lat},${donor.lng}`;
    }
  }

  const exactDistance = calculateDistance(
    userLocation?.lat,
    userLocation?.lng,
    donor.lat,
    donor.lng
  );

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-gray-50 bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)] md:p-5">
      <div className="flex gap-4">
        <div className="relative shrink-0">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-lg font-bold tracking-wide text-red-700 md:h-16 md:w-16 md:text-xl">
            {getInitials(donor.name)}
          </div>

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
                <span className="flex items-center gap-1 font-medium">
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
                  {exactDistance
                    ? `${exactDistance} km away`
                    : 'Distance unknown'}
                </span>
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
                      : 'bg-gray-200 text-gray-700'
                }`}
              >
                {tag.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2 md:flex-nowrap md:gap-3">
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (mapUrl === '#') {
              e.preventDefault();
              alert('Location coordinates are unavailable for this donor.');
            }
          }}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-xs font-bold text-gray-700 transition-colors hover:bg-gray-50 md:text-sm"
        >
          Map Route
        </a>
        <a
          // WhatsApp official deep link format
          href={`https://wa.me/${validPhone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 py-2.5 text-xs font-bold text-red-700 transition-colors hover:bg-red-50 md:text-sm"
        >
          Message
        </a>
        <a
          // tel: protocol automatically opens the phone dialer.
          // validPhone is formatted strictly as numbers, so the + ensures standard international routing.
          href={`tel:+${validPhone}`}
          className="flex w-full flex-none items-center justify-center gap-2 rounded-xl bg-[#D32F2F] py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-red-800 md:w-32 md:text-sm lg:w-36"
        >
          Call
        </a>
      </div>
    </div>
  );
};
// #ffffff

// ==========================================
// 4. MAIN PAGE LAYOUT
// ==========================================
export default function SearchDonor() {
  const [donors, setDonors] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter States
  const [activeGroup, setActiveGroup] = useState('All');
  const [distance, setDistance] = useState(20); // Default 20km search radius
  const [applyTrigger, setApplyTrigger] = useState(0); // Used to trigger API calls

  // 1. Initial Mount - Get Location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          setApplyTrigger((prev) => prev + 1); // Trigger fetch once we have location
        },
        (err) => {
          console.warn(
            'User denied location. Distance filters will be disabled.'
          );
          setUserLocation(false); // Set to false to indicate we tried but failed
          setApplyTrigger((prev) => prev + 1); // Trigger fallback fetch
        }
      );
    } else {
      setUserLocation(false);
      setApplyTrigger((prev) => prev + 1);
    }
  }, []);

  // 2. Fetch Logic (Triggers when applyTrigger changes)
  useEffect(() => {
    // Prevent fetching before location logic has at least run once
    if (userLocation === null) return;

    const fetchDonors = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let endpoint = '/users/';
        let params = {};

        // If they selected a specific blood type, pass it to the API
        if (activeGroup !== 'All') {
          params.bloodType = activeGroup;
        }

        // If location is approved, use the Geospatial Route!
        if (userLocation) {
          endpoint = `/users/donors-within/${distance}/center/${userLocation.lat},${userLocation.lng}`;
        }

        const response = await api.get(endpoint, { params });

        // Handle payload differences (donors array from geo route, users array from default route)
        let rawData =
          response.data.data?.donors || response.data.data?.users || [];

        // Manual Frontend Fallback Filter:
        if (!userLocation && activeGroup !== 'All') {
          rawData = rawData.filter((u) => u.bloodType === activeGroup);
        }

        const mappedDonors = rawData.map((user) => {
          const lng = user.location?.coordinates[0];
          const lat = user.location?.coordinates[1];

          return {
            id: user._id,
            name: user.name,
            lat: lat,
            lng: lng,
            phone: user.phone || user.mobileNumber || '+15551234567',
            bloodType: user.bloodType,
            groupLabel: formatGroupLabel(user.bloodType),
            isOnline: user.isAvailable,
            tags: [
              user.isAvailable
                ? { text: 'Available Now', type: 'status-blue' }
                : { text: 'Unavailable', type: 'gray' },
              { text: user.role.toUpperCase(), type: 'blue' },
            ],
          };
        });

        // Optionally sort by exact calculated distance on the frontend
        if (userLocation) {
          mappedDonors.sort((a, b) => {
            const distA = parseFloat(
              calculateDistance(
                userLocation.lat,
                userLocation.lng,
                a.lat,
                a.lng
              )
            );
            const distB = parseFloat(
              calculateDistance(
                userLocation.lat,
                userLocation.lng,
                b.lat,
                b.lng
              )
            );
            return distA - distB;
          });
        }

        setDonors(mappedDonors);
      } catch (err) {
        console.error('Error fetching donors:', err);
        setError('Failed to load donors. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonors();
  }, [applyTrigger, userLocation]);

  const handleApplyFilters = () => {
    setApplyTrigger((prev) => prev + 1);
  };

  return (
    <div className="relative min-h-screen bg-[#F4F5F7] pb-20 font-sans text-gray-900 md:pb-10 lg:bg-white">
      <div className="mx-auto max-w-7xl px-4 pt-6 md:px-8 md:pt-10">
        <Header />

        <MobileFilters
          activeGroup={activeGroup}
          setActiveGroup={setActiveGroup}
          distance={distance}
          setDistance={setDistance}
          onApply={handleApplyFilters}
        />

        <div className="flex flex-col gap-8 lg:flex-row">
          <DesktopSidebar
            activeGroup={activeGroup}
            setActiveGroup={setActiveGroup}
            distance={distance}
            setDistance={setDistance}
            onApply={handleApplyFilters}
          />

          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between text-sm font-medium text-gray-700">
              <p>
                <span className="text-base font-bold text-gray-900">
                  {donors.length}
                </span>{' '}
                Compatible donors found
                {!userLocation && (
                  <span className="ml-2 text-xs text-red-500">
                    (Location disabled - showing all distances)
                  </span>
                )}
              </p>
            </div>

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
                No donors found matching your criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
                {donors.map((donor) => (
                  <DonorCard
                    key={donor.id}
                    donor={donor}
                    userLocation={userLocation}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
