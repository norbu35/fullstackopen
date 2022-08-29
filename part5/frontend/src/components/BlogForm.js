import React, { useState } from 'react';

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreateBlog = (event) => {
    event.preventDefault();

    const blog = {
      title,
      author,
      url,
    };

    addBlog(blog);
  };

  return (
    <div>
      <form onSubmit={handleCreateBlog}>
        <h2>Create blog</h2>
        <div>
          title:
          <input
            type="text"
            name="Title"
            id="blog__form__input__title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="Author"
            id="blog__form__input__author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="Url"
            id="blog__form__input__url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="blog__form__submit" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
