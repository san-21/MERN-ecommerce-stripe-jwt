import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const initialState = {
  _id: "",
  name: "",
  email: "",
  token: localStorage.getItem("token"),
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  logoutStatus: "",
  logoutError: "",
  userLoaded: false,
  currentUser: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `https://sanwebsiteapi.onrender.com/api/register`,
        userData
      );
      localStorage.setItem("token", res.data);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `https://sanwebsiteapi.onrender.com/api/login`,
        userData
      );
      localStorage.setItem("token", res.data);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem("token");
      state._id = "";
      state.name = "";
      state.email = "";
      state.token = "";
      state.registerStatus = "";
      state.registerError = "";
      state.loginStatus = "";
      state.loginError = "";
      state.logoutStatus = "";
      state.logoutError = "";
      state.userLoaded = false;
    },
    loadUser: (state, action) => {
      const token = state.token;
      state.userLoaded = true;
      const user = jwtDecode(token);
      state._id = user._id;
      state.name = user.name;
      state.email = user.email;
      state.userLoaded = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.registerStatus = "pending";
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        state.token = action.payload;
        state._id = user._id;
        state.name = user.name;
        state.email = user.email;
        state.registerStatus = "success";
      } else {
        return state;
      }
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.registerStatus = "rejected";
      state.registerError = action.payload;
    });

    ////////////////////////login/////////////////
    builder.addCase(loginUser.pending, (state, action) => {
      state.loginStatus = "pending";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        state.token = action.payload;
        state._id = user._id;
        state.name = user.name;
        state.email = user.email;
        state.loginStatus = "success";
        state.userLoaded = true;
        state.currentUser = user;
      } else {
        return state;
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loginStatus = "rejected";
      state.loginError = action.payload;
    });
  },
});

export const { loadUser, logout } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
