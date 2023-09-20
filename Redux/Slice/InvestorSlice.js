import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../BaseUrl/baseurl";
import axios from "axios";

export const getInvestorList = createAsyncThunk("getInvestorlist", async () => {
  const response = await axios.get("http://65.20.73.28:8090/api/users/investor");
  console.log("InvestorResponse", response);
  return response.data;
});
export const getUserKycData= createAsyncThunk("getUserKycData", async ({id,data}) => {
  console.log("slice img", id,data)
  const response = await  axios.get(`http://65.20.73.28:8090/api/users/get-kyc/${id}`,data)
  console.log("User kyc Response", response)
  return response.data
})

// const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");

export const getKycInvestorUserid = createAsyncThunk("getKycInvestorUserid", async (userId) => {
  console.log('get kyc id ------------------->',userId)
  const response = await axios.get(`http://65.20.73.28:8090/api/users/get-kyc/${userId}`);
  console.log("investorKycResponse------>", response);
  return response.data;
});


export const getInvestorById = createAsyncThunk(
  "getInvestorById",
  async (id) => {
    const response = await axios.get(
      `http://65.20.73.28:8090/api/users/UserDetails/${id}`
    );
    console.log("InvestorResponse", response);
    return response.data;
  }
);

const InvestorSlice = createSlice({
  name: "investor",

  initialState: {
    Investors: [],
    Investor: {},
    KycUserid: {},
    KycData: {},
   
    status: "",
    error: "",
  },

  extraReducers(builder) {
    // add Investor
    builder
      .addCase(getInvestorList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getInvestorList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.Investors = action.payload;
      })
      .addCase(getInvestorList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //kyc list
      .addCase(getKycInvestorUserid.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getKycInvestorUserid.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.KycUserid = action.payload;
      })
      .addCase(getKycInvestorUserid.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getUserKycData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.KycData = action.payload;
      })
      
      .addCase(getInvestorById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getInvestorById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.Investor = action.payload;
      })
      .addCase(getInvestorById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default InvestorSlice.reducer;
