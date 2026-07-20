<template>
  <div class="MessagesAdmin">
    <div class="container-fluid m-0">
      <div class="row">
        <div class="col-lg-2 p-0 border-end">
          <!-- SideBar Component  -->
          <SideBar />
        </div>
        <div class="col-lg-10 px-4" style="background-color: var(--background-section)">
          <!-- TopBar Component  -->
          <TopBar />

          <div class="d-flex align-items-center justify-content-between">
            <div class="links">
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
            </div>
            <div class="markAllUsRead">
              <button class="btn btn-markUsRead" @click="markAllUsRead">
                <i class="bi bi-envelope"></i> Mark all as Read
              </button>
            </div>
          </div>

          <div class="filtering p-3 bg-white rounded border d-flex align-items-center gap-3 my-3">
            <div class="input-group w-50">
              <span class="input-group-text" id="searchId"><i class="bi bi-search"></i></span>
              <input
                type="text"
                class="form-control"
                placeholder="Search by name, email, or subject..."
                aria-label="search"
                aria-describedby="searchId"
                style="box-shadow: none"
                v-model="searchInput"
              />
            </div>
            <div class="select">
              <select
                class="form-select"
                aria-label="Default select example"
                style="box-shadow: none"
                v-model="statusSelect"
              >
                <option selected value="all">All Status</option>
                <option value="Read">Read</option>
                <option value="Unread">Unread</option>
              </select>
            </div>
            <div class="resetBtn ms-auto">
              <button class="btn btn-light"><i class="bi bi-arrow-repeat"></i> Reset</button>
            </div>
          </div>

          <div class="table-responsive border rounded position-relative" style="min-height: 450px">
            <table class="table table-hover" style="overflow: auto">
              <thead>
                <tr>
                  <th scope="col" style="background-color: #f8f9fa; white-space: nowrap">
                    Customer
                  </th>
                  <th scope="col" style="background-color: #f8f9fa; white-space: nowrap">
                    Subject
                  </th>
                  <th scope="col" style="background-color: #f8f9fa; white-space: nowrap">Data</th>
                  <th scope="col" style="background-color: #f8f9fa; white-space: nowrap">Status</th>
                  <th
                    scope="col"
                    style="background-color: #f8f9fa; white-space: nowrap"
                    class="text-center"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <div
                  v-if="filteringMessages.length === 0"
                  class="position-absolute text-center mt-4 w-100"
                  style="left: 50%; top: 50%; transform: translate(-50%, -50%)"
                >
                  <svg
                    class="empty-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="1.8"
                    style="background-color: transparent; width: 200px; color: #4a5568"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z"
                    />
                  </svg>

                  <div class="details text-center" style="background-color: transparent">
                    <h1 class="display-3" style="color: #4a5568">No messages yet</h1>
                    <p class="h4">There are currently no customer inquiries to display.</p>
                  </div>
                </div>
                <tr v-for="message of filteringMessages" :key="message._id" style="height: 70px">
                  <td>
                    <div class="mt-1 d-flex align-items-center gap-3">
                      <div class="image" style="flex-shrink: 0">
                        <img
                          :src="`${import.meta.env.VITE_API_URL}/${message.userId.avatar}`"
                          :alt="message.userId.username"
                          style="width: 50px; height: 50px; object-fit: cover"
                          class="img-fluid rounded-pill"
                        />
                      </div>
                      <div class="details">
                        <div class="username fw-bold">{{ message.userId.username }}</div>
                        <div class="email small text-muted">{{ message.userId.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="mt-3">{{ message.subject }}</div>
                  </td>
                  <td>
                    <div class="rounded mt-3 mx-auto">
                      {{ formatDate(message.createdAt) }}
                    </div>
                  </td>
                  <td>
                    <div
                      class="mt-2 p-2 rounded"
                      style="width: fit-content"
                      :style="{
                        backgroundColor:
                          message.status === 'Unread' ? 'rgb(253, 230, 234)' : 'rgb(228, 248, 236)',
                        color:
                          message.status === 'Unread' ? 'rgb(253, 70, 107)' : 'rgb(60, 186, 90)',
                      }"
                    >
                      {{ message.status }}
                    </div>
                  </td>
                  <td>
                    <router-link
                      :to="{ name: 'messageDetails', params: { messageId: message._id } }"
                    >
                      <div class="text-center mt-2" @click="readMsg(message._id)">
                        <button class="btn border"><i class="bi bi-eye"></i></button>
                      </div>
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
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
import { useProductsStore } from "@/stores/products";
import { computed, onMounted, ref } from "vue";
import { fetchWithRefresh } from "../../public/fetchWithRefresh";

// Define products store
const productsStore = useProductsStore();

// Define search input
const searchInput = ref("");

// Define the status select
const statusSelect = ref("all");

// Filtering messages
const filteringMessages = computed(() => {
  return productsStore.messages
    .filter((message) => {
      if (message.userId === null) return;
      return (
        message.userId.username.toLowerCase().includes(searchInput.value.toLowerCase()) ||
        message.userId.email.toLowerCase().includes(searchInput.value.toLowerCase()) ||
        message.subject.toLowerCase().includes(searchInput.value.toLowerCase())
      );
    })
    .filter((message) =>
      statusSelect.value === "all"
        ? message
        : message.status.toLowerCase() === statusSelect.value.toLowerCase(),
    );
});

// Function to mark all as read
const markAllUsRead = async () => {
  const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/markAsRead`, {
    method: "PUT",
    credentials: "include",
  });

  const data = await response.json();

  if (data.success) {
    await productsStore.getMessages();
  }
};

// Function to read the message
const readMsg = async (messageId) => {
  const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/readMessage`, {
    method: "PATCH",
    body: JSON.stringify({ messageId }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
};

onMounted(async () => {
  await productsStore.getMessages();
});
</script>

<style lang="scss" scoped>
.btn-markUsRead {
  padding: 8px;
  border-radius: 8px;
  border: 2px solid #4c41ec;
  color: #4c41ec;
  transition: 0.3s;
  &:hover {
    background-color: #4c41ec;
    color: white;
    border-color: #4c41ec;
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

@media (max-width: 767px) {
  .resetBtn {
    button {
      font-size: 14px !important;
    }
  }
}
</style>
