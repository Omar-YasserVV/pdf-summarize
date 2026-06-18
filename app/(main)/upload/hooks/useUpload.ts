"use client";

import { useMutation } from "@tanstack/react-query";
import { uploadApis, SummarizeFilePayload, SummarizeUrlPayload, SummarizeResponse } from "../api/upload";

export function useSummarizeFileMutation() {
  return useMutation<SummarizeResponse, Error, SummarizeFilePayload>({
    mutationFn: async (payload) => {
      const response = await uploadApis.summarizeFile(payload)
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
      const response = await uploadApis.summarizeUrl(payload)
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
