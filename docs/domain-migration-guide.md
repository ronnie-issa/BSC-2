# Domain Migration Guide

This guide provides comprehensive instructions for migrating the OMNIS e-commerce platform from development to production with a custom domain. It covers all necessary configuration changes across services, APIs, and code.

## Service Accounts & Ownership Transfer

When migrating to production for a company, you'll need to create new accounts owned by the company rather than personal accounts:

### 1. GitHub Account Setup

- Create a new GitHub organization account for the company
- Transfer the repository to the company organization
- Set up appropriate team members and permissions
- Generate new GitHub Personal Access Token under the company account

### 2. Netlify Account Setup

- Create a new Netlify account using a company email (e.g., `admin@example.com`)
- Transfer the Netlify site to the company account
- Set up team members with appropriate access levels
- Connect the new GitHub organization account to Netlify

### 3. Contentful Account Setup

- Create a new Contentful account using a company email
- Create a new space for the production content
- Set up appropriate roles and permissions for team members
- Generate new API keys for the production environment

### 4. Resend Account Setup

- Create a new Resend account using a company email
- Verify the company domain for sending emails
- Generate new API keys for the production environment
- Set up appropriate team members and permissions

## Domain Configuration

### 1. Domain Registration

- Register the domain through a registrar (Namecheap, GoDaddy, etc.)
- Use company information for the domain registration
- Set up auto-renewal to prevent expiration
- Consider privacy protection services

### 2. DNS Configuration

- Set up DNS records for Netlify:
  ```
  A Record: @ points to Netlify's load balancer IP
  CNAME Record: www points to your Netlify site URL
  ```
- Set up DNS records for email (MX records)
- Set up DNS records for Resend email service:
  - DKIM records
  - SPF records
  - DMARC records

### 3. SSL Configuration

- Enable HTTPS in Netlify dashboard
- Force HTTPS for all visitors
- Set up SSL certificate renewal monitoring

## Environment Variables & API Keys

### 1. GitHub Configuration

| Variable     | Development Value     | Production Value                  |
| ------------ | --------------------- | --------------------------------- |
| GITHUB_TOKEN | Personal access token | Company organization access token |
| GITHUB_OWNER | Personal username     | Company organization name         |
| GITHUB_REPO  | Repository name       | Repository name (may be renamed)  |

### 2. Netlify Configuration

| Variable           | Development Value            | Production Value      |
| ------------------ | ---------------------------- | --------------------- |
| URL                | https://omnis-lb.netlify.app | https://example.com   |
| NETLIFY_AUTH_TOKEN | Personal token               | Company account token |

### 3. Contentful Configuration

| Variable                 | Development Value         | Production Value                            |
| ------------------------ | ------------------------- | ------------------------------------------- |
| CONTENTFUL_SPACE_ID      | Development space ID      | Production space ID                         |
| CONTENTFUL_ACCESS_TOKEN  | Development access token  | Production access token                     |
| CONTENTFUL_PREVIEW_TOKEN | Development preview token | Production preview token                    |
| CONTENTFUL_ENVIRONMENT   | master                    | master (or production-specific environment) |

### 4. Email Configuration

| Variable       | Development Value   | Production Value   |
| -------------- | ------------------- | ------------------ |
| FROM_EMAIL     | hello@omnis-lb.com  | hello@example.com  |
| RESEND_API_KEY | Development API key | Production API key |

## Code Updates

### 1. Configuration Files

| File                     | Line(s) | Current Value                                              | Replace With                                           |
| ------------------------ | ------- | ---------------------------------------------------------- | ------------------------------------------------------ |
| `.env.example`           | 12      | `URL=https://your-netlify-site-name.netlify.app`           | `URL=https://example.com`                              |
| `.env.example`           | 21      | `FROM_EMAIL=hello@omnis-lb.com`                            | `FROM_EMAIL=hello@example.com`                         |
| `netlify.env.toml`       | 6-7     | GitHub owner and repo                                      | Company GitHub details                                 |
| `netlify.env.toml`       | 11      | `URL = "https://omnis-lb.netlify.app"`                     | `URL = "https://example.com"`                          |
| `functions/constants.js` | 5       | `exports.DEFAULT_DOMAIN = 'https://omnis-lb.netlify.app'`  | `exports.DEFAULT_DOMAIN = 'https://example.com'`       |
| `functions/constants.js` | 8       | `exports.DEFAULT_SENDER = 'OMNIS <onboarding@resend.dev>'` | `exports.DEFAULT_SENDER = 'OMNIS <hello@example.com>'` |
| `vite.config.ts`         | -       | Environment variable definitions                           | Update if any new variables are added                  |

### 2. Email Templates

