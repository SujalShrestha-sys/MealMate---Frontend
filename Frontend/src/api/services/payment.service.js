import apiClient from "../apiClient";

const paymentService = {
  // Initiate a payment (Khalti or Cash)
  initiatePayment: (orderId, method, returnUrl) => {
    return apiClient.post("/payments/initiate", {
      orderId,
      method,
      returnUrl,
    });
  },

  // Verify Khalti payment after redirect
  verifyPayment: (pidx) => {
    return apiClient.post("/payments/verify", { pidx });
  },
};

export default paymentService;
