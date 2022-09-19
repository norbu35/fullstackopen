const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const Comment = require('../models/commentModel');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1, user: 1 });
  res.json(blogs);
});

blogsRouter.post('/', userExtractor, async (req, res, next) => {
  const { body, userId } = req;
  const user = await User.findById(userId);
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  try {
    const result = await newBlog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();
    return res.status(201).json(result);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    return next(err);
  }
});

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const { userId } = req;
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const blogToRemove = await Blog.findById(req.params.id);

  if (blogToRemove.user.toString() !== userId) {
    return res
      .status(401)
      .json({ error: "you aren't allowed to delete this blog" });
  }

  await Blog.findByIdAndRemove(req.params.id);
  return res.status(204).json({ message: 'Deleted sucessfully' });
});

blogsRouter.put('/:id', async (req, res) => {
  const { body } = req;

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, newBlog, {
    new: true,
  });

  res.status(204).send(updatedBlog);
});

blogsRouter.post('/:id/comments', userExtractor, async (req, res) => {
  const { body, userId } = req;
  const user = await User.findById(userId);
  const blog = await Blog.findById(req.params.id);

  const newComment = new Comment({
    content: body.content,
    user: user._id,
    blog: blog._id,
  });

  const result = await newComment.save();
  blog.comments = blog.comments.concat(result._id);
  await blog.save();
  res.status(201).json({ message: `${result.content} saved` });
});

module.exports = blogsRouter;
