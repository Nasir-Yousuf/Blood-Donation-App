import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLoaderData } from 'react-router-dom';
import api from '../../api/axiousInstance';
import { setCredentials } from '../../store/slices/authSlice';

// ==========================================
// 1. DASHBOARD LOADER (The API Brain)
// ==========================================
export const dashboardLoader = async () => {
  try {
    const [donationsRes, requestsRes, nearbyRes] = await Promise.all([
      api.get('/requests/my-donations').catch(() => ({ data: { data: [] } })),
      api.get('/requests/my-requests').catch(() => ({ data: { data: [] } })),
      api.get('/requests/nearby/20').catch(() => ({ data: { data: [] } })),
    ]);

    const donations = donationsRes.data?.data || [];
    const requests = requestsRes.data?.data || [];
    const nearby = nearbyRes.data?.data || [];

    const totalDonations = donations.length;
    const requestsMade = requests.length;

    let milestoneLevel = 'Bronze';
    let nextTierGoal = 5;

    if (totalDonations >= 15) {
      milestoneLevel = 'Gold';
      nextTierGoal = 30;
    } else if (totalDonations >= 5) {
      milestoneLevel = 'Silver';
      nextTierGoal = 15;
    }

    const milestonePercent = Math.min(
      100,
      Math.round((totalDonations / nextTierGoal) * 100)
    );
    const donationsAway = nextTierGoal - totalDonations;

    // Safely stitch together activity, ensuring dates fallback to now if missing
    const rawActivity = [
      ...donations.map((d) => ({
        id: `don-${d._id}`,
        type: 'donation',
        title: 'You helped save a life',
        desc: 'Successfully donated blood',
        date: new Date(d.updatedAt || d.createdAt || Date.now()),
        icon: 'Heart',
        bg: 'bg-red-100',
        text: 'text-red-600',
      })),
      ...requests.map((r) => ({
        id: `req-${r._id}`,
        type: 'request',
        title: 'You made a request',
        desc: `Emergency ${r.bloodType || 'blood'} needed`,
        date: new Date(r.createdAt || Date.now()),
        icon: 'Speakerphone',
        bg: 'bg-blue-100',
        text: 'text-blue-600',
      })),
      ...nearby.map((n) => ({
        id: `near-${n._id}`,
        type: 'nearby',
        title: 'New request nearby',
        desc: 'Emergency needed in your area',
        date: new Date(n.createdAt || Date.now()),
        icon: 'Location',
        bg: 'bg-teal-100',
        text: 'text-teal-600',
      })),
    ];

    const recentActivity = rawActivity
      .sort((a, b) => b.date - a.date)
      .slice(0, 4)
      .map((activity) => {
        const diffHrs = Math.floor(
          (Date.now() - activity.date.getTime()) / (1000 * 60 * 60)
        );
        activity.timeAgo =
          diffHrs < 24 ? `${diffHrs}h ago` : `${Math.floor(diffHrs / 24)}d ago`;
        return activity;
      });

    return {
      stats: { totalDonations, requestsMade },
      milestone: {
        level: milestoneLevel,
        percent: milestonePercent,
        donationsAway,
      },
      activity: recentActivity,
    };
  } catch (error) {
    console.error('Dashboard Loader Failed:', error);
    return {
      stats: { totalDonations: 0, requestsMade: 0 },
      milestone: { level: 'Bronze', percent: 0, donationsAway: 5 },
      activity: [],
    };
  }
};

