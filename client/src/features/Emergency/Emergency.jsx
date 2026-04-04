import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import api from '../../api/axiosInstance';

// Helper function to calculate "Posted X minutes ago"
const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';
  return 'Just now';
};

// HELPER: Format phone numbers for WhatsApp and standard calling
const formatValidPhone = (phone) => {
  if (!phone) return '';
  let cleaned = String(phone).replace(/[^0-9]/g, '');
  if (cleaned.startsWith('00')) {
    cleaned = cleaned.substring(2);
  }
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    return `88${cleaned}`;
  }
  if (cleaned.startsWith('880')) {
    return cleaned;
  }
  return cleaned;
};

export default function Emergency() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('feed');

  // ==========================================
  // CUSTOM UI STATES (Toast & Modals)
  // ==========================================
  const [toast, setToast] = useState(null); // { message: '', type: 'success' | 'error' }
  const [deleteConfirmId, setDeleteConfirmId] = useState(null); // Stores ID of request to delete

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // ==========================================
  // FILTER STATES
  // ==========================================
  const [filterUrgency, setFilterUrgency] = useState('');
  const [filterBlood, setFilterBlood] = useState('');
  const [filterDistance, setFilterDistance] = useState('');

  // ==========================================
  // FEED STATE & LOGIC
  // ==========================================
  const [feedData, setFeedData] = useState([]);
  const [feedLoading, setFeedLoading] = useState(true);
  const [feedError, setFeedError] = useState(null);

  useEffect(() => {
    if (activeTab !== 'feed') return;

    const fetchEmergencies = async (lat = null, lng = null) => {
      try {
        setFeedError(null);

        const params = {};
        if (lat && lng) {
          params.lat = lat;
          params.lng = lng;
        }
        if (filterUrgency) params.urgency = filterUrgency;
        if (filterBlood) params.bloodType = encodeURIComponent(filterBlood);
        if (filterDistance) params.maxDistance = filterDistance;

        const response = await api.get('/requests/nearby-public', {
          params,
          timeout: 8000,
        });

        const requests =
          response.data?.data?.requests || response.data?.data || [];
        setFeedData(requests);
      } catch (error) {
        console.error('Failed to load emergencies', error);
        setFeedError('Failed to load nearby emergencies. Please try again.');
      } finally {
        setFeedLoading(false);
      }
    };

    setFeedLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          fetchEmergencies(position.coords.latitude, position.coords.longitude),
        (error) => {
          console.warn('Feed GPS Denied/Unavailable', error);
          fetchEmergencies(null, null);
        },
        { timeout: 5000 }
      );
    } else {
      fetchEmergencies(null, null);
    }
  }, [activeTab, filterUrgency, filterBlood, filterDistance]);

  const executeDelete = async () => {
    if (!deleteConfirmId) return;

    try {
      await api.delete(`/requests/${deleteConfirmId}`);
      setFeedData((prev) => prev.filter((req) => req._id !== deleteConfirmId));
      showToast('Request deleted successfully.', 'success');
    } catch (error) {
      console.error(error);
      showToast(
        error.response?.data?.message ||
          'Failed to delete request. Ensure you are the creator.',
        'error'
      );
    } finally {
      setDeleteConfirmId(null);
    }
  };

  // ==========================================
  // FORM STATE & LOGIC
  // ==========================================
  const [formLoading, setFormLoading] = useState(false);
  const [formLocating, setFormLocating] = useState(false);
  const [formLocationError, setFormLocationError] = useState(false);
  const [formCoords, setFormCoords] = useState({ lat: null, lng: null });
  const [urgency, setUrgency] = useState('Life-Threatening');

  const hasAttemptedAutoLocate = useRef(false);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setFormLocationError(true);
      return;
    }

    setFormLocating(true);
    setFormLocationError(false);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setFormLocating(false);
      },
      (error) => {
        console.warn('Form GPS Auto-fetch failed or denied', error);
        setFormLocationError(true);
        setFormLocating(false);
      },
      { timeout: 7000 }
    );
  };

  useEffect(() => {
    if (
      activeTab === 'request' &&
      !formCoords.lat &&
      !hasAttemptedAutoLocate.current
    ) {
      hasAttemptedAutoLocate.current = true;
      handleGetLocation();
    }
  }, [activeTab, formCoords.lat]);

  const handlePostRequest = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    const formData = new FormData(e.target);
    const hospitalName = formData.get('hospitalName');
    const hospitalAddress = formData.get('hospitalAddress');

    let finalLat = formCoords.lat;
    let finalLng = formCoords.lng;

    if (!finalLat || !finalLng) {
      try {
        const searchQuery = encodeURIComponent(
          `${hospitalName} ${hospitalAddress}`
        );
        const geoRes = await api.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}&limit=1`
        );

        if (geoRes.data && geoRes.data.length > 0) {
          finalLat = parseFloat(geoRes.data[0].lat);
          finalLng = parseFloat(geoRes.data[0].lon);
        } else {
          setFormLoading(false);
          showToast(
            "We couldn't map that address. Check for typos or enable GPS.",
            'error'
          );
          return;
        }
      } catch (error) {
        setFormLoading(false);
        showToast(
          'Failed to verify location. Enable GPS and try again.',
          'error'
        );
        return;
      }
    }

    const payload = {
      patientName: formData.get('patientName'),
      contactNumber: formData.get('contactNumber'),
      bloodType: formData.get('bloodType'),
      urgency: urgency,
      hospitalName: hospitalName,
      hospitalAddress: hospitalAddress,
      caseDetails: formData.get('caseDetails'),
      location: {
        type: 'Point',
        coordinates: [finalLng, finalLat],
      },
    };

    try {
      await api.post('/requests', payload);
      showToast('Emergency request broadcasted successfully!', 'success');
      e.target.reset();
      setFormCoords({ lat: null, lng: null });
      setUrgency('Life-Threatening');
      hasAttemptedAutoLocate.current = false;
      setActiveTab('feed');
    } catch (error) {
      showToast(
        error.response?.data?.message || 'Failed to post request.',
        'error'
      );
    } finally {
      setFormLoading(false);
    }
  };

  // ==========================================
  // UI HELPERS
  // ==========================================
  const getUrgencyBadge = (level) => {
    if (level === 'Life-Threatening') return 'bg-[#DC2626] text-white';
    if (level === 'Critical') return 'bg-[#F97316] text-white';
    return 'bg-[#FACC15] text-black';
  };

  const getStatusBadge = (status) => {
    if (status === 'accepted') return 'bg-[#86EFAC] text-[#166534]';
    if (status === 'fulfilled') return 'bg-gray-300 text-gray-700';
    return 'bg-[#93C5FD] text-[#1E3A8A]';
  };

  return (
    <div className="relative min-h-screen bg-[#F4F7FB] pb-32 font-sans text-gray-900 md:pb-10">
      {/* TOAST NOTIFICATION OVERLAY */}
      {toast && (
        <div className="animate-fade-in-down fixed top-4 left-1/2 z-50 w-[90%] max-w-sm -translate-x-1/2 rounded-2xl shadow-xl transition-all">
          <div
            className={`flex items-center gap-3 rounded-2xl border px-5 py-4 ${toast.type === 'error' ? 'border-red-200 bg-red-50 text-red-800' : 'border-green-200 bg-green-50 text-green-800'}`}
          >
            {toast.type === 'error' ? (
              <svg
                className="h-6 w-6 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            <p className="text-sm font-bold">{toast.message}</p>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 px-4 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-sm scale-100 rounded-[32px] bg-white p-6 shadow-2xl transition-transform">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-center text-xl font-extrabold text-gray-900">
              Delete Request?
            </h3>
            <p className="mb-6 text-center text-sm font-medium text-gray-500">
              This action cannot be undone. Your request will be permanently
              removed from the emergency feed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 rounded-2xl bg-gray-100 py-3.5 text-sm font-bold text-gray-700 transition hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                className="flex-1 rounded-2xl bg-[#D32F2F] py-3.5 text-sm font-extrabold text-white shadow-lg shadow-red-900/20 transition hover:bg-red-800"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-4xl px-4 pt-6 lg:pt-10">
        <div className="mb-8 flex justify-center">
          <div className="relative inline-flex w-full max-w-sm rounded-full bg-gray-200/80 p-1">
            <button
              onClick={() => setActiveTab('request')}
              className={`z-10 flex-1 rounded-full py-3 text-sm font-bold transition-all ${activeTab === 'request' ? 'bg-white text-[#D32F2F] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Emergency Post
            </button>
            <button
              onClick={() => setActiveTab('feed')}
              className={`z-10 flex-1 rounded-full py-3 text-sm font-bold transition-all ${activeTab === 'feed' ? 'bg-white text-[#006064] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Emergency Feed
            </button>
          </div>
        </div>

        {activeTab === 'feed' && (
          <div className="flex flex-col gap-5">
            <div className="mb-2 flex flex-wrap gap-3">
              <select
                value={filterUrgency}
                onChange={(e) => setFilterUrgency(e.target.value)}
                className="flex-1 rounded-xl border-none bg-white px-4 py-3 text-sm font-bold text-gray-700 shadow-sm transition-all outline-none focus:ring-2 focus:ring-[#D32F2F]/20"
              >
                <option value="">All Urgencies</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
                <option value="Life-Threatening">Life-Threatening</option>
              </select>
              <select
                value={filterBlood}
                onChange={(e) => setFilterBlood(e.target.value)}
                className="flex-1 rounded-xl border-none bg-white px-4 py-3 text-sm font-bold text-gray-700 shadow-sm transition-all outline-none focus:ring-2 focus:ring-[#D32F2F]/20"
              >
                <option value="">All Blood</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
              <select
                value={filterDistance}
                onChange={(e) => setFilterDistance(e.target.value)}
                className="flex-1 rounded-xl border-none bg-white px-4 py-3 text-sm font-bold text-gray-700 shadow-sm transition-all outline-none focus:ring-2 focus:ring-[#D32F2F]/20"
              >
                <option value="">Any Distance</option>
                <option value="5">Within 5 km</option>
                <option value="10">Within 10 km</option>
                <option value="50">Within 50 km</option>
              </select>
            </div>

            {feedLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#D32F2F]/20 border-t-[#D32F2F]"></div>
                <p className="animate-pulse text-sm font-bold text-gray-500">
                  Locating nearby emergencies...
                </p>
              </div>
            ) : feedError ? (
              <div className="rounded-2xl border border-red-100 bg-red-50 p-5 text-center text-sm font-bold text-red-600">
                {feedError}
              </div>
            ) : feedData.length === 0 ? (
              <div className="rounded-[32px] border border-gray-100 bg-white py-16 text-center shadow-sm">
                <p className="mb-1 text-lg font-extrabold text-gray-900">
                  Area Secure
                </p>
                <p className="text-sm font-medium text-gray-500">
                  No active emergencies match your filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {feedData.map((req) => {
                  const validPhone = formatValidPhone(req.contactNumber);

                  return (
                    <div
                      key={req._id}
                      className={`relative w-full rounded-[24px] border border-gray-200 bg-[#F8F9FA] p-5 transition-transform hover:-translate-y-1 ${req.urgency === 'Life-Threatening' ? 'border-red-400 shadow-[0_0_20px_rgba(220,38,38,0.4)]' : ''}`}
                    >
                      <div className="mb-2">
                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-bold ${getUrgencyBadge(req.urgency)}`}
                        >
                          {req.urgency}
                        </span>
                      </div>

                      <div className="absolute top-5 right-5 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-red-50 shadow-sm">
                        <span className="text-lg font-bold text-red-500">
                          {req.bloodType}
                        </span>
                      </div>

                      <div className="mb-4 flex flex-wrap items-center gap-2 pr-14">
                        <h3 className="text-xl font-extrabold tracking-tight text-gray-900">
                          {req.patientName}
                        </h3>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${getStatusBadge(req.status)}`}
                        >
                          {req.status.charAt(0).toUpperCase() +
                            req.status.slice(1)}
                        </span>
                      </div>

                      <div className="mb-2 flex items-center gap-2 text-[13px] font-medium text-gray-600">
                        <svg
                          className="h-4 w-4 shrink-0 text-[#8B1C1C]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="truncate">{req.hospitalName}</span>
                        {req.distance !== undefined && (
                          <span>
                            • {(req.distance / 1000).toFixed(1)}km away
                          </span>
                        )}
                      </div>

                      <div className="mb-5 flex items-center gap-2 text-[13px] font-medium text-gray-600">
                        <svg
                          className="h-4 w-4 shrink-0 text-[#8B1C1C]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>Posted {timeAgo(req.createdAt)}</span>
                      </div>

                      <div className="flex w-full gap-2">
                        <a
                          href={`tel:+${validPhone}`}
                          className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-[#A51C1C] py-2.5 text-[11px] font-bold text-white transition hover:bg-red-800"
                        >
                          <svg
                            className="h-3.5 w-3.5 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          Call
                        </a>

                        <a
                          href={`https://api.whatsapp.com/send?phone=${validPhone}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-[#E4E4E5] py-2.5 text-[11px] font-bold text-gray-700 transition hover:bg-gray-300"
                        >
                          <svg
                            className="h-3.5 w-3.5 shrink-0"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.446-.272.371-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          Message
                        </a>

                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${req.location.coordinates[1]},${req.location.coordinates[0]}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-[#E4E4E5] py-2.5 text-[11px] font-bold text-gray-700 transition hover:bg-gray-300"
                        >
                          <svg
                            className="h-3.5 w-3.5 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
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
                          Map
                        </a>

                        {isAuthenticated &&
                          user &&
                          req.createdBy === user._id && (
                            <button
                              onClick={() => setDeleteConfirmId(req._id)}
                              className="flex flex-1 items-center justify-center rounded-xl border-2 border-[#E4E4E5] bg-white py-2.5 text-[11px] font-bold text-gray-400 transition hover:border-red-200 hover:bg-gray-50 hover:text-red-500"
                            >
                              Delete
                            </button>
                          )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'request' && (
          <form
            onSubmit={handlePostRequest}
            className="rounded-[32px] border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:p-8"
          >
            {!isAuthenticated && (
              <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm font-medium text-blue-700">
                You are posting as a guest. Logging in allows you to manage and
                track your requests later!
              </div>
            )}
            <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                  Patient Name
                </label>
                <input
                  type="text"
                  name="patientName"
                  required
                  placeholder="Enter patient's full name"
                  className="w-full rounded-2xl border-none bg-[#F4F4F5] px-5 py-4 text-sm font-medium text-gray-900 transition-all outline-none focus:ring-2 focus:ring-[#D32F2F]/20"
                />
              </div>
              <div>
                <label className="mb-2 block text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  required
                  placeholder="+1 (555) 000-0000"
                  className="w-full rounded-2xl border-none bg-[#F4F4F5] px-5 py-4 text-sm font-medium text-gray-900 transition-all outline-none focus:ring-2 focus:ring-[#D32F2F]/20"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="mb-2 block text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                Blood Type Needed
              </label>
              <div className="relative">
                <select
                  name="bloodType"
                  required
                  defaultValue=""
                  className="w-full appearance-none rounded-2xl border-none bg-[#F4F4F5] px-5 py-4 text-sm font-extrabold text-gray-900 transition-all outline-none focus:ring-2 focus:ring-[#D32F2F]/20"
                >
                  <option value="" disabled>
                    Select Blood Type
                  </option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
                <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gray-400">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <label className="mb-2 block text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                Urgency Level
              </label>
              <div className="flex rounded-2xl bg-[#F4F4F5] p-1">
                {['High', 'Critical', 'Life-Threatening'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setUrgency(level)}
                    className={`flex-1 rounded-xl py-3 text-xs font-bold transition-all ${urgency === level ? (level === 'Life-Threatening' ? 'bg-[#DC2626] text-white shadow-md' : level === 'Critical' ? 'bg-[#F97316] text-white shadow-md' : 'bg-[#FACC15] text-black shadow-md') : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6 rounded-[24px] border border-blue-100 bg-blue-50 p-5">
              <div className="mb-4 flex items-center justify-between">
                <label className="block text-[11px] font-bold tracking-widest text-blue-800 uppercase">
                  Hospital & Location
                </label>
                {formCoords.lat && (
                  <span className="rounded-md border border-green-200 bg-green-100 px-2 py-1 text-[10px] font-bold text-green-700 uppercase">
                    GPS Attached
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={handleGetLocation}
                disabled={formLocating || formCoords.lat}
                className={`mb-4 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-all ${formLocating ? 'cursor-wait border border-blue-200 bg-blue-100 text-blue-700' : formCoords.lat ? 'border border-green-600 bg-green-500 text-white shadow-md' : formLocationError ? 'border border-red-200 bg-red-50 text-red-600 shadow-sm hover:bg-red-100' : 'border border-blue-200 bg-white text-blue-700 shadow-sm hover:bg-blue-100'}`}
              >
                {formLocating ? (
                  <>
                    <svg
                      className="h-5 w-5 animate-spin"
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
                    </svg>{' '}
                    Auto-Locating...
                  </>
                ) : formCoords.lat ? (
                  <>
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>{' '}
                    Location Acquired
                  </>
                ) : formLocationError ? (
                  <>
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>{' '}
                    GPS Failed - Retry
                  </>
                ) : (
                  <>
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>{' '}
                    Attach GPS Coordinates
                  </>
                )}
              </button>
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  name="hospitalName"
                  required
                  placeholder="Hospital / Clinic Name"
                  className="w-full rounded-xl border-none bg-white px-4 py-3.5 text-sm font-medium text-gray-900 placeholder-gray-400 shadow-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <input
                  type="text"
                  name="hospitalAddress"
                  required
                  placeholder="Exact Address (e.g. 3rd Floor, ICU Room 402)"
                  className="w-full rounded-xl border-none bg-white px-4 py-3.5 text-sm font-medium text-gray-900 placeholder-gray-400 shadow-sm outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
            <div className="mb-8">
              <label className="mb-2 block text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                Case Details (Optional)
              </label>
              <textarea
                name="caseDetails"
                rows="3"
                placeholder="Describe the medical situation..."
                className="w-full resize-none rounded-2xl border-none bg-[#F4F4F5] px-5 py-4 text-sm font-medium text-gray-900 transition-all outline-none focus:ring-2 focus:ring-[#D32F2F]/20"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={formLoading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D32F2F] py-4.5 text-sm font-extrabold text-white shadow-lg shadow-red-900/20 transition-colors hover:bg-red-800 disabled:opacity-70"
            >
              {formLoading ? 'Broadcasting...' : 'Post Emergency Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
