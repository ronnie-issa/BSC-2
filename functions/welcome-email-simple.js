// Use dynamic imports for ES modules
exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    console.log("Welcome email function called");

    // Dynamically import Resend
    const { Resend } = await import('resend');
    console.log("Resend imported successfully");

    // Parse the JSON body
    const { email } = JSON.parse(event.body);
    console.log("Email to send welcome to:", email);

    // Validate email
    if (!email || !email.includes("@")) {
      console.log("Invalid email:", email);
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Valid email required" }),
      };
    }

    // Initialize Resend client
    console.log("Initializing Resend with API key:", process.env.RESEND_API_KEY ? "API key exists" : "API key missing");
    const resend = new Resend(process.env.RESEND_API_KEY);
    console.log("FROM_EMAIL value:", process.env.FROM_EMAIL || "not set");

    // Simple HTML template without React
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
          .social-links {
            margin-top: 20px;
          }
          .social-links a {
            margin: 0 10px;
            color: #000;
            text-decoration: none;
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
              <a href="https://omnis-lb.netlify.app/.netlify/functions/unsubscribe?email=${email}">Unsubscribe</a>
            </p>
            <div class="social-links">
              <a href="#">Instagram</a> |
              <a href="#">Facebook</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email using Resend
    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'OMNIS <hello@omnis-lb.com>',
      to: email,
      subject: 'Welcome to OMNIS Newsletter',
      html: html,
    });

    console.log("Email sent successfully:", data);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Welcome email sent successfully!" }),
    };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error sending welcome email, please try again later",
        error: error.message,
      }),
    };
  }
};
