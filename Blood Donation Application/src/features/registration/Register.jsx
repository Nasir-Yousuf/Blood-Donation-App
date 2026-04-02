import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegistrationForm = () => {
  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // State mapped to your UI and Mongoose Schema
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    locationText: '', // Human-readable city/state for the input field
    coordinates: [null, null], // [longitude, latitude] for Mongoose GeoJSON
    bloodType: 'A-',
    isAvailable: true,
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  // Handle standard text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Auto-Location Fetcher
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      return alert('Geolocation is not supported by your browser.');
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          // Fetch human-readable city/state
          const res = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          const city =
            res.data.address?.city ||
            res.data.address?.town ||
            res.data.address?.village ||
            '';
          const state = res.data.address?.state || '';
          const formattedLocation = [city, state].filter(Boolean).join(', ');

          // Update state with both the UI text and the exact coordinates for the API
          setFormData((prev) => ({
            ...prev,
            locationText:
              formattedLocation ||
              `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            coordinates: [longitude, latitude], // Note: GeoJSON requires [lng, lat]
          }));
        } catch (error) {
          console.error('Error fetching location details:', error);
          alert('Could not determine city automatically. Please try again.');
        } finally {
          setIsLocating(false);
        }
      },
      () => {
        setIsLocating(false);
        alert(
          'Location access denied. We need your location to match you with nearby hospitals.'
        );
      }
    );
  };

  // API Submission Handler
  const onSubmit = async (e) => {
    e.preventDefault();

    // Safety check for GeoJSON coordinates
    if (formData.coordinates[0] === null) {
      return alert(
        'Please click the location target icon to detect your coordinates before submitting.'
      );
    }

    setIsSubmitting(true);

    // Format the payload exactly as your Mongoose schema expects
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      bloodType: formData.bloodType,
      isAvailable: formData.isAvailable,
      location: {
        type: 'Point',
        coordinates: formData.coordinates, // [longitude, latitude]
      },
    };

    try {
      console.log('Sending payload to API:', payload);

      const response = await axios.post(
        'http://127.0.0.1:3000/api/v1/users',
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      console.log('API Response:', response.data);
      alert('User successfully created!');

      //  Redirect to login or home page here
      navigate('/login');
      // window.location.href = '/login';
    } catch (error) {
      console.error('Registration failed:', error);
      const errorMsg =
        error.response?.data?.message ||
        'Failed to register. Please try again.';
      alert(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full rounded-[32px] bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10"
    >
      {/* --- Personal Identity Section --- */}
      <div className="mb-10">
        <div className="mb-6 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 text-[#D32F2F]"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clipRule="evenodd"
            />
          </svg>
          <h2 className="text-lg font-bold text-gray-900">Personal Identity</h2>
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-xs font-bold text-gray-700">
            Full Legal Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            type="text"
            placeholder="e.g. Julianne Sterling"
            className="w-full rounded-2xl border-none bg-[#F4F4F5] px-5 py-4 text-sm text-gray-800 placeholder-gray-400 transition-all focus:ring-2 focus:ring-[#D32F2F]/20 focus:outline-none"
          />
        </div>

        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-bold text-gray-700">
              Email Address
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              type="email"
              placeholder="name@example.com"
              className="w-full rounded-2xl border-none bg-[#F4F4F5] px-5 py-4 text-sm text-gray-800 placeholder-gray-400 transition-all focus:ring-2 focus:ring-[#D32F2F]/20 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold text-gray-700">
              Password
            </label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-2xl border-none bg-[#F4F4F5] px-5 py-4 text-sm text-gray-800 placeholder-gray-400 transition-all focus:ring-2 focus:ring-[#D32F2F]/20 focus:outline-none"
            />
          </div>
        </div>

        {/* Auto-Location Input */}
        <div>
          <label className="mb-2 block text-xs font-bold text-gray-700">
            Location / City
          </label>
          <div className="relative">
            <input
              name="locationText"
              value={formData.locationText}
              readOnly
              required
              type="text"
              placeholder="Click target icon to detect location ->"
              className="w-full cursor-default rounded-2xl border-none bg-[#F4F4F5] py-4 pr-12 pl-5 text-sm text-gray-800 placeholder-gray-400 transition-all focus:ring-2 focus:ring-[#D32F2F]/20 focus:outline-none"
            />

            <button
              type="button"
              onClick={handleGetLocation}
              disabled={isLocating}
              title="Detect Location"
              className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 transition-colors outline-none hover:text-[#D32F2F] disabled:opacity-50"
            >
              {isLocating ? (
                <svg
                  className="h-5 w-5 animate-spin text-[#D32F2F]"
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
              ) : (
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
              )}
            </button>
          </div>
        </div>
      </div>

      {/* --- Clinical Grouping Section --- */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 text-[#D32F2F]"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
          <h2 className="text-lg font-bold text-gray-900">Clinical Grouping</h2>
        </div>
        <p className="mb-5 text-xs text-gray-500">
          Select your blood type if known.
        </p>

        <div className="mb-8 flex flex-wrap gap-2.5">
          {bloodGroups.map((bg) => (
            <button
              key={bg}
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, bloodType: bg }))
              }
              className={`min-w-[50px] flex-1 rounded-2xl py-3.5 text-sm font-bold transition-all outline-none sm:min-w-[60px] ${
                formData.bloodType === bg
                  ? 'scale-105 transform bg-[#D32F2F] text-white shadow-lg shadow-red-500/40 focus:ring-2 focus:ring-[#D32F2F] focus:ring-offset-2'
                  : 'bg-[#F4F4F5] text-gray-600 hover:bg-gray-200 focus:ring-2 focus:ring-gray-300'
              }`}
            >
              {bg}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between rounded-2xl bg-[#F4F4F5] p-5">
          <div>
            <p className="text-sm font-bold text-gray-900">
              Available to donate
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Appear in emergency searches.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                isAvailable: !prev.isAvailable,
              }))
            }
            className={`relative inline-flex h-8 w-14 shrink-0 items-center rounded-full transition-colors focus:ring-2 focus:ring-[#D32F2F] focus:ring-offset-2 focus:outline-none ${formData.isAvailable ? 'bg-[#D32F2F]' : 'bg-gray-300'}`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition-transform ${formData.isAvailable ? 'translate-x-7' : 'translate-x-1'}`}
            />
          </button>
        </div>
      </div>

      {/* --- Action Buttons --- */}
      <div className="mt-10 flex flex-col-reverse items-center justify-between gap-4 border-t border-gray-100 pt-6 sm:flex-row">
        <Link to="/">
          <button
            type="button"
            className="text-sm font-bold text-gray-500 underline decoration-gray-300 underline-offset-4 transition-colors outline-none hover:text-gray-900 focus:text-gray-900"
          >
            Skip for now
          </button>
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D32F2F] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition-all outline-none hover:bg-[#B71C1C] focus:ring-2 focus:ring-[#D32F2F] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {isSubmitting ? 'Creating Profile...' : 'Complete Registration'}
        </button>
      </div>
    </form>
  );
};

// ==========================================
// PARENT COMPONENT
// ==========================================
export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-start justify-center bg-[#F8F9FA] px-4 py-10 font-sans text-gray-900 md:px-8">
      <div className="flex w-full max-w-3xl justify-center">
        <RegistrationForm />
      </div>
    </div>
  );
}
