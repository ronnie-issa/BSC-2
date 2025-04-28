# Domain Migration Plan for OMNIS

This document outlines the step-by-step process for migrating OMNIS from development domains and API keys to production domains and API keys when you're ready to launch with a custom domain.

## Current Setup

- **Website Hosting**: Netlify (omnis-lb.netlify.app)
- **Email Service**: Resend (using kevin@abouhanna.com as sender)
- **CMS**: Contentful
- **Code Repository**: GitHub
- **Environment**: Development/Testing

## Target Setup

- **Website Hosting**: Netlify with custom domain (e.g., omnis-lb.com)
- **Email Service**: Resend with custom domain emails (e.g., hello@omnis-lb.com)
- **CMS**: Contentful connected to custom domain
- **Code Repository**: GitHub (unchanged)
- **Environment**: Production

## Migration Phases

### Phase 1: Domain Acquisition and Setup (1-2 days)

1. **Purchase Domain**
   - Select a domain registrar (Namecheap, GoDaddy, Google Domains, etc.)
   - Purchase your preferred domain (e.g., omnis-lb.com)
   - Set up domain auto-renewal to prevent expiration

2. **Configure DNS Provider**
   - Choose whether to use the registrar's DNS or a third-party DNS provider
   - If using a third-party DNS (like Cloudflare), update nameservers at your registrar
   - Document all DNS settings for future reference

3. **Set Up Email Forwarding (Temporary)**
   - Configure email forwarding from hello@omnis-lb.com to kevin@abouhanna.com
   - This ensures you don't miss important emails during transition

### Phase 2: Netlify Custom Domain Configuration (1 day)

1. **Add Custom Domain to Netlify**
   - In Netlify dashboard: Site settings > Domain management > Add custom domain
   - Enter your domain name (omnis-lb.com)
   - Add www subdomain as well (www.omnis-lb.com)

2. **Configure DNS Records**
   - Add the Netlify DNS records to your domain's DNS settings:
     ```
     A Record: @ points to Netlify's load balancer IP
     CNAME Record: www points to your Netlify site URL
     ```
   - Wait for DNS propagation (can take up to 48 hours, but usually faster)

3. **Enable HTTPS**
   - In Netlify dashboard: Enable HTTPS with Let's Encrypt
   - Force HTTPS for all visitors

4. **Update Site URL in Netlify**
   - In Netlify dashboard: Site settings > General > Site details > Site name
   - Update the site name if desired to match your domain

### Phase 3: Email Service Migration (1-2 days)

1. **Verify Domain with Resend**
   - In Resend dashboard: Domains > Add a new domain
   - Add your custom domain (omnis-lb.com)
   - Add the required DNS records (typically DKIM, SPF, and DMARC records)
   - Wait for verification to complete

2. **Update Sender Addresses**
   - Create new sender addresses in Resend:
     - hello@omnis-lb.com (for general communication)
     - orders@omnis-lb.com (for order confirmations)
     - newsletter@omnis-lb.com (for newsletters)

3. **Update Environment Variables**
   - In Netlify dashboard: Site settings > Environment variables
   - Update FROM_EMAIL to use your new domain email addresses
   - Update any other email-related variables

4. **Update Email Templates**
   - Update all email templates to use the new domain
   - Update unsubscribe links and other URLs to use the custom domain
   - Test sending emails from the new addresses

### Phase 4: Contentful Configuration (1 day)

1. **Update Contentful Space Settings**
   - In Contentful dashboard: Space settings > General settings
   - Update the space name if needed to reflect production status

2. **Configure Webhooks for the New Domain**
   - Update any webhooks to point to your custom domain URLs
   - Test webhook functionality

3. **Update Content Preview URLs**
   - In Contentful dashboard: Space settings > Content preview
   - Update preview URLs to use your custom domain

4. **Update Environment Variables in Netlify**
   - Ensure all Contentful API keys are properly set for production
   - Consider creating a separate production environment in Contentful

### Phase 5: Code Updates and Testing (2-3 days)

1. **Update Hardcoded URLs**
   - Search codebase for any hardcoded references to:
     - omnis-lb.netlify.app
     - kevin@abouhanna.com
     - Any other development URLs or emails
   - Replace with custom domain equivalents

2. **Update SEO and Metadata**
   - Update site metadata with custom domain
   - Update canonical URLs
   - Update sitemap.xml with custom domain URLs
   - Update robots.txt if needed

3. **Comprehensive Testing**
   - Test all forms and email functionality
   - Test payment flows
   - Test social sharing links
   - Test SEO elements
   - Test site performance

### Phase 6: Launch and Monitoring (1-2 days)

1. **Pre-Launch Checklist**
   - Verify all DNS records are properly configured
   - Ensure HTTPS is working correctly
   - Confirm all emails are sending from the correct addresses
   - Verify analytics tracking is working
   - Check for any 404 errors or broken links

2. **Launch Announcement**
   - Prepare social media announcements
   - Update any existing communications with new domain information
   - Notify existing subscribers of the domain change

3. **Post-Launch Monitoring**
   - Monitor site performance
   - Monitor email deliverability
   - Check for any 404 errors or broken links
   - Monitor user feedback

4. **Redirect Setup (if needed)**
   - If migrating from an existing live site, set up proper 301 redirects
   - Ensure old URLs properly redirect to new URLs

## API Keys Management

### Current API Keys

| Service | Environment | Purpose | Storage Location |
|---------|-------------|---------|-----------------|
| Resend | Development | Email delivery | Netlify environment variables |
| Contentful | Development | CMS content delivery | Netlify environment variables |
| Contentful | Development | CMS content management | Netlify environment variables |
| GitHub | Development | Subscriber management | Netlify environment variables |

### Production API Keys Strategy

1. **Create New API Keys**
   - Generate new API keys specifically for production use
   - Never reuse development keys in production

2. **Secure Storage**
   - Store all production API keys in Netlify environment variables
   - Use Netlify's production branch environment variables
   - Consider using a secrets manager for additional security

3. **Access Control**
   - Limit access to production API keys to essential team members
   - Document who has access to which keys
   - Implement a rotation schedule for sensitive keys

4. **Monitoring**
   - Set up monitoring for API usage
   - Create alerts for unusual activity
   - Regularly audit API access logs

## Rollback Plan

In case of critical issues during migration:

1. **Domain Issues**
   - Revert DNS settings to point back to Netlify subdomain
   - Update environment variables to use development values

2. **Email Issues**
   - Revert to using Resend with original sender email
   - Update environment variables accordingly

3. **Content Issues**
   - Revert to development environment in Contentful
   - Update API keys in Netlify

## Documentation Updates

After successful migration, update:

1. **README.md**
   - Update with production domain information
   - Update setup instructions for new contributors

2. **.env.example**
   - Update with production environment variable structure
   - Remove any development-specific variables

3. **Internal Documentation**
   - Create/update deployment guides
   - Document the new infrastructure setup
   - Create troubleshooting guides for common issues

## Future Considerations

1. **Email Service Expansion**
   - Consider setting up email analytics
   - Implement A/B testing for email templates
   - Set up automated email campaigns

2. **Domain Security**
   - Implement DNSSEC for additional DNS security
   - Consider advanced email security (additional SPF, DKIM settings)
   - Set up domain monitoring for security threats

3. **Scalability**
   - Plan for multiple environments (development, staging, production)
   - Document process for propagating changes across environments
   - Consider CI/CD pipeline improvements

---

This migration plan provides a comprehensive roadmap for transitioning from development domains and API keys to production with a custom domain. Each phase includes specific steps, considerations, and contingency plans to ensure a smooth migration process.
