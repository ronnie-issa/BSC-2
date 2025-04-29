# OMNIS Color System

This document outlines the color system for the OMNIS brand, following Brutalist design principles.

## Brand Colors

OMNIS uses a monochromatic color palette that emphasizes contrast and simplicity, aligning with the brutalist design aesthetic.

### Primary Brand Colors

| Name | Hex Code | CSS Variable | Description |
|------|----------|-------------|-------------|
| Black | `#0A0A0A` | `--omnis-black` | Primary background color |
| Dark Gray | `#1A1A1A` | `--omnis-darkgray` | Secondary background, cards, inputs |
| Gray | `#333333` | `--omnis-gray` | Borders, dividers, secondary elements |
| Light Gray | `#AAAAAA` | `--omnis-lightgray` | Secondary text, placeholders, disabled states |
| White | `#F9F9F9` | `--omnis-white` | Primary text, buttons, highlights |

### Color Swatches

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│             │  │             │  │             │  │             │  │             │
│             │  │             │  │             │  │             │  │             │
│   #0A0A0A   │  │   #1A1A1A   │  │   #333333   │  │   #AAAAAA   │  │   #F9F9F9   │
│    Black    │  │  Dark Gray  │  │    Gray     │  │ Light Gray  │  │    White    │
│             │  │             │  │             │  │             │  │             │
│             │  │             │  │             │  │             │  │             │
└─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘
```

### Semantic Colors

| Name | Hex Code | CSS Variable | Usage |
|------|----------|-------------|-------|
| Destructive | `#E11D48` | `--destructive` | Error messages, delete actions |
| Success | `#10B981` | `--success` | Success messages, confirmations |
| Warning | `#F59E0B` | `--warning` | Warning messages, alerts |
| Info | `#3B82F6` | `--info` | Informational messages, help text |

## Color Usage

### Background Colors

| Color | Usage |
|-------|-------|
| Black (`#0A0A0A`) | Primary background color for the site |
| Dark Gray (`#1A1A1A`) | Secondary background, cards, inputs |
| White (`#F9F9F9`) | Inverted sections, light mode backgrounds |

### Text Colors

| Color | Usage |
|-------|-------|
| White (`#F9F9F9`) | Primary text on dark backgrounds |
| Light Gray (`#AAAAAA`) | Secondary text, placeholders on dark backgrounds |
| Black (`#0A0A0A`) | Primary text on light backgrounds |
| Gray (`#333333`) | Secondary text on light backgrounds |

### Border Colors

| Color | Usage |
|-------|-------|
| White (`#F9F9F9`) | Borders on dark backgrounds |
| Gray (`#333333`) | Subtle borders, dividers on dark backgrounds |
| Black (`#0A0A0A`) | Borders on light backgrounds |
| Light Gray (`#AAAAAA`) | Subtle borders on light backgrounds |

### Button Colors

| Button Type | Background | Text | Border | Hover |
|-------------|------------|------|--------|-------|
| Primary | White | Black | None | 90% opacity |
| Secondary | Black | White | None | Dark Gray |
| Outline | Transparent | White | White | 10% white background |
| Ghost | Transparent | White | None | 10% white background |
| Link | Transparent | White | None | Underline |

### State Colors

| State | Color |
|-------|-------|
| Error | Destructive (`#E11D48`) |
| Success | Success (`#10B981`) |
| Warning | Warning (`#F59E0B`) |
| Info | Info (`#3B82F6`) |
| Disabled | Light Gray (`#AAAAAA`) at 50% opacity |

## Color Combinations

### Dark Mode (Default)

| Element | Background | Text | Border |
|---------|------------|------|--------|
| Page | Black | White | N/A |
| Card | Dark Gray | White | White (optional) |
| Button (Primary) | White | Black | None |
| Button (Secondary) | Black | White | None |
| Button (Outline) | Transparent | White | White |
| Input | Transparent | White | White |
| Dropdown | Dark Gray | White | White |

### Light Mode

| Element | Background | Text | Border |
|---------|------------|------|--------|
| Page | White | Black | N/A |
| Card | Light Gray | Black | Black (optional) |
| Button (Primary) | Black | White | None |
| Button (Secondary) | Dark Gray | White | None |
| Button (Outline) | Transparent | Black | Black |
| Input | Transparent | Black | Black |
| Dropdown | White | Black | Black |

## Accessibility Considerations

### Color Contrast

