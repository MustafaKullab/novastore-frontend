<template>
  <div class="AboutUs py-4" style="background-color: var(--background-section)">
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link :to="{ name: 'homePage' }" class="text-decoration-none">Home</router-link>
          </li>
          <li class="breadcrumb-item" aria-current="page">
            <router-link
              :to="{ name: 'about' }"
              class="text-decoration-none"
              style="color: #9ca4b1"
            >
              About Us
            </router-link>
          </li>
        </ol>
      </nav>
      <div class="heroSection py-4 row justify-content-between">
        <div class="details col-md-6 mb-5 mb-md-0 text-center text-md-start">
          <h6 class="text-uppercase small fw-bold" style="color: var(--main-color)">
            About NovaStore
          </h6>
          <h1 class="fw-bold">
            We're here to make <br />
            shopping better.
          </h1>
          <p class="text-muted my-3">
            NovaStore is a modern e-commerce platform that brings you <br />
            quality products, great prices, and an exceptional shopping <br />
            experience you can trust.
          </p>
          <router-link
            :to="{ name: 'products' }"
            class="btn btn-mainColor d-flex gap-2 align-items-center mx-auto me-md-auto ms-md-0"
            style="width: fit-content"
            ><span>Shop Now</span> <i class="bi bi-arrow-right mt-1"></i
          ></router-link>
        </div>
        <div class="image col-md-5">
          <img :src="heroAbout" alt="Hero" class="img-fluid" style="width: 450px" />
        </div>
      </div>
      <div class="whoWeAre row justify-content-between my-5 flex-column-reverse flex-md-row">
        <div class="image col-md-5">
          <img :src="laptop" alt="Laptop" class="img-fluid" style="width: 450px" />
        </div>
        <div class="details col-md-7 mb-5 mb-md-0 text-center text-md-start">
          <h6 class="fw-bold text-uppercase small" style="color: var(--main-color)">who we are</h6>
          <h2>A little about us</h2>
          <p class="text-muted">
            We started NovaStore with a simple goal: to make online shopping <br />
            easy, secure, and enjoyable for everyone.
          </p>
          <p class="text-muted">
            We carefully select every product and work with trusted partners <br />
            to ensure you get the best quality at the best price.
          </p>
          <div class="boxes row">
            <div
              class="box col-lg-4 d-flex gap-3 flex-column text-center flex-md-row text-md-start"
            >
              <div
                class="icon mt-2 d-flex justify-content-center align-items-center rounded mx-auto ms-md-0 me-md-auto"
                style="
                  background-color: #ece9fb;
                  width: 40px;
                  height: 40px;
                  color: var(--main-color);
                  flex-shrink: 0;
                "
              >
                <i class="bi bi-box-seam-fill fs-4"></i>
              </div>
              <div class="text">
                <h6>Quality products</h6>
                <p class="text-muted">Carefully selected items for the best experience.</p>
              </div>
            </div>
            <div
              class="box col-lg-4 d-flex gap-3 flex-column text-center flex-md-row text-md-start"
            >
              <div
                class="icon mt-2 d-flex justify-content-center align-items-center rounded mx-auto ms-md-0 me-md-auto"
                style="
                  background-color: #ece9fb;
                  width: 40px;
                  height: 40px;
                  color: var(--main-color);
                  flex-shrink: 0;
                "
              >
                <i class="bi bi-shield-fill-check fs-4"></i>
              </div>
              <div class="text">
                <h6>Trusted & Secure</h6>
                <p class="text-muted">Your security and privacy are our top priority.</p>
              </div>
            </div>
            <div
              class="box col-lg-4 d-flex gap-3 flex-column text-center flex-md-row text-md-start"
            >
              <div
                class="icon mt-2 d-flex justify-content-center align-items-center rounded mx-auto ms-md-0 me-md-auto"
                style="
                  background-color: #ece9fb;
                  width: 40px;
                  height: 40px;
                  color: var(--main-color);
                  flex-shrink: 0;
                "
              >
                <i class="bi bi-headset fs-4"></i>
              </div>
              <div class="text">
                <h6>Always Here</h6>
                <p class="text-muted">24/7 customer support whenever you need us.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="features bg-white p-3 rounded-3 d-flex justify-content-around shadow-sm flex-column flex-md-row"
      >
        <div class="box mb-3 mb-md-0 d-flex flex-column justify-content-center align-items-center">
          <div
            class="icon rounded d-flex justify-content-center align-items-center mx-auto mb-1"
            style="width: 50px; height: 50px; background-color: #eeebfb; color: var(--main-color)"
          >
            <i class="bi bi-people-fill fs-4"></i>
          </div>
          <div class="details text-center">
            <div class="number fs-4 fw-bold">10K+</div>
            <p class="message text-muted small m-0">Happy customers</p>
          </div>
        </div>
        <div class="box mb-3 mb-md-0 d-flex flex-column justify-content-center align-items-center">
          <div
            class="icon rounded d-flex justify-content-center align-items-center mx-auto mb-1"
            style="width: 50px; height: 50px; background-color: #eeebfb; color: var(--main-color)"
          >
            <i class="bi bi-box-fill fs-4"></i>
          </div>
          <div class="details text-center">
            <div class="number fs-4 fw-bold">{{ countProducts }}+</div>
            <p class="message text-muted small m-0">Products</p>
          </div>
        </div>
        <div class="box mb-3 mb-md-0 d-flex flex-column justify-content-center align-items-center">
          <div
            class="icon rounded d-flex justify-content-center align-items-center mx-auto mb-1"
            style="width: 50px; height: 50px; background-color: #eeebfb; color: var(--main-color)"
          >
            <i class="bi bi-emoji-smile-fill fs-4"></i>
          </div>
          <div class="details text-center">
            <div class="number fs-4 fw-bold">99%</div>
            <p class="message text-muted small m-0">Satisfaction</p>
          </div>
        </div>
        <div class="box mb-3 mb-md-0 d-flex flex-column justify-content-center align-items-center">
          <div
            class="icon rounded d-flex justify-content-center align-items-center mx-auto mb-1"
            style="width: 50px; height: 50px; background-color: #eeebfb; color: var(--main-color)"
          >
            <i class="bi bi-headset fs-4"></i>
          </div>
          <div class="details text-center">
            <div class="number fs-4 fw-bold">24/7</div>
            <p class="message text-muted small m-0">Support</p>
          </div>
        </div>
      </div>
      <div
        class="missionSection p-3 d-flex align-items-center justify-content-around rounded-3 my-3 flex-column flex-md-row"
        style="background-color: #f2f0fd"
      >
        <div class="image mb-3 mb-md-0">
          <img :src="arrow" alt="Arrow" class="img-fluid" style="width: 170px" />
        </div>
        <div class="details text-center text-md-start">
          <h6 class="text-uppercase fw-bold small" style="color: var(--main-color)">Our Mission</h6>
          <h2>Our mission is simple</h2>
          <p class="text-muted">
            To provide a seamless shopping experience through quality products, <br />
            fair prices, fast delivery, and excellent customer service.
          </p>
        </div>
      </div>
      <div class="valuesSection text-center">
        <h6 class="text-uppercase fw-bold" style="color: var(--main-color)">Our values</h6>
        <h3 class="fw-bold">What we believe in</h3>
        <div class="boxes row mt-4">
          <div class="col-md-3">
            <div class="box bg-white p-2 border rounded mb-3 mb-md-0">
              <div
                class="icon d-flex justify-content-center align-items-center rounded-pill mx-auto mb-1"
                style="width: 50px; height: 50px; background-color: #f1effc"
              >
                <i
                  class="bi bi-heart-fill fs-4"
                  style="color: var(--main-color); font-weight: bold"
                ></i>
              </div>
              <div class="details">
                <h6>Customer first</h6>
                <p class="small text-muted">
                  We put our customers first <br />
                  in everything we do.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="box bg-white p-2 border rounded mb-3 mb-md-0">
              <div
                class="icon d-flex justify-content-center align-items-center rounded-pill mx-auto mb-1"
                style="width: 50px; height: 50px; background-color: #f1effc"
              >
                <i
                  class="bi bi-award-fill fs-4"
                  style="color: var(--main-color); font-weight: bold"
                ></i>
              </div>
              <div class="details">
                <h6>Quality</h6>
                <p class="small text-muted">
                  We never compromise on <br />
                  the quality of our products.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="box bg-white p-2 border rounded mb-3 mb-md-0">
              <div
                class="icon d-flex justify-content-center align-items-center rounded-pill mx-auto mb-1"
                style="width: 50px; height: 50px; background-color: #f1effc"
              >
                <i
                  class="bi bi-tag-fill fs-4"
                  style="color: var(--main-color); font-weight: bold"
                ></i>
              </div>
              <div class="details">
                <h6>Honesty</h6>
                <p class="small text-muted">
                  We believe in transparent <br />
                  and honest business.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="box bg-white p-2 border rounded mb-3 mb-md-0">
              <div
                class="icon d-flex justify-content-center align-items-center rounded-pill mx-auto mb-1"
                style="width: 50px; height: 50px; background-color: #f1effc"
              >
                <i
                  class="bi bi-tree-fill fs-4"
                  style="color: var(--main-color); font-weight: bold"
                ></i>
              </div>
              <div class="details">
                <h6>Growth</h6>
                <p class="small text-muted">
                  We continuously improve <br />
                  to serve you better.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="CTASection py-3 px-5 d-flex align-items-center justify-content-between gap-3 rounded-3 mt-4 flex-column flex-md-row"
        style="background-color: #f2effc"
      >
        <div class="image">
          <img :src="cartAbout" alt="Cart" class="img-fluid" style="width: 130px" />
        </div>
        <div class="details flex-grow-1 ms-0 ms-md-5 text-center text-md-start">
          <h4>Let's start something great together</h4>
          <p class="text-muted">Thank you for being a part of NovaStore. Happy shopping!</p>
        </div>
        <div class="button">
          <router-link :to="{ name: 'products' }" class="btn btn-mainColor"
            ><span>Browse Products <i class="bi bi-arrow-right"></i></span
          ></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useProductsStore } from "@/stores/products";

import heroAbout from "@/assets/images/heroAbout.png";
import laptop from "@/assets/images/laptop.png";
import arrow from "@/assets/images/arrow.png";
import cartAbout from "@/assets/images/cartAbout.png";

const productStore = useProductsStore();

// Computed to calculate the count of products
const countProducts = computed(() => {
  return productStore.products.length;
});

onMounted(async () => {
  await productStore.getProducts();
});
</script>

<style lang="scss" scoped>
.btn-mainColor {
  background-color: #5138d6;
  color: white;
  &:focus,
  &:hover {
    background-color: #644fe5;
    color: white;
  }
}
.box:not(:last-of-type) {
  @media (max-width: 767px) {
    border-bottom: 2px solid #dee2e6;
    margin-bottom: 15px;
    padding-bottom: 15px;
  }
}

.valuesSection {
  .box {
    transition: 0.3s;
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0px 2px 6px 0 #5038d651;
    }
  }
}
</style>
