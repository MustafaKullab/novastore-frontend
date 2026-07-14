<template>
  <div class="ContactPage py-4" style="background-color: var(--background-section)">
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link :to="{ name: 'homePage' }" class="text-decoration-none">Home</router-link>
          </li>
          <li class="breadcrumb-item" aria-current="page">
            <router-link
              :to="{
                name: 'contact',
              }"
              class="text-decoration-none"
              style="color: #9ca4b1"
            >
              Contact Us</router-link
            >
          </li>
        </ol>
      </nav>
      <div class="header text-center">
        <h1 class="title">Contact Us</h1>
        <p class="text-muted">
          We're here to help you anytime. <br />
          Feel free to reach out!
        </p>
      </div>
      <div class="contactInformation row">
        <div class="col-md-4 mb-3 mb-md-0">
          <div class="getInTouch p-3 bg-white rounded border">
            <div class="header mb-3 text-center text-md-start">
              <h5 class="title">Get in Touch</h5>
            </div>
            <div class="boxes">
              <div
                class="box d-flex align-items-center gap-2 mb-3 justify-content-center justify-content-md-start flex-column flex-md-row text-center text-md-start border-bottom pb-2"
              >
                <div
                  class="icon d-flex justify-content-center align-items-center rounded"
                  style="
                    width: 40px;
                    height: 40px;
                    flex-shrink: 0;
                    background-color: #f2effc;
                    color: #6b52df;
                  "
                >
                  <i class="bi bi-telephone-fill fs-5"></i>
                </div>
                <div class="details">
                  <div class="mainHead fw-bold">Phone</div>
                  <div class="phoneNumber text-muted">+970 59 711 6801</div>
                </div>
              </div>
              <div
                class="box d-flex align-items-center gap-2 mb-3 justify-content-center justify-content-md-start flex-column flex-md-row text-center text-md-start border-bottom pb-2"
              >
                <div
                  class="icon d-flex justify-content-center align-items-center rounded"
                  style="
                    width: 40px;
                    height: 40px;
                    flex-shrink: 0;
                    background-color: #f2effc;
                    color: #6b52df;
                  "
                >
                  <i class="bi bi-envelope-fill -fill fs-5"></i>
                </div>
                <div class="details">
                  <div class="mainHead fw-bold">Email</div>
                  <div class="phoneNumber text-muted">momoana013@gmail.com</div>
                </div>
              </div>
              <div
                class="box d-flex align-items-center gap-2 mb-3 justify-content-center justify-content-md-start flex-column flex-md-row text-center text-md-start border-bottom pb-2"
              >
                <div
                  class="icon d-flex justify-content-center align-items-center rounded"
                  style="
                    width: 40px;
                    height: 40px;
                    flex-shrink: 0;
                    background-color: #f2effc;
                    color: #6b52df;
                  "
                >
                  <i class="bi bi-geo-alt-fill fs-5"></i>
                </div>
                <div class="details">
                  <div class="mainHead fw-bold">Address</div>
                  <div class="phoneNumber text-muted">GAZA, Palestine</div>
                </div>
              </div>
              <div
                class="box d-flex align-items-center gap-2 mb-3 justify-content-center justify-content-md-start flex-column flex-md-row text-center text-md-start border-bottom pb-2"
              >
                <div
                  class="icon d-flex justify-content-center align-items-center rounded"
                  style="
                    width: 40px;
                    height: 40px;
                    flex-shrink: 0;
                    background-color: #f2effc;
                    color: #6b52df;
                  "
                >
                  <i class="bi bi-clock-fill fs-5"></i>
                </div>
                <div class="details">
                  <div class="mainHead fw-bold">Working Hours</div>
                  <div class="phoneNumber text-muted small">Mon - Fri : 9:00 AM - 6:00 PM</div>
                </div>
              </div>
            </div>
            <div class="socialMedia">
              <div class="msg fw-bold text-center text-md-start">Follow Us</div>
              <div
                class="links d-flex justify-content-center justify-content-md-start align-items-center gap-4 mt-3"
              >
                <div
                  class="facebook d-flex justify-content-center align-items-center rounded-pill"
                  style="width: 40px; height: 40px; flex-shrink: 0; background-color: #efedfc"
                >
                  <a style="color: #644fe2" href="http://facebook.com"
                    ><i class="bi bi-facebook" target="_blank"></i
                  ></a>
                </div>
                <div
                  class="twitter d-flex justify-content-center align-items-center rounded-pill"
                  style="width: 40px; height: 40px; flex-shrink: 0; background-color: #efedfc"
                >
                  <a style="color: #644fe2" href="http://x.com"
                    ><i class="bi bi-twitter-x" target="_blank"></i
                  ></a>
                </div>
                <div
                  class="instagram d-flex justify-content-center align-items-center rounded-pill"
                  style="width: 40px; height: 40px; flex-shrink: 0; background-color: #efedfc"
                >
                  <a style="color: #644fe2" href="http://instagram.com"
                    ><i class="bi bi-instagram" target="_blank"></i
                  ></a>
                </div>
                <div
                  class="linkedIn d-flex justify-content-center align-items-center rounded-pill"
                  style="width: 40px; height: 40px; flex-shrink: 0; background-color: #efedfc"
                >
                  <a
                    style="color: #644fe2"
                    href="https://www.linkedin.com/in/mustafa-kullab-aa6a153bb/"
                    target="_blank"
                    ><i class="bi bi-linkedin"></i
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="sendMsg p-3 bg-white rounded border">
            <div class="header mb-3 text-center text-md-start">
              <h5>Send Us a Message</h5>
            </div>
            <form @submit.prevent="handleWithSendMessage">
              <div class="row mb-3">
                <div class="col-md-6 mb-3 mb-md-0">
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': fullNameError }"
                    id="validationCustom01"
                    placeholder="Full Name"
                    v-model="fullName"
                    style="box-shadow: none"
                  />
                  <div class="invalid-feedback">{{ fullNameError }}</div>
                </div>
                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': emailError }"
                    id="validationCustom02"
                    placeholder="Email Address"
                    v-model="email"
                    style="box-shadow: none"
                  />
                  <div class="invalid-feedback">{{ emailError }}</div>
                </div>
              </div>
              <div class="mb-3">
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': subjectError }"
                  id="validationCustom03"
                  placeholder="Subject"
                  v-model="subject"
                  style="box-shadow: none"
                />
                <div class="invalid-feedback">
                  {{ subjectError }}
                </div>
              </div>
              <div class="mb-3">
                <textarea
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': messageError }"
                  id="validationCustom04"
                  placeholder="Your Message"
                  v-model="message"
                  style="resize: none; height: 120px; box-shadow: none"
                />
                <div class="invalid-feedback">
                  {{ messageError }}
                </div>
              </div>
              <div class="submitBtn">
                <button
                  type="submit"
                  class="btn btn-mainColor w-100"
                  :data-bs-toggle="!userStore.user ? 'modal' : ''"
                  :data-bs-target="!userStore.user ? `#loginModal` : ''"
                >
                  <i class="bi bi-send"></i> Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="loginModal"
        tabindex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header" style="border: none">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref="closeModal"
                style="border: 2px solid #00000038; border-radius: 50%"
              ></button>
            </div>
            <div class="title">
              <div class="fs-2 title text-center fw-bold">You're One Step Away!</div>
              <div class="description text-center text-muted small" style="line-height: 1.2">
                Create an account or sign in to unlock the best <br />
                shopping experience
              </div>
            </div>
            <div class="modal-body">
              <div class="personIcon text-center">
                <i class="bi bi-person-fill fs-1"></i>
              </div>
              <div class="d-flex bg-white shadow-sm rounded border p-3 my-3">
                <div class="box text-center">
                  <div
                    class="icon p-3 rounded d-flex justify-content-center align-items-center mx-auto"
                    style="width: 60px; height: 60px; background-color: #f0e9fb; color: #5520bc"
                  >
                    <i class="bi bi-lightning-charge-fill fs-2"></i>
                  </div>
                  <div class="details">
                    <div class="title fw-bold">Fast & secure checkout</div>
                    <div class="desc">Enjoy a smooth and secure payment experience.</div>
                  </div>
                </div>
                <div class="box text-center">
                  <div
                    class="icon p-3 rounded d-flex justify-content-center align-items-center mx-auto"
                    style="width: 60px; height: 60px; background-color: #f0e9fb; color: #5520bc"
                  >
                    <i class="bi bi-truck fs-2"></i>
                  </div>
                  <div class="details">
                    <div class="title fw-bold">Truck your orders</div>
                    <div class="desc">Stay updated on every step of your delivery.</div>
                  </div>
                </div>
                <div class="box text-center">
                  <div
                    class="icon p-3 rounded d-flex justify-content-center align-items-center mx-auto"
                    style="width: 60px; height: 60px; background-color: #f0e9fb; color: #5520bc"
                  >
                    <i class="bi bi-heart-fill fs-2"></i>
                  </div>
                  <div class="details">
                    <div class="title fw-bold">Save items</div>
                    <div class="desc">Bookmark your favorite products and shop easily later.</div>
                  </div>
                </div>
              </div>
              <div class="modal-footer justify-content-center" style="border: none">
                <button
                  type="button"
                  class="signinBtn btn btn-primary w-100 d-flex align-items-center gap-3 justify-content-center"
                  @click="goToSifnPage"
                  style="background: linear-gradient(180deg, #7d4ada, #5322be)"
                >
                  <div><i class="bi bi-person-plus-fill"></i></div>
                  <div>Sign In / Create Account</div>
                  <div><i class="bi bi-arrow-right"></i></div>
                </button>
                <button
                  type="button"
                  class="closeBtn btn btn-secondary w-100 d-flex align-items-center justify-content-center gap-3 fw-bold"
                  data-bs-dismiss="modal"
                  style="background: linear-gradient(180deg, #fdfdfe, #f6f7fa); color: #474456"
                >
                  <div><i class="bi bi-person"></i></div>
                  <div>Continue Guest Browsing</div>
                </button>
                <div class="msg small text-center text-muted">
                  <i class="bi bi-lock"></i> Your data is safe with us. We never share your
                  information.
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
import { onMounted, ref, watch } from "vue";
import { fetchWithRefresh } from "../../public/fetchWithRefresh";
import { useUserStore } from "@/stores/user";
import { toast } from "vue3-toastify";

