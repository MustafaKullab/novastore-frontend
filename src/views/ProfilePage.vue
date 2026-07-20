<template>
  <div class="ProfilePage py-4" style="background-color: var(--background-section)">
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link :to="{ name: 'homePage' }" class="text-decoration-none">Home</router-link>
          </li>
          <li class="breadcrumb-item" aria-current="page">
            <router-link
              :to="{
                name: 'profilePage',
              }"
              class="text-decoration-none"
              style="color: #9ca4b1"
            >
              Profile
            </router-link>
          </li>
        </ol>
      </nav>
      <div class="header text-center">
        <h1 class="title">My Profile</h1>
        <p class="text-muted">Manage your personal information and account settings.</p>
      </div>
      <div class="row" v-if="userStore.user">
        <div class="col-lg-3 mb-3 mb-lg-0">
          <div class="links p-3 bg-white rounded border">
            <ul class="list-unstyled">
              <li
                class="mb-3"
                @click="pageName = 'information'"
                :class="{ active: pageName === 'information' }"
              >
                <i class="bi bi-person"></i> Profile Information
              </li>
              <li
                class="mb-3"
                @click="pageName = 'cahngePassword'"
                :class="{ active: pageName === 'cahngePassword' }"
              >
                <i class="bi bi-lock"></i> Change Password
              </li>
              <li
                class="mb-3"
                @click="pageName = 'myOrders' && router.push({ name: 'myorders' })"
                :class="{ active: pageName === 'myOrders' }"
              >
                <i class="bi bi-box"></i> My Orders
              </li>
              <li
                @click="pageName = 'logout' && logout()"
                :class="{ active: pageName === 'logout' }"
              >
                <i class="bi bi-box-arrow-left"></i> Log Out
              </li>
            </ul>
          </div>
        </div>
        <transition name="fade">
          <div class="col-lg-9 row" v-if="pageName === 'information'">
            <div class="col-lg-8 mb-3 mb-lg-0">
              <div class="profileInformation p-3 bg-white border rounded">
                <div class="title">
                  <div class="fw-bold">Profile Information</div>
                  <p class="text-muted">Update your personal information.</p>
                </div>
                <div class="image mb-3">
                  <img
                    :src="`${apiUrl}/${userStore.user.avatar}`"
                    style="width: 80px; height: 80px; object-fit: cover"
                    class="rounded-pill"
                    alt="test"
                  />
                </div>
                <div class="formChanges">
                  <form>
                    <div class="mb-3">
                      <label for="changeName" class="form-label">Full Name</label>
                      <input
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': usernameError }"
                        id="changeName"
                        aria-describedby="changeNameId"
                        style="box-shadow: none"
                        v-model="newUserName"
                        required
                      />
                      <div id="changeNameId" class="invalid-feedback">{{ usernameError }}</div>
                    </div>
                    <div class="mb-3">
                      <label for="email" class="form-label">Email Address </label>
                      <input
                        type="text"
                        class="form-control"
                        id="email"
                        aria-describedby="emailId"
                        style="box-shadow: none"
                        readonly
                        value="momoana013@gmail.com"
                      />
                      <div class="msg small text-muted my-1">
                        <i class="bi bi-lock"></i> Email address can't be changed
                      </div>
                    </div>
                    <div class="saveBtn">
                      <button class="btn btn-mainColor" @click.prevent="updateUsername">
                        <i class="bi bi-file-earmark-check"></i> Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="accountOverview p-3 bg-white rounded border">
                <div class="title mb-4">
                  <div class="fw-bold">Account Overview</div>
                </div>
                <div class="boxes py-3">
                  <div class="box d-flex gap-3 pb-3 mb-4 border-bottom">
                    <div
                      class="icon d-flex justify-content-center align-items-center rounded-pill"
                      style="
                        width: 50px;
                        height: 50px;
                        flex-shrink: 0;
                        background-color: #f6f3fd;
                        color: #4d22f6;
                      "
                    >
                      <i class="bi bi-calendar-event fs-4"></i>
                    </div>
                    <div class="details">
                      <div class="memberSince text-muted mb-1">Member Since</div>
                      <div class="date fw-bold">27 / 7 / 2026</div>
                    </div>
                  </div>
                  <div class="box d-flex gap-3 pb-3 mb-4 border-bottom">
                    <div
                      class="icon d-flex justify-content-center align-items-center rounded-pill"
                      style="
                        width: 50px;
                        height: 50px;
                        flex-shrink: 0;
                        background-color: #f6f3fd;
                        color: #4d22f6;
                      "
                    >
                      <i class="bi bi-person fs-4"></i>
                    </div>
                    <div class="details">
                      <div class="accountStatus text-muted mb-1">Account Status</div>
                      <div
                        class="status fw-bold rounded-pill"
                        style="
                          background-color: #dbf7da;
                          color: #0f9313;
                          width: fit-content;
                          padding: 5px 10px;
                        "
                      >
                        Active
                      </div>
                    </div>
                  </div>
                  <div class="box d-flex gap-3 pb-3 mb-4 border-bottom">
                    <div
                      class="icon d-flex justify-content-center align-items-center rounded-pill"
                      style="
                        width: 50px;
                        height: 50px;
                        flex-shrink: 0;
                        background-color: #f6f3fd;
                        color: #4d22f6;
                      "
                    >
                      <i class="bi bi-box fs-4"></i>
                    </div>
                    <div class="details">
                      <div class="totalOrders text-muted mb-1">Total Orders</div>
                      <div class="status fw-bold">8</div>
                    </div>
                  </div>
                  <div class="box d-flex gap-3">
                    <div
                      class="icon d-flex justify-content-center align-items-center rounded-pill"
                      style="
                        width: 50px;
                        height: 50px;
                        flex-shrink: 0;
                        background-color: #f6f3fd;
                        color: #4d22f6;
                      "
                    >
                      <i class="bi bi-credit-card fs-4"></i>
                    </div>
                    <div class="details">
                      <div class="totalOrders text-muted mb-1">Default Payment Method</div>
                      <div class="status fw-bold">Cash on Delivery</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
        <transition name="fade">
          <div class="col-lg-9" v-if="pageName === 'cahngePassword'">
            <div class="changePassword p-3 bg-white rounded border">
              <div class="hrader d-flex align-items-center gap-3">
                <div
                  class="icon d-flex justify-content-center align-items-center rounded-pill"
                  style="
                    width: 70px;
                    height: 70px;
                    flex-shrink: 0;
                    background-color: #f3f0fd;
                    color: #4d22f6;
                  "
                >
                  <i class="bi bi-shield-check fs-2"></i>
                </div>
                <div class="title">
                  <div class="fw-bold">Change Your Password</div>
                  <div class="text-muted">Make Sure your new password is strong and unique.</div>
                </div>
              </div>
              <div class="formChangePass mt-3">
                <form>
                  <div class="mb-3">
                    <label for="password" class="form-label">Current Password</label>
                    <div class="input-group has-validation position-relative">
                      <input
                        :type="eye1 ? 'text' : 'password'"
                        class="form-control"
                        id="password"
                        aria-describedby="passwordGroup passwordId"
                        placeholder="Enter your current password"
                        style="box-shadow: none"
                        :class="{ 'is-invalid': currentPassMsg }"
                        v-model="currentPassword"
                      />
                      <div
                        class="position-absolute btn eyeEle"
                        style="
                          top: 50%;
                          transform: translateY(-50%);
                          right: 0;
                          z-index: 100;
                          cursor: pointer;
                        "
                        :style="currentPassMsg ? 'top: 30%; right: 30px' : ''"
                        @click.prevent="toggleEye1"
                      >
                        <i class="bi" :class="eye1 ? ' bi-eye-slash' : ' bi-eye'"></i>
                      </div>
                      <div id="passwordId" class="invalid-feedback">{{ currentPassMsg }}</div>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="newPass" class="form-label">New password</label>
                    <div class="input-group has-validation position-relative">
                      <input
                        :type="eye2 ? 'text' : 'password'"
                        class="form-control"
                        id="newPass"
                        aria-describedby="newPassId"
                        placeholder="Enter your new password"
                        style="box-shadow: none"
                        :class="{ 'is-invalid': newPassMsg }"
                        v-model="newPassword"
                      />
                      <div
                        class="position-absolute btn eyeEle"
                        style="
                          top: 50%;
                          transform: translateY(-50%);
                          right: 0;
                          z-index: 100;
                          cursor: pointer;
                        "
                        :style="newPassMsg ? 'top: 30%; right: 30px' : ''"
                        @click.prevent="toggleEye2"
                      >
                        <i class="bi" :class="eye2 ? ' bi-eye-slash' : ' bi-eye'"></i>
                      </div>
                      <div id="newPassId" class="invalid-feedback">{{ newPassMsg }}</div>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="confPass" class="form-label">Confirm new password</label>
                    <div class="input-group has-validation position-relative">
                      <input
                        :type="eye3 ? 'text' : 'password'"
                        class="form-control"
                        id="confPass"
                        aria-describedby="confPassGroup confPassId"
                        placeholder="Enter your new password"
                        style="box-shadow: none"
                        :class="{ 'is-invalid': confNewPassMsg }"
                        v-model="confNewPassword"
                      />
                      <div
                        class="position-absolute btn eyeEle"
                        style="
                          top: 50%;
                          transform: translateY(-50%);
                          right: 0;
                          z-index: 100;
                          cursor: pointer;
                        "
                        :style="confNewPassMsg ? 'top: 30%; right: 30px' : ''"
                        @click.prevent="toggleEye3"
                      >
                        <i class="bi" :class="eye3 ? ' bi-eye-slash' : ' bi-eye'"></i>
                      </div>
                      <div id="confPassId" class="invalid-feedback">{{ confNewPassMsg }}</div>
                    </div>
                  </div>
                  <div class="updateBtn">
                    <button class="btn btn-mainColor" @click.prevent="updatePassword">
                      <i class="bi bi-lock"></i> Update Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { fetchWithRefresh } from "../../public/fetchWithRefresh";
