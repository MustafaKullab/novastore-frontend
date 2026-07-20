<template>
  <div class="UsersAdmin" v-if="userStore.user">
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
                    name: 'usersAdmin',
                  }"
                  class="text-decoration-none"
                  style="color: #9ca4b1"
                >
                  Users
                </router-link>
              </li>
            </ol>
          </nav>

          <div class="usersAndSearch p-3 bg-white rounded border" v-if="userStore.users">
            <div class="filterAndReset d-flex justify-content-between">
              <div class="w-50">
                <div class="input-group mb-3">
                  <span class="input-group-text" id="searchId"><i class="bi bi-search"></i></span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search users by username or email..."
                    aria-label="Search"
                    aria-describedby="searchId"
                    style="box-shadow: none"
                    v-model="searchFilter"
                  />
                </div>
              </div>
              <div class="actions d-flex gap-2 align-items-center">
                <div class="select">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    style="box-shadow: none"
                    v-model="searchRole"
                  >
                    <option selected value="all">All Rules</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
                <div class="reset">
                  <button class="btn btn-light"><i class="bi bi-arrow-repeat"></i> Reset</button>
                </div>
              </div>
            </div>

            <div class="table-responsive position-relative" style="height: 450px">
              <table class="table table-hover" style="overflow: auto">
                <thead>
                  <tr>
                    <th scope="col" style="background-color: #f8f9fa; white-space: nowrap">User</th>
                    <th scope="col" style="background-color: #f8f9fa; white-space: nowrap">
                      Email
                    </th>
                    <th scope="col" style="background-color: #f8f9fa; white-space: nowrap">Role</th>
                    <th scope="col" style="background-color: #f8f9fa; white-space: nowrap">
                      Status
                    </th>
                    <th
                      scope="col"
                      style="background-color: #f8f9fa; white-space: nowrap"
                      class="text-center"
                    >
                      Joind At
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
                    v-if="filteringUsers.length === 0"
                    class="position-absolute text-center mt-4 w-100"
                    style="left: 50%; top: 50%; transform: translate(-50%, -50%)"
                  >
                    <svg
                      class="empty-icon"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="1.8"
                      style="width: 200px; background-color: transparent; color: #4a5568"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                      />
                    </svg>
                    <div class="details text-center">
                      <h1 class="display-3" style="color: #4a5568">No users found</h1>
                      <p class="h4">
                        There are currently no registered customer accounts in your system.
                      </p>
                    </div>
                  </div>
                  <tr v-for="user of filteringUsers" :key="user._id" style="height: 70px">
                    <th scope="row">
                      <div class="mt-1 d-flex align-items-center gap-2">
                        <div class="image" style="flex-shrink: 0">
                          <img
                            :src="`${import.meta.env.VITE_API_URL}/${user.avatar}`"
                            style="width: 50px; height: 50px; object-fit: cover"
                            :alt="user.username"
                            class="img-fluid rounded-pill"
                          />
                        </div>
                        <div class="username">{{ user.username }}</div>
                      </div>
                    </th>
                    <td class="ps-5">
                      <div class="ps-3 mt-3">{{ user.email }}</div>
                    </td>
                    <td>
                      <div class="mt-3">{{ user.role }}</div>
                    </td>
                    <td>
                      <div
                        class="rounded mt-2"
                        style="padding: 5px 10px; width: fit-content"
                        :style="{
                          backgroundColor: user.isVerified ? '#e4f8ec' : 'rgb(248 228 228)',
                          color: user.isVerified ? '#3cba5a' : 'rgb(186 60 60)',
                        }"
                      >
                        {{ user.isVerified ? "Verified" : "Not Verified" }}
                      </div>
                    </td>
                    <td>
                      <div class="mt-3">
                        {{ formatDate(user.joinedAt) }}
                      </div>
                    </td>
                    <td>
                      <div
                        class="trash mt-3 text-center rounded border"
                        style="
                          padding: 4px 8px;
                          width: fit-content;
                          background-color: #fcf8f7;
                          border-color: #f9e6ec;
                          color: #fd466b;
                          cursor: pointer;
                        "
                        @click="deleteUser(user._id)"
                      >
                        <i class="bi bi-trash"></i>
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
import { formatDate } from "../utils/formatDate";
import SideBar from "@/components/SideBar.vue";
import TopBar from "@/components/TopBar.vue";
import { useUserStore } from "@/stores/user";
import { computed, onMounted, ref } from "vue";
import { fetchWithRefresh } from "../../public/fetchWithRefresh";

// Define user store
const userStore = useUserStore();

const searchFilter = ref("");

const searchRole = ref("all");

const filteringUsers = computed(() => {
  return userStore.users
    .filter((user) => (searchRole.value === "all" ? user : user.role === searchRole.value))
    .filter(
      (user) =>
        user.username.toLowerCase().includes(searchFilter.value.toLowerCase()) ||
        user.email.toLowerCase().includes(searchFilter.value.toLowerCase()),
    );
});

// Function to delete user
const deleteUser = async (id) => {
  const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/deleteUser/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();

  if (data.success) {
    await userStore.getUsers();
  }
};

onMounted(async () => {
  await userStore.getUsers();
});
</script>

<style lang="scss" scoped>
.trash {
  transition: 0.3s;
  &:hover {
    background-color: #ffe7e7 !important;
    scale: 1.1;
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

table th,
table td {
  white-space: nowrap;
}
</style>
