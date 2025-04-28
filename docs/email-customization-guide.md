# Email Customization Guide

This guide explains how to customize email templates in the OMNIS system.

## Overview

All email templates are centralized in a single file: `functions/email-templates.js`. This approach provides:

- **Simplicity**: One location for all email templates
- **Consistency**: Same approach for all email types
- **Maintainability**: Easy to find and update templates
- **Reliability**: Works well with Netlify Functions

## Available Email Templates

Currently, the system includes these email templates:

1. **Welcome Email**: Sent when someone subscribes to the newsletter
2. **Order Confirmation Email**: Sent when a customer places an order

## How to Customize Email Templates

### Step 1: Locate the Template File

Open the email templates file:
```
functions/email-templates.js
```

### Step 2: Find the Template to Customize

The file contains JavaScript functions that return HTML templates:

- `welcomeEmail`: For newsletter subscription emails
- `orderConfirmation`: For order confirmation emails

### Step 3: Edit the HTML and CSS

Each template function contains:

1. **Function Parameters**: Data needed for the email (name, email, order details, etc.)
2. **HTML Structure**: The layout and content of the email
3. **Inline CSS**: Styling for email elements

Example of editing the welcome email:

```javascript
exports.welcomeEmail = function({
  email,
  domain = 'https://omnis-lb.netlify.app'
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        /* Edit styles here */
        body {
          font-family: Arial, sans-serif; /* Change font */
          line-height: 1.6;
          color: #333; /* Change text color */
          margin: 0;
          padding: 0;
        }
        .header {
          background-color: #000; /* Change header background */
          color: #fff;
          padding: 20px;
          text-align: center;
        }
        /* Add more styles as needed */
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Edit HTML structure here -->
        <div class="header">
          <h1>OMNIS</h1> <!-- Change header text -->
        </div>
        <div class="content">
          <h2>Welcome to Our Community!</h2> <!-- Change heading -->
          <!-- Edit content as needed -->
        </div>
      </div>
    </body>
    </html>
  `;
};
```

### Step 4: Test Your Changes

After making changes:

1. Save the file
2. Deploy to Netlify (or test locally with Netlify Dev)
3. Trigger the email by:
   - Subscribing to the newsletter (for welcome emails)
   - Placing a test order (for order confirmation emails)

### Email Design Best Practices

When customizing emails, keep these best practices in mind:

1. **Use tables for layout**: Email clients have limited CSS support
2. **Keep inline styles**: Many email clients strip out `<style>` tags
3. **Test across clients**: Test in Gmail, Outlook, Apple Mail, etc.
4. **Optimize for mobile**: Many users will read emails on mobile devices
5. **Keep it simple**: Complex layouts may break in some email clients

## Adding a New Email Template

To add a new email template:

1. Add a new function to `email-templates.js`:

```javascript
exports.newEmailTemplate = function(params) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        /* Your styles here */
      </style>
    </head>
    <body>
      <!-- Your HTML here -->
    </body>
    </html>
  `;
};
```

2. Create a new Netlify function to use your template:

```javascript
// functions/new-email-function.js
const emailTemplates = require('./email-templates');

exports.handler = async (event) => {
  // Parse request data
  const { email, otherData } = JSON.parse(event.body);
  
  // Generate HTML using template
  const html = emailTemplates.newEmailTemplate({
    email,
    otherData,
    domain: process.env.URL || 'https://omnis-lb.netlify.app'
  });
  
  // Send email using Resend
  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  const data = await resend.emails.send({
    from: 'OMNIS <onboarding@resend.dev>',
    to: email,
    subject: 'Your Subject',
    html: html,
  });
  
  // Return response
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Email sent successfully!" })
  };
};
```

## Troubleshooting

If you encounter issues with your email templates:

1. **Check the HTML**: Ensure your HTML is valid
2. **Verify CSS**: Some email clients have limited CSS support
3. **Check Netlify Logs**: Look for errors in the function logs
4. **Test with Different Clients**: Test in multiple email clients
5. **Simplify**: If a complex layout breaks, try simplifying it

## Resources

- [Email Design Guide](https://www.campaignmonitor.com/dev-resources/guides/design/)
- [CSS Support in Email](https://www.campaignmonitor.com/css/)
- [Resend Documentation](https://resend.com/docs)
