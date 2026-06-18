"use client"

import React from 'react'
import { Loader2, AlertCircle } from 'lucide-react'
import ProfileHeader from './components/ProfileHeader'
import DashboardStats from './components/DashboardStats'
import UpgradePremium from './components/UpgradePremium'
import ActivitySummary from './components/ActivitySummary'
import AchievementsGrid from './components/AchievementsGrid'
import { useProfileDashboardQuery } from '../settings/hooks/useProfile'

function Profile() {
  const { data, isLoading, isError, error } = useProfileDashboardQuery()

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
        <p className="text-sm text-slate-400">Loading profile...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center space-y-3 my-10 max-md:mx-6">
        <AlertCircle className="h-8 w-8 text-red-400 mx-auto" />
        <h4 className="font-bold text-sm text-slate-200">Failed to load profile details</h4>
        <p className="text-xs text-slate-400">
          {error?.message || 'An unexpected error occurred while fetching your profile statistics.'}
        </p>
      </div>
    )
  }

  const profileData = data?.data || {
    counters: { totalDocuments: 0, totalSummaries: 0, totalFavorites: 0, hoursSaved: 0 },
    activity: { today: 0, yesterday: 0, thisWeek: 0, thisMonth: 0 },
    achievements: [],
  }

  return (
    <div className="flex flex-col gap-5 py-5 max-md:px-6">
      <ProfileHeader />
      <DashboardStats counters={profileData.counters} thisWeekCount={profileData.activity.thisWeek} />
      <UpgradePremium />
      <ActivitySummary activity={profileData.activity} />
      <AchievementsGrid counters={profileData.counters} activity={profileData.activity} />
    </div>
  )
}

export default Profile

