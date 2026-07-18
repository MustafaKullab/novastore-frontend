<template>
  <div class="Categories Admin">
    <div class="container-fluid m-0">
      <div class="row">
        <div class="col-lg-2 p-0 border-end">
          <!-- SideBar Component  -->
          <SideBar />
        </div>
        <div class="col-lg-10 px-4" style="background-color: var(--background-section)">
          <!-- TopBar Component  -->
          <TopBar />

          <div class="d-flex justify-content-between align-items-center">
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
                      name: 'categoriesAdmin',
                    }"
                    class="text-decoration-none"
                    style="color: #9ca4b1"
                  >
                    Categories</router-link
                  >
                </li>
              </ol>
            </nav>
            <div class="addCategoryBtn">
              <button
                class="btn btn-mainColor"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#addCategory"
              >
                <i class="bi bi-plus"></i> Add New Category
              </button>

              <!-- Modal -->
              <div
                class="modal fade"
                id="addCategory"
                tabindex="-1"
                aria-labelledby="AddCategoryId"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="AddCategoryId">Add New Category</h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        style="box-shadow: none"
                        ref="closeBtn"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div class="mb-3">
                        <label for="categoryName" class="form-label">Enter category name</label>
                        <div class="input-group">
                          <span class="input-group-text" id="category"
                            ><i class="bi bi-bookmark-plus"></i
                          ></span>
                          <input
                            type="text"
                            class="form-control"
                            id="categoryName"
                            placeholder="Category name"
                            aria-describedby="category basic-addon4"
                            style="box-shadow: none"
                            v-model="categoryName"
                          />
                        </div>
                      </div>
                      <div class="mb-3">
                        <label for="categoryDesc" class="form-label"
                          >Enter category description</label
                        >
                        <div class="input-group">
                          <span class="input-group-text" id="category"
                            ><i class="bi bi-file-earmark-text"></i
                          ></span>
                          <textarea
                            type="text"
                            class="form-control"
                            id="categoryDesc"
                            placeholder="Category name"
                            aria-describedby="category basic-addon4"
                            style="box-shadow: none; height: 80px; resize: none"
                            v-model="categoryDescription"
                          />
                        </div>
                      </div>

                      <select
                        class="form-select"
                        aria-label="Default select example"
                        v-model="isActive"
                      >
                        <option selected value="default">Is Active</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </select>

                      <div class="mt-3">
                        <label for="formFile" class="form-label"
                          >Choose the image of category</label
                        >
                        <input class="form-control" type="file" id="formFile" ref="imgCategory" />
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                      </button>
                      <button type="button" class="btn btn-primary" @click="addNewCategory">
                        Add Category
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="categories p-3 bg-white border rounded my-4">
            <div
              class="searchAndReset d-flex justify-content-between mb-3 mb-md-0 text-center text-md-start"
            >
              <div class="search">
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1"
                    ><i class="bi bi-search"></i
                  ></span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search categories by name..."
                    aria-label="search"
                    aria-describedby="basic-addon1"
                    style="box-shadow: none"
                    v-model="searchFilter"
                  />
                </div>
              </div>
              <div class="reset">
                <button class="btn btn-light border">
                  <i class="bi bi-arrow-repeat"></i> Reset
                </button>
              </div>
            </div>

            <div class="table-responsive position-relative" style="min-height: 450px">
              <table class="table table-hover" style="overflow: auto">
                <thead>
                  <tr>
                    <th scope="col" style="background-color: #f8f9fa; white-space: nowrap">
                      Category Name
                    </th>
                    <th scope="col" style="background-color: #f8f9fa; white-space: nowrap">
                      Products Count
                    </th>
                    <th scope="col" style="background-color: #f8f9fa; white-space: nowrap">
                      Created At
                    </th>
                    <th scope="col" style="background-color: #f8f9fa; white-space: nowrap">
                      Status
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
                    v-if="filteringCategories.length === 0"
                    class="position-absolute text-center mt-4 w-100"
                    style="left: 50%; top: 50%; transform: translate(-50%, -50%)"
                  >
                    <svg
                      class="empty-icon"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="1.5"
                      style="background-color: transparent; width: 200px; color: #4a5568"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a8.966 8.966 0 012.36 1.964l1.042 1.39a8.965 8.965 0 002.36 1.964H18a2.25 2.25 0 012.25 2.25v.776"
                      />
                    </svg>

                    <div class="details text-center">
                      <h1 class="display-3" style="color: #4a5568">No categories found</h1>
                      <p class="h4">There are currently no categories created for your products.</p>
                    </div>
                  </div>

                  <tr
                    v-for="category of filteringCategories"
                    :key="category?._id"
                    style="height: 70px"
                  >
                    <th scope="row">
                      <div class="mt-3">{{ category.name }}</div>
                    </th>
                    <td class="ps-5">
                      <div class="ps-3 mt-3">{{ getProductCount(category?._id) }}</div>
                    </td>
                    <td>
                      <div class="mt-3">{{ formatDate(category.createdAt) }}</div>
                    </td>
                    <td>
                      <div
                        class="rounded mt-2"
                        style="padding: 5px 10px; width: fit-content"
                        :style="{
                          backgroundColor: category.isActive ? '#e4f8ec' : 'rgb(248 228 228)',
                          color: category.isActive ? '#3cba5a' : 'rgb(186 60 60)',
                        }"
                      >
                        {{ category.isActive ? "Active" : "Not Active" }}
                      </div>
                    </td>
                    <td>
                      <div class="d-flex align-items-center gap-2 justify-content-center">
                        <div
                          class="edit border rounded mt-3"
                          style="
                            padding: 4px 8px;
                            width: fit-content;
                            background-color: #fdfdfd;
                            border-color: #fdfdfd;
                            color: #5b43ee;
                            cursor: pointer;
                          "
                          type="button"
                          data-bs-toggle="modal"
                          :data-bs-target="`#exampleModal-${category._id}`"
                        >
                          <i class="bi bi-pencil"></i>
                        </div>

                        <!-- Modal -->
                        <div
                          class="modal fade"
                          :id="`exampleModal-${category._id}`"
                          :aria-labelledby="`categoryId-${category._id}`"
                          aria-hidden="true"
                        >
                          <div class="modal-dialog">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h1 class="modal-title fs-5" :id="`categoryId-${category._id}`">
                                  Edit state of category
                                </h1>
                                <button
                                  type="button"
                                  class="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                  :id="`close-${category._id}`"
                                ></button>
                              </div>
                              <div class="modal-body">
                                <select class="form-select" v-model="stateOfCategory">
                                  <option selected value="default" disabled>
                                    Select the state
                                  </option>
                                  <option value="true">Active</option>
                                  <option value="false">Not active</option>
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
                                  @click="changeState(category._id)"
                                >
                                  Change state
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="trash border rounded mt-3"
                          style="
                            padding: 4px 8px;
                            width: fit-content;
                            background-color: #fcf8f7;
                            border-color: #f9e6ec;
                            color: #fd466b;
                            cursor: pointer;
                          "
                          @click="deleteCategory(category?._id)"
                        >
                          <i class="bi bi-trash"></i>
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
import { formatDate } from "../../public/formatDate";
import SideBar from "@/components/SideBar.vue";
import TopBar from "@/components/TopBar.vue";
import { useCategoryStore } from "@/stores/category";
import { useProductsStore } from "@/stores/products";
import { computed, onMounted, ref } from "vue";
import { fetchWithRefresh } from "../../public/fetchWithRefresh";
import { toast } from "vue3-toastify";

