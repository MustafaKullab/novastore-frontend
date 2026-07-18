<template>
  <div class="ResetPassword vh-100 py-4">
    <div class="container h-100 row mx-auto justify-content-center align-items-center">
      <div class="resetCard shadow-sm col-md-5 p-4 rounded">
        <div class="image text-center">
          <img :src="reset" class="img-fluid" style="width: 100px" alt="Forgot" />
        </div>
        <div class="header text-center">
          <h1>Reset password</h1>
          <p class="text-center text-muted">
            Enter the verification code and choose a new password.
          </p>
        </div>
        <form @submit.prevent="handleResetPassword">
          <div class="mb-3">
            <label for="code" class="form-label">Verification code</label>
            <div class="input-group has-validation">
              <span class="input-group-text" id="codeGroup"
                ><i class="bi bi-shield-lock text-muted"></i
              ></span>
              <input
                type="text"
                class="form-control"
                id="code"
                aria-describedby="codeGroup codeId"
                placeholder="Enter 6-digit code"
                style="box-shadow: none"
                :class="{ 'is-invalid': codeMessage }"
                v-model="code"
              />
              <div id="codeId" class="invalid-feedback">{{ codeMessage }}</div>
            </div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">New password</label>
            <div class="input-group has-validation position-relative">
              <span class="input-group-text" id="passwordGroup"
                ><i class="bi bi-file-lock text-muted"></i
              ></span>
              <input
                :type="eye1 ? 'text' : 'password'"
                class="form-control"
                id="password"
                aria-describedby="passwordGroup passwordId"
                placeholder="Enter new password"
                style="box-shadow: none"
                :class="{ 'is-invalid': passwordMessage }"
                v-model="password"
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
                :style="passwordMessage ? 'top: 30%; right: 30px' : ''"
                @click.prevent="toggleEye1"
              >
                <i class="bi" :class="eye1 ? ' bi-eye-slash' : ' bi-eye'"></i>
              </div>
              <div id="passwordId" class="invalid-feedback">{{ passwordMessage }}</div>
            </div>
          </div>
          <div class="mb-3">
            <label for="confPass" class="form-label">Confirm new password</label>
            <div class="input-group has-validation position-relative">
              <span class="input-group-text" id="confPassGroup"
                ><i class="bi bi-file-lock text-muted"></i
              ></span>
              <input
                :type="eye2 ? 'text' : 'password'"
                class="form-control"
                id="confPass"
                aria-describedby="confPassGroup confPassId"
                placeholder="Confirm new password"
                style="box-shadow: none"
                :class="{ 'is-invalid': confPassMessage }"
                v-model="confPass"
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
                :style="passwordMessage ? 'top: 30%; right: 30px' : ''"
                @click.prevent="toggleEye2"
              >
                <i class="bi" :class="eye2 ? ' bi-eye-slash' : ' bi-eye'"></i>
              </div>
              <div id="confPassId" class="invalid-feedback">{{ confPassMessage }}</div>
            </div>
          </div>

          <div class="resetPassword text-center">
            <button class="btn w-100">Reset password</button>
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
          <div class="text">Enter the verification code exactly as it appears in your email.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import reset from "@/assets/images/reset.png";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { watch } from "vue";

// Variables to define the router and router
const router = useRouter();
const route = useRoute();

// Variable to store the code
const code = ref("");
const password = ref("");
const confPass = ref("");

// Variable to store the error come from backend
const codeMessage = ref("");
const passwordMessage = ref("");
const confPassMessage = ref("");

//Show and hide password
const eye1 = ref(false);

const toggleEye1 = () => {
  eye1.value = !eye1.value;
};

const eye2 = ref(false);

const toggleEye2 = () => {
  eye2.value = !eye2.value;
};

//Watch error message
watch(code, () => {
  codeMessage.value = "";
});

watch(password, () => {
  passwordMessage.value = "";
});

watch(confPass, () => {
  confPassMessage.value = "";
});

//Get the id of user
const userId = route.query.userId;

// Function to handle with code verification
const handleResetPassword = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/resetPassword`, {
    method: "POST",
    body: JSON.stringify({
      userId,
      code: code.value,
      newPassword: password.value,
      retypePassword: confPass.value,
    }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const data = await response.json();

  if (data.success) {
    router.push({ name: "login" });
  } else if (data.message === "Password must be contains at least 6 chars") {
    passwordMessage.value = "Password must be contains at least 6 chars";
  } else if (data.message === "Code is not correct") {
    codeMessage.value = "Code is not correct";
  } else if (data.message === "Both passwords must be equals") {
    confPassMessage.value = data.message;
  } else {
    confPassMessage.value = data.message;
  }
};

// Function to back login
const backToLogin = () => {
  router.push({ name: "login" });
};
</script>

<style lang="scss" scoped>
.ResetPassword {
  .resetPassword {
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
