import { apiClient } from "@/utils"

export interface HistoryItem {
  id: string
  date: string
  filename: string
  format: string
  language: string
  summary: string
}

export interface HistoryData {
  history: HistoryItem[]
}

export interface HistoryResponse {
  success: boolean
  message: string | null
  data: HistoryData
  error: string | null
}

const BASE_URL = "/api/Documents"

export const historyApis = {
  getHistory: async (): Promise<HistoryResponse> => {
    return apiClient.get<HistoryResponse>(`${BASE_URL}/history`)
  },
}
