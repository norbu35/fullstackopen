import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/loginService';
import blogsService from '../services/blogsService';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { setUser } = userSlice.actions;

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password });
    window.localStorage.setItem('loggedUser', JSON.stringify(user));
    blogsService.setToken(user.token);
    dispatch(setUser(user));
  };
};
export default userSlice.reducer;
