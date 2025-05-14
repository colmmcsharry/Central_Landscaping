// Preview template for blog posts
import React from 'react';
import { format } from 'date-fns';

// Blog post preview component
const BlogPostPreview = ({ entry, widgetFor, getAsset }) => {
  const data = entry.get('data').toJS();
  const date = data.date ? new Date(data.date) : new Date();
  const formattedDate = format(date, 'MMMM d, yyyy');
  const image = getAsset(data.thumbnail);

  return (
    <article className="blog-preview">
      <header>
        <h1 className="preview-title">{data.title || 'Untitled Blog Post'}</h1>
        <div className="preview-date">
          <span>{formattedDate}</span>
        </div>
      </header>
      
      {image && (
        <div className="preview-image">
          <img src={image.toString()} alt={data.title || 'Featured image'} />
        </div>
      )}
      
      <div className="preview-content">
        {widgetFor('body')}
      </div>
    </article>
  );
};

// Register the custom preview
if (typeof window !== 'undefined' && window.CMS) {
  window.CMS.registerPreviewTemplate('blog', BlogPostPreview);
  
  // Add custom preview styles
  window.CMS.registerPreviewStyle(`
    .blog-preview {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Poppins', sans-serif;
      line-height: 1.6;
    }
    
    .preview-title {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: #333;
      font-weight: 700;
    }
    
    .preview-date {
      color: #666;
      margin-bottom: 2rem;
      font-size: 0.9rem;
    }
    
    .preview-image {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin-bottom: 2rem;
    }
    
    .preview-content {
      font-size: 1.1rem;
    }
    
    .preview-content h2 {
      font-size: 1.8rem;
      margin-top: 2rem;
      margin-bottom: 1rem;
      color: #4a8553;
    }
    
    .preview-content h3 {
      font-size: 1.5rem;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
      color: #4a8553;
    }
    
    .preview-content p {
      margin-bottom: 1.5rem;
    }
    
    .preview-content ul, .preview-content ol {
      margin-bottom: 1.5rem;
      padding-left: 1.5rem;
    }
    
    .preview-content li {
      margin-bottom: 0.5rem;
    }
    
    .preview-content a {
      color: #4a8553;
      text-decoration: underline;
    }
    
    .preview-content blockquote {
      border-left: 4px solid #4a8553;
      padding-left: 1rem;
      margin-left: 0;
      margin-right: 0;
      font-style: italic;
      color: #666;
    }
    
    .preview-content code {
      background-color: #f5f5f5;
      padding: 0.2em 0.4em;
      border-radius: 3px;
      font-family: monospace;
    }
    
    .preview-content pre {
      background-color: #f5f5f5;
      padding: 1rem;
      border-radius: 5px;
      overflow-x: auto;
      margin-bottom: 1.5rem;
    }
    
    .preview-content pre code {
      background-color: transparent;
      padding: 0;
    }
  `);
}

export default BlogPostPreview; 