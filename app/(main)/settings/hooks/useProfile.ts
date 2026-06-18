"use client"

import { useQuery } from "@tanstack/react-query"
import { profileApis, DashboardResponse, DashboardData } from "../api/profile"

export function useProfileDashboardQuery() {
  return useQuery<DashboardResponse, Error>({
    queryKey: ["profile-dashboard"],
    queryFn: async () => {
      const rawResponse = (await profileApis.getDashboard()) as any

      // Normalize PascalCase response keys to camelCase
      const success = rawResponse.success !== undefined ? rawResponse.success : rawResponse.Success
      const message = rawResponse.message !== undefined ? rawResponse.message : rawResponse.Message
      const error = rawResponse.error !== undefined ? rawResponse.error : rawResponse.Error

      const rawData = rawResponse.data !== undefined ? rawResponse.data : rawResponse.Data

      let dashboardData: DashboardData = {
        counters: {
          totalDocuments: 0,
          totalSummaries: 0,
          totalFavorites: 0,
          hoursSaved: 0,
        },
        activity: {
          today: 0,
          yesterday: 0,
          thisWeek: 0,
          thisMonth: 0,
        },
        achievements: [],
      }

      if (rawData) {
        const rawCounters = rawData.counters !== undefined ? rawData.counters : rawData.Counters
        const rawActivity = rawData.activity !== undefined ? rawData.activity : rawData.Activity
        const rawAchievements = rawData.achievements !== undefined ? rawData.achievements : rawData.Achievements

        if (rawCounters) {
          dashboardData.counters = {
            totalDocuments: rawCounters.totalDocuments !== undefined ? rawCounters.totalDocuments : (rawCounters.TotalDocuments || 0),
            totalSummaries: rawCounters.totalSummaries !== undefined ? rawCounters.totalSummaries : (rawCounters.TotalSummaries || 0),
            totalFavorites: rawCounters.totalFavorites !== undefined ? rawCounters.totalFavorites : (rawCounters.TotalFavorites || 0),
            hoursSaved: rawCounters.hoursSaved !== undefined ? rawCounters.hoursSaved : (rawCounters.HoursSaved || 0),
          }
        }

        if (rawActivity) {
          dashboardData.activity = {
            today: rawActivity.today !== undefined ? rawActivity.today : (rawActivity.Today || 0),
            yesterday: rawActivity.yesterday !== undefined ? rawActivity.yesterday : (rawActivity.Yesterday || 0),
            thisWeek: rawActivity.thisWeek !== undefined ? rawActivity.thisWeek : (rawActivity.ThisWeek || 0),
            thisMonth: rawActivity.thisMonth !== undefined ? rawActivity.thisMonth : (rawActivity.ThisMonth || 0),
          }
        }

        if (Array.isArray(rawAchievements)) {
          dashboardData.achievements = rawAchievements
        }
      }

      const response: DashboardResponse = {
        success,
        message,
        error,
        data: dashboardData,
      }

      if (!response.success) {
        throw new Error(response.message || response.error || "Failed to fetch profile dashboard.")
      }

      return response
    },
  })
}
