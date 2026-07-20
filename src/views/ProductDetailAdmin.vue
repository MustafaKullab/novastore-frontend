<template>
  <div
    class="ProductDetails"
    style="background-color: var(--background-section)"
    v-if="productsStore.product"
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

          <div class="d-flex justify-content-between align-items-center flex-column flex-md-row">
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
                      name: 'productsAdmin',
                    }"
                    class="text-decoration-none"
                  >
                    Products</router-link
                  >
                </li>
                <li class="breadcrumb-item" aria-current="page">
                  <router-link
                    :to="{
                      name: 'productDetails',
                      params: { productId: productId },
                    }"
                    class="text-decoration-none"
                    style="color: #9ca4b1"
                  >
                    {{ productsStore.product.name }}</router-link
                  >
                </li>
              </ol>
            </nav>
            <div class="actions d-flex align-items-center gap-2">
              <div class="backBtn">
                <router-link
                  :to="{ name: 'productsAdmin' }"
                  class="btn border"
                  style="background-color: white"
                  ><i class="bi bi-arrow-left"></i> Back to Products</router-link
                >
              </div>
              <div class="editProduct">
                <router-link
                  :to="{ name: 'editProduct', params: { productId: productsStore.product._id } }"
                  class="btn btn-mainColor"
                  ><i class="bi bi-pencil"></i> Edit Product</router-link
                >
              </div>
            </div>
          </div>

          <div class="row my-4">
            <div class="col-md-7">
              <div class="productInformation p-3 bg-white rounded border">
                <div class="header d-flex align-items-center gap-3 mb-3 pb-3 border-bottom">
                  <div
                    class="icon d-flex justify-content-center align-items-center rounded-pill border"
                    style="width: 50px; height: 50px; background-color: #eeedfe; color: #6451f0"
                  >
                    <i class="bi bi-box fs-4"></i>
                  </div>
                  <div class="title fw-bold">Product Information</div>
                </div>

                <ul class="list-unstyled my-3">
                  <li
                    class="d-flex justify-content-between align-items-center pb-3 mb-2 border-bottom"
                  >
                    <div class="key d-flex align-items-center gap-4">
                      <div
                        class="icon d-flex justify-content-center align-items-center rounded border"
                        style="width: 40px; height: 40px; background-color: #eeedfe; color: #6451f0"
                      >
                        <i class="bi bi-fonts fs-4"></i>
                      </div>
                      <div class="text">Product Name</div>
                    </div>
                    <div class="value fw-bold" style="font-size: 18px">
                      {{ productsStore.product.name }}
                    </div>
                  </li>
                  <li
                    class="d-flex justify-content-between align-items-center pb-3 mb-2 border-bottom"
                  >
                    <div class="key d-flex align-items-center gap-4">
                      <div
                        class="icon d-flex justify-content-center align-items-center rounded border"
                        style="width: 40px; height: 40px; background-color: #eeedfe; color: #6451f0"
                      >
                        <i class="bi bi-card-text fs-4"></i>
                      </div>
                      <div class="text">Description</div>
                    </div>
                    <div class="value text-end" style="font-size: 18px; width: 350px">
                      {{ productsStore.product.description }}
                    </div>
                  </li>
                  <li
                    class="d-flex justify-content-between align-items-center pb-3 mb-2 border-bottom"
                  >
                    <div class="key d-flex align-items-center gap-4">
                      <div
                        class="icon d-flex justify-content-center align-items-center rounded border"
                        style="width: 40px; height: 40px; background-color: #eeedfe; color: #6451f0"
                      >
                        <i class="bi bi-cash-coin fs-4"></i>
                      </div>
                      <div class="text">Price</div>
                    </div>
                    <div class="value fw-bold" style="font-size: 18px">
                      ${{ productsStore.product.price }}
                    </div>
                  </li>
                  <li
                    class="d-flex justify-content-between align-items-center pb-3 mb-2 border-bottom"
                  >
                    <div class="key d-flex align-items-center gap-4">
                      <div
                        class="icon d-flex justify-content-center align-items-center rounded border"
                        style="width: 40px; height: 40px; background-color: #eeedfe; color: #6451f0"
                      >
                        <i class="bi bi-boxes fs-4"></i>
                      </div>
                      <div class="text">Stock</div>
                    </div>
                    <div
                      class="value fw-bold"
                      style="font-size: 18px"
                      :style="{
                        color:
                          productsStore.product.stock === 0
                            ? '#fc1620'
                            : productsStore.product.stock > 0 && productsStore.product.stock <= 3
                              ? '#fe7d29'
                              : '#0dab3b',
                      }"
                    >
                      {{ productsStore.product.stock }}
                    </div>
                  </li>
                  <li
                    class="d-flex justify-content-between align-items-center pb-3 mb-2 border-bottom"
                  >
                    <div class="key d-flex align-items-center gap-4">
                      <div
                        class="icon d-flex justify-content-center align-items-center rounded border"
                        style="width: 40px; height: 40px; background-color: #eeedfe; color: #6451f0"
                      >
                        <i class="bi bi-grid fs-4"></i>
                      </div>
                      <div class="text">Category</div>
                    </div>
                    <div
                      class="value p-2 rounded"
                      style="
                        font-size: 18px;
                        width: fit-content;
                        background-color: #f5f4ff;
                        color: #6e63fa;
                      "
                    >
                      {{ productsStore.product.categoryId.name }}
                    </div>
                  </li>
                  <li class="d-flex justify-content-between align-items-center">
                    <div class="key d-flex align-items-center gap-4">
                      <div
                        class="icon d-flex justify-content-center align-items-center rounded border"
                        style="width: 40px; height: 40px; background-color: #eeedfe; color: #6451f0"
                      >
                        <i class="bi bi-calendar3 fs-4"></i>
                      </div>
                      <div class="text">Created At</div>
                    </div>
                    <div class="value" style="font-size: 18px">
                      {{ formatDate(productsStore.product.createdAt) }}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-md-5">
              <div class="productImage p-3 bg-white rounded border">
                <div class="header d-flex align-items-center gap-3">
                  <div
                    class="icon d-flex justify-content-center align-items-center rounded-pill border"
                    style="width: 50px; height: 50px; background-color: #eeedfe; color: #6451f0"
                  >
                    <i class="bi bi-image fs-4"></i>
                  </div>
                  <div class="title fw-bold">Product Image</div>
                </div>
                <div class="image mt-3 p-5 rounded" style="background-color: #f6f4fd">
                  <img
                    :src="`${apiUrl}/${productsStore.product.image}`"
                    class="rounded"
                    style="width: 100%; height: 287px; object-fit: contain"
                    :alt="productsStore.product.name"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="message p-3 bg-white border rounded my-3 d-flex gap-3">
            <div
              class="icon d-flex justify-content-center align-items-center rounded-pill"
              style="background-color: #fef2e7; color: #fd8e28; width: 50px; height: 50px"
            >
              <i class="bi bi-exclamation-circle fs-3"></i>
            </div>
            <div class="msg text-muted small">
              {{ productsStore.product.stock }}
              {{ productsStore.product.stock === 1 ? "item" : "items" }} left. <br />
              You can edit the product to update stock or other information.
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
import { useRoute } from "vue-router";
import { useProductsStore } from "@/stores/products";
import { onMounted } from "vue";

// Define the store
const productsStore = useProductsStore();

// Define the route of page
const route = useRoute();

// define the productId
const productId = route.params.productId;

const apiUrl = import.meta.env.VITE_API_URL;

onMounted(async () => {
  await productsStore.getProduct(productId);
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
  }
}

.backBtn {
  a {
    transition: 0.3s;
    &:hover {
      background-color: rgb(245, 245, 245) !important;
    }
  }
}

.editProduct {
  a {
    transition: 0.3s;
    &:hover {
      background-color: #5640e7 !important;
    }
  }
}
</style>
