# Resend Deployment Guide

This guide outlines the steps to deploy the Resend email integration to Netlify.

## Prerequisites

- Successful completion of all test cases in the testing plan
- Resend account with API key
- Access to Netlify dashboard

## Deployment Steps

### 1. Set Environment Variables in Netlify

1. Log in to the [Netlify dashboard](https://app.netlify.com/)
2. Navigate to your site settings
3. Go to "Environment variables"
4. Add the following environment variables:
   - `RESEND_API_KEY`: Your Resend API key
   - `FROM_EMAIL`: The sender email address (e.g., hello@omnis-lb.com)

### 2. Deploy to a Preview Branch (Optional but Recommended)

1. Push your feature branch to GitHub:
   ```
   git push origin feature/resend-migration
   ```

2. Create a deploy preview in Netlify:
   - This happens automatically when you push to a branch
   - Or manually create a deploy preview from the Netlify dashboard

3. Test the deployment:
   - Run through all test cases again on the preview URL
   - Verify emails are sent correctly from the preview deployment

### 3. Merge to Main Branch

1. Create a pull request from `feature/resend-migration` to `main`
2. Review the changes one final time
3. Merge the pull request

### 4. Monitor the Production Deployment

1. Watch the Netlify build logs for any errors
2. Test the production site after deployment:
   - Subscribe to the newsletter with a test email
   - Verify welcome email is received
   - Place a test order and verify order confirmation email

### 5. Post-Deployment Verification

1. Check Resend dashboard for:
   - Email delivery statistics
   - Any bounced or failed emails
   - Overall email performance

2. Monitor for 24-48 hours to ensure:
   - No unexpected errors
   - Emails are being delivered reliably
   - No customer complaints about missing emails

## Rollback Plan

If critical issues occur after deployment:

### Option 1: Quick Fix

1. Identify and fix the issue
2. Deploy the fix directly to main

### Option 2: Full Rollback

1. Revert the merge commit:
   ```
   git revert -m 1 <merge-commit-hash>
   ```
2. Push the revert to main:
   ```
   git push origin main
   ```
3. Netlify will automatically deploy the reverted code

## Next Steps After Successful Deployment

1. Update documentation to reflect the new email system
2. Remove any remaining references to Mailjet in the codebase
3. Consider implementing email analytics tracking
4. Plan for the Astro migration
