<template>
  <div class="CategoriesSection">
    <div class="container">
      <div class="header d-flex justify-content-between">
        <div class="title">
          <h4>Shop by category</h4>
        </div>
        <div class="text-end m-0">
          <button
            @click="clearFilter"
            class="clearAll m-0 btn border"
            style="color: var(--main-color); cursor: pointer; width: fit-content"
          >
            Clear
          </button>
        </div>
      </div>
      <div class="categories row mt-4">
        <div
          class="col-lg-2 cursor-pointer"
          v-for="category of categoryStore.categories"
          :key="category.name"
        >
          <div
            class="categoryBox text-center p-3 rounded d-flex flex-column justify-content-center align-items-center"
            @click.prevent="updateProducts(category._id)"
            :class="{ active: categoryStore.selectedCategory === category._id }"
            style="min-height: 140px"
          >
            <div class="image">
              <img
                :src="`${apiUrl}/${category.image}`"
                class="img-fluid mb-2"
                style="width: 57px"
                alt="Electronics"
              />
            </div>
            <div class="categoryName fw-bold mt-2">{{ category.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import the store of category
import { useCategoryStore } from "@/stores/category";
import { onMounted } from "vue";
import { useProductsStore } from "@/stores/products";
const categoryStore = useCategoryStore();
const productsStore = useProductsStore();

// Function to clear flter
const clearFilter = () => {
  categoryStore.selectedCategory = "All";

  productsStore.getProducts({ categoryId: null });
};

const updateProducts = (categoryId) => {
  categoryStore.selectedCategory = categoryId;
  console.log("From cat page : " + categoryId);

  productsStore.getProducts({ categoryId });
};

const apiUrl = import.meta.env.VITE_API_URL;

onMounted(async () => {
  await categoryStore.getCategories();
});
</script>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}
.categoryBox {
  background-color: #eeecfd;
  transition: 0.3s;
  @media (max-width: 991px) {
    margin-bottom: 20px;
  }
  &:hover,
  &.active {
    background-color: #462fda9c;
    box-shadow: 0px 0px 20px 0px #462fda;
    color: #e9e9e9;
  }
}

.clearAll:hover {
  background-color: var(--main-color) !important;
  color: white !important;
  border-color: rgb(204, 204, 204) !important;
}
</style>
