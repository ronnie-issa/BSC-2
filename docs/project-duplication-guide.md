# Project Duplication & Whitelabeling Guide

This guide provides step-by-step instructions for duplicating the OMNIS e-commerce platform and whitelabeling it for a different brand or company. Follow these steps to create a new instance of the project with custom branding, content, and configuration.

## Overview

Duplicating this project involves:

1. Creating new instances of all services (GitHub, Netlify, Contentful, Resend)
2. Setting up new API keys and environment variables
3. Customizing branding and content
4. Deploying to a new domain

## Step 1: Repository Setup

### 1.1 Create a New GitHub Repository

- Create a new repository in your GitHub account or organization
- Clone the original OMNIS repository
- Push to the new repository with a new remote:

```bash
git clone https://github.com/kevinabouhanna/omniscape.git new-brand-name
cd new-brand-name
rm -rf .git
git init
git add .
git commit -m "Initial commit from OMNIS template"
git remote add origin https://github.com/your-account/new-brand-name.git
git push -u origin main
```

### 1.2 Update Package Information

Edit `package.json`:

```json
{
  "name": "your-brand-name",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  // ... rest of the file
}
```

## Step 2: Service Setup

### 2.1 Contentful Setup

1. **Create a new Contentful space**:
   - Log in to Contentful or create a new account
   - Create a new space for your brand
   - Note the Space ID for later use

2. **Create content model**:
   - Create the following content types:
     - Product (with all fields from the original project)
     - Variations
     - Sizes
   - Set up validations and required fields

3. **Generate API keys**:
   - Create a new API key for the space
   - Note the Content Delivery API access token
   - Note the Content Preview API access token

### 2.2 Netlify Setup

1. **Create a new Netlify site**:
   - Log in to Netlify or create a new account
   - Click "New site from Git"
   - Connect to your GitHub repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`

2. **Configure environment variables**:
   - Go to Site settings > Environment variables
   - Add all required variables (see Environment Variables section below)

3. **Set up functions**:
   - Ensure functions directory is set to `functions`
   - Deploy to initialize the site

### 2.3 Resend Setup

1. **Create a new Resend account**:
   - Sign up for Resend or log in
   - Set up your domain for sending emails
   - Generate an API key
   - Note the API key for later use

## Step 3: Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# GitHub configuration for subscriber storage
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_OWNER=your_github_username
GITHUB_REPO=your_new_repository_name

# CMS configuration
CMS_PASSWORD=your_cms_password

# Netlify site URL (used for function-to-function communication)
URL=https://your-netlify-site-name.netlify.app

# Contentful credentials
CONTENTFUL_SPACE_ID=your_new_space_id
CONTENTFUL_ACCESS_TOKEN=your_new_access_token
CONTENTFUL_PREVIEW_TOKEN=your_new_preview_token
CONTENTFUL_ENVIRONMENT=master

# Email configuration
FROM_EMAIL=hello@your-brand-domain.com

# Resend API Key (for email delivery)
RESEND_API_KEY=your_new_resend_api_key
```

Also update `netlify.env.toml`:

```toml
[build.environment]
  # GitHub configuration
  GITHUB_OWNER = "your_github_username"
  GITHUB_REPO = "your_new_repository_name"
  # Don't include GITHUB_TOKEN here for security reasons

  # Netlify site URL
  URL = "https://your-netlify-site-name.netlify.app"

  # Don't include Resend API key here for security reasons
  # Add it manually in the Netlify dashboard
```

## Step 4: Branding Customization

### 4.1 Update Constants

Edit `functions/constants.js`:

```javascript
// Default domain to use if URL environment variable is not set
exports.DEFAULT_DOMAIN = 'https://your-netlify-site-name.netlify.app';

// Default sender email to use if FROM_EMAIL environment variable is not set
exports.DEFAULT_SENDER = 'YOUR-BRAND <onboarding@resend.dev>';

// Email subjects
exports.EMAIL_SUBJECTS = {
  WELCOME: 'Welcome to YOUR-BRAND Newsletter',
  ORDER_CONFIRMATION: 'YOUR-BRAND Order Confirmation'
};

// ... rest of the file
```

