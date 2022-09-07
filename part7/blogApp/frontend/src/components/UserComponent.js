import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const User = () => {
  const params = useParams();
  const user = useSelector(({ users }) =>
    users.find((user) => user.id === params.userId)
  );
  if (!user) {
    return null;
  }
  return (
    <div>
      <h1>{user.username}</h1>
      <h3>added blogs</h3>
      <ul className="list-none">
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
