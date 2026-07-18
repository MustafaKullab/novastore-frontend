<template>
  <div class="SignUp">
    <div class="container d-flex flex-column">
      <div class="header d-flex justify-content-between align-items-center py-3">
        <div class="logo">
          <img :src="logo" class="img-fluid" style="width: 120px" alt="" />
        </div>
        <div class="title">
          Already have an account?
          <router-link class="lgnLink text-decoration-none" :to="{ name: 'login' }"
            >Login</router-link
          >
        </div>
      </div>
      <div class="body row flex-grow-1 justify-content-between py-3">
        <div class="details col-md-6">
          <div class="title text-start mb-3">
            <h1>
              Create account <br />
              and start shopping
            </h1>
            <p class="text-secondary">
              Join NovaStore and get access to exclusive deals, fast delivery and more.
            </p>
          </div>
          <div class="features mt-4">
            <div class="feat d-flex gap-2 mb-2">
              <div class="icon rounded-pill d-flex align-items-center justify-content-center">
                <i class="bi bi-tags"></i>
              </div>
              <div class="details-feat">
                <h4>Exclusive deals</h4>
                <p>Enjoy members-only discounts and special offers.</p>
              </div>
            </div>
            <div class="feat d-flex gap-2 mb-2">
              <div class="icon rounded-pill d-flex align-items-center justify-content-center">
                <i class="bi bi-truck"></i>
              </div>
              <div class="details-feat">
                <h4>Fast delivery</h4>
                <p>Get your order delivered quickly and safely.</p>
              </div>
            </div>
            <div class="feat d-flex gap-2 mb-2">
              <div class="icon rounded-pill d-flex align-items-center justify-content-center">
                <i class="bi bi-shield-check"></i>
              </div>
              <div class="details-feat">
                <h4>Secure payments</h4>
                <p>Your transactions are protected with top-tier security.</p>
              </div>
            </div>
          </div>
          <div class="img-foot text-end">
            <img :src="cart" class="img-fluid" style="width: 250px" alt="" />
          </div>
        </div>
        <div class="form col-md-5 shadow-sm rounded py-3 px-4">
          <div class="header">
            <h1>Sign Up</h1>
            <p class="text-secondary">Fill in the details below to create your account</p>
          </div>
          <form @submit.prevent="handleSignUp">
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <div class="input-group has-validation">
                <span class="input-group-text" id="usernameIcon"><i class="bi bi-person"></i></span>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  aria-describedby="usernameIcon usernameId"
                  :class="{ 'is-invalid': usernameMessage }"
                  style="box-shadow: none"
                  placeholder="Enter your full name"
                  v-model="username"
                />
                <div id="usernameId" class="invalid-feedback">{{ usernameMessage }}</div>
              </div>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <div class="input-group has-validation">
                <span class="input-group-text" id="emailIcon"><i class="bi bi-envelope"></i></span>
                <input
                  type="text"
                  class="form-control"
                  id="email"
                  aria-describedby="emailIcon emailId"
                  :class="{ 'is-invalid': emailMessage }"
                  style="box-shadow: none"
                  placeholder="Enter your email address"
                  v-model="email"
                />
                <div id="emailId" class="invalid-feedback">{{ emailMessage }}</div>
              </div>
            </div>
            <div class="mb-3">
              <label for="avatar" class="form-label">Avatar</label>
              <div class="input-group has-validation">
                <span class="input-group-text" id="avatarIcon"
                  ><i class="bi bi-person-square"></i
                ></span>
                <input
                  type="file"
                  class="form-control"
                  id="avatar"
                  aria-describedby="avatarIcon avatarId"
                  style="box-shadow: none"
                  placeholder="Enter your avatar"
                  ref="avatar"
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <div class="input-group has-validation position-relative">
                <span class="input-group-text" id="passwordIcon"><i class="bi bi-lock"></i></span>
                <input
                  :type="eye1 ? 'text' : 'password'"
                  class="form-control"
                  id="password"
                  aria-describedby="passwordIcon passwordId"
                  :class="{ 'is-invalid': passwordMessage }"
                  style="box-shadow: none"
                  placeholder="Create a password"
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
              <label for="confPass" class="form-label">Confirm password</label>
              <div class="input-group has-validation position-relative">
                <span class="input-group-text" id="confPassIcon"><i class="bi bi-lock"></i></span>
                <input
                  :type="eye2 ? 'text' : 'password'"
                  class="form-control"
                  id="confPass"
                  aria-describedby="confPassIcon confPassId"
                  :class="{ 'is-invalid': confPassMessage }"
                  style="box-shadow: none"
                  placeholder="Confirm your password"
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
                  :style="confPassMessage ? 'top: 30%; right: 30px' : ''"
                  @click.prevent="toggleEye2"
                >
                  <i class="bi" :class="eye2 ? ' bi-eye-slash' : ' bi-eye'"></i>
                </div>
                <div id="confPassId" class="invalid-feedback">{{ confPassMessage }}</div>
              </div>
            </div>
            <div class="submitButton">
              <button class="btn d-flex align-items-center justify-content-center w-100">
                <span class="flex-grow-1">Create Account</span>
                <span><i class="bi bi-arrow-right"></i></span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import logo from "@/assets/images/logo.png";
import cart from "@/assets/images/cart.png";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { watch } from "vue";

//Define router
const router = useRouter();

//Show and hide password
const eye1 = ref(false);

const toggleEye1 = () => {
  eye1.value = !eye1.value;
};

const eye2 = ref(false);

const toggleEye2 = () => {
  eye2.value = !eye2.value;
};

//Define variables to store the information of user
const username = ref("");
const email = ref("");
const avatar = ref(null);
const password = ref("");
const confPass = ref("");

//Define variables to store the errors
const usernameMessage = ref("");
const emailMessage = ref("");
const passwordMessage = ref("");
const confPassMessage = ref("");

//Watch all variables
watch(username, () => {
  usernameMessage.value = "";
});

watch(email, () => {
  emailMessage.value = "";
});

watch(password, () => {
  passwordMessage.value = "";
});

watch(confPass, () => {
  confPassMessage.value = "";
});

//Function to handle with sign new user
const handleSignUp = async () => {
  //Variable to store form data
  const formData = new FormData();

  formData.append("username", username.value);
  formData.append("email", email.value);
  formData.append("avatar", avatar.value.files[0]);
  formData.append("password", password.value);
  formData.append("confPass", confPass.value);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  const data = await response.json();

  if (data.success) {
    router.push({ name: "verify", query: { userId: data.user._id } });
  } else {
    usernameMessage.value = data.errors.username;
    emailMessage.value = data.errors.email;
    passwordMessage.value = data.errors.password;
    confPassMessage.value = data.errors.confPass;
  }
};
</script>

<style lang="scss">
.SignUp {
  .lgnLink {
    color: var(--main-color);
  }

  .feat {
    text-align: start;
    .icon {
      width: 70px;
      height: 70px;
      object-fit: contain;
      background-color: var(--feat-background);
      border-radius: 50%;
      flex-shrink: 0;
      i {
        font-size: 22px;

        color: var(--main-color);
      }
    }
  }
  .submitButton {
    button {
      background-color: var(--main-color);
      color: white;
      &:hover {
        background-color: #5e4bd4;
      }
      &:focus {
        background-color: #5e4bd4;
        color: white;
      }
    }
  }
  .form {
    @media (max-width: 767px) {
      margin-top: 50px !important;
    }
  }
}
</style>
