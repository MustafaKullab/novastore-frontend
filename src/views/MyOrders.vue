<template>
  <div ref="MyOrdersPage" class="MyOrders py-4" style="background-color: var(--background-section)">
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
      <div
        class="displayOrders p-4 bg-white border rounded my-4 position-relative"
        style="height: 400px; overflow: auto"
      >
        <div
          v-if="productsStore.orders.length === 0"
          class="noOrders py-3 position-absolute text-center"
          style="top: 50%; left: 50%; transform: translate(-50%, -50%)"
        >
          <div class="iconEmp">
            <i class="bi bi-bag-x text-warning" style="font-size: 70px"></i>
          </div>
          <div class="title"><h3 style="color: #1f2937">No Orders Yet!</h3></div>
          <div class="subtext">
            <p class="text-muted">
              Looks like you haven't discovered our amazing products yet. Your cart is waiting to be
              filled with the best deals!
            </p>
          </div>
          <div class="button">
            <router-link :to="{ name: 'products' }" class="btn btn-primary"
              >Start Shopping</router-link
            >
          </div>
        </div>
        <div class="filter d-flex align-items-center gap-3 flex-column flex-md-row">
          <div
            class="state all"
            :class="{ active: filterWord === 'all' }"
            @click="getOrdersFiltering('All')"
          >
            All Orders
          </div>
          <div
            class="state pending"
            :class="{ active: filterWord === 'pending' }"
            @click="getOrdersFiltering('pending')"
          >
            Pending
          </div>
          <div
            class="state processing"
            :class="{ active: filterWord === 'processing' }"
            @click="getOrdersFiltering('processing')"
          >
            Processing
          </div>
          <div
            class="state shipped"
            :class="{ active: filterWord === 'shipped' }"
            @click="getOrdersFiltering('shipped')"
          >
            Shipped
          </div>
          <div
            class="state delivered"
            :class="{ active: filterWord === 'delivered' }"
            @click="getOrdersFiltering('delivered')"
          >
            Delivered
          </div>
          <div
            class="state cancelled"
            :class="{ active: filterWord === 'cancelled' }"
            @click="getOrdersFiltering('cancelled')"
          >
            Cancelled
          </div>
        </div>
        <div
          class="orders mt-5"
          style="max-height: 600px; overflow: auto"
          v-if="productsStore.orders"
        >
          <div
            class="order p-3 border rounded d-flex align-items-center justify-content-between mb-3 flex-column flex-lg-row"
            v-for="order of productsStore.orders"
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
      <div
        class="paginiationCont d-flex align-items-center justify-content-center gap-3"
        v-if="productsStore.orders.length > 0"
      >
        <nav aria-label="Page navigation example">
          <ul class="pagination d-flex gap-2">
            <li class="page-item cursor-pointer">
              <a
                :class="{
                  disabled: !productsStore.ordersPagination.hasPrevPage,
                }"
                class="page-link"
                @click="changePage(productsStore.ordersPagination.currentPage - 1)"
              >
                Previous
              </a>
            </li>
            <li
              class="page-item cursor-pointer"
              v-for="(page, i) of productsStore.ordersPagination.totalPages"
              :key="i"
            >
              <a
                :class="{ active: page === productsStore.ordersPagination.currentPage }"
                class="page-link rounded"
                @click="changePage(page)"
                >{{ page }}</a
              >
            </li>
            <li class="page-item cursor-pointer">
              <a
                :class="{ disabled: !productsStore.ordersPagination.hasNextPage }"
                class="page-link"
                @click="changePage(productsStore.ordersPagination.currentPage + 1)"
                >Next</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useProductsStore } from "@/stores/products";

const productsStore = useProductsStore();

// The Page Variable
const MyOrdersPage = ref(null);

// Variable to store the result of filter
const filterWord = ref("all");

const getOrdersFiltering = (search) => {
  if (search === "All") {
    filterWord.value = "all";
    productsStore.getAllOrders();
  } else {
    filterWord.value = search;
    productsStore.getAllOrders({ search });
  }
};

const changePage = async (page) => {
  MyOrdersPage.value?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  const limit = 6;
  await productsStore.getAllOrders({ page, limit });
};

onMounted(async () => {
  await productsStore.getAllOrders();
  console.log(productsStore.orders);
});
</script>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}
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
@media (max-width: 767px) {
  .iconEmp {
    display: none;
  }
  .noOrders {
    top: 90% !important;
    width: 90% !important;
  }
}

a.page-link {
  border-color: #e5e7eb !important;
  color: #6366f1 !important;
  &:hover {
    background-color: #eef2ff !important;
    border-color: #6366f1 !important;
  }
  &.active {
    background: linear-gradient(135deg, #6366f1, #7c3aed) !important;
    color: white !important;
    border-color: #6366f1 !important;
  }
  &.disabled {
    color: gray !important;
  }
}
</style>
