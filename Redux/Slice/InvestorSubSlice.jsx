import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../BaseUrl/baseurl";
import axios from "axios";
const token = localStorage.getItem("token");
//investor
// const type = "Investor";
export const getInvestorSubscriptionList = createAsyncThunk("getInvestorSubscriptionList", async (type) => {
  const response = await axios.get(`http://65.20.73.28:8090/api/subscriptions/Investor`,{
    headers: {
      authorization:token }
  });
  console.log("investor SubscriptionResponse", response);
  return response.data.data;
});

export const getInvestorSubscriptionbyId = createAsyncThunk("getInvestorSubscriptionbyId", async (id) => {
  const response = await axios.get(`http://65.20.73.28:8090/api/subscriptions/subscriptiondetails/${id}`,{
    headers: {
      authorization:token }
  });
  console.log("investor resp", response.data);
  return response.data.data
});
const InvestorSubSlice = createSlice({
  name: "InvestorSubscriptionData",

  initialState: {
    InvestorSubscriptions: [],
    InvestorSubscription: {},
    InvestorSubscriptionByid:{},
    status: "",
    error: "",
  },

  extraReducers(builder) {
    // add investor
    builder
      .addCase(getInvestorSubscriptionList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getInvestorSubscriptionList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.InvestorSubscriptions = action.payload;
      })
      .addCase(getInvestorSubscriptionList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
     

      .addCase(getInvestorSubscriptionbyId.pending, (state, action) => {
        state.status = "loading";
        
      })
      .addCase(getInvestorSubscriptionbyId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.InvestorSubscription = action.payload;
      })
      .addCase(getInvestorSubscriptionbyId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default InvestorSubSlice.reducer;
