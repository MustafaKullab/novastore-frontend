<template>
  <div class="CheckOut py-4" style="background-color: var(--background-section)">
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link :to="{ name: 'homePage' }" class="text-decoration-none">Home</router-link>
          </li>
          <li class="breadcrumb-item" aria-current="page">
            <router-link :to="{ name: 'cart' }" class="text-decoration-none"> Cart </router-link>
          </li>
          <li class="breadcrumb-item" aria-current="page">
            <router-link
              :to="{
                name: 'checkout',
              }"
              class="text-decoration-none"
              style="color: #9ca4b1"
            >
              Checkout
            </router-link>
          </li>
        </ol>
      </nav>
      <div class="header">
        <div class="title"><h1>Checkout</h1></div>
        <p class="m-0 text-muted">Complete your order by providing your details.</p>
      </div>
      <div class="row py-5">
        <div class="col-md-7">
          <div class="details p-3 bg-white rounded border mb-3 mb-md-0">
            <div class="contactInformation my-3 py-3 border-bottom">
              <div class="title"><h2>Contact Information</h2></div>
              <form class="d-flex justify-content-between align-items-center gap-2">
                <div class="fullName">
                  <label for="name" class="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="form-control"
                    placeholder="Enter your full name"
                    required
                    v-model="form.fullName"
                  />
                </div>
                <div class="email">
                  <label for="email" class="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="form-control"
                    placeholder="Enter your email"
                    required
                    v-model="form.email"
                  />
                </div>
                <div class="phone">
                  <label for="phone" class="form-label">Phone</label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    class="form-control"
                    placeholder="Enter your phone"
                    required
                    v-model="form.phone"
                  />
                </div>
              </form>
            </div>
            <div class="shippingAddress">
              <div class="title"><h2>Shipping Address</h2></div>
              <form class="my-3">
                <div class="country">
                  <label for="country" class="form-label">Country</label>
                  <select
                    class="form-select"
                    id="country"
                    aria-label="Default select example"
                    required
                    v-model="form.country"
                  >
                    <option selected value="default" disabled>Select your country</option>
                    <option
                      v-for="country of worldCountries"
                      :key="country.code"
                      :value="country.code"
                    >
                      {{ country.name }}
                    </option>
                  </select>
                </div>
                <div class="cityAndState my-3 d-flex align-items-center justify-content-between">
                  <div class="city" style="width: 49%">
                    <label for="city" class="form-label">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="Enter your city"
                      class="form-control"
                      required
                      v-model="form.city"
                    />
                  </div>
                  <div class="state" style="width: 49%">
                    <label for="state" class="form-label">State / Province</label>
                    <input
                      type="text"
                      class="form-control"
                      id="state"
                      name="state"
                      placeholder="Enter your state"
                      required
                      v-model="form.state"
                    />
                  </div>
                </div>
                <div class="streetAddress">
                  <label for="street" class="form-label">Street Address</label>
                  <input
                    type="text"
                    class="form-control"
                    id="street"
                    name="street"
                    placeholder="Enter your street address"
                    required
                    v-model="form.street"
                  />
                </div>
                <div class="apartment my-3">
                  <label for="apartment" class="form-label"
                    >Apartment, suite, etc. (optional)</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="apartment"
                    name="apartment"
                    placeholder="Apartment, suite, building, etc."
                    v-model="form.apartment"
                  />
                </div>
                <div class="form-check saveInfo">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkDefault"
                    style="box-shadow: none"
                  />
                  <label class="form-check-label" for="checkDefault"
                    >Save this information for next time</label
                  >
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="orderSummary p-3 bg-white rounded border">
            <div class="header">
              <h2 class="title">Order Summary</h2>
              <p class="m-0 text-muted">{{ productStore.cart.items.length }} Items</p>
            </div>
            <div class="items my-4" style="height: 268px; overflow: auto">
              <div class="text-center" v-if="productStore.cart.items.length === 0">
                <div class="icon"><i class="bi bi-emoji-frown fs-1 text-danger"></i></div>
                <div class="message">
                  <h3>Your cart is currently empty. Start exploring our latest products!</h3>
                </div>
                <div class="btn">
                  <router-link
                    :to="{ name: 'products' }"
                    class="btn btn-mainColor d-flex align-items-center gap-2"
                    ><span>Start Shopping</span>
                    <div class="icon" style="margin-top: 6px">
                      <i class="bi bi-arrow-right"></i>
                    </div>
                  </router-link>
                </div>
              </div>
              <div
                class="item d-flex align-items-center justify-content-between gap-3 pb-3 mb-3 border-bottom px-2 flex-column flex-lg-row text-center text-lg-start"
                v-for="item of productStore.cart.items"
                :key="item.productId._id"
              >
                <div class="image" style="width: 100px; height: 100px; flex-shrink: 0">
                  <img
                    :src="`${apiUrl}/${item.productId.image}`"
                    class="img-fluid rounded"
                    style="width: 100%; height: 100%"
                    :alt="item.productId.name"
                  />
                </div>
                <div class="details flex-grow-1">
                  <div
                    class="name"
                    style="
                      width: 160px;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    "
                  >
                    {{ item.productId.name }}
                  </div>
                  <div class="quantity fw-bold">Qty: {{ item.quantity }}</div>
                </div>
                <div class="totalPrice fw-bold">
                  ${{ (item.quantity * item.productId.price).toFixed(2) }}
                </div>
              </div>
            </div>
            <div class="subtotalAndShipping pb-3 mb-3 border-bottom">
              <div class="subtotal mb-2 d-flex align-items-center justify-content-between">
                <span>Subtotal</span>
                <span>${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="shipping d-flex align-items-center justify-content-between">
                <span>Shipping</span>
                <span class="text-success">Free</span>
              </div>
            </div>
            <div class="total d-flex align-items-center justify-content-between">
              <h4>Total</h4>
              <div class="totalPrice fs-4 fw-bold">${{ subtotal.toFixed(2) }}</div>
            </div>
            <div class="btnConfOrder w-100 py-3 my-2">
              <button class="btn btn-mainColor w-100" @click="placeOrder">
                <i class="bi bi-lock"></i> Place Order
              </button>
            </div>
            <div class="secureMessage small text-muted text-center">
              <i class="bi bi-shield-check"></i> Secure checkout. Your data is protected.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductsStore } from "@/stores/products";
