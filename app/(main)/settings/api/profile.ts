import { apiClient } from "@/utils"

export interface DashboardCounters {
  totalDocuments: number
  totalSummaries: number
  totalFavorites: number
  hoursSaved: number
}

export interface DashboardActivity {
  today: number
  yesterday: number
  thisWeek: number
  thisMonth: number
}

export interface DashboardData {
  counters: DashboardCounters
  activity: DashboardActivity
  achievements: any[]
}

export interface DashboardResponse {
  success: boolean
  message: string | null
  data: DashboardData
  error: string | null
}

const BASE_URL = "/api/Profile"

export const profileApis = {
  getDashboard: async (): Promise<DashboardResponse> => {
    return apiClient.get<DashboardResponse>(`${BASE_URL}/dashboard`)
  },
}
