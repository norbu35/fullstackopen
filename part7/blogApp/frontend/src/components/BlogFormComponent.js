import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreateBlog = (event) => {
    event.preventDefault();
    setTitle('');
    setAuthor('');
    setUrl('');
    const blog = {
      title,
      author,
      url,
    };
    addBlog(blog);
  };

  return (
    <div>
      <Form onSubmit={handleCreateBlog}>
        <h1>Create blog</h1>
        <Form.Group className="col-4">
          <Form.Control
            type="text"
            placeholder="Title"
            id="blog__form__input__title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <Form.Control
            type="text"
            placeholder="Author"
            id="blog__form__input__author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <Form.Control
            type="text"
            placeholder="URL"
            id="blog__form__input__url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default BlogForm;
