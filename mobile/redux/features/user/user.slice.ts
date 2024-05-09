import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
  createdUser: false,
  updatedUser: {},
  deletedUser: false,
  isLoading: false,
  signedIn: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    openLoader: (state) => {
      state.isLoading = true;
    },
    fetchUser: (state, action) => {
      state.currentUser = action.payload;
      state.error = "";
      state.signedIn = true;
    },
    createUser: (state) => {
      state.createdUser = true;
    },
    deleteUser: (state) => {
      state.deletedUser = true;
    },
    updatedUser: (state, action) => {
      state.updatedUser = action.payload;
    },
    catchError: (state, action) => {
      state.error = action.payload.message;
    },
    closeLoader: (state) => {
      state.isLoading = false;
    },
  },
});

export const userReducer = userSlice.reducer;
