/**
 * Simple blog rendering script
 */
document.addEventListener('DOMContentLoaded', function() {
  // Fetch blog posts from index.json
  fetch('./blog/index.json')
    .then(response => response.json())
    .then(posts => {
      const blogContainer = document.getElementById('blog-posts');
      if (!blogContainer) return;
      
      // Clear any existing content
      blogContainer.innerHTML = '';
      
      // Display the posts
      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'blog-post';
        
        // Create the blog card HTML
        postElement.innerHTML = `
          <div class="relative mx-auto my-6 shadow-lg rounded-xl w-full max-w-4xl">
            <img src="${post.thumbnail}" alt="${post.title}" class="w-full h-64 object-cover rounded-t-xl">
            <div class="p-6">
              <h3 class="text-2xl font-bold mb-4">${post.title}</h3>
              <p class="text-gray-600 mb-2">${new Date(post.date).toLocaleDateString()}</p>
              <p class="text-gray-700 mb-4">${post.description}</p>
              <a href="./blog-viewer.html?post=${post.slug}" class="inline-block px-5 py-2 font-bold text-white rounded-full bg-lightgreen hover:bg-darkgreen transition-colors duration-200">Read More</a>
            </div>
          </div>
        `;
        
        blogContainer.appendChild(postElement);
      });
    })
    .catch(error => {
      console.error('Error loading blog posts:', error);
      const blogContainer = document.getElementById('blog-posts');
      if (blogContainer) {
        blogContainer.innerHTML = '<p class="text-center p-10">Blog posts are coming soon!</p>';
      }
    });

  // Check if this is a blog post page
  const postViewer = document.getElementById('blog-post-viewer');
  if (postViewer) {
    // Get the post slug from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const postSlug = urlParams.get('post');
    
    if (postSlug) {
      // Fetch the post content
      fetch(`./blog/${postSlug}`)
        .then(response => response.text())
        .then(content => {
          // Extract frontmatter and content
          const parts = content.split('---');
          if (parts.length >= 3) {
            // Parse frontmatter
            const frontmatter = {};
            const frontmatterLines = parts[1].trim().split('\n');
            frontmatterLines.forEach(line => {
              const colonIndex = line.indexOf(':');
              if (colonIndex > 0) {
                const key = line.substring(0, colonIndex).trim();
                const value = line.substring(colonIndex + 1).trim();
                frontmatter[key] = value;
              }
            });

            // Get the main content
            const markdown = parts.slice(2).join('---').trim();
            
            // Use a simple Markdown converter
            // You could use a library like marked.js for better formatting
            let html = markdown
              // Convert headers
              .replace(/^### (.*$)/gm, '<h3>$1</h3>')
              .replace(/^## (.*$)/gm, '<h2>$1</h2>')
              .replace(/^# (.*$)/gm, '<h1>$1</h1>')
              
              // Convert bold and italic
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              
              // Convert links
              .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
              
              // Convert paragraphs (simple)
              .split('\n\n').map(p => `<p>${p}</p>`).join('');
            
            // Update the page with post details
            document.querySelector('.blog-title').textContent = frontmatter.title || '';
            document.querySelector('.blog-date').textContent = new Date(frontmatter.date).toLocaleDateString();
            document.querySelector('.blog-image').src = frontmatter.thumbnail || '';
            document.querySelector('.blog-image').alt = frontmatter.title || '';
            
            postViewer.innerHTML = html;
          } else {
            postViewer.innerHTML = '<p>Error loading blog post.</p>';
          }
        })
        .catch(error => {
          console.error('Error loading blog post:', error);
          postViewer.innerHTML = '<p>Error loading blog post.</p>';
        });
    }
  }
}); 