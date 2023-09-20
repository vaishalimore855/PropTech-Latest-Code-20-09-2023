import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../BaseUrl/baseurl";
import axios from "axios";

export const getUserbyId = createAsyncThunk("getUserbyId", async (id) => {
  const response = await axios.get(`http://65.20.73.28:8090/api/users/${id}`);
  console.log("userbyidResponse", response);
  return response.data;
});

const UserSlice = createSlice({
  name: "user",

  initialState: {
    users: [],
    User: {},
    status: "",
    error: "",
  },

  extraReducers(builder) {
    // add user
    builder
      .addCase(getUserbyId.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUserbyId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.Seller = action.payload;
      })
      .addCase(getUserbyId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default UserSlice.reducer;
