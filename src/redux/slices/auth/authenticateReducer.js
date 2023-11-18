import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userAuthenticated: false,
};

const authenticatedSlice = createSlice({
  name: "authenticated",
  initialState,
  reducers: {
    setUserAuthenticated: (state) => {
      state.userAuthenticated = true;
    },
    setUserUnAuthenticated: (state) => {
      state.userAuthenticated = false;
    },
  },
});

export const { setUserAuthenticated, setUserUnAuthenticated } =
  authenticatedSlice.actions;

const authenticatedReducer = authenticatedSlice.reducer;

export default authenticatedReducer;