// Define category store
const categoryStore = useCategoryStore();

// Define product store
const productStore = useProductsStore();

// Get the close btn
const closeBtn = ref(null);

// Variable to store the category name
const categoryName = ref("");

// Variable to store the category name
const categoryDescription = ref("");

// Variable to store the category state
const isActive = ref("default");

// Variable to store the change state
const stateOfCategory = ref("default");

// Function to change the state of category
const changeState = async (categoryId) => {
  if (stateOfCategory.value === "default") {
    return;
  }

  const response = await fetchWithRefresh(
    `${import.meta.env.VITE_API_URL}/changeStateCategory/${categoryId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ status: stateOfCategory.value }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    },
  );

  const data = await response.json();

  const closeBtn = document.getElementById(`close-${categoryId}`);

  if (data.success) {
    if (document.activeElement) {
      document.activeElement.blur();
    }

    if (closeBtn) {
      closeBtn.click();
    }
    await categoryStore.getCategories();
  }
};

const imgCategory = ref(null);

// Filter to search
const searchFilter = ref("");

// Function to add new category
const addNewCategory = async () => {
  const formData = new FormData();

  formData.append("name", categoryName.value);
  formData.append("description", categoryDescription.value);
  formData.append("isActive", isActive.value);
  formData.append("image", imgCategory.value.files[0]);

  const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/addCategory`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  const data = await response.json();

  console.log(data);

  if (data.success) {
    if (document.activeElement) {
      document.activeElement.blur();
    }

    categoryName.value = "";
    categoryDescription.value = "";
    isActive.value = "default";
    closeBtn.value.click();
    await categoryStore.getCategories();
    toast.success("Category created successfully!");
  }
};

// Filtering categories
const filteringCategories = computed(() => {
  return categoryStore.categories.filter((category) =>
    category.name.toLowerCase().includes(searchFilter.value.toLowerCase()),
  );
});

// Function to delete category
const deleteCategory = async (id) => {
  await categoryStore.deleteCategory(id);
  toast.error("Category deleted successfully");
};

// Function to get count of products
const getProductCount = (categoryId) => {
  return productStore.products.filter((product) => product.categoryId?._id === categoryId).length;
};

onMounted(async () => {
  await categoryStore.getCategories();
  await productStore.getProducts();
});
</script>

<style lang="scss" scoped>
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

.trash {
  transition: 0.3s;
  &:hover {
    background-color: #ffe7e7 !important;
    scale: 1.15;
  }
}

.edit {
  transition: 0.3s;
  &:hover {
    background-color: #f3f3f3 !important;
    scale: 1.15 !important;
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
