// Use dynamic imports for ES modules
exports.handler = async (event) => {
  // Dynamically import modules
  const { Octokit } = await import('@octokit/rest');
  const crypto = await import('crypto');
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

    // Initialize Octokit with your GitHub token
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    // Get the current subscribers file
    const repo = process.env.GITHUB_REPO;
    const owner = process.env.GITHUB_OWNER;
    const path = "data/subscribers.json";

    let subscribers = [];
    let sha;

    try {
      // Try to get the existing file
      const { data } = await octokit.repos.getContent({
        owner,
        repo,
        path,
      });

      sha = data.sha;

      // Decode and parse the content
      const content = Buffer.from(data.content, "base64").toString();
      subscribers = JSON.parse(content);
    } catch (error) {
      // File doesn't exist yet, that's okay
      console.log("Creating new subscribers file");
    }

    // Check if email already exists
    if (subscribers.some((sub) => sub.email === email)) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "You're already subscribed!" }),
      };
    }

    // Add the new subscriber with timestamp
    subscribers.push({
      id: crypto.randomUUID ? crypto.randomUUID() : crypto.default.randomUUID(),
      email,
      subscribedAt: new Date().toISOString(),
    });

    // Update the file in GitHub
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: "Add new subscriber",
      content: Buffer.from(JSON.stringify(subscribers, null, 2)).toString(
        "base64"
      ),
      sha: sha,
    });

    // Send welcome email by calling the welcome-email function
    try {
      // Make a POST request to the welcome-email function
      const fetch = (await import('node-fetch')).default;
      const domain = process.env.URL || 'https://omnis-lb.netlify.app';

      console.log("Attempting to send welcome email to:", email);
      console.log("Using domain:", domain);

      const response = await fetch(`${domain}/.netlify/functions/welcome-email-simple`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const responseData = await response.text();
      console.log("Welcome email response:", response.status, responseData);

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
        body: JSON.stringify({ message: "Successfully subscribed!" }),
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error subscribing, please try again later",
      }),
    };
  }
};
