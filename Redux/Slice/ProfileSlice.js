import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from '../BaseUrl/baseurl'
import axios from "axios";

const token = localStorage.getItem("token");
export const getProfileData = createAsyncThunk("getAdmin", async () => {
    const response = await axios.get(`http://65.20.73.28:8090/api/admins/1`,{
        headers: {
          authorization:token }
      })
    
    console.log("profileResponse", response.data)
    return response.data
})


const ProfileSlice = createSlice({

    name: "profile",

    initialState: {
        Profile: [],
        changePassword: "",
        status: "",
        error: ""
    },

    
    extraReducers(builder) {

        // get admin details
        builder.addCase(getProfileData.pending, (state, action) => {
            state.status = "loading"
        })
            .addCase(getProfileData.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.Profile = action.payload
            })
            .addCase(getProfileData.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })

    }

});

export default ProfileSlice.reducer;