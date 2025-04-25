# OMNIS - Fashion E-commerce Website

## Project Overview

OMNIS is a modern fashion e-commerce website built with React and TypeScript. The site features smooth animations, responsive design, and a minimalist aesthetic focused on premium clothing.

### Key Features

- Animated page transitions and scroll effects using Framer Motion
- Responsive product galleries with Contentful integration
- Newsletter subscription system with welcome emails
- WhatsApp ordering integration
- Size guide and product information
- Customer support and FAQ section
- Legal documentation and shipping information

### Tech Stack

- Vite
- TypeScript
- React
- shadcn-ui (UI components)
- Tailwind CSS (styling)
- Framer Motion (animations)
- Contentful (headless CMS for product management)

## Image Management

### UI and Static Images

Static images for UI elements are organized in the public directory:

```
public/images/
├── hero/           # Hero section background images
├── backgrounds/    # Background images for various sections
├── about/          # Images for the about section
└── og/             # Open Graph images for social media sharing
```

### Product Images

Product images are managed through Contentful CMS:

- Images are uploaded and stored in Contentful's media library
- Each product references its image through the Contentful API
- Images are served through Contentful's global CDN for optimal performance
- Image URLs are automatically formatted with proper dimensions and optimizations

### Lazy Loading

All images use lazy loading for improved performance:

- A custom `LazyImage` component is used throughout the site
- The component uses both native `loading="lazy"` and Intersection Observer API
- Images only load when they enter the viewport (or approach it)
- A placeholder is shown until the image loads
- Smooth fade-in transition when images appear

## Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/             # Route-based page components
├── lib/               # Utilities and hooks
├── contexts/          # React context providers
├── services/          # API services and external integrations
└── styles/            # Global styles and Tailwind config
```

### Key Directories and Files

- `src/components/`: UI components including Navbar, Footer, and product-related components
- `src/contexts/`: Context providers for state management
  - `ContentfulProductsProvider.tsx`: Manages product data from Contentful
  - `ProductContext.tsx`: Manages shopping cart state
- `src/services/`: External API integrations
  - `contentful.ts`: Handles fetching product data from Contentful
- `functions/`: Netlify serverless functions
  - `subscribe.js`: Handles newsletter subscriptions
  - `welcome-email.js`: Sends welcome emails to new subscribers

## Project Status

### Completed Features

1. **Core E-commerce Functionality**

   - ✅ Product browsing
   - ✅ Shopping cart management
   - ✅ Checkout process
   - ✅ WhatsApp ordering integration

2. **Content Management**

   - ✅ Contentful CMS integration
   - ✅ Product data management
   - ✅ Rich text product descriptions
   - ✅ Image management through Contentful CDN

3. **User Experience**
   - ✅ Responsive design for all devices
   - ✅ Animated transitions using Framer Motion
   - ✅ Lazy loading for improved performance
   - ✅ Newsletter subscription system

### In Progress

1. **Email Marketing**

   - ✅ Basic newsletter subscription
   - ✅ Welcome email template
   - ⏳ Unsubscribe functionality
   - ⏳ Email template optimization

2. **Performance Optimization**
   - ✅ Image lazy loading
   - ⏳ React Suspense implementation
   - ⏳ Code splitting
   - ⏳ Animation performance tuning

## Roadmap

### Short-term Goals

1. **General**

   - Continue Lighthouse audit, reach 100s across the board
   - Change og image to OMNIS logo
   - Bag page should be responsive
   - in internal pages on load the navbar should have a padding of "py-5 md:py-4" on scroll it should change to "py-3 md:py-2" check background too

2. **Contentful CMS Enhancements**

   - Organize Contentful content structure
     - Products and attributes (Size, Variation) should each be in a separate group
   - Add more products (at least 6 total - 3 featured, 3 non-featured)
   - Add more variations and sizes for products
   - Implement image galleries for products (multiple images per product)

3. **Email System Migration and Improvements**
   - Migrate from Mailjet to Resend for improved developer experience
   - Implement React-based email templates
   - Create welcome email and order confirmation templates
   - Complete unsubscribe functionality
   - Implement email analytics tracking

### Medium-term Goals

1. **Analytics Integration**

   - Add Hotjar or Clarity for user behavior tracking
   - Update privacy policy to reflect analytics usage
   - Implement conversion tracking

2. **SEO Enhancements**
   - Create structured data schema
   - Optimize meta tags and descriptions
   - Improve site performance metrics

### Long-term Vision

1. **Framework Migration**

   - Evaluate migration to Next.js for improved SEO and performance
   - Consider server-side rendering options
   - Implement incremental static regeneration for product pages

2. **Advanced Features**
   - User accounts and order history
   - Wishlist functionality
   - Product filtering
   - Product reviews and ratings
   - Internationalization support
   - Advanced email marketing flows and automation
   - Personalized product recommendations in emails
