<template>
  <div class="MyOrders py-4" style="background-color: var(--background-section)">
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link :to="{ name: 'homePage' }" class="text-decoration-none">Home</router-link>
          </li>
          <li class="breadcrumb-item" aria-current="page">
            <router-link
              :to="{
                name: 'myorders',
              }"
              class="text-decoration-none"
              style="color: #9ca4b1"
            >
              My Orders
            </router-link>
          </li>
        </ol>
      </nav>
      <div class="header text-center">
        <h1 class="title">My Orders</h1>
        <p class="text-muted">View and track all the orders you have places.</p>
      </div>
      <div class="displayOrders p-4 bg-white border rounded my-4">
        <div class="filter d-flex align-items-center gap-3 flex-column flex-md-row">
          <div
            class="state all"
            :class="{ active: filterWord === 'all' }"
            @click="filterWord = 'all'"
          >
            All Orders
          </div>
          <div
            class="state pending"
            :class="{ active: filterWord === 'pending' }"
            @click="filterWord = 'pending'"
          >
            Pending
          </div>
          <div
            class="state processing"
            :class="{ active: filterWord === 'processing' }"
            @click="filterWord = 'processing'"
          >
            Processing
          </div>
          <div
            class="state shipped"
            :class="{ active: filterWord === 'shipped' }"
            @click="filterWord = 'shipped'"
          >
            Shipped
          </div>
          <div
            class="state delivered"
            :class="{ active: filterWord === 'delivered' }"
            @click="filterWord = 'delivered'"
          >
            Delivered
          </div>
          <div
            class="state cancelled"
            :class="{ active: filterWord === 'cancelled' }"
            @click="filterWord = 'cancelled'"
          >
            Cancelled
          </div>
        </div>
        <div class="orders mt-5" style="max-height: 600px; overflow: auto" v-if="ordersFiltering">
          <div
            class="order p-3 border rounded d-flex align-items-center justify-content-between mb-3 flex-column flex-lg-row"
            v-for="order of ordersFiltering"
            :key="order._id"
          >
            <div class="orderDate text-center text-lg-start mb-3 mb-lg-0">
              <div class="order_id fw-bold" style="color: var(--main-color)">
                Order #{{ order._id.slice(0, 10) }}
              </div>
              <div class="orderDate text-muted">{{ order.createdAt }}</div>
              <div class="orderTime text-muted">{{ order.time }}</div>
            </div>
            <div class="countOfItems d-flex align-items-center gap-2 mb-3 mb-lg-0">
              <div
                class="icon d-flex align-items-center justify-content-center rounded"
                style="
                  width: 40px;
                  height: 40px;
                  flex-shrink: 0;
                  background-color: #f7f5fc;
                  color: #6047d7;
                "
              >
                <i class="bi bi-box fs-5"></i>
              </div>
              <div class="count">{{ order.items.length }} Items</div>
            </div>
            <div class="total mb-3 mb-lg-0">
              <div>Total</div>
              <div class="fw-bold">${{ order.totalPrice }}</div>
            </div>
            <div class="status mb-3 mb-lg-0 text-center text-lg-start">
              <div class="mb-2">Status</div>
              <div
                class="statusName p-2 rounded"
                :class="order.status"
                :style="{
                  backgroundColor:
                    order.status === 'pending'
                      ? '#e8eaf6'
                      : order.status === 'processing'
                        ? '#fdf4e1'
                        : order.status === 'shipped'
                          ? '#ddeafe'
                          : order.status === 'delivered'
                            ? '#e5f4e5'
                            : '#edeff2',

                  color:
                    order.status === 'pending'
                      ? '#4a148c'
                      : order.status === 'processing'
                        ? '#f4aa0f'
                        : order.status === 'shipped'
                          ? '#2066d9'
                          : order.status === 'delivered'
                            ? '#2c9f38'
                            : '#697281',
                }"
              >
                {{ order.status }}
              </div>
            </div>
            <div class="viewDetailsBtn">
              <router-link
                class="btn btn-mainColor"
                :to="{ name: 'orderDetails', params: { orderId: order._id } }"
              >
                View Details <i class="bi bi-arrow-right"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useProductsStore } from "@/stores/products";

const productsStore = useProductsStore();

// Variable to store the result of filter
const filterWord = ref("all");

// computed to filter the orders
const ordersFiltering = computed(() => {
  return productsStore.orders.filter((order) => {
    if (filterWord.value === "all") {
      return true;
    } else {
      return order.status === filterWord.value;
    }
  });
});

onMounted(async () => {
  await productsStore.getAllOrders();
});
</script>

<style lang="scss" scoped>
.filter {
  .state {
    cursor: pointer;
  }
  .state.active {
    color: var(--main-color);
    position: relative;
    &::before {
      content: "";
      position: absolute;
      bottom: -5px;
      width: 100%;
      height: 3px;
      background-color: var(--main-color);
      border-radius: 4px;
    }
  }
}

.btn-mainColor {
  background-color: var(--main-color);
  color: white;
  &:focus,
  &:hover {
    background-color: #644fe5;
    color: white;
  }
}

.status {
  .statusName {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      top: 50%;
      left: -15px;
      transform: translateY(-10%);
    }
    &.pending::before {
      background-color: rgb(74, 20, 140) !important;
    }
    &.processing::before {
      background-color: #f1a60c !important;
    }
    &.shipped::before {
      background-color: #2066d9 !important;
    }
    &.delivered::before {
      background-color: #2c9f38 !important;
    }
    &.cancelled::before {
      background-color: #666f7d !important;
    }
  }
}
</style>
