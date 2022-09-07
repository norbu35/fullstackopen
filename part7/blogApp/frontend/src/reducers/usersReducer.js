import { createSlice } from '@reduxjs/toolkit';
import usersService from '../services/usersService';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    set(state, action) {
      return action.payload;
    },
  },
});

export const { set } = usersSlice.actions;

export const setUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll();
    dispatch(set(users));
  };
};

export default usersSlice.reducer;
