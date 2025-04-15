import { useState, useCallback, useEffect, DependencyList } from 'react';
import { AxiosError, AxiosRequestConfig } from 'axios';
import axiosInstance from '../axios-inst';

/**
 * Interface for API error response with message
 */
interface ApiErrorResponse {
  message: string;
  [key: string]: unknown; // Use unknown instead of any for additional properties
}

/**
 * Interface for API response with data, loading, and error states
 */
interface ApiResponse<T> {
  /** API response data */
  data: T | null;
  /** Loading status */
  loading: boolean;
  /** Error object if request failed */
  error: string | null;
  /** Function to execute the API request */
  execute: () => Promise<T | undefined>;
}

/**
 * Default response type for API calls when no specific type is provided
 */
interface DefaultResponseType {
  [key: string]: unknown;
}

/**
 * Custom hook for making API calls with loading and error states
 *
 * @param url - The API endpoint URL
 * @param options - Axios request configuration
 * @returns Object with data, loading, error states and execute function
 */
export function useApi<T = DefaultResponseType>(
  url: string,
  options: AxiosRequestConfig = {}
): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance({
        url,
        ...options,
      });

      setData(response.data);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      const errorResponse = axiosError.response?.data as ApiErrorResponse | undefined;
      const errorMessage = errorResponse?.message || axiosError.message || 'An error occurred';
      setError(errorMessage);
      console.error('API Error:', errorMessage);
      return undefined;
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  return { data, loading, error, execute };
}

/**
 * Interface for API fetch response
 */
interface ApiFetchResponse<T> {
  /** API response data */
  data: T | null;
  /** Loading status */
  loading: boolean;
  /** Error object if request failed */
  error: string | null;
  /** Function to re-execute the API request */
  refetch: () => Promise<void>;
}

/**
 * Custom hook for fetching data as soon as component mounts
 *
 * @param url - The API endpoint URL
 * @param options - Axios request configuration
 * @param deps - Additional dependencies for the effect
 * @returns Object with data, loading, and error states
 */
export function useFetch<T = DefaultResponseType>(
  url: string,
  options: AxiosRequestConfig = {},
  deps: DependencyList = []
): ApiFetchResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance({
        url,
        ...options,
      });

      setData(response.data);
    } catch (err) {
      const axiosError = err as AxiosError;
      const errorResponse = axiosError.response?.data as ApiErrorResponse | undefined;
      const errorMessage = errorResponse?.message || axiosError.message || 'An error occurred';
      setError(errorMessage);
      console.error('API Error:', errorMessage);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  // Execute the fetch when component mounts or dependencies change
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, ...deps]);

  // Return states and a refetch method
  return { data, loading, error, refetch: fetchData };
}
