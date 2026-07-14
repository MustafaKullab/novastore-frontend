import { defineStore } from "pinia";
import { fetchWithRefresh } from "../../public/fetchWithRefresh";

export const useUserStore = defineStore("users", {
  state: () => ({
    user: null,
    users: [],
  }),

  getters: {},

  actions: {
    async getUser() {
      const response = await fetchWithRefresh("http://localhost:7000/getUser", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        this.user = data.user;
        console.log(data.user);
      }
    },

    async getUsers() {
      const response = await fetchWithRefresh("http://localhost:7000/getUsers", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      console.log(data);

      this.users = data.users;
    },
  },
});
