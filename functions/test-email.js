// Simple test function for sending emails with Resend
exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // Parse the JSON body
    let email;
    try {
      const body = JSON.parse(event.body);
      email = body.email;
    } catch (e) {
      // If parsing fails, try to get email from query parameters
      const params = new URLSearchParams(event.queryStringParameters || {});
      email = params.get('email');
    }

    // Validate email
    if (!email || !email.includes("@")) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Valid email required" }),
      };
    }

    // Dynamically import Resend
    const { Resend } = await import('resend');
    
    // Initialize Resend client with API key
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Simple HTML template
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Test Email</title>
      </head>
      <body>
        <h1>Test Email from OMNIS</h1>
        <p>This is a test email to verify that Resend is working correctly.</p>
        <p>If you're seeing this, the email functionality is working!</p>
      </body>
      </html>
    `;

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'OMNIS <kevin@abouhanna.com>',
      to: email,
      subject: 'OMNIS Test Email',
      html: html,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: "Test email sent successfully!",
        data: data
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error sending test email",
        error: error.message,
        stack: error.stack
      }),
    };
  }
};
