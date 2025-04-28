// Netlify function to send order confirmation emails
const emailTemplates = require('./email-templates');
const constants = require('./constants');

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

    // Get the domain from environment or use default
    const domain = process.env.URL || constants.DEFAULT_DOMAIN;
    console.log("Using domain for email links:", domain);

    // Generate the email HTML using the template
    const html = emailTemplates.orderConfirmation({
      name: name || email.split('@')[0],
      orderNumber,
      products,
      total,
      shippingAddress,
      domain
    });

    // Send email using Resend
    console.log("Attempting to send order confirmation email...");
    let emailSent = false;
    let emailError = null;

    try {
      const data = await resend.emails.send({
        from: process.env.FROM_EMAIL || constants.DEFAULT_SENDER,
        to: email,
        subject: `${constants.EMAIL_SUBJECTS.ORDER_CONFIRMATION} #${orderNumber}`,
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
          message: constants.SUCCESS_MESSAGES.ORDER_CONFIRMATION,
          orderNumber: orderNumber
        }),
      };
    } else {
      return {
        statusCode: 200, // Still return 200 to the user
        body: JSON.stringify({
          message: constants.ERROR_MESSAGES.ORDER_EMAIL_ERROR,
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
        message: constants.ERROR_MESSAGES.ORDER_PROCESSING_ERROR,
        error: error.message
      }),
    };
  }
};
