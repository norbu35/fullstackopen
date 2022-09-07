import { createSlice } from '@reduxjs/toolkit';
import blogsService from '../services/blogsService';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    set(state, action) {
      return action.payload;
    },
    update(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    },
    remove(state, action) {
      state.splice(
        state.findIndex((state) => state.id === action.payload.id),
        1
      );
    },
    create(state, action) {
      state.push(action.payload);
    },
  },
});

export const { set, update, remove, create } = blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch(set(blogs));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    dispatch(update(blog));
    await blogsService.update(updatedBlog);
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    dispatch(remove(blog));
    await blogsService.remove(blog);
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const createdBlog = await blogsService.create(blog);
    dispatch(create(createdBlog));
  };
};

export default blogsSlice.reducer;
