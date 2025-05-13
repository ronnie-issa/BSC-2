# Project Infrastructure

- User prefers npm as package manager and wants to stay on Netlify's free plan (limited to 300 minutes of build time)
- User prefers to commit changes but not push to remote unless explicitly instructed
- User wants comprehensive documentation for configuration changes needed when launching to production or creating whitelabel versions
- User prefers Context7 to be set up globally in VSCode to run automatically on all projects, not as a project-specific dependency, using the stdio configuration from Context7 documentation.
- User expects Context7 to run automatically without manual intervention.
- User prefers simpler, optimized code implementations with fewer lines of code (under 600 lines).
- When researching library issues, always use the Context7 API method (resolve-library-id_npx followed by get-library-docs_npx) as it has proven more reliable than direct Context7 connections.
- User prefers using the Context7 API method for research as it worked successfully in the past.
- User prefers using Context7 to diagnose and fix performance issues like slow click handlers.
- The project already has lazy loading and responsive image sizes implemented.

# CMS Implementation

- User is implementing Contentful for managing products (6 total: 3 featured for homepage, 3 non-featured for shop page)
- User wants to implement rich text rendering for product descriptions using @contentful/rich-text-react-renderer
- User wants product sorting on the website to automatically sync with Contentful admin sorting
- User prefers embedding variations directly within products as an Object field rather than using references
- User prefers human-readable URLs derived from product titles, handling duplicates with numerical suffixes
- User is concerned about API request volume, particularly Contentful API calls during typical user journeys
- User prefers price numbers to be formatted with commas for thousands but without decimal places (e.g., $1,000 instead of $1,000.00) in Contentful.

# Email Functionality

- User wants is using Resend for email delivery
- User uses kevin@abouhanna.com for Resend and plans to use a custom domain email for all services when going live
- User wants welcome emails and order confirmation emails following marketing best practices
- User prefers using only inline HTML templates for email customization rather than React Email
- User wants the newsletter subscription system to prevent duplicate email subscriptions in production
- User wants documentation on customizing email templates and testing the email system
- User wants to integrate Loop with Resend to have a WYSIWYG editor for email templates when the website goes live.

# UI/UX Design System

- User follows Brutalist design with no border radiuses, using Primary/Secondary/Outline button hierarchy
- User prefers Noto Sans Display font for typography everywhere except for the Omnis logo and name-related elements.
- User prefers Noto Serif Display for the OMNIS logo with -2.8px letter spacing
- User wants the logo to start large in center of homepage and shrink into header when scrolling
- User wants hamburger menu to be 2 lines that animate into an axe shape when clicked
- User prefers consistent UI elements, border styling, spacing, and page transitions with fade-in effects
- User prefers toast notifications to slide down from the navbar with white background
- User prefers circular elements with black backgrounds and white borders for numbered steps
- User wants to prioritize creating design system documentation
- User prefers skeleton loaders for product card images instead of placeholder images to avoid glitchy loading effects.
- User prefers 1.5 pixel stroke width for Lucide icons as a middle ground between the thin (1px) and standard (2px) variants.
- React Lucide icons have a thin line variant that can be used for alternative styling.
- User wants a luxurious, professional-looking navbar design.
- User has previously used Spline without the 'built with Spline' watermark and prefers implementations without it.
- User prefers a minimum height of 480px for 3D canvas elements.

# Shopping Experience

- User wants a dropdown menu from shopping bag icon showing cart items
- User prefers quantity dropdown with maximum of 20 items, displaying 'QTY:#' on button
- User prefers using 'variation' instead of 'color' throughout the site
- User prefers font weight 700 (bold) for product names
- User prefers the BAG button in mobile menu to navigate directly to the Bag page
- User wants product variations to load different images when selected, with variation switching only on product detail pages
- User prefers 2px padding for cart icon SVG in navbar and wants the badge indicator to have negative top and right positioning instead of 0 to be closer to the icon.
- User wants product variation images to be consistently displayed across all interfaces (dropdown, bag page, checkout, confirmation page, emails) when a user selects a specific variation.
- User wants a loading animation on the total price in the bag page when changing product quantity to simulate calculation.

# Order Confirmation Page

- User prefers a luxurious black and white design with 'What's Next' section on left and 'Order Details' on right
- User wants the page to include product details and a brief mention of the shipping address
- User prefers a simplified financial summary showing only the total amount under the items list
- The order confirmation page should have a 'continue shopping' button that follows the established button system
