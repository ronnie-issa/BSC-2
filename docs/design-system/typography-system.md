# OMNIS Typography System

This document outlines the typography system for the OMNIS brand, following Brutalist design principles.

## Font Families

OMNIS uses three primary font families, each with a specific purpose:

### 1. Montserrat

- **Usage**: Body text, UI elements, buttons, form elements
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold), 800 (Extrabold)
- **Character**: Modern, clean, highly legible sans-serif
- **Example**:
  - Regular: "Experience premium streetwear designed for the modern individual."
  - Bold: "FREE SHIPPING ON ALL ORDERS"

### 2. Noto Sans Display

- **Usage**: Headings, titles, section headers
- **Weights**: 400 (Regular), 500 (Medium), 700 (Bold), 900 (Black)
- **Character**: Contemporary, geometric sans-serif with personality
- **Example**:
  - Bold: "New Collection"
  - Black: "PREMIUM STREETWEAR"

### 3. Noto Serif Display

- **Usage**: OMNIS logo, special brand elements
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- **Character**: Elegant, sophisticated serif with high contrast
- **Example**:
  - Regular: "OMNIS"
  - Bold: "OMNIS"

## Type Scale

| Level  | Size (Desktop) | Size (Mobile) | Line Height | Font               | Weight | Letter Spacing | Usage               |
| ------ | -------------- | ------------- | ----------- | ------------------ | ------ | -------------- | ------------------- |
| Logo   | 60px           | 40px          | 1.1         | Noto Serif Display | 400    | -2.8px         | OMNIS logo          |
| h1     | 48px           | 36px          | 1.1         | Noto Sans Display  | 700    | -0.5px         | Page titles         |
| h2     | 36px           | 28px          | 1.2         | Noto Sans Display  | 700    | -0.3px         | Section headings    |
| h3     | 24px           | 20px          | 1.3         | Noto Sans Display  | 700    | -0.2px         | Subsection headings |
| h4     | 20px           | 18px          | 1.3         | Noto Sans Display  | 700    | -0.1px         | Card headings       |
| h5     | 18px           | 16px          | 1.4         | Noto Sans Display  | 700    | 0              | Minor headings      |
| h6     | 16px           | 14px          | 1.4         | Noto Sans Display  | 700    | 0              | Small headings      |
| Large  | 20px           | 18px          | 1.5         | Montserrat         | 400    | 0              | Featured text       |
| Body   | 16px           | 16px          | 1.5         | Montserrat         | 400    | 0              | Main content        |
| Small  | 14px           | 14px          | 1.4         | Montserrat         | 400    | 0              | Secondary content   |
| XSmall | 12px           | 12px          | 1.4         | Montserrat         | 400    | 0              | Captions, footnotes |
| Button | 14px           | 14px          | 1           | Montserrat         | 500    | 0.05em         | Button text         |
| Nav    | 14px           | 14px          | 1           | Montserrat         | 600    | 0.05em         | Navigation text     |

## Text Styles

### Headings

Headings use Noto Sans Display with bold weight and negative letter spacing for a brutalist, impactful appearance.

```html
<h1 class="text-3xl md:text-5xl font-bold tracking-tight">Page Title</h1>
<h2 class="text-2xl md:text-4xl font-bold tracking-tight">Section Heading</h2>
<h3 class="text-xl md:text-2xl font-bold tracking-tight">Subsection Heading</h3>
```

### Body Text

Body text uses Montserrat with regular weight for optimal readability.

```html
<p class="text-base text-omnis-white">Main content text goes here.</p>
<p class="text-sm text-omnis-lightgray">Secondary content text goes here.</p>
```

### Special Text Elements

#### Logo Text

The OMNIS logo uses Noto Serif Display with specific letter spacing.

```html
<span class="font-logo text-5xl md:text-6xl tracking-[-2.8px]">OMNIS</span>
```

#### Button Text

Button text uses Montserrat Medium in uppercase with slight letter spacing.

```html
<button class="text-sm font-medium tracking-widest uppercase">
  Button Text
</button>
```

#### Navigation Text

Navigation text uses Montserrat Semibold in uppercase with slight letter spacing.

