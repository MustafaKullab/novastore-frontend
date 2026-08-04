import { defineStore } from "pinia";
import { fetchWithRefresh } from "../../public/fetchWithRefresh";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [],
    productspagination: {},
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
    ordersPagination: {},
    lengthOutOfStockProducts: 0,
    allOrders: [],
    product: null,
    messages: [],
    specificMessage: {},
    loading: false,
  }),
  actions: {
    async getProducts({ page = 1, limit = 8, categoryId = null, min = null, max = null } = {}) {
      try {
        this.loading = true;

        console.log(page);

        let url = `${import.meta.env.VITE_API_URL}/products?page=${page}&limit=${limit}`;

        if (min !== null && max !== null) {
          url += `&minPrice=${min}&maxPrice=${max}`;
        }

        if (categoryId) {
          url += `&categoryIdFilt=${categoryId}`;
        }

        const response = await fetchWithRefresh(url, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        this.productspagination = data.pagination || {
          hasPrevPage: false,
          hasNextPage: false,
          currentPage: 1,
          totalPages: 1,
        };

        this.products = data.products || [];
        console.log(this.products);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async getProductsAdmin() {
      try {
        this.loading = true;

        let url = `${import.meta.env.VITE_API_URL}/productsAdmin`;

        const response = await fetchWithRefresh(url, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        this.products = data.products || [];
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async getProduct(productId) {
      try {
        this.loading = true;
        const response = await fetchWithRefresh(
          `${import.meta.env.VITE_API_URL}/getProduct/${productId}`,
          {
            method: "GET",
            credentials: "include",
          },
        );

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
        const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/cart`, {
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
        const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/productDetail`, {
          method: "POST",
          body: JSON.stringify({ productId }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const data = await response.json();

        console.log(data);

        this.productDetail = data.product;
      } catch (error) {
        console.log(error);
      }
    },
    async getCurrentOrder(orderId) {
      const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/getOrder`, {
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

    async getAllOrders({ page = 1, limit = 6, search = null } = {}) {
      console.log(page, limit);
      console.log("Done!");

      let url = `${import.meta.env.VITE_API_URL}/allOrders?page=${page}&limit=${limit}`;

      if (search) {
        url += `&search=${search}`;
      }

      const response = await fetchWithRefresh(url, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      console.log(data);

      this.ordersPagination = data.pagination;
      this.orders = data.orders;
    },

    async getTotalProducts() {
      const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/totalProducts`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        this.totalProducts = data.totalProducts;
      }
    },

    async getTotalOrders() {
      const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/totalOrders`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        this.totalOrders = data.totalOrders;
      }
    },

    async getTotalUsers() {
      const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/totalUsers`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        this.totalUsers = data.totalUsers;
      }
    },

    async getRevenue() {
      const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/revenue`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        this.revenue = data.revenue;
      }
    },

    async getLatestOrders() {
      const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/latestOrders`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        this.latestOrders = data.latestOrders;
      }
    },

    async getRecentMessages() {
      const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/recentMessages`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        this.recentMessages = data.recentMessages;
      }
    },

    async getLowStockProducts() {
      const response = await fetchWithRefresh(
        `${import.meta.env.VITE_API_URL}/lowStockProducts?sort=priceAsc`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (data.success) {
        this.lowStockProducts = data.products;
      }
    },

    async getOutOfStockLength() {
      const response = await fetchWithRefresh(
        `${import.meta.env.VITE_API_URL}/outOfStockProducts`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (data.success) {
        this.lengthOutOfStockProducts = data.outOfStock;
      }
    },

    async getAllOrdersOfUsers() {
      const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/orders`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      this.allOrders = data.orders;
    },

    async getMessages() {
      const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/getMessages`, {
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
        `${import.meta.env.VITE_API_URL}/specificMessage/${messageId}`,
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
