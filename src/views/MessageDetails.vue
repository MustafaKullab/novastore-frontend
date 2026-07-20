<template>
  <div class="Messages Details">
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
            <div class="btnBackToMessage">
              <router-link
                :to="{ name: 'messagesAdmin' }"
                class="btn p-0"
                style="color: var(--main-color)"
                ><i class="bi bi-arrow-left"></i> Back to Messages</router-link
              >
            </div>
            <div
              class="deleteBtn p-2 rounded border"
              @click="deleteMsg"
              style="
                background-color: #fef9fa;
                color: #c21615;
                border-color: #f8bebf !important;
                cursor: pointer;
              "
            >
              <i class="bi bi-trash"></i> Delete Message
            </div>
          </div>

          <div class="customerInformation p-3 bg-white border rounded my-3">
            <div class="header d-flex align-items-center gap-2">
              <div class="icon" style="color: var(--main-color)">
                <i class="bi bi-person fs-5"></i>
              </div>
              <div class="info fw-bold fs-5">Customer Information</div>
            </div>
            <div class="userDetails my-3 row">
              <div class="col-md-4">
                <div class="userAvatar my-3 my-md-0">
                  <img
                    :src="`${import.meta.env.VITE_API_URL}/${productsStore.specificMessage.userId?.avatar}`"
                    :alt="productsStore.specificMessage.userId?.username"
                    style="width: 100px; height: 100px; object-fit: cover"
                    class="img-fluid rounded-pill"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="usernameEmail">
                  <div class="usernameDetails mb-2 d-flex gap-3 mb-3">
                    <div class="icon" style="color: var(--main-color)">
                      <i class="bi bi-person fs-5"></i>
                    </div>
                    <div class="details">
                      <div class="title fw-bold">Username</div>
                      <div class="username text-muted">
                        {{ productsStore.specificMessage.userId?.username }}
                      </div>
                    </div>
                  </div>

                  <div class="emailDetails d-flex gap-3">
                    <div class="icon" style="color: var(--main-color)">
                      <i class="bi bi-envelope fs-5"></i>
                    </div>
                    <div class="details">
                      <div class="title fw-bold">Email</div>
                      <div class="username text-muted">
                        {{ productsStore.specificMessage.userId?.email }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-4">
                <div class="createdAndStatus">
                  <div class="created mb-2 d-flex gap-3">
                    <div class="icon" style="color: var(--main-color)">
                      <i class="bi bi-calendar fs-5"></i>
                    </div>
                    <div class="at">
                      <div class="title fw-bold">Sent At</div>
                      <div class="date text-muted">
                        {{ productsStore.specificMessage.createdAt }}
                      </div>
                    </div>
                  </div>
                  <div class="status d-flex gap-3">
                    <div class="icon" style="color: var(--main-color)">
                      <i class="bi bi-exclamation-circle fs-5"></i>
                    </div>
                    <div class="statusDetails">
                      <div class="title fw-bold">Status</div>
                      <div
                        class="statusBx py-1 ps-4 pe-3 rounded"
                        :class="productsStore.specificMessage.status"
                        style="width: fit-content"
                        :style="{
                          backgroundColor:
                            productsStore.specificMessage.status === 'Unread'
                              ? 'rgb(253, 230, 234)'
                              : 'rgb(228, 248, 236)',
                          color:
                            productsStore.specificMessage.status === 'Unread'
                              ? 'rgb(253, 70, 107)'
                              : 'rgb(60, 186, 90)',
                        }"
                      >
                        {{ productsStore.specificMessage.status }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row my-3">
            <div class="msgDetails col-md-6">
              <div class="subject p-3 bg-white rounded border mb-3 shadow-sm">
                <div class="header d-flex align-items-center gap-2">
                  <div class="icon" style="color: var(--main-color)">
                    <i class="bi bi-file-earmark-text fs-5"></i>
                  </div>
                  <div class="title fw-bold fs-5">Subject</div>
                </div>
                <div class="body py-3" style="text-indent: 25px">
                  {{ productsStore.specificMessage.subject }}
                </div>
              </div>

              <div
                class="message p-3 bg-white rounded border shadow-sm mb-3 mb-md-0"
                style="max-height: 350px; overflow: auto"
              >
                <div class="header d-flex align-items-center gap-2">
                  <div class="icon" style="color: var(--main-color)">
                    <i class="bi bi-chat fs-5"></i>
                  </div>
                  <div class="title fw-bold fs-5">Message</div>
                </div>
                <div class="body py-3" style="line-height: 2.5">
                  {{ productsStore.specificMessage.message }}
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="replied p-3 bg-white rounded border">
                <div class="header d-flex align-items-center gap-3">
                  <div class="icon" style="color: var(--main-color)">
                    <i class="bi bi-send fs-5"></i>
                  </div>
                  <div class="title fw-bold fs-5">Reply by Email</div>
                </div>
                <div class="replyDetails my-3">
                  <div class="mb-3">
                    <label for="replyMsg" class="form-label">To</label>
                    <input
                      type="email"
                      class="form-control"
                      id="replyMsg"
                      :value="productsStore.specificMessage.email"
                      disabled
                      style="cursor: no-drop"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="subject" class="form-label">Subject</label>
                    <input
                      type="email"
                      class="form-control"
                      id="subject"
                      :value="`Re: ${productsStore.specificMessage.subject}`"
                      disabled
                      style="cursor: no-drop"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="message" class="form-label">Message</label>
                    <textarea
                      type="email"
                      class="form-control"
                      id="message"
                      placeholder="Type your reply here..."
                      style="min-height: 135px; box-shadow: none; resize: none"
                      v-model="reply"
                    />
                  </div>
                  <div class="actions d-flex align-items-center gap-3 justify-content-end">
                    <div class="cancle">
                      <button class="btn btn-light border">Cancel</button>
                    </div>
                    <div class="sendEmail">
                      <button class="btn btn-mainColor" @click="sendEmail">
                        <i class="bi bi-send"></i> Send Email
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
  </div>
</template>

<script setup>
import SideBar from "@/components/SideBar.vue";
import TopBar from "@/components/TopBar.vue";
import { useProductsStore } from "@/stores/products";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { fetchWithRefresh } from "../../public/fetchWithRefresh";
import { toast } from "vue3-toastify";

// Define the route and router
const route = useRoute();
const router = useRouter();

// Get the id of message
const messageId = route.params.messageId;

// Define products store
const productsStore = useProductsStore();

// Variable to store the replying
const reply = ref("");

// Function to delete msg
const deleteMsg = async () => {
  const response = await fetchWithRefresh(
    `${import.meta.env.VITE_API_URL}/deleteMsg/${messageId}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  const data = await response.json();

  if (data.success) {
    router.push({ name: "messagesAdmin" });
  }
};

// Function to send reply
const sendEmail = async () => {
  const response = await fetchWithRefresh(
    `${import.meta.env.VITE_API_URL}/sendReply/${messageId}`,
    {
      method: "POST",
      body: JSON.stringify({
        fullName: productsStore.specificMessage.fullName,
        email: productsStore.specificMessage.email,
        reply: reply.value,
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    },
  );

  const data = await response.json();

  if (data.success) {
    reply.value = "";
    toast.success("The response was sent successfully");
  }
};

onMounted(async () => {
  await productsStore.getSpecificMessage(messageId);
});
</script>

<style lang="scss" scoped>
.deleteBtn {
  transition: 0.3s;
  &:hover {
    background-color: #c21615 !important;
    color: white !important;
  }
}

.statusBx {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 7px;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  &.Unread::before {
    background-color: rgb(253, 70, 107) !important;
  }
  &.Read::before {
    background-color: rgb(60, 186, 90) !important;
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
</style>
