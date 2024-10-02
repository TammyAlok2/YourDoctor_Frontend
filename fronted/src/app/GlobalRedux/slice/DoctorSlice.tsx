import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import { toast } from "react-hot-toast";

interface InitialState {
  isLoggedIn: boolean;
  isSignedIn: boolean;
  role: string;
  data: Record<string, any>;
  doctors: Record<string, any>;
}

const initialState: InitialState = {
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

export const logout = createAsyncThunk("user/logout", async (data: any) => {
  try {
    const res = axiosInstance.post("user/logout");
    toast.promise(res, {
      loading: "Wait! logout in progress...",
      success: (data: any) => {
        document.cookie = "token=; Max-Age=0; path=/; SameSite=Strict";
        return data?.data?.message;
      },
      error: "Failed to logout",
    });
    return (await res).data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
});

export const getAllDoctors = createAsyncThunk(
  "doctor/getAllData",
  async (data: any) => {
    try {
      const res = axiosInstance.get("doctor/allDoctors");
      // console.log(res);
      return (await res).data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const postEnquiry = createAsyncThunk(
  "user/postEnquiry",
  async (data: any) => {
    try {
      const res = axiosInstance.post("user/postEnquiry", data);
      // console.log(res);
      return (await res).data;
    } catch (error: any) {
      console.log(error)
    }
  }
);

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
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.data = {};
        state.doctors = {};
        localStorage.clear();
      });
  },
});

// export const {} = doctorSlice.actions;
export default doctorSlice.reducer;
