<template>
  <div class="EditProduct" v-if="productsStore.product">
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
                  >
                    Products</router-link
                  >
                </li>
                <li class="breadcrumb-item" aria-current="page">
                  <router-link
                    :to="{
                      name: 'editProduct',
                      params: { productId: productId },
                    }"
                    class="text-decoration-none"
                    style="color: #9ca4b1"
                  >
                    Edit Product</router-link
                  >
                </li>
              </ol>
            </nav>
            <div class="saveAndCreate d-flex align-items-center gap-2 my-3">
              <div class="cancle" @click.prevent="cancleProduct">
                <button
                  class="btn border d-flex align-items-center gap-2"
                  style="background-color: white; border: none"
                >
                  <span><i class="bi bi-x fs-5"></i></span> <span>Cancle</span>
                </button>
              </div>
              <div class="saveBtn" @click="updateProduct">
                <button class="btn btn-mainColor">
                  <i class="bi bi-file-earmark-text fs-5"></i> Update Product
                </button>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-8">
              <div class="productInformation bg-white p-3 rounded border mb-3 mb-md-0">
                <div class="header d-flex align-items-center gap-3">
                  <div
                    class="icon d-flex justify-content-center align-items-center rounded-pill"
                    style="width: 40px; height: 40px; color: #5b51e4; background-color: #f1effd"
                  >
                    <i class="bi bi-box fs-5"></i>
                  </div>
                  <div class="title fw-bold">Product Information</div>
                </div>
                <form class="my-4">
                  <label for="productName" class="form-label">Product Name</label>
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1"
                      ><i class="bi bi-pencil-square text-muted"></i
                    ></span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter product name"
                      aria-label="productName"
                      name="productName"
                      aria-describedby="basic-addon1"
                      style="box-shadow: none"
                      v-model="productName"
                    />
                  </div>
                  <label for="productDesc" class="form-label">Description</label>
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1"
                      ><i class="bi bi-card-text text-muted"></i
                    ></span>
                    <textarea
                      type="text"
                      class="form-control"
                      placeholder="Write a short description..."
                      aria-label="description"
                      name="description"
                      aria-describedby="basic-addon1"
                      style="box-shadow: none; min-height: 120px"
                      v-model="description"
                    />
                  </div>
                  <div class="d-flex gap-2">
                    <div class="left flex-grow-1">
                      <label for="price" class="form-label">Price</label>
                      <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1"
                          ><i class="bi bi-cash-coin text-muted"></i>
                        </span>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="0.00"
                          aria-label="price"
                          name="price"
                          aria-describedby="basic-addon1"
                          style="box-shadow: none"
                          v-model="price"
                        />
                      </div>
                    </div>
                    <div class="right flex-grow-1">
                      <label for="productName" class="form-label">Stock</label>
                      <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1"
                          ><i class="bi bi-boxes text-muted"></i
                        ></span>
                        <input
                          type="number"
                          class="form-control"
                          placeholder="0"
                          aria-label="stock"
                          name="stock"
                          aria-describedby="basic-addon1"
                          style="box-shadow: none"
                          v-model="stock"
                        />
                      </div>
                    </div>
                  </div>
                  <label for="category" class="form-label">Category</label>
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1"
                      ><i class="bi bi-grid text-muted"></i
                    ></span>
                    <select
                      class="form-select"
                      aria-label=" select "
                      style="box-shadow: none"
                      v-model="category"
                    >
                      <option selected value="default">Select a category</option>
                      <option
                        v-for="category of categoryStore.categories"
                        :key="category._id"
                        :value="category._id"
                      >
                        {{ category.name }}
                      </option>
                    </select>
                  </div>
                </form>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="productImage bg-white p-3 rounded border" style="height: 530px">
                <div class="header d-flex align-items-center gap-3">
                  <div
                    class="icon d-flex justify-content-center align-items-center rounded-pill"
                    style="width: 40px; height: 40px; color: #5b51e4; background-color: #f1effd"
                  >
                    <i class="bi bi-image"></i>
                  </div>
                  <div class="title fw-bold">Product Image</div>
                </div>

                <div
                  class="dropZone d-flex flex-column align-items-stretch justify-content-between"
                  style="height: 87%"
                >
                  <div class="image position-relative">
                    <img
                      :src="`${apiUrl}/${productsStore.product.image}`"
                      :alt="productsStore.product.name"
                      class="img-fluid rounded"
                      style="width: 100%; height: 250px; object-fit: cover"
                    />
                    <div
                      class="trash position-absolute bg-white rounded-pill d-flex align-items-center justify-content-center"
                      v-if="productsStore.product.image"
                      style="
                        top: 10px;
                        right: 10px;
                        width: 30px;
                        height: 30px;
                        cursor: pointer;
                        color: #fb677e;
                      "
                      @click="deleteImgFromProduct"
                    >
                      <i class="bi bi-trash"></i>
                    </div>
                  </div>
                  <div class="changeImg my-2">
                    <div class="chngBtn text-center">
                      <button class="btn btn-change" @click="openSelectWindow">
                        <i class="bi bi-cloud-arrow-up"></i> Change Image
                      </button>
                    </div>
                    <div class="types text-center mt-1" style="color: #7b7f88">JPG, PNG, WEBP</div>
                    <input type="file" ref="myFileInput" class="d-none" />
                  </div>
                  <div class="footer border-top p-3">
                    <div class="info d-flex align-items-center justify-content-between">
                      <div class="box d-flex gap-2 align-items-center mb-2 mb-xl-0">
                        <div
                          class="icon d-flex justify-content-center align-items-center rounded-pill"
                          style="
                            width: 40px;
                            height: 40px;
                            color: #5b51e4;
                            background-color: #f1effd;
                          "
                        >
                          <i class="bi bi-image"></i>
                        </div>
                        <div class="details">
                          <div class="head">Recommended</div>
                          <div class="size text-muted">800 x 800 px</div>
                        </div>
                      </div>
                      <div class="vr" style="height: 35px"></div>
                      <div class="box d-flex gap-2 align-items-center mb-2 mb-xl-0">
                        <div
                          class="icon d-flex justify-content-center align-items-center rounded-pill"
                          style="
                            width: 40px;
                            height: 40px;
                            color: #5b51e4;
                            background-color: #f1effd;
                          "
                        >
                          <i class="bi bi-file"></i>
                        </div>
                        <div class="details">
                          <div class="head">Max Size</div>
                          <div class="size text-muted small">2 MB</div>
                        </div>
                      </div>
                    </div>
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
import SideBar from "@/components/SideBar.vue";
import TopBar from "@/components/TopBar.vue";
import { onMounted, ref } from "vue";
import { useProductsStore } from "@/stores/products";
import { useCategoryStore } from "@/stores/category";
import { useRoute } from "vue-router";
import { fetchWithRefresh } from "../../public/fetchWithRefresh";
import { toast } from "vue3-toastify";