| File                           | Line(s) | Current Value                             | Replace With                                |
| ------------------------------ | ------- | ----------------------------------------- | ------------------------------------------- |
| `functions/email-templates.js` | 18      | `domain = 'https://omnis-lb.netlify.app'` | `domain = 'https://example.com'`            |
| `functions/email-templates.js` | 143     | `domain = 'https://omnis-lb.netlify.app'` | `domain = 'https://example.com'`            |
| `functions/email-templates.js` | -       | Email content and branding                | Update company name, logo, colors if needed |

### 3. Contact Information

| File                                  | Line(s) | Current Value                      | Replace With             |
| ------------------------------------- | ------- | ---------------------------------- | ------------------------ |
| `src/pages/OrderConfirmationPage.tsx` | 83      | Default shipping address           | Company address          |
| `src/pages/OrderConfirmationPage.tsx` | 317     | Default shipping address           | Company address          |
| `src/pages/CheckoutPage.tsx`          | 191     | WhatsApp number `96181386697`      | Company WhatsApp number  |
| `src/pages/CheckoutPage.tsx`          | 217     | WhatsApp contact `+961 81 386 697` | Company WhatsApp contact |
| `src/pages/ProductPage.tsx`           | 337     | WhatsApp number `96181386697`      | Company WhatsApp number  |
| `src/pages/ProductPage.tsx`           | 370     | WhatsApp contact `+961 81 386 697` | Company WhatsApp contact |

## Content Migration

### 1. Contentful Content

- Export content from development space
- Import content to production space
- Verify all content, including:
  - Products
  - Variations
  - Sizes
  - Media assets
- Update any development-specific content

### 2. Subscriber Data

- Export subscribers from development environment
- Import subscribers to production environment
- Ensure compliance with privacy laws when transferring customer data
- Consider sending a notification to subscribers about the domain change

## Testing Checklist

Before going live, test the following:

### 1. Functionality Testing

- [ ] Product browsing and filtering
- [ ] Product detail pages
- [ ] Add to bag functionality
- [ ] Checkout process
- [ ] Newsletter subscription
- [ ] Contact forms
- [ ] WhatsApp integration

### 2. Email Testing

- [ ] Welcome emails
- [ ] Order confirmation emails
- [ ] Email unsubscribe functionality
- [ ] Email rendering across different clients

### 3. Performance Testing

- [ ] Page load times
- [ ] Mobile responsiveness
- [ ] Image loading
- [ ] API response times

### 4. Security Testing

- [ ] HTTPS working correctly
- [ ] Form validation
- [ ] API endpoint security
- [ ] Environment variable security

## Launch Procedure

### 1. Pre-Launch

- Finalize all content in Contentful
- Complete all code changes
- Run final tests
- Prepare announcement materials

### 2. Launch Day

- Deploy final code to production
- Verify DNS propagation
- Test all functionality on the live site
- Monitor analytics and error logs

### 3. Post-Launch

- Monitor site performance
- Check email deliverability
- Address any issues promptly
- Collect user feedback

## Rollback Plan

In case of critical issues:

### 1. Code Rollback

- Revert to the last stable commit
- Deploy the reverted code to Netlify

### 2. DNS Rollback

- Update DNS settings to point back to the Netlify subdomain
- Wait for DNS propagation

### 3. API Key Rollback

- Revert to using development API keys
- Update environment variables in Netlify

## Maintenance Plan

### 1. Regular Updates

- Schedule regular content updates
- Plan for code maintenance and updates
- Monitor for security patches

### 2. Monitoring

- Set up uptime monitoring
- Configure error alerting
- Monitor API usage and limits
- Set up monitoring for API usage
- Create alerts for unusual activity
- Regularly audit API access logs

### 3. Backup Strategy

- Regular backups of Contentful content
- Repository backups
- Subscriber data backups

### 4. Documentation Updates

After successful migration, update:

- **README.md**: Update with production domain information and setup instructions
- **.env.example**: Update with production environment variable structure
- **Internal Documentation**: Create/update deployment guides and troubleshooting guides

## Future Considerations

### 1. Email Service Expansion

- Consider setting up email analytics
- Implement A/B testing for email templates
- Set up automated email campaigns

### 2. Domain Security

- Implement DNSSEC for additional DNS security
- Consider advanced email security (additional SPF, DKIM settings)
- Set up domain monitoring for security threats

### 3. Scalability

- Plan for multiple environments (development, staging, production)
- Document process for propagating changes across environments
- Consider CI/CD pipeline improvements

---

This guide provides a comprehensive roadmap for migrating from development to production with a company-owned infrastructure. By following these steps, you can ensure a smooth transition while transferring ownership from personal accounts to company accounts.
