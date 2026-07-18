<template>
  <div class="CategoriesPage py-4" style="background-color: var(--background-section)">
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link :to="{ name: 'homePage' }" class="text-decoration-none">Home</router-link>
          </li>
          <li class="breadcrumb-item" aria-current="page">
            <router-link
              :to="{ name: 'categories' }"
              class="text-decoration-none"
              style="color: #9ca4b1"
            >
              Categories
            </router-link>
          </li>
        </ol>
      </nav>
      <div class="header text-center">
        <div class="title"><h1>Categories</h1></div>
        <p class="text-muted mx-auto" style="width: 30%">
          Explore our wide range of products by category and find exactly what you need.
        </p>
        <div class="icon">
          <i class="bi bi-bag-heart" style="color: var(--main-color)"></i>
        </div>
      </div>
      <div class="categories row my-5">
        <div class="col-md-4" v-for="(category, i) of categoryStore.categories" :key="i">
          <div
            class="category p-3 bg-white d-flex align-items-center gap-2 rounded mb-2 border"
            style="min-height: 210px"
          >
            <div class="imageSide p-2">
              <img
                :src="`http://localhost:7000/${category.image}`"
                :alt="category.name"
                class="img-fluid"
                style="width: 150px"
              />
            </div>
            <div class="text-side d-flex align-items-center">
              <div class="details">
                <div class="name">
                  <h5>{{ category.name }}</h5>
                </div>
                <div class="countOfCategory text-muted">
                  {{ countCategory(category._id) }}
                  <span>{{ countCategory(category._id) > 1 ? "Products" : "Product" }}</span>
                </div>
                <div class="description small text-muted">{{ category.description }}</div>
              </div>
              <div class="link fw-bold ms-2" @click="goToCategory(category._id)">
                <i class="bi bi-box-arrow-up-right" style="cursor: pointer"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="helpMessage p-3 d-flex align-items-center justify-content-between rounded"
        style="background-color: #f0edfd"
      >
        <div
          class="iconMsg me-3 rounded-pill d-flex justify-content-center align-items-center"
          style="width: 50px; height: 50px; flex-shrink: 1; background-color: #4c33c9; color: white"
        >
          <i class="bi bi-search fs-4"></i>
        </div>
        <div class="text flex-grow-1">
          <h6 class="m-0 mt-3 mb-1">Can't find what you're looking for?</h6>
          <p>Browse all our products and discover more amazing items.</p>
        </div>
        <div class="linkToProducrs">
          <router-link :to="{ name: 'products' }" class="text-decoration-none btn btn-mainColor"
            ><i class="bi bi-grid"></i> Browse All Products</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useProductsStore } from "@/stores/products";
import { useCategoryStore } from "@/stores/category";
import { useRouter } from "vue-router";

const productStore = useProductsStore();
const categoryStore = useCategoryStore();

const router = useRouter();

// Function to get count of categpry
const countCategory = (categoryId) => {
  return productStore.products.filter((item) => item.categoryId._id === categoryId).length;
};

// Function to go to category
const goToCategory = (categoryId) => {
  categoryStore.selectedCategory = categoryId;

  router.push({ name: "products" });
};

onMounted(async () => {
  await productStore.getProducts();

  await categoryStore.getCategories();
});
</script>

<style lang="scss" scoped>
.icon {
  position: relative;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  &::before {
    content: "";
    position: absolute;
    right: 25px;
    top: 60%;
    transform: translateY(-50%);
    height: 2px;
    width: 100px;
    border-radius: 3px;
    background: linear-gradient(to left, var(--main-color), #bfb4f4, #e9e6fb);
  }
  &::after {
    content: "";
    position: absolute;
    left: 25px;
    top: 60%;
    transform: translateY(-50%);
    height: 2px;
    width: 100px;
    border-radius: 3px;
    background: linear-gradient(to right, var(--main-color), #bfb4f4, #e9e6fb);
  }
}

.link {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background-color: var(--main-color);
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #5138d6;
    box-shadow: 0 0 4px #5138d6;
    transform: scale(1.05);
  }
  i {
    color: white;
  }
}

.btn-mainColor {
  background-color: #5138d6;
  color: white;
  &:focus,
  &:hover {
    background-color: #644fe5;
    color: white;
  }
}

@media (max-width: 767px) {
  .category {
    flex-direction: column !important;
    margin: auto;
    width: 80%;
    .text-side {
      flex-direction: column !important;
      gap: 10px;
    }
  }
}

@media (max-width: 991px) {
  .helpMessage {
    flex-direction: column;
    text-align: center;
  }
}

.category {
  transition: 0.3s;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
    border-color: #d8d1ff;
    &:hover .imageSide img {
      transform: scale(1.06);
    }
  }
  .imageSide img {
    transition: 0.3s;
  }
}
</style>
