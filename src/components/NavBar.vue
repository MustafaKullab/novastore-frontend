<template>
  <div class="NavBar">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <router-link class="navbar-brand" :to="{ name: 'homePage' }">
          <img :src="logo" alt="Logo" class="img-fluid" style="width: 120px" />
        </router-link>
        <button
          class="navbar-toggler me-auto"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="offcanvas offcanvas-start"
          tabindex="-1"
          id="offcanvasNavbar"
          style="width: 280px"
        >
          <div class="offcanvas-header">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link class="nav-link" aria-current="page" :to="{ name: 'homePage' }"
                  >Home</router-link
                >
              </li>
              <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'products' }">Products</router-link>
              </li>
              <li class="nav-item dropdown">
                <router-link class="nav-link" :to="{ name: 'categories' }">Categories</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'about' }">About Us</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'contact' }">Contact Us</router-link>
              </li>
            </ul>
            <!-- <form class="d-flex" role="search ">
              <div class="input-group">
                <span class="input-group-text" id="basic-addon1"
                  ><i class="bi bi-search text-muted"></i
                ></span>
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  style="box-shadow: none"
                />
              </div>
            </form> -->
          </div>
        </div>
        <div class="loginBtn me-3" v-if="!userStore.user">
          <router-link :to="{ name: 'login' }" class="btn btn-mainColor">Login</router-link>
        </div>
        <div class="actions d-flex align-items-center gap-3">
          <div class="cart cursor-pointer mb-1 position-relative">
            <i
              class="bi bi-bag"
              style="font-size: 19px"
              @click.stop="showMenuFunction"
              ref="cartIcon"
            ></i>
            <div
              class="countOfItems position-absolute rounded-pill text-light d-flex justify-content-center align-items-center"
              style="
                top: -8px;
                right: -10px;
                width: 18px;
                height: 18px;
                background-color: var(--main-color);
              "
              v-if="productsStore.cart.items.length"
            >
              {{ productsStore.cart.items.length }}
            </div>
            <transition name="fade" mode="out-in">
              <div
                class="menu rounded p-3 position-absolute shadow-sm border"
                v-show="showMenu"
                ref="menuElement"
              >
                <div
                  class="header border-bottom d-flex align-items-center justify-content-between"
                  style="border-color: #edeff2"
                >
                  <div class="title"><h5>Your Cart</h5></div>
                  <div class="countItems">{{ productsStore.cart.items.length }} items</div>
                </div>
                <div
                  class="body"
                  :class="{
                    'd-flex justify-content-center align-items-center':
                      productsStore.cart.items.length === 0,
                  }"
                  style="height: 320px; overflow-y: auto"
                >
                  <div class="text-center" v-if="productsStore.cart.items.length === 0">
                    <i class="bi bi-cart3" style="font-size: 70px; color: var(--main-color)"></i>
                    <h2 style="color: #2c2c2c">Your cart is empty</h2>
                    <h6>Looks like you haven't added any products yet.</h6>
                    <router-link
                      :to="{ name: 'products' }"
                      class="btn btn-outline-mainColor mt-2"
                      @click="showMenu = false"
                      >Continue Shopping</router-link
                    >
                  </div>
                  <div
                    class="item d-flex justify-content-between align-items-center gap-3"
                    v-for="item of productsStore.cart.items"
                    :key="item.productId._id"
                  >
                    <div
                      class="image p-2 bg-light rounded my-2"
                      style="width: fit-content; flex-shrink: 0"
                    >
                      <img
                        :src="`${apiUrl}/${item.productId.image}`"
                        class="img-fluid"
                        style="width: 80px; height: 80px"
                        alt=""
                      />
                    </div>
                    <div class="details d-flex justify-content-between flex-grow-1 border-end pe-2">
                      <div class="nameAndPrice">
                        <div
                          class="name fw-bold"
                          style="
                            width: 185px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                          "
                        >
                          {{ item.productId.name }}
                        </div>
                        <div class="price">
                          Price :
                          <span style="color: var(--main-color)">${{ (item.productId.price).toFixed(2) }}</span>
                        </div>
                        <div class="quantity">Quantity : {{ item.quantity }}X</div>
                      </div>
                      <div class="totalPrice fw-bold">
                        ${{ item.quantity * item.productId.price }}
                      </div>
                    </div>
                    <div class="delete" @click="deleteItem(item)">
                      <i class="bi bi-trash"></i>
                    </div>
                  </div>
                </div>
                <div
                  class="subTotalAndShipping bg-light p-2 rounded"
                  v-if="productsStore.cart.items.length > 0"
                >
                  <div
                    class="subtotal d-flex align-items-center justify-content-between small mb-2"
                  >
                    <span>Subtotal</span><span>${{ subtotal.toFixed(2) }}</span>
                  </div>
                  <div
                    class="shipping d-flex align-items-center justify-content-between small mb-2"
                  >
                    <span>Shipping</span> <span class="text-success fw-bold">Free</span>
                  </div>
                  <div class="total d-flex align-items-center justify-content-between">
                    <span class="fw-bold">Total</span>
                    <span class="fw-bold" style="color: var(--main-color)">${{ subtotal }}</span>
                  </div>
                </div>
                <div
                  class="actions d-flex align-items-center gap-2 mt-2"
                  v-if="productsStore.cart.items.length > 0"
                >
                  <div class="viewCart w-100 flex-grow-1" @click="closeCart">
                    <router-link :to="{ name: 'cart' }" class="btn btn-outline-mainColor w-100"
                      >View Cart</router-link
                    >
                  </div>
                  <div class="checkout flex-grow-1 w-100" @click="closeCart">
                    <router-link :to="{ name: 'checkout' }" class="btn btn-mainColor w-100"
                      >Checkout</router-link
                    >
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <div class="ps-3 border-start d-flex gap-2 align-items-center">
            <div class="myOrdersLink" v-if="userStore.user">
              <router-link :to="{ name: 'myorders' }" class="btn btn-outline-mainColor d-flex gap-2"
                ><div><i class="bi bi-box"></i></div>
                <div>My orders</div></router-link
              >
            </div>
            <div class="dropdown" v-if="userStore.user">
              <div
                class="dropdown-toggle profile cursor-pointer mb-1 rounded-pill d-flex justify-content-center align-items-center border"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style="border: none !important"
              >
                <img
                  :src="`${apiUrl}/${userStore.user.avatar}`"
                  class="img-fluid rounded-pill border"
                  style="width: 30px; height: 30px; object-fit: cover"
                  alt=""
                />
              </div>
              <div class="dropdown-menu">
                <div class="details p-2 d-flex align-items-center gap-2 border-bottom flex-column">
                  <div class="image" style="flex-shrink: 0">
                    <img
                      :src="`${apiUrl}/${userStore.user.avatar}`"
                      class="img-fluid rounded-pill"
                      style="width: 50px; height: 50px; object-fit: cover"
                      :alt="userStore.user.username"
                    />
                  </div>
                  <div class="usernameEmail text-center">
                    <div class="username fw-bold">{{ userStore.user.username }}</div>
                    <div class="email text-muted small">
                      {{ userStore.user.email }}
                    </div>
                  </div>
                </div>
                <ul class="listLinks list-unstyled">
                  <router-link
                    :to="{ name: 'profilePage' }"
                    class="text-decoration-none rounded"
                    style="color: #1e2634"
                  >
                    <li class="py-2 rounded d-flex align-items-center gap-2">
                      <div><i class="bi bi-person"></i></div>
                      <div>My Profile</div>
                    </li>
                  </router-link>
                  <router-link
                    :to="{ name: 'myorders' }"
                    class="text-decoration-none rounded"
                    style="color: #1e2634"
                  >
                    <li class="py-2 rounded d-flex align-items-center gap-2">
                      <div><i class="bi bi-box"></i></div>
                      <div>My Orders</div>
                    </li>
                  </router-link>
                  <div
                    class="adminLink border-top border-bottom"
                    v-if="userStore.user.role === 'admin'"
                  >
                    <router-link
                      :to="{ name: 'dashboardAdmin' }"
                      class="text-decoration-none rounded"
                      style="color: #1e2634"
                    >
                      <li class="py-2 rounded d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-center gap-2">
                          <div><i class="bi bi-grid"></i></div>
                          <div>Dashboard</div>
                        </div>
                        <div class="adminMark py-1 px-2 rounded border">Admin</div>
                      </li>
                    </router-link>
                  </div>
                  <router-link
                    @click="logout"
                    :to="{ name: 'login' }"
                    class="text-decoration-none rounded"
                    style="color: #1e2634"
                  >
                    <li class="rounded">
                      <div class="logoutDiv rounded d-flex align-items-center gap-2">
                        <div><i class="bi bi-box-arrow-left"></i></div>
                        <div>Logout</div>
                      </div>
                    </li>
                  </router-link>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import logo from "@/assets/images/logo.png";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useProductsStore } from "@/stores/products";
