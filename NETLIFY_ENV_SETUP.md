# Setting Up Netlify Environment Variables

This document explains how to set up the required environment variables for the email subscription functionality in Netlify.

## Required Environment Variables

For the email subscription functionality to work properly, you need to set up the following environment variables in your Netlify dashboard:

- `GITHUB_TOKEN`: A personal access token with repo permissions
- `GITHUB_OWNER`: Your GitHub username
- `GITHUB_REPO`: Your repository name

## Creating a GitHub Personal Access Token

1. Go to your GitHub account settings
2. Navigate to "Developer settings" > "Personal access tokens" > "Tokens (classic)"
3. Click "Generate new token" > "Generate new token (classic)"
4. Give your token a descriptive name (e.g., "Omnis Newsletter Subscription")
5. Select the "repo" scope to allow the token to read and write to your repositories
6. Click "Generate token"
7. Copy the generated token (you won't be able to see it again!)

## Setting Up Environment Variables in Netlify

### Method 1: Using the Netlify Dashboard

1. Go to your Netlify dashboard
2. Select your site
3. Navigate to "Site settings" > "Environment variables"
4. Click "Add a variable"
5. Add each of the required variables with their respective values
6. Save your changes

### Method 2: Using a .env File

1. Create a `.env` file in your project root with the following content:
   ```
   GITHUB_TOKEN=your_github_personal_access_token
   GITHUB_OWNER=your_github_username
   GITHUB_REPO=your_repository_name
   ```
2. In the Netlify dashboard, go to "Site settings" > "Environment variables"
3. Click "Import from a .env file"
4. Upload your `.env` file
5. Review the variables and click "Import"

## Testing Environment Variables

To verify that your environment variables are set up correctly:

1. Deploy your site to Netlify
2. Test the newsletter subscription form
3. Check if a new entry is added to the `data/subscribers.json` file in your GitHub repository

## Troubleshooting

If the subscription functionality is not working:

1. Check the Netlify function logs in the Netlify dashboard under "Functions"
2. Verify that the environment variables are set correctly
3. Ensure that the GitHub token has the necessary permissions
4. Check if the GitHub repository and path to the subscribers.json file are correct

## Security Considerations

- Never commit your `.env` file to your repository
- Regularly rotate your GitHub personal access token
- Consider using Netlify's built-in secret management for production environments
