  import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../BaseUrl/baseurl";
import axios from "axios";
const token = localStorage.getItem("token");

export const getManagersList = createAsyncThunk("getManagerList", async () => {
  const response = await axios.get("http://65.20.73.28:8090/api/managers",{
    headers: {
      authorization:token }
  });
  console.log("ManagerResponse", response.data);
  return response.data;
});



export const getManagerbyId = createAsyncThunk("getManagerbyId", async (id) => {
  const response = await axios.get(`http://65.20.73.28:8090/api/managers/${id}`,{
    headers: {
      authorization:token }
  });
  console.log("manager id resp", response.data);
  return response.data
});

const managerslice = createSlice({
  name: "ManagerData",

  initialState: {
    Managers: [],
    Manager: {},
    ManagerByid:{},
    status: "",
    error: "",
  },

  extraReducers(builder) {
    // add buyer
    builder
      .addCase(getManagersList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getManagersList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.Managers = action.payload;
      })
      .addCase(getManagersList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
     

      .addCase(getManagerbyId.pending, (state, action) => {
        state.status = "loading";
        
      })
      .addCase(getManagerbyId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.Manager = action.payload;
      })
      .addCase(getManagerbyId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default managerslice.reducer;