import { useUserStore } from "@/stores/user";
import { fetchWithRefresh } from "../../public/fetchWithRefresh";
import { toast } from "vue3-toastify";

// define the router
const router = useRouter();

// Store of products
const productsStore = useProductsStore();

// Store of user
const userStore = useUserStore();

// Store the element of menu
const menuElement = ref(null);
const showMenu = ref(false);
const cartIcon = ref(null);

// Function to show the menu
const showMenuFunction = () => {
  showMenu.value = !showMenu.value;
};

// Computed to calculate the subtotal
const subtotal = computed(() => {
  return productsStore.cart.items.reduce(
    (acc, item) => acc + item.quantity * item.productId.price,
    0,
  );
});

const handleWithClickOutsideMenu = (e) => {
  if (
    menuElement.value &&
    !menuElement.value.contains(e.target) &&
    !cartIcon.value.contains(e.target)
  ) {
    showMenu.value = false;
  }
};

// Function to delete the item from cart
const deleteItem = async (item) => {
  const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/rmvFromCart`, {
    method: "POST",
    body: JSON.stringify({ productId: item.productId._id, quantity: item.quantity }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const data = await response.json();

  if (data.success) {
    await productsStore.getCart();
    await productsStore.getProducts();
    toast.error("Product removed from cart successfully.");
  }
};

// Function to logout admin
const logout = async () => {
  const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (data.success) {
    router.push({ name: "login" });
  }
};

// Function to close cart menu
const closeCart = () => {
  showMenu.value = false;
};

const apiUrl = import.meta.env.VITE_API_URL;

onMounted(async () => {
  document.addEventListener("click", handleWithClickOutsideMenu);
  await productsStore.getCart();
  await userStore.getUser();
});

onUnmounted(() => {
  document.removeEventListener("click", handleWithClickOutsideMenu);
});
</script>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}

.navbar-toggler:focus,
.btn-close {
  box-shadow: none;
}
.NavBar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: white;
  box-shadow: 0 0px 20px 0px #00000024;
  .navbar-nav {
    .nav-item {
      a:hover,
      a.router-link-active {
        color: var(--main-color);
      }
      a {
        position: relative;
        transition: 0.3s;
        &::before {
          content: "";
          transition: 0.3s;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          height: 3px;
          width: 0%;
          border-radius: 2px;
          background-color: var(--main-color);
        }
      }
      a:hover::before,
      a.router-link-active::before {
        width: 70%;
        @media (max-width: 991px) {
          width: 0;
        }
      }
      @media (max-width: 767px) {
        a:hover::before,
        a.router-link-active::before {
          width: 0;
        }
      }
    }
  }
  .menu {
    top: 45px;
    right: -11px;
    width: 450px;
    background-color: #fefefe;
    @media (max-width: 767px) {
      right: -10px !important;
      width: 300px;
    }
    .header {
      .countItems {
        color: var(--main-color);
      }
    }
    &:before {
      content: "";
      position: absolute;
      top: -32px;
      right: 4px;
      border-width: 16px;
      border-style: solid;
      border-color: transparent transparent white transparent;
      pointer-events: none;
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

.delete i {
  transition: 0.3s;
  &:hover {
    color: rgb(204, 22, 9);
  }
}

.profile {
  transition: 0.3s;
  &:hover {
    background-color: #634fe51e !important;
    box-shadow: 0 0 6px #634fe51e;
  }
}

.dropdown-menu {
  left: -200px !important;
  top: 46px !important;
  width: 250px;
}

.listLinks {
  padding: 0;
  margin: 0;
  a {
    transition: 0.3s;
    display: block;
    padding: 0 5px;

    li {
      padding: 10px;
      transition: 0.3s;
      margin: 5px 0;
    }
    &:hover {
      color: #3b22ea !important;
    }
    .adminMark {
      border-color: #3d22ea5c !important;
      font-size: 14px;
    }
    &:hover li {
      background-color: #f4f1fd !important;
    }
  }
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.4s;
}

@media (max-width: 767px) {
  .container-fluid {
    .navbar-toggler {
      margin-right: 0 !important;
    }
    justify-content: space-around !important;
  }
  .navbar-brand {
    width: 100% !important;
    text-align: center;
    margin-bottom: 20px;
  }

  .cart {
    order: 2 !important;
  }
}
</style>
