import { ENV } from '../config/env';
import { TokenManager } from './TokenManager';
import { HttpMethod } from './HttpMethods';
import { NetworkError } from './NetworkError';

type RequestConfig = {
  endpoint: string;
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
  requiresAuth?: boolean;
  signal?: AbortSignal;
};

class ApiClient {
  private static instance: ApiClient;

  private constructor() {}

  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  private buildHeaders(
    customHeaders?: Record<string, string>,
    requiresAuth: boolean = false
  ) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...customHeaders,
    };

    if (requiresAuth) {
      const token = TokenManager.getToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    return headers;
  }

  async request<T>({
    endpoint,
    method = 'GET',
    body,
    headers,
    requiresAuth = false,
    signal,
  }: RequestConfig): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      ENV.TIMEOUT
    );

    try {
      const response = await fetch(`${ENV.BASE_URL}${endpoint}`, {
        method,
        headers: this.buildHeaders(headers, requiresAuth),
        body: body ? JSON.stringify(body) : undefined,
        signal: signal ?? controller.signal,
      });

      const contentType = response.headers.get('content-type');
      const data = contentType?.includes('application/json')
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        throw new NetworkError(
          data?.message || 'Request failed',
          response.status,
          data
        );
      }

      return data as T;
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw new NetworkError('Request timeout');
      }

      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  // Convenience methods
  get<T>(endpoint: string, requiresAuth = false) {
    return this.request<T>({ endpoint, method: 'GET', requiresAuth });
  }

  post<T>(endpoint: string, body?: any, requiresAuth = false) {
    return this.request<T>({
      endpoint,
      method: 'POST',
      body,
      requiresAuth,
    });
  }

  put<T>(endpoint: string, body?: any, requiresAuth = false) {
    return this.request<T>({
      endpoint,
      method: 'PUT',
      body,
      requiresAuth,
    });
  }

  delete<T>(endpoint: string, requiresAuth = false) {
    return this.request<T>({
      endpoint,
      method: 'DELETE',
      requiresAuth,
    });
  }

  patch<T>(endpoint: string, body?: any, requiresAuth = false) {
    return this.request<T>({
      endpoint,
      method: 'PATCH',
      body,
      requiresAuth,
    });
  }
}

export const apiClient = ApiClient.getInstance();
