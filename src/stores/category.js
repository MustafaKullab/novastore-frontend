import { defineStore } from "pinia";
import { fetchWithRefresh } from "../../public/fetchWithRefresh";
export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: [],
    selectedCategory: "All",
  }),
  getters: {},

  actions: {
    async getCategories() {
      try {
        const response = await fetchWithRefresh("http://localhost:7000/allCategories", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (data.success) {
          this.categories = data.categories;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async deleteCategory(id) {
      const response = await fetchWithRefresh(`http://localhost:7000/deleteCategory/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      console.log(data);

      if (data.success) {
        await this.getCategories();
      }
    },

    setCategory(category) {
      this.selectedCategory = category;
    },
  },
});
