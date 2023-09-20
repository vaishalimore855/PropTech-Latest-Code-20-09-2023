import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../BaseUrl/baseurl";
import axios from "axios";

const token = localStorage.getItem("token");
export const getPropertyList = createAsyncThunk("getPropertyList", async (id ) => {
  const response = await axios.get(`http://65.20.73.28:8090/api/property/getallproperty/${id}`,{
    headers: {
      authorization:token }
  });
  console.log("Property list Response", response.data);
  return response.data;
});


export const getPropertybyId = createAsyncThunk("getPropertybyId", async ( id) => {
  const response = await axios.get(`http://65.20.73.28:8090/api/property/${id}`,{
    headers: {
      authorization:token }
  });
  console.log("propertybyidResponse", response.data);
  return response.data;
});



const PropertyListingSlice = createSlice({
  name: "propertylisting",

  initialState: {
    property: [],
    propertyListingList: [],
    status: "",
    error: "",
  },

  extraReducers(builder) {
    // add seller
    builder
      .addCase(getPropertyList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPropertyList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.propertyListingList = action.payload;
      })
      .addCase(getPropertyList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getPropertybyId.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPropertybyId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.property = action.payload;
      })
      .addCase(getPropertybyId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default PropertyListingSlice.reducer;
