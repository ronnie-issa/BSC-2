# Resend Migration Checklist

Use this checklist to track progress on the Resend migration.

## Initial Setup

- [x] Create Resend account
- [x] Generate API key
- [x] Install Resend dependencies
- [x] Remove Mailjet dependencies
- [x] Create email templates
- [x] Update Netlify functions

## Testing on Feature Branch

- [ ] Set up local environment variables
- [ ] Test newsletter subscription
- [ ] Test welcome email delivery
- [ ] Test welcome email rendering
- [ ] Test unsubscribe functionality
- [ ] Test order confirmation email
- [ ] Test email rendering across clients
- [ ] Fix any identified issues

## Code Quality

- [ ] Review code for best practices
- [ ] Check for any remaining Mailjet references
- [ ] Ensure proper error handling
- [ ] Verify environment variable usage
- [ ] Check for any hardcoded values

## Documentation

- [x] Update README.md
- [x] Create migration summary
- [x] Create testing plan
- [x] Create deployment guide
- [x] Update TODO-EMAIL_MIGRATION.md

## Deployment Preparation

- [ ] Push feature branch to GitHub
- [ ] Create deploy preview
- [ ] Test on deploy preview
- [ ] Set up Netlify environment variables

## Merge and Deploy

- [ ] Create pull request
- [ ] Review pull request
- [ ] Merge to main
- [ ] Test on production
- [ ] Monitor for 24-48 hours

## Post-Deployment

- [ ] Verify email analytics
- [ ] Clean up any temporary files
- [ ] Document any lessons learned
- [ ] Plan next steps for Astro migration
