import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { likeBlog, removeBlog } from '../reducers/blogsReducer';

const Blog = ({ blog, user }) => {
  const [visible, setVisibility] = useState(false);
  const dispatch = useDispatch();
  const blogStyle = {
    border: '1px solid black',
    margin: 5,
  };

  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisibility(!visible);
  };

  const handleLike = (blog) => {
    dispatch(likeBlog(blog));
  };

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove '${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog));
    }
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
        {blog.user.username}
        <br />
        {user ? (
          blog.user.id === user.id ? (
            <button id="blog__remove" onClick={() => handleRemove(blog)}>
              remove
            </button>
          ) : null
        ) : null}
      </div>
    </div>
  );
};

export default Blog;
