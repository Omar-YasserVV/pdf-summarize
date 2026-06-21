import { apiClient } from "@/utils"
import api from "@/utils/AxiosInstance"

const BASE_URL = "/api/Documents"

export interface QuizPayload {
  session_id: string
  language: string
}

export interface ChatPayload {
  session_id: string
  message: string
}

export interface ComparePayload {
  book_a_session_id: string
  book_b_session_id: string
  topic_query: string
}

export const documentFeaturesApis = {
  getQuiz: async (payload: QuizPayload): Promise<any> => {
    const formData = new FormData()
    formData.append("session_id", payload.session_id)
    formData.append("language", payload.language)

    return apiClient.post(`${BASE_URL}/quiz`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },

  sendChat: async (payload: ChatPayload): Promise<any> => {
    const formData = new FormData()
    formData.append("session_id", payload.session_id)
    formData.append("sessionId", payload.session_id) // Sending both just to be safe based on swagger
    formData.append("message", payload.message)

    return apiClient.post(`${BASE_URL}/chat`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },

  compareTopics: async (payload: ComparePayload): Promise<any> => {
    return apiClient.post(`${BASE_URL}/compare-topics`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  },
}
