<template>
  <div class="LogIn vh-100">
    <div class="container h-100 row mx-auto justify-content-center align-items-center">
      <div class="loginCard shadow-sm col-md-5 py-5 px-4 rounded">
        <div class="image text-center">
          <img :src="login" class="img-fluid" style="width: 250px" alt="verifyImg" />
        </div>
        <div class="header text-center">
          <h1>Welcome back</h1>
          <p class="text-center text-muted">Login to your account to continue</p>
        </div>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <div class="input-group has-validation">
              <span class="input-group-text" id="emailGroupLogin"
                ><i class="bi bi-envelope text-muted"></i
              ></span>
              <input
                type="text"
                class="form-control"
                id="email"
                aria-describedby="emailGroupLogin emailId"
                placeholder="Enter your email"
                style="box-shadow: none"
                :class="{ 'is-invalid': emailMessage }"
                v-model="email"
              />
              <div id="emailId" class="invalid-feedback">{{ emailMessage }}</div>
            </div>
          </div>
          <div class="">
            <label for="password" class="form-label">Password</label>
            <div class="input-group has-validation position-relative">
              <span class="input-group-text" id="passwordGroupLogin"
                ><i class="bi bi-lock text-muted"></i
              ></span>
              <input
                :type="eye1 ? 'text' : 'password'"
                class="form-control"
                id="password"
                aria-describedby="passwordGroupLogin passwordId"
                placeholder="Enter your password"
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
          <div class="my-2 forgotPassword">
            <router-link :to="{ name: 'forgotPassword' }" class="text-decoration-none"
              >Forgot password?</router-link
            >
          </div>
          <div class="loginBtn text-center">
            <button class="btn w-100">Login</button>
          </div>
        </form>
        <div class="or my-1 text-center">or</div>
        <div class="dontHaveAccount mt-3 text-muted text-center">
          Don't have an account?
          <router-link :to="{ name: 'signup' }" class="text-decoration-none signupLink"
            >Sign up</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import login from "@/assets/images/login.png";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { watch } from "vue";

// Variables to define the router and router
const router = useRouter();

//Show and hide password
const eye1 = ref(false);

const toggleEye1 = () => {
  eye1.value = !eye1.value;
};

// Variable to store the code
const email = ref("");
const password = ref("");

// Variable to store the error come from backend
const emailMessage = ref("");
const passwordMessage = ref("");

//Watch error message
watch(email, () => {
  emailMessage.value = "";
});

watch(password, () => {
  passwordMessage.value = "";
});

// Function to handle with code verification
const handleLogin = async () => {
  const response = await fetch("http://localhost:7000/login", {
    method: "POST",
    body: JSON.stringify({ email: email.value, password: password.value }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const data = await response.json();

  if (data.success) {
    router.push({ name: "homePage" });
  } else {
    emailMessage.value = data.errors.email;
    passwordMessage.value = data.errors.password;
  }
};
</script>

<style lang="scss" scoped>
.LogIn {
  .emailOfUser {
    color: var(--main-color);
  }
  .loginBtn {
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
  .or {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      top: 55%;
      right: 0;
      transform: translateY(-50%);
      width: 47%;
      height: 1px;
      background-color: rgb(200, 200, 200);
    }
    &::after {
      content: "";
      position: absolute;
      top: 55%;
      left: 0;
      transform: translateY(-50%);
      width: 47%;
      height: 1px;
      background-color: rgb(200, 200, 200);
    }
  }
  .signupLink {
    color: var(--main-color);
    font-weight: bold;
  }
}
</style>
