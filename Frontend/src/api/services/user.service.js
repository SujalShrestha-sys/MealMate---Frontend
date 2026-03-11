import apiClient from "../apiClient";

/**
 * User Service
 * Manages user-specific data and profiles.
 */
const userService = {
  /**
   * Update User Profile
   * @param {Object} data
   */
  updateProfile: async (data) => {
    return await apiClient.put("/users/profile", data);
  },

  /**
   * Fetch all users (admin only)
   */
  getAllUsers: async () => {
    return await apiClient.get("/users");
  },

  /**
   * Get specific user by ID
   * @param {string} userId
   */
  getUserById: async (userId) => {
    return await apiClient.get(`/users/${userId}`);
  },

  /**
   * Get admin/support user for chat
   */
  getAdminUser: async () => {
    return await apiClient.get("/users/admin");
  },
};

export default userService;
