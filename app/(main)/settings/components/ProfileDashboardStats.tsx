"use client"

import React from 'react'
import {
  FileText,
  Sparkles,
  Star,
  Clock,
  Loader2,
  AlertCircle,
  TrendingUp,
} from 'lucide-react'
import { useProfileDashboardQuery } from '../hooks/useProfile'

export default function ProfileDashboardStats() {
  const { data, isLoading, isError, error } = useProfileDashboardQuery()

  if (isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center rounded-3xl border border-slate-800 bg-[#161b2c] p-8 shadow-2xl">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
          <p className="text-sm text-slate-400">Loading profile stats...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6 text-center space-y-3">
        <AlertCircle className="h-8 w-8 text-red-400 mx-auto animate-pulse" />
        <h4 className="font-bold text-sm text-slate-200">Failed to load statistics</h4>
        <p className="text-xs text-slate-400">
          {error?.message || 'An error occurred while loading your profile dashboard data.'}
        </p>
      </div>
    )
  }

  const stats = data?.data
  const counters = stats?.counters || {
    totalDocuments: 0,
    totalSummaries: 0,
    totalFavorites: 0,
    hoursSaved: 0,
  }
  const activity = stats?.activity || {
    today: 0,
    yesterday: 0,
    thisWeek: 0,
    thisMonth: 0,
  }

  const cards = [
    {
      title: 'Total Documents',
      value: counters.totalDocuments,
      icon: FileText,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
    },
    {
      title: 'Total Summaries',
      value: counters.totalSummaries,
      icon: Sparkles,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Total Favorites',
      value: counters.totalFavorites,
      icon: Star,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
    },
    {
      title: 'Hours Saved',
      value: `${counters.hoursSaved}h`,
      icon: Clock,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
    },
  ]

  return (
    <div className="w-full space-y-6">
      {/* Grid of counters */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.title}
            className="flex flex-col gap-2 rounded-2xl border border-slate-800/80 bg-[#161b2c] p-5 transition-all hover:scale-[1.02] hover:border-slate-700 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">{c.title}</span>
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${c.bgColor}`}>
                <c.icon className={`h-4.5 w-4.5 ${c.color}`} />
              </div>
            </div>
            <span className="text-2xl font-bold text-slate-100">{c.value}</span>
          </div>
        ))}
      </div>

      {/* Activity overview card */}
      <div className="rounded-3xl border border-slate-800 bg-[#161b2c] p-6 space-y-4 shadow-2xl">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-cyan-400">
          <TrendingUp className="h-5 w-5" />
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
            Summary Activity Overview
          </h4>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 pt-1">
          {[
            { label: 'Today', value: activity.today },
            { label: 'Yesterday', value: activity.yesterday },
            { label: 'This Week', value: activity.thisWeek },
            { label: 'This Month', value: activity.thisMonth },
          ].map((act) => (
            <div
              key={act.label}
              className="flex flex-col items-center justify-center rounded-xl bg-[#0f172a]/40 p-4 border border-slate-800/50"
            >
              <span className="text-xs font-medium text-slate-500">{act.label}</span>
              <span className="mt-1.5 text-lg font-bold text-slate-300">{act.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
