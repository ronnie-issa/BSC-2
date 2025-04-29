# OMNIS Card System

This document outlines the card system for the OMNIS brand, following Brutalist design principles.

## Design Principles

- **No Border Radius**: All cards have square corners (no rounded edges)
- **Clear Hierarchy**: Each card type has a distinct purpose and visual style
- **Consistent Styling**: Cards maintain consistent styling across the site
- **Brutalist Aesthetic**: Clean, minimal, and functional design
- **Mode Support**: Cards support both dark mode (default) and light mode contexts

## Card Variants - Dark Mode (Default)

### Product Card

- **Usage**: Displaying products in shop and featured sections
- **Style**: Black background with white text, product image, hover effects
- **Content**: Product image, name, price, optional hover actions
- **Behavior**: Image scales slightly on hover, optional quick view button appears

### Content Card

- **Usage**: Displaying content blocks, features, or information
- **Style**: Black background with white text, optional border
- **Content**: Heading, text, optional image or icon, optional action
- **Behavior**: Static, no hover effects unless containing interactive elements

### Info Card

- **Usage**: Displaying important information, notices, or summaries
- **Style**: Dark gray background with white text, white border
- **Content**: Title, content, optional icon or image
- **Behavior**: Static, may contain interactive elements

## Card Variants - Light Mode

### Product Card Light

- **Usage**: Displaying products on light backgrounds
- **Style**: White background with black text, product image, hover effects
- **Content**: Product image, name, price, optional hover actions
- **Behavior**: Image scales slightly on hover, optional quick view button appears

### Content Card Light

- **Usage**: Displaying content blocks on light backgrounds
- **Style**: White background with black text, optional border
- **Content**: Heading, text, optional image or icon, optional action
- **Behavior**: Static, no hover effects unless containing interactive elements

### Info Card Light

- **Usage**: Displaying important information on light backgrounds
- **Style**: Light gray background with black text, black border
- **Content**: Title, content, optional icon or image
- **Behavior**: Static, may contain interactive elements

## Card Anatomy

### Product Card

```
┌────────────────────────┐
│                        │
│                        │
│       Product Image    │
│                        │
│                        │
│                        │
├────────────────────────┤
│ Product Name           │
│ $XX.XX                 │
└────────────────────────┘
```

### Content Card

```
┌────────────────────────┐
│ Heading                │
├────────────────────────┤
│                        │
│ Content text goes here │
│ spanning multiple      │
│ lines if needed.       │
│                        │
├────────────────────────┤
│ [Optional Action]      │
└────────────────────────┘
```

### Info Card

```
┌────────────────────────┐
│ ℹ️ Title               │
├────────────────────────┤
│                        │
│ Information content    │
│ goes here.             │
│                        │
└────────────────────────┘
```

## Spacing Guidelines

- **External Spacing**: Maintain consistent gaps between cards (16px-24px)
- **Internal Padding**: Use consistent padding within cards (16px-24px)
- **Content Spacing**: Use consistent spacing between card elements (8px-16px)

## Typography Guidelines

- **Headings**: Use heading styles consistent with the typography system
- **Body Text**: Use body text styles consistent with the typography system
- **Product Names**: Use font-weight 700 (bold) for product names
- **Prices**: Use font-weight 400 (regular) for prices

## Interactive States

### Hover State

- **Product Cards**: Slight image scale (1.05-1.1), optional action button appears
- **Interactive Cards**: Subtle background color change or border highlight
- **Non-interactive Cards**: No hover effect

### Focus State

- **Interactive Cards**: Clear focus ring for accessibility
- **Non-interactive Cards**: No focus state

### Active/Selected State

- **Interactive Cards**: Visual indication of selection (border, background)
- **Non-interactive Cards**: No active state

## Responsive Behavior

### Mobile (< 640px)

- Full-width cards
- Simplified content
- Reduced padding (12px-16px)
- Grid layout: 1 column

### Tablet (640px - 1024px)

- Adaptive width cards
- Standard content
- Standard padding (16px-24px)
- Grid layout: 2 columns

### Desktop (> 1024px)

- Fixed or adaptive width cards
- Full content
- Standard padding (16px-24px)
- Grid layout: 3+ columns

## Implementation Guidelines

### HTML Structure

```html
<div class="card card-product">
  <div class="card-image">
    <img src="product-image.jpg" alt="Product Name" />
  </div>
  <div class="card-content">
    <h3 class="card-title">Product Name</h3>
    <p class="card-price">$XX.XX</p>
  </div>
</div>
```

### CSS Classes

- `card`: Base card styles
- `card-product`, `card-content`, `card-info`: Variant modifiers
- `card-image`, `card-content`, `card-footer`: Structural elements
- `card-title`, `card-price`, `card-text`: Content elements
- `card-action`: Interactive elements

## Accessibility Guidelines

1. Ensure sufficient color contrast between card background and text
2. Use semantic HTML elements for card content (headings, paragraphs)
3. Provide clear focus states for interactive cards
4. Ensure all interactive elements are keyboard accessible
5. Use appropriate ARIA roles and attributes for complex cards

## Examples

### Product Card Example

```jsx
<div className="card card-product">
  <Link to={`/product/${product.slug}`} className="card-image">
    <img src={product.image} alt={product.name} />
  </Link>
  <div className="card-content">
    <h3 className="card-title">{product.name}</h3>
    <p className="card-price">${product.price}</p>
  </div>
</div>
```

### Content Card Example

```jsx
<div className="card card-content">
  <h2 className="card-title">Feature Title</h2>
  <div className="card-body">
    <p>Feature description text goes here, explaining the benefits.</p>
  </div>
  <div className="card-footer">
    <Button variant="outline">Learn More</Button>
  </div>
</div>
```

### Info Card Example

```jsx
<div className="card card-info">
  <div className="card-header">
    <InfoIcon className="card-icon" />
    <h3 className="card-title">Important Information</h3>
  </div>
  <div className="card-body">
    <p>This is important information that the user should know.</p>
  </div>
</div>
```

## When to Use Each Card Type

- Use **Product Cards** for displaying products in shop and featured sections
- Use **Content Cards** for displaying features, benefits, or general content
- Use **Info Cards** for displaying important information, notices, or summaries

## When to Use Light Mode Variants

- Use light mode variants when cards appear on light backgrounds
- Use dark mode variants (default) when cards appear on dark backgrounds
- Be consistent within each context - don't mix light and dark variants in the same section
