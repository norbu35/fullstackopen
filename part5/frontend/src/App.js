import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser(user);
      setPassword('');
      setUsername('');
    } catch (exception) {
      setMessage({ content: 'wrong credentials', type: 'error' });
      setTimeout(() => {
        setMessage({ content: null });
      }, 5000);
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

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    const res = await blogService.create(blogObject);
    setMessage({ content: `Created '${res.title}'`, type: 'notification' });
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const showBlogs = () => {
    return (
      <div className="user-panel">
        <h2>blogs</h2>
        {user ? (
          <p>
            {user.name} logged in{' '}
            <button id="user__logout" onClick={handleLogout}>
              Logout
            </button>
          </p>
        ) : null}
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
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

  const handleLike = async (blog) => {
    blog.likes += 1;
    await blogService.update(blog);
  };

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove '${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog);
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
      <Notification message={message} />
      {showBlogs()}
      {user ? blogForm() : null}
      {user ? null : loginForm()}
    </div>
  );
};

export default App;
