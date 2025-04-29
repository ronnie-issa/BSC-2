import { Resend } from 'resend';
import type { Product } from '@/contexts/ProductContext';

// Initialize Resend with API key from environment variables
const resend = new Resend(import.meta.env.RESEND_API_KEY);

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

    // Check if we're in development mode
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    if (isDevelopment) {
      console.log('Development mode detected. Welcome email would be sent to:', email);

      // Return mock success response for development
      return {
        success: true,
        data: {
          message: 'Welcome email sending simulated in development mode',
          id: 'dev-' + Math.random().toString(36).substring(2, 15)
        }
      };
    }

    const response = await fetch('/.netlify/functions/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
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
    // Check if we're in development mode
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    if (isDevelopment) {
      console.log('Development mode detected. Email would be sent with:', {
        email,
        name,
        orderNumber,
        products: products.length,
        total,
        shippingAddress: shippingAddress ? 'Provided' : 'Not provided'
      });

      // Return mock success response for development
      return {
        success: true,
        data: {
          message: 'Email sending simulated in development mode',
          id: 'dev-' + Math.random().toString(36).substring(2, 15)
        }
      };
    }

    // In production, call the Netlify function to send the email
    const response = await fetch('/.netlify/functions/order-confirmation', {
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
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
    return { success: false, error };
  }
}
