<template>
  <div
    class="ProductDetail py-4"
    style="background-color: var(--background-section)"
    v-if="productStore.productDetail"
  >
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link :to="{ name: 'homePage' }" class="text-decoration-none">Home</router-link>
          </li>
          <li class="breadcrumb-item" aria-current="page">
            <router-link :to="{ name: 'products' }" class="text-decoration-none">
              Products
            </router-link>
          </li>
          <li class="breadcrumb-item" aria-current="page" v-if="productStore.productDetail">
            <router-link
              :to="{
                name: 'productDetail',
                params: { product_id: productStore.productDetail._id },
              }"
              class="text-decoration-none"
              style="color: #9ca4b1"
            >
              {{ productStore.productDetail.name }}
            </router-link>
          </li>
        </ol>
      </nav>
      <div class="productDetailHero row py-5 align-items-center justify-content-between">
        <div class="col-md-5">
          <div
            class="image p-3 rounded-3 d-flex justify-content-center align-items-center mb-5 mb-md-0"
            style="background-color: #f5f5fc"
          >
            <img
              :src="`http://localhost:7000/${productStore.productDetail.image}`"
              :alt="productStore.productDetail.name"
              class="img-fluid"
              style="max-width: 100%; object-fit: contain"
            />
          </div>
        </div>
        <div class="col-md-5">
          <div class="details text-center text-md-start">
            <div class="header pb-3 mb-3 border-bottom">
              <div class="category mb-2" style="color: var(--main-color)">
                {{ productStore.productDetail.categoryId.name }}
              </div>
              <div class="nameAndPriceAndStock">
                <h1 class="name">{{ productStore.productDetail.name }}</h1>
                <div class="price display-6 fw-bold">${{ productStore.productDetail.price }}</div>
                <div class="stock text-success fs-5" v-if="productStore.productDetail.stock > 0">
                  {{ productStore.productDetail.stock }} Available
                </div>
                <div class="text-danger my-2" v-if="productStore.productDetail.stock === 0">
                  Out of stock
                </div>
              </div>
            </div>
            <div class="body pb-3 mb-3 border-bottom">
              <h6>Description</h6>
              <p class="m-0">{{ productStore.productDetail.description }}</p>
            </div>
            <div class="footer">
              <div class="quantity">
                <h6>Quantity</h6>
                <div
                  class="btns d-flex align-items-center justify-content-between mx-auto mx-md-start"
                >
                  <button><i class="bi bi-dash fs-4" @click="decreaseQuantity()"></i></button>
                  <div class="crntQuant fs-5">{{ quantity }}</div>
                  <button><i class="bi bi-plus fs-4" @click="increaseQuantity()"></i></button>
                </div>
              </div>
              <div class="addToCartBtn my-3">
                <button
                  class="w-100 btn btn-mainColor"
                  @click.prevent="addToCart(productStore.productDetail)"
                >
                  <i class="bi bi-cart"></i> Add to cart
                </button>
              </div>
              <div class="errorMessage text-danger">{{ quantityMessage }}</div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="whyShopWithUs row p-3 rounded-3 align-items-center justify-content-between"
        style="background-color: #f5f4fd"
      >
        <div class="col-md-4">
          <div
            class="box d-flex gap-3 justify-content-center flex-column flex-md-row text-center mb-4 pb-3 mb-md-0 pb-md-0"
          >
            <div
              class="icon rounded d-flex justify-content-center align-items-center mx-auto me-md-0 ms-md-0"
              style="background-color: #e9e4f8; width: 50px; height: 50px; color: var(--main-color)"
            >
              <i class="bi bi-box-seam fs-4"></i>
            </div>
            <div class="text">
              <h6>In Stock</h6>
              <p class="text-muted m-0">Ready to ship</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div
            class="box d-flex gap-3 justify-content-center flex-column flex-md-row text-center mb-4 pb-3 mb-md-0 pb-md-0"
          >
            <div
              class="icon rounded d-flex justify-content-center align-items-center mx-auto me-md-0 ms-md-0"
              style="background-color: #e9e4f8; width: 50px; height: 50px; color: var(--main-color)"
            >
              <i class="bi bi-truck fs-4"></i>
            </div>
            <div class="text">
              <h6>Fast delivery</h6>
              <p class="text-muted m-0">On orders over $50</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="box d-flex gap-3 justify-content-center flex-column flex-md-row text-center">
            <div
              class="icon rounded d-flex justify-content-center align-items-center mx-auto me-md-0 ms-md-0"
              style="background-color: #e9e4f8; width: 50px; height: 50px; color: var(--main-color)"
            >
              <i class="bi bi-shield-check fs-4"></i>
            </div>
            <div class="text">
              <h6>Secure payment</h6>
              <p class="text-muted m-0">100% secure checkout</p>
            </div>
          </div>
        </div>
      </div>
      <div class="youMightAlsoLike my-5">
        <div class="title d-flex align-item-center justify-content-between">
          <h5>You might also like</h5>
          <div class="linkViewAll">
            <router-link
              :to="{ name: 'products' }"
              @click="categoryStore.setCategory(productStore.productDetail.category)"
              class="btn btn-mainColorView"
              >View all</router-link
            >
          </div>
        </div>
        <div class="contProducts position-relative">
          <div class="leftBtn position-absolute" @click="scrollElement(-350)">
            <i class="bi bi-arrow-left"></i>
          </div>
          <div class="rightBtn position-absolute" @click="scrollElement(350)">
            <i class="bi bi-arrow-right"></i>
          </div>
          <div class="productsSameCategory my-4" ref="containerProducts" style="overflow: auto">
            <div class="d-flex gap-3">
              <div
                class="box d-flex align-items-center gap-3 bg-white p-3 rounded shadow-sm"
                v-for="product of filterProducts"
                :key="product._id"
                style="min-width: 350px; cursor: pointer"
                @click="goToProductPage(product)"
              >
                <div class="image">
                  <img
                    :src="`http://localhost:7000/${product.image}`"
                    :alt="product.name"
                    class="img-fluid"
                    style="width: 160px; object-fit: contain"
                  />
                </div>
                <div class="details">
                  <div class="text-muted name">{{ product.name }}</div>
                  <div class="price fw-bold">${{ product.price }}</div>
                  <div class="stock text-success">{{ product.stock }} Available</div>
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
import { useProductsStore } from "@/stores/products";
import { useCategoryStore } from "@/stores/category";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const route = useRoute();
const router = useRouter();
const productStore = useProductsStore();
const categoryStore = useCategoryStore();

