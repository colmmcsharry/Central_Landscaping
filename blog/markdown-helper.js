/**
 * Markdown Helper - Simple utility to process Markdown content in blog posts
 */
document.addEventListener('DOMContentLoaded', function() {
  const content = document.getElementById('blog-content');
  
  if (content) {
    // Get the raw content
    const rawContent = content.textContent.trim();
    
    // Check if it has frontmatter (starts with ---)
    if (rawContent.startsWith('---')) {
      // Process the content
      const parts = rawContent.split('---');
      
      if (parts.length >= 3) {
        // Extract the frontmatter and content
        const frontmatterText = parts[1].trim();
        const markdownContent = parts.slice(2).join('---').trim();
        
        // Parse the frontmatter
        const frontmatter = {};
        const lines = frontmatterText.split('\n');
        lines.forEach(line => {
          const colonIndex = line.indexOf(':');
          if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim();
            frontmatter[key] = value;
          }
        });
        
        // Process the Markdown content
        let htmlContent = processMarkdown(markdownContent);
        
        // Update the content
        content.innerHTML = htmlContent;
        
        // Update page metadata if available
        updatePageMetadata(frontmatter);
      }
    }
  }
});

/**
 * Simple Markdown to HTML processor
 */
function processMarkdown(markdown) {
  // Process headers
  markdown = markdown.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  markdown = markdown.replace(/^## (.*$)/gm, '<h2>$1</h2>');
  markdown = markdown.replace(/^# (.*$)/gm, '<h1>$1</h1>');
  
  // Process bold text
  markdown = markdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Process italic text
  markdown = markdown.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Process links
  markdown = markdown.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  
  // Process unordered lists
  markdown = markdown.replace(/^\s*\* (.*$)/gm, '<li>$1</li>');
  markdown = markdown.replace(/<\/li>\n<li>/g, '</li><li>');
  markdown = markdown.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');
  
  // Process ordered lists
  markdown = markdown.replace(/^\s*\d+\. (.*$)/gm, '<li>$1</li>');
  markdown = markdown.replace(/<\/li>\n<li>/g, '</li><li>');
  markdown = markdown.replace(/(<li>.*<\/li>)/g, '<ol>$1</ol>');
  
  // Process paragraphs
  markdown = markdown.replace(/^(?!<[h|u|o|l])(.*$)/gm, '<p>$1</p>');
  markdown = markdown.replace(/<\/p>\n<p>/g, '</p><p>');
  
  return markdown;
}

/**
 * Update page metadata based on frontmatter
 */
function updatePageMetadata(frontmatter) {
  // Update title
  if (frontmatter.title) {
    document.title = frontmatter.title + ' | Central Landscaping Blog';
    const titleElement = document.querySelector('h1.blog-title');
    if (titleElement) {
      titleElement.textContent = frontmatter.title;
    }
  }
  
  // Update date
  if (frontmatter.date) {
    const dateElement = document.querySelector('.blog-date');
    if (dateElement) {
      const date = new Date(frontmatter.date);
      dateElement.textContent = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  }
  
  // Update featured image
  if (frontmatter.thumbnail) {
    const imgElement = document.querySelector('.blog-image');
    if (imgElement) {
      imgElement.src = frontmatter.thumbnail;
      imgElement.alt = frontmatter.title || 'Blog post image';
    }
  }
} 