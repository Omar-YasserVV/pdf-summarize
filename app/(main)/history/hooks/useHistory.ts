"use client"

import { useQuery } from "@tanstack/react-query"
import { historyApis, HistoryResponse, HistoryItem } from "../api/history"

export function useHistoryQuery() {
  return useQuery<HistoryResponse, Error>({
    queryKey: ["history"],
    queryFn: async () => {
      const rawResponse = (await historyApis.getHistory()) as any

      // Normalize PascalCase response keys to camelCase
      const success = rawResponse.success !== undefined ? rawResponse.success : rawResponse.Success
      const message = rawResponse.message !== undefined ? rawResponse.message : rawResponse.Message
      const error = rawResponse.error !== undefined ? rawResponse.error : rawResponse.Error

      const rawData = rawResponse.data !== undefined ? rawResponse.data : rawResponse.Data
      
      const rawHistoryList = rawData 
        ? (rawData.history !== undefined ? rawData.history : rawData.History)
        : []

      const historyList: HistoryItem[] = Array.isArray(rawHistoryList)
        ? rawHistoryList.map((item: any) => ({
            id: item.id !== undefined ? item.id : item.Id,
            date: item.date !== undefined ? item.date : item.Date,
            filename: item.filename !== undefined ? item.filename : item.Filename,
            format: item.format !== undefined ? item.format : item.Format,
            language: item.language !== undefined ? item.language : item.Language,
            summary: item.summary !== undefined ? item.summary : item.Summary,
          }))
        : []

      const response: HistoryResponse = {
        success,
        message,
        error,
        data: {
          history: historyList,
        },
      }

      if (!response.success) {
        throw new Error(response.message || response.error || "Failed to fetch history.")
      }

      return response
    },
  })
}
