// Simplified unsubscribe function that doesn't use GitHub
exports.handler = async (event) => {
  // Only allow GET requests
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // Get the email from the query parameters
    const { email } = event.queryStringParameters || {};

    // Validate email
    if (!email || !email.includes("@")) {
      return {
        statusCode: 400,
        body: "Valid email required",
      };
    }

    console.log("Unsubscribe request received for:", email);

    // In a real implementation, you would remove the email from your database
    // For now, we'll just log the unsubscribe request
    console.log("Unsubscribed:", email, "at", new Date().toISOString());

    // Return a success page
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
      },
      body: `
        <!DOCTYPE html>
        <html>
        <head>
          <title>OMNIS - Unsubscribed</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #fff;
              background-color: #000;
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 40px;
              text-align: center;
            }
            h1 {
              font-size: 24px;
              margin-bottom: 20px;
            }
            p {
              margin-bottom: 20px;
            }
            .btn {
              display: inline-block;
              background-color: #fff;
              color: #000;
              padding: 12px 24px;
              text-decoration: none;
              border: none;
              margin-top: 20px;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Successfully Unsubscribed</h1>
            <p>You have been successfully unsubscribed from the OMNIS newsletter.</p>
            <p>We're sorry to see you go. If you have any feedback on how we could improve, please let us know.</p>
            <a href="${process.env.URL || 'https://omnis-lb.netlify.app'}" class="btn">RETURN TO WEBSITE</a>
          </div>
        </body>
        </html>
      `,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: "Error processing your request. Please try again later.",
    };
  }
};
