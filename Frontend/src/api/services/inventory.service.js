import apiClient from "../apiClient";

const inventoryService = {
  // Get all inventory items with pagination and search
  getInventoryItems: async (page = 1, limit = 10, search = "") => {
    return apiClient.get("/admin/inventory", {
      params: { page, limit, search },
    });
  },

  // Get items that are below their low stock threshold
  getLowStockItems: async () => {
    return apiClient.get("/admin/inventory/low-stock");
  },

  //Create a new inventory item
  createInventoryItem: async (data) => {
    return apiClient.post("/admin/inventory", data);
  },

  // Adjust stock for an existing item
  adjustStock: async (id, type, amount) => {
    return apiClient.patch(`/admin/inventory/${id}/adjust`, { type, amount });
  },

  // Update item details
  updateInventoryItem: async (id, data) => {
    return apiClient.put(`/admin/inventory/${id}`, data);
  },

  // Delete (soft delete) an inventory item
  deleteInventoryItem: async (id) => {
    return apiClient.delete(`/admin/inventory/${id}`);
  },
};

export default inventoryService;
