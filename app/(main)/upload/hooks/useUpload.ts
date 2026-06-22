"use client";

import { useMutation } from "@tanstack/react-query";
import { uploadApis, SummarizeFilePayload, SummarizeUrlPayload, SummarizeResponse } from "../api/upload";

export function useSummarizeFileMutation() {
  return useMutation<SummarizeResponse, Error, SummarizeFilePayload>({
    mutationFn: async (payload) => {
      const rawResponse = (await uploadApis.summarizeFile(payload)) as any

      const rawSuccess = rawResponse.success !== undefined 
        ? rawResponse.success 
        : (rawResponse.Success !== undefined ? rawResponse.Success : null)
      
      const success = rawSuccess !== null 
        ? !!rawSuccess 
        : (!!rawResponse.summary || !!rawResponse.Summary || !!rawResponse.id || !!rawResponse.Id)

      // Normalize PascalCase response keys to camelCase
      const response: SummarizeResponse = {
        success,
        id: rawResponse.id !== undefined ? rawResponse.id : rawResponse.Id,
        saved: rawResponse.saved !== undefined 
          ? !!rawResponse.saved 
          : (rawResponse.Saved !== undefined ? !!rawResponse.Saved : true),
        message: rawResponse.message !== undefined ? rawResponse.message : (rawResponse.Message || null),
        error: rawResponse.error !== undefined ? rawResponse.error : (rawResponse.Error || null),
        data: (() => {
          const rawData = rawResponse.data !== undefined ? rawResponse.data : rawResponse.Data
          if (rawData) {
            if (typeof rawData === "string") return rawData
            return {
              summary: rawData.summary !== undefined ? rawData.summary : rawData.Summary,
            }
          }
          const summary = rawResponse.summary !== undefined ? rawResponse.summary : rawResponse.Summary
          if (summary) {
            return {
              summary,
            }
          }
          return ""
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

      const rawSuccess = rawResponse.success !== undefined 
        ? rawResponse.success 
        : (rawResponse.Success !== undefined ? rawResponse.Success : null)
      
      const success = rawSuccess !== null 
        ? !!rawSuccess 
        : (!!rawResponse.summary || !!rawResponse.Summary || !!rawResponse.id || !!rawResponse.Id)

      // Normalize PascalCase response keys to camelCase
      const response: SummarizeResponse = {
        success,
        id: rawResponse.id !== undefined ? rawResponse.id : rawResponse.Id,
        saved: rawResponse.saved !== undefined 
          ? !!rawResponse.saved 
          : (rawResponse.Saved !== undefined ? !!rawResponse.Saved : true),
        message: rawResponse.message !== undefined ? rawResponse.message : (rawResponse.Message || null),
        error: rawResponse.error !== undefined ? rawResponse.error : (rawResponse.Error || null),
        data: (() => {
          const rawData = rawResponse.data !== undefined ? rawResponse.data : rawResponse.Data
          if (rawData) {
            if (typeof rawData === "string") return rawData
            return {
              summary: rawData.summary !== undefined ? rawData.summary : rawData.Summary,
            }
          }
          const summary = rawResponse.summary !== undefined ? rawResponse.summary : rawResponse.Summary
          if (summary) {
            return {
              summary,
            }
          }
          return ""
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