// ==========================================
// 2. ICONS
// ==========================================
const Icons = {
  Dashboard: () => (
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
  ),
  Drop: () => (
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
        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S12 3 12 3s-4.5 4.97-4.5 9 2.015 9 4.5 9z"
      />
    </svg>
  ),
  Location: () => (
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
    </svg>
  ),
  Heart: () => (
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
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  ),
  Settings: () => (
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
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  Speakerphone: () => (
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
        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
      />
    </svg>
  ),
};

// ==========================================
// 3. HELPER COMPONENTS
// ==========================================
const SidebarItem = ({ icon, text, active }) => (
  <Link
    to="#"
    className={`flex items-center gap-3 px-6 py-3 font-medium transition-all ${active ? 'border-l-4 border-[#D32F2F] bg-red-50/50 text-[#D32F2F]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
  >
    {icon}
    <span className="text-sm">{text}</span>
  </Link>
);

const getBloodTypeInfo = (bloodType) => {
  if (!bloodType) return 'Pending...';
  if (bloodType === 'O-') return 'Universal Donor';
  if (bloodType === 'AB+') return 'Universal Recipient';
  return 'High Demand';
};

const formatDate = (dateString) => {
  if (!dateString) return 'Available Now';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Available Now'; // Safety check for invalid strings
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

// ==========================================
// 4. MAIN DASHBOARD
// ==========================================
export default function DashBoard() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const dashboardData = useLoaderData();
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const handleToggleStatus = async () => {
    if (!user) return;
    setIsUpdatingStatus(true);
    const newStatus = !user.isAvailable;

    try {
      await api.patch('/users/updateMe', { isAvailable: newStatus });
      dispatch(
        setCredentials({ user: { ...user, isAvailable: newStatus }, token })
      );
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status. Please try again.');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Wait for Redux to hydrate or loader data to return
  if (!user || !dashboardData) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#F8F9FA]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-current border-t-transparent text-[#D32F2F]"></div>
      </div>
    );
  }

  const { stats, milestone, activity } = dashboardData;
  const firstName = user?.name?.split(' ')[0] || 'Hero';

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-[#F8F9FA] font-sans text-gray-900">
      {/* LEFT SIDEBAR (Desktop Only) */}
      <aside className="sticky top-0 z-20 hidden h-screen w-[260px] shrink-0 flex-col border-r border-gray-100 bg-white py-8 lg:flex">
        <nav className="flex flex-1 flex-col gap-1">
          <SidebarItem icon={<Icons.Dashboard />} text="Dashboard" active />
          <SidebarItem icon={<Icons.Drop />} text="Donations" />
          <SidebarItem icon={<Icons.Location />} text="Centers" />
          <SidebarItem icon={<Icons.Heart />} text="Impact" />
          <Link
            to="/settings"
            className="flex items-center gap-3 px-6 py-3 font-medium text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-900"
          >
            <Icons.Settings /> <span className="text-sm">Settings</span>
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex min-w-0 flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 lg:flex-row lg:gap-10 lg:p-10">
          {/* LEFT COLUMN: Main Stats & Activity */}
          <div className="flex flex-1 flex-col gap-6">
            {/* Greeting */}
            <div className="mb-2 pt-4 lg:mb-4 lg:pt-0">
              <h2 className="mb-2 text-3xl font-extrabold tracking-tight text-gray-900 lg:text-4xl">
                Welcome back,
                <br className="lg:hidden" /> {firstName}.
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-gray-500 lg:text-base">
                <span className="hidden lg:inline">
                  Your last donation helped three patients recover. Your
                  presence is the heartbeat of our community.
                </span>
                <span className="lg:hidden">
                  Your generosity has directly impacted lives. Check your stats
                  and current availability below.
                </span>
              </p>
            </div>

            {/* Stats Row */}
            <div className="flex flex-col gap-4 lg:flex-row">
              {/* 1. Donor Status Card */}
              <div className="relative flex min-h-[160px] flex-1 flex-col justify-between overflow-hidden rounded-[24px] bg-[#D32F2F] p-6 text-white shadow-lg shadow-red-500/20 lg:max-w-[240px]">
                <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-2xl"></div>
                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                    <Icons.Drop />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-[10px] font-bold tracking-widest uppercase opacity-80 lg:hidden">
                      Status
                    </span>
                    <button
                      onClick={handleToggleStatus}
                      disabled={isUpdatingStatus}
                      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${user?.isAvailable ? 'bg-white' : 'bg-red-900'} disabled:opacity-50`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full transition-transform ${user?.isAvailable ? 'translate-x-6 bg-[#D32F2F]' : 'translate-x-1 bg-white'}`}
                      />
                    </button>
                  </div>
                </div>
                <div className="relative z-10 mt-4">
                  <p className="mb-1 hidden text-[10px] font-bold tracking-widest uppercase opacity-80 lg:block">
                    Donor Status
                  </p>
                  <h3 className="text-2xl font-bold lg:text-xl">
                    {user?.isAvailable ? 'Donor Active' : 'On Standby'}
                  </h3>
                  <p className="mt-1 text-xs text-red-200 lg:hidden">
                    You are visible to local hospitals
                  </p>
                </div>
              </div>

              {/* 2 & 3. Secondary Stats */}
              <div className="flex flex-1 flex-col gap-4 sm:flex-row">
                {/* Total Donations */}
                <div className="flex min-h-[160px] flex-1 flex-col justify-between rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                      <Icons.Heart />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-4xl font-extrabold text-gray-900 lg:text-3xl">
                      {stats?.totalDonations || 0}
                    </h3>
                    <p className="mt-1 text-xs font-bold tracking-wider text-gray-400 uppercase">
                      Total Donations
                    </p>
                  </div>
                </div>

                {/* Requests Made */}
                <div className="flex min-h-[160px] flex-1 flex-col justify-between rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icons.Speakerphone />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-4xl font-extrabold text-gray-900 lg:text-3xl">
                      {stats?.requestsMade || 0}
                    </h3>
                    <p className="mt-1 text-xs font-bold tracking-wider text-gray-400 uppercase">
                      Requests Made
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Injection: Vital Profile */}
            <div className="block lg:hidden">
              <VitalProfileCard user={user} />
            </div>

            {/* Recent Activity */}
            <div className="rounded-[32px] border border-gray-100 bg-white p-6 shadow-sm lg:p-8">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">
                  Recent Activity
                </h3>
                <Link
                  to="#"
                  className="text-xs font-bold tracking-wider text-[#D32F2F] uppercase hover:text-red-800"
                >
                  See All
                </Link>
              </div>

              {!activity || activity.length === 0 ? (
                <div className="py-6 text-center text-sm text-gray-500">
                  No recent activity found.
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {activity.map((item) => {
                    const IconComp = Icons[item.icon];
                    return (
                      <div key={item.id} className="flex items-start gap-4">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${item.bg} ${item.text}`}
                        >
                          <IconComp />
                        </div>
                        <div className="flex-1 border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                          <div className="flex items-start justify-between">
                            <p className="text-sm font-bold text-gray-900">
                              {item.title}
                            </p>
                          </div>
                          <p className="mt-1 pr-4 text-xs leading-relaxed text-gray-500">
                            {item.desc}{' '}
                            <span className="mx-1 text-gray-300">•</span>{' '}
                            {item.timeAgo}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Impact Milestones */}
            <div className="relative overflow-hidden rounded-[32px] bg-gray-100 p-6 lg:p-8">
              <svg
                className="absolute right-0 bottom-0 h-40 w-40 translate-x-10 translate-y-10 text-white opacity-50"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <div className="relative z-10">
                <div className="mb-4 flex items-end justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Impact Milestones
                    </h3>
                    <p className="mt-1 max-w-[200px] text-xs text-gray-500 lg:max-w-none">
                      <span className="hidden lg:inline">
                        You're only {milestone?.donationsAway || 5} donations
                        away from '{milestone?.level || 'Silver'}' tier.
                      </span>
                      <span className="lg:hidden">
                        {milestone?.donationsAway || 5} more donations until
                        your '{milestone?.level || 'Silver'}' badge.
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="hidden text-[10px] font-bold tracking-widest text-gray-400 uppercase lg:block">
                      Level: {milestone?.level || 'Bronze'}
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#006064] lg:text-xs lg:text-gray-900">
                      {milestone?.percent || 0}%{' '}
                      <span className="hidden font-medium text-gray-500 lg:inline">
                        Complete
                      </span>
                    </p>
                  </div>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-300">
                  <div
                    className="h-2.5 rounded-full bg-[#006064] transition-all duration-1000"
                    style={{ width: `${milestone?.percent || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Vital Profile (Desktop) */}
          <div className="hidden w-[320px] shrink-0 flex-col gap-6 lg:flex">
            <VitalProfileCard user={user} />
          </div>
        </div>
      </main>
    </div>
  );
}

// ==========================================
// 5. VITAL PROFILE CARD COMPONENT
// ==========================================
const VitalProfileCard = ({ user }) => (
  <div className="relative flex h-full flex-col overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-sm">
    <div className="relative hidden h-32 overflow-hidden bg-[#8B0000] lg:block">
      <img
        src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        alt="Blood cells"
        className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-overlay"
      />
      {user?.isAvailable && (
        <span className="absolute bottom-4 left-6 flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[9px] font-bold tracking-widest text-white uppercase backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400"></span> Active
          Donor
        </span>
      )}
    </div>

    <div className="flex flex-1 flex-col p-6 lg:p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="mb-1 text-[10px] font-bold tracking-widest text-gray-400 uppercase lg:hidden">
            Your Vital Profile
          </p>
          <p className="mb-1 hidden text-[10px] font-bold tracking-widest text-gray-400 uppercase lg:block">
            Vital Profile
          </p>
          <div className="flex items-center gap-3 lg:block">
            <h3 className="rounded-full bg-[#D32F2F] px-4 py-1.5 text-3xl font-extrabold text-gray-900 text-white lg:bg-transparent lg:px-0 lg:py-0 lg:text-2xl lg:text-gray-900">
              Type {user?.bloodType || 'N/A'}
            </h3>
            <p className="mt-0 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-[#006064] lg:mt-1 lg:bg-transparent lg:px-0 lg:py-0 lg:text-[#006064]">
              {getBloodTypeInfo(user?.bloodType)}
            </p>
          </div>
        </div>
        <div className="flex hidden h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-red-50 text-lg font-extrabold text-[#D32F2F] shadow-sm lg:flex">
          {user?.bloodType?.replace(/[+-]/g, '') || ''}
        </div>
      </div>

      <p className="mb-8 text-xs leading-relaxed text-gray-500 lg:hidden">
        Your blood type is critical for matching. Keep your availability status
        updated.
      </p>

      <div className="mb-8 flex hidden flex-col gap-4 lg:flex">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Next Eligible</span>
          <span className="font-bold text-teal-600">
            {formatDate(user?.nextAvailableDate)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Gender Data</span>
          <span className="font-bold text-gray-900 capitalize">
            {user?.gender || 'Not specified'}
          </span>
        </div>
      </div>

      {/* Mobile Bottom Image Decoration */}
      <div className="relative mt-4 h-24 overflow-hidden rounded-xl bg-gray-100 lg:hidden">
        <img
          src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
          alt="Blood cells"
          className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-multiply"
        />
      </div>
    </div>
  </div>
);
