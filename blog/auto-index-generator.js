/**
 * Blog Index Generator
 * Automatically creates/updates index.json based on blog files
 */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Directory where blog posts are stored
const BLOG_DIR = __dirname;
const INDEX_FILE = path.join(BLOG_DIR, 'index.json');

/**
 * Generate the blog index.json file
 */
function generateBlogIndex() {
  try {
    // Read all files in the blog directory
    const files = fs.readdirSync(BLOG_DIR);
    
    // Filter only HTML files and exclude templates
    const blogFiles = files.filter(file => 
      file.endsWith('.html') && 
      !file.includes('template') &&
      !file.includes('index.html')
    );
    
    // Extract frontmatter data from each blog file
    const blogData = blogFiles.map(file => {
      const filePath = path.join(BLOG_DIR, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(content);
      
      // Create a slug from the filename (without extension)
      const slug = file.replace('.html', '');
      
      return {
        title: data.title || 'Untitled Blog Post',
        slug: slug,
        date: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
        thumbnail: data.thumbnail || '',
        description: data.description || ''
      };
    });
    
    // Sort by date (newest first)
    blogData.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Write the data to index.json
    fs.writeFileSync(INDEX_FILE, JSON.stringify(blogData, null, 2));
    
    console.log('Blog index.json generated successfully');
  } catch (error) {
    console.error('Error generating blog index:', error);
  }
}

// Run the index generator
generateBlogIndex();

// Export for use in other scripts
module.exports = { generateBlogIndex }; 