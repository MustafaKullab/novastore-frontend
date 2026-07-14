import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/homePage",
    },

    {
      path: "/signup",
      name: "signup",
      component: () => import("@/views/SignUp.vue"),
      meta: {
        title: "Sign Up",
        hiddenNavbar: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LogIn.vue"),
      meta: {
        title: "Log In",
        hiddenNavbar: true,
      },
    },
    {
      path: "/verify",
      name: "verify",
      component: () => import("@/views/VerifyCode.vue"),
      meta: {
        title: "Verify Code",
        hiddenNavbar: true,
      },
    },
    {
      path: "/homePage",
      name: "homePage",
      component: () => import("@/views/HomePage.vue"),
      meta: {
        title: "Home Page",
      },
    },
    {
      path: "/forgotPassword",
      name: "forgotPassword",
      component: () => import("@/views/ForgotPassword.vue"),
      meta: {
        title: "Forgot Password",
        hiddenNavbar: true,
      },
    },
    {
      path: "/resetPassword",
      name: "resetPassword",
      component: () => import("@/views/ResetPassword.vue"),
      meta: {
        title: "Reset Password",
        hiddenNavbar: true,
      },
    },
    {
      path: "/products",
      name: "products",
      component: () => import("@/views/ProductsPage.vue"),
      meta: {
        title: "Products",
      },
    },
    {
      path: "/categories",
      name: "categories",
      component: () => import("@/views/CategoriesPage.vue"),
      meta: {
        title: "Categories",
      },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/AboutUs.vue"),
      meta: {
        title: "About Us",
      },
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("@/views/CartPage.vue"),
      meta: {
        title: "Cart",
      },
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () => import("@/views/CheckOut.vue"),
      meta: {
        title: "Check Out",
      },
    },
    {
      path: "/productdetail/:product_id",
      name: "productDetail",
      component: () => import("@/views/ProductDetail.vue"),
      meta: {
        title: "Product Detail",
      },
    },
    {
      path: "/orderSuccess/:order_id",
      name: "orderSuccess",
      component: () => import("@/views/OrderSuccess.vue"),
      meta: {
        title: "Order Success",
      },
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("@/views/ContactPage.vue"),
      meta: {
        title: "Contact Us",
      },
    },
    {
      path: "/myorders",
      name: "myorders",
      component: () => import("@/views/MyOrders.vue"),
      meta: {
        title: "My Orders",
      },
    },
    {
      path: "/orderDetails/:orderId",
      name: "orderDetails",
      component: () => import("@/views/OrderDetails.vue"),
      meta: {
        title: "Order Details",
      },
    },
    {
      path: "/profilePage",
      name: "profilePage",
      component: () => import("@/views/ProfilePage.vue"),
      meta: {
        title: "Profile",
      },
    },
    {
      path: "/pageNotFound",
      name: "pageNotFound",
      component: () => import("@/views/PageNotFound.vue"),
      meta: {
        title: "Page Not Found",
      },
    },
    {
      path: "/admin/dashboard",
      name: "dashboardAdmin",
      component: () => import("@/views/DashboardAdmin.vue"),
      meta: {
        title: "Dashboard - Admin",
        hiddenNavbar: true,
        requireAdmin: true,
      },
    },
    {
      path: "/admin/orderDetails/:orderId",
      name: "orderDetailsAdmin",
      component: () => import("@/views/OrderDetailsAdmin.vue"),
      meta: {
        title: "Order Details - Admin",
        hiddenNavbar: true,
        requireAdmin: true,
      },
    },
    {
      path: "/admin/products",
      name: "productsAdmin",
      component: () => import("@/views/ProductsAdmin.vue"),
      meta: {
        title: "Products - Admin",
        hiddenNavbar: true,
        requireAdmin: true,
      },
    },
    {
      path: "/admin/products/addProduct",
      name: "addProduct",
      component: () => import("@/views/AddProduct.vue"),
      meta: {
        title: "Add Product - Admin",
        hiddenNavbar: true,
        requireAdmin: true,
      },
    },
    {
      path: "/admin/products/productDetails/:productId",
      name: "productDetails",
      component: () => import("@/views/ProductDetailAdmin.vue"),
      meta: {
        title: "Product Details - Admin",
        hiddenNavbar: true,
        requireAdmin: true,
      },
    },
    {
      path: "/admin/products/editProduct/:productId",
      name: "editProduct",
      component: () => import("@/views/EditProduct.vue"),
      meta: {
        title: "Edit Product - Admin",
        hiddenNavbar: true,
        requireAdmin: true,
      },
    },
    {
      path: "/admin/categoriesAdmin",
      name: "categoriesAdmin",
      component: () => import("@/views/CategoriesAdmin.vue"),
      meta: {
        title: "Categories - Admin",
        hiddenNavbar: true,
        requireAdmin: true,
      },
    },
    {
      path: "/admin/orders",
      name: "ordersAdmin",
      component: () => import("@/views/OrdersAdmin.vue"),
      meta: {
        title: "Orders - Admin",
        hiddenNavbar: true,
        requireAdmin: true,
      },
    },
    {
      path: "/admin/users",
      name: "usersAdmin",
      component: () => import("@/views/UsersAdmin.vue"),
      meta: {
        title: "Users - Admin",
        hiddenNavbar: true,
        requireAdmin: true,
      },
    },
    {
      path: "/admin/messages",
      name: "messagesAdmin",
      component: () => import("@/views/MessagesAdmin.vue"),
      meta: {
        title: "Messages - Admin",
        hiddenNavbar: true,
        requireAdmin: true,
      },
    },
    {
      path: "/admin/message/:messageId",
      name: "messageDetails",
      component: () => import("@/views/MessageDetails.vue"),
      meta: {
        title: "Message Details - Admin",
        hiddenNavbar: true,
        requireAdmin: true,
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/views/PageNotFound.vue"),
      meta: {
        title: "Page Not Found",
      },
    },
  ],
});

router.beforeEach(async (to) => {
  document.title = to.meta.title;
});

router.afterEach(() => {
  scrollTo({ top: 0, left: 0, behavior: "smooth" });
});

export default router;
