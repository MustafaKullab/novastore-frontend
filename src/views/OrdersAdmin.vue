<template>
  <div class="OrdersAdmin">
    <div class="container-fluid m-0">
      <div class="row">
        <div class="col-lg-2 p-0 border-end">
          <!-- SideBar Component  -->
          <SideBar />
        </div>
        <div class="col-lg-10 px-4" style="background-color: var(--background-section)">
          <!-- TopBar Component  -->
          <TopBar />
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link :to="{ name: 'dashboardAdmin' }" class="text-decoration-none"
                  >Dashboard</router-link
                >
              </li>

              <li class="breadcrumb-item" aria-current="page">
                <router-link
                  :to="{
                    name: 'ordersAdmin',
                  }"
                  class="text-decoration-none"
                  style="color: #9ca4b1"
                >
                  Orders
                </router-link>
              </li>
            </ol>
          </nav>

          <div class="searchAndTableOrder p-3 bg-white rounded border">
            <div class="filtering d-flex justify-content-between align-items-center mb-4">
              <div class="input-group w-50">
                <span class="input-group-text" id="searchId"><i class="bi bi-search"></i></span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search users by order ID, Customer name, email..."
                  aria-label="Search"
                  aria-describedby="searchId"
                  style="box-shadow: none"
                  v-model="searchInput"
                />
              </div>

              <div class="select">
                <select
                  class="form-select"
                  aria-label="Default select example"
                  style="box-shadow: none"
                  v-model="statusSelect"
                >
                  <option selected value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div class="resetBtn" @click="resetFilter">
                <button class="btn btn-light"><i class="bi bi-arrow-repeat"></i> Reset</button>
              </div>
            </div>

            <div
              class="table-responsive border rounded position-relative"
              style="height: 450px; overflow: auto"
            >
              <table class="table table-hover" style="overflow: auto">
                <thead>
                  <tr>
                    <th scope="col" style="background-color: #f8f9fa; white-space: nowrap">
                      Order ID
                    </th>
                    <th scope="col" style="background-color: #f8f9fa; white-space: nowrap">
                      Customer
                    </th>
                    <th
                      scope="col"
                      style="background-color: #f8f9fa; white-space: nowrap"
                      class="text-center"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      style="background-color: #f8f9fa; white-space: nowrap"
                      class="text-center"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      style="background-color: #f8f9fa; white-space: nowrap"
                      class="text-center"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      style="background-color: #f8f9fa; white-space: nowrap"
                      class="text-center"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <div
                    v-if="ordersFilter.length === 0"
                    class="position-absolute text-center mt-4"
                    style="left: 50%; top: 50%; transform: translate(-50%, -50%)"
                  >
                    <svg
                      class="animate-pulse"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="1.5"
                      style="width: 200px; color: #4a5568; background-color: transparent"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                      />
                    </svg>

                    <div class="details text-center">
                      <h1 class="display-3" style="color: #4a5568">No orders found</h1>
                      <p class="h4">There are currently no orders to display.</p>
                    </div>
                  </div>
                  <tr v-for="order of ordersFilter" :key="order._id" style="height: 70px">
                    <th scope="row">
                      <div
                        class="mt-3 d-flex align-items-center gap-2"
                        style="color: var(--main-color)"
                      >
                        #{{ order._id.slice(0, 10) }}
                      </div>
                    </th>
                    <td>
                      <div class="mt-1 d-flex align-items-center gap-3">
                        <div class="image" style="flex-shrink: 0">
                          <img
                            :src="`http://localhost:7000/${order.userId?.avatar}`"
                            class="img-fluid rounded-pill border"
                            style="width: 40px; height: 40px; object-fit: cover"
                            :alt="order.userId?.username"
                          />
                        </div>
                        <div class="details">
                          <div class="username fw-bold">{{ order.userId?.username }}</div>
                          <div class="email small text-muted">{{ order.userId?.email }}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="mt-3 text-center fw-bold">${{ order.totalPrice }}</div>
                    </td>
                    <td>
                      <div
                        class="rounded mt-2 mx-auto statusBox"
                        style="padding: 5px 25px; width: fit-content"
                        :class="order.status"
                        :style="{
                          backgroundColor:
                            order.status === 'pending'
                              ? '#f1f2ec'
                              : order.status === 'processing'
                                ? '#fdf9f0'
                                : order.status === 'shipped'
                                  ? '#f5fafe'
                                  : order.status === 'delivered'
                                    ? '#f2f9f2'
                                    : '#fafafc',
                          color:
                            order.status === 'pending'
                              ? '#601dc5'
                              : order.status === 'processing'
                                ? 'fb8b0d'
                                : order.status === 'shipped'
                                  ? '#2471ff'
                                  : order.status === 'delivered'
                                    ? '#23a55b'
                                    : '#6d6c71',
                        }"
                      >
                        {{ order.status }}
                      </div>
                    </td>
                    <td>
                      <div class="mt-3">
                        {{ formatDate(order.createdAt) }}
                      </div>
                    </td>
                    <td>
                      <div class="dropdown text-center mt-2">
                        <button
                          class="btn btn-light border"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          ...
                        </button>
                        <ul class="dropdown-menu">
                          <router-link
                            :to="{ name: 'orderDetailsAdmin', params: { orderId: order._id } }"
                            style="text-decoration: none"
                          >
                            <li><a class="dropdown-item" href="#">View Details</a></li>
                          </router-link>
                          <li>
                            <a
                              class="dropdown-item"
                              href="#"
                              type="button"
                              data-bs-toggle="modal"
                              :data-bs-target="`#updateStatus-${order._id}`"
                              >Update Status</a
                            >
                          </li>
                          <li @click.prevent="deleteOrder(order._id)">
                            <a class="dropdown-item" href="#">Delete</a>
                          </li>
                        </ul>
                      </div>

                      <div
                        class="modal fade"
                        :id="`updateStatus-${order._id}`"
                        tabindex="-1"
                        :aria-labelledby="`updateStatusId-${order._id}`"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h1 class="modal-title fs-5" :id="`updateStatusId-${order._id}`">
                                Update status
                              </h1>
                              <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div class="modal-body">
                              <select
                                class="form-select"
                                aria-label="Default select example"
                                v-model="changeStatus"
                                style="z-index: 1000"
                              >
                                <option value="default" disabled>Select status</option>
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                class="btn btn-primary"
                                @click="saveNewStatus(order._id)"
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="ordersOverview p-3 bg-white rounded border my-3">
            <div class="header fw-bold">Orders Overview</div>
            <div class="boxes mt-3 row">
              <div class="col-xxl-2 mb-3 mb-xxl-0">
                <div class="box border rounded p-3 d-flex align-items-center gap-3 mb-3 mb-md-0">
                  <div
                    class="icon d-flex justify-content-center align-items-center rounded"
                    style="
                      width: 50px;
                      height: 50px;
                      flex-shrink: 0;
                      background-color: #eae5fd;
                      color: #3010ea;
                    "
                  >
                    <i class="bi bi-clipboard-data fs-3"></i>
                  </div>
                  <div class="details">
                    <div class="title text-muted" style="font-size: 14px">Total Orders</div>
                    <div class="number fs-4 fw-bold">{{ totalOrders }}</div>
                    <div class="title text-muted small" style="font-size: 13px">All time</div>
                  </div>
                </div>
              </div>
              <div class="col-xxl-2 mb-3 mb-xxl-0">
                <div class="box border rounded p-3 d-flex align-items-center gap-3 mb-3 mb-md-0">
                  <div
                    class="icon d-flex justify-content-center align-items-center rounded"
                    style="
                      width: 50px;
                      height: 50px;
                      flex-shrink: 0;
                      background-color: #daf2e3;
                      color: #22a352;
                    "
                  >
                    <i class="bi bi-bag-check fs-3"></i>
                  </div>
                  <div class="details">
                    <div class="title text-muted" style="font-size: 14px">Delivered</div>
                    <div class="number fs-4 fw-bold">{{ calculateOrders("delivered") }}</div>
                    <div class="title text-muted small" style="font-size: 13px">All time</div>
                  </div>
                </div>
              </div>
              <div class="col-xxl-2 mb-3 mb-xxl-0">
                <div class="box border rounded p-3 d-flex align-items-center gap-3 mb-3 mb-md-0">
                  <div
                    class="icon d-flex justify-content-center align-items-center rounded"
                    style="
                      width: 50px;
                      height: 50px;
                      flex-shrink: 0;
                      background-color: #e1eefe;
                      color: #1663f2;
                    "
                  >
                    <i class="bi bi-truck fs-3"></i>
                  </div>
                  <div class="details">
                    <div class="title text-muted" style="font-size: 14px">Shipped</div>
                    <div class="number fs-4 fw-bold">{{ calculateOrders("shipped") }}</div>
                    <div class="title text-muted small" style="font-size: 13px">All time</div>
                  </div>
                </div>
              </div>
              <div class="col-xxl-2 mb-3 mb-xxl-0">
                <div class="box border rounded p-3 d-flex align-items-center gap-3 mb-3 mb-md-0">
                  <div
                    class="icon d-flex justify-content-center align-items-center rounded"
                    style="
                      width: 50px;
                      height: 50px;
                      flex-shrink: 0;
                      background-color: #feefdc;
                      color: #ef8016;
                    "
                  >
                    <i class="bi bi-box-seam fs-3"></i>
                  </div>
                  <div class="details">
                    <div class="title text-muted" style="font-size: 14px">Processing</div>
                    <div class="number fs-4 fw-bold">{{ calculateOrders("processing") }}</div>
                    <div class="title text-muted small" style="font-size: 13px">All time</div>
                  </div>
                </div>
              </div>
              <div class="col-xxl-2 mb-3 mb-xxl-0">
                <div class="box border rounded p-3 d-flex align-items-center gap-3 mb-3 mb-md-0">
                  <div
                    class="icon d-flex justify-content-center align-items-center rounded"
                    style="
                      width: 50px;
                      height: 50px;
                      flex-shrink: 0;
                      background-color: #f0ecfe;
                      color: #6047f9;
                    "
                  >
                    <i class="bi bi-clock-history fs-3"></i>
                  </div>
                  <div class="details">
                    <div class="title text-muted" style="font-size: 14px">Pending</div>
                    <div class="number fs-4 fw-bold">{{ calculateOrders("pending") }}</div>
                    <div class="title text-muted small" style="font-size: 13px">All time</div>
                  </div>
                </div>
              </div>
              <div class="col-xxl-2">
                <div class="box border rounded p-3 d-flex align-items-center gap-3">
                  <div
                    class="icon d-flex justify-content-center align-items-center rounded"
                    style="
                      width: 50px;
                      height: 50px;
                      flex-shrink: 0;
                      background-color: #fde7e9;
                      color: #d12130;
                    "
                  >
                    <i class="bi bi-x-circle fs-3"></i>
                  </div>
                  <div class="details">
                    <div class="title text-muted" style="font-size: 14px">Cancelled</div>
                    <div class="number fs-4 fw-bold">{{ calculateOrders("cancelled") }}</div>
                    <div class="title text-muted small" style="font-size: 13px">All time</div>
                  </div>
                </div>
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
import { useProductsStore } from "@/stores/products";
import { computed, onMounted, ref } from "vue";
import { fetchWithRefresh } from "../../public/fetchWithRefresh";
import { toast } from "vue3-toastify";

