import apiClient from "../apiClient";

const subscriptionService = {
  // Get all active subscription plans
  getPlans: () => {
    return apiClient.get("/plans");
  },

  // Get current user's active/pending subscription
  getMySubscription: () => {
    return apiClient.get("/plans/my-subscription");
  },

  // Initiate purchase of a subscription plan
  purchasePlan: (planId) => {
    return apiClient.post("/plans/purchase", { planId });
  },

  // Get subscription history
  getHistory: () => {
    return apiClient.get("/plans/history");
  },

  // Cancel subscription
  cancelSubscription: (subscriptionId) => {
    return apiClient.delete(`/plans/${subscriptionId}/cancel`);
  },

  // Admin: Get all subscriptions
  getAllSubscriptions: () => {
    return apiClient.get("/plans/all");
  },

  // Admin: Cancel ANY subscription
  cancelSubscriptionAdmin: (subscriptionId) => {
    return apiClient.delete(`/plans/admin/${subscriptionId}/cancel`);
  },
};

export default subscriptionService;
