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

## Image Organization

Images are organized in a logical structure for better management and SEO:

```
public/images/
├── hero/           # Hero section background images
├── backgrounds/    # Background images for various sections
├── products/       # Product images with descriptive names
├── about/          # Images for the about section
├── collections/    # Collection-specific images
└── og/             # Open Graph images for social media sharing
```

Naming convention:

- All images use descriptive, SEO-friendly names (e.g., `zenith-jacket-black.jpg` instead of `product1.jpg`)
- Images include color in the filename when applicable
- All images have proper alt text for accessibility

### Lazy Loading

All images use lazy loading for improved performance:

- A custom `LazyImage` component is used throughout the site
- The component uses both native `loading="lazy"` and Intersection Observer API
- Images only load when they enter the viewport (or approach it)
- A placeholder is shown until the image loads
- Smooth fade-in transition when images appear

Usage example:

```tsx
<LazyImage
  src="/images/products/zenith-jacket-black.jpg"
  alt="ZENITH JACKET in Black"
  imgClassName="w-full h-full object-cover"
  wrapperClassName="w-full h-full"
/>
```

### Image Troubleshooting

If images are not loading properly:

1. Check that the image file exists in the correct directory
2. Verify the file size is not 0 bytes (which indicates a failed download)
3. Make sure the path in the code matches the actual file path
4. For collection images, ensure all product images and background images are properly downloaded

To fix broken images, you can use the following command to copy an existing image as a placeholder:

```bash
cp public/images/products/existing-image.jpg public/images/products/missing-image.jpg
```

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
