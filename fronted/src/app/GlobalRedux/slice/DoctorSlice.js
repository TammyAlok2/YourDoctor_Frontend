import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../../Helpers/axiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
  isLoggedIn: false,
  isSignedIn: false,
  role: "",
  data: {},
  doctors: {},
};

// Simplified logging
// console.log(
//   initialState.data && Object.keys(initialState.data).length !== 0
//     ? initialState
//     : "Sorry, nothing happened"
// );

export const logout = createAsyncThunk("user/logout", async (data) => {
  try {
    const res = axiosInstance.post("user/logout");
    toast.promise(res, {
      loading: "Wait! logout in progress...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to logout",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
});

export const getAllDoctors = createAsyncThunk(
  "doctor/getAllData",
  async (data) => {
    try {
      const res = axiosInstance.get("doctor/allDoctors");
      console.log(res);
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const postEnquiry = createAsyncThunk("user/postEnquiry",
  async(data)=>{
    try{
      const res = axiosInstance.post("user/postEnquiry",data);
      console.log(res);
      return (await res).data;
    }
    catch(error){
      toast.error(error?.response?.data?.message);
    }
  }
)

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDoctors.fulfilled, (state, action) => {
        if (!action?.payload?.data) return;
        localStorage.setItem("doctors", JSON.stringify(action?.payload?.data));
        state.doctors = action?.payload?.data;
        // state.role = action?.payload?.user?.role
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.data = {};
        state.doctors = {};
        localStorage.clear();
      });
  },
});

// export const {} = authSlice.actions;
export default doctorSlice.reducer;

// isLoggedIn: localStorage.getItem('isLoggedIn') || false,
//     role: localStorage.getItem('role') || "",
//     data: localStorage.getItem('data') != "undefined" ? JSON.parse(localStorage.getItem('data')) : {}

// localStorage.setItem("data", JSON.stringify(action?.payload?.user));
//             localStorage.setItem("isLoggedIn", true);
//             localStorage.setItem("role", action?.payload?.user?.role);
