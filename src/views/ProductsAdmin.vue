<template>
  <div class="ProductsAdmin" style="background-color: var(--background-section)">
    <div class="container-fluid m-0">
      <div class="row">
        <div class="col-lg-2 p-0 border-end">
          <!-- SideBar Component  -->
          <SideBar />
        </div>
        <div class="col-lg-10 px-4" style="background-color: var(--background-section)">
          <!-- TopBar Component  -->
          <TopBar />

          <div class="d-flex align-items-center justify-content-between flex-column flex-md-row">
            <nav aria-label="breadcrumb" class="me-auto">
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
                    style="color: #9ca4b1"
                  >
                    Products</router-link
                  >
                </li>
              </ol>
            </nav>
            <div class="addNewProducts my-3">
              <router-link class="btn btn-mainColor" :to="{ name: 'addProduct' }"
                ><i class="bi bi-plus"></i> Add New Product</router-link
              >
            </div>
          </div>

          <div class="boxes row my-4">
            <div class="col-md-3">
              <div class="box p-3 bg-white border rounded d-flex gap-3 mb-3 mb-md-0">
                <div
                  class="icon d-flex justify-content-center align-items-center rounded-pill"
                  style="width: 40px; height: 40px; background-color: #f4f2fe; color: #5a3ef6"
                >
                  <i class="bi bi-box fs-5"></i>
                </div>
                <div class="details">
                  <div class="title">Total Products</div>
                  <div class="number fs-3 fw-bold">{{ productsStore.products.length }}</div>
                  <div class="state small text-muted">All Products</div>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="box p-3 bg-white border rounded d-flex gap-3 mb-3 mb-md-0">
                <div
                  class="icon d-flex justify-content-center align-items-center rounded-pill"
                  style="width: 40px; height: 40px; background-color: #fef4e9; color: #fd8e10"
                >
                  <i class="bi bi-bar-chart-steps fs-5"></i>
                </div>
                <div class="details">
                  <div class="title">Low Stock Products</div>
                  <div class="number fs-3 fw-bold">{{ lowStockProducts }}</div>
                  <div class="state small text-muted">Stock less than or equal 3</div>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="box p-3 bg-white border rounded d-flex gap-3 mb-3 mb-md-0">
                <div
                  class="icon d-flex justify-content-center align-items-center rounded-pill"
                  style="width: 40px; height: 40px; background-color: #fde6ea; color: #fa1b3f"
                >
                  <i class="bi bi-exclamation-circle fs-5"></i>
                </div>
                <div class="details">
                  <div class="title">Out Of Stock</div>
                  <div class="number fs-3 fw-bold">
                    {{ outOfStockProducts }}
                  </div>
                  <div class="state small text-muted">No stock available</div>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div class="box p-3 bg-white border rounded d-flex gap-3 mb-3 mb-md-0">
                <div
                  class="icon d-flex justify-content-center align-items-center rounded-pill"
                  style="width: 40px; height: 40px; background-color: #f0effe; color: #432fe1"
                >
                  <i class="bi bi-tag fs-5"></i>
                </div>
                <div class="details">
                  <div class="title">Total Categories</div>
                  <div class="number fs-3 fw-bold">{{ categoriesStore.categoriesLength }}</div>
                  <div class="state small text-muted">Product categories</div>
                </div>
              </div>
            </div>
          </div>

          <div class="filtering p-3 bg-white rounded border mb-3">
            <form class="d-flex align-items-center justify-content-between flex-column flex-md-row">
              <div class="search input-group w-25">
                <span class="input-group-text text-muted" id="basic-addon1"
                  ><i class="bi bi-search"></i
                ></span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search products by name..."
                  aria-label="search"
                  aria-describedby="basic-addon1"
                  style="box-shadow: none"
                  v-model="searchResult"
                />
              </div>
              <div class="selectStatus w-25">
                <select class="form-select" aria-label="select " v-model="categoryResult">
                  <option value="all">All Categories</option>
                  <option
                    v-for="category of categoriesStore.categories"
                    :key="category._id"
                    :value="category._id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>
              <div class="selectStock w-25">
                <select class="form-select" aria-label="select" v-model="stockResult">
                  <option value="all">All Stock</option>
                  <option value="inStock">In Stock</option>
                  <option value="lowStock">Low Stock</option>
                  <option value="outOfStock">Out of Stock</option>
                </select>
              </div>
              <div class="actions">
                <div class="resetBtn">
                  <button
                    class="btn border w-100"
                    style="background-color: #fefefe; color: #56617d"
                    @click.prevent="resetFilter"
                  >
                    <i class="bi bi-arrow-repeat"></i> Reset
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div class="products p-3 bg-white mb-3 rounded border" v-if="productsStore.products">
            <div class="responsive-table position-relative" style="height: 300px; overflow: auto">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col" style="background-color: #f7f9fb; border-top-left-radius: 5px">
                      Product
                    </th>
                    <th scope="col" style="background-color: #f7f9fb">Category</th>
                    <th scope="col" style="background-color: #f7f9fb">Price</th>
                    <th scope="col" style="background-color: #f7f9fb">Stock</th>
                    <th scope="col" style="background-color: #f7f9fb">Created At</th>
                    <th scope="col" style="background-color: #f7f9fb; border-top-right-radius: 5px">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <div
                    v-if="filteringProducts.length === 0"
                    class="position-absolute text-center mt-4 w-100"
                    style="left: 50%; top: 50%; transform: translate(-50%, -50%)"
                  >
                    <div class="details text-center">
                      <h1 class="display-3" style="color: #4a5568">No products found</h1>
                      <p class="h4">There are currently no products in your inventory.</p>
                    </div>
                  </div>

                  <tr v-for="product of filteringProducts" :key="product._id">
                    <th scope="row">
                      <div class="productDetails d-flex align-items-center gap-2">
                        <div class="image p-2 rounded border" style="background-color: #f9f8f9">
                          <img
                            :src="`http://localhost:7000/${product.image}`"
                            :alt="product.name"
                            style="width: 70px; height: 70px; object-fit: contain"
                          />
                        </div>
                        <div class="productName">{{ product.name }}</div>
                      </div>
                    </th>
                    <td>{{ product.name }}</td>
                    <td>${{ product.price }}</td>
                    <td
                      :style="{
                        color:
                          product.stock >= 3
                            ? '#0dab3b'
                            : product.stock === 0
                              ? '#f80825'
                              : '#fe7d29',
                      }"
                    >
                      {{ product.stock }}
                    </td>
                    <td>{{ formatDate(product.createdAt) }}</td>
                    <td>
                      <div class="actions d-flex align-items-center gap-1">
                        <router-link
                          :to="{ name: 'productDetails', params: { productId: product._id } }"
                        >
                          <div class="eye">
                            <i class="bi bi-eye btn btn-light btn-sm border rounded"></i>
                          </div>
                        </router-link>
                        <router-link
                          :to="{ name: 'editProduct', params: { productId: product._id } }"
                        >
                          <div class="edit"><i class="bi bi-pencil btn btn-sm border"></i></div>
                        </router-link>

                        <div class="delete" @click="deleteProduct(product._id)">
                          <i class="bi bi-trash btn btn-sm border"></i>
                        </div>
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
</template>

