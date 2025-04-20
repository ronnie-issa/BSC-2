# Email Subscription Plan

This document outlines the implementation plan for adding email subscriptionx functionality to the Omnis website using free services and Netlify hosting.

## Overview

We'll implement a serverless email subscription system using:

- Netlify Forms/Functions for handling submissions
- GitHub as a simple database to store subscriber information
- No paid third-party services

## Implementation Plan

### 1. Create the Subscription Form

Enhance the existing newsletter form in the `NewsletterSection.tsx` component:

```jsx
<form
  onSubmit={handleSubmit}
  className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
>
  <input
    type="email"
    name="email"
    placeholder="Your email address"
    required
    className="flex-grow px-4 py-3 bg-transparent border border-omnis-gray/30 focus:border-omnis-white focus:outline-none transition-colors text-omnis-white"
  />
  <button
    type="submit"
    className="px-6 py-3 bg-omnis-white text-omnis-black font-medium hover:bg-omnis-lightgray transition-colors"
  >
    SUBSCRIBE
  </button>
</form>
```

### 2. Create a Netlify Function to Handle Submissions

Create a serverless function in the project:

```javascript
// functions/subscribe.js
const { Octokit } = require("@octokit/rest");
const crypto = require("crypto");

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
      id: crypto.randomUUID(),
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

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Successfully subscribed!" }),
    };
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
```

### 3. Set Up Environment Variables in Netlify

In the Netlify dashboard, add these environment variables:

- `GITHUB_TOKEN`: A personal access token with repo permissions
- `GITHUB_OWNER`: Your GitHub username
- `GITHUB_REPO`: Your repository name

### 4. Update the Frontend to Call the Function

Modify the form submission handler in `NewsletterSection.tsx`:

```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  const email = e.target.email.value;

  try {
    const response = await fetch("/.netlify/functions/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    // Show success message to user
    toast({
      title: "Thank you!",
      description: data.message,
    });

    // Reset form
    e.target.reset();
  } catch (error) {
    console.error("Error:", error);
    toast({
      title: "Error",
      description: "Something went wrong. Please try again later.",
      variant: "destructive",
    });
  }
};
```

### 5. Configure Netlify to Recognize the Function

Create a `netlify.toml` file in the project root:

```toml
[build]
  functions = "functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

### 6. Install Required Dependencies

```bash
npm install @octokit/rest
```

## Folder Structure

```
omniscape/
├── functions/
│   └── subscribe.js
├── src/
│   └── components/
│       └── NewsletterSection.tsx
├── netlify.toml
└── package.json
```

## Testing Domain

For development and testing purposes, we'll use:

```
omnis-fashion.netlify.app
```

## Additional Features for Future Implementation

1. **Privacy Policy**: Add a simple privacy policy stating how subscriber emails will be used

2. **Confirmation Emails**: Add a second function that sends confirmation emails using a service like SendGrid (free tier)

3. **Export Functionality**: Create an admin-only function to export the subscriber list as CSV

4. **Unsubscribe Option**: Implement a simple unsubscribe mechanism (another Netlify function)

5. **Rate Limiting**: Add basic rate limiting to prevent abuse of the subscription endpoint

6. **Email Campaigns**: Create a simple interface for sending emails to subscribers

## Benefits of This Approach

- **Zero Cost**: Uses only free tiers of services
- **Full Control**: Complete ownership of subscriber data
- **Simplicity**: No complex database setup required
- **Scalability**: Can handle thousands of subscribers without issues
- **Integration**: Works seamlessly with the existing Netlify setup

## Limitations

- Manual process for sending emails to subscribers
- Limited analytics compared to dedicated email services
- No advanced segmentation or automation features

This approach provides a solid foundation for collecting email subscribers without any ongoing costs, while maintaining the flexibility to migrate to a more robust solution in the future if needed.
