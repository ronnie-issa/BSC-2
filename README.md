# OMNIS - Fashion E-commerce Website

## Project Overview

OMNIS is a modern fashion e-commerce website built with React and TypeScript. The site features smooth animations, responsive design, and a minimalist aesthetic focused on premium clothing.

### Key Features

- Animated page transitions and scroll effects using Framer Motion
- Responsive product galleries and collections
- Newsletter subscription system
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

## Contentful CMS Integration

The project uses Contentful as a headless CMS to manage product data:

### Content Models

- **Product**: Main product information (name, price, description, image, featured flag)
- **Variation**: Product color/material variations
- **Size**: Product size options

### Implementation Details

- Products are fetched from Contentful using the Content Delivery API
- Featured products are displayed on the homepage
- All products are displayed on the shop page
- Product data is cached to improve performance and reduce API calls
- Preview mode is available for testing content changes before publishing
- Rich text format is supported for product descriptions
- Images are served through Contentful's CDN with automatic optimizations

### Content Management

- Products can be added, edited, and removed through the Contentful web interface
- Changes can be previewed before publishing using the preview mode
- Content can be scheduled for future publishing
- Multiple users can collaborate on content creation and management

## Upcoming Changes

1. **Animation Migration**

   - Status: ✅ Completed
   - All components and pages have been migrated to Framer Motion
   - GSAP compatibility layer has been removed

2. **Performance Optimization**
   - Status: Partially Completed
   - ✅ Implemented lazy loading for images
   - Add proper suspense boundaries
   - Optimize animation performance

## TODO (purpose)

- Migrate to NextJS, or a simpler/faster solution (SEO)
  - Create Schema
- Test Mailjet newsletter subscription welcome email (Marketing)
  - unsubscribe functionality
- Add Hotjar or Clarity and adjust privacy policy (Analytics)
- Contentful CMS Enhancements:
  - Add more products to Contentful (at least 6 total - 3 featured, 3 non-featured)
  - Consider implementing rich text renderer for product descriptions using `@contentful/rich-text-react-renderer`
  - Add more variations and sizes for products
  - Implement image galleries for products (multiple images per product)
  - Add content model for collections to manage them through Contentful
