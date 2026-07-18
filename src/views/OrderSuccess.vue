<template>
  <div class="OrderSuccess py-4" style="background-color: var(--background-section)">
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link :to="{ name: 'homePage' }" class="text-decoration-none">Home</router-link>
          </li>
          <li class="breadcrumb-item" aria-current="page">
            <router-link :to="{ name: 'checkout' }" class="text-decoration-none">
              Checkout
            </router-link>
          </li>
          <li class="breadcrumb-item" aria-current="page">
            <router-link
              :to="{
                name: 'orderSuccess',
              }"
              class="text-decoration-none"
              style="color: #9ca4b1"
            >
              Order Success
            </router-link>
          </li>
        </ol>
      </nav>
      <div class="successMsg text-center">
        <div class="image">
          <img
            src="@/assets/images/orderSuccess.png"
            alt="Success image"
            class="img-fluid"
            style="width: 350px"
          />
        </div>
        <div class="message my-4">
          <h1>Thank you!</h1>
          <h5>Your order has been placed successfully</h5>
          <p class="text-muted">
            We've received your order successfully. <br />
            You can review your order details below and continue shopping anytime.
          </p>
          <div class="btn" style="border: none">
            <router-link class="btn btn-mainColor d-flex gap-2" :to="{ name: 'products' }"
              ><span>Continue Shopping</span>
              <div style="margin-top: 2px"><i class="bi bi-arrow-right"></i></div
            ></router-link>
          </div>
        </div>
        <div class="orderDetails mx-auto p-3 bg-white rounded border" style="width: 70%">
          <div
            class="header d-flex justify-content-between align-items-center flex-column flex-md-row"
          >
            <div>Order details</div>
            <div class="d-flex gap-2">
              <span class="text-muted">Order</span>
              <span style="color: var(--main-color)" v-if="productStore.currentOrder">
                #{{ productStore.currentOrder._id.slice(0, 10) }}</span
              >
            </div>
          </div>
          <div class="details row mt-4 pt-1">
            <div class="col-md-4">
              <div
                class="box d-flex gap-3 text-start flex-column flex-md-row align-items-center align-items-md-start text-center text-md-start mb-3 mb-md-0"
              >
                <div
                  class="icon rounded d-flex justify-content-center align-items-center"
                  style="
                    width: 50px;
                    height: 50px;
                    flex-shrink: 0;
                    background-color: #f2eafe;
                    color: #7937eb;
                  "
                >
                  <i class="bi bi-calendar2-week fs-3"></i>
                </div>
                <div class="text">
                  <p class="m-0 mb-1 text-muted">Order Date</p>
                  <p class="m-0 fw-bold mb-1" v-if="productStore.currentOrder">
                    {{ formatDate(productStore.currentOrder.createdAt) }}
                  </p>
                  <p class="m-0 text-muted" v-if="productStore.currentOrder">
                    {{ new Date(productStore.currentOrder.time).toLocaleTimeString("en-US") }}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div
                class="box d-flex gap-3 text-start flex-column flex-md-row align-items-center align-items-md-start text-center text-md-start mb-3 mb-md-0"
              >
                <div
                  class="icon rounded d-flex justify-content-center align-items-center"
                  style="
                    width: 50px;
                    height: 50px;
                    flex-shrink: 0;
                    background-color: #d9f8ee;
                    color: #3bc89f;
                  "
                >
                  <i class="bi bi-person fs-3"></i>
                </div>
                <div class="text">
                  <p class="m-0 mb-1 text-muted">Customer Name</p>
                  <p class="fw-bold m-0 mb-1" v-if="productStore.currentOrder">
                    {{ productStore.currentOrder.userId.username }}
                  </p>
                  <p class="email m-0 text-muted" v-if="productStore.currentOrder">
                    {{ productStore.currentOrder.userId.email }}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div
                class="box notBox d-flex gap-3 text-start flex-column flex-md-row align-items-center align-items-md-start text-center text-md-start mb-3 mb-md-0"
              >
                <div
                  class="icon rounded d-flex justify-content-center align-items-center"
                  style="
                    width: 50px;
                    height: 50px;
                    flex-shrink: 0;
                    background-color: #ebe9fc;
                    color: #4e45dd;
                  "
                >
                  <i class="bi bi-credit-card-2-front fs-3"></i>
                </div>
                <div class="text">
                  <p class="m-0 mb-1 text-muted">Total amount</p>
                  <p class="fw-bold m-0 mb-1" v-if="productStore.currentOrder">
                    ${{ productStore.currentOrder.totalPrice }}
                  </p>
                  <p class="email m-0 text-muted" v-if="productStore.currentOrder">
                    {{ productStore.currentOrder.items.length }} Items
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="emailMessage my-5 d-flex justify-content-center gap-3 flex-column flex-md-row align-items-center align-items-md-start"
        >
          <div
            class="icon rounded-pill d-flex justify-content-center align-items-center"
            style="
              width: 50px;
              height: 50px;
              flex-shrink: 0;
              background-color: #edebfd;
              color: #5b46ec;
            "
          >
            <i class="bi bi-envelope fs-4"></i>
          </div>
          <div class="text">
            <span class="text-muted">A confirmation email has been sent to</span>
            <p class="fw-bold" v-if="productStore.currentOrder">
              {{ productStore.currentOrder.userId.email }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatDate } from "../../public/formatDate";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useProductsStore } from "@/stores/products";

const route = useRoute();

const productStore = useProductsStore();

const orderId = route.params.order_id;

onMounted(async () => {
  await productStore.getCurrentOrder(orderId);
});
</script>

<style lang="scss" scoped>
.btn-mainColor {
  background-color: var(--main-color);
  color: white;
  &:focus,
  &:hover {
    background-color: #644fe5;
    color: white;
    border: none !important;
  }
}

.details {
  @media (max-width: 767px) {
    .box:not(.notBox) {
      border-bottom: 2px solid #eee !important;
      padding-bottom: 15px;
    }
  }
}
</style>
