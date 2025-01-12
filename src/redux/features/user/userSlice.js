import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../../utils/firebase.config";

const initialState = {
  name: "",
  email: "",
  isloading: true,
  isError: false,
  error: "",
};

export const createUser = createAsyncThunk(
  "userSlice/createUser",
  async ({ email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    console.log(data);
    return;
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isloading = true;
        state.isError = false;
        state.name = "";
        state.email = "";
        state.error = "";
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.isloading = true;
        state.isError = false;
        state.name = payload.name;
        state.email = payload.email;
        state.error = "";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isloading = false;
        state.isError = false;
        state.name = "";
        state.email = "";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;

//  apiKey: "AIzaSyC0Mix2vEXI_HciI-gdQXAvdi6ioCwubJU",
//   authDomain: "redux-task-app-66893.firebaseapp.com",
//   projectId: "redux-task-app-66893",
//   storageBucket: "redux-task-app-66893.firebasestorage.app",
//   messagingSenderId: "704706919883",
//   appId: "1:704706919883:web:91cc02ce3bff42ff274a4e"
