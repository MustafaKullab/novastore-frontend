<template>
  <div class="ForgotPassword vh-100">
    <div class="container h-100 row mx-auto justify-content-center align-items-center">
      <div class="forgotCard shadow-sm col-md-5 py-5 px-4 rounded">
        <div class="image text-center">
          <img :src="forgot" class="img-fluid" style="width: 250px" alt="Forgot" />
        </div>
        <div class="header text-center">
          <h1>Forgot password?</h1>
          <p class="text-center text-muted">
            No worries! Enter your email and we'll send you unstructions to reset your password .
          </p>
        </div>
        <form @submit.prevent="handleForgotPassword">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <div class="input-group has-validation">
              <span class="input-group-text" id="emailGroupForgot"
                ><i class="bi bi-envelope text-muted"></i
              ></span>
              <input
                type="text"
                class="form-control"
                id="email"
                aria-describedby="emailGroupForgot emailId"
                placeholder="Enter your email"
                style="box-shadow: none"
                :class="{ 'is-invalid': emailMessage }"
                v-model="email"
              />
              <div id="emailId" class="invalid-feedback">{{ emailMessage }}</div>
            </div>
          </div>

          <div class="forgotPassword text-center">
            <button class="btn w-100">
              Send reset code <span><i class="bi bi-send-fill"></i></span>
            </button>
          </div>
        </form>
        <div class="backToLogin my-2">
          <button
            class="btn d-flex align-items-center justify-content-center gap-2 text-center mx-auto"
            @click="backToLogin"
          >
            <span><i class="bi bi-arrow-left"></i></span> Back to login
          </button>
        </div>
        <div class="message d-flex gap-2 rounded p-2">
          <div class="icon"><i class="bi bi-shield-check"></i></div>
          <div class="text">
            Didn't receive the email? Check your Spam folder or request a new reset link.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import forgot from "@/assets/images/forgot.png";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { watch } from "vue";

// Variables to define the router and router
const router = useRouter();

// Variable to store the code
const email = ref("");

// Variable to store the error come from backend
const emailMessage = ref("");

//Watch error message
watch(email, () => {
  emailMessage.value = "";
});

// Function to handle with code verification
const handleForgotPassword = async () => {
  const response = await fetch("http://localhost:7000/forgotPassword", {
    method: "POST",
    body: JSON.stringify({ email: email.value }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const data = await response.json();

  if (data.success) {
    router.push({ name: "resetPassword", query: { userId: data.user._id } });
  } else {
    emailMessage.value = data.message;
  }
};

// Function to back login
const backToLogin = () => {
  router.push({ name: "login" });
};
</script>

<style lang="scss" scoped>
.ForgotPassword {
  .forgotPassword {
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
  .backToLogin {
    button {
      color: var(--main-color);
      font-weight: bold;
    }
  }
  .message {
    background-color: #f9f9fc;
    .icon {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background-color: #e4dff8;
      object-fit: contain;
      flex-shrink: 0;
      i {
        font-size: 20px;
        color: var(--main-color);
      }
    }
  }
}
</style>
