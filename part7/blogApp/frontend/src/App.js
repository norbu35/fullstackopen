// Libraries
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
// Components
import BlogForm from './components/BlogFormComponent';
import LoginForm from './components/LoginFormComponent';
import Notification from './components/NotificationComponent';
import Togglable from './components/TogglableComponent';
// Reducers
import {
  setNotification,
  clearNotification,
} from './reducers/notificationReducer';
import { initializeBlogs, createBlog } from './reducers/blogsReducer';
import { login, setUser } from './reducers/userReducer';
// Services
import blogsService from './services/blogsService';
import Navigation from './components/NavigationComponent';

const App = () => {
  const loggedUser = useSelector(({ user }) => user);
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
      const loggedUser = JSON.parse(loggedUserJSON);
      dispatch(setUser(loggedUser));
      blogsService.setToken(loggedUser.token);
    }
  }, []);

  const setNotificationDuration = (message, type, duration) => {
    dispatch(setNotification({ message, type }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, duration * 1000);
  };

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      dispatch(login(username, password));
      setPassword('');
      setUsername('');
    } catch {
      setNotificationDuration('', 'error', 5);
    }
  };

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value);
  };

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  const addBlog = async (blog) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blog));
    setNotificationDuration(`Added blog ${blog.title}`, 'notification', 5);
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
      <Togglable buttonLabel="Add Blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
    );
  };

  return (
    <div className="container">
      <Navigation />
      <Notification />
      {loggedUser ? blogForm() : null}
      {loggedUser ? null : loginForm()}
      {loggedUser ? <Outlet /> : null}
    </div>
  );
};

export default App;
