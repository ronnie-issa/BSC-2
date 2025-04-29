# OMNIS Spacing & Layout System

This document outlines the spacing and layout system for the OMNIS brand, following Brutalist design principles.

## Spacing Scale

OMNIS uses a consistent spacing scale throughout the application to maintain visual harmony and rhythm.

| Token | Size | Tailwind Class | Usage |
|-------|------|---------------|-------|
| xs | 4px | p-1, m-1 | Minimal spacing, icon padding |
| sm | 8px | p-2, m-2 | Tight spacing, compact elements |
| md | 16px | p-4, m-4 | Standard spacing, default padding |
| lg | 24px | p-6, m-6 | Generous spacing, section padding |
| xl | 32px | p-8, m-8 | Large spacing, section margins |
| 2xl | 48px | p-12, m-12 | Extra large spacing, page sections |
| 3xl | 64px | p-16, m-16 | Maximum spacing, hero sections |
| 4xl | 96px | p-24, m-24 | Extreme spacing, major page divisions |

## Layout Principles

### Brutalist Grid System

- **Square Edges**: No rounded corners on containers or layout elements
- **Strong Alignment**: Elements align to a clear grid
- **Deliberate Whitespace**: Whitespace is used intentionally to create hierarchy
- **Consistent Rhythm**: Vertical and horizontal spacing follows the spacing scale
- **Visible Structure**: Layout structure is often visible through borders and dividers

## Container System

### Main Container

The main container centers content and provides consistent horizontal padding.

```html
<div class="container mx-auto px-6">
  <!-- Content goes here -->
</div>
```

### Container Sizes

| Size | Max Width | Usage |
|------|-----------|-------|
| Default | 1400px | Standard pages |
| Small | 768px | Narrow content (forms, text-heavy pages) |
| Medium | 1024px | Medium-width content |
| Full | 100% | Full-width content (hero sections, full-bleed images) |

## Grid System

OMNIS uses CSS Grid for layout with consistent column patterns.

### Standard Grid

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <!-- Grid items go here -->
</div>
```

### Common Grid Patterns

| Pattern | Usage |
|---------|-------|
| 1 column (mobile) | All screen sizes below 768px |
| 2 columns (tablet) | Screen sizes 768px-1023px |
| 3 columns (desktop) | Screen sizes 1024px+ |
| 4 columns (large desktop) | Screen sizes 1280px+ |

### Grid Gaps

Use consistent gap sizes from the spacing scale:

- **Small Gap**: 16px (`gap-4`) - Compact grids, related items
- **Medium Gap**: 24px (`gap-6`) - Standard grids, product listings
- **Large Gap**: 32px (`gap-8`) - Featured content, major sections

## Section Spacing

### Vertical Rhythm

Maintain consistent vertical spacing between page sections:

- **Standard Section Spacing**: 64px (`py-16`) between major sections
- **Compact Section Spacing**: 48px (`py-12`) between related sections
- **Hero Section Spacing**: 96px (`py-24`) for hero and featured sections

### Section Example

```html
<section class="py-16 md:py-24">
  <div class="container mx-auto px-6">
    <h2 class="text-2xl md:text-4xl font-bold mb-8">Section Title</h2>
    <!-- Section content -->
  </div>
</section>
```

## Component Spacing

### External Spacing (Margins)

- **Stacked Components**: 16px-24px (`mb-4` to `mb-6`) between stacked components
- **Inline Components**: 8px-16px (`mr-2` to `mr-4`) between inline components
- **Grid Items**: Use grid gap instead of margins for consistent spacing

### Internal Spacing (Padding)

- **Cards**: 24px (`p-6`) padding inside cards
- **Buttons**: 16px horizontal, 12px vertical (`px-4 py-3`) for standard buttons
- **Form Elements**: 12px-16px (`p-3` to `p-4`) padding inside form elements

## Responsive Spacing

Adjust spacing based on screen size:

### Mobile Spacing (< 768px)

- Reduced section padding: 32px-48px (`py-8` to `py-12`)
- Reduced component margins: 16px-24px (`mb-4` to `mb-6`)
- Reduced container padding: 24px (`px-6`)

### Tablet Spacing (768px - 1023px)

- Standard section padding: 48px-64px (`py-12` to `py-16`)
- Standard component margins: 24px-32px (`mb-6` to `mb-8`)
- Standard container padding: 24px (`px-6`)

### Desktop Spacing (> 1024px)

- Generous section padding: 64px-96px (`py-16` to `py-24`)
- Generous component margins: 32px-48px (`mb-8` to `mb-12`)
- Standard container padding: 24px (`px-6`)

## Layout Patterns

### Hero Layout

```html
<section class="py-24 md:py-32">
  <div class="container mx-auto px-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <h1 class="text-4xl md:text-6xl font-bold mb-6">Hero Title</h1>
        <p class="text-xl text-omnis-lightgray mb-8">Hero description text.</p>
        <Button size="lg">CALL TO ACTION</Button>
      </div>
      <div>
        <img src="hero-image.jpg" alt="Hero" class="w-full" />
      </div>
    </div>
  </div>
