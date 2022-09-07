import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import Users from './components/UsersComponent';
import User from './components/UserComponent';
import Blog from './components/BlogComponent';
import Blogs from './components/BlogsComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="users" element={<Users />}>
            <Route path=":userId" element={<User />} />
          </Route>
          <Route path="blogs" element={<Blogs />}>
            <Route path=":blogId" element={<Blog />} />
          </Route>
        </Route>
      </Routes>
    </Provider>
  </Router>
);