import { computed, onMounted, ref } from "vue";
import { fetchWithRefresh } from "../../public/fetchWithRefresh";
import { useRouter } from "vue-router";
const productStore = useProductsStore();

const worldCountries = [
  { name: "Afghanistan", code: "AF" },
  { name: "Albania", code: "AL" },
  { name: "Algeria", code: "DZ" },
  { name: "Andorra", code: "AD" },
  { name: "Angola", code: "AO" },
  { name: "Antigua and Barbuda", code: "AG" },
  { name: "Argentina", code: "AR" },
  { name: "Armenia", code: "AM" },
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Azerbaijan", code: "AZ" },
  { name: "Bahamas", code: "BS" },
  { name: "Bahrain", code: "BH" },
  { name: "Bangladesh", code: "BD" },
  { name: "Barbados", code: "BB" },
  { name: "Belarus", code: "BY" },
  { name: "Belgium", code: "BE" },
  { name: "Belize", code: "BZ" },
  { name: "Benin", code: "BJ" },
  { name: "Bhutan", code: "BT" },
  { name: "Bolivia", code: "BO" },
  { name: "Bosnia and Herzegovina", code: "BA" },
  { name: "Botswana", code: "BW" },
  { name: "Brazil", code: "BR" },
  { name: "Brunei", code: "BN" },
  { name: "Bulgaria", code: "BG" },
  { name: "Burkina Faso", code: "BF" },
  { name: "Burundi", code: "BI" },
  { name: "Cabo Verde", code: "CV" },
  { name: "Cambodia", code: "KH" },
  { name: "Cameroon", code: "CM" },
  { name: "Canada", code: "CA" },
  { name: "Central African Republic", code: "CF" },
  { name: "Chad", code: "TD" },
  { name: "Chile", code: "CL" },
  { name: "China", code: "CN" },
  { name: "Colombia", code: "CO" },
  { name: "Comoros", code: "KM" },
  { name: "Congo (Brazzaville)", code: "CG" },
  { name: "Congo (Kinshasa)", code: "CD" },
  { name: "Costa Rica", code: "CR" },
  { name: "Croatia", code: "HR" },
  { name: "Cuba", code: "CU" },
  { name: "Cyprus", code: "CY" },
  { name: "Czechia", code: "CZ" },
  { name: "Denmark", code: "DK" },
  { name: "Djibouti", code: "DJ" },
  { name: "Dominica", code: "DM" },
  { name: "Dominican Republic", code: "DO" },
  { name: "Ecuador", code: "EC" },
  { name: "Egypt", code: "EG" },
  { name: "El Salvador", code: "SV" },
  { name: "Equatorial Guinea", code: "GQ" },
  { name: "Eritrea", code: "ER" },
  { name: "Estonia", code: "EE" },
  { name: "Eswatini", code: "SZ" },
  { name: "Ethiopia", code: "ET" },
  { name: "Fiji", code: "FJ" },
  { name: "Finland", code: "FI" },
  { name: "France", code: "FR" },
  { name: "Gabon", code: "GA" },
  { name: "Gambia", code: "GM" },
  { name: "Georgia", code: "GE" },
  { name: "Germany", code: "DE" },
  { name: "Ghana", code: "GH" },
  { name: "Greece", code: "GR" },
  { name: "Grenada", code: "GD" },
  { name: "Guatemala", code: "GT" },
  { name: "Guinea", code: "GN" },
  { name: "Guinea-Bissau", code: "GW" },
  { name: "Guyana", code: "GY" },
  { name: "Haiti", code: "HT" },
  { name: "Honduras", code: "HN" },
  { name: "Hungary", code: "HU" },
  { name: "Iceland", code: "IS" },
  { name: "India", code: "IN" },
  { name: "Indonesia", code: "ID" },
  { name: "Iran", code: "IR" },
  { name: "Iraq", code: "IQ" },
  { name: "Ireland", code: "IE" },
  { name: "Italy", code: "IT" },
  { name: "Ivory Coast", code: "CI" },
  { name: "Jamaica", code: "JM" },
  { name: "Japan", code: "JP" },
  { name: "Jordan", code: "JO" },
  { name: "Kazakhstan", code: "KZ" },
  { name: "Kenya", code: "KE" },
  { name: "Kiribati", code: "KI" },
  { name: "Kuwait", code: "KW" },
  { name: "Kyrgyzstan", code: "KG" },
  { name: "Laos", code: "LA" },
  { name: "Latvia", code: "LV" },
  { name: "Lebanon", code: "LB" },
  { name: "Lesotho", code: "LS" },
  { name: "Liberia", code: "LR" },
  { name: "Libya", code: "LY" },
  { name: "Liechtenstein", code: "LI" },
  { name: "Lithuania", code: "LT" },
  { name: "Luxembourg", code: "LU" },
  { name: "Madagascar", code: "MG" },
  { name: "Malawi", code: "MW" },
  { name: "Malaysia", code: "MY" },
  { name: "Maldives", code: "MV" },
  { name: "Mali", code: "ML" },
  { name: "Malta", code: "MT" },
  { name: "Marshall Islands", code: "MH" },
  { name: "Mauritania", code: "MR" },
  { name: "Mauritius", code: "MU" },
  { name: "Mexico", code: "MX" },
  { name: "Micronesia", code: "FM" },
  { name: "Moldova", code: "MD" },
  { name: "Monaco", code: "MC" },
  { name: "Mongolia", code: "MN" },
  { name: "Montenegro", code: "ME" },
  { name: "Morocco", code: "MA" },
  { name: "Mozambique", code: "MZ" },
  { name: "Myanmar", code: "MM" },
  { name: "Namibia", code: "NA" },
  { name: "Nauru", code: "NR" },
  { name: "Nepal", code: "NP" },
  { name: "Netherlands", code: "NL" },
  { name: "New Zealand", code: "NZ" },
  { name: "Nicaragua", code: "NI" },
  { name: "Niger", code: "NE" },
  { name: "Nigeria", code: "NG" },
  { name: "North Korea", code: "KP" },
  { name: "North Macedonia", code: "MK" },
  { name: "Norway", code: "NO" },
  { name: "Oman", code: "OM" },
  { name: "Pakistan", code: "PK" },
  { name: "Palau", code: "PW" },
  { name: "Palestine", code: "PS" },
  { name: "Panama", code: "PA" },
  { name: "Papua New Guinea", code: "PG" },
  { name: "Paraguay", code: "PY" },
  { name: "Peru", code: "PE" },
  { name: "Philippines", code: "PH" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Qatar", code: "QA" },
  { name: "Romania", code: "RO" },
  { name: "Russia", code: "RU" },
  { name: "Rwanda", code: "RW" },
  { name: "Saint Kitts and Nevis", code: "KN" },
  { name: "Saint Lucia", code: "LC" },
  { name: "Saint Vincent and the Grenadines", code: "VC" },
  { name: "Samoa", code: "WS" },
  { name: "San Marino", code: "SM" },
  { name: "Sao Tome and Principe", code: "ST" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Senegal", code: "SN" },
  { name: "Serbia", code: "RS" },
  { name: "Seychelles", code: "SC" },
  { name: "Sierra Leone", code: "SL" },
  { name: "Singapore", code: "SG" },
  { name: "Slovakia", code: "SK" },
  { name: "Slovenia", code: "SI" },
  { name: "Solomon Islands", code: "SB" },
  { name: "Somalia", code: "SO" },
  { name: "South Africa", code: "ZA" },
  { name: "South Korea", code: "KR" },
  { name: "South Sudan", code: "SS" },
  { name: "Spain", code: "ES" },
  { name: "Sri Lanka", code: "LK" },
  { name: "Sudan", code: "SD" },
  { name: "Suriname", code: "SR" },
  { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" },
  { name: "Syria", code: "SY" },
  { name: "Tajikistan", code: "TJ" },
  { name: "Tanzania", code: "TZ" },
  { name: "Thailand", code: "TH" },
  { name: "Timor-Leste", code: "TL" },
  { name: "Togo", code: "TG" },
  { name: "Tonga", code: "TO" },
  { name: "Trinidad and Tobago", code: "TT" },
  { name: "Tunisia", code: "TN" },
  { name: "Turkey", code: "TR" },
  { name: "Turkmenistan", code: "TM" },
  { name: "Tuvalu", code: "TV" },
  { name: "Uganda", code: "UG" },
  { name: "Ukraine", code: "UA" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "Uruguay", code: "UY" },
  { name: "Uzbekistan", code: "UZ" },
  { name: "Vanuatu", code: "VU" },
  { name: "Vatican City", code: "VA" },
  { name: "Venezuela", code: "VE" },
  { name: "Vietnam", code: "VN" },
  { name: "Yemen", code: "YE" },
  { name: "Zambia", code: "ZM" },
  { name: "Zimbabwe", code: "ZW" },
];

const form = ref({
  fullName: "",
  email: "",
  phone: "",
  country: "default",
  city: "",
  state: "",
  street: "",
  apartment: "",
});

const router = useRouter();

// Function to calculate the subtotal of order
const subtotal = computed(() => {
  return productStore.cart.items.reduce(
    (acc, item) => acc + item.quantity * item.productId.price,
    0,
  );
});

// Function to send message
const sendMessage = async (orderId) => {
  const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/successOrderMessage`, {
    method: "POST",
    body: JSON.stringify({ orderId: orderId }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const data = await response.json();

  console.log(data);
};

// Function to place the order
const placeOrder = async () => {
  if (
    !form.value.fullName ||
    !form.value.email ||
    !form.value.phone ||
    !form.value.country ||
    !form.value.city ||
    !form.value.state ||
    !form.value.street
  ) {
    alert("Please fill in all required fields.");
    return;
  }
  const response = await fetchWithRefresh(`${import.meta.env.VITE_API_URL}/confOrder`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (data.success) {
    router.push({ name: "orderSuccess", params: { order_id: data.order._id } });
    sendMessage(data.order._id);
    await productStore.getCart();
    await productStore.getProducts();
  } else {
    return;
  }
};

const apiUrl = import.meta.env.VITE_API_URL;

onMounted(async () => {
  await productStore.getCart();
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

.details {
  .name {
    @media (max-width: 767px) {
      white-space: normal !important;
      width: 100% !important;
    }
  }
}
</style>
