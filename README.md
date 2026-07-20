# NovaStore — Frontend

Customer-facing storefront and admin dashboard for **NovaStore**, a full-stack e-commerce platform. Built with Vue 3, Vite, and Pinia, consuming the [NovaStore backend API](https://github.com/MustafaKullab/novastore-backend).

> 🚀 **Live Demo:** [Deploy on Vercel](https://novastore-frontend-5rvfxtzyd-mustafa-kullabs-projects.vercel.app/)  
> 🔗 Backend repository: [novastore-backend](https://github.com/MustafaKullab/novastore-backend)

---

## Features

**Storefront**
- Browse products by category, view product details, search & filter
- Shopping cart and checkout flow
- User authentication — sign up, log in, email verification, password reset
- Order history and order detail tracking
- User profile management
- Contact page for customer inquiries

**Admin Dashboard**
- Overview dashboard with key store metrics
- Product management — add, edit, delete, image upload
- Category management
- Order management — view all orders, update order status
- User management
- Customer message inbox with reply functionality

## Tech Stack

| Layer            | Technology                     |
|-------------------|---------------------------------|
| Framework         | Vue 3 (Composition/Options API) |
| Build Tool        | Vite                             |
| State Management  | Pinia                             |
| Routing           | Vue Router                         |
| Styling           | Bootstrap 5 + Bootstrap Icons        |
| Notifications     | vue3-toastify                          |
| Linting/Formatting| ESLint, oxlint, oxfmt                    |

## Project Structure

```
frontend store/
├── src/
│   ├── assets/          # Images and static assets
│   ├── components/      # Reusable UI components (NavBar, Footer, ProductsSection, etc.)
│   ├── views/            # Page-level components (customer pages + admin pages)
│   ├── stores/            # Pinia stores (user, products, category)
│   ├── router/             # Vue Router configuration
│   └── App.vue               # Root component
├── public/                       # Static public assets
├── index.html                     # App entry HTML
└── vite.config.js                   # Vite configuration
```

## Getting Started

### Prerequisites
- Node.js `^22.18.0` or `>=24.12.0`
- The [NovaStore backend](https://github.com/MustafaKullab/novastore-backend) running locally (default `http://localhost:7000`)

### Installation

```bash
git clone https://github.com/MustafaKullab/novastore-frontend.git
cd novastore-frontend
npm install
```

### Run the dev server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Other scripts

```bash
npm run build      # Production build
npm run preview    # Preview the production build locally
npm run lint        # Lint and auto-fix (oxlint + eslint)
npm run format        # Format source files with oxfmt
```

## Demo Account

Want to try the storefront without creating an account? Use this demo account:

```
Email: test@novastore.com
Password: test123
```

> This is a **regular customer account** (browsing, cart, checkout, order history) — it does **not** have admin access. Admin credentials are not published publicly; reach out directly if you need to review the admin dashboard.

## Configuration

The app expects the backend API to be reachable at `http://localhost:7000`. If your backend runs on a different port, update the base URL used in the API calls (`src/stores/*.js` and the `fetchWithRefresh` helper) accordingly.

## Roadmap / Planned Improvements

- Centralize the API base URL into a single environment-based config instead of hardcoded URLs
- Add route guards (`beforeEach`) to prevent non-admin users from navigating to admin views directly
- Persist guest cart in client-side storage with merge-on-login
- Extract shared form validation logic into composables

## Author

**Mustafa Kullab** — Built as a personal project to apply and deepen Vue.js/frontend skills after completing web development fundamentals.
