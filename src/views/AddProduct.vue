<template>
  <div class="AddProduct vh-100" style="background-color: var(--background-section)">
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
                    name: 'addProduct',
                  }"
                  class="text-decoration-none"
                  style="color: #9ca4b1"
                >
                  Add Product</router-link
                >
              </li>
            </ol>
          </nav>

          <div class="row">
            <div class="col-lg-8">
              <div class="productInformation bg-white p-3 rounded border">
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
                      <div>
                        <option
                          v-for="category of categoryStore.categories"
                          :key="category._id"
                          :value="category._id"
                        >
                          {{ category.name }}
                        </option>
                      </div>
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
                  @click="openSelectWindow"
                  style="height: 87%"
                >
                  <div
                    class="body text-center d-flex flex-column justify-content-center align-items-center m-auto"
                  >
                    <div
                      class="icon mx-auto mb-3 d-flex justify-content-center align-items-center rounded-pill"
                      style="width: 70px; height: 70px; background-color: #f4f3fd; color: #5341e4"
                    >
                      <i class="bi bi-upload fs-1"></i>
                    </div>
                    <div class="details">
                      <h6>Upload Product Image</h6>
                      <p class="text-muted">JPG, PNG,WEBP</p>
                      <div class="desc text-muted">
                        Drag & drop an image here <br />
                        or <span style="color: #5341e4">Click to browse</span>
                      </div>
                    </div>
                  </div>
                  <input
                    type="file"
                    class="d-none"
                    accept="images/*"
                    ref="myFileInput"
                    @change="getFileFromWindow"
                  />
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
            <div class="saveAndCreate d-flex align-items-center gap-2 my-4">
              <div class="cancle" @click.prevent="cancleProduct">
                <button class="btn border" style="background-color: white; border: none">
                  <i class="bi bi-ban"></i> Cancle
                </button>
              </div>
              <div class="saveBtn" @click="saveProduct">
                <button class="btn btn-mainColor"><i class="bi bi-plus"></i> Save Products</button>
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
import { fetchWithRefresh } from "../../public/fetchWithRefresh";
import { useCategoryStore } from "@/stores/category";
import { toast } from "vue3-toastify";

// Define the store
const categoryStore = useCategoryStore();

// Variables to store the informations of product
const productName = ref("");
const description = ref("");
const price = ref("");
const stock = ref(0);
const category = ref("default");

// Variable to get the upload file
const myFileInput = ref(null);

// لما تضغط افتحلي اختيار ملف
const openSelectWindow = () => {
  myFileInput.value.click();
};

const saveProduct = async () => {
  const formData = new FormData();
  formData.append("name", productName.value);
  formData.append("description", description.value);
  formData.append("price", price.value);
  formData.append("stock", stock.value);
  formData.append("categoryId", category.value);
  formData.append("image", myFileInput.value.files[0]);

  const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/addProduct`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  const data = await response.json();

  if (data.success) {
    toast.success("Product Addedd Successfully");
    productName.value = "";
    description.value = "";
    price.value = "";
    stock.value = 0;
    category.value = "default";
  }
};

// Function to cancle the product
const cancleProduct = () => {
  productName.value = "";
  description.value = "";
  price.value = "";
  stock.value = 0;
  category.value = "default";
};

onMounted(async () => {
  await categoryStore.getCategories();
});
</script>

<style lang="scss" scoped>
.dropZone {
  width: 100%;
  height: 400px;
  border: 2px dashed #b4aef5;
  border-radius: 6px;
  margin: 20px 0 !important;
  cursor: pointer;
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
    background-color: #644fe5;
    color: white;
    &:hover {
      background-color: #4d34ef;
    }
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
</style>
