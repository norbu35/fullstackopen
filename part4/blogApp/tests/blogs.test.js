const supertest = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const { initialBlogs, blogsInDb, usersInDb } = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogs = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogs.map((blog) => blog.save());
  await Promise.all(promiseArray);
}, 1000000);

describe("blog posts", () => {
  describe("there are intially blogs", () => {
    test("returns correct number of blogs", async () => {
      const response = await api.get("/api/blogs");
      expect(response.body).toHaveLength(initialBlogs.length);
    });

    test("make sure that blogs have an id", async () => {
      const response = await blogsInDb();
      const blogToView = response[0];
      expect(blogToView.id).toBeDefined();
    });
  });

  describe("create new blogs", () => {
    test("can sucessfully create a blog post", async () => {
      const newBlog = {
        title: "test blog from jest",
        author: "Jest",
        url: "testURL",
        likes: 5,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await blogsInDb();
      expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);

      const titles = blogsAtEnd.map((b) => b.title);
      expect(titles).toContain("test blog from jest");
    });

    test("if the value of likes is missing, default to 0", async () => {
      const blog = {
        title: "test from jest",
        author: "norov",
        url: "testurl.com",
      };

      await api.post("/api/blogs").send(blog).expect(201);

      const blogsAtStart = await blogsInDb();
      const blogToView = blogsAtStart.find((b) => b.title === "test from jest");
      expect(blogToView.likes === 0);
    });

    test("if title or url is missing, respond with 400", async () => {
      const blog = {
        author: "Jest",
      };

      await api.post("/api/blogs").send(blog).expect(400);
    });
  });

  describe("delete blogs", () => {
    test("can delete one blog", async () => {
      const blogsAtStart = await blogsInDb();
      const blogToBeDeleted = blogsAtStart[0];

      await api.delete(`/api/blogs/${blogToBeDeleted.id}`).expect(204);

      const blogsAtEnd = await blogsInDb();
      const blogIds = blogsAtEnd.map((b) => b.id);

      expect(blogIds).not.toContain(blogToBeDeleted.id);
    });
  });

  describe("update blogs", () => {
    test("can update number of likes on a blog", async () => {
      const newBlog = {
        title: "How to win against Corki",
        author: "Norov",
        url: "www.winnow.com",
        likes: 10000,
      };

      const blogsAtStart = await blogsInDb();
      const blogToUpdate = blogsAtStart.find(
        (blog) => blog.title === newBlog.title
      );

      await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(204);

      const blogsAtEnd = await blogsInDb();
      const updatedBlog = blogsAtEnd.find(
        (blog) => blogToUpdate.id === blog.id
      );

      expect(updatedBlog.likes).toEqual(10000);
    });
  });
});

describe("user administraton", () => {
  beforeAll(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("root", 10);
    const newUser = new User({
      username: "initial",
      name: "Initial Jest User",
      passwordHash,
    });

    await newUser.save();
  });

  test("can create a new user", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "test2",
      name: "Jest Test User 2",
      password: "root",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test("username and password has to be provided", async () => {
    let newUser = {
      username: "username",
      name: "name",
    };

    let result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    expect(result.body.error).toContain(
      "username and password has to be provided"
    );

    newUser = {
      password: "test",
      name: "test user",
    };

    result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    expect(result.body.error).toContain(
      "username and password has to be provided"
    );
  });

  test("creation fails with proper statu scode and message when username is already taken", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "initial",
      name: "initial Jest User 2",
      password: "root",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("username is already in use");
    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("fails with proper status code and message when username is shorter than 3 characters", async () => {
    const newUser = {
      username: "ab",
      name: "Jest username",
      password: "password",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "username must be longer than 3 characters"
    );
  });

  test("fails with proper status code and message when password is shorter than 3 characters", async () => {
    const newUser = {
      username: "testuser",
      name: "test",
      password: "ab",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    expect(result.body.error).toContain(
      "password must be longer than 3 characters"
    );
  });
}, 100000);

afterAll(() => {
  mongoose.connection.close();
});
