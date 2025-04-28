// Simplified subscribe function that doesn't use GitHub
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

    // Instead of storing in GitHub, we'll just log the subscription
    // In a real implementation, you would store this in a database
    console.log("New subscriber:", email, "at", new Date().toISOString());

    // Send welcome email directly (without calling another function)
    try {
      // Dynamically import Resend
      const { Resend } = await import('resend');

      // Initialize Resend client
      const resend = new Resend(process.env.RESEND_API_KEY);

      // Simple HTML template
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #000;
              color: #fff;
              padding: 20px;
              text-align: center;
            }
            .content {
              padding: 20px;
              background-color: #f9f9f9;
            }
            .footer {
              font-size: 12px;
              color: #777;
              text-align: center;
              padding: 20px;
              border-top: 1px solid #eee;
            }
            h1 {
              margin: 0;
              font-size: 24px;
              font-weight: bold;
            }
            .btn {
              display: inline-block;
              background-color: #000;
              color: #fff;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 0;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>OMNIS</h1>
            </div>
            <div class="content">
              <h2>Welcome to Our Community!</h2>
              <p>Thank you for subscribing to the OMNIS newsletter. We're excited to have you join our community of fashion enthusiasts.</p>
              <p>As a subscriber, you'll be the first to know about:</p>
              <ul>
                <li>New collection releases</li>
                <li>Exclusive offers and promotions</li>
                <li>Behind-the-scenes content</li>
                <li>Style tips and inspiration</li>
              </ul>
              <p>Stay tuned for our upcoming releases and special offers!</p>
              <a href="https://omnis-lb.netlify.app/shop" class="btn">EXPLORE OUR COLLECTION</a>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} OMNIS. All rights reserved.</p>
              <p>You're receiving this email because you subscribed to our newsletter.</p>
              <p>
                <a href="https://omnis-lb.netlify.app/legal">Privacy Policy</a> |
                <a href="https://omnis-lb.netlify.app/.netlify/functions/unsubscribe-simple?email=${email}">Unsubscribe</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `;

      console.log("Sending welcome email to:", email);

      // Send email using Resend
      const data = await resend.emails.send({
        from: 'OMNIS <onboarding@resend.dev>',
        to: email,
        subject: 'Welcome to OMNIS Newsletter',
        html: html,
      });

      console.log("Welcome email sent:", data);

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Successfully subscribed! Check your email for a welcome message."
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
        message: "Error subscribing, please try again later",
        error: error.message
      }),
    };
  }
};
