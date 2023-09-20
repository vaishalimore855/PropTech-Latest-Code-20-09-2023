import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../BaseUrl/baseurl";
import axios from "axios";

export const getSellerList = createAsyncThunk("getSellerList", async () => {
  const response = await axios.get("http://65.20.73.28:8090/api/users/seller");
  console.log("sellerResponse------------------->", response);
  return response.data;
});
// const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");

export const getUserKycData= createAsyncThunk("getUserKycData", async ({id,data}) => {
  console.log("slice img", id,data)
  const response = await  axios.get(`http://65.20.73.28:8090/api/users/get-kyc/${id}`,data)
  console.log("User kyc Response", response)
  return response.data
})




export const getKycSellerUserid = createAsyncThunk("getKycSellerUserid", async (userId) => {
  console.log('get kyc id ------------------->',userId)
  const response = await axios.get(`http://65.20.73.28:8090/api/users/get-kyc/${userId}`);
  console.log("sellerKycResponse------>", response);
  return response.data;
});

export const getSellerbyId = createAsyncThunk("getSellerbyId", async (id) => {
  const response = await axios.get(
    `http://65.20.73.28:8090/api/users/UserDetails/${id}`
  );
  console.log("sellerbyidResponse", response);
  return response.data;
});

const SellerSlice = createSlice({
  name: "seller",

  initialState: {
    Sellers: [],
    Seller: {},
    KycUserid: {},
    KycData:{},
    status: "",
    error: "",
  },

  extraReducers(builder) {
    // add seller
    builder
      .addCase(getSellerList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getSellerList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.Sellers = action.payload;
      })
      .addCase(getSellerList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //kyc list
      .addCase(getKycSellerUserid.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getKycSellerUserid.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.KycUserid = action.payload;
      })
      .addCase(getKycSellerUserid.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getUserKycData.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.KycData = action.payload
    })
      .addCase(getSellerbyId.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getSellerbyId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.Seller = action.payload;
      })
      .addCase(getSellerbyId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default SellerSlice.reducer;