// Get the product id
const productId = route.params.product_id;

// Quantity of product
const quantity = ref(1);

// Message error
const quantityMessage = ref("");

// Element of products to scroll
const containerProducts = ref(null);

// Function to increase the quantity
const increaseQuantity = () => {
  quantity.value += 1;
};

// Function to decrease the quantity
const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value -= 1;
  }
};

// Function to add to cart
const addToCart = async (product) => {
  const response = await fetchWithRefresh("http://localhost:7000/addToCart", {
    method: "POST",
    body: JSON.stringify({ productId: product._id, quantity: quantity.value }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const data = await response.json();

  if (data.success) {
    toast.success("Product successfully added to your cart.");
    await productStore.getCart();
    await productStore.getProducts();
    await productStore.getProductDetail(product._id);
    quantity.value = 1;
  } else {
    quantityMessage.value = data.message;
  }
};

// Computed to get all products in same category
const filterProducts = computed(() => {
  return productStore.products
    .filter(
      (product) =>
        product.category === productStore.productDetail.category &&
        product._id !== productStore.productDetail._id,
    )
    .slice(0, 8);
});

const goToProductPage = async (product) => {
  router.push({ name: "productDetail", params: { product_id: product._id } });
  await productStore.getProductDetail(product._id);
};

const scrollElement = (quantity) => {
  containerProducts.value.scrollBy({ top: 0, left: quantity, behavior: "smooth" });
};

onMounted(async () => {
  await productStore.getProductDetail(productId);
  await productStore.getProducts();
});
</script>

<style lang="scss" scoped>
.btns {
  width: 130px;
  background-color: white;
  border-radius: 4px;
  border: 2px solid #f1f1f6;
  button {
    background-color: transparent;
    border: none;
  }
  button:last-of-type {
    border-left: 2px solid #f1f1f6;
  }
  button:first-of-type {
    border-right: 2px solid #f1f1f6;
  }
}

.productsSameCategory::-webkit-scrollbar {
  width: 0;
}
.contProducts {
  transition: 0.3s !important;

  .leftBtn,
  .rightBtn {
    opacity: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    background-color: rgba(0, 0, 0, 0.126);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.251);
    }
    i {
      font-size: 22px;
      color: white !important;
    }
  }
  .leftBtn {
    left: 0;
  }
  .rightBtn {
    right: 0;
  }
  &:hover {
    .leftBtn,
    .rightBtn {
      opacity: 1 !important;
    }
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

.btn-mainColorView {
  background-color: var(--section-background);
  border: 1px solid var(--main-color);
  color: var(--main-color);

  &:focus,
  &:hover {
    background-color: #644fe5;
    color: white;
  }
}

.linkViewAll {
  a {
    transition: 0.3s;
    &:hover {
      background-color: var(--main-color);
      color: white;
    }
  }
}
</style>
