'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '../../api/axiosInstance';
import { setCredentials, logout } from '../../store/slices/authSlice';
import { useLanguage } from '../../context/LanguageContext';

import Sidebar from './components/Sidebar';
import StatsRow from './components/StatsRow';
import VitalProfileCard from './components/VitalProfileCard';
import RecentActivity from './components/RecentActivity';
import ImpactMilestones from './components/ImpactMilestones';
import DonationAnalyticsChart from './components/DonationAnalyticsChart';
import BloodDemandRadar from './components/BloodDemandRadar';
import EligibilityCountdownRing from './components/EligibilityCountdownRing';
import BloodCompatibilityCard from './components/BloodCompatibilityCard';
import DigitalDonorPassModal from './components/DigitalDonorPassModal';

export default function DashBoard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, token } = useSelector((state) => state.auth);
  const { t } = useLanguage();

  const [dashboardData, setDashboardData] = useState(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      try {
        const currentToken = localStorage.getItem('jwt_token');
        if (!currentToken) {
          dispatch(logout());
          router.push('/login');
          return;
        }

        let currentUser = user;
        if (!currentUser) {
          try {
            const userRes = await api.get('/users/me');
            currentUser = userRes.data?.data?.user || userRes.data?.user;
            if (!currentUser) throw new Error('User data not found in response');
            dispatch(setCredentials({ user: currentUser, token: currentToken }));
          } catch (err) {
            console.error('Failed to hydrate user profile:', err);
            dispatch(logout());
            router.push('/login');
            return;
          }
        }

        const config = { timeout: 5000 };

        const [donationsRes, requestsRes, nearbyRes] = await Promise.all([
          api.get('/requests/my-donations', config).catch(() => ({ data: { data: [] } })),
          api.get('/requests/my-requests', config).catch(() => ({ data: { data: [] } })),
          api.get('/requests/nearby/20', config).catch(() => ({ data: { data: [] } })),
        ]);

        const donations = donationsRes.data?.data?.requests || [];
        const requests = requestsRes.data?.data?.requests || [];
        const nearby = nearbyRes.data?.data?.requests || [];

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
        const donationsAway = Math.max(1, nextTierGoal - totalDonations);

        const rawActivity = [
          ...donations.map((d) => ({
            id: `don-${d._id}`,
            type: 'donation',
            title: 'You helped save a life',
            desc: 'Successfully donated blood unit',
            date: new Date(d.updatedAt || d.createdAt || Date.now()),
            icon: 'Heart',
            bg: 'bg-red-100 text-red-600',
            text: 'text-red-600',
          })),
          ...requests.map((r) => ({
            id: `req-${r._id}`,
            type: 'request',
            title: 'Emergency Signal Created',
            desc: `Blood needed: ${r.bloodType || 'Urgent'}`,
            date: new Date(r.createdAt || Date.now()),
            icon: 'Speakerphone',
            bg: 'bg-blue-100 text-blue-600',
            text: 'text-blue-600',
          })),
          ...nearby.map((n) => ({
            id: `near-${n._id}`,
            type: 'nearby',
            title: 'Hospital Alert in your area',
            desc: `${n.location?.hospitalName || 'Local Hospital'} requested ${n.bloodType || 'blood'}`,
            date: new Date(n.createdAt || Date.now()),
            icon: 'Location',
            bg: 'bg-teal-100 text-teal-600',
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
              diffHrs < 24 ? `${Math.max(1, diffHrs)}h ago` : `${Math.floor(diffHrs / 24)}d ago`;
            return activity;
          });

        if (isMounted) {
          setDashboardData({
            stats: { totalDonations, requestsMade },
            milestone: {
              level: milestoneLevel,
              percent: milestonePercent,
              donationsAway,
            },
            activity: recentActivity,
          });
        }
      } catch (error) {
        console.error('Dashboard Loader Failed:', error);
        if (isMounted) {
          setDashboardData({
            stats: { totalDonations: 0, requestsMade: 0 },
            milestone: { level: 'Bronze', percent: 0, donationsAway: 5 },
            activity: [],
          });
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [dispatch, router, user]);

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

  if (!user || !dashboardData) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#fafafa] dark:bg-[#0b0f19]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
          <span className="text-xs font-bold text-gray-400">Loading Clinical Dashboard...</span>
        </div>
      </div>
    );
  }

  const { stats, milestone, activity } = dashboardData;
  const firstName = user?.name?.split(' ')[0] || 'Hero';

  return (
    <div className="flex min-h-[calc(100vh-72px)] bg-[#fafafa] font-sans text-gray-900 transition-colors duration-300 dark:bg-[#0b0f19] dark:text-gray-100">
      {/* Collapsible/Sticky Navigation Sidebar */}
      <Sidebar />

      {/* Main Dashboard Container */}
      <main className="flex min-w-0 flex-1 flex-col pb-12">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-4 sm:p-6 lg:p-8">
          
          {/* Header & Quick Action Hub */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200/60 pb-6 dark:border-gray-800/80">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
                  {t('welcomeBackHero', 'Welcome back,')} {firstName}
                </h1>
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {t('dashSubtitle', 'Your presence is the heartbeat of our community. Check your impact and readiness below.')}
              </p>
            </div>

            {/* Quick Actions Row */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/emergency"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-red-500/25 transition-all hover:brightness-105 active:scale-95"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span>{t('broadcastSOS', 'Broadcast Emergency SOS')}</span>
              </Link>

              <button
                onClick={() => setIsPassModalOpen(true)}
                className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-bold text-gray-700 shadow-xs transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <svg className="h-4 w-4 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v2H8V8zm0 4h8v2H8v-2z" />
                </svg>
                <span>{t('digitalDonorCard', 'Donor Pass')}</span>
              </button>
            </div>
          </div>

          {/* 1. Key Performance Metric Cards */}
          <StatsRow 
            user={user} 
            stats={stats} 
            isUpdatingStatus={isUpdatingStatus} 
            handleToggleStatus={handleToggleStatus} 
          />

          {/* 2. Interactive Graphs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 6-Month Donation & Lives Impact Area Chart (2 Cols) */}
            <div className="lg:col-span-2">
              <DonationAnalyticsChart />
            </div>

            {/* Regional Blood Demand Radar / Urgency Bars (1 Col) */}
            <div className="lg:col-span-1">
              <BloodDemandRadar userBloodType={user?.bloodType || 'O+'} />
            </div>
          </div>

          {/* 3. Biological Readiness & Compatibility Suite */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Safe Interval Recovery Ring Gauge */}
            <EligibilityCountdownRing user={user} />

            {/* Interactive Blood Type Compatibility Matrix */}
            <BloodCompatibilityCard currentBloodType={user?.bloodType || 'O+'} />
          </div>

          {/* 4. Gamified Milestones & Recent Signals */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ImpactMilestones milestone={milestone} />
            </div>

            <div className="lg:col-span-1">
              <RecentActivity activity={activity} />
            </div>
          </div>

          {/* 5. Donor Vital Profile Card */}
          <div className="mt-2">
            <VitalProfileCard 
              user={user} 
              onOpenPassModal={() => setIsPassModalOpen(true)} 
            />
          </div>

        </div>
      </main>

      {/* Digital Donor Identity Card Modal */}
      {isPassModalOpen && (
        <DigitalDonorPassModal 
          user={user} 
          onClose={() => setIsPassModalOpen(false)} 
        />
      )}
    </div>
  );
}
