import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, useActionData, useNavigation, Link } from 'react-router-dom';
import api from '../../api/axiosInstance';
import { setCredentials } from '../../store/slices/authSlice';
import { store } from '../../store/index';

// ==========================================
// 1. THE UPDATE ACTION
// ==========================================
export const profileAction = async ({ request }) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  try {
    const response = await api.patch('/users/updateMe', updates);
    const updatedUser = response.data.data.user;

    // Update Redux state globally
    const token = store.getState().auth.token;
    store.dispatch(setCredentials({ user: updatedUser, token }));

    return { success: true, message: 'Profile updated successfully!' };
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || 'Failed to update profile.',
    };
  }
};

// ==========================================
// 2. MAIN PROFILE COMPONENT
// ==========================================
export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  // Local state for the gender toggle UI
  const [selectedGender, setSelectedGender] = useState(user?.gender || '');

  // Calculate generic recovery progress based on nextAvailableDate
  const getRecoveryProgress = () => {
    if (!user?.nextAvailableDate) return 100;
    const nextDate = new Date(user.nextAvailableDate);
    if (nextDate < new Date()) return 100;
    return 65; // Mock calculation for UI
  };

  const progress = getRecoveryProgress();

  if (!user) return null;

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-[#F8F9FA] font-sans text-gray-900">
      {/* LEFT SIDEBAR (Desktop) */}
      <aside className="sticky top-0 z-20 hidden h-screen w-[240px] shrink-0 flex-col border-r border-gray-100 bg-white py-8 lg:flex">
        <nav className="mt-4 flex flex-1 flex-col gap-2">
          <Link
            to="/dashboard"
            className="mr-4 flex items-center gap-3 rounded-r-full border-l-4 border-transparent px-6 py-3.5 font-bold text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-900"
          >
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
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            <span className="text-sm">Dashboard</span>
          </Link>
          <Link
            to="/profile"
            className="mr-4 flex items-center gap-3 rounded-r-full border-l-4 border-[#D32F2F] bg-red-50/50 px-6 py-3.5 font-bold text-[#D32F2F] transition-all"
          >
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-sm">Profile</span>
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="mx-auto w-full max-w-5xl flex-1 p-4 lg:p-10">
        {/* Mobile Header & Avatar */}
        <div className="mb-8 flex flex-col items-center pt-4 lg:hidden">
          <div className="relative mb-3">
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}&background=D32F2F&color=fff`}
              alt={user.name}
              className="h-24 w-24 rounded-full border-4 border-white shadow-md"
            />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">{user.name}</h2>
          <p className="mt-1 text-xs font-bold tracking-widest text-gray-400 uppercase">
            Member since 2026
          </p>
        </div>

        <div className="mb-8 hidden lg:block">
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-gray-900">
            Personal Information
          </h1>
          <p className="max-w-2xl text-sm text-gray-500">
            Keep your vital data current. Accurate records ensure you're always
            ready to save a life when the pulse calls.
          </p>
        </div>

        {/* Global Action Messages */}
        {actionData?.success && (
          <div className="mb-6 rounded-2xl border border-green-100 bg-green-50 p-4 text-center text-sm font-bold text-green-700">
            {actionData.message}
          </div>
        )}
        {actionData?.error && (
          <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 p-4 text-center text-sm font-bold text-red-700">
            {actionData.message}
          </div>
        )}

        <div className="flex flex-col-reverse gap-6 lg:flex-row lg:gap-10">
          {/* LEFT COLUMN: The Form */}
          <div className="flex flex-[2] flex-col gap-6">
            <Form
              method="post"
              className="flex h-full flex-col rounded-[32px] border border-gray-100 bg-white p-6 shadow-sm lg:p-8"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="border-l-4 border-[#D32F2F] pl-3 text-lg font-extrabold text-gray-900 lg:border-none lg:pl-0">
                  Account Details
                </h3>
                <span className="hidden text-xs font-bold text-[#D32F2F] lg:block">
                  Edit Profile
                </span>
              </div>

              <div className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={user.name}
                    required
                    className="w-full rounded-2xl border-none bg-[#F4F4F5] px-5 py-4 text-sm font-medium text-gray-900 transition-all outline-none focus:ring-2 focus:ring-[#D32F2F]/20"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={user.email}
                    required
                    className="w-full rounded-2xl border-none bg-[#F4F4F5] px-5 py-4 text-sm font-medium text-gray-900 transition-all outline-none focus:ring-2 focus:ring-[#D32F2F]/20"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    defaultValue={user.mobileNumber}
                    required
                    className="w-full rounded-2xl border-none bg-[#F4F4F5] px-5 py-4 text-sm font-medium text-gray-900 transition-all outline-none focus:ring-2 focus:ring-[#D32F2F]/20"
                  />
                </div>

                {/* Gender Toggles */}
                <div>
                  <label className="mb-2 block text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                    Gender
                  </label>
                  <input type="hidden" name="gender" value={selectedGender} />
                  <div className="flex gap-2">
                    {['male', 'female', 'other'].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setSelectedGender(g)}
                        className={`flex-1 rounded-2xl border py-4 text-sm font-bold capitalize transition-all ${selectedGender === g ? 'border-red-200 bg-red-50 text-[#D32F2F]' : 'border-transparent bg-[#F4F4F5] text-gray-600 hover:bg-gray-200'}`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto flex flex-col justify-end gap-3 border-t border-gray-50 pt-6 lg:flex-row">
                <Link to="/">
                  {' '}
                  <button
                    type="button"
                    className="px-6 py-4 text-sm font-bold text-gray-500 transition-colors hover:text-gray-900"
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D32F2F] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-red-900/20 transition-colors hover:bg-red-800 disabled:opacity-70 lg:w-auto"
                >
                  {isSubmitting ? 'Saving...' : 'Save All Changes'}
                </button>
              </div>
            </Form>
          </div>

          {/* RIGHT COLUMN: Static Info Cards */}
          <div className="flex flex-1 flex-col gap-6">
            {/* Blood Type Card */}
            <div className="relative overflow-hidden rounded-[32px] bg-[#D32F2F] p-6 text-white shadow-lg shadow-red-500/20 lg:p-8">
              <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
              <p className="mb-2 text-[10px] font-bold tracking-widest uppercase opacity-80">
                My Blood Type
              </p>
              <div className="relative z-10 flex items-center justify-between">
                <h3 className="text-6xl font-extrabold">{user.bloodType}</h3>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S12 3 12 3s-4.5 4.97-4.5 9 2.015 9 4.5 9z"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs font-bold backdrop-blur-sm">
                <svg
                  className="h-3.5 w-3.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Verified Donor
              </div>
            </div>

            {/* Next Eligibility Card */}
            <div className="relative overflow-hidden rounded-[32px] border border-green-100 bg-white p-6 shadow-sm lg:p-8">
              <div className="absolute top-0 left-0 h-2 w-full bg-green-500"></div>
              <p className="mt-2 mb-1 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                Next Eligibility
              </p>
              <h3 className="mb-6 text-2xl font-extrabold text-gray-900">
                {user.nextAvailableDate
                  ? new Date(user.nextAvailableDate).toLocaleDateString(
                      'en-US',
                      { month: 'short', day: 'numeric', year: 'numeric' }
                    )
                  : 'Available Now'}
              </h3>

              <div className="mb-2 flex justify-between text-[10px] font-bold tracking-widest uppercase">
                <span className="text-green-700">Recovery Progress</span>
                <span className="text-gray-900">{progress}%</span>
              </div>
              <div className="mb-4 h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-2.5 rounded-full bg-green-500 transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-xs leading-relaxed text-gray-500">
                {progress === 100
                  ? 'You are fully recovered and ready to donate again. Schedule an appointment today!'
                  : 'You are nearly recovered. Stay hydrated and eat iron-rich foods!'}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
