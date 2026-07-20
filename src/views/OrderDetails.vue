<template>
  <div class="OrderDetails py-4" style="background-color: var(--background-section)">
    <div class="container">
      <nav aria-label="breadcrumb" v-if="productsStore.currentOrder">
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
            >
              My Orders
            </router-link>
          </li>
          <li class="breadcrumb-item" aria-current="page">
            <router-link
              :to="{
                name: 'orderDetails',
                params: { orderId: productsStore.currentOrder._id },
              }"
              class="text-decoration-none"
              style="color: #9ca4b1"
            >
              Order Details
            </router-link>
          </li>
        </ol>
      </nav>
      <div class="headers text-center">
        <h1 class="title">Order Details</h1>
        <p class="desc text-muted">Here are the details of your order.</p>
      </div>
      <div
        class="detailsOfOrder row mt-5 p-4 bg-white border rounded justify-content-between"
        v-if="productsStore.currentOrder"
      >
        <div
          class="col-xxl-3 col-md-6 mb-3 mb-xxl-0 d-flex justify-content-between justify-content-lg-start align-items-center"
        >
          <div class="orderId d-flex gap-2">
            <div
              class="icon rounded d-flex justify-content-center align-items-center border"
              style="
                width: 50px;
                height: 50px;
                background-color: #f7f5fd;
                color: #5f49e8;
                flex-shrink: 0;
              "
            >
              <i class="bi bi-receipt fs-4"></i>
            </div>
            <div class="text">
              <div class="title text-muted">Order ID</div>
              <div class="orderId fw-bold">#{{ productsStore.currentOrder._id.slice(0, 10) }}</div>
            </div>
          </div>
        </div>
        <div
          class="col-xxl-2 col-md-6 mb-3 mb-xxl-0 d-flex justify-content-between justify-content-lg-start align-items-center"
        >
          <div class="ordDate d-flex gap-2">
            <div
              class="icon rounded d-flex justify-content-center align-items-center border"
              style="
                width: 50px;
                height: 50px;
                background-color: #f7f5fd;
                color: #5f49e8;
                flex-shrink: 0;
              "
            >
              <i class="bi bi-calendar-week fs-4"></i>
            </div>
            <div class="text">
              <div class="title text-muted">Order Date</div>
              <div class="orderDate fw-bold">{{ productsStore.currentOrder.createdAt }}</div>
            </div>
          </div>
        </div>
        <div
          class="col-xxl-2 col-md-6 mb-3 mb-xxl-0 d-flex justify-content-between justify-content-lg-start align-items-center"
        >
          <div class="status d-flex gap-2">
            <div
              class="icon rounded d-flex justify-content-center align-items-center border"
              style="
                width: 50px;
                height: 50px;
                background-color: #f7f5fd;
                color: #5f49e8;
                flex-shrink: 0;
              "
            >
              <i class="bi bi-clock fs-4"></i>
            </div>
            <div class="text">
              <div class="title text-muted">Status</div>
              <div
                class="statusName fw-bold small"
                :class="productsStore.currentOrder.status"
                :style="{
                  color:
                    productsStore.currentOrder.status === 'pending'
                      ? '#4a148c'
                      : productsStore.currentOrder.status === 'processing'
                        ? '#f4aa0f'
                        : productsStore.currentOrder.status === 'shipped'
                          ? '#2066d9'
                          : productsStore.currentOrder.status === 'delivered'
                            ? '#2c9f38'
                            : '#697281',
                }"
              >
                {{ productsStore.currentOrder.status }}
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-xxl-2 col-md-6 mb-3 mb-xxl-0 d-flex justify-content-between justify-content-lg-start align-items-center"
        >
          <div class="ordPayMethod d-flex gap-2">
            <div
              class="icon rounded d-flex justify-content-center align-items-center border"
              style="
                width: 50px;
                height: 50px;
                background-color: #f7f5fd;
                color: #5f49e8;
                flex-shrink: 0;
              "
            >
              <i class="bi bi-credit-card fs-4"></i>
            </div>
            <div class="text">
              <div class="title text-muted">Payment Method</div>
              <div class="method fw-bold">Cash on Delivery (COD)</div>
            </div>
          </div>
        </div>
        <div
          class="col-xxl-3 col-md-6 mb-3 mb-xxl-0 d-flex justify-content-between justify-content-lg-start align-items-center"
        >
          <div class="ordCustDetails d-flex gap-2">
            <div
              class="icon rounded d-flex justify-content-center align-items-center border"
              style="
                width: 50px;
                height: 50px;
                background-color: #f7f5fd;
                color: #5f49e8;
                flex-shrink: 0;
              "
            >
              <i class="bi bi-person fs-4"></i>
            </div>
            <div class="text">
              <div class="title text-muted">Customer</div>
              <div class="custName fw-bold">{{ productsStore.currentOrder.userId.username }}</div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="itemsInOrder mt-5 p-4 bg-white rounded border row"
        v-if="productsStore.currentOrder"
      >
        <div class="header mb-3"><h5>Items in this order</h5></div>
        <div class="" style="max-height: 600px; overflow: auto">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item of productsStore.currentOrder.items"
                :key="item.productId?._id"
                style="height: 100px"
              >
                <td>
                  <div class="d-flex align-items-center gap-3">
                    <div class="image">
                      <img
                        :src="`${apiUrl}/${item.productId?.image}`"
                        style="width: 80px; object-fit: contain"
                        :alt="item.productId?.name"
                      />
                    </div>
                    <div class="productDetails flex-grow-1">
                      <div class="name fw-bold">
                        {{ item.productId?.name }}
                      </div>
                      <div class="category text-muted">
                        {{ item.productId?.category }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="pt-4 text-nowrap text-center text-md-start">
                  <div style="padding-top: 15px">${{ item.productId?.price }}</div>
                </td>
                <td class="pt-4 text-nowrap text-center text-md-start">
                  <div style="padding-top: 15px">{{ item.quantity }}</div>
                </td>
                <td class="fw-bold pt-4 text-nowrap text-center text-md-start">
                  <div style="padding-top: 15px">${{ item.productId?.price * item.quantity }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="totalPrice d-flex justify-content-end gap-3 pb-4 pt-1">
          <div class="total fw-bold fs-5">Order Total</div>
          <div class="price fs-5 fw-bold" style="color: var(--main-color)">${{ orderTotal }}</div>
        </div>
        <hr />
        <div class="backToMyOrders" style="width: fit-content">
          <router-link :to="{ name: 'myorders' }" class="d-flex gap-2 btn btn-outline-mainColor"
            ><span><i class="bi bi-arrow-left"></i></span>
            <span>Back to My Orders</span></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useProductsStore } from "@/stores/products";

// Variable to define the route obj
const route = useRoute();

// variable to define the store
const productsStore = useProductsStore();

const orderId = route.params.orderId;

// computed to calculate the total price of order
const orderTotal = computed(() => {
  return productsStore.currentOrder.items.reduce(
    (acc, item) => acc + item.quantity * item.productId?.price,
    0,
  );
});

const apiUrl = import.meta.env.VITE_API_URL;

onMounted(async () => {
  await productsStore.getCurrentOrder(orderId);

  console.log(productsStore.currentOrder);
});
</script>

<style lang="scss" scoped>
@media (max-width: 1400px) {
  .flexGrow {
    flex: 1;
  }
}

.btn-outline-mainColor {
  border: 2px solid var(--main-color) !important;
  color: var(--main-color);
  &:hover {
    background-color: #644fe5;
    color: white;
  }
}
table {
  td {
    white-space: nowrap;
  }
}
@media (max-width: 767px) {
  table {
    td {
      width: 250px;
    }
  }
}
</style>