import { toast } from "vue3-toastify";

// Define the router
const router = useRouter();

// define the store
const userStore = useUserStore();

// define variable to store the current section
const pageName = ref("information");

// define variable to store the new name
const newUserName = ref("");

// define cariable to store a username error
const usernameError = ref("");

// define variables to store the passwords
const currentPassword = ref("");
const newPassword = ref("");
const confNewPassword = ref("");

// define variables to store the errors message
const currentPassMsg = ref("");
const newPassMsg = ref("");
const confNewPassMsg = ref("");

//Show and hide password
const eye1 = ref(false);

const toggleEye1 = () => {
  eye1.value = !eye1.value;
};

const eye2 = ref(false);

const toggleEye2 = () => {
  eye2.value = !eye2.value;
};

const eye3 = ref(false);

const toggleEye3 = () => {
  eye3.value = !eye3.value;
};

// Function to update user name
const updateUsername = async () => {
  const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/changeUsername`, {
    method: "PATCH",
    body: JSON.stringify({ newUsername: newUserName.value }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const data = await response.json();

  if (data.success) {
    toast.success("Username updated successfully.");
  } else if (data.message === "Please enter a valid username") {
    usernameError.value = "Please enter a valid username";
  }
};

watch(currentPassword, () => {
  currentPassMsg.value = "";
  newPassMsg.value = "";
  confNewPassMsg.value = "";
});

watch(newPassword, () => {
  currentPassMsg.value = "";
  newPassMsg.value = "";
  confNewPassMsg.value = "";
});

watch(confNewPassword, () => {
  currentPassMsg.value = "";
  newPassMsg.value = "";
  confNewPassMsg.value = "";
});

// Function to update the password
const updatePassword = async () => {
  const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/resetPassFromProfile`, {
    method: "POST",
    body: JSON.stringify({
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
      confNewPassword: confNewPassword.value,
    }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const data = await response.json();

  if (data.success) {
    toast.success("Password updated successfully.");
    currentPassword.value = "";
    newPassword.value = "";
    confNewPassword.value = "";
  } else if (data.message === "Current password is not correct!") {
    currentPassMsg.value = "Current password is not correct!";
  } else if (data.message === "Password must be equal at least 6 chars") {
    newPassMsg.value = "Password must be equal at least 6 chars";
  } else if (data.message === "New password must be different from current password") {
    newPassMsg.value = "New password must be different from current password";
  } else {
    confNewPassMsg.value = "Both passwords must be equal";
  }
};

// Function to logout user
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

const apiUrl = import.meta.env.VITE_API_URL;

onMounted(async () => {
  await userStore.getUser();
  newUserName.value = userStore.user.username;
});
</script>

<style lang="scss" scoped>
.links {
  ul {
    li {
      padding: 10px;
      cursor: pointer;
      border-radius: 6px;
      transition: 0.3s;
      &.active,
      &:hover {
        background-color: #f5f2fd;
        color: #4d20f7;
      }
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

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.5s;
}
</style>
