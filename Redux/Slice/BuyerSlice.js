import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../BaseUrl/baseurl";
import axios from "axios";

export const getBuyerList = createAsyncThunk("getBuyerlist", async () => {
  const response = await axios.get("http://65.20.73.28:8090/api/users/buyer");
  console.log("buyerResponse", response);
  return response.data;
});
// const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");

export const getUserKycData = createAsyncThunk(
  "getUserKycData",
  async ({ id, data }) => {
    console.log("slice img", id, data);
    const response = await axios.get(
      `http://65.20.73.28:8090/api/users/get-kyc/${id}`,
      data
    );
    console.log("User kyc Response", response);
    return response.data;
  }
);

export const getKycBuyerUserid = createAsyncThunk(
  "getKycBuyerUserid",
  async (userId) => {
    console.log("get kyc id ------------------->", userId);
    const response = await axios.get(
      `http://65.20.73.28:8090/api/users/get-kyc/${userId}`
    );
    console.log("buyerKycResponse------>", response);
    return response.data;
  }
);

export const getBuyerbyId = createAsyncThunk("getBuyerbyId", async (id) => {
  const response = await axios.get(
    `http://65.20.73.28:8090/api/users/UserDetails/${id}`
  );
  console.log("buyer resp", response.data);
  return response.data;
});

const BuyerSlice = createSlice({
  name: "buyer",

  initialState: {
    Buyers: [],
    Buyer: {},
    KycUserid: {},
    KycData: {},
    status: "",
    error: "",
  },

  extraReducers(builder) {
    // add buyer
    builder
      .addCase(getBuyerList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getBuyerList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.Buyers = action.payload;
      })
      .addCase(getBuyerList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //kyc list
      .addCase(getKycBuyerUserid.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getKycBuyerUserid.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.KycUserid = action.payload;
      })
      .addCase(getKycBuyerUserid.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getUserKycData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.KycData = action.payload;
      })
      .addCase(getBuyerbyId.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getBuyerbyId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.Buyer = action.payload;
      })
      .addCase(getBuyerbyId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default BuyerSlice.reducer;