```html
<a class="text-sm font-semibold tracking-widest uppercase">Navigation Link</a>
```

## Text Colors

| Color      | Hex Code  | Usage                                       |
| ---------- | --------- | ------------------------------------------- |
| White      | `#F9F9F9` | Primary text color on dark backgrounds      |
| Light Gray | `#AAAAAA` | Secondary text, placeholders, disabled text |
| Black      | `#0A0A0A` | Primary text color on light backgrounds     |
| Gray       | `#333333` | Secondary text on light backgrounds         |

## Typography Guidelines

### Case Usage

- **UPPERCASE**: Logo, buttons, navigation, section labels, product categories
- **Sentence case**: Body text, product descriptions, informational content
- **Title Case**: Page titles, product names, important headings

### Alignment

- **Left-aligned**: Most text content, especially paragraphs and lists
- **Center-aligned**: Hero text, section headings, promotional content
- **Right-aligned**: Used sparingly, typically for numerical data or specific UI elements

### Line Length

- Aim for 60-75 characters per line for optimal readability
- Use appropriate container widths to control line length
- Consider multiple columns for long-form content on large screens

### Hierarchy & Emphasis

- Use font weight (bold, semibold) for primary emphasis
- Use color (white vs. light gray) for secondary emphasis
- Use size differences to establish clear hierarchy
- Use letter spacing for stylistic emphasis in uppercase text

### Responsive Typography

- Use responsive font sizes for headings (smaller on mobile)
- Maintain consistent body text size across devices for readability
- Adjust line height slightly for different screen sizes
- Consider reduced letter spacing on very small screens

## Implementation

### Font Loading

Fonts are loaded via Google Fonts in the global CSS file:

```css
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Noto+Serif+Display:wght@400;500;600;700&family=Noto+Sans+Display:wght@400;500;700;900&display=swap");
```

### Font Family Classes

Font families are defined in the Tailwind configuration:

```js
fontFamily: {
  sans: ['Montserrat', 'sans-serif'],
  heading: ['Noto Sans Display', 'sans-serif'],
  logo: ['Noto Serif Display', 'serif'],
}
```

### Usage in Components

```jsx
// Heading example
<h2 className="font-heading text-2xl md:text-4xl font-bold tracking-tight mb-6">
  Our Collection
</h2>

// Body text example
<p className="font-sans text-base text-omnis-lightgray mb-4">
  Discover our premium streetwear designed for the modern individual.
</p>

// Logo example
<span className="font-logo text-5xl md:text-6xl tracking-[-2.8px]">
  OMNIS
</span>
```

## Accessibility Considerations

- Maintain sufficient color contrast (minimum 4.5:1 for normal text)
- Don't rely solely on color to convey meaning
- Allow text to be resized up to 200% without breaking layouts
- Use actual text instead of text in images whenever possible
- Ensure proper heading hierarchy (h1 → h2 → h3)
- Use appropriate font sizes for readability (minimum 16px for body text)

## Common Typography Patterns

### Product Card Typography

```jsx
<div className="product-card">
  <img src="product.jpg" alt="Product Name" />
  <h3 className="text-lg font-bold mt-2">Product Name</h3>
  <p className="text-omnis-lightgray">$99.00</p>
</div>
```

### Hero Section Typography

```jsx
<div className="hero-section">
  <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
    Premium Streetwear
  </h1>
  <p className="text-xl text-omnis-lightgray mb-8">
    Designed for the modern individual
  </p>
  <Button size="lg">SHOP NOW</Button>
</div>
```

### Form Label Typography

```jsx
<label className="text-sm font-medium mb-2 block">
  Email Address
</label>
<input
  type="email"
  placeholder="Your email address"
  className="w-full p-3 bg-transparent border border-omnis-white"
/>
```

## Typography Don'ts

- Don't mix too many font weights in the same component
- Don't use Noto Serif Display for anything other than the logo without explicit approval
- Don't use font sizes smaller than 12px
- Don't use justified text alignment (can create uneven spacing)
- Don't use more than 3 levels of hierarchy in a single component
- Don't use decorative or script fonts that don't align with the brutalist aesthetic
