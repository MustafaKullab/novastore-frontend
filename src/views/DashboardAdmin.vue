<template>
  <div class="DashboardAdmin">
    <div class="container-fluid m-0">
      <div class="row">
        <div class="col-lg-2 p-0 border-end">
          <!-- SideBar Component  -->
          <SideBar />
        </div>
        <div class="col-lg-10 px-4" style="background-color: var(--background-section)">
          <!-- TopBar Component  -->
          <TopBar />
          <!-- Boxes section  -->
          <div class="boxes row py-3">
            <div class="col-lg-3">
              <div
                class="totalProducts bg-white px-3 py-4 rounded d-flex gap-2 border mb-3 mb-lg-0"
              >
                <div
                  class="icon rounded-pill border d-flex justify-content-center align-items-center"
                  style="
                    width: 50px;
                    height: 50px;
                    background-color: #f5f3f6;
                    color: #5d3eda;
                    flex-shrink: 0;
                  "
                >
                  <i class="bi bi-box fs-3"></i>
                </div>
                <div class="details">
                  <div class="title">Total Products</div>
                  <div class="number fw-bold fs-3" v-if="productsStore.totalProducts">
                    {{ productsStore.totalProducts }}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="totalOrders bg-white px-3 py-4 rounded d-flex gap-2 border mb-3 mb-lg-0">
                <div
                  class="icon rounded-pill border d-flex justify-content-center align-items-center"
                  style="
                    width: 50px;
                    height: 50px;
                    background-color: #f5f3f6;
                    color: #5d3eda;
                    flex-shrink: 0;
                  "
                >
                  <i class="bi bi-cart fs-3"></i>
                </div>
                <div class="details">
                  <div class="title">Total Orders</div>
                  <div class="number fw-bold fs-3">
                    {{ productsStore.totalOrders }}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="totalUsers bg-white px-3 py-4 rounded d-flex gap-2 border mb-3 mb-lg-0">
                <div
                  class="icon rounded-pill border d-flex justify-content-center align-items-center"
                  style="
                    width: 50px;
                    height: 50px;
                    background-color: #f5f3f6;
                    color: #5d3eda;
                    flex-shrink: 0;
                  "
                >
                  <i class="bi bi-person fs-3"></i>
                </div>
                <div class="details">
                  <div class="title">Total Users</div>
                  <div class="number fw-bold fs-3" v-if="productsStore.totalUsers">
                    {{ productsStore.totalUsers }}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="revenue bg-white px-3 py-4 rounded d-flex gap-2 border mb-3 mb-lg-0">
                <div
                  class="icon rounded-pill border d-flex justify-content-center align-items-center"
                  style="
                    width: 50px;
                    height: 50px;
                    background-color: #f5f3f6;
                    color: #5d3eda;
                    flex-shrink: 0;
                  "
                >
                  <i class="bi bi-currency-dollar fs-3"></i>
                </div>
                <div class="details">
                  <div class="title">Revenue</div>
                  <div class="number fw-bold fs-3">${{ productsStore.revenue }}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- Boxes section  -->
          <div class="OrdersAndMessages d-flex flex-wrap gap-4 justify-content-between">
            <div class="orderMsgContainer pt-4 px-0 bg-white rounded border" style="flex: 1">
              <div class="title px-3 pb-3 border-bottom">
                <h5>Latest Orders</h5>
              </div>

              <div
                class="table-responsive position-relative"
                style="min-height: 300px; overflow: auto"
              >
                <table class="table m-0">
                  <thead>
                    <tr>
                      <th scope="col">Order ID</th>
                      <th scope="col">Customer</th>
                      <th scope="col">Items</th>
                      <th scope="col">Status</th>
                      <th scope="col">Date</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <div
                      v-if="productsStore.latestOrders.length === 0"
                      class="position-absolute text-center mt-4"
                      style="left: 50%; top: 50%; transform: translate(-50%, -50%)"
                    >
                      <div class="details text-center mt-5">
                        <h1 class="" style="color: #4a5568">No orders found</h1>
                        <p>There are currently no orders to display.</p>
                      </div>
                    </div>
                    <tr v-for="order of productsStore.latestOrders" :key="order._id">
                      <th>{{ order._id.slice(0, 10) }}</th>
                      <td>
                        <div class="d-flex align-items-center gap-2">
                          <div class="image">
                            <img
                              class="rounded-pill"
                              :src="`${apiUrl}/${order.userId.avatar}`"
                              style="width: 34px; height: 34px; object-fit: cover"
                              :alt="order.userId.username"
                            />
                          </div>
                          <div class="username">{{ order.userId.username }}</div>
                        </div>
                      </td>
                      <td>{{ order.items.length }}</td>
                      <td>
                        <div
                          class="statusBox py-2 px-3 rounded-pill fw-bold"
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
                      <td>{{ formatDate(order.createdAt) }}</td>
                      <td class="eye">
                        <i
                          class="bi bi-eye btn btn-light btn-sm"
                          @click="
                            router.push({
                              name: 'orderDetailsAdmin',
                              params: { orderId: order._id },
                            })
                          "
                          style="cursor: pointer"
                        ></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              class="recentMessages pt-4 px-0 bg-white rounded border position-relative"
              style="min-height: 200px"
            >
              <div class="title px-3 pb-3 border-bottom">
                <h5>Recent Messages</h5>
              </div>
              <div class="messages px-3 py-2">
                <div
                  class="message d-flex align-items-center gap-2 border-bottom pb-2 mb-2"
                  v-for="message of productsStore.recentMessages"
                  :key="message._id"
                >
                  <div class="avatar">
                    <img
                      :src="`${apiUrl}/${message?.userId?.avatar}`"
                      class="rounded-pill"
                      style="width: 54px; height: 54px; object-fit: cover"
                      alt="avatar"
                    />
                  </div>
                  <div class="details flex-grow-1">
                    <div class="username fw-bold">{{ message?.userId?.username }}</div>
                    <div class="theMessage text-muted">{{ message?.subject }}</div>
                  </div>
                  <div class="time text-muted">{{ message.date }}</div>
                </div>
              </div>
              <div
                v-if="productsStore.recentMessages.length === 0"
                class="position-absolute text-center w-100 p-2"
                style="left: 50%; top: 50%; transform: translate(-50%, -50%); margin-top: 40px"
              >
                <div class="details text-center" style="background-color: transparent">
                  <h1 style="color: #4a5568; font-size: 22px">No messages yet</h1>
                  <p style="font-size: 14px">
                    There are currently no customer inquiries to display.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="lowStockProducts pb-3 my-3 bg-white rounded border mt-3">
            <div class="title d-flex p-3 gap-2 align-items-center mb-4 border-bottom">
              <div
                class="icon d-flex justify-content-center align-items-center rounded-pill border"
                style="
                  width: 40px;
                  height: 40px;
                  flex-shrink: 0;
                  background-color: #fff1d8;
                  color: #ffa541;
                "
              >
                <i class="bi bi-exclamation-triangle fs-4"></i>
              </div>
              <div class="text">Low Stock Products</div>
            </div>
            <div
              class="products d-flex justify-content-between align-items-center px-3 flex-column flex-md-row"
            >
              <div
                class="productLow d-flex gap-3 align-items-center flex-column flex-md-row text-center text-md-start mb-3 pb-3 mb-md-0 pb-md-0 border-bottom"
                v-for="product of productsStore.lowStockProducts"
                :key="product._id"
              >
                <div
                  class="image p-2 rounded border"
                  style="background-color: #f8f8f8; width: fit-content"
                >
                  <img :src="`${apiUrl}/${product.image}`" style="width: 70px" alt="product" />
                </div>
                <div class="details">
                  <div class="productName fw-bold mb-1">{{ product.name }}</div>
                  <div class="stock text-muted mb-1">Stock : {{ product.stock }}</div>
                  <div
                    class="lowStock text-center py-1 small fw-bold rounded-pill border mx-auto mx-md-0"
                    style="background-color: #fde3e4; color: #cc3849; width: 100px"
                  >
                    Low Stock
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
import { onMounted } from "vue";
import { useProductsStore } from "@/stores/products";
import { useRouter } from "vue-router";

const productsStore = useProductsStore();

const router = useRouter();

const apiUrl = import.meta.env.VITE_API_URL;

onMounted(async () => {
  await productsStore.getTotalProducts();
  await productsStore.getTotalOrders();
  await productsStore.getTotalUsers();
  await productsStore.getRevenue();
  await productsStore.getLatestOrders();
  await productsStore.getRecentMessages();
  await productsStore.getLowStockProducts();
});
</script>

<style lang="scss" scoped>
.orderMsgContainer,
.recentMessages {
  @media (max-width: 1260px) {
    width: 100% !important;
  }
}

table {
  td,
  th {
    white-space: nowrap;
    padding: 14px !important;
    text-align: center;
  }
}

.products {
  .product {
    @media (min-width: 768px) {
      border: none !important;
    }
  }
}

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

.eye {
  i {
    display: block;
    transition: 0.2s;
    &:hover {
      transform: scale(1.1);
    }
  }
}

.productLow {
  @media (max-width: 767px) {
    width: 100% !important;
  }
}
</style>
