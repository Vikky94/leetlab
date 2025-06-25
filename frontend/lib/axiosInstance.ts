import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

// Define StorageKeys enum (based on assumption)
enum StorageKeys {
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
}

const API_URL: string = "http://localhost:8080/api/v1";

interface RefreshTokenResponse {
  data: {
    accessToken: string;
    refreshToken?: string;
  };
}

class ApiClient {
  private axiosConfig: AxiosInstance;

  constructor() {
    this.axiosConfig = axios.create({
      baseURL: API_URL,
      withCredentials: true,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }
  // Getter to access axios instance
  public getAxiosInstance(): AxiosInstance {
    return this.axiosConfig;
  }

}

const axiosInstance = new ApiClient().getAxiosInstance();

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = localStorage.getItem(StorageKeys.ACCESS_TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError): Promise<never> => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem(StorageKeys.REFRESH_TOKEN);

        if (!refreshToken) {
          localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
          window.location.href = "/login";
          return Promise.reject(error);
        }

        const response = await axios.post<RefreshTokenResponse>(
          `${API_URL}/auth/refresh-token`,
          { refreshToken },
          { withCredentials: true }
        );

        if (response.data?.data?.accessToken) {
          localStorage.setItem(StorageKeys.ACCESS_TOKEN, response.data.data.accessToken);
        }
        if (response.data?.data?.refreshToken) {
          localStorage.setItem(StorageKeys.REFRESH_TOKEN, response.data.data.refreshToken);
        }

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${response.data.data.accessToken}`;
        }
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
        localStorage.removeItem(StorageKeys.REFRESH_TOKEN);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;