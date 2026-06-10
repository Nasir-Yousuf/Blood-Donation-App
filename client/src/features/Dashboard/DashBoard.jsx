'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import api from '../../api/axiosInstance';
import { setCredentials, logout } from '../../store/slices/authSlice';

import Sidebar from './components/Sidebar';
import StatsRow from './components/StatsRow';
import VitalProfileCard from './components/VitalProfileCard';
import RecentActivity from './components/RecentActivity';
import ImpactMilestones from './components/ImpactMilestones';

export default function DashBoard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, token } = useSelector((state) => state.auth);

  const [dashboardData, setDashboardData] = useState(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

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
        const donationsAway = nextTierGoal - totalDonations;

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
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#F8F9FA]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-current border-t-transparent text-[#D32F2F]"></div>
      </div>
    );
  }

  const { stats, milestone, activity } = dashboardData;
  const firstName = user?.name?.split(' ')[0] || 'Hero';

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-[#F8F9FA] font-sans text-gray-900">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 lg:flex-row lg:gap-10 lg:p-10">
          
          <div className="flex flex-1 flex-col gap-6">
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

            <StatsRow 
              user={user} 
              stats={stats} 
              isUpdatingStatus={isUpdatingStatus} 
              handleToggleStatus={handleToggleStatus} 
            />

            <div className="block lg:hidden">
              <VitalProfileCard user={user} />
            </div>

            <RecentActivity activity={activity} />
            <ImpactMilestones milestone={milestone} />
          </div>

          <div className="hidden w-[320px] shrink-0 flex-col gap-6 lg:flex">
            <VitalProfileCard user={user} />
          </div>
        </div>
      </main>
    </div>
  );
}
