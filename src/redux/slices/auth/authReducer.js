import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
const initialState = {
  token: null,

  userId: null,
  fullname: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
      const userData = jwtDecode(action.payload.token);
      state.userId = userData._id;
      state.fullname = userData.fullname;
    },

    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.fullname = null;
    },
  },
});

export const { setUser, setToken, logout } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
