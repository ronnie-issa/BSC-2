// Simple redirect function for unsubscribe links from production emails
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

    console.log("Unsubscribe redirect request received for:", email);

    // Redirect to the branch deployment unsubscribe function
    return {
      statusCode: 302,
      headers: {
        Location: `https://feature-resend-migration--omnis-lb.netlify.app/.netlify/functions/unsubscribe-simple?email=${encodeURIComponent(email)}`,
      },
      body: "Redirecting to unsubscribe page...",
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: "Error processing your request. Please try again later.",
    };
  }
};
