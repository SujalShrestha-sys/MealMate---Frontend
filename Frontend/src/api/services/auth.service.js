import apiClient from "../apiClient";

const authService = {
  /**
   * Login user
   * Backend sets refreshToken as httpOnly cookie automatically.
   * We only store the accessToken in localStorage.
   */
  login: async (credentials) => {
    const response = await apiClient.post("/auth/login", credentials);
    if (response.tokens?.accessToken) {
      localStorage.setItem("accessToken", response.tokens.accessToken);
    }
    return response;
  },

  /**
   * Register a new user
   */
  register: async (userData) => {
    return await apiClient.post("/auth/register", userData);
  },

  /**
   * Refresh access token.
   * The refreshToken is sent as httpOnly cookie (handled by browser).
   */
  refreshToken: async () => {
    const response = await apiClient.post("/auth/refresh-token");
    if (response.tokens?.accessToken) {
      localStorage.setItem("accessToken", response.tokens.accessToken);
    }
    return response;
  },

  /**
   * Logout — clears localStorage tokens.
   * Optionally call a backend logout endpoint to invalidate the cookie.
   */
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  /**
   * Forget Password
   */
  forgetPassword: async (email) => {
    return await apiClient.post("/auth/forget-password", { email });
  },

  /**
   * Reset Password
   */
  resetPassword: async (token, password, confirmPassword) => {
    return await apiClient.post(`/auth/reset-password/${token}`, {
      password,
      confirmPassword,
    });
  },
};

export default authService;
