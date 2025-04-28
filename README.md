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
   - ✅ Optimized logo animation with smooth transitions
   - ✅ Improved text animations for better reliability
   - ✅ Enhanced mobile UI with better scrolling behavior
   - ✅ Consistent spacing and layout across all pages
   - ✅ Removed toast notifications for cleaner shopping experience

4. **UI Refinements**
   - ✅ Improved tabs component with horizontal scrolling on mobile
   - ✅ Consistent styling for legal pages
   - ✅ Brutalist design implementation with clean lines and minimal styling
   - ✅ Optimized animation durations for better user experience

### In Progress

1. **Email System Migration**

   - ✅ Basic newsletter subscription with Mailjet
   - ✅ Welcome email template
   - ⏳ Migration from Mailjet to Resend (actively in planning)
   - ⏳ React-based email templates
   - ⏳ Unsubscribe functionality

2. **Performance Optimization**
   - ✅ Image lazy loading
   - ✅ Animation performance tuning
   - ⏳ React Suspense implementation
   - ⏳ Code splitting

## Roadmap

### Short-term Goals

1. **Performance, SEO and Accessibility**

   - Axe-core errors fix them
   - Continue Lighthouse audit, reach 100s across the board
   - Optimize Core Web Vitals metrics

2. **Contentful CMS Enhancements**

   - Implement image galleries for products (multiple images per product)

3. **Email System Migration and Improvements**

   - Complete migration from Mailjet to Resend
   - Implement React-based email templates
   - Create order confirmation email template
   - Complete unsubscribe functionality
   - Implement email analytics tracking

4. **Design System Setup**
   - Establish a design system for consistent UI components
   - Implement component library for reusability
   - Create a design system documentation site

### Medium-term Goals

1. **Analytics Integration**

   - Add Hotjar or Clarity for user behavior tracking
   - Update privacy policy to reflect analytics usage
   - Implement conversion tracking

2. **SEO Enhancements**
   - Create structured data schema for products
   - Optimize meta tags and descriptions
   - Implement canonical URLs
   - Add sitemap.xml generation

### Long-term Vision

1. **Framework Migration**

   - Evaluate migration to Astro for improved SEO and performance
   - Implement server-side rendering for product pages
   - Utilize incremental static regeneration for content updates
   - Maintain compatibility with current Contentful integration

2. **Advanced Features**
   - User accounts and order history
   - Wishlist functionality
   - Advanced product filtering and sorting
   - Product reviews and ratings
   - Internationalization support
   - Advanced email marketing flows and automation
   - Personalized product recommendations in emails
   - Enhanced mobile app-like experience

### Misc Mini Tasks

- Change placeholder image
- White variation product image preview not reflecting in dropdown, bagpage, and checkout, confirmation
- Add number formating on contentful for prices ($1,000)
- SIZE GUIDE chart link on product page, or not link, chart on product page?
- Moving text on nav bar
- Priced usd, lbp
- View button on product card needs to be quick view feature
  - Quick View button on hover product card
- Choose artwork placement?
- Stock item availability
- Toast slides from under the navbar
- If i click subscribe and i dont have an email, it shows a please fillout this field bubble which has an ornge icon, i want this icon to be black (custom validation, not a priority now)
