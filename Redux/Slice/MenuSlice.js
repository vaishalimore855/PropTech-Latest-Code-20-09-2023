import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import http from '../BaseUrl/baseurl'
import axios from "axios";

export const getMenuItemList = createAsyncThunk("getMenuItemList", async () => {
  const response = await axios.get("http://65.20.73.28:8090/api/managers");
  console.log("adminResponse", response.data);
  return response.data;
});
const token = localStorage.getItem("token");

export const getAdminRoleList = createAsyncThunk(
  "getAdminRoleList",
  async () => {
    const response = await axios.get(`http://65.20.73.28:8090/api/adminroles`, {
      headers: {
        authorization: token,
      },
    });
    console.log("admin Role Response", response.data);
    return response.data;
  }
);

//adminmenus list
export const getAdminMenuList = createAsyncThunk(
  "getAdminMenuList",
  async () => {
    const response = await axios.get(`http://65.20.73.28:8090/api/adminmenus`, {
      headers: {
        authorization: token,
      },
    });
    console.log("admin menu list Response", response.data);
    return response.data;
  }
);

export const getAdminMenuId = createAsyncThunk("getAdminMenuId", async (id) => {
  const response = await axios.get(
    `http://65.20.73.28:8090/api/adminmenus/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  console.log("admin Menu id Response", response.data);
  return response.data;
});

export const getAdminRoleId = createAsyncThunk("getAdminRoleId", async (id) => {
  const response = await axios.get(
    `http://65.20.73.28:8090/api/adminroles/${id}`,
    {
      headers: {
        authorization: token,
      },
    }
  );
  console.log("admin Role id Response", response.data);
  return response.data;
});

const AdminMenuSlice = createSlice({
  name: "Menu",

  initialState: {
    AdminRole: [],
    AdminMenuList: [],

    MenuItem: {},
    Role: {},
    AdminMenuId: {},
    status: "",
    error: "",
  },

  extraReducers(builder) {
    // add buyer

    builder
      .addCase(getMenuItemList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getMenuItemList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.MenuItem = action.payload;
      })
      .addCase(getMenuItemList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      
      //admin Role list
      .addCase(getAdminRoleList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAdminRoleList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.AdminRole = action.payload;
      })
      .addCase(getAdminRoleList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //admin menu list
      .addCase(getAdminMenuList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAdminMenuList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.AdminMenuList = action.payload;
      })
      .addCase(getAdminMenuList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //admin Menu id
      .addCase(getAdminRoleId.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAdminRoleId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.Role = action.payload;
      })
      .addCase(getAdminRoleId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //admin menu id
      .addCase(getAdminMenuId.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAdminMenuId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.AdminMenuId = action.payload;
      })
      .addCase(getAdminMenuId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default AdminMenuSlice.reducer;
