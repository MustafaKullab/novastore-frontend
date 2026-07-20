<template>
  <div class="ProductPage py-4" style="background-color: var(--background-section)">
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link :to="{ name: 'homePage' }" class="text-decoration-none">Home</router-link>
          </li>
          <li class="breadcrumb-item" aria-current="page">
            <router-link
              :to="{ name: 'products' }"
              class="text-decoration-none"
              style="color: #9ca4b1"
            >
              Products
            </router-link>
          </li>
        </ol>
      </nav>
      <div class="row py-4">
        <div class="col-lg-3">
          <div class="filter p-3 bg-white rounded border">
            <div
              class="header d-flex align-items-center justify-content-between py-2 border-bottom"
            >
              <div class="title"><h5>Filter</h5></div>
              <div
                class="clearAll fw-bold"
                style="color: var(--main-color); cursor: pointer"
                @click="clearFilter"
              >
                Clear All
              </div>
            </div>
            <div class="body">
              <div class="categories py-3">
                <div class="accordion" id="categoryAccordation">
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button fw-bold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="false"
                        aria-controls="collapseOne"
                        style="box-shadow: none; background-color: transparent"
                      >
                        Categories
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      class="accordion-collapse collapse show"
                      data-bs-parent="#categoryAccordation"
                    >
                      <div class="accordion-body">
                        <div
                          class="catrgory d-flex align-items-center justify-content-between mb-2"
                          @click="categoryStore.setCategory('All')"
                        >
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="category"
                              id="allCategories"
                              :checked="categoryStore.selectedCategory === 'All'"
                              style="box-shadow: none"
                              value="All"
                            />
                            <label class="form-check-label" for="allCategories">
                              All Categories
                            </label>
                          </div>
                          <div class="number" style="color: #6c778d">({{ countProducts }})</div>
                        </div>

                        <div
                          class="catrgory d-flex align-items-center justify-content-between mb-2"
                          v-for="category of categoryStore.categories"
                          :key="category._id"
                          @click="categoryStore.setCategory(category._id)"
                        >
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="category"
                              :id="category._id"
                              style="box-shadow: none"
                              :value="category._id"
                              :checked="categoryStore.selectedCategory === category._id"
                            />
                            <label class="form-check-label" :for="category">
                              {{ category.name }}
                            </label>
                          </div>
                          <div class="number" style="color: #6c778d">
                            ({{ getCategoryCount(category._id) }})
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button fw-bold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                        style="box-shadow: none; background-color: transparent"
                      >
                        Price Range
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      class="accordion-collapse collapse show"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <div
                          class="fromTo d-flex align-items-center justify-content-center gap-2 flex-wrap"
                        >
                          <div
                            class="opt1 p-2 border rounded text-center"
                            style="width: fit-content; background-color: #f8fafa; cursor: pointer"
                            @click="setFromTo(0, 50)"
                          >
                            <span class="from">$0</span>
                            <span> - </span>
                            <span class="to">$50</span>
                          </div>

                          <div
                            class="opt2 p-2 border rounded text-center"
                            style="width: fit-content; background-color: #f8fafa; cursor: pointer"
                            @click="setFromTo(50, 150)"
                          >
                            <span class="from">$50</span>
                            <span> - </span>
                            <span class="to">$150</span>
                          </div>
                          <div
                            class="opt3 p-2 border rounded text-center"
                            style="width: fit-content; background-color: #f8fafa; cursor: pointer"
                            @click="setFromTo(150, 300)"
                          >
                            <span class="from">$150</span>
                            <span> - </span>
                            <span class="to">$300</span>
                          </div>
                          <div
                            class="opt4 p-2 border rounded text-center"
                            style="width: fit-content; background-color: #f8fafa; cursor: pointer"
                            @click="setFromTo(300, 200000000)"
                          >
                            <span>$300 + </span>
                          </div>
                        </div>
                        <div class="resetPriceBtn">
                          <button class="btn w-100 btn-outline-mainColor mt-2" @click="resetPrice">
                            Reset price
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-9">
          <div class="productsSide">
            <div class="header">
              <h2 class="fw-bold">Products</h2>
              <p class="text-muted small">
                Find exactly what you need from our wide range of quality products.
              </p>
            </div>
            <div class="categories d-flex align-items-center">
              <div
                class="category py-2 px-3 rounded-pill bg-white me-md-2"
                style="cursor: pointer; font-size: 14px"
                @click="categoryStore.setCategory('All')"
                :class="{ active: categoryStore.selectedCategory === 'All' }"
              >
                All Products
              </div>
              <div
                class="category py-2 px-3 rounded-pill bg-white me-md-2"
                style="cursor: pointer; font-size: 14px"
                v-for="category of categoryStore.categories"
                :key="category._id"
                @click="categoryStore.setCategory(category._id)"
                :class="{ active: categoryStore.selectedCategory === category._id }"
              >
                {{ category.name }}
              </div>
            </div>

            <!-- <div class="loadingCircle" v-if="productStore.loading">
              <div></div>
            </div> -->
            <div class="productsStackholder py-5 row" v-if="productStore.loading">
              <div class="col-md-6 col-lg-4 mb-3" v-for="product of 8" :key="product">
                <div class="productHolder rounded"></div>
              </div>
            </div>

            <div class="productsContainer py-5 row" v-if="!productStore.loading">
              <div
                class="col-md-4"
                v-for="product of filteringProducts"
                :key="product._id"
                style="min-height: 450px"
              >
                <div class="product bg-white text-center p-3 mb-2 rounded border">
                  <div
                    class="image p-2 rounded"
                    style="background-color: #fafafa"
                    @click="
                      router.push({ name: 'productDetail', params: { product_id: product._id } })
                    "
                  >
                    <img
                      :src="`${apiUrl}/${product.image}`"
                      class="img-fluid"
                      style="width: 150px; height: 150px; cursor: pointer; object-fit: contain"
                      alt="Books"
                    />
                  </div>
                  <div
                    class="categoryName mt-2 text-start"
                    style="
                      color: var(--main-color);
                      font-weight: 500;
                      height: 30px;
                      cursor: pointer;
                    "
                    @click="
                      router.push({ name: 'productDetail', params: { product_id: product._id } })
                    "
                  >
                    {{ product.category }}
                  </div>
                  <div
                    class="productName text-center"
                    style="height: 50px; cursor: pointer"
                    @click="
                      router.push({ name: 'productDetail', params: { product_id: product._id } })
                    "
                  >
                    {{ product.name }}
                  </div>
                  <div class="productPrice fw-bold text-start" style="height: 30px">
                    ${{ product.price }}
                  </div>
                  <div class="availability text-start text-success" style="height: 30px">
                    {{ product.stock }} Available
                  </div>
                  <div
                    class="quantity d-flex justify-content-center align-items-center gap-2 mx-auto"
                    style="height: 50px"
                  >
                    <div class="incBtn">
                      <button @click="increaseQuantity(product._id)">
                        <i class="bi bi-plus"></i>
                      </button>
                    </div>
                    <span class="quantityNumber">{{ quantities[product._id] }}</span>
                    <div class="decBtn">
                      <button @click="decreaseQuantity(product._id)">
                        <i class="bi bi-dash"></i>
                      </button>
                    </div>
                  </div>
                  <div class="errorMessage mb-3 text-danger" v-if="quantityMessage[product._id]">
                    {{ quantityMessage[product._id] }}
                  </div>
                  <div class="addToCartBtn" style="height: 35px" @click="addToCart(product)">
                    <button
                      class="btn btn-mainColor w-100"
                      :data-bs-toggle="!userStore.user ? 'modal' : ''"
                      :data-bs-target="!userStore.user ? `#loginModal` : ''"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="modal fade"
              id="loginModal"
              tabindex="-1"
              aria-labelledby="loginModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header" style="border: none">
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      ref="closeModal"
                      style="border: 2px solid #00000038; border-radius: 50%"
                    ></button>
                  </div>
                  <div class="title">
                    <div class="fs-2 title text-center fw-bold">You're One Step Away!</div>
                    <div class="description text-center text-muted small" style="line-height: 1.2">
                      Create an account or sign in to unlock the best <br />
                      shopping experience
                    </div>
                  </div>
                  <div class="modal-body">
                    <div class="personIcon text-center">
                      <i class="bi bi-person-fill fs-1"></i>
                    </div>
                    <div class="d-flex bg-white shadow-sm rounded border p-3 my-3">
                      <div class="box text-center">
                        <div
                          class="icon p-3 rounded d-flex justify-content-center align-items-center mx-auto"
                          style="
                            width: 60px;
                            height: 60px;
                            background-color: #f0e9fb;
                            color: #5520bc;
                          "
                        >
                          <i class="bi bi-lightning-charge-fill fs-2"></i>
                        </div>
                        <div class="details">
                          <div class="title fw-bold">Fast & secure checkout</div>
                          <div class="desc">Enjoy a smooth and secure payment experience.</div>
                        </div>
                      </div>
                      <div class="box text-center">
                        <div
                          class="icon p-3 rounded d-flex justify-content-center align-items-center mx-auto"
                          style="
                            width: 60px;
                            height: 60px;
                            background-color: #f0e9fb;
                            color: #5520bc;
                          "
                        >
                          <i class="bi bi-truck fs-2"></i>
                        </div>
                        <div class="details">
                          <div class="title fw-bold">Truck your orders</div>
                          <div class="desc">Stay updated on every step of your delivery.</div>
                        </div>
                      </div>
                      <div class="box text-center">
                        <div
                          class="icon p-3 rounded d-flex justify-content-center align-items-center mx-auto"
                          style="
                            width: 60px;
                            height: 60px;
                            background-color: #f0e9fb;
                            color: #5520bc;
                          "
                        >
                          <i class="bi bi-heart-fill fs-2"></i>
                        </div>
                        <div class="details">
                          <div class="title fw-bold">Save items</div>
                          <div class="desc">
                            Bookmark your favorite products and shop easily later.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer justify-content-center" style="border: none">
                      <button
                        type="button"
                        class="signinBtn btn btn-primary w-100 d-flex align-items-center gap-3 justify-content-center"
                        @click="goToSignPage"
                        style="background: linear-gradient(180deg, #7d4ada, #5322be)"
                      >
                        <div><i class="bi bi-person-plus-fill"></i></div>
                        <div>Sign In / Create Account</div>
                        <div><i class="bi bi-arrow-right"></i></div>
                      </button>
                      <button
                        type="button"
                        class="closeBtn btn btn-secondary w-100 d-flex align-items-center justify-content-center gap-3 fw-bold"
                        data-bs-dismiss="modal"
                        style="
                          background: linear-gradient(180deg, #fdfdfe, #f6f7fa);
                          color: #474456;
                        "
                      >
                        <div><i class="bi bi-person"></i></div>
                        <div>Continue Guest Browsing</div>
                      </button>
                      <div class="msg small text-center text-muted">
                        <i class="bi bi-lock"></i> Your data is safe with us. We never share your
                        information.
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
import { fetchWithRefresh } from "../../public/fetchWithRefresh";
import { computed, onMounted, ref, watch } from "vue";
import { useProductsStore } from "@/stores/products";
import { useCategoryStore } from "@/stores/category";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

// Declare the router
const router = useRouter();

// Stores
const categoryStore = useCategoryStore();
const productStore = useProductsStore();
const userStore = useUserStore();

// Variables to store the from and to (price)
const from = ref(0);
const to = ref(200000000);

// Variable to store the quantity of product
const quantities = ref({});

// Variable to store the error message
const quantityMessage = ref({});

// Close button of modal element
const closeModal = ref(null);

watch(
  quantities,
  () => {
    quantityMessage.value = {};
  },
  { deep: true },
);

// Function to reset from and tp value
const setFromTo = (f, t) => {
  from.value = f;
  to.value = t;
};

// Function to reset price
const resetPrice = () => {
  from.value = 0;
  to.value = 200000000;
};

//Filter the products
const filteringProducts = computed(() => {
  return productStore.products.filter((product) => {
    const matchCategory =
      categoryStore.selectedCategory === "All" ||
      product.categoryId._id === categoryStore.selectedCategory; // وتتم المقارنة مع الصنف المختار  false تصير  All يجيب كل المنتجات اما اذا منتج معين ال  All  هنا دائما ياخذ النوع ويفحص اذا

    const priceMatch = product.price >= from.value && product.price <= to.value;

    return matchCategory && priceMatch;
  });
});

// Function to clear the filter
const clearFilter = () => {
  categoryStore.selectedCategory = "All";
  from.value = 0;
  to.value = 200000000;
};

// Function to increase the quantity of product
const increaseQuantity = (id) => {
  quantities.value[id] += 1;
};

// Function to decrease the quantity of product
const decreaseQuantity = (id) => {
  if (quantities.value[id] > 1) {
    quantities.value[id] -= 1;
  }
};

// Computed to count all products
const countProducts = computed(() => {
  return productStore.products.length;
});

// Computed to count the rest of categories
const getCategoryCount = (category) => {
  return productStore.products.filter((product) => product.categoryId._id === category).length;
};

// Function to add to cart
const addToCart = async (product) => {
  const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/addToCart`, {
    method: "POST",
    body: JSON.stringify({ productId: product._id, quantity: quantities.value[product._id] }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const data = await response.json();

  if (data.success) {
    toast.success("Product successfully added to your cart.");
    await productStore.getCart();
    await productStore.getProducts();
    quantities.value[product._id] = 1;
  } else {
    quantityMessage.value[product._id] = data.message;
  }
};

// Function to go signup page
const goToSignPage = () => {
  closeModal.value.click();
  router.push({ name: "signup" });
};

const apiUrl = import.meta.env.VITE_API_URL;

onMounted(async () => {
  await productStore.getProducts();
  productStore.products.forEach((product) => {
    quantities.value[product._id] = 1;
  });

  await categoryStore.getCategories();
  await userStore.getUser();
});
</script>

<style lang="scss" scoped>
.filter {
  @media (min-width: 991px) {
    position: sticky;
    top: 80px;
  }
  .clearAll {
    padding: 6px;
    background: #b8c7ff78;
    border-radius: 6px;
    font-weight: normal !important;
    font-size: 14px;
    transition: 0.2s;
    &:hover {
      background-color: rgb(255 137 137 / 34%);
      color: #ff4848 !important;
    }
  }
}
.fromTo {
  @media (max-width: 767px) {
    flex-direction: column;
  }
  div {
    transition: 0.3s;
    width: 48% !important;
    @media (max-width: 991px) {
      flex: 1;
      width: 100% !important;
    }
    &:hover {
      background-color: #ebebeb !important;
    }
  }
}

.productsSide {
  .productsContainer {
    .product {
      transition: 0.3s;
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 0 6px #00000024;
      }
    }
  }
  .categories {
    @media (max-width: 767px) {
      flex-wrap: wrap;
    }
    .category {
      @media (max-width: 767px) {
        width: 100%;
        text-align: center;
        margin-bottom: 10px;
      }
      border: 2px solid #ebedf1;
      transition: 0.3s;
      &:hover,
      &.active {
        background-color: #f1f1fd !important;
        color: var(--main-color);
      }
    }
  }
}

.quantity {
  margin-bottom: 10px;

  span {
    font-weight: bold;
    color: var(--main-color);
    font-size: 20px;
    width: 34px;
  }

  button {
    width: 35px;
    height: 35px;
    border: none;
    border-radius: 50%;
    background-color: white;
    border: 1px solid #eee;
    font-size: 20px;
    transition: 0.3s;
    &:hover {
      background-color: var(--main-color);
      color: white;
    }
  }
}

.btn-outline-mainColor {
  border: 2px solid var(--main-color) !important;
  color: var(--main-color);
  &:hover {
    background-color: #644fe5;
    color: white;
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

.productsStackholder {
  .productHolder {
    background: linear-gradient(90deg, #f1f1f1 25%, #e5e5e5 50%, #f1f1f1 75%);
    border: 2px solid #f4f4f8;
    min-height: 360px !important;
    transition: 0.3s !important;

    background-size: 200% 100%;
    animation: holderLoading 2s infinite linear;
  }
}

@keyframes holderLoading {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}

.loadingCircle {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  z-index: 300;
  background-color: rgba(0, 0, 0, 0.238);
  div {
    position: fixed;
    width: 70px;
    height: 70px;
    background-color: transparent;
    border-style: solid;
    border-width: 5px;
    border-color: black black transparent black;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    animation: rotateCircle 2.5s infinite ease;
  }
}

@keyframes rotateCircle {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.modal-content {
  left: 50% !important;
  transform: translateX(-50%) !important;
  width: 150% !important;
  @media (max-width: 767px) {
    width: 100% !important;
  }
}

.personIcon {
  background: linear-gradient(180deg, #b18fea, #612dca);
  width: 165px;
  height: 165px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
  margin: auto !important;
  i {
    font-size: 175px !important;
    color: #f3edfb !important;
  }
}

.modal-footer {
  .signinBtn {
    transition: 0.3s;
    &:hover {
      background: linear-gradient(180deg, #693dbf, #4a1da5) !important;
    }
  }
  .closeBtn {
    transition: 0.3s;
    &:hover {
      background-color: #eee !important;
    }
  }
}
</style>
