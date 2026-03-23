import apiClient from "../apiClient";

const paymentService = {
  // Initiate a payment (Khalti or Cash)
  initiatePayment: (data) => {
    return apiClient.post("/payments/initiate", data);
  },

  // Verify Khalti payment after redirect
  verifyPayment: (pidx) => {
    return apiClient.post("/payments/verify", { pidx });
  },
};

export default paymentService;
