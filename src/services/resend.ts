import { Resend } from 'resend';
import WelcomeEmail from '../emails/WelcomeEmail';
import OrderConfirmationEmail from '../emails/OrderConfirmationEmail';
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
    const data = await resend.emails.send({
      from: 'OMNIS <hello@omnis-lb.com>',
      to: email,
      subject: 'Welcome to OMNIS',
      react: WelcomeEmail({ name: name || 'there' }),
    });
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
    const data = await resend.emails.send({
      from: 'OMNIS <orders@omnis-lb.com>',
      to: email,
      subject: `OMNIS Order Confirmation #${orderNumber}`,
      react: OrderConfirmationEmail({ 
        name, 
        orderNumber, 
        products, 
        total,
        shippingAddress
      }),
    });
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
    return { success: false, error };
  }
}
