import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import { toast } from "react-hot-toast";
import { logout } from "./DoctorSlice";
import { RootState } from "../store";

// Define types for state and payload
interface UserState {
  isLoggedIn: boolean;
  data: Record<string, any>;
  doctors: Record<string, any>;
  scheduleByData: Record<string, any>;
  allAppointments: Record<string, any>;
}

const initialState: UserState = {
  isLoggedIn: false,
  data: {},
  doctors: {},
  scheduleByData: {},
  allAppointments: {},
};

// Define types for `createAsyncThunk`
interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const createAccount = createAsyncThunk(
  "user/register",
  async (data: RegisterData) => {
    console.log(data);
    try {
      const res = axiosInstance.post("user/register", data, {
        withCredentials: true,
      });

      toast.promise(res, {
        loading: "Wait! creating your account",
        success: (data) => data?.data?.message,
        error: "Failed to create account",
      });

      // Extract the token from the response
      const response = await res;
      const token = response?.data?.data?.token;
      console.log("token", token);

      // Save the token to a cookie (valid for 1 day)
      document.cookie = `loginToken=${token}; Max-Age=${
        24 * 60 * 60
      }; path=/; Domain=yourlab.in; SameSite=None; Secure`;

      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      throw error;
    } finally {
      console.log("finally");
    }
  }
);
import { parseCookies } from 'nookies';
export const login = createAsyncThunk(
  "user/login",
  async (data: { email: string; password: string }) => {
    try {
      const res = axiosInstance.post("user/login", data, {
        withCredentials: true,
      });

      toast.promise(res, {
        loading: "Wait! authentication in progress...",
        success: (data) => data?.data?.message,
        error: "Failed to login",
      });

      // Extract the token from the response
      const response = await res;
      const token = response?.data?.data?.token;
      console.log("token", token);

      // Save the token to a cookie (valid for 1 day)
      document.cookie = `loginToken=${token}; Max-Age=${
        24 * 60 * 60
      }; path=/;  SameSite=Lax;`;

      // Set a cookie
    document.cookie = `isLoggedIn=${true}; path=/; Max-Age=${3600}; SameSite=Lax;`;
   
      return response.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

export const getUserData = createAsyncThunk("user/details", async () => {
  try {
    const res = axiosInstance.get("user/me");
    return (await res).data;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
});

export const getAllDoctor = createAsyncThunk("user/getAllDoctors", async () => {
  try {
    const res = axiosInstance.get("doctor/allDoctors");
    return (await res).data;
  } catch (error: any) {
    toast.error(error.message);
  }
});

export const allScheduleByDate = createAsyncThunk(
  "user/getSchedule",
  async (data: [string, string], { rejectWithValue }) => {
    const cookies = parseCookies();
    const token = cookies.loginToken; // Assuming the token is stored in a cookie called 'token'
console.log('token is this ',token)

    try {
      const response = await axiosInstance.get(
        `user/allScheduleByDate/${data[0]}/${data[1]}`,{
          headers: {
            Authorization: `Bearer ${token}`,  // Attach token in the Authorization header
          },
        }
      );
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createAppointment = createAsyncThunk(
  "user/appointment/create",
  async (data: [string, any]) => {
    try {
      const res = axiosInstance.post(`user/newAppointment/${data[0]}`, data[1]);
      toast.promise(res, {
        loading: "Please Wait! Appointment success in progress...",
        success: (data) => data?.data?.message,
        error: "Failed to send Appointment",
      });
      return (await res).data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);



export const getAllAppointments = createAsyncThunk(
  "user/getAllAppointments",
  async (_, { rejectWithValue }) => {
    try {
      // Parse cookies using nookies
      const cookies = parseCookies();
      const token = cookies.loginToken; // Assuming the token is stored in a cookie called 'token'
//  console.log('token is this ',token)
      if (!token) {
        return rejectWithValue("Unauthorized: No token provided");
      }

      // Make request with the token in headers
      const res = await axiosInstance.get("user/allAppointments", {
        headers: {
          Authorization: `Bearer ${token}`,  // Attach token in the Authorization header
        },
      });

      return res.data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);


export const updatePassword = createAsyncThunk(
  "user/update/password",
  async (data: [string, string]) => {
    try {
      const payload = { oldPassword: data[0], newPassword: data[1] };
      const res = axiosInstance.post("user/change-password", payload);
      toast.promise(res, {
        loading: "Please Wait! Password update is in progress...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "failed to update password",
      });
      return (await res).data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/update/profile",
  async (data: [string, any]) => {
    // console.log(data: [string, any]);
    try {
      const res = axiosInstance.put(`user/update/${data[0]}`, data[1]);
      toast.promise(res, {
        loading: "Please Wait! Profile update in progress...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to update user profile",
      });
      return (await res).data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgot/password",
  async (data: [string, any]) => {
    try {
      const payload = { email: data[0] };
      const res = axiosInstance.post("user/reset", payload);

      toast.promise(res, {
        loading: "Please Wait! Password update is in progress...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "error",
      });
      return (await res).data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/reset/password",
  async (data: [string, any]) => {
    try {
      const res = axiosInstance.post(`user/reset/${data[0]}`, data[1], {
        withCredentials: true,
      });
      // console.log(res)
      toast.promise(res, {
        loading: "Please Wait! Password update is in progress... ",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to reset password",
      });
      return (await res).data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      // throw error;
    }
  }
);

export const createReview = createAsyncThunk(
  "user/reset/password",
  async (data: [string, any]) => {
    try {
      const res = axiosInstance.post(`user/addReview/${data[0]}`, data[1], {
        withCredentials: true,
      });
      // console.log(res)
      toast.promise(res, {
        loading: "Please Wait! Adding review is in progress... ",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to create Review",
      });
      return (await res).data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      // throw error;
    }
  }
);


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.fulfilled, (state, action: PayloadAction<any>) => {
        state.data = action.payload.data.user;
        localStorage.setItem("data", JSON.stringify(state.data));
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoggedIn = true;
        state.data = action.payload.data.user;
        localStorage.setItem("data", JSON.stringify(state.data));
        localStorage.setItem("isLoggedIn", "true");
      })
      .addCase(getUserData.fulfilled, (state, action: PayloadAction<any>) => {
        if (!action.payload?.user) return;
        state.isLoggedIn = true;
        state.data = action.payload.user;
        localStorage.setItem("data", JSON.stringify(action.payload.user));
        localStorage.setItem("isLoggedIn", "true");
      })
      .addCase(
        getAllAppointments.fulfilled,
        (state, action: PayloadAction<any>) => {
          if (!action.payload?.user) return;
          state.isLoggedIn = true;
          state.allAppointments = action.payload.data;
          localStorage.setItem(
            "allAppointments",
            JSON.stringify(action.payload.data)
          );
          localStorage.setItem("isLoggedIn", "true");
        }
      )
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.data = {};
        localStorage.clear();
      });
  },
});

export default authSlice.reducer;