// Define user store
const userStore = useUserStore();

// Variables to store the errors comes from db
const fullNameError = ref("");
const emailError = ref("");
const subjectError = ref("");
const messageError = ref("");

// Variables to store the information of message
const fullName = ref("");
const email = ref("");
const subject = ref("");
const message = ref("");

watch(fullName, () => {
  fullNameError.value = "";
});

watch(email, () => {
  emailError.value = "";
});

watch(subject, () => {
  subjectError.value = "";
});

watch(message, () => {
  messageError.value = "";
});

const handleWithSendMessage = async () => {
  const response = await fetchWithRefresh("http://localhost:7000/contactMessage", {
    method: "POST",
    body: JSON.stringify({
      fullName: fullName.value,
      email: email.value,
      subject: subject.value,
      message: message.value,
    }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const data = await response.json();

  if (data.success) {
    fullName.value = "";
    email.value = "";
    subject.value = "";
    message.value = "";
    toast.success("Your message has been sent successfully 🎉!");
  } else {
    fullNameError.value = data.errors.fullName;
    emailError.value = data.errors.email;
    subjectError.value = data.errors.subject;
    messageError.value = data.errors.message;
  }
};

onMounted(async () => {
  await userStore.getUser();
});
</script>

<style lang="scss" scoped>
.btn-mainColor {
  background-color: var(--main-color);
  color: white;
  &:focus,
  &:hover {
    background-color: #644fe5;
    color: white;
    border: none !important;
  }
}

.modal-content {
  left: 50% !important;
  transform: translateX(-50%) !important;
  width: 150% !important;
  @media (max-width: 767px) {
    width: 100% !important;
  }
}

.personIcon {
  background: linear-gradient(180deg, #b18fea, #612dca);
  width: 165px;
  height: 165px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
  margin: auto !important;
  i {
    font-size: 175px !important;
    color: #f3edfb !important;
  }
}

.modal-footer {
  .signinBtn {
    transition: 0.3s;
    &:hover {
      background: linear-gradient(180deg, #693dbf, #4a1da5) !important;
    }
  }
  .closeBtn {
    transition: 0.3s;
    &:hover {
      background-color: #eee !important;
    }
  }
}
</style>