<script setup>
import { formatDate } from "../utils/formatDate";
import SideBar from "@/components/SideBar.vue";
import TopBar from "@/components/TopBar.vue";
import { useProductsStore } from "@/stores/products";
import { useCategoryStore } from "@/stores/category";
import { computed, onMounted, ref } from "vue";
import { fetchWithRefresh } from "../../public/fetchWithRefresh";
import { toast } from "vue3-toastify";

// Define products store
const productsStore = useProductsStore();

// Define categories store
const categoriesStore = useCategoryStore();

// Variable to store the search input result
const searchResult = ref("");

// Variable to store the category
const categoryResult = ref("all");

// Variable to store the stock
const stockResult = ref("all");

// Computed to calculate the low  stock products
const lowStockProducts = computed(() => {
  return productsStore.products.filter((product) => product.stock <= 3).length;
});

// Computed to calculate the out of stock products
const outOfStockProducts = computed(() => {
  return productsStore.products.filter((product) => product.stock === 0).length;
});

// Computed to filter the products
const filteringProducts = computed(() => {
  // const categoryFilter = productsStore.products.filter((product) =>
  //   categoryResult.value === "all" ? product : product.categoryId._id === categoryResult.value,
  // );

  return (
    stockResult.value === "all"
      ? productsStore.products
      : stockResult.value === "inStock"
        ? productsStore.products.filter((product) => product.stock > 3)
        : stockResult.value === "lowStock"
          ? productsStore.products.filter((product) => product.stock > 0 && product.stock <= 3)
          : productsStore.products.filter((product) => product.stock === 0)
  )
    .filter((product) =>
      categoryResult.value === "all" ? product : product.categoryId._id === categoryResult.value,
    )
    .filter((product) =>
      product.name.toLowerCase().includes(searchResult.value.toLocaleLowerCase()),
    );
});

// Function to reset the filter
const resetFilter = () => {
  searchResult.value = "";
  categoryResult.value = "all";
  stockResult.value = "all";
};

// Function to delete the product
const deleteProduct = async (id) => {
  const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/deleteProduct/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();

  if (data.success) {
    toast.error("Deleted product successfully!");
    await productsStore.getProducts();
  }
};

onMounted(async () => {
  await productsStore.getProducts();
  console.log(productsStore.products);

  await categoriesStore.getCategories();
  await categoriesStore.getCategoriesLength();
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

.resetBtn {
  button {
    transition: 0.3s;
    &:hover {
      background-color: #f8f3f3 !important;
    }
  }
}

.edit {
  i {
    background: #fdfdfd;
    color: #5b43ee;
    border-color: #dbd6fb !important;
    transition: 0.3s;
    &:hover {
      background-color: #e6e6ff;
    }
  }
}

.delete {
  i {
    background: #fcf8f8;
    color: #fc233e;
    border-color: #fcdce3 !important;
    transition: 0.3s;
    &:hover {
      background-color: #ffdbdb;
    }
  }
}

tbody tr:hover {
  background: #fafafa;
}
table td {
  padding-top: 34px;
}

.filtering {
  .search,
  .selectStatus,
  .selectStock,
  .actions {
    @media (max-width: 767px) {
      width: 100% !important;
      margin-bottom: 20px;
    }
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
