# OMNIS Design System

This document outlines the comprehensive design system for the OMNIS brand, following Brutalist design principles.

## Design Principles

- **Brutalist Aesthetic**: Clean, minimal, and functional design
- **No Border Radius**: All UI elements have square corners (no rounded edges)
- **Clear Hierarchy**: Each component type has a distinct purpose and visual style
- **Consistent Styling**: Components maintain consistent styling across the site
- **Mode Support**: Components support both dark mode (default) and light mode contexts
- **Accessibility**: All components are designed to be accessible to all users

## Color System

### Brand Colors

| Name | Hex Code | Usage |
|------|----------|-------|
| Black | `#0A0A0A` | Primary background color |
| Dark Gray | `#1A1A1A` | Secondary background, cards, inputs |
| Gray | `#333333` | Borders, dividers, secondary elements |
| Light Gray | `#AAAAAA` | Secondary text, placeholders, disabled states |
| White | `#F9F9F9` | Primary text, buttons, highlights |

### Semantic Colors

| Name | Usage |
|------|-------|
| Destructive | Error messages, delete actions |
| Muted | Background elements, disabled states |
| Accent | Highlights, focus states |

### Color Usage Guidelines

1. Use **Black** as the primary background color for the site
2. Use **White** for primary text and important UI elements
3. Use **Light Gray** for secondary text and less important information
4. Use **Dark Gray** for cards, inputs, and secondary backgrounds
5. Use **Gray** for borders, dividers, and tertiary elements
6. Use **Destructive** colors sparingly, only for errors and critical actions

## Typography System

### Font Families

| Family | Usage | Font Weight |
|--------|-------|-------------|
| Montserrat | Body text, UI elements | 300, 400, 500, 600, 700, 800 |
| Red Hat Display | Headings, titles | 400, 500, 700, 900 |
| Noto Serif Display | Logo, special headings | 400, 500, 600, 700 |

### Text Styles

| Style | Font | Weight | Size | Line Height | Letter Spacing | Usage |
|-------|------|--------|------|-------------|----------------|-------|
| Logo | Noto Serif Display | 400 | 60px (40px mobile) | 1.1 | -2.8px | OMNIS logo |
| H1 | Red Hat Display | 700 | 48px | 1.1 | -0.5px | Page titles |
| H2 | Red Hat Display | 700 | 36px | 1.2 | -0.3px | Section headings |
| H3 | Red Hat Display | 700 | 24px | 1.3 | -0.2px | Subsection headings |
| Body | Montserrat | 400 | 16px | 1.5 | 0 | Main content |
| Small | Montserrat | 400 | 14px | 1.4 | 0 | Secondary content |
| Button | Montserrat | 500 | 14px | 1 | 0.05em | Button text |
| Caption | Montserrat | 400 | 12px | 1.4 | 0 | Captions, footnotes |

### Typography Guidelines

1. Use **Red Hat Display** for all headings
2. Use **Montserrat** for all body text and UI elements
3. Use **Noto Serif Display** only for the OMNIS logo and special brand elements
4. Maintain consistent font weights across similar elements
5. Use uppercase for buttons, navigation, and brand elements
6. Use sentence case for body text and product descriptions

## Spacing System

### Spacing Scale

| Name | Size | Usage |
|------|------|-------|
| xs | 4px | Minimal spacing, icons |
| sm | 8px | Tight spacing, compact elements |
| md | 16px | Standard spacing between elements |
| lg | 24px | Generous spacing, section padding |
| xl | 32px | Large spacing, section margins |
| 2xl | 48px | Extra large spacing, page sections |
| 3xl | 64px | Maximum spacing, hero sections |

### Spacing Guidelines

1. Use consistent spacing within components
2. Use larger spacing between sections
3. Maintain consistent vertical rhythm throughout the page
4. Adjust spacing responsively for different screen sizes
5. Use the spacing scale for margins, paddings, and gaps

## Border System

### Border Widths

| Width | Usage |
|-------|-------|
| 1px | Standard borders, dividers |
| 2px | Emphasized borders, active states |

### Border Colors

| Color | Usage |
|-------|-------|
| White | Light borders on dark backgrounds |
| Black | Dark borders on light backgrounds |
| Gray | Subtle borders, dividers |

### Border Guidelines

1. Use consistent border widths throughout the application
2. Use borders to create clear separation between elements
3. Use border color to indicate state (active, hover, disabled)
4. Maintain consistent border styling across similar components

## Component System

### Button Component

See [Button System Documentation](./button-system.md) for detailed information.

### Card Component

Cards are used to group related information and actions.

