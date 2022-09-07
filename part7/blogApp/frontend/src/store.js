import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from './reducers/blogsReducer';
import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';
import usersReducer from './reducers/usersReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    blogs: blogsReducer,
    notification: notificationReducer,
  },
});

export default store;
