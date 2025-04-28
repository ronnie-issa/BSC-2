// Netlify function to send order confirmation emails
exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // Dynamically import Resend
    const { Resend } = await import('resend');

    // Parse the JSON body
    const { email, name, orderNumber, products, total, shippingAddress } = JSON.parse(event.body);

    // Validate required fields
    if (!email || !email.includes("@") || !orderNumber || !products || !Array.isArray(products) || products.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Missing required fields. Required: email, orderNumber, products, total"
        }),
      };
    }

    console.log("Order confirmation request received for:", email);
    console.log("Order details:", { orderNumber, products: products.length, total });

    // Initialize Resend client
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Format the date
    const formattedDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Generate product items HTML
    const productItemsHtml = products.map((product, index) => `
      <div style="display: flex; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding: 10px 0;">
        <div style="width: 40px; height: 40px; background-color: #333; margin-right: 10px;"></div>
        <div style="flex: 1;">
          <p style="font-weight: bold; margin: 0; font-size: 14px;">${product.name}</p>
          <p style="font-size: 12px; color: rgba(255, 255, 255, 0.8); margin: 4px 0;">
            Variation: ${product.selectedColor || 'Default'}
          </p>
          <p style="font-size: 14px; margin: 0;">$${product.price.toFixed(2)}</p>
        </div>
      </div>
    `).join('');

    // Create HTML template for the email
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your OMNIS Order Confirmation #${orderNumber}</title>
        <style>
          body {
            background-color: #000;
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #fff;
            margin: 0;
            padding: 0;
          }
          .container {
            margin: 0 auto;
            padding: 20px 0;
            max-width: 600px;
          }
          .header {
            background-color: #000;
            color: #fff;
            padding: 20px;
            text-align: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
          .logo {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
            letter-spacing: -1px;
          }
          .content {
            padding: 20px;
          }
          .heading {
            font-size: 28px;
            font-weight: bold;
            text-align: center;
            margin: 20px 0;
            letter-spacing: -0.5px;
          }
          .divider {
            width: 40px;
            margin: 0 auto;
            border-color: #fff;
          }
          .paragraph {
            margin: 8px 0;
            text-align: center;
            color: rgba(255, 255, 255, 0.8);
          }
          .order-details-section {
            margin-top: 40px;
          }
          .column {
            padding: 0 10px;
            vertical-align: top;
          }
          .subheading {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .step-container {
            display: flex;
            margin-bottom: 20px;
          }
          .step-number {
            background-color: #fff;
            color: #000;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            font-size: 12px;
            font-weight: bold;
            border: 1px solid #000;
          }
          .step-content {
            flex: 1;
          }
          .step-title {
            font-weight: bold;
            margin: 0 0 5px 0;
          }
          .step-description {
            margin: 0;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.8);
          }
          .order-info-container {
            margin-bottom: 20px;
          }
          .order-info-row {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding: 8px 0;
          }
          .order-info-label {
            color: rgba(255, 255, 255, 0.8);
            font-size: 14px;
            margin: 0;
          }
          .order-info-value {
            color: #fff;
            font-size: 14px;
            margin: 0;
          }
          .section-title {
            font-size: 14px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 20px;
            margin-bottom: 10px;
          }
          .total-container {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            padding: 15px 0;
            margin-top: 10px;
            font-weight: bold;
          }
          .total-label {
            margin: 0;
          }
          .total-value {
            margin: 0;
          }
          .shipping-address-text {
            font-size: 14px;
            margin: 0;
            color: rgba(255, 255, 255, 0.8);
          }
          .cta-section {
            text-align: center;
            margin-top: 40px;
          }
          .button {
            background-color: #fff;
            color: #000;
            padding: 12px 24px;
            text-decoration: none;
            text-align: center;
            display: inline-block;
            border-radius: 0;
            font-weight: bold;
            border: 1px solid #fff;
          }
          .hr {
            border-color: rgba(255, 255, 255, 0.1);
            margin: 30px 0;
          }
          .footer {
            padding: 0 20px 20px;
            text-align: center;
          }
          .footer-text {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.6);
            margin: 8px 0;
          }
          .link {
            color: #fff;
            text-decoration: none;
            margin: 0 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="logo">OMNIS</h1>
          </div>

          <div class="content">
            <h1 class="heading">ORDER CONFIRMED</h1>

            <hr class="divider" />

            <p class="paragraph">
              Thank you for your purchase
            </p>

            <p class="paragraph">
              Your order has been confirmed and will be shipped soon
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td class="column" width="50%" valign="top">
                  <h2 class="subheading">What's Next</h2>

                  <div class="step-container">
                    <div class="step-number">01</div>
                    <div class="step-content">
                      <p class="step-title">Order Processing</p>
                      <p class="step-description">
                        We're preparing your items for shipment. You'll receive a notification when your order ships.
                      </p>
                    </div>
                  </div>

                  <div class="step-container">
                    <div class="step-number">02</div>
                    <div class="step-content">
                      <p class="step-title">Shipping</p>
                      <p class="step-description">
                        Your order will be delivered within 3-5 business days. We'll send tracking information once available.
                      </p>
                    </div>
                  </div>

                  <div class="step-container">
                    <div class="step-number">03</div>
                    <div class="step-content">
                      <p class="step-title">Enjoy Your Purchase</p>
                      <p class="step-description">
                        We hope you love your new items. Tag us on social media with #OMNIS to share your style.
                      </p>
                    </div>
                  </div>
                </td>

                <td class="column" width="50%" valign="top">
                  <h2 class="subheading">Order Details</h2>

                  <div class="order-info-container">
                    <div class="order-info-row">
                      <p class="order-info-label">Order Number</p>
                      <p class="order-info-value">${orderNumber}</p>
                    </div>
                    <div class="order-info-row">
                      <p class="order-info-label">Order Date</p>
                      <p class="order-info-value">${formattedDate}</p>
                    </div>
                    <div class="order-info-row">
                      <p class="order-info-label">Payment Method</p>
                      <p class="order-info-value">WhatsApp Order</p>
                    </div>
                  </div>

                  <h3 class="section-title">Items Purchased</h3>

                  ${productItemsHtml}

                  <div class="total-container">
                    <p class="total-label">Total</p>
                    <p class="total-value">$${total.toFixed(2)}</p>
                  </div>

                  ${shippingAddress ? `
                    <h3 class="section-title">Shipping Address</h3>
                    <p class="shipping-address-text">${shippingAddress.replace(/\n/g, '<br>')}</p>
                  ` : ''}
                </td>
              </tr>
            </table>

            <div class="cta-section">
              <a href="${process.env.URL || 'https://omnis-lb.netlify.app'}/shop" class="button">
                CONTINUE SHOPPING
              </a>
            </div>
          </div>

          <hr class="hr" />

          <div class="footer">
            <p class="footer-text">
              © ${new Date().getFullYear()} OMNIS. All rights reserved.
            </p>
            <p class="footer-text">
              If you have any questions, please contact us at <a href="mailto:support@omnis-lb.com" class="link">support@omnis-lb.com</a>
            </p>
            <p class="footer-text">
              <a href="${process.env.URL || 'https://omnis-lb.netlify.app'}/legal" class="link">Privacy Policy</a> |
              <a href="${process.env.URL || 'https://omnis-lb.netlify.app'}/legal/terms" class="link">Terms of Service</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Get the domain from environment or use default
    const domain = process.env.URL || 'https://omnis-lb.netlify.app';
    console.log("Using domain for email links:", domain);

    // Send email using Resend
    console.log("Attempting to send order confirmation email...");
    let emailSent = false;
    let emailError = null;

    try {
      const data = await resend.emails.send({
        from: 'OMNIS <onboarding@resend.dev>', // Using onboarding email for testing
        to: email,
        subject: `OMNIS Order Confirmation #${orderNumber}`,
        html: html,
      });

      console.log("Order confirmation email sent successfully:", data);

      // Check if there was an error in the response
      if (data.error) {
        console.error("Resend API returned an error:", data.error);
        emailError = data.error;
      } else {
        emailSent = true;
      }
    } catch (sendError) {
      console.error("Error sending email with Resend:", sendError);
      emailError = sendError.message;
    }

    // Return appropriate response based on whether email was sent
    if (emailSent) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Order confirmation email sent successfully!",
          orderNumber: orderNumber
        }),
      };
    } else {
      return {
        statusCode: 200, // Still return 200 to the user
        body: JSON.stringify({
          message: "Order processed successfully, but there was an issue sending the confirmation email. Please check your spam folder or contact support.",
          error: emailError,
          orderNumber: orderNumber
        }),
      };
    }
  } catch (error) {
    console.error("Error processing order confirmation:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error processing order confirmation, please try again later",
        error: error.message
      }),
    };
  }
};
