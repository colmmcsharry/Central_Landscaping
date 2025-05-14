# Blog Publishing System

## Automatic Blog Index Generation

This website includes a system that automatically adds new blog posts to the blog listing when published. This means your client does not need to modify any JSON files or use GitHub - simply publishing a post in the admin panel is enough.

## Setup Instructions

To make this work properly, you need to set up a Netlify build hook:

1. Log into your Netlify account
2. Go to your site settings
3. Select "Build & deploy" from the left menu
4. Scroll down to "Build hooks"
5. Click "Add build hook"
6. Name it "Blog Publishing Hook" and select the branch to build (usually "main")
7. Copy the generated URL
8. Open `admin/index.html` and replace `YOUR_BUILD_HOOK_ID` with the ID from the URL you copied (it's the part after the last slash)

## How It Works

1. When a blog post is published through the admin panel, it triggers a build hook to Netlify
2. Netlify rebuilds your site
3. During the build process, the `auto-index-generator.js` script runs
4. This script scans all blog post files and builds the `index.json` file
5. The blog page uses this `index.json` file to display the list of posts

## Testing

To test if this is working:
1. Create a new blog post in the admin panel
2. Publish it
3. Wait for the site to rebuild (usually 1-2 minutes)
4. Check the blog page to see if your post appears

## Troubleshooting

If blog posts don't appear automatically:
1. Make sure the build hook is set up correctly in `admin/index.html`
2. Check that the `netlify.toml` file is present at the root of your project
3. Verify that `package.json` includes the gray-matter dependency
4. Make sure blog posts are being saved with the .html extension (check admin/config.yml)

## Manual Trigger

If needed, you can trigger the index generation manually by running:

```
npm install
npm run generate-blog-index
```

This will update the index.json file with all current blog posts. 