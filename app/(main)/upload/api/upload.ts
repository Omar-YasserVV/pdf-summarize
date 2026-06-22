import { apiClient } from "@/utils"
import api from "@/utils/AxiosInstance"

const BASE_URL = "/api/Documents"

export interface SummarizeData {
  summary: string
}

export interface SummarizeResponse {
  success: boolean;
  message: string | null;
  data: SummarizeData | string;
  error: string | null;
  id?: string;
  saved?: boolean;
}

export interface SummarizeFilePayload {
  file: File;
  language: string;
  format?: string;
  length?: string;
  session_id?: string;
}

export interface SummarizeUrlPayload {
  url: string;
  language: string;
  format?: string;
  length?: string;
  session_id?: string;
}

const generateUUID = () => {
  if (typeof window !== "undefined" && window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export const uploadApis = {
  summarizeFile: async (payload: SummarizeFilePayload): Promise<SummarizeResponse> => {
    const formData = new FormData()
    formData.append("file", payload.file)
    formData.append("language", payload.language)
    if (payload.format) {
      formData.append("format", payload.format)
    }
    formData.append("length", payload.length || "medium")
    formData.append("session_id", payload.session_id || generateUUID())

    return apiClient.post<SummarizeResponse>(`${BASE_URL}/summarize`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },

  summarizeUrl: async (payload: SummarizeUrlPayload): Promise<SummarizeResponse> => {
    const formData = new FormData()
    formData.append("url", payload.url)
    formData.append("language", payload.language)
    if (payload.format) {
      formData.append("format", payload.format)
    }
    formData.append("length", payload.length || "medium")
    formData.append("session_id", payload.session_id || generateUUID())

    return apiClient.post<SummarizeResponse>(`${BASE_URL}/summarize-url`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },

  exportPdf: async (sessionId: string): Promise<Blob> => {
    const formData = new FormData()
    formData.append("session_id", sessionId)

    return api.post(`${BASE_URL}/export/pdf`, formData, {
      responseType: "blob",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => res.data)
  },

  exportDocx: async (sessionId: string): Promise<Blob> => {
    const formData = new FormData()
    formData.append("session_id", sessionId)

    return api.post(`${BASE_URL}/export/docx`, formData, {
      responseType: "blob",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => res.data)
  },
}