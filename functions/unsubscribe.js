// Use dynamic imports for ES modules
exports.handler = async (event) => {
  // Dynamically import modules
  const { Octokit } = await import('@octokit/rest');
  
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
      // File doesn't exist, nothing to unsubscribe from
      return {
        statusCode: 404,
        body: "Subscriber list not found",
      };
    }

    // Check if email exists in the list
    const initialLength = subscribers.length;
    subscribers = subscribers.filter((sub) => sub.email !== email);

    // If the email wasn't found, return a message
    if (subscribers.length === initialLength) {
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "text/html",
        },
        body: `
          <!DOCTYPE html>
          <html>
          <head>
            <title>OMNIS - Unsubscribe</title>
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
              <h1>Email Not Found</h1>
              <p>The email address ${email} is not in our subscriber list or has already been unsubscribed.</p>
              <a href="https://omnis-lb.netlify.app" class="btn">RETURN TO WEBSITE</a>
            </div>
          </body>
          </html>
        `,
      };
    }

    // Update the file in GitHub
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: "Remove subscriber",
      content: Buffer.from(JSON.stringify(subscribers, null, 2)).toString(
        "base64"
      ),
      sha: sha,
    });

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
          <title>OMNIS - Unsubscribe</title>
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
            <h1>Unsubscribed Successfully</h1>
            <p>You have been unsubscribed from the OMNIS newsletter. We're sorry to see you go!</p>
            <a href="https://omnis-lb.netlify.app" class="btn">RETURN TO WEBSITE</a>
          </div>
        </body>
        </html>
      `,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: "Error processing unsubscribe request, please try again later",
    };
  }
};
