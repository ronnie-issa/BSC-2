import { Resend } from 'resend';
import type { Product } from '@/contexts/ProductContext';

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send a welcome email to a new subscriber
 * @param email The recipient's email address
 * @param name The recipient's name (optional)
 * @returns Object with success status and data or error
 */
export async function sendWelcomeEmail(email: string, name?: string) {
  try {
    // Note: This function is now deprecated.
    // Please use the Netlify function directly: /.netlify/functions/subscribe
    console.warn('sendWelcomeEmail is deprecated. Use the Netlify function instead.');

    const data = await fetch('/.netlify/functions/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name }),
    }).then(res => res.json());

    return { success: true, data };
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return { success: false, error };
  }
}

/**
 * Send an order confirmation email
 * @param email The recipient's email address
 * @param name The recipient's name
 * @param orderNumber The order number
 * @param products Array of products in the order
 * @param total The order total
 * @returns Object with success status and data or error
 */
export async function sendOrderConfirmationEmail(
  email: string,
  name: string,
  orderNumber: string,
  products: Product[],
  total: number,
  shippingAddress?: string
) {
  try {
    // Call the Netlify function to send the order confirmation email
    const data = await fetch('/.netlify/functions/order-confirmation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        name,
        orderNumber,
        products,
        total,
        shippingAddress
      }),
    }).then(res => res.json());

    return { success: true, data };
  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
    return { success: false, error };
  }
}
