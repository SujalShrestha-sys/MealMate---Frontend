import apiClient from "../apiClient";

const pickupSlotService = {
  // Get all pickup slots
  getSlots: () => {
    return apiClient.get("/pickup-slots");
  },

  // Get a single slot by ID
  getSlotById: (id) => {
    return apiClient.get(`/pickup-slots/${id}`);
  },
};

export default pickupSlotService;