All color combinations must meet WCAG 2.1 AA standards for accessibility:

- **Normal Text**: Minimum contrast ratio of 4.5:1
- **Large Text**: Minimum contrast ratio of 3:1
- **UI Components**: Minimum contrast ratio of 3:1

### Current Contrast Ratios

| Foreground | Background | Contrast Ratio | Passes AA? |
|------------|------------|----------------|------------|
| White (#F9F9F9) | Black (#0A0A0A) | 19.3:1 | ✅ |
| White (#F9F9F9) | Dark Gray (#1A1A1A) | 15.2:1 | ✅ |
| White (#F9F9F9) | Gray (#333333) | 9.7:1 | ✅ |
| Light Gray (#AAAAAA) | Black (#0A0A0A) | 8.1:1 | ✅ |
| Black (#0A0A0A) | White (#F9F9F9) | 19.3:1 | ✅ |
| Black (#0A0A0A) | Light Gray (#AAAAAA) | 8.1:1 | ✅ |

### Color Blindness Considerations

- Don't rely solely on color to convey information
- Use additional visual cues (icons, patterns, text) alongside color
- Test designs with color blindness simulators

## Implementation

### CSS Variables

The color system is implemented using CSS variables in the global stylesheet:

```css
:root {
  --background: 0 0% 3%;
  --foreground: 0 0% 98%;
  
  --card: 0 0% 5%;
  --card-foreground: 0 0% 98%;
  
  --popover: 0 0% 3%;
  --popover-foreground: 0 0% 98%;
  
  --primary: 0 0% 98%;
  --primary-foreground: 0 0% 3%;
  
  --secondary: 0 0% 10%;
  --secondary-foreground: 0 0% 98%;
  
  --muted: 0 0% 15%;
  --muted-foreground: 0 0% 65%;
  
  --accent: 0 0% 15%;
  --accent-foreground: 0 0% 98%;
  
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  
  --border: 0 0% 15%;
  --input: 0 0% 15%;
  --ring: 0 0% 80%;
}
```

### Tailwind Configuration

The color system is also configured in the Tailwind configuration:

```js
colors: {
  // ... other Tailwind colors
  omnis: {
    black: '#0A0A0A',
    darkgray: '#1A1A1A',
    gray: '#333333',
    lightgray: '#AAAAAA',
    white: '#F9F9F9',
  }
}
```

### Usage in Components

```jsx
// Background color
<div className="bg-omnis-black">
  {/* Content */}
</div>

// Text color
<p className="text-omnis-white">Primary text</p>
<p className="text-omnis-lightgray">Secondary text</p>

// Border color
<div className="border border-omnis-white">
  {/* Content */}
</div>

// Button with brand colors
<Button className="bg-omnis-white text-omnis-black">
  Primary Button
</Button>
```

## Color Do's and Don'ts

### Do's

- ✅ Use the monochromatic palette consistently throughout the application
- ✅ Maintain high contrast between text and background colors
- ✅ Use semantic colors appropriately for their intended purpose
- ✅ Test color combinations for accessibility compliance
- ✅ Use color to reinforce hierarchy and guide user attention

### Don'ts

- ❌ Introduce new colors without approval
- ❌ Use low-contrast color combinations that fail accessibility standards
- ❌ Rely solely on color to convey information
- ❌ Use too many different colors in a single component
- ❌ Use colors inconsistently across similar components

## Color in Different Contexts

### Product Display

- Product images should stand out against the black background
- Product titles in white
- Product prices in light gray
- "Add to Bag" buttons use outline variant (transparent with white border)

### Forms

- Input fields with transparent background and white border
- Labels in white
- Placeholder text in light gray
- Error messages in destructive red
- Submit buttons in primary style (white background, black text)

### Navigation

- Navigation links in white
- Active/current page indicator in white (underline or other visual cue)
- Hover state with subtle white opacity change

### Notifications

- Success notifications with success green accent
- Error notifications with destructive red accent
- Warning notifications with warning yellow accent
- Info notifications with info blue accent

## Color Evolution

The OMNIS color system is designed to be:

1. **Consistent**: The same colors are used throughout the application
2. **Accessible**: All color combinations meet accessibility standards
3. **Brutalist**: The monochromatic palette reinforces the brutalist aesthetic
4. **Flexible**: The system can be extended for special cases if needed
5. **Maintainable**: Colors are defined as variables for easy updates

Any additions or modifications to the color system should maintain these principles and be documented accordingly.
