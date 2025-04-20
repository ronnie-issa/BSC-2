# GSAP to Framer Motion Migration Plan

## Phase 1: Setup ✅

- [x] Install Framer Motion: `npm install framer-motion`
- [x] Remove GSAP dependencies
- [x] Create shared animation variants

## Phase 2: Component Migration ✅

- [x] Basic page transitions
- [x] HeroSection.tsx
- [x] AboutSection.tsx
- [x] CollectionSection.tsx
- [x] NewsletterSection.tsx

## Phase 3: Scroll Animations ✅

- [x] Create reusable scroll animation hooks
- [x] Migrate all ScrollTrigger implementations
- [x] Test and optimize performance

## Phase 4: Testing & Optimization

- [ ] Cross-browser testing
- [ ] Mobile responsiveness
- [ ] Performance benchmarking
- [ ] Animation timing adjustments

## Completed Components

- src/lib/framer.ts - Created with all necessary animation hooks
- src/components/HeroSection.tsx - Migrated to Framer Motion
- src/components/AboutSection.tsx - Migrated to Framer Motion
- src/components/CollectionSection.tsx - Migrated to Framer Motion
- src/components/NewsletterSection.tsx - Migrated to Framer Motion
- src/pages/Index.tsx - Updated to use Framer Motion

## Remaining Tasks

- Migrate page animations in About.tsx, Help.tsx, Legal.tsx, etc.
- Test all animations for performance and visual consistency

## UI Enhancements

- [x] Fixed "VIEW" text visibility on product cards
- [x] Enhanced "Buy Now" button to be more prominent
- [x] Improved button transitions and hover effects