</section>
```

### Product Grid Layout

```html
<section class="py-16">
  <div class="container mx-auto px-6">
    <h2 class="text-2xl md:text-4xl font-bold mb-8">Products</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Product cards go here -->
    </div>
  </div>
</section>
```

### Content with Sidebar Layout

```html
<section class="py-16">
  <div class="container mx-auto px-6">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div class="lg:col-span-2">
        <!-- Main content -->
      </div>
      <div class="lg:col-span-1">
        <!-- Sidebar content -->
      </div>
    </div>
  </div>
</section>
```

## Z-Index System

OMNIS uses a consistent z-index scale to manage stacking contexts:

| Level | Z-Index | Usage |
|-------|---------|-------|
| Background | -1 | Background elements that should appear behind content |
| Default | 0 | Standard content, no specific stacking context |
| Low | 10 | Elements that should appear above standard content |
| Medium | 20 | Dropdowns, popovers, tooltips |
| High | 30 | Sticky headers, fixed elements |
| Overlay | 40 | Modals, dialogs, overlays |
| Toast | 50 | Toast notifications |
| Maximum | 60 | Critical UI elements that must appear above everything |

## Aspect Ratios

Use consistent aspect ratios for media elements:

| Ratio | Usage |
|-------|-------|
| 1:1 (Square) | Product thumbnails, avatars, icons |
| 3:4 (Portrait) | Product images, portrait photos |
| 16:9 (Widescreen) | Video content, landscape banners |
| 21:9 (Ultrawide) | Hero banners, panoramic images |

## Layout Guidelines

1. **Consistency**: Use the same spacing scale throughout the application
2. **Hierarchy**: Use spacing to create visual hierarchy and group related elements
3. **Breathing Room**: Provide adequate whitespace around content for readability
4. **Alignment**: Maintain strong alignment along grid lines
5. **Responsiveness**: Adjust spacing and layout appropriately for different screen sizes
6. **Intentionality**: Every spacing decision should have a purpose

## Common Layout Mistakes to Avoid

1. **Inconsistent Spacing**: Mixing arbitrary spacing values instead of using the spacing scale
2. **Overcrowding**: Placing too many elements too close together
3. **Uneven Margins**: Using different spacing values for similar elements
4. **Ignoring Breakpoints**: Not adjusting layout appropriately for different screen sizes
5. **Rigid Layouts**: Not allowing content to flow naturally on different devices
6. **Insufficient Contrast**: Not using spacing effectively to create visual hierarchy

## Implementation Examples

### Section with Proper Spacing

```jsx
<section className="py-16 md:py-24 bg-omnis-black">
  <div className="container mx-auto px-6">
    <h2 className="text-2xl md:text-4xl font-bold mb-8">Featured Products</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </div>
</section>
```

### Component with Proper Internal Spacing

```jsx
<div className="p-6 border border-omnis-white">
  <h3 className="text-xl font-bold mb-4">Component Title</h3>
  <p className="mb-6">Component description text goes here.</p>
  <div className="flex items-center space-x-4">
    <Button variant="outline">CANCEL</Button>
    <Button>CONFIRM</Button>
  </div>
</div>
```

### Form with Proper Field Spacing

```jsx
<form className="space-y-6">
  <div>
    <label className="block mb-2">Name</label>
    <input type="text" className="w-full p-3 border border-omnis-white bg-transparent" />
  </div>
  <div>
    <label className="block mb-2">Email</label>
    <input type="email" className="w-full p-3 border border-omnis-white bg-transparent" />
  </div>
  <Button type="submit" className="mt-4">SUBMIT</Button>
</form>
```
