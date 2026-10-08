# E-Sharp Ecommerce Website

E-Sharp is a React + Vite ecommerce storefront built to follow the implementation guide's phased architecture: global design system, reusable UI components, catalog browsing, cart flow, checkout, and account navigation.

## Design system

The app follows the guide's color palette and branding:

- Primary: #4F46E5
- Primary dark: #3730A3
- Primary light: #EEF0FF
- Background: #F8FAFC
- Surface: #FFFFFF
- Text: #172033
- Muted text: #64748B
- Border: #E2E8F0
- Success: #16A34A
- Warning: #F59E0B
- Danger: #DC2626
- Dark: #111827

## Project structure

- src/App.jsx — root route and provider layout
- src/context — product catalog, cart, wishlist, and auth state
- src/components — reusable UI blocks and layout shell
- src/data — DummyJSON API client and product normalization
- src/pages — route-driven storefront pages

## Local setup

1. Install dependencies:
   npm install
2. Start the dev server:
   npm run dev
3. Build the production bundle:
   npm run build

## Guide implementation path

The project is organized around the implementation guide phases:

1. App scaffolding and routing
2. Shared design system and global tokens
3. Reusable component library
4. Landing page and category browsing
5. Product listing and details
6. Cart, checkout, and payment flow
7. Account, tracking, and support pages

## Notes

- Product listings, categories, search results, and product details are fetched from [DummyJSON](https://dummyjson.com/products) with Axios.
- The catalog initially requests 40 products and loads additional pages as the user scrolls through the shop or search results.
- Product prices are displayed in USD to match the API data.
- Cart and wishlist state persist in localStorage.
- Styling remains intentionally aligned to the implementation guide palette and component structure.

## Future expansion

This project is ready for additional improvements such as:

- real authentication
- checkout API flow
- order persistence
- additional catalog filters
