// Blog Post Preview component for the admin panel
import React from 'react';

const BlogPostPreview = ({ entry, widgetFor, getAsset }) => {
  const data = entry.get('data').toJS();
  const title = data.title || 'Untitled Blog Post';
  const date = data.date ? new Date(data.date) : new Date();
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const image = data.thumbnail ? getAsset(data.thumbnail) : null;
  
  return (
    <div className="blog-preview">
      <h1 className="preview-title">{title}</h1>
      <div className="preview-date">{formattedDate}</div>
      
      {image && (
        <img 
          src={image.toString()} 
          alt={title} 
          className="preview-image" 
        />
      )}
      
      <div className="preview-content">
        {widgetFor('body')}
      </div>
    </div>
  );
};

export default BlogPostPreview; 