"use client";

import { useMutation } from "@tanstack/react-query";
import { uploadApis, SummarizeFilePayload, SummarizeUrlPayload, SummarizeResponse } from "../api/upload";

export function useSummarizeFileMutation() {
  return useMutation<SummarizeResponse, Error, SummarizeFilePayload>({
    mutationFn: async (payload) => {
      const rawResponse = (await uploadApis.summarizeFile(payload)) as any

      // Normalize PascalCase response keys to camelCase
      const response: SummarizeResponse = {
        success: rawResponse.success !== undefined ? rawResponse.success : rawResponse.Success,
        message: rawResponse.message !== undefined ? rawResponse.message : rawResponse.Message,
        error: rawResponse.error !== undefined ? rawResponse.error : rawResponse.Error,
        data: (() => {
          const rawData = rawResponse.data !== undefined ? rawResponse.data : rawResponse.Data
          if (!rawData) return ""
          if (typeof rawData === "string") return rawData
          return {
            summary: rawData.summary !== undefined ? rawData.summary : rawData.Summary,
          }
        })(),
      }

      if (!response.success) {
        throw new Error(response.message || response.error || "Failed to summarize document.")
      }
      return response
    },
  })
}

export function useSummarizeUrlMutation() {
  return useMutation<SummarizeResponse, Error, SummarizeUrlPayload>({
    mutationFn: async (payload) => {
      const rawResponse = (await uploadApis.summarizeUrl(payload)) as any

      // Normalize PascalCase response keys to camelCase
      const response: SummarizeResponse = {
        success: rawResponse.success !== undefined ? rawResponse.success : rawResponse.Success,
        message: rawResponse.message !== undefined ? rawResponse.message : rawResponse.Message,
        error: rawResponse.error !== undefined ? rawResponse.error : rawResponse.Error,
        data: (() => {
          const rawData = rawResponse.data !== undefined ? rawResponse.data : rawResponse.Data
          if (!rawData) return ""
          if (typeof rawData === "string") return rawData
          return {
            summary: rawData.summary !== undefined ? rawData.summary : rawData.Summary,
          }
        })(),
      }

      if (!response.success) {
        throw new Error(response.message || response.error || "Failed to summarize web page.")
      }
      return response
    },
  })
}

export function useExportPdfMutation() {
  return useMutation<Blob, Error, string>({
    mutationFn: async (sessionId) => {
      return uploadApis.exportPdf(sessionId)
    },
  })
}

export function useExportDocxMutation() {
  return useMutation<Blob, Error, string>({
    mutationFn: async (sessionId) => {
      return uploadApis.exportDocx(sessionId)
    },
  })
}
