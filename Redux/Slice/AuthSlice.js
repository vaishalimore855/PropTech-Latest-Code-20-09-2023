    import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from '../BaseUrl/baseurl'
import axios from "axios";

export const getAdminData = createAsyncThunk("getAdmin", async () => {
    const response = await axios.get('http://65.20.73.28:8090/api/admins/1')
    // const response = await axios.get('https://jsonplaceholder.typicode.com/users')
     console.log("AdminResponse",response.data)
    return response.data
})
export const adminLogin = createAsyncThunk("adminLogin", async (data) => {
    console.log(data)
     const response = await fetch('http://65.20.73.28:8090/api/admins/login',data)
     const loginDetail = response.json()
    return loginDetail
})

const authSlice = createSlice({

    name: "Authentication",

    initialState: {
        Login : [],
       Admin : [],
       status : "idle",
       error : ""
    },

    extraReducers(builder) {

        // get admin details
       
        builder.addCase(getAdminData.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(getAdminData.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.Admin = action.payload
            })
            .addCase(getAdminData.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })

            // Admin Login 

            .addCase(adminLogin.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.Login = action.payload
                // alert(state.Login )
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
        }
  });
  
  export default authSlice.reducer;