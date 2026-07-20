<template>
  <div class="TopBar py-3 d-flex justify-content-between position-relative">
    <div class="title">
      <h2>
        {{
          route.name === "dashboardAdmin"
            ? "Dashboard"
            : route.name === "orderDetailsAdmin"
              ? "Order Details"
              : route.name === "productsAdmin"
                ? "Products"
                : route.name === "addProduct"
                  ? "Add Product"
                  : route.name === "productDetails"
                    ? "Product Details"
                    : route.name === "editProduct"
                      ? "Edit Product"
                      : route.name === "categoriesAdmin"
                        ? "Categories"
                        : route.name === "usersAdmin"
                          ? "Users"
                          : route.name === "ordersAdmin"
                            ? "Orders"
                            : route.name === "messagesAdmin"
                              ? "Messages"
                              : route.name === "messageDetails"
                                ? "Message Details"
                                : "Default"
        }}
      </h2>
    </div>
    <div class="logo d-flex align-items-center gap-2">
      <router-link
        :to="{ name: 'homePage' }"
        style="padding: 8px 14px; font-size: 14px"
        type="button"
        class="text-decoration-none btn btn-outline-mainColor d-flex align-items-center gap-2"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        data-bs-title="Tooltip on top"
      >
        <div><i class="bi bi-shop"></i></div>
        <div>Visit Store</div>
      </router-link>
      <img
        :src="`${import.meta.env.VITE_API_URL}/${userStore?.user?.avatar}`"
        class="rounded-pill border"
        style="width: 40px; height: 40px; object-fit: cover"
        alt="Logo"
      />
      <div class="admin small">Admin</div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";

// Define user store
const userStore = useUserStore();

const route = useRoute();

onMounted(async () => {
  await userStore.getUser();
  console.log(userStore.user);
});
</script>

<style lang="scss" scoped>
.btn-outline-mainColor {
  border: 2px solid var(--main-color) !important;
  color: var(--main-color);
  &:hover {
    background-color: #644fe5;
    color: white;
    border-color: #6c4df6;
  }
}
</style>
