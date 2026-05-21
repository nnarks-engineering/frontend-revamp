import type { AxiosError } from "axios";

/**
 * Extract the human-readable error message from a backend API error.
 *
 * The backend returns `{"detail": "..."}` for all AppError subclasses.
 * Falls back to the Error message, then to a generic fallback string.
 */
export function getApiError(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  if (typeof error === "object" && error !== null && "response" in error) {
    const axiosErr = error as AxiosError<{ detail?: unknown }>;
    const detail = axiosErr.response?.data?.detail;
    if (typeof detail === "string" && detail.length > 0) {
      return detail;
    }
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
}
