const blogsRouter = require("express").Router();
const { user } = require("express").request;
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.post("/", async (req, res, next) => {
  const { body } = req;
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user,
  });

  try {
    const result = await newBlog.save();
    return res.status(201).json(result);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    return next(err);
  }
});

blogsRouter.delete("/:id", async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const blogToRemove = await Blog.findById(req.params.id);

  if (blogToRemove.user.toString() !== user) {
    return res
      .status(401)
      .json({ error: "you aren't allowed to delete this blog" });
  }

  await Blog.findByIdAndRemove(req.params.id);
  return res.status(204).json({ message: "Deleted sucessfully" });
});

blogsRouter.put("/:id", async (req, res) => {
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

module.exports = blogsRouter;
