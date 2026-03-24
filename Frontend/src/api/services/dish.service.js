import apiClient from "../apiClient";

const dishService = {
  // Get all dishes (paginated)
  getAllDishes: (page = 1, limit = 8) => {
    return apiClient.get(`/dishes?page=${page}&limit=${limit}`);
  },

  // Create a new dish
  createDish: (data) => {
    // data: { name, description, price, imageUrl, categoryName, badge }
    return apiClient.post("/dishes/create", data);
  },

  // Update a dish
  updateDish: (id, data) => {
    return apiClient.put(`/dishes/${id}`, data);
  },

  // Delete a dish (soft delete)
  deleteDish: (id) => {
    return apiClient.delete(`/dishes/${id}`);
  },

  // Get a single dish
  getSingleDish: (id) => {
    return apiClient.get(`/dishes/${id}`);
  },

  // Search dishes
  searchDishes: (query, page = 1, limit = 10) => {
    return apiClient.get(`/dishes/search?item=${query}&page=${page}&limit=${limit}`);
  },

  // Get all categories with their dishes
  getAllCategories: () => {
    return apiClient.get("/dishes/categories");
  },

  // Get dishes by category
  getByCategory: (category, page = 1, limit = 10) => {
    return apiClient.get(`/dishes/category/${category}?page=${page}&limit=${limit}`);
  },
};

export default dishService;
