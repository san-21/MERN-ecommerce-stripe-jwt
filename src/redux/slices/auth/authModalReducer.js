import { createSlice } from "@reduxjs/toolkit";

const authModalSlice = createSlice({
  name: "authModal",
  initialState: {
    signupOpen: false,
    loginOpen: false,
    forgotPasswordOpen: false,
  },
  reducers: {
    setSignupClose: (state) => {
      state.signupOpen = false;
    },
    setSignupOpen: (state) => {
      state.signupOpen = true;
    },
    setLoginClose: (state) => {
      state.loginOpen = false;
    },
    setLoginOpen: (state) => {
      state.loginOpen = true;
    },
    setForgotPasswordOpen: (state) => {
      state.forgotPasswordOpen = true;
    },
    setForgotPasswordClose: (state) => {
      state.forgotPasswordOpen = false;
    },
  },
});

export const {
  setLoginClose,
  setLoginOpen,
  setSignupClose,
  setSignupOpen,
  setForgotPasswordClose,
  setForgotPasswordOpen,
} = authModalSlice.actions;

const authModalReducer = authModalSlice.reducer;
export default authModalReducer;
