import axios, { AxiosInstance } from "axios";
import {
  ApiError,
  getErrorMessage,
  getNetworkErrorMessage,
} from "./Errorhandlers";
import { RetryConfig, getRetryDelay, shouldRetry, sleep } from "./Retry";
import { useAuthStore } from "../store/useAuthStore";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const applyInterceptors = (api: AxiosInstance): void => {
  // Request Interceptor: Attach the JWT token
  api.interceptors.request.use(
    (config) => {
      const token = useAuthStore.getState().token;
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor: Handle errors, retry logic, and token refreshes
  api.interceptors.response.use(
    (response) => response,

    async (error) => {
      // No response — offline or hard CORS block
      if (!error.response) {
        const message = getNetworkErrorMessage(error.code === "ECONNABORTED");
        return Promise.reject(new ApiError(0, message));
      }

      const { status, data, headers } = error.response;
      const config = error.config as RetryConfig & { _retry?: boolean };

      // Avoid token refresh loop or triggering it on authentication endpoints
      const isAuthEndpoint =
        config.url?.includes("/api/Auth/login") ||
        config.url?.includes("/api/Auth/register") ||
        config.url?.includes("/api/Auth/refresh");

      // Handle token expiration (401 Unauthorized) for non-auth endpoints
      if (status === 401 && !isAuthEndpoint && !config._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              config.headers = config.headers || {};
              config.headers.Authorization = `Bearer ${token}`;
              return api(config);
            })
            .catch((err) => Promise.reject(err));
        }

        config._retry = true;
        isRefreshing = true;

        const currentRefreshToken = useAuthStore.getState().refreshToken;
        if (!currentRefreshToken) {
          useAuthStore.getState().clearAuth();
          if (typeof window !== "undefined") {
            window.location.href = "/sign-in";
          }
          return Promise.reject(
            new ApiError(status, "Session expired. Please log in again.", data)
          );
        }

        try {
          const baseURL = api.defaults.baseURL || "https://moahmmed24-001-site1.ctempurl.com";
          const refreshUrl = `${baseURL.replace(/\/$/, "")}/api/Auth/refresh`;

          // Send request to refresh endpoint. Use fresh axios instance to prevent recursive interceptors.
          const response = await axios.post<unknown>(
            refreshUrl,
            { refreshToken: currentRefreshToken },
            { headers: { "Content-Type": "application/json" } }
          );

          const responseData = response.data;
          let newAccessToken = "";
          let newRefreshToken = "";

          if (responseData && typeof responseData === "object") {
            if ("data" in responseData && responseData.data && typeof responseData.data === "object") {
              const innerData = responseData.data as Record<string, unknown>;
              newAccessToken = (innerData.accessToken || innerData.token) as string;
              newRefreshToken = (innerData.refreshToken || currentRefreshToken) as string;
            } else {
              const flatData = responseData as Record<string, unknown>;
              newAccessToken = (flatData.accessToken || flatData.token) as string;
              newRefreshToken = (flatData.refreshToken || currentRefreshToken) as string;
            }
          }

          if (newAccessToken) {
            useAuthStore.getState().setAuth(newAccessToken, newRefreshToken);
            processQueue(null, newAccessToken);

            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(config);
          } else {
            throw new Error("No token returned from refresh endpoint.");
          }
        } catch (refreshError) {
          processQueue(refreshError as Error, null);
          useAuthStore.getState().clearAuth();
          if (typeof window !== "undefined") {
            window.location.href = "/sign-in";
          }
          return Promise.reject(
            new ApiError(401, "Your session has expired. Please log in again.")
          );
        } finally {
          isRefreshing = false;
        }
      }

      // Auto-retry transient failures before surfacing any error.
      // Spread config to avoid mutating the original object — mutation can
      // cause the retry counter to be lost if axios clones the config internally.
      if (shouldRetry(status, config._retryCount ?? 0)) {
        const retryCount = (config._retryCount ?? 0) + 1;
        const retryConfig: RetryConfig = { ...config, _retryCount: retryCount };
        await sleep(getRetryDelay(retryCount, headers["retry-after"]));
        return api(retryConfig);
      }

      // Throw a typed ApiError with a human-readable message.
      const message = getErrorMessage(status, data);
      return Promise.reject(new ApiError(status, message, data));
    }
  );
};
