// Libraries
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
// Services
import blogsService from './services/blogs';
// Reducers
import {
  setNotification,
  clearNotification,
} from './reducers/notificationReducer';
import {
  initializeBlogs,
  likeBlog,
  removeBlog,
  createBlog,
} from './reducers/blogsReducer';
import { login, setUser } from './reducers/userReducer';

const App = () => {
  const user = useSelector(({ user }) => user);
  const blogs = useSelector(({ blogs }) => {
    const blogsCopy = blogs.slice();
    return blogsCopy.sort((a, b) => b.likes - a.likes);
  });
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogsService.setToken(user.token);
    }
  }, []);

  const setNotificationDuration = (message, type, duration) => {
    dispatch(setNotification({ message, type }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, duration * 1000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setPassword('');
    setUsername('');
    try {
      dispatch(login(username, password));
      blogsService.setToken(user.token);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
    } catch (err) {
      setNotificationDuration('invalid username or password', 'error', 5);
    }
  };

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value);
  };

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    window.location.reload();
  };

  const addBlog = async (blog) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blog));
    setNotificationDuration(`Added blog ${blog.title}`, 'notification', 5);
  };

  const showBlogs = () => {
    return (
      <div className="user-panel">
        <h2>blogs</h2>
        {user ? (
          <p>
            {user.username} logged in{' '}
            <button id="user__logout" onClick={handleLogout}>
              Logout
            </button>
          </p>
        ) : null}
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleLike={handleLike}
            handleRemove={handleRemove}
          />
        ))}
      </div>
    );
  };

  const handleLike = (blog) => {
    dispatch(likeBlog(blog));
  };

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove '${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog));
    }
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login" startVisible={true}>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          handleLogin={handleLogin}
        />
      </Togglable>
    );
  };

  const blogForm = () => {
    return (
      <Togglable buttonLabel="add blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
    );
  };
  return (
    <div>
      <Notification />
      {showBlogs()}
      {user ? blogForm() : null}
      {user ? null : loginForm()}
    </div>
  );
};

export default App;
