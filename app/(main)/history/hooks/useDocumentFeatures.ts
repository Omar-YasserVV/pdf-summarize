"use client"

import { useMutation } from "@tanstack/react-query"
import {
  documentFeaturesApis,
  QuizPayload,
  ChatPayload,
  ComparePayload,
} from "../api/documentFeatures"

export function useQuizMutation() {
  return useMutation<any, Error, QuizPayload>({
    mutationFn: async (payload) => {
      const rawResponse = (await documentFeaturesApis.getQuiz(payload)) as any

      // Normalize PascalCase keys
      const success = rawResponse.success !== undefined ? rawResponse.success : rawResponse.Success
      const message = rawResponse.message !== undefined ? rawResponse.message : rawResponse.Message
      const error = rawResponse.error !== undefined ? rawResponse.error : rawResponse.Error
      const data = rawResponse.data !== undefined ? rawResponse.data : rawResponse.Data

      if (!success) {
        throw new Error(message || error || "Failed to generate quiz.")
      }

      return data
    },
  })
}

export function useChatMutation() {
  return useMutation<any, Error, ChatPayload>({
    mutationFn: async (payload) => {
      const rawResponse = (await documentFeaturesApis.sendChat(payload)) as any

      // Normalize PascalCase keys
      const success = rawResponse.success !== undefined ? rawResponse.success : rawResponse.Success
      const message = rawResponse.message !== undefined ? rawResponse.message : rawResponse.Message
      const error = rawResponse.error !== undefined ? rawResponse.error : rawResponse.Error
      const data = rawResponse.data !== undefined ? rawResponse.data : rawResponse.Data

      if (!success) {
        throw new Error(message || error || "Failed to send chat message.")
      }

      return data
    },
  })
}

export function useCompareMutation() {
  return useMutation<any, Error, ComparePayload>({
    mutationFn: async (payload) => {
      const rawResponse = (await documentFeaturesApis.compareTopics(payload)) as any

      // Normalize PascalCase keys
      const success = rawResponse.success !== undefined ? rawResponse.success : rawResponse.Success
      const message = rawResponse.message !== undefined ? rawResponse.message : rawResponse.Message
      const error = rawResponse.error !== undefined ? rawResponse.error : rawResponse.Error
      const data = rawResponse.data !== undefined ? rawResponse.data : rawResponse.Data

      if (!success) {
        throw new Error(message || error || "Failed to compare topics.")
      }

      return data
    },
  })
}
