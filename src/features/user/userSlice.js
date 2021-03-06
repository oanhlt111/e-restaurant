import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, {payload}) => {
      if(!state.isAuthenticated){
        return ({
          ...state,
          isAuthenticated: true,
          user: payload
        });
      }
    },
    removeUser: () => {
      return initialState;
    }
  }
});

export default userSlice.reducer;

export const {setUser, removeUser} = userSlice.actions;

export const selectorUser = state => state.user;