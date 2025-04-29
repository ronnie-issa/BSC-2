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

Using **Resend** for email delivery:

- Sends welcome emails to new newsletter subscribers
- Sends order confirmation emails to customers
- Uses HTML email templates for consistent styling
- Requires Resend API key configured in environment variables
- Sender email can be customized through environment variables
- Provides excellent deliverability and tracking capabilities

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

# Email configuration
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=your_sender_email@example.com
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

## API Usage and Optimization

The project is optimized to minimize API calls while maintaining a responsive user experience:

### Contentful API Usage

- API requests are cached for 2 minutes to reduce the number of calls
- A typical user journey (browsing to checkout) uses only 1-3 Contentful API requests
- Featured products are filtered from cached data when possible
- Individual product data is cached separately for efficient retrieval
- Rich text content is properly rendered with the Contentful Rich Text Renderer

### Resend API Usage

- Email sending is handled through Netlify serverless functions
- Order confirmation emails include detailed order information
- Welcome emails are sent to new newsletter subscribers
- Email templates use responsive HTML for optimal viewing on all devices
- Error handling ensures users are notified of any issues with email delivery

## Future Considerations

### Potential Framework Migration

The project is currently considering a migration to one of the following frameworks:

- **Astro**: Offers excellent performance with partial hydration, strong SEO capabilities, and lower server costs
- **Next.js**: Provides robust SSR/SSG capabilities with a mature ecosystem, but higher server costs
- **SvelteKit**: Delivers excellent performance with smaller bundle sizes and intuitive syntax
- **React (current)**: Maintains the existing codebase with its large ecosystem and flexibility

Key considerations for the migration include:

- SEO performance
- Page load speed and Core Web Vitals
- Accessibility compliance
- Contentful integration capabilities
- Development experience and maintainability
- Hosting costs and scalability

### Subscriber Management

- Current implementation stores subscribers in a JSON file via GitHub
- Future implementation may use a dedicated database for better scalability
- Potential integration with email marketing platforms for campaign management
