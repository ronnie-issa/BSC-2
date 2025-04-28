/**
 * Constants for email functions
 */

// Default domain to use if URL environment variable is not set
exports.DEFAULT_DOMAIN = 'https://omnis-lb.netlify.app';

// Default sender email to use if FROM_EMAIL environment variable is not set
exports.DEFAULT_SENDER = 'OMNIS <onboarding@resend.dev>';

// Email subjects
exports.EMAIL_SUBJECTS = {
  WELCOME: 'Welcome to OMNIS Newsletter',
  ORDER_CONFIRMATION: 'OMNIS Order Confirmation'
};

// Error messages
exports.ERROR_MESSAGES = {
  SUBSCRIPTION_ERROR: 'Error subscribing, please try again later',
  EMAIL_SEND_ERROR: 'Successfully subscribed! However, there was an issue sending the welcome email. Please check your spam folder or try again later.',
  ORDER_EMAIL_ERROR: 'Order processed successfully, but there was an issue sending the confirmation email. Please check your spam folder or contact support.',
  ORDER_PROCESSING_ERROR: 'Error processing order confirmation, please try again later'
};

// Success messages
exports.SUCCESS_MESSAGES = {
  SUBSCRIPTION: 'Successfully subscribed! Check your email for a welcome message.',
  ALREADY_SUBSCRIBED: 'You\'re already subscribed!',
  ORDER_CONFIRMATION: 'Order confirmation email sent successfully!'
};
