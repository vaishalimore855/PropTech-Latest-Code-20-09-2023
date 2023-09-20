import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../BaseUrl/baseurl";
import axios from "axios";
const token = localStorage.getItem("token");
//buyer
// const type= "buyer"
export const getSubscriptionList = createAsyncThunk("getSubscriptionList", async (type) => {
  const response = await axios.get(`http://65.20.73.28:8090/api/subscriptions/Buyer`,{
    headers: {
      authorization:token }
  });
  console.log("SubscriptionResponse", response);
  return response.data.data;
});

export const getSubscriptionbyId = createAsyncThunk("getSubscriptionbyId", async (id) => {
  const response = await axios.get(`http://65.20.73.28:8090/api/subscriptions/subscriptiondetails/${id}`,{
    headers: {
      authorization:token }
  });
  console.log("buyer resp", response.data);
  return response.data.data
});
const SubscriptionSlice = createSlice({
  name: "SubscriptionData",

  initialState: {
    Subscriptions: [],
    Subscription: {},
    SubscriptionByid:{},
    status: "",
    error: "",
  },

  extraReducers(builder) {
    // add buyer
    builder
      .addCase(getSubscriptionList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getSubscriptionList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.Subscriptions = action.payload;
      })
      .addCase(getSubscriptionList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
     

      .addCase(getSubscriptionbyId.pending, (state, action) => {
        state.status = "loading";
        
      })
      .addCase(getSubscriptionbyId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.Subscription = action.payload;
      })
      .addCase(getSubscriptionbyId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default SubscriptionSlice.reducer;
