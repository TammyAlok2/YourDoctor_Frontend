import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../../Helpers/axiosInstance";
import { toast } from "react-hot-toast";
import { TbArrowAutofitContent } from "react-icons/tb";

const initialState = {
  isLoggedIn: false,
  data: {},
  doctors: {},
  scheduleByData: {}
};

// Simplified logging
// console.log(
//   initialState.data && Object.keys(initialState.data).length !== 0
//     ? initialState
//     : "Sorry, nothing happened"
// );

export const createAccount = createAsyncThunk(
  "user/register",

  async (data) => {
    console.log(data);
    try {
      const res =  axiosInstance.post("user/register", data,{
        withCredentials: true
      });
      console.log(res);
      toast.promise(res, {
        loading: "Wait! creating your account",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to create account",
      });

      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
    finally{
      console.log("finally")
    }
  }
);

export const login = createAsyncThunk(
  "user/login",

  async (data) => {
    console.log(data);
    try {
      const res =  axiosInstance.post("user/login", data,
        {
          withCredentials: true
        }
      );
      toast.promise(res, {
        loading: "Wait! authentication in progress...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to login",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

export const getUserData = createAsyncThunk(
  "user/details",

  async () => {
    try {
      const res =  axiosInstance.get("user/me");
      console.log(res);
      return (await res).data;
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  }
);

export const getAllDoctor = createAsyncThunk(
  "user/details",

  async () => {
    try {
      const res =  axiosInstance.get("doctor/allDoctors", );
      console.log(res);
      return (await res).data;
    } catch (error) {
      toast.error(error.message);
    }
  }
);
export const allScheduleByDate = createAsyncThunk(
  "user/getSchedule",
  async (data, { rejectWithValue }) => {
    
    try {
      const response = await axiosInstance.get(`user/allScheduleByDate/${data[0]}/${data[1]}` );
      console.log('API response:', response);
      return response.data;
    } catch (error) {
      console.error('Error fetching schedule:', error);
      toast.error(error.response?.data?.message || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const createAppointment = createAsyncThunk(
  "user/appointment/create",
  async (data) => {
    console.log(data);
    try {
      const res =  axiosInstance.post(`user/newAppointment/${data[0]}`, data[1]);
      toast.promise(res, {
        loading: "Please Wait! Appointment success in progress...",
        success: (data) => {
          return data?.data?.message;
        },
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/update/profile",
  async (data) => {
    console.log(data);
    try {
      const res = axiosInstance.put(`user/update/${data[0]}`, data[1]);
      toast.promise(res, {
        loading: "Please Wait! Profile update in progress...",
        success: (data) => {
          return data?.data?.message;
        },
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "user/update/password",
  async (data) => {
    try {
      const res = axiosInstance.post("user/change-password", data);
      toast.promise(res, {
        loading: "Please Wait! Password update is in progress...",
        success: (data) => {
          return data?.data?.message;
        },
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgot/password",
  async (data) => {
    try {
      const res = axiosInstance.post("user/reset", data);
      toast.promise(res, {
        loading: "Please Wait! Password update is in progress...",
        success: (data) => {
          return data?.data?.message;
        },
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/reset/password",
  async (data) => {
    try {
      const res =  axiosInstance.post(`user/reset/${data[0]}`, data[1], {
        withCredentials: true,
      });
      // console.log(res)
      toast.promise(res, {
        loading: "Please Wait! Password update is in progress... ",
        success: (data) => {
          return data?.data?.message;
        },
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      // throw error;
    }
  }
);

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
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.data = action?.payload?.data;
        state.role = action?.payload?.data?.role;
        // Persist to local storage
        localStorage.setItem("data", JSON.stringify(state.data));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", state.role);
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.data = action?.payload?.data;
        state.role = action?.payload?.data?.role;
        // Persist to local storage
        localStorage.setItem("data", JSON.stringify(state.data));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", state.role);
      })
  
      .addCase(getUserData.fulfilled, (state, action) => {
        if (!action?.payload?.user) return;
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        // localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        
        state.data = action?.payload?.user;
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
export default authSlice.reducer;

// isLoggedIn: localStorage.getItem('isLoggedIn') || false,
//     role: localStorage.getItem('role') || "",
//     data: localStorage.getItem('data') != "undefined" ? JSON.parse(localStorage.getItem('data')) : {}

// localStorage.setItem("data", JSON.stringify(action?.payload?.user));
//             localStorage.setItem("isLoggedIn", true);
//             localStorage.setItem("role", action?.payload?.user?.role);
