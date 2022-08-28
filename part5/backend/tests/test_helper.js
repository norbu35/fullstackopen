const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'How to win against Corki',
    author: 'Norov',
    url: 'www.winow.com',
    likes: 120,
  },
  {
    title: 'Test title 2',
    author: 'Test author 2',
    url: 'testurl.com',
    likes: 3,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
};
