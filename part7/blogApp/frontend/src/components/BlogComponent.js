import { useDispatch, useSelector } from 'react-redux';
import { likeBlog, removeBlog } from '../reducers/blogsReducer';
import blogsService from '../services/blogsService';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Blog = () => {
  const [comment, setComment] = useState('');
  const params = useParams();
  const dispatch = useDispatch();

  const blog = useSelector(({ blogs }) =>
    blogs.find((blog) => blog.id === params.blogId)
  );
  const user = useSelector(({ user }) => user);

  const handleLike = (blog) => {
    dispatch(likeBlog(blog));
  };

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove '${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog));
    }
  };

  const handleCommentChange = async ({ target }) => {
    setComment(target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    await blogsService.comment(blog, comment);
    setComment('');
  };

  if (!blog) {
    return null;
  }

  return (
    <Container>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <div>{blog.url}</div>
      <div>
        {blog.likes}{' '}
        <Button id="blog__like" onClick={() => handleLike(blog)}>
          like
        </Button>
        <br />
        {user ? (
          blog.user?.id === user.id ? (
            <button id="blog__remove" onClick={() => handleRemove(blog)}>
              remove
            </button>
          ) : null
        ) : null}
        <div>Added by {user.name}</div>
        <br />
        <h3>Comments</h3>
        {
          <ul>
            {blog.comments.map((comment) => (
              <li key={comment.id}>{comment.content}</li>
            ))}
          </ul>
        }
        <Form className="col-3" onSubmit={handleCommentSubmit}>
          <Form.Control type="textarea" onChange={handleCommentChange} />
          <Button type="submit">comment</Button>
        </Form>
      </div>
    </Container>
  );
};

export default Blog;