// define route
const route = useRoute();

// define products store
const productsStore = useProductsStore();

// define category store
const categoryStore = useCategoryStore();

// Variable to store the productId
const productId = route.params.productId;

// Variables to store the informations of product
const productName = ref();
const description = ref("");
const price = ref("");
const stock = ref(0);
const category = ref("default");
const currentImg = ref("");

// Variable to get the upload file
const myFileInput = ref(null);

// لما تضغط افتحلي اختيار ملف
const openSelectWindow = () => {
  myFileInput.value.click();
};

// Function to cancle the product
const cancleProduct = () => {
  productName.value = "";
  description.value = "";
  price.value = "";
  stock.value = 0;
  category.value = "default";
};

// Function to update product
const updateProduct = async () => {
  const formData = new FormData();

  formData.append("name", productName.value);
  formData.append("description", description.value);
  formData.append("price", price.value);
  formData.append("stock", stock.value);
  formData.append("categoryId", category.value);
  formData.append("image", myFileInput.value.files[0]);

  const response = await fetchWithRefresh(
    `${import.meta.env.VITE_API_URL}/editProduct/${productId}`,
    {
      method: "PUT",
      body: formData,
      credentials: "include",
    },
  );

  const data = await response.json();

  if (data.success) {
    toast.success("Product updated successfully");
    await productsStore.getProduct(data.product._id);
  }
};

// Function to delete image from product
const deleteImgFromProduct = async () => {
  const response = await fetchWithRefresh(
    `${import.meta.env.VITE_API_URL}/deleteImgProduct/${productId}`,
    {
      method: "PATCH",
      credentials: "include",
    },
  );

  const data = await response.json();

  if (data.success) {
    toast.success("Image deleted successfully");
    await productsStore.getProduct(data.product._id);
  }
};

const apiUrl = import.meta.env.VITE_API_URL;

onMounted(async () => {
  await categoryStore.getCategories();
  await productsStore.getProduct(productId);
  productName.value = productsStore.product.name;
  description.value = productsStore.product.description;
  price.value = productsStore.product.price;
  stock.value = productsStore.product.stock;
  category.value = productsStore.product.categoryId._id;
  currentImg.value = productsStore.product.image;
});
</script>

<style lang="scss" scoped>
.dropZone {
  width: 100%;
  height: 400px;
  border-radius: 6px;
  margin: 20px 0 !important;
}

.info {
  @media (max-width: 1400px) {
    flex-direction: column;
    .vr {
      display: none;
    }
    .box:first-of-type {
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
    }
    .box:last-of-type {
      padding-top: 10px;
    }
  }
}

.btn-mainColor {
  background-color: var(--main-color);
  color: white;
  &:focus,
  &:hover {
    transition: 0.3s;
    background-color: #8876fe;
    color: white;
  }
}
.saveAndCreate {
  .cancle {
    button {
      transition: 0.3s;
      &:hover {
        background-color: rgb(244, 244, 244) !important;
      }
    }
  }
}

.btn-change {
  padding: 8px;
  border-radius: 8px;
  border: 2px solid #e4e7ec;
  color: #4c41ec;
  transition: 0.3s;
  &:hover {
    background-color: #4c41ec;
    color: white;
    border-color: #8d85ff;
  }
}

.trash {
  transition: 0.3s;
  &:hover {
    scale: 1.1;
  }
}

@media (max-width: 1400px) {
  .productImage {
    height: 560px !important;
  }
}
</style>
