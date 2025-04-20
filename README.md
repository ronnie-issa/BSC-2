# OMNIS - Fashion E-commerce Website

## Project Overview

OMNIS is a modern fashion e-commerce website built with React and TypeScript. The site features smooth animations, responsive design, and a minimalist aesthetic focused on premium clothing.

### Key Features

- Animated page transitions and scroll effects (currently using GSAP)
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
- GSAP (animations - to be replaced with Framer Motion)

## Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/             # Route-based page components
├── lib/               # Utilities and hooks
└── styles/            # Global styles and Tailwind config
```

## Development

### Prerequisites

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Local Setup

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm i

# Start development server
npm run dev
```

## Upcoming Changes

1. **Animation Migration**

   - Current: GSAP-based animations
   - Target: Framer Motion for better React integration
   - Affected components:
     - HeroSection
     - AboutSection
     - CollectionSection
     - All page transitions

2. **Performance Optimization**
   - Implement lazy loading for images
   - Add proper suspense boundaries
   - Optimize animation performance

## TODO

- Migrate to Astro
  - Create Schema
