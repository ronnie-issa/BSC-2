# Resend Integration Testing Plan

## Prerequisites

1. Create a Resend account at [resend.com](https://resend.com)
2. Generate an API key in the Resend dashboard
3. Add the API key to your local environment variables:
   ```
   RESEND_API_KEY=re_your_api_key_here
   ```

## Test Cases

### 1. Newsletter Subscription Flow

**Test Steps:**
1. Start the development server: `npm run dev`
2. Navigate to the homepage
3. Enter a test email in the newsletter subscription form
4. Submit the form
5. Verify the success message appears

**Expected Results:**
- Form submission is successful
- Success toast notification appears
- Welcome email is received at the test email address
- Email content and styling match the design

### 2. Unsubscribe Flow

**Test Steps:**
1. Locate the unsubscribe link in the welcome email
2. Click the unsubscribe link
3. Verify the unsubscribe confirmation page appears

**Expected Results:**
- Unsubscribe page loads correctly
- Confirmation message is displayed
- Email is removed from subscribers list (check data/subscribers.json)

### 3. Order Confirmation Email

**Test Steps:**
1. Place a test order via WhatsApp
2. Complete the order process
3. Check for order confirmation email

**Expected Results:**
- Order confirmation email is received
- Email contains correct order details
- Email styling matches the design

### 4. Email Rendering Tests

**Test Across Email Clients:**
- Gmail (web and mobile app)
- Outlook
- Apple Mail
- Mobile email clients

**Expected Results:**
- Emails render correctly across all clients
- No major styling issues
- All links work properly

## Troubleshooting

If emails are not being sent:
1. Check Resend dashboard for errors
2. Verify API key is correctly set in environment variables
3. Check Netlify function logs for errors
4. Ensure the email templates are being properly rendered

## Rollback Plan

If critical issues are found:
1. Revert to the previous commit: `git revert HEAD~1`
2. Or restore Mailjet integration if needed

## Notes

- Use different test email addresses for different test cases
- Document any rendering issues with screenshots
- Note any performance differences compared to Mailjet
