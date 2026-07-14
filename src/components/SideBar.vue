<template>
  <div class="SideBar bg-white py-3 vh-100">
    <div class="logo mb-4 text-center">
      <img src="@/assets/images/logo.png" style="width: 140px" alt="Logo" />
    </div>

    <ul
      class="links list-unstyled d-flex flex-column align-items-between justify-content-between px-4"
    >
      <div class="header">
        <router-link :to="{ name: 'dashboardAdmin' }" class="text-decoration-none text-dark">
          <li
            class="p-2 mb-2 rounded d-flex align-items-center gap-2"
            :class="{ active: route.name === 'dashboardAdmin' }"
          >
            <div><i class="bi bi-house-door"></i></div>
            <div>Dashboard</div>
          </li>
        </router-link>
        <router-link :to="{ name: 'productsAdmin' }" class="text-decoration-none text-dark">
          <li
            class="p-2 mb-2 rounded d-flex align-items-center gap-2"
            :class="{ active: route.name === 'productsAdmin' }"
          >
            <div><i class="bi bi-box"></i></div>
            <div>Products</div>
          </li>
        </router-link>
        <router-link :to="{ name: 'categoriesAdmin' }" class="text-decoration-none text-dark">
          <li
            class="p-2 mb-2 rounded d-flex align-items-center gap-2"
            :class="{ active: route.name === 'categoriesAdmin' }"
          >
            <div><i class="bi bi-tag"></i></div>
            <div>Categories</div>
          </li>
        </router-link>

        <router-link :to="{ name: 'ordersAdmin' }" class="text-decoration-none text-dark">
          <li
            class="p-2 mb-2 rounded d-flex align-items-center gap-2"
            :class="{ active: route.name === 'ordersAdmin' }"
          >
            <div><i class="bi bi-basket"></i></div>
            <div>Orders</div>
          </li>
        </router-link>
        <router-link :to="{ name: 'usersAdmin' }" class="text-decoration-none text-dark">
          <li
            class="p-2 mb-2 rounded d-flex align-items-center gap-2"
            :class="{ active: route.name === 'usersAdmin' }"
          >
            <div><i class="bi bi-person"></i></div>
            <div>Users</div>
          </li>
        </router-link>
        <router-link :to="{ name: 'messagesAdmin' }" class="text-decoration-none text-dark">
          <li
            class="p-2 mb-2 rounded d-flex align-items-center gap-2"
            :class="{ active: route.name === 'messagesAdmin' }"
          >
            <div><i class="bi bi-envelope"></i></div>
            <div>Messages</div>
          </li>
        </router-link>
      </div>
      <div class="footer">
        <li class="p-2 rounded d-flex align-items-center gap-2" @click="logout">
          <div><i class="bi bi-box-arrow-left"></i></div>
          <div>Logout</div>
        </li>
      </div>
    </ul>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { fetchWithRefresh } from "../../public/fetchWithRefresh";

// Define route and router
const route = useRoute();
const router = useRouter();

// Function to logout admin
const logout = async () => {
  const response = await fetchWithRefresh("http://localhost:7000/logout", {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (data.success) {
    router.push({ name: "login" });
  }
};
</script>

<style lang="scss" scoped>
@media (max-width: 991px) {
  .SideBar {
    height: fit-content !important;
  }
}
ul {
  li {
    transition: 0.3s;
    cursor: pointer;
    &:hover,
    &.active {
      background-color: var(--background-li) !important;
      color: var(--color-li) !important;
    }
    &.active a {
      color: var(--color-li) !important;
    }
  }
}
</style>
