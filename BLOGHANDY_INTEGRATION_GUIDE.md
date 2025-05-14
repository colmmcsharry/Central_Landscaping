# BlogHandy Integration Guide for Central Landscaping

This guide will walk you through setting up and integrating BlogHandy with your Central Landscaping website.

## What is BlogHandy?

BlogHandy is a headless blogging platform that seamlessly integrates with any existing website. It automatically adapts to your website's design, requires zero maintenance, and provides built-in SEO tools.

## Step 1: Sign Up for BlogHandy

1. Go to [BlogHandy.com](https://www.bloghandy.com/)
2. Click "Try for free" or "Sign up"
3. Follow the registration process
4. Choose a plan based on your needs (start with the free plan to test)

## Step 2: Configure Your BlogHandy Account

1. After signing in, follow BlogHandy's setup wizard
2. Set your blog name (e.g., "Central Landscaping Blog")
3. Configure your blog's URL structure (typically "/blog")
4. Choose a template that matches your website's style

## Step 3: Get Your Integration Code

1. In your BlogHandy dashboard, look for "Integration" or "Install"
2. Copy the provided JavaScript code snippet (it will look similar to the one in blog-handy.html)
3. Make sure to note your unique BlogHandy Site ID

## Step 4: Add BlogHandy to Your Website

1. Open the blog-handy.html file we've prepared
2. Replace `YOUR_BLOGHANDY_SITE_ID` with your actual BlogHandy Site ID
3. Test the integration by opening blog-handy.html in your browser

## Step 5: Update Your Website Navigation

1. Update all the links in your website that point to blog.html to point to blog-handy.html instead
2. If you're ready to fully switch, rename blog-handy.html to blog.html (after backing up the original)

## Step 6: Migrate Your Existing Blog Content

1. Log in to your BlogHandy dashboard
2. Create new blog posts for each of your existing posts
3. Copy the content, images, and metadata from your old posts
4. Publish the posts in BlogHandy

## Step 7: Clean Up (Optional)

Once your BlogHandy integration is working properly and all content is migrated, you can remove the following files that were part of your old blog system:

- blog.js
- blog-viewer.html
- blog/auto-index-generator.js
- blog/index.json
- blog/template.js
- blog/markdown-helper.js
- Any old blog post files in the blog/ directory

## Troubleshooting

If your BlogHandy integration isn't working properly:

1. Check the browser console for JavaScript errors
2. Verify your Site ID is correct
3. Ensure the BlogHandy script is loading properly
4. Check your BlogHandy dashboard for any account issues

## Support

If you need assistance with BlogHandy:

- Visit the [BlogHandy Help Center](https://help.bloghandy.com/)
- Contact BlogHandy support via [email protected]

## Benefits of Using BlogHandy

- **No Technical Maintenance**: No need to worry about updates, security, or hosting
- **Built-in SEO Tools**: SEO Analyzer and Google Indexer to help your content rank
- **Proper Content Formatting**: Markdown support ensures proper formatting
- **Simple Content Management**: User-friendly interface for non-technical users
- **Design Integration**: Automatically adopts your website's design without custom CSS 