# Hima storefront

A responsive fashion storefront built with React 19, TypeScript, React Router, and Vite.

## Run locally

Use Node 24 (or Node 22.12+ for the app), then:

```sh
npm ci
npm run dev
```

The development URL is http://localhost:5173.

```sh
npm run build
npm run preview
node --test tests/cart.test.mjs
```

The native cart tests import TypeScript and require Node 24. The build type-checks the complete app and emits static files into `dist`.

## Included

- Hima identity, editorial homepage, responsive collection and product pages.
- Search, category/audience filters, featured/new/essentials/sale edits, sorting and in-stock filtering.
- Saved pieces and validated size-aware cart persisted locally.
- Stock limits across variants; quantities and totals protected against invalid input.
- Guest sample checkout with sample details, order snapshots, inventory changes and order history.
- Clearly labeled customer and inventory-management previews.
- Keyboard-accessible native dialog for local style recommendations; no AI key in client code.
- Skip navigation, focus management, labeled inputs, semantic tables, reduced-motion support, responsive layouts and route titles.

## Commerce status

This is a **frontend preview, not a live commerce system**. It does not process payments, dispatch orders, authenticate real customers, send feedback or emails, or provide a secure admin backend.

Catalog prices, product details, inventory, fit information and shipping estimates are illustrative. Stock photography is not evidence of Hima's actual inventory. Replace it with approved Hima product images and verified catalog data before launch. Image sources and photographer credits are in `data/image-sources.json`.

Bag contents and saved product IDs persist in localStorage under `hima-store-v1`. Profiles, sample orders and inventory edits last for the current page session. Feedback is stored in sessionStorage. Checkout details are not saved or submitted. The preview account selectors deliberately require no credentials and are not authentication.

## Before accepting real orders

Connect the catalog, inventory, checkout and order history to Hima's chosen commerce platform. Real payments must use the provider's hosted checkout or secure payment components. Validate inventory, prices, shipping and taxes on the server. Add provider-backed authentication and server-enforced admin authorization. Configure verified delivery/returns policies and privacy disclosures.

`services/geminiService.ts` is an unused server integration boundary for future styling advice. Implement the server endpoint with authentication and rate limiting before enabling it. Keep provider API keys server-side; never embed them in Vite variables or browser code.

## Hosting

`.openai/hosting.json` configures a private Sites preview with static output in `dist`. For other static hosts, configure a fallback from application paths (such as `/shop` and `/product/1`) to `index.html`. The included `public/_redirects` supports hosts with Netlify-style SPA rewrites.

## Validation

The production build performs TypeScript validation. The native test suite covers corrupt persistence, product/size validation, shared inventory caps, quantity handling and exact currency totals. Browser visual/interaction testing was unavailable in this environment and should be performed before a public launch.

