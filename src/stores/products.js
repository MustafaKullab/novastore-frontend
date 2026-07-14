import { defineStore } from "pinia";
import { fetchWithRefresh } from "../../public/fetchWithRefresh";
export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [],
    cart: { _id: null, userId: null, items: [] },
    productDetail: null,
    currentOrder: null,
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    latestOrders: [],
    revenue: 0,
    recentMessages: [],
    lowStockProducts: [],
    orders: [],
    lengthOutOfStockProducts: 0,
    categoriesLength: 0,
    allOrders: [],
    product: null,
    messages: [],
    specificMessage: {},
    loading: false,
  }),
  actions: {
    async getProducts() {
      try {
        this.loading = true;
        const response = await fetchWithRefresh("http://localhost:7000/products", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        this.products = data.products;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async getProduct(productId) {
      try {
        this.loading = true;
        const response = await fetchWithRefresh(`http://localhost:7000/getProduct/${productId}`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (data.success) {
          this.product = data.product;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async getCart() {
      try {
        const response = await fetchWithRefresh("http://localhost:7000/cart", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        const defaultCart = {
          _id: null,
          userId: null,
          items: [],
        };
        this.cart = data.cart || { ...defaultCart };
      } catch (error) {
        console.log(error);
      }
    },
    async getProductDetail(productId) {
      try {
        const response = await fetchWithRefresh("http://localhost:7000/productDetail", {
          method: "POST",
          body: JSON.stringify({ productId }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const data = await response.json();

        this.productDetail = data.product;
      } catch (error) {
        console.log(error);
      }
    },
    async getCurrentOrder(orderId) {
      const response = await fetchWithRefresh("http://localhost:7000/getOrder", {
        method: "POST",
        body: JSON.stringify({ orderId: orderId }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        this.currentOrder = data.order;
      }
    },

    async getAllOrders() {
      const response = await fetchWithRefresh("http://localhost:7000/allOrders", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      this.orders = data.orders;
    },

    async getTotalProducts() {
      const response = await fetchWithRefresh("http://localhost:7000/totalProducts", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        this.totalProducts = data.totalProducts;
      }
    },

    async getTotalOrders() {
      const response = await fetchWithRefresh("http://localhost:7000/totalOrders", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        this.totalOrders = data.totalOrders;
      }
    },

    async getTotalUsers() {
      const response = await fetchWithRefresh("http://localhost:7000/totalUsers", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        this.totalUsers = data.totalUsers;
      }
    },

    async getRevenue() {
      const response = await fetchWithRefresh("http://localhost:7000/revenue", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        this.revenue = data.revenue;
      }
    },

    async getLatestOrders() {
      const response = await fetchWithRefresh("http://localhost:7000/latestOrders", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        this.latestOrders = data.latestOrders;
      }
    },

    async getRecentMessages() {
      const response = await fetchWithRefresh("http://localhost:7000/recentMessages", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        this.recentMessages = data.recentMessages;
      }
    },

    async getLowStockProducts() {
      const response = await fetchWithRefresh("http://localhost:7000/lowStockProducts", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        this.lowStockProducts = data.products;
      }
    },

    async getOutOfStockLength() {
      const response = await fetchWithRefresh("http://localhost:7000/outOfStockProducts", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        this.lengthOutOfStockProducts = data.outOfStock;
      }
    },

    async getCategoriesLength() {
      const response = await fetchWithRefresh("http://localhost:7000/lenghCategories", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        this.categoriesLength = data.categoriesLength;
      }
    },

    async getAllOrdersOfUsers() {
      const response = await fetchWithRefresh("http://localhost:7000/orders", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      this.allOrders = data.orders;
    },

    async getMessages() {
      const response = await fetchWithRefresh("http://localhost:7000/getMessages", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        this.messages = data.messages;
      }
    },

    async getSpecificMessage(messageId) {
      const response = await fetchWithRefresh(
        `http://localhost:7000/specificMessage/${messageId}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const data = await response.json();

      console.log(data);
      if (data.success) {
        this.specificMessage = data.message;
        console.log(this.specificMessage);
      }
    },
  },
});
