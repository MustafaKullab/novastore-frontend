<template>
  <div
    class="OrderDetailsAdmin"
    style="background-color: var(--background-section)"
    v-if="productsStore.currentOrder"
  >
    <div class="container-fluid m-0">
      <div class="row">
        <div class="col-lg-2 p-0 border-end">
          <!-- SideBar Component  -->
          <SideBar />
        </div>
        <div class="col-lg-10 px-4" style="background-color: var(--background-section)">
          <!-- TopBar Component  -->
          <TopBar />

          <div class="backToOrdersBtn">
            <router-link
              :to="{ name: 'ordersAdmin' }"
              class="btn rounded-pill"
              style="background-color: #f3f1fb; color: #887cd9"
              ><i class="bi bi-arrow-left"></i> Back to Orders</router-link
            >
          </div>

          <div class="orderId my-3 text-muted">Order ID : {{ orderId.slice(0, 10) }}</div>

          <div
            class="orderSummary p-3 bg-white rounded border mb-3"
            v-if="productsStore.currentOrder"
          >
            <div
              class="title d-flex gap-2 align-items-center pb-3 mb-3 pb-lg-0 mb-lg-0 border-bottom"
            >
              <div
                class="icon d-flex justify-content-center align-items-center rounded"
                style="
                  width: 40px;
                  height: 40px;
                  flex-shrink: 0;
                  background-color: #f4f2fe;
                  color: #6d48f7;
                "
              >
                <i class="bi bi-file-earmark-text fs-4"></i>
              </div>
              <div class="text fw-bold">Order Summary</div>
            </div>
            <div class="row my-4">
              <div class="col-lg-3 d-flex gap-3 mb-3 pb-3 mb-lg-0 pb-lg-0 border-bottom">
                <div
                  class="icon d-flex justify-content-center align-items-center rounded-pill"
                  style="
                    width: 35px;
                    height: 35px;
                    flex-shrink: 0;
                    background-color: #f4f2fe;
                    color: #6d48f7;
                  "
                >
                  <i class="bi bi-calendar4-week fs-5"></i>
                </div>
                <div class="details">
                  <div class="title text-muted mb-2">Order Date</div>
                  <div class="date fw-bold">
                    {{ formatDate(productsStore.currentOrder.createdAt) }}
                  </div>
                  <div class="time fw-bold">
                    {{ new Date(productsStore.currentOrder.time).toLocaleTimeString("en-US") }}
                  </div>
                </div>
              </div>
              <div class="col-lg-3 d-flex gap-3 mb-3 pb-3 mb-lg-0 pb-lg-0 border-bottom">
                <div
                  class="icon d-flex justify-content-center align-items-center rounded-pill"
                  style="
                    width: 35px;
                    height: 35px;
                    flex-shrink: 0;
                    background-color: #f4f2fe;
                    color: #6d48f7;
                  "
                >
                  <i class="bi bi-credit-card fs-5"></i>
                </div>
                <div class="details">
                  <div class="title text-muted mb-2">Payment Method</div>
                  <div class="method fw-bold">Cash on Delivery</div>
                </div>
              </div>
              <div class="col-lg-3 d-flex gap-3 mb-3 pb-3 mb-lg-0 pb-lg-0 border-bottom">
                <div
                  class="icon d-flex justify-content-center align-items-center rounded-pill"
                  style="
                    width: 35px;
                    height: 35px;
                    flex-shrink: 0;
                    background-color: #f4f2fe;
                    color: #6d48f7;
                  "
                >
                  <i class="bi bi-currency-dollar fs-5"></i>
                </div>
                <div class="details">
                  <div class="title text-muted mb-2">Total Amount</div>
                  <div class="totalAmount fw-bold">
                    ${{ productsStore.currentOrder.totalPrice.toFixed(2) }}
                  </div>
                </div>
              </div>
              <div class="col-lg-3 d-flex gap-3 mb-3 pb-3 mb-lg-0 pb-lg-0 border-bottom">
                <div
                  class="icon d-flex justify-content-center align-items-center rounded-pill"
                  style="
                    width: 35px;
                    height: 35px;
                    flex-shrink: 0;
                    background-color: #f4f2fe;
                    color: #6d48f7;
                  "
                >
                  <i class="bi bi-box fs-5"></i>
                </div>
                <div class="details">
                  <div class="title text-muted mb-2">Items Count</div>
                  <div class="totalAmount fw-bold">
                    {{ productsStore.currentOrder.items.length }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="updateOrderStatus mb-3 p-3 border rounded bg-white">
            <div class="header d-flex align-items-center gap-2">
              <div class="icon" style="color: #7157ee">
                <i class="bi bi-arrow-repeat fs-5"></i>
              </div>
              <div class="title fw-bold">Update Order Status</div>
            </div>

            <form @submit.prevent="updateStatus">
              <div
                class="stateAndUpdate d-flex align-items-center justify-content-between my-4"
                v-if="productsStore.currentOrder"
              >
                <div class="selectStatus w-25">
                  <label class="form-label text-muted" style="width: 200px">Current Status</label>
                  <select class="form-select" aria-label="select " v-model="statusSelected">
                    <option
                      value="pending"
                      :selected="productsStore.currentOrder.status === 'pending'"
                    >
                      Pending
                    </option>
                    <option
                      value="processing"
                      :selected="productsStore.currentOrder.status === 'processing'"
                    >
                      Processing
                    </option>
                    <option
                      value="shipped"
                      :selected="productsStore.currentOrder.status === 'shipped'"
                    >
                      Shipped
                    </option>
                    <option
                      value="delivered"
                      :selected="productsStore.currentOrder.status === 'delivered'"
                    >
                      Delivered
                    </option>
                    <option
                      value="cancelled"
                      :selected="productsStore.currentOrder.status === 'cancelled'"
                    >
                      Cancelled
                    </option>
                  </select>
                </div>
                <div class="confStatusBtn">
                  <button class="btn btn-mainColor">
                    <i class="bi bi-check-circle"></i> Save Status
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div
            class="customerInformation mb-3 p-3 bg-white rounded border"
            v-if="productsStore.currentOrder"
          >
            <div class="header d-flex align-items-center gap-2">
              <div class="icon" style="color: #6d48f7"><i class="bi bi-person fs-5"></i></div>
              <div class="text fw-bold">Customer Information</div>
            </div>
            <div class="customer d-flex align-items-center gap-5 my-4 flex-column flex-md-row">
              <div class="custImg">
                <img
                  :src="`${apiUrl}/${productsStore.currentOrder.userId.avatar}`"
                  :alt="productsStore.currentOrder.userId.username"
                  style="width: 120px; height: 120px; object-fit: cover"
                  class="rounded-pill"
                />
              </div>
              <div
                class="userInformation border-top pt-3 d-flex justify-content-between flex-grow-1 flex-column flex-md-row text-center text-md-start"
              >
                <div class="username mb-3 mb-md-0">
                  <div class="title fw-bold">Username</div>
                  <div class="fullName text-muted">
                    {{ productsStore.currentOrder.userId.username }}
                  </div>
                </div>
                <div class="email mb-3 mb-md-0">
                  <div class="title fw-bold">Email</div>
                  <div class="emailOfUser text-muted">
                    {{ productsStore.currentOrder.userId.email }}
                  </div>
                </div>
                <div class="userId mb-3 mb-md-0">
                  <div class="title fw-bold">User ID</div>
                  <div class="userIdOfUser text-muted">
                    {{ productsStore.currentOrder.userId._id.slice(0, 10) }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="orderItems bg-white p-3 border rounded mb-3"
            v-if="productsStore.currentOrder"
          >
            <div class="header d-flex align-items-center gap-3 mb-3">
              <div class="icon" style="color: #6d48f7"><i class="bi bi-box fs-5"></i></div>
              <div class="text fw-bold">Order Items</div>
            </div>

            <div class="items">
              <div class="responsive-table" style="overflow: auto">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col" style="background-color: #f7f9fb">Product</th>
                      <th scope="col" style="background-color: #f7f9fb">Price</th>
                      <th scope="col" style="background-color: #f7f9fb">Quantity</th>
                      <th scope="col" style="background-color: #f7f9fb">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="product of productsStore.currentOrder.items"
                      :key="product.productId?._id"
                    >
                      <th scope="row">
                        <div class="productDetails d-flex align-items-center gap-2">
                          <div class="image p-2 rounded border" style="background-color: #f9f8f9">
                            <img
                              :src="`${apiUrl}/${product.productId?.image}`"
                              :alt="product.productId?.name"
                              style="width: 70px; height: 70px; object-fit: contain"
                            />
                          </div>
                          <div class="productName">{{ product.productId?.name }}</div>
                        </div>
                      </th>
                      <td>
                        <div class="mt-4">${{ (product.productId?.price).toFixed(2) }}</div>
                      </td>
                      <td>
                        <div class="mt-4">
                          {{ product.quantity }}
                        </div>
                      </td>
                      <td>
                        <div class="mt-4">
                          {{ (product.quantity * product.productId?.price).toFixed(2) }}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { formatDate } from "../utils/formatDate";
import SideBar from "@/components/SideBar.vue";
import TopBar from "@/components/TopBar.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useProductsStore } from "@/stores/products";
import { fetchWithRefresh } from "../../public/fetchWithRefresh";
import { toast } from "vue3-toastify";

// Define the store
const productsStore = useProductsStore();

// define route
const route = useRoute();

// Get order id
const orderId = route.params.orderId;

// Select the status of order
const statusSelected = ref("");

// Function to update the status
const updateStatus = async () => {
  const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/updateStatucOfOrder`, {
    method: "PATCH",
    body: JSON.stringify({ orderId, statusSelected: statusSelected.value }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const data = await response.json();

  if (data.success) {
    await productsStore.getCurrentOrder(orderId);
    toast.success("Order updated successfully");
  }
};

const apiUrl = import.meta.env.VITE_API_URL;

onMounted(async () => {
  await productsStore.getCurrentOrder(orderId);

  statusSelected.value = productsStore.currentOrder.status;
  console.log(productsStore.currentOrder);
});
</script>

<style lang="scss" scoped>
@media (max-width: 767px) {
  table {
    width: 800px;
  }
}

.orderSummary {
  div {
    @media (min-width: 992px) {
      border: none !important;
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
</style>
