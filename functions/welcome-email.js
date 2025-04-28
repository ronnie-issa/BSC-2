// Use dynamic imports for ES modules
exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // Dynamically import Resend
    const { Resend } = await import('resend');
    const { renderAsync } = await import('@react-email/render');

    // Parse the JSON body
    const { email } = JSON.parse(event.body);

    // Validate email
    if (!email || !email.includes("@")) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Valid email required" }),
      };
    }

    // Initialize Resend client
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Import the WelcomeEmail component
    // Note: We need to use a workaround for importing React components in Netlify Functions
    // This is because Netlify Functions run in a Node.js environment, not a browser
    const { default: WelcomeEmail } = await import('../src/emails/WelcomeEmail');

    // Render the React component to HTML
    const html = await renderAsync(WelcomeEmail({ name: email.split('@')[0] }));

    // Send email using Resend
    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'OMNIS <hello@omnis-lb.com>',
      to: email,
      subject: 'Welcome to OMNIS Newsletter',
      html: html,
    });

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
