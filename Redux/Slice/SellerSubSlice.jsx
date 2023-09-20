import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../BaseUrl/baseurl";
import axios from "axios";
const token = localStorage.getItem("token");
//seller
export const getSellerSubscriptionList = createAsyncThunk("getSellerSubscriptionList", async (type) => {
  const response = await axios.get(`http://65.20.73.28:8090/api/subscriptions/Seller`,{
    headers: {
      authorization:token }
  });
  console.log("SubscriptionResponse", response);
  return response.data.data;
});

export const getSellerSubscriptionbyId = createAsyncThunk("getSellerSubscriptionbyId", async (id) => {
  const response = await axios.get(`http://65.20.73.28:8090/api/subscriptions/subscriptiondetails/${id}`,{
    headers: {
      authorization:token }
  });
  console.log("seller resp", response.data);
  return response.data.data
});
const SellerSubSlice = createSlice({
  name: "SellerSubscriptionData",

  initialState: {
    SellerSubscriptions: [],
    SellerSubscription: {},
    SellerSubscriptionByid:{},
    status: "",
    error: "",
  },

  extraReducers(builder) {
    // add buyer
    builder
      .addCase(getSellerSubscriptionList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getSellerSubscriptionList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.SellerSubscriptions = action.payload;
      })
      .addCase(getSellerSubscriptionList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
     

      .addCase(getSellerSubscriptionbyId.pending, (state, action) => {
        state.status = "loading";
        
      })
      .addCase(getSellerSubscriptionbyId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.SellerSubscription = action.payload;
      })
      .addCase(getSellerSubscriptionbyId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default SellerSubSlice.reducer;
