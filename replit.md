# Fritadeira - Worten Clone

A single-page e-commerce application built with React + Vite that simulates a product listing page for an air fryer (fritadeira), styled after the Portuguese retailer Worten.

## Tech Stack

- **Frontend:** React 19 + Vite 8
- **Styling:** Plain CSS + Google Fonts (Open Sans) + Font Awesome 6
- **Build Tool:** Vite (dev server on port 5000)
- **Package Manager:** npm

## Project Structure

```
├── api/                   # PHP Backend (payment processing)
│   └── payment.php        # MBWay/Multibanco payments via WayMB API
├── public/                # Static assets (images, logos)
├── src/
│   ├── assets/            # Local images
│   ├── components/        # React components
│   │   ├── BottomSections.jsx   # Newsletter, Footer
│   │   ├── Cart.jsx             # Shopping cart view
│   │   ├── Checkout.jsx         # Checkout form + payment logic
│   │   ├── MiddleSections.jsx   # Pricing, purchase options, reviews
│   │   ├── TopSections.jsx      # Header, product details, highlights
│   │   └── *Modals.jsx          # Warranty, Return, Tech spec modals
│   ├── App.jsx            # Main app logic and view-state navigation
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── index.html
├── vite.config.js         # Vite config (host: 0.0.0.0, port: 5000)
└── package.json
```

## Key Features

- View-state navigation (product → cart → checkout) without react-router
- Postal code autofill via GeoAPI.pt / Zippopotamus
- Payment integration with WayMB API (MBWay + Multibanco)
- Responsive design with sticky mobile bottom bar
- Portuguese language/market focused

## Workflows

- **Start application:** `npm run dev` (port 5000, webview)

## Deployment

Configured as a **static** deployment:
- Build command: `npm run build`
- Public directory: `dist`
