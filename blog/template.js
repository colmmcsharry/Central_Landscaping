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
        
        // Determine if this is markdown or HTML content
        const isMarkdown = frontmatter.layout && frontmatter.layout === 'markdown' || 
                           content.getAttribute('data-format') === 'markdown';
        
        // Create the formatted content
        let htmlContent = '';
        
        // If it's markdown, process it
        if (isMarkdown) {
          htmlContent = processMarkdown(markdownContent);
        } else {
          // It's HTML, use it as is
          htmlContent = markdownContent;
        }
        
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
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            dateElement.textContent = date.toLocaleDateString('en-US', options);
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
        
        // Update the content
        content.innerHTML = htmlContent;
      }
    }
  }
});

/**
 * Simple Markdown to HTML processor
 * @param {string} markdown - The markdown content to convert
 * @returns {string} The converted HTML
 */
function processMarkdown(markdown) {
  if (!markdown) return '';
  
  // Process headers
  markdown = markdown.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  markdown = markdown.replace(/^## (.*$)/gm, '<h2>$1</h2>');
  markdown = markdown.replace(/^# (.*$)/gm, '<h1>$1</h1>');
  
  // Process bold and italic
  markdown = markdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  markdown = markdown.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Process links
  markdown = markdown.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  
  // Process images
  markdown = markdown.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');
  
  // Process unordered lists
  let hasUnorderedList = markdown.match(/^\s*[\*\-\+] (.*)$/gm);
  if (hasUnorderedList) {
    // Start by marking list items
    markdown = markdown.replace(/^\s*[\*\-\+] (.*)$/gm, '<li>$1</li>');
    
    // Then group consecutive list items into lists
    let inList = false;
    const lines = markdown.split('\n');
    markdown = lines.map(line => {
      if (line.startsWith('<li>')) {
        if (!inList) {
          inList = true;
          return '<ul>' + line;
        }
        return line;
      } else if (inList) {
        inList = false;
        return '</ul>\n' + line;
      }
      return line;
    }).join('\n');
    
    // Close any open list at the end
    if (inList) {
      markdown += '\n</ul>';
    }
  }
  
  // Process ordered lists
  let hasOrderedList = markdown.match(/^\s*\d+\. (.*)$/gm);
  if (hasOrderedList) {
    // Start by marking list items
    markdown = markdown.replace(/^\s*\d+\. (.*)$/gm, '<li>$1</li>');
    
    // Then group consecutive list items into lists
    let inList = false;
    const lines = markdown.split('\n');
    markdown = lines.map(line => {
      if (line.startsWith('<li>') && !line.startsWith('<li><li>')) {
        if (!inList) {
          inList = true;
          return '<ol>' + line;
        }
        return line;
      } else if (inList && !line.startsWith('<li>')) {
        inList = false;
        return '</ol>\n' + line;
      }
      return line;
    }).join('\n');
    
    // Close any open list at the end
    if (inList) {
      markdown += '\n</ol>';
    }
  }
  
  // Process blockquotes
  markdown = markdown.replace(/^\> (.*$)/gm, '<blockquote>$1</blockquote>');
  
  // Process code blocks
  markdown = markdown.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  
  // Process inline code
  markdown = markdown.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Process paragraphs (avoid adding paragraphs inside lists or other block elements)
  const lines = markdown.split('\n');
  let inBlock = false;
  let result = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const nextLine = i < lines.length - 1 ? lines[i + 1].trim() : '';
    
    if (line === '') {
      // Empty line, just add it
      result += '\n';
      continue;
    }
    
    // Check if we're in a block element
    inBlock = line.startsWith('<h') || line.startsWith('<ul') || 
              line.startsWith('<ol') || line.startsWith('<li') || 
              line.startsWith('<blockquote') || line.startsWith('<pre') ||
              line.startsWith('</ul') || line.startsWith('</ol') ||
              line.startsWith('</blockquote') || line.startsWith('</pre');
    
    // If not in a block and line isn't empty, it's a paragraph
    if (!inBlock && line !== '' && !line.startsWith('<p>') && !line.startsWith('<h') && 
        !line.startsWith('<ul') && !line.startsWith('<ol') && !line.startsWith('<blockquote') && 
        !line.startsWith('<pre') && !line.startsWith('</ul') && !line.startsWith('</ol') && 
        !line.startsWith('</blockquote') && !line.startsWith('</pre')) {
      
      result += '<p>' + line + '</p>\n';
    } else {
      result += line + '\n';
    }
  }
  
  return result;
} 