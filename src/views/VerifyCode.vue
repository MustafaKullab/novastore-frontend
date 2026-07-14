<template>
  <div class="VerifyCode vh-100">
    <div class="container h-100 row mx-auto justify-content-center align-items-center">
      <div class="verifyCard shadow col-md-5 text-center py-5 px-4 rounded">
        <div class="image text-center">
          <img :src="verifyImg" class="img-fluid" style="width: 160px" alt="verifyImg" />
        </div>
        <div class="header">
          <h1>Verify your email</h1>
          <p class="text-center">
            We've sent a 6-digit verification code to <br />
            <span class="emailOfUser fw-bold" v-if="user">{{ user.email }}</span>
          </p>
        </div>
        <form @submit.prevent="handleVerifyCode">
          <div class="mb-3">
            <label for="verificationCode" class="form-label fw-bold">Verification code</label>
            <input
              type="text"
              class="form-control text-center"
              id="verificationCode"
              placeholder="*          *          *          *          *          *"
              style="box-shadow: none"
              aria-describedby="codeVerify"
              :class="{ 'is-invalid': codeMessage }"
              v-model="code"
            />
            <div id="codeVerify" class="invalid-feedback">{{ codeMessage }}</div>
          </div>
          <div class="verifyBtn text-center">
            <button class="btn w-100">Verify Code</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import verifyImg from "@/assets/images/verify.png";
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { watch } from "vue";

// Variables to define the router and router
const router = useRouter();
const route = useRoute();

// Variable to store the code
const code = ref("");

// Variable to store the error come from backend
const codeMessage = ref("");

//Get user id from link
const userId = route.query.userId;

// variable to store user
let user = ref({});

//Watch error message
watch(code, () => {
  codeMessage.value = "";
});

// Function to get current user
const getUser = async () => {
  const response = await fetch("http://localhost:7000/getUser", {
    method: "POST",
    body: JSON.stringify({ userId: userId }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const data = await response.json();

  user.value = data.user;
};

// Function to handle with code verification
const handleVerifyCode = async () => {
  const response = await fetch("http://localhost:7000/verify", {
    method: "POST",
    body: JSON.stringify({ code: code.value, userId }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const data = await response.json();

  if (data.success) {
    router.push({ name: "homePage" });
  } else {
    codeMessage.value = data.errors.code;
  }
};

onMounted(() => {
  getUser();
});
</script>

<style lang="scss" scoped>
.VerifyCode {
  .emailOfUser {
    color: var(--main-color);
  }
  .verifyBtn {
    button {
      background-color: var(--main-color);
      color: white;
      &:hover,
      &:focus {
        background-color: #5e4bd4;
        color: white;
      }
    }
  }
}
</style>
