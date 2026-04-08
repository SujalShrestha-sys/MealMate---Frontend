import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  // 45 seconds — enough time for Render cold starts (can take 30-50s)
  timeout: 45000,
});

// Add access token to every request if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------- Retry Helper ----------
// Retries a failed request up to `maxRetries` times with increasing delays
// Only retries on network errors (no response) or 503 (server warming up)
async function retryRequest(error, maxRetries = 2) {
  const config = error.config;

  // Don't retry if we've already retried enough
  config._retryCount = config._retryCount || 0;
  if (config._retryCount >= maxRetries) {
    return Promise.reject(error);
  }

  // Only retry for network errors or 503 (server warming up)
  const isNetworkError = !error.response;
  const isServerWarmingUp = error.response?.status === 503;

  if (!isNetworkError && !isServerWarmingUp) {
    return Promise.reject(error);
  }

  config._retryCount += 1;

  // Show a friendly message on first retry only
  if (config._retryCount === 1) {
    toast.loading("Server is waking up... please wait", {
      id: "server-wakeup",
      duration: 10000,
    });
  }

  // Wait before retrying: 3s, then 6s
  const delay = config._retryCount * 3000;
  await new Promise((resolve) => setTimeout(resolve, delay));

  return apiClient(config);
}

// ---------- Response Interceptor ----------
apiClient.interceptors.response.use(
  (response) => {
    // Clear the "waking up" toast if it's showing
    toast.dismiss("server-wakeup");
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config || {};
    const status = error.response?.status;
    const message = error.response?.data?.message || "Something went wrong";

    // --- Token refresh logic (unchanged) ---
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/auth/refresh-token`,
          {},
          { withCredentials: true },
        );

        const newToken = refreshResponse.data?.tokens?.accessToken;
        if (!newToken) throw new Error("No access token returned");

        localStorage.setItem("accessToken", newToken);
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        toast.error("Session expired. Please login again.");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // --- Retry logic for cold starts ---
    // If the server is sleeping or unreachable, retry automatically
    if (!error.response || status === 503) {
      try {
        const result = await retryRequest(error);
        return result;
      } catch (retryError) {
        // All retries failed — show a clear message
        toast.dismiss("server-wakeup");
        toast.error(
          "Server is still starting up. Please wait a moment and try again.",
          { duration: 5000 },
        );
        return Promise.reject(retryError);
      }
    }

    // --- Normal error handling ---
    if (status === 403) {
      toast.error("You do not have permission.");
    } else if (status === 404) {
      toast.error("Resource not found.");
    } else if (status === 500) {
      toast.error("Server error. Please try again later.");
    } else {
      toast.error(message);
    }

    return Promise.reject(error);
  },
);

// ---------- Wake Up Server ----------
// Call this once when the app loads to proactively wake the backend
// so by the time the user clicks "Login", the server is already ready
let wakeUpPromise = null;

export function wakeUpServer() {
  if (wakeUpPromise) return wakeUpPromise;

  wakeUpPromise = axios
    .get(`${API_BASE_URL}/health`, { timeout: 60000 })
    .then((res) => {
      console.log("[WakeUp] Server is ready:", res.data?.status);
      return true;
    })
    .catch(() => {
      console.log("[WakeUp] Server might still be starting...");
      return false;
    });

  return wakeUpPromise;
}

export default apiClient;
