# Email System Migration: Mailjet to Resend

This document outlines the plan for migrating our email delivery system from Mailjet to Resend, with the goal of improving developer experience, email design capabilities, and preparing for potential future migration to Next.js.

## Why Migrate to Resend?

- **Modern Developer Experience**: React-based email templates
- **Generous Free Tier**: 3,000 emails/month (100/day)
- **Next.js Compatibility**: Excellent integration with Next.js for future migration
- **Simplified API**: Cleaner, more intuitive API compared to Mailjet
- **Reduced Netlify Dependency**: Part of our strategy to separate concerns from Netlify

## Migration Plan

### Phase 1: Research and Setup (1-2 days)

- [ ] Create Resend account
- [ ] Generate and secure API keys
- [ ] Set up environment variables in development and production
- [ ] Create a test email template using React Email components
- [ ] Send test emails to verify configuration

### Phase 2: Email Template Development (2-3 days)

- [ ] Design and implement welcome email template using React Email
  - [ ] Create base layout components (header, footer, etc.)
  - [ ] Implement welcome email content
  - [ ] Test rendering across email clients
- [ ] Design and implement order confirmation email template
  - [ ] Create product display components
  - [ ] Implement order summary section
  - [ ] Add shipping information section
- [ ] Create a reusable template system for future emails

### Phase 3: Integration with Current Codebase (2-3 days)

- [ ] Create a new email service module in `src/services/resend.ts`
- [ ] Update the newsletter subscription function to use Resend
  - [ ] Modify `functions/subscribe.js` to use Resend instead of Mailjet
  - [ ] Test subscription flow end-to-end
- [ ] Implement order confirmation email sending
  - [ ] Add email sending to the order completion process
  - [ ] Test with sample orders

### Phase 4: Unsubscribe Functionality (1-2 days)

- [ ] Design unsubscribe email template with clear unsubscribe link
- [ ] Create unsubscribe API endpoint
  - [ ] Implement in Netlify function
  - [ ] Update subscriber data storage
- [ ] Add unsubscribe link to all email templates
- [ ] Test unsubscribe flow end-to-end

### Phase 5: Testing and Optimization (1-2 days)

- [ ] Test email delivery across different email clients
  - [ ] Gmail, Outlook, Apple Mail, etc.
  - [ ] Mobile and desktop views
- [ ] Optimize email templates for deliverability
  - [ ] Check spam scores
  - [ ] Validate HTML
- [ ] Implement email analytics tracking
  - [ ] Open tracking
  - [ ] Click tracking
  - [ ] Unsubscribe tracking

### Phase 6: Documentation and Deployment (1 day)

- [ ] Document the new email system
  - [ ] API reference
  - [ ] Template creation guide
  - [ ] Troubleshooting tips
- [ ] Deploy to production
  - [ ] Set up production environment variables
  - [ ] Perform final testing
- [ ] Monitor initial email sends for any issues

## Technical Implementation Details

### Email Service Module

```typescript
// src/services/resend.ts
import { Resend } from 'resend';
import WelcomeEmail from '../emails/WelcomeEmail';
import OrderConfirmationEmail from '../emails/OrderConfirmationEmail';
import type { Product } from '@/contexts/ProductContext';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    const data = await resend.emails.send({
      from: 'Omnis <hello@yourdomain.com>',
      to: email,
      subject: 'Welcome to Omnis',
      react: WelcomeEmail({ name }),
    });
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return { success: false, error };
  }
}

export async function sendOrderConfirmationEmail(
  email: string, 
  name: string, 
  orderNumber: string, 
  products: Product[], 
  total: number
) {
  try {
    const data = await resend.emails.send({
      from: 'Omnis <orders@yourdomain.com>',
      to: email,
      subject: `Omnis Order Confirmation #${orderNumber}`,
      react: OrderConfirmationEmail({ 
        name, 
        orderNumber, 
        products, 
        total 
      }),
    });
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
    return { success: false, error };
  }
}
```

### Netlify Function Update

```javascript
// functions/subscribe.js
const { sendWelcomeEmail } = require('../src/services/resend');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { email, name } = JSON.parse(event.body);
    
    // Save subscriber to database/file
    // ...existing code...
    
    // Send welcome email using Resend
    const emailResult = await sendWelcomeEmail(email, name || 'there');
    
    if (!emailResult.success) {
      console.error('Error sending welcome email:', emailResult.error);
      // Continue anyway, as the subscription was successful
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Subscription successful' }),
    };
  } catch (error) {
    console.error('Subscription error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error processing subscription' }),
    };
  }
};
```

## Future Considerations

### Next.js Migration Path

When migrating to Next.js in the future:

1. Move email sending logic from Netlify Functions to Next.js API Routes or Server Actions
2. Reuse the same React Email templates with minimal changes
3. Update environment variables in the Next.js configuration
4. Take advantage of Next.js-specific Resend features like preview mode

### Advanced Email Features to Consider

- **Drip Campaigns**: Series of welcome emails for new subscribers
- **Abandoned Cart Emails**: Remind customers about items left in cart
- **Re-engagement Emails**: Target customers who haven't purchased in a while
- **Product Recommendation Emails**: Based on previous purchases
- **Birthday/Special Occasion Emails**: Personalized discount offers

## Resources

- [Resend Documentation](https://resend.com/docs)
- [React Email Documentation](https://react.email/docs)
- [Email Testing Tools](https://www.emailonacid.com/)
- [Email Deliverability Best Practices](https://sendgrid.com/blog/email-deliverability-best-practices/)
