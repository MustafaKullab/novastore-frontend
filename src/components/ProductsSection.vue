<template>
  <div class="ProductsSection" id="products">
    <div class="container">
      <div class="title">
        <h4>Products</h4>
      </div>
      <div class="products row mt-5">
        <div class="productsStackholder row" v-if="productStore.loading">
          <div class="col-md-6 col-lg-4 col-xl-3 mb-3" v-for="product of 8" :key="product">
            <div class="productHolder rounded"></div>
          </div>
        </div>

        <div class="col-md-4 col-lg-3 mb-3" v-for="product of filteringProducts" :key="product._id">
          <div
            class="product text-center rounded d-flex flex-column justify-content-between"
            style="height: 500px"
            v-if="!productStore.loading"
          >
            <div
              class="image mb-2"
              style="height: 45%; overflow: hidden; cursor: pointer"
              @click="router.push({ name: 'productDetail', params: { product_id: product._id } })"
            >
              <img
                :src="`${apiUrl}/${product.image}`"
                class="img-fluid rounded"
                style="width: 100%; height: 100%; object-fit: cover"
                :alt="product.name"
              />
            </div>
            <div class="details my-2 px-3" style="height: 20%">
              <div
                class="name fw-bold"
                style="cursor: pointer"
                @click="router.push({ name: 'productDetail', params: { product_id: product._id } })"
              >
                {{ product.name }}
              </div>
              <div
                class="description"
                style="
                  cursor: pointer;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                "
                @click="router.push({ name: 'productDetail', params: { product_id: product._id } })"
              >
                {{ product.description }}
              </div>
            </div>
            <div class="stockAndPrice d-flex justify-content-between align-items-center my-3 px-3">
              <div class="price"><span class="fw-bold">Price :</span> ${{ product.price }}</div>
              <div class="stock">
                <span v-if="product.stock > 0">{{ product.stock }}</span>
                <span class="text-danger fw-bold" v-if="product.stock === 0">{{
                  product.stock
                }}</span>
                Available
              </div>
            </div>
            <div class="px-3" style="height: 20%">
              <div class="quantity d-flex justify-content-center align-items-center gap-2 mx-auto">
                <div class="incBtn">
                  <button @click="increaseQuantity(product._id)"><i class="bi bi-plus"></i></button>
                </div>
                <span class="quantityNumber">{{ quantities[product._id] }}</span>
                <div class="decBtn">
                  <button @click="decreaseQuantity(product._id)"><i class="bi bi-dash"></i></button>
                </div>
              </div>
              <div class="errorMessage mb-3 text-danger" v-if="quantityMessage[product._id]">
                {{ quantityMessage[product._id] }}
              </div>
              <div class="actions">
                <button
                  type="button"
                  class="addToCart btn w-100"
                  :data-bs-toggle="!userStore.user ? 'modal' : ''"
                  :data-bs-target="!userStore.user ? `#loginModal` : ''"
                  @click.prevent="addToCart(product)"
                >
                  Add to cart <i class="bi bi-cart-plus"></i>
                </button>
              </div>
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
                    style="width: 60px; height: 60px; background-color: #f0e9fb; color: #5520bc"
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
                    style="width: 60px; height: 60px; background-color: #f0e9fb; color: #5520bc"
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
                    style="width: 60px; height: 60px; background-color: #f0e9fb; color: #5520bc"
                  >
                    <i class="bi bi-heart-fill fs-2"></i>
                  </div>
                  <div class="details">
                    <div class="title fw-bold">Save items</div>
                    <div class="desc">Bookmark your favorite products and shop easily later.</div>
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
                  style="background: linear-gradient(180deg, #fdfdfe, #f6f7fa); color: #474456"
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
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useProductsStore } from "@/stores/products";
import { useCategoryStore } from "@/stores/category";
import { useUserStore } from "@/stores/user";
import { fetchWithRefresh } from "../../public/fetchWithRefresh";
import { toast } from "vue3-toastify";

// Define router
const router = useRouter();

// Define stores
const productStore = useProductsStore();
const categoryStore = useCategoryStore();
const userStore = useUserStore();

//quantities of products
const quantities = ref({});

// Variable to display quantity error message
const quantityMessage = ref({});

// Variable to get close button
const closeModal = ref(null);

watch(
  quantities,
  () => {
    quantityMessage.value = {};
  },
  { deep: true },
);

//Filter the products
const filteringProducts = computed(() => {
  if (categoryStore.selectedCategory === "All") {
    return productStore.products.slice(0, 8);
  }
  return productStore.products
    .filter((product) => {
      return product.categoryId._id === categoryStore.selectedCategory;
    })
    .slice(0, 9);
});

// Function to increase quantity
const increaseQuantity = (id) => {
  quantities.value[id] += 1;
};

// Function to increase quantity
const decreaseQuantity = (id) => {
  if (quantities.value[id] === 1) {
    return;
  }
  quantities.value[id] -= 1;
};

// Function to add to cart
const addToCart = async (product) => {
  if (!userStore.user) return;

  try {
    const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/addToCart`, {
      method: "POST",
      body: JSON.stringify({ productId: product._id, quantity: quantities.value[product._id] }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await response.json();

    if (data.success) {
      try {
        toast.success("Product successfully added to your cart.");
        await productStore.getCart();
        await productStore.getProducts();
        quantities.value[product._id] = 1;
      } catch (error) {
        console.log(error);
      }
    } else {
      quantityMessage.value[product._id] = data.message;
    }
  } catch (error) {
    console.log(error);
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

  await userStore.getUser();
});
</script>

<style lang="scss" scoped>
.product {
  background-color: #f8f8fc;
  border: 2px solid #f4f4f8;
  min-height: 360px;
  transition: 0.3s;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 4px 7px -2px rgb(0 0 0 / 7%);
  }
  .image {
    height: 120px;
  }
  .details {
    height: 90px;
    .name {
      color: var(--main-color);
    }
  }
  .stockAndPrice {
    height: 30px;
  }
  .addToCart {
    border: 2px solid var(--main-color) !important;
    color: var(--main-color);
    &:hover {
      background-color: #644fe5;
      color: white;
    }
  }
  .description {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .stock {
    span {
      color: var(--main-color);
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

@media (max-width: 1200px) {
  .image {
    height: 65% !important;
  }
  .details {
    height: 10% !important;
    .name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