// Define the products store
const productsStore = useProductsStore();

// Store the search input
const searchInput = ref("");

//Store the status
const statusSelect = ref("all");

// Variable to store the status
const changeStatus = ref("default");

// Filtering the orders
const ordersFilter = computed(() => {
  return productsStore.allOrders
    .filter((order) => (statusSelect.value === "all" ? order : order.status === statusSelect.value))
    .filter(
      (order) =>
        order._id.toString().includes(searchInput.value) ||
        order.userId.username.toLowerCase().includes(searchInput.value.toLowerCase()) ||
        order.userId.email.toLowerCase().includes(searchInput.value.toLowerCase()),
    );
});

// Function to reser filter
const resetFilter = () => {
  searchInput.value = "";
  statusSelect.value = "all";
};

// Function to update status
const saveNewStatus = async (orderId) => {
  const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/updateStatucOfOrder`, {
    method: "PATCH",
    body: JSON.stringify({ orderId, statusSelected: changeStatus.value }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const data = await response.json();

  console.log(data);

  if (data.success) {
    await productsStore.getAllOrdersOfUsers();
    toast.success("Order updated successfully");
  }
};

// Function to delete the order
const deleteOrder = async (orderId) => {
  const response = await fetchWithRefresh(
    `${import.meta.env.VITE_API_URL}/deleteOrder/${orderId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  const data = await response.json();

  console.log(data);

  if (data.success) {
    await productsStore.getAllOrdersOfUsers();
    toast.error("Order deleted successfully");
  }
};

// Computed to calucate the all orders
const totalOrders = computed(() => {
  return productsStore.allOrders.length;
});

// Computed to calucate the delivered orders
const calculateOrders = (status) => {
  return productsStore.allOrders.filter((order) => order.status === status).length;
};

onMounted(async () => {
  await productsStore.getAllOrdersOfUsers();
});
</script>

<style lang="scss" scoped>
.statusBox {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 53%;
    transform: translateY(-50%);
    left: 8px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  &.pending::before {
    background-color: #601dc5;
  }
  &.processing::before {
    background-color: #fb8b0d;
  }
  &.shipped::before {
    background-color: #2471ff;
  }
  &.delivered::before {
    background-color: #23a55b;
  }
  &.cancelled::before {
    background-color: #6d6c71;
  }
}

@media (max-width: 767px) {
  svg {
    width: 150px !important;
  }
  .details {
    h1 {
      font-size: 22px;
    }
    p {
      font-size: 18px;
    }
  }
}
</style>
