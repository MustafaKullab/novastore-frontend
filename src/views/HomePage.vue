<template>
  <div class="HomePage">
    <div class="heroSection">
      <div class="container">
        <section class="row justify-content-between align-items-center">
          <div class="details col-md-6">
            <div class="title">
              <h1 class="display-5 fw-bold m-0">
                Discover Your Next <br />
                Favorite <span class="mainColor">Product</span>
              </h1>
              <p class="my-2 text-muted">
                Find top-quality products at the best prices. <br />
                Shop from a wide range of categories and <br />
                enjoy fast delivery.
              </p>
            </div>
            <div class="links my-3 d-flex align-items-center gap-4">
              <div class="shopNow">
                <router-link
                  :to="{ name: 'products' }"
                  class="btn d-flex justify-content-between align-items-center gap-3 btn-mainColor"
                  >Shop now <i class="bi bi-arrow-right text-muted mt-1"></i
                ></router-link>
              </div>
              <div class="browseCategories">
                <router-link :to="{ name: 'categories' }" class="btn btn-outline-mainColor"
                  >Browse Categories</router-link
                >
              </div>
            </div>
          </div>
          <div class="image col-md-6">
            <img :src="hero" alt="Hero image" class="img-fluid" />
          </div>
        </section>
      </div>
    </div>
    <!-- Category section  -->
    <div class="py-5">
      <CategoriesSection />
    </div>
    <!-- Products section  -->
    <section style="padding: 0">
      <ProductsSection />
    </section>
    <!-- FeaturedCollection section  -->
    <section>
      <FeaturedCollection />
    </section>
    <!-- Why Choose Us section  -->
    <section>
      <WhyChooseUs />
    </section>
  </div>
</template>

<script setup>
import hero from "@/assets/images/hero.png";
import CategoriesSection from "@/components/CategoriesSection.vue";
import ProductsSection from "@/components/ProductsSection.vue";
import FeaturedCollection from "@/components/FeaturedCollection.vue";
import WhyChooseUs from "@/components/WhyChooseUs.vue";
</script>

<style lang="scss" scoped>
// Hero Section
.heroSection {
  background-color: var(--background-section);
  @media (max-width: 767px) {
    .details {
      margin-bottom: 60px;
      text-align: center;
      .links {
        justify-content: center;
      }
    }
  }
  .mainColor {
    color: var(--main-color);
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

  .btn-outline-mainColor {
    border: 2px solid var(--main-color) !important;
    color: var(--main-color);
    &:hover {
      background-color: #644fe5;
      color: white;
    }
  }
  .bi-arrow-right {
    color: white !important;
  }
}
// Hero Section
</style>
