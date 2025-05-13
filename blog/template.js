// This script processes blog posts with frontmatter
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
        
        // Create the formatted content
        let htmlContent = '';
        
        // Add the title
        if (frontmatter.title) {
          document.title = frontmatter.title + ' | Central Landscaping Blog';
          const titleElement = document.querySelector('h1.blog-title');
          if (titleElement) {
            titleElement.textContent = frontmatter.title;
          }
        }
        
        // Add the date
        if (frontmatter.date) {
          const dateElement = document.querySelector('.blog-date');
          if (dateElement) {
            const date = new Date(frontmatter.date);
            dateElement.textContent = date.toLocaleDateString();
          }
        }
        
        // Add the featured image
        if (frontmatter.thumbnail) {
          const imgElement = document.querySelector('.blog-image');
          if (imgElement) {
            imgElement.src = frontmatter.thumbnail;
            imgElement.alt = frontmatter.title || 'Blog post image';
          }
        }
        
        // Process the Markdown content
        // This is a very simple Markdown processor
        const paragraphs = markdownContent.split('\n\n');
        htmlContent = paragraphs.map(p => {
          if (p.trim() === '') return '';
          if (p.startsWith('# ')) {
            return `<h2>${p.substring(2).trim()}</h2>`;
          } else if (p.startsWith('## ')) {
            return `<h3>${p.substring(3).trim()}</h3>`;
          } else if (p.startsWith('### ')) {
            return `<h4>${p.substring(4).trim()}</h4>`;
          } else {
            return `<p>${p.trim()}</p>`;
          }
        }).join('');
        
        // Update the content
        content.innerHTML = htmlContent;
      }
    }
  }
}); 