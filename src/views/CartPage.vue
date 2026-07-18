<template>
  <div class="CartPage py-4" style="background-color: var(--background-section)">
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
          <li class="breadcrumb-item" aria-current="page">
            <router-link
              :to="{
                name: 'cart',
              }"
              class="text-decoration-none"
              style="color: #9ca4b1"
            >
              Cart
            </router-link>
          </li>
        </ol>
      </nav>
      <div class="header">
        <h1 class="title">Your Cart</h1>
        <p class="text-muted m-0">
          You have {{ productStore.cart.items.length }} items in your cart.
        </p>
      </div>
      <div class="itemsAndSummary row my-5">
        <div class="col-md-8 mb-5 mb-md-0">
          <div class="items">
            <div class="responsiveTable" style="overflow: auto">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th class="radius-top-left" scope="col" style="background-color: #f6f6f6">
                      Product
                    </th>
                    <th scope="col" class="text-center" style="background-color: #f6f6f6">Price</th>
                    <th scope="col" class="text-center" style="background-color: #f6f6f6">
                      Quantity
                    </th>
                    <th scope="col" class="text-center" style="background-color: #f6f6f6">Total</th>
                    <th
                      scope="col"
                      class="text-center radius-top-right"
                      style="background-color: #f6f6f6"
                    >
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item of productStore.cart.items" :key="item.productId._id">
                    <td class="d-flex align-items-center gap-3">
                      <div class="image">
                        <img
                          src="@/assets/images/books.png"
                          class="img-fluid"
                          style="width: 80px"
                          :alt="item.productId.name"
                        />
                      </div>
                      <div class="name text-center">{{ item.productId.name }}</div>
                    </td>
                    <td class="text-center pt-4">${{ item.productId.price }}</td>
                    <td class="text-center pt-3">
                      <div
                        class="btns d-flex align-items-center justify-content-between mx-auto mx-md-start"
                      >
                        <button :disabled="loadingDec">
                          <i class="bi bi-dash fs-4" @click="decreaseQuantity(item)"></i>
                        </button>
                        <div class="crntQuant fs-5">{{ quantities[item.productId._id] }}</div>
                        <button :disabled="loadingInc">
                          <i class="bi bi-plus fs-4" @click="increaseQuantity(item)"></i>
                        </button>
                      </div>
                    </td>
                    <td class="fw-bold text-center pt-4">
                      ${{ item.quantity * item.productId.price }}
                    </td>
                    <td
                      class="delBtn text-center pt-4"
                      @click="deleteItem(item)"
                      style="cursor: pointer"
                    >
                      <i class="bi bi-trash"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="btn mt-3">
              <router-link :to="{ name: 'products' }" class="btn btn-outline-mainColor"
                ><i class="bi bi-arrow-left"></i> Continue Shopping</router-link
              >
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="summary bg-white p-3 rounded border" style="border-color: #efeff4">
            <div class="header pb-2"><h5>Order Summary</h5></div>
            <div class="subtotalShipping pb-2 border-bottom">
              <div class="subtotal pb-2 d-flex justify-content-between align-items-center">
                <span>Subtotal ({{ productStore.cart.items.length }} items)</span>
                <span>${{ subtotal }}</span>
              </div>
              <div class="shipping d-flex justify-content-between align-items-center">
                <span>Shipping</span>
                <span class="text-success">Free</span>
              </div>
            </div>
            <div class="total py-2 d-flex justify-content-between align-items-center">
              <span class="fw-bold fs-4">Total</span>
              <span class="fw-bold fs-4" style="color: var(--main-color)">${{ subtotal }}</span>
            </div>
            <div
              class="freeShippingMessage p-3 my-3 rounded d-flex justify-content-between align-items-center gap-3"
              style="background-color: #f5f4fc"
            >
              <div class="icon" style="color: var(--main-color)">
                <i class="bi bi-shield-lock fs-4"></i>
              </div>
              <div class="text">
                <h6 class="m-0">Secure Checkout</h6>
                <span class="text-muted"
                  >Your personal information is protected with encrypted payment.</span
                >
              </div>
            </div>
            <div class="btn w-100" style="border: none">
              <router-link class="w-100 fs-5 btn btn-mainColor" :to="{ name: 'checkout' }">
                <i class="bi bi-lock"></i> Proceed to Checkout
              </router-link>
            </div>
            <div class="secureMessage mt-2 text-center">
              <i class="bi bi-shield-check"></i> 100% secure checkout.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { fetchWithRefresh } from "../../public/fetchWithRefresh";
import { useProductsStore } from "@/stores/products";
import { toast } from "vue3-toastify";

const productStore = useProductsStore();

// Variable to store the quantities of items
const quantities = ref({});

//  error message
const quantityMessage = ref("");

const loadingInc = ref(false);

// Function to increase the quantity
const increaseQuantity = async (item) => {
  if (loadingInc.value) return;

  quantities.value[item.productId._id] += 1;
  item.quantity += 1;

  try {
    loadingInc.value = true;

    const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/addToCart`, {
      method: "POST",
      body: JSON.stringify({
        productId: item.productId._id,
        quantity: 1,
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await response.json();

    if (data.success) {
      toast.success("Product successfully added to your cart.");
      await productStore.getCart();
      await productStore.getProducts();
    } else {
      quantityMessage.value[item.productId._id] = data.message;
    }
  } catch (error) {
    console.log(error);
  } finally {
    loadingInc.value = false;
  }
};

const loadingDec = ref(false);

// Function to decrease the quantity
const decreaseQuantity = async (item) => {
  if (loadingDec.value) return;

  if (quantities.value[item.productId._id] > 1) {
    quantities.value[item.productId._id] -= 1;
    item.quantity -= 1;

    try {
      loadingDec.value = true;

      const response = await fetchWithRefresh("http://localhost:7000/decreaseQuantity", {
        method: "POST",
        body: JSON.stringify({ productId: item.productId._id, quantity: 1 }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        await productStore.getCart();
        await productStore.getProducts();
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      loadingDec.value = false;
    }
  }
};

// Function to delete the item from cart
const deleteItem = async (item) => {
  const response = await fetchWithRefresh("http://localhost:7000/rmvFromCart", {
    method: "POST",
    body: JSON.stringify({ productId: item.productId._id, quantity: item.quantity }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const data = await response.json();

  if (data.success) {
    await productStore.getCart();
    await productStore.getProducts();
    toast.error("Product removed from cart successfully.");
  }
};

// Computed to calculate sub total
const subtotal = computed(() => {
  return productStore.cart.items.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0,
  );
});

onMounted(async () => {
  await productStore.getCart();
  productStore.cart.items.forEach((item) => {
    quantities.value[item.productId._id] = item.quantity;
  });
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

.delBtn {
  i {
    transition: 0.3s;
    &:hover {
      color: rgb(166, 0, 0);
    }
  }
}

.radius-top-left {
  border-top-left-radius: 5px;
}

.radius-top-right {
  border-top-right-radius: 5px;
}

table th,
td {
  @media (max-width: 767px) {
    width: 250px;
  }
}

.btn-mainColor {
  background-color: var(--main-color);
  color: white;
  &:focus,
  &:hover {
    background-color: #644fe5;
    color: white;
    border: none !important;
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
</style>
