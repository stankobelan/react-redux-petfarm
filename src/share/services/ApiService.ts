import { AxiosResponse, AxiosError } from 'axios';
import axiosInstance from '../../axios-inst';
import { API_ENDPOINTS } from '../ApiUrl';
import { IFarm, CreateFarmDto, UpdateFarmDto } from '../interfaces/IFarm';
import { IPet } from '../interfaces/IPet';
import { IContactInfo } from '../interfaces/IContactInfo';

/**
 * Interface for API error response with message
 */
interface ApiErrorResponse {
  message: string;
  [key: string]: unknown;
}

/**
 * Service for handling all API requests
 * Centralizes API calls and error handling
 */
export class ApiService {
  /**
   * Get all farms
   * @returns Promise with farms array
   */
  static async getFarms(): Promise<IFarm[]> {
    try {
      const response: AxiosResponse<IFarm[]> = await axiosInstance.get(API_ENDPOINTS.FARMS);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError, 'Failed to fetch farms');
      return [];
    }
  }

  /**
   * Get a specific farm by ID
   * @param id - Farm ID
   * @returns Promise with farm data
   */
  static async getFarmById(id: number): Promise<IFarm | null> {
    try {
      const response: AxiosResponse<IFarm> = await axiosInstance.get(
        `${API_ENDPOINTS.FARMS}/${id}`
      );
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError, `Failed to fetch farm with ID: ${id}`);
      return null;
    }
  }

  /**
   * Create a new farm
   * @param farmData - Farm data to be created
   * @returns Promise with created farm data
   */
  static async createFarm(farmData: CreateFarmDto): Promise<IFarm | null> {
    try {
      const response: AxiosResponse<IFarm> = await axiosInstance.post(
        API_ENDPOINTS.FARMS,
        farmData
      );
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError, 'Failed to create farm');
      return null;
    }
  }

  /**
   * Update an existing farm
   * @param id - Farm ID
   * @param farmData - Updated farm data
   * @returns Promise with updated farm data
   */
  static async updateFarm(id: number, farmData: UpdateFarmDto): Promise<IFarm | null> {
    try {
      const response: AxiosResponse<IFarm> = await axiosInstance.put(
        `${API_ENDPOINTS.FARMS}/${id}`,
        farmData
      );
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError, `Failed to update farm with ID: ${id}`);
      return null;
    }
  }

  /**
   * Delete a farm
   * @param id - Farm ID to delete
   * @returns Promise with success status
   */
  static async deleteFarm(id: number): Promise<boolean> {
    try {
      await axiosInstance.delete(`${API_ENDPOINTS.FARMS}/${id}`);
      return true;
    } catch (error) {
      this.handleError(error as AxiosError, `Failed to delete farm with ID: ${id}`);
      return false;
    }
  }

  /**
   * Get pets for a specific farm
   * @param farmId - Farm ID
   * @returns Promise with pets array
   */
  static async getPetsByFarmId(farmId: number): Promise<IPet[]> {
    try {
      const response: AxiosResponse<IPet[]> = await axiosInstance.get(
        `${API_ENDPOINTS.FARMS}/${farmId}/pets`
      );
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError, `Failed to fetch pets for farm with ID: ${farmId}`);
      return [];
    }
  }

  /**
   * Submit contact form
   * @param contactData - Contact form data
   * @returns Promise with success status
   */
  static async submitContactForm(contactData: IContactInfo): Promise<boolean> {
    try {
      await axiosInstance.post(API_ENDPOINTS.CONTACT, contactData);
      return true;
    } catch (error) {
      this.handleError(error as AxiosError, 'Failed to submit contact form');
      return false;
    }
  }

  /**
   * Generic error handler for API requests
   * @param error - Axios error object
   * @param defaultMessage - Default error message
   */
  private static handleError(
    error: AxiosError,
    defaultMessage: string = 'API request failed'
  ): never {
    const errorResponse = error.response?.data as ApiErrorResponse | undefined;
    const errorMessage = errorResponse?.message || error.message || defaultMessage;
    console.error('API Error:', errorMessage, error);
    throw new Error(errorMessage);
  }
}
