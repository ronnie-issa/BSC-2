## Service Dependencies

This project relies on several external services to function properly:

### Core Services

1. **Netlify**

   - Hosts the website and static assets
   - Provides serverless functions for backend operations
   - Handles form submissions and redirects
   - Manages environment variables and build settings
   - Production URL: https://omnis-lb.netlify.app/

2. **Contentful**

   - Headless CMS for managing product data
   - Stores product images and serves them through its CDN
   - Provides Content Delivery API for fetching published content
   - Provides Content Preview API for testing draft content
   - Requires Space ID and API keys configured in environment variables

3. **GitHub**
   - Stores the codebase and enables version control
   - Manages subscriber data through the GitHub API
   - Stores subscriber information in a JSON file in the repository
   - Requires a GitHub Personal Access Token for API operations
   - Used for continuous deployment through Netlify integration

### Email Services

Currently using **Mailjet** for email delivery:

- Sends welcome emails to new newsletter subscribers
- Requires API key and Secret key configured in environment variables
- Sender email must be verified in Mailjet

Planned migration to **Resend** (see TODO.md):

- Will provide React-based email templates
- Will handle welcome emails and order confirmations
- Will offer better developer experience and Next.js compatibility

### Environment Variables

The following environment variables must be configured for the project to work:

```
# GitHub configuration
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_OWNER=your_github_username
GITHUB_REPO=your_github_repository

# Contentful configuration
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_PREVIEW_TOKEN=your_preview_token
CONTENTFUL_ENVIRONMENT=master

# Netlify site URL
URL=https://your-netlify-site-name.netlify.app
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
- Rich text format is supported for product descriptions
- Images are served through Contentful's CDN with automatic optimizations

### Content Management

- Products can be added, edited, and removed through the Contentful web interface
- Changes can be previewed before publishing using the preview mode
- Content can be scheduled for future publishing
- Multiple users can collaborate on content creation and management