import { useState } from 'react';

const Blog = ({ blog, handleLike, user, handleRemove }) => {
  const [visible, setVisibility] = useState(false);

  const blogStyle = {
    border: '1px solid black',
    margin: 5,
  };

  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisibility(!visible);
  };

  return (
    <div className="blogHeader" style={blogStyle}>
      {blog.title} by {blog.author}
      <button id="blog__view" onClick={toggleVisibility}>
        View
      </button>
      <div className="togglable" style={showWhenVisible}>
        {blog.url}
        <br />
        {blog.likes}{' '}
        <button id="blog__like" onClick={() => handleLike(blog)}>
          like
        </button>
        <br />
        {blog.user?.name}
        <br />
        {blog.user?.username === user?.username ? (
          <button id="blog__remove" onClick={() => handleRemove(blog)}>
            remove
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Blog;
