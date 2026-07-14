<template>
  <div class="PageNotFound py-5" style="background-color: var(--background-section)">
    <div class="container">
      <div class="image text-center">
        <img
          src="@/assets/images/pageNotFound.png"
          class="img-fluid"
          style="width: 500px"
          alt="Page Not Found"
        />
      </div>
      <div class="details py-5 text-center">
        <h1>Oops! Page Not Found</h1>
        <p class="text-muted">
          The page you're looking for doesn't exist or may have been moved <br />
          Let's help you get back on track.
        </p>
        <div class="actions d-flex gap-2 justify-content-center align-items-center">
          <div class="backToHome">
            <router-link :to="{ name: 'homePage' }" class="btn btn-mainColor"
              >Back To Home</router-link
            >
          </div>
          <div class="backToHome">
            <router-link :to="{ name: 'products' }" class="btn btn-outline-mainColor"
              >Browse Products</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
</style>
