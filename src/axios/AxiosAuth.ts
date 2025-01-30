import axios from "axios";

const axiosAuth = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the Bearer token
axiosAuth.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
axiosAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token (e.g., 401 Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      try {
        // Refresh the access token using the refresh token
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token found");
        }

        const response = await axios.post("http://localhost:3001/auth/refresh-token", { refreshToken });

        const { accessToken: newAccessToken } = response.data;

        // Update the access token in local storage and headers
        localStorage.setItem("accessToken", newAccessToken);
        axiosAuth.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

        // Retry the original request with the new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosAuth(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure (e.g., logout the user)
        console.error("Failed to refresh token:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // Redirect to login page
        return Promise.reject(refreshError);
      }
    }

    // If the error is not due to token expiration, reject the promise
    return Promise.reject(error);
  }
);

export default axiosAuth;
