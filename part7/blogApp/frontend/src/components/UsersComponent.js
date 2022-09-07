import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../reducers/usersReducer';
import { Link, Outlet } from 'react-router-dom';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(({ users }) => users);

  useEffect(() => {
    dispatch(setUsers());
  }, [dispatch]);

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Blogs created</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Outlet />
    </div>
  );
};

export default Users;