**Variants:**
- **Default**: Black background with white text
- **Inverted**: White background with black text

**Guidelines:**
- Use cards to group related content
- Maintain consistent padding within cards
- Use appropriate spacing between cards
- Ensure card content follows typography guidelines

### Input Component

Inputs are used to collect user data.

**Variants:**
- **Default**: Transparent background with white border
- **Filled**: Dark gray background with white border

**States:**
- **Default**: Standard border
- **Focus**: Highlighted border
- **Disabled**: Reduced opacity, no interaction
- **Error**: Destructive border and error message

**Guidelines:**
- Use consistent height for inputs (46px)
- Align input heights with button heights when used together
- Use appropriate padding for text within inputs
- Provide clear focus states for accessibility

### Navigation Component

Navigation elements guide users through the application.

**Variants:**
- **Primary**: Main navigation in header
- **Secondary**: Footer navigation, breadcrumbs
- **Mobile**: Hamburger menu with animated transitions

**Guidelines:**
- Use consistent spacing between navigation items
- Provide clear hover and active states
- Ensure navigation is accessible via keyboard
- Use underlines positioned close to text for hover states

### Toast Component

Toasts provide feedback to user actions.

**Variants:**
- **Default**: White background with black text
- **Success**: Success background with appropriate text
- **Error**: Destructive background with white text
- **Warning**: Warning background with appropriate text

**Guidelines:**
- Position toasts at the top of the screen, below the navbar
- Use consistent width for all toasts
- Provide auto-dismiss functionality after appropriate time
- Ensure toasts are accessible and can be dismissed manually

## Animation System

### Transition Durations

| Duration | Usage |
|----------|-------|
| Fast (150ms) | Micro-interactions, hover states |
| Medium (300ms) | Standard transitions, UI changes |
| Slow (500ms) | Page transitions, major UI changes |
| Very Slow (800ms+) | Hero animations, special effects |

### Animation Types

| Type | Usage |
|------|-------|
| Fade | Opacity changes, subtle transitions |
| Slide | Movement transitions, page changes |
| Scale | Size changes, emphasis |
| Transform | Complex movements, special effects |

### Animation Guidelines

1. Use animations purposefully, not decoratively
2. Maintain consistent timing for similar animations
3. Ensure animations don't interfere with usability
4. Provide reduced motion options for accessibility
5. Use appropriate easing functions for natural movement

## Responsive Design System

### Breakpoints

| Name | Size | Description |
|------|------|-------------|
| xs | < 640px | Mobile phones |
| sm | >= 640px | Large phones, small tablets |
| md | >= 768px | Tablets, small laptops |
| lg | >= 1024px | Laptops, desktops |
| xl | >= 1280px | Large desktops |
| 2xl | >= 1536px | Extra large screens |

### Responsive Guidelines

1. Design for mobile first, then expand to larger screens
2. Use fluid typography and spacing where appropriate
3. Adjust layout and component sizes at appropriate breakpoints
4. Ensure all content is accessible on all screen sizes
5. Test thoroughly across different devices and screen sizes

## Accessibility Guidelines

1. Maintain sufficient color contrast (WCAG AA minimum)
2. Provide keyboard navigation for all interactive elements
3. Include appropriate ARIA labels for complex components
4. Ensure form elements have associated labels
5. Support screen readers with semantic HTML
6. Provide alternatives for non-text content
7. Allow users to navigate using keyboard shortcuts
8. Ensure interactive elements have appropriate focus states

## Implementation Guidelines

1. Use the established component library for all UI elements
2. Follow the design system guidelines for all new components
3. Document any exceptions or special cases
4. Maintain consistency across similar components and pages
5. Use the design tokens defined in the system
6. Test components across different contexts and screen sizes
7. Ensure all components meet accessibility guidelines

## Design Decision Process

When making design decisions:

1. **Consistency First**: Does this match our existing patterns?
2. **Purpose**: Does this serve a clear user need?
3. **Simplicity**: Is this the simplest solution possible?
4. **Accessibility**: Is this accessible to all users?
5. **Brand Alignment**: Does this reflect our brutalist aesthetic?
6. **Documentation**: Have we documented the decision and guidelines?

## Special Cases and Exceptions

When a component needs to deviate from the design system:

1. Document the exception and the reasoning behind it
2. Limit the scope of the exception to specific use cases
3. Consider if the design system should be extended instead
4. Ensure the exception still maintains brand consistency
5. Review exceptions periodically to see if they should be standardized

---

This design system is a living document and will evolve as the OMNIS brand and product develop. All team members are encouraged to contribute to its improvement and expansion.
