import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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
  async ({ email, password, name }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: name,
    });

    console.log(data);
    return {
      email: data.user.email,
      name: data.user.displayName,
    };
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
        state.isError = true;
        state.name = "";
        state.email = "";
        state.error = action.error.message;
      });
  },
});

//  userSlice export
export default userSlice.reducer;
