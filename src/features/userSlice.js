import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo:null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login : (state,action)=>{
        state.userInfo = action.payload;
    },
    logout: (state)=>{
        state.userInfo  = null;
    }
  },
});

export const {
    login,
    logout
} = userSlice.actions;

export const selectUserInfo = (state) =>
  state.user.userInfo;

export default userSlice.reducer