import apiClient from "../apiClient";

const orderService = {
  // Create a new order (also creates payment)
  createOrder: (data) => {
    return apiClient.post("/admin/orders/create", data);
  },

  // Get orders for a specific user
  getOrdersByUser: (userId) => {
    return apiClient.get(`/admin/orders/user/${userId}`);
  },

  // Cancel an order
  cancelOrder: (orderId) => {
    return apiClient.delete(`/admin/orders/${orderId}/cancel`);
  },
};

export default orderService;
