<template>
  <div class="WhyUs">
    <div class="container">
      <div class="boxes row align-items-start flex-column flex-lg-row">
        <div class="col-lg-3 mb-3 mb-lg-0">
          <div class="box d-flex gap-2 p-3 rounded">
            <div
              class="icon p-2 rounded-pill"
              style="
                width: 60px;
                height: 60px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-shrink: 0;
                background-color: #ebe8fc;
              "
            >
              <i class="bi bi-truck fs-2" style="color: #6246e3"></i>
            </div>
            <div class="details">
              <h5 class="mb-1">Fast Delivery</h5>
              <p class="text-muted">Quick and reliable delivery for your orders.</p>
            </div>
          </div>
        </div>
        <div class="col-lg-3 mb-3 mb-lg-0">
          <div class="box d-flex gap-2 p-3 rounded">
            <div
              class="icon p-2 rounded-pill"
              style="
                width: 60px;
                height: 60px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-shrink: 0;
                background-color: #e5f3e5;
              "
            >
              <i class="bi bi-shield-check fs-2" style="color: #4fb750"></i>
            </div>
            <div class="details">
              <h5 class="mb-1">Secure Shopping</h5>
              <p class="text-muted">Your account and information are protected.</p>
            </div>
          </div>
        </div>
        <div class="col-lg-3 mb-3 mb-lg-0">
          <div class="box d-flex gap-2 p-3 rounded">
            <div
              class="icon p-2 rounded-pill"
              style="
                width: 60px;
                height: 60px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-shrink: 0;
                background-color: #fcf0e8;
              "
            >
              <i class="bi bi-award fs-2" style="color: #fd9629"></i>
            </div>
            <div class="details">
              <h5 class="mb-1">Quality Products</h5>
              <p class="text-muted">Carefully selected products with trusted quality.</p>
            </div>
          </div>
        </div>
        <div class="col-lg-3 mb-3 mb-lg-0">
          <div class="box d-flex gap-2 p-3 rounded">
            <div
              class="icon p-2 rounded-pill"
              style="
                width: 60px;
                height: 60px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-shrink: 0;
                background-color: #e8f0fc;
              "
            >
              <i class="bi bi-headset fs-2" style="color: #375cf2"></i>
            </div>
            <div class="details">
              <h5 class="mb-1">Customer Support</h5>
              <p class="text-muted">Friendly support whenever you need assistance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.boxes {
  .box {
    background-color: #f6f5fa;
    .icon {
      background-color: #e9e7fc;
    }
    @media (max-width: 767px) {
      margin-bottom: 20px;
    }
  }
}
</style>
