# OMNIS - Fashion E-commerce Website

## Project Overview

OMNIS is a modern fashion e-commerce website built with React and TypeScript. The site features smooth animations, responsive design, and a minimalist aesthetic focused on premium clothing.

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

## Email System

OMNIS uses a centralized email template system for all transactional emails:

### Email Templates

All email templates are defined in `functions/email-templates.js`:

- **Welcome Email**: Sent when a user subscribes to the newsletter
- **Order Confirmation Email**: Sent when a customer places an order

### Email Customization

For detailed instructions on customizing email templates, see the [Email Customization Guide](docs/email-customization-guide.md).

## Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/             # Route-based page components
├── lib/               # Utilities and hooks
├── contexts/          # React context providers
├── services/          # API services and external integrations
└── styles/            # Global styles and Tailwind config
docs/
└── email-customization-guide.md  # Guide for customizing email templates
```

### Key Directories and Files

- `src/components/`: UI components including Navbar, Footer, and product-related components
- `src/contexts/`: Context providers for state management
  - `ContentfulProductsProvider.tsx`: Manages product data from Contentful
  - `ProductContext.tsx`: Manages shopping cart state
- `src/services/`: External API integrations
  - `contentful.ts`: Handles fetching product data from Contentful
- `functions/`: Netlify serverless functions
  - `subscribe.js`: Handles newsletter subscriptions and sends welcome emails
  - `order-confirmation.js`: Sends order confirmation emails
  - `email-templates.js`: Contains all email templates

## Roadmap

### Short-term Goals

**Performance, SEO and Accessibility**

- Axe-core errors fix them
- Continue Lighthouse audit, reach 100s across the board
- Optimize Core Web Vitals metrics
- React Suspense implementation?
- Code splitting?

**Contentful CMS Enhancements**

- Implement image galleries for products (multiple images per product)

**Email System Improvements**

- Implement email analytics tracking
- For a production site, you would want to store subscribers in a database

**Design System Setup**

- Establish a design system for consistent UI components
- Implement component library for reusability
- Create a design system documentation site

### Medium-term Goals

**Analytics Integration**

- Add Hotjar or Clarity for user behavior tracking
- Update privacy policy to reflect analytics usage
- Implement conversion tracking

**SEO Enhancements**

- Create structured data schema for products
- Optimize meta tags and descriptions
- Implement canonical URLs
- Add sitemap.xml generation

### Long-term Vision

**Framework Migration**

- Evaluate migration to Astro for improved SEO and performance
- Implement server-side rendering for product pages
- Utilize incremental static regeneration for content updates
- Maintain compatibility with current Contentful integration

**Advanced Features**

- User accounts and order history
- Wishlist functionality
- Advanced product filtering and sorting
- Product reviews and ratings
- Internationalization support
- Advanced email marketing flows and automation
- Personalized product recommendations in emails
- Enhanced mobile app-like experience

### Misc Mini Tasks

- SIZE GUIDE chart link on product page, or not link, chart on product page?i
- Moving text on nav bar (https://trikkobrand.com/collections/basics)
- Priced usd, lbp
  - Implement a language/currency selector in nav bar or footer
- View button on product card needs to be quick view feature
  - Quick View button on hover product card
- Choose artwork placement?
- Stock item availability
- Handle subscribe newsletter locally
  - A dedicated email marketing platform that handles subscriber management (hubspot)
  - integrate loop with resend to have a wysiwyg editor for email templates (these need research)
- Document Toast Comp in design system
- Make Large Omnis Logo Responsive (Use SVG) or https://utopia.fyi/ or tailwindcss-fluid-type
- Email spam protection plan
