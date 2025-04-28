// Simplified subscribe function that doesn't use GitHub
// Simple in-memory cache for subscribers (will reset on function cold start)
const subscribers = new Set();
const emailTemplates = require('./email-templates');
const constants = require('./constants');

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // Parse the JSON body
    const { email } = JSON.parse(event.body);

    // Validate email
    if (!email || !email.includes("@")) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Valid email required" }),
      };
    }

    console.log("Subscription request received for:", email);

    // Check if email is already subscribed
    if (subscribers.has(email)) {
      console.log("Email already subscribed:", email);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: constants.SUCCESS_MESSAGES.ALREADY_SUBSCRIBED }),
      };
    }

    // Add email to subscribers set
    subscribers.add(email);
    console.log("New subscriber:", email, "at", new Date().toISOString());
    console.log("Current subscribers:", Array.from(subscribers));

    // Send welcome email directly (without calling another function)
    try {
      // Dynamically import Resend
      const { Resend } = await import('resend');

      // Initialize Resend client
      const resend = new Resend(process.env.RESEND_API_KEY);

      // Get the domain from environment or use default
      const domain = process.env.URL || constants.DEFAULT_DOMAIN;
      console.log("Using domain for email links:", domain);

      // Generate the email HTML using the template
      const html = emailTemplates.welcomeEmail({
        email,
        domain
      });

      console.log("Sending welcome email to:", email);

      // Send email using Resend
      console.log("Attempting to send email with Resend...");
      try {
        const data = await resend.emails.send({
          from: process.env.FROM_EMAIL || constants.DEFAULT_SENDER,
          to: email,
          subject: constants.EMAIL_SUBJECTS.WELCOME,
          html: html,
        });

        console.log("Welcome email sent successfully:", data);

        // Check if there was an error in the response
        if (data.error) {
          console.error("Resend API returned an error:", data.error);
          return {
            statusCode: 200, // Still return 200 to the user
            body: JSON.stringify({
              message: constants.ERROR_MESSAGES.EMAIL_SEND_ERROR,
              error: data.error
            }),
          };
        }
      } catch (sendError) {
        console.error("Error sending email with Resend:", sendError);
        return {
          statusCode: 200, // Still return 200 to the user
          body: JSON.stringify({
            message: constants.ERROR_MESSAGES.EMAIL_SEND_ERROR,
            error: sendError.message
          }),
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: constants.SUCCESS_MESSAGES.SUBSCRIPTION
        }),
      };
    } catch (emailError) {
      console.error("Error sending welcome email:", emailError);
      // Still return success for subscription even if email fails
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Successfully subscribed!",
          emailError: emailError.message
        }),
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: constants.ERROR_MESSAGES.SUBSCRIPTION_ERROR,
        error: error.message
      }),
    };
  }
};
