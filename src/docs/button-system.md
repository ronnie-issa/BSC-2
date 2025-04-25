# Omnis Button System

This document outlines the button system for the Omnis brand, following Brutalist design principles.

## Design Principles

- **No Border Radius**: All buttons have square corners (no rounded edges)
- **Clear Hierarchy**: Each button type has a distinct purpose and visual style
- **Consistent Styling**: Buttons maintain consistent styling across the site
- **Brutalist Aesthetic**: Clean, minimal, and functional design
- **Mode Support**: Buttons support both dark mode (default) and light mode contexts

## Button Variants - Dark Mode (Default)

### Primary Button

- **Usage**: Main call-to-action, most important action on the page
- **Style**: White background with black text
- **Example**: "CHECKOUT", "PLACE ORDER"
- **Code**: `<Button>Primary Action</Button>` or `<Button variant="default">Primary Action</Button>`

### Secondary Button

- **Usage**: Important actions that aren't the primary focus
- **Style**: Black background with white text
- **Example**: "Buy via WhatsApp", "Continue Shopping"
- **Code**: `<Button variant="secondary">Secondary Action</Button>`

### Outline Button

- **Usage**: Less prominent actions, alternative options
- **Style**: Transparent background with white border and white text
- **Example**: "Add to Bag", "VIEW BAG"
- **Code**: `<Button variant="outline">Outline Action</Button>`

### Ghost Button

- **Usage**: Subtle actions that don't need much emphasis
- **Style**: No background or border, just white text with hover effect
- **Example**: "Back", navigation actions
- **Code**: `<Button variant="ghost">Ghost Action</Button>`

### Link Button

- **Usage**: Navigation or actions that should appear as links
- **Style**: White text with underline on hover, no padding
- **Example**: "REMOVE", "VIEW DETAILS"
- **Code**: `<Button variant="link">Link Action</Button>`

## Button Variants - Light Mode

### Primary Button (Light)

- **Usage**: Main call-to-action in light mode contexts
- **Style**: Black background with white text
- **Example**: "CHECKOUT" in dropdown menus
- **Code**: `<Button variant="primary-light">Primary Action</Button>`

### Secondary Button (Light)

- **Usage**: Important actions in light mode contexts
- **Style**: Dark gray background with white text
- **Example**: "Continue Shopping" in light backgrounds
- **Code**: `<Button variant="secondary-light">Secondary Action</Button>`

### Outline Button (Light)

- **Usage**: Less prominent actions in light mode contexts
- **Style**: Transparent background with black border and black text
- **Example**: "VIEW BAG" in dropdown menus
- **Code**: `<Button variant="outline-light">Outline Action</Button>`

### Ghost Button (Light)

- **Usage**: Subtle actions in light mode contexts
- **Style**: No background or border, just black text with hover effect
- **Example**: "Back" on light backgrounds
- **Code**: `<Button variant="ghost-light">Ghost Action</Button>`

### Link Button (Light)

- **Usage**: Navigation or actions that should appear as links in light mode contexts
- **Style**: Black text with underline on hover, no padding
- **Example**: "REMOVE" in light backgrounds
- **Code**: `<Button variant="link-light">Link Action</Button>`

## Size Variants

- **Default**: Standard size for most buttons
- **Small (sm)**: Smaller buttons for compact UIs
- **Large (lg)**: Larger buttons for emphasis
- **Icon**: Square buttons for icon-only buttons

## Usage Guidelines

1. Use **Primary** buttons for the main action on each page
2. Use **Secondary** buttons for important but not primary actions
3. Use **Outline** buttons for alternative options
4. Use **Ghost** buttons for subtle actions
5. Use **Link** buttons for navigation or minor actions
6. Use **Light** variants when buttons appear on light backgrounds

## When to Use Light Mode Variants

- Use light mode variants when buttons appear on light backgrounds (e.g., white dropdowns, cards)
- Use dark mode variants (default) when buttons appear on dark backgrounds (e.g., main site pages)
- Be consistent within each context - don't mix light and dark variants in the same component

## Examples

```jsx
// Dark Mode (Default)
<Button>CHECKOUT</Button>
<Button variant="secondary">Buy via WhatsApp</Button>
<Button variant="outline">Add to Bag</Button>
<Button variant="ghost">Back</Button>
<Button variant="link">REMOVE</Button>

// Light Mode
<Button variant="primary-light">CHECKOUT</Button>
<Button variant="secondary-light">Continue Shopping</Button>
<Button variant="outline-light">VIEW BAG</Button>
<Button variant="ghost-light">Back</Button>
<Button variant="link-light">REMOVE</Button>

// Size Variants
<Button size="lg">CHECKOUT</Button>
<Button size="sm" variant="outline-light">VIEW BAG</Button>
```
