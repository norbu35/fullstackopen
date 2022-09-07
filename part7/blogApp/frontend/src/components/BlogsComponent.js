import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

const Blogs = () => {
  const blogs = useSelector(({ blogs }) => {
    const blogsCopy = blogs.slice();
    return blogsCopy.sort((a, b) => b.likes - a.likes);
  });

  return (
    <div>
      <div>
        <h1>Blogs</h1>
        <ListGroup>
          {blogs.map((blog) => (
            <ListGroup.Item key={blog.id}>
              <Link to={blog.id}>{blog.title}</Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <Outlet />
    </div>
  );
};

export default Blogs;
