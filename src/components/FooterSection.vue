<template>
  <section class="FooterSection" style="background-color: #0f1b2e; overflow: hidden">
    <div class="container">
      <div class="row">
        <div class="detailsStore col-lg-3 text-light d-flex flex-column justify-content-between">
          <div class="detailsAndLinks mb-4">
            <div class="logo">
              <img :src="logo" alt="Logo" class="img-fluid" style="width: 120px" />
            </div>
            <p class="m-0 my-2" style="color: #9fa4ae; line-height: 1.2">
              Your one-stop shop for top-quality <br />products at the best prices.
            </p>
            <div class="links mt-4 d-flex gap-2 align-items-center">
              <a
                class="facebook d-flex justify-content-center align-items-center p-2 rounded-pill"
                style="
                  color: #d7d6dc;
                  flex-shrink: 1;
                  width: 40px;
                  height: 40px;
                  border: 2px solid #252f41;
                "
                target="_blank"
                href="http://facebook.com"
                ><i class="bi bi-facebook"></i
              ></a>
              <a
                class="twitter d-flex justify-content-center align-items-center p-2 rounded-pill"
                style="
                  color: #d7d6dc;
                  flex-shrink: 1;
                  width: 40px;
                  height: 40px;
                  border: 2px solid #252f41;
                "
                target="_blank"
                href="http://x.com"
                ><i class="bi bi-twitter-x"></i
              ></a>
              <a
                class="insta d-flex justify-content-center align-items-center p-2 rounded-pill"
                style="
                  color: #d7d6dc;
                  flex-shrink: 1;
                  width: 40px;
                  height: 40px;
                  border: 2px solid #252f41;
                "
                target="_blank"
                href="https://www.instagram.com/l2rw4/"
                ><i class="bi bi-instagram"></i
              ></a>
              <a
                class="linkedIn d-flex justify-content-center align-items-center p-2 rounded-pill"
                style="
                  color: #d7d6dc;
                  flex-shrink: 1;
                  width: 40px;
                  height: 40px;
                  border: 2px solid #252f41;
                "
                target="_blank"
                href="https://www.linkedin.com/in/mustafa-kullab-aa6a153bb/"
                ><i class="bi bi-linkedin"></i
              ></a>
            </div>
          </div>
          <div class="date text-light">
            &copy; {{ new Date().getFullYear() }} NovaStore, All rights reserved.
          </div>
        </div>
        <div class="quickLinks col-lg-2">
          <h5 class="text-light">Quick Links</h5>
          <ul class="list-unstyled">
            <li>
              <router-link
                :to="{ name: 'homePage' }"
                class="text-decoration-none"
                style="color: #9fa4ae"
                >Home</router-link
              >
            </li>
            <li>
              <router-link
                :to="{ name: 'products' }"
                class="text-decoration-none"
                style="color: #9fa4ae"
                >Products</router-link
              >
            </li>
            <li>
              <router-link
                :to="{ name: 'categories' }"
                class="text-decoration-none"
                style="color: #9fa4ae"
                >Categories</router-link
              >
            </li>
            <li>
              <router-link
                :to="{ name: 'about' }"
                class="text-decoration-none"
                style="color: #9fa4ae"
                >About Us</router-link
              >
            </li>
          </ul>
        </div>
        <div class="categories col-lg-2">
          <h5 class="text-light">Categories</h5>
          <ul class="list-unstyled">
            <li
              v-for="category of categories"
              :key="category"
              style="color: #9fa4ae; cursor: pointer"
              @click="selectCategoryAndScroll(category)"
            >
              {{ category }}
            </li>
          </ul>
        </div>
        <div class="WhyUs col-lg-2">
          <h5 class="text-light">Why Shop With Us</h5>
          <ul class="whyUsList list-unstyled" style="color: #9fa4ae">
            <li><i class="bi bi-check"></i> Secure Shopping</li>
            <li><i class="bi bi-check"></i> Fast Delivery</li>
            <li><i class="bi bi-check"></i> Quality Products</li>
            <li><i class="bi bi-check"></i> Easy Returns</li>
          </ul>
        </div>
        <div class="Contact col-lg-3">
          <h5 class="text-light">Contact</h5>
          <ul class="contactList list-unstyled" style="color: #9fa4ae">
            <li class="d-flex align-items-center gap-2">
              <i class="bi bi-envelope-at-fill"></i> momoana013@gmail.com
            </li>
            <li class="d-flex align-items-center gap-2">
              <i class="bi-telephone-fill"></i> +970 59 711 6801
            </li>
            <li class="d-flex align-items-center gap-2">
              <i class="bi bi-geo-alt-fill"></i> Gaza, Palestine
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import logo from "@/assets/images/logoDark.png";
import { useCategoryStore } from "@/stores/category";

const categoryStore = useCategoryStore();

// Categories array
const categories = ref(["Electronics", "Living", "Fashion", "Books", "Personal Care", "Sports"]);

// Function
const selectCategoryAndScroll = (category) => {
  categoryStore.setCategory(category);
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
};
</script>

<style lang="scss" scoped>
.FooterSection {
  @media (max-width: 991px) {
    text-align: center;
    .detailsStore,
    .quickLinks,
    .categories,
    .WhyUs {
      margin-bottom: 30px;
    }
    .links {
      justify-content: center;
    }
    ul {
      width: fit-content;
      margin: auto;
      text-align: center;
      li {
        margin: auto;
        justify-content: center;
      }
    }
  }

  .links {
    a {
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        background-color: #252f41;
        color: white;
        transform: translate(-1px, 1px);
      }
    }
  }

  ul:not(.whyUsList, .contactList) {
    li {
      transition: 0.3s;
      width: fit-content;
      &:hover {
        color: white !important;
        transform: translate(2px);
      }
      a {
        transition: 0.3s;
        &:hover {
          color: white !important;
        }
      }
    }
  }
}
</style>
