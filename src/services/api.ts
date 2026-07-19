// services/api.ts
// Lightweight API client for E-Katale backend communication.
// All network calls go through this module for consistent error handling.

const BASE_URL = 'https://api.ekatale.ug/v1'; // TODO: replace with real backend URL

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          // TODO: inject auth token from SecureStore when available
          // 'Authorization': `Bearer ${token}`,
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorBody = await response.text();
        return { success: false, error: errorBody || `HTTP ${response.status}` };
      }

      const data = await response.json();
      return { success: true, data };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Network request failed',
      };
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async put<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const api = new ApiClient(BASE_URL);