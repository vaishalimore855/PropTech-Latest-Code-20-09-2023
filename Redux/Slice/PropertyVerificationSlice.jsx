// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import http from "../BaseUrl/baseurl";
// import axios from "axios";
// const token = localStorage.getItem("token");



// const PropertyVerification = createSlice({
//   name: "propertyverification",

//   initialState: {
//     PropertyList: [],
//     status: "",
//     error: "",
//   },

//   extraReducers(builder) {
//     // add buyer
//     builder
//       .addCase(getPropertyList.pending, (state, action) => {
//         state.status = "loading";
//       })
//       .addCase(getPropertyList.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.PropertyList = action.payload;
//       })
//       .addCase(getPropertyList.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export default PropertyVerification.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../BaseUrl/baseurl";
import axios from "axios";
const token = localStorage.getItem("token");


export const getPropertyList = createAsyncThunk("getPropertyList", async ( ) => {
  const response = await axios.get(`http://65.20.73.28:8090/api/propertyverification`,{
    headers: {
      authorization:token }
  });
  console.log("Property list Response", response.data);
  return response.data;
});

export const getPropertybyId = createAsyncThunk("getPropertybyId", async (id) => {
  try {
    const response = await axios.get(`http://65.20.73.28:8090/api/propertyverification/${id}`, {
      headers: {
        authorization: token,
      },
    });
    console.log("Property Id Response", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
});


const PropertyVerification = createSlice({
  name: "propertyverification",

  initialState: {
    PropertyList: [],
    PropertyId:{},
    status: "",
    error: "",
  },

  extraReducers(builder) {
    // ... (other cases)

    // getPropertyVerificationPropertyIdList
    builder
      .addCase(getPropertyList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPropertyList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.PropertyList = action.payload;
      })
      .addCase(getPropertyList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //get property by id
      .addCase(getPropertybyId.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPropertybyId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.PropertyId = action.payload;
      })
      .addCase(getPropertybyId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

  },
});

export default PropertyVerification.reducer;