### 4.2 Update Email Templates

Edit `functions/email-templates.js` to update:
- Brand name
- Colors
- Logo
- Footer information
- Contact details

### 4.3 Update Styling

Edit `src/styles/global.css` to update:
- Color scheme
- Typography
- Any brand-specific styling

```css
:root {
  --background: 0 0% 3%; /* Update with your brand colors */
  --foreground: 0 0% 98%;
  /* ... other color variables */
}
```

### 4.4 Update Logo and Assets

1. Replace logo files in `public/` directory
2. Update favicon and other brand assets
3. Update meta images for social sharing

## Step 5: Content Creation

### 5.1 Create Products in Contentful

1. Log in to your Contentful space
2. Create products with:
   - Product name
   - Price
   - Description (rich text)
   - Images
   - Variations
   - Sizes
   - Featured flag (for homepage products)

### 5.2 Update Contact Information

Update WhatsApp contact information in:
- `src/pages/CheckoutPage.tsx`
- `src/pages/ProductPage.tsx`

## Step 6: Testing

Before going live, test the following:

1. **Local development**:
   ```bash
   npm run dev
   ```

2. **Netlify functions locally**:
   ```bash
   npm run netlify:dev
   ```

3. **Test all features**:
   - Product browsing
   - Add to bag
   - Checkout process
   - Newsletter subscription
   - Email sending

## Step 7: Deployment

### 7.1 Deploy to Netlify

```bash
npm run deploy
```

Or set up continuous deployment from your GitHub repository.

### 7.2 Set Up Custom Domain

1. Register your domain if you haven't already
2. Add the domain in Netlify dashboard
3. Configure DNS settings as directed by Netlify
4. Enable HTTPS

### 7.3 Update Environment Variables for Production

Update the `URL` environment variable in Netlify to your custom domain.

## Step 8: Post-Launch

### 8.1 Monitor Performance

- Set up analytics
- Monitor error logs
- Check email deliverability

### 8.2 SEO Optimization

- Update meta tags for your brand
- Create a sitemap
- Submit to search engines

## Customization Reference

### Key Files for Branding

| File | Purpose | What to Change |
|------|---------|----------------|
| `src/styles/global.css` | Global styling | Colors, typography, spacing |
| `src/components/ui/logo.tsx` | Logo component | Logo SVG or image |
| `src/components/Header.tsx` | Site header | Navigation, layout |
| `src/components/Footer.tsx` | Site footer | Contact info, social links |
| `functions/email-templates.js` | Email templates | Email design, copy, branding |
| `public/favicon.ico` | Favicon | Brand icon |
| `public/logo.svg` | Logo file | Brand logo |

### Key Files for Configuration

| File | Purpose | What to Change |
|------|---------|----------------|
| `.env.example` | Environment variables template | API keys, credentials |
| `netlify.env.toml` | Netlify environment config | Site URL, GitHub info |
| `netlify.toml` | Netlify build config | Redirects, functions config |
| `functions/constants.js` | Shared constants | Domain, sender email, messages |
| `vite.config.ts` | Build configuration | Environment variables, server config |

## Troubleshooting

### Common Issues

1. **API Key Issues**:
   - Ensure all API keys are correctly set in environment variables
   - Check access permissions for the keys

2. **Build Failures**:
   - Check build logs in Netlify
   - Verify all dependencies are installed

3. **Email Sending Issues**:
   - Verify Resend API key
   - Check domain verification status
   - Test email templates

4. **Content Loading Issues**:
   - Verify Contentful space ID and access tokens
   - Check content model structure matches code expectations

---

This guide provides a comprehensive approach to duplicating and whitelabeling the OMNIS e-commerce platform. By following these steps, you can create a new branded instance of the project with custom content, styling, and configuration.
