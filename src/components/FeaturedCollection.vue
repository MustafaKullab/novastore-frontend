<template>
  <div class="container">
    <div class="FeaturedCollection p-4 rounded row align-items-center">
      <div class="details text-light col-md-8">
        <h2>Featured Collection</h2>
        <p>Discover quality products carefully selected to match your everyday lifestyle.</p>
        <router-link
          :to="{ name: 'products' }"
          class="btn btn-light"
          style="color: var(--main-color)"
          >Explore Collection <i class="bi bi-arrow-right"></i
        ></router-link>
      </div>
      <div class="image col-md-4">
        <img :src="featuredCollection" class="img-fluid" alt="FeaturedCollection" />
      </div>
    </div>
  </div>
</template>

<script setup>
import featuredCollection from "@/assets/images/Featured Collection.png";
</script>

<style lang="scss" scoped>
.FeaturedCollection {
  background: linear-gradient(to right, #544d97, #6c5fb2, #a291da);
  @media (max-width: 767px) {
    .details {
      margin-bottom: 20px;
    }
  }
}
</style>
