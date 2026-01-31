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
  timeout?: number;
  retries?: number;
};

type RequestInterceptor = (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
type ResponseInterceptor = <T>(response: T) => T | Promise<T>;
type ErrorInterceptor = (error: any) => any | Promise<any>;

class ApiClient {
  private static instance: ApiClient;
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];
  private errorInterceptors: ErrorInterceptor[] = [];

  private constructor() {}

  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  // Interceptor methods
  addRequestInterceptor(interceptor: RequestInterceptor) {
    this.requestInterceptors.push(interceptor);
  }

  addResponseInterceptor(interceptor: ResponseInterceptor) {
    this.responseInterceptors.push(interceptor);
  }

  addErrorInterceptor(interceptor: ErrorInterceptor) {
    this.errorInterceptors.push(interceptor);
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

  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async executeWithRetry<T>(
    requestFn: () => Promise<T>,
    retries: number = 0
  ): Promise<T> {
    try {
      return await requestFn();
    } catch (error: any) {
      if (retries > 0 && this.shouldRetry(error)) {
        await this.sleep(1000 * (4 - retries)); // Exponential backoff
        return this.executeWithRetry(requestFn, retries - 1);
      }
      throw error;
    }
  }

  private shouldRetry(error: any): boolean {
    // Retry on network errors, timeouts, and 5xx server errors
    return (
      error.name === 'AbortError' ||
      error.name === 'TypeError' 
      // ||
      // (error instanceof NetworkError && error.status >= 500)
    );
  }

  async request<T>({
    endpoint,
    method = 'GET',
    body,
    headers,
    requiresAuth = false,
    signal,
    timeout = ENV.TIMEOUT,
    retries = 2,
  }: RequestConfig): Promise<T> {
    // Apply request interceptors
    let config: RequestConfig = {
      endpoint,
      method,
      body,
      headers,
      requiresAuth,
      signal,
      timeout,
      retries,
    };

    for (const interceptor of this.requestInterceptors) {
      config = await interceptor(config);
    }

    const requestFn = async (): Promise<T> => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), config.timeout);

      try {
        const response = await fetch(`${ENV.BASE_URL}${config.endpoint}`, {
          method: config.method,
          headers: this.buildHeaders(config.headers, config.requiresAuth),
          body: config.body ? JSON.stringify(config.body) : undefined,
          signal: config.signal ?? controller.signal,
        });

        const contentType = response.headers.get('content-type');
        let data: any;

        if (contentType?.includes('application/json')) {
          data = await response.json();
        } else {
          data = await response.text();
        }

        if (!response.ok) {
          const error = new NetworkError(
            data?.message || `HTTP ${response.status}: ${response.statusText}`,
            response.status,
            data
          );
          
          // Apply error interceptors
          for (const interceptor of this.errorInterceptors) {
            await interceptor(error);
          }
          
          throw error;
        }

        // Apply response interceptors
        let result = data as T;
        for (const interceptor of this.responseInterceptors) {
          result = await interceptor(result);
        }

        return result;
      } catch (error: any) {
        if (error.name === 'AbortError') {
          const timeoutError = new NetworkError('Request timeout', 408);
          
          // Apply error interceptors
          for (const interceptor of this.errorInterceptors) {
            await interceptor(timeoutError);
          }
          
          throw timeoutError;
        }

        // Apply error interceptors for other errors
        if (!(error instanceof NetworkError)) {
          const networkError = new NetworkError(
            error.message || 'Network request failed',
            0,
            error
          );
          
          for (const interceptor of this.errorInterceptors) {
            await interceptor(networkError);
          }
          
          throw networkError;
        }

        throw error;
      } finally {
        clearTimeout(timeoutId);
      }
    };

    return this.executeWithRetry(requestFn, config.retries || 0);
  }

  // Convenience methods
  get<T>(endpoint: string, options: Omit<RequestConfig, 'endpoint' | 'method'> = {}) {
    return this.request<T>({ endpoint, method: 'GET', ...options });
  }

  post<T>(endpoint: string, body?: any, options: Omit<RequestConfig, 'endpoint' | 'method' | 'body'> = {}) {
    return this.request<T>({
      endpoint,
      method: 'POST',
      body,
      ...options,
    });
  }

  put<T>(endpoint: string, body?: any, options: Omit<RequestConfig, 'endpoint' | 'method' | 'body'> = {}) {
    return this.request<T>({
      endpoint,
      method: 'PUT',
      body,
      ...options,
    });
  }

  delete<T>(endpoint: string, options: Omit<RequestConfig, 'endpoint' | 'method'> = {}) {
    return this.request<T>({
      endpoint,
      method: 'DELETE',
      ...options,
    });
  }

  patch<T>(endpoint: string, body?: any, options: Omit<RequestConfig, 'endpoint' | 'method' | 'body'> = {}) {
    return this.request<T>({
      endpoint,
      method: 'PATCH',
      body,
      ...options,
    });
  }
}

export const apiClient = ApiClient.getInstance();

// Add default interceptors
apiClient.addRequestInterceptor((config) => {
  console.log(`🚀 API Request: ${config.method} ${config.endpoint}`);
  return config;
});

apiClient.addResponseInterceptor((response) => {
  console.log('✅ API Response received');
  return response;
});

apiClient.addErrorInterceptor((error) => {
  console.error('❌ API Error:', error.message);
  return Promise.reject(error);
});
