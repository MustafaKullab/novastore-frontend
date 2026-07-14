<template>
  <NavBar v-if="!route.meta.hiddenNavbar" />
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <FooterSection v-if="!route.meta.hiddenNavbar" />
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
import FooterSection from "./components/FooterSection.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<style lang="scss" scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.5s ease;
}
</style>
