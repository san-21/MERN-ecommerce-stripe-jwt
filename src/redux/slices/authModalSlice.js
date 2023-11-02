import { createSlice } from "@reduxjs/toolkit";

const authModalSlice = createSlice({
  name: "authModal",
  initialState: {
    registerDialogOpen: false,
    loginDialogOpen: false,
  },
  reducers: {
    setDialogOpen: (state) => {
      state.registerDialogOpen = true;
    },
    setDialogClose: (state) => {
      state.registerDialogOpen = false;
    },
    setLoginDialogOpen: (state) => {
      state.loginDialogOpen = true;
    },
    setLoginDialogClose: (state) => {
      state.loginDialogOpen = false;
    },
  },
});

export const {
  setDialogOpen,
  setDialogClose,
  setLoginDialogClose,
  setLoginDialogOpen,
} = authModalSlice.actions;

const authModalReducer = authModalSlice.reducer;

export default authModalReducer;
