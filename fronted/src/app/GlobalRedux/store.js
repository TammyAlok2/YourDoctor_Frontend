'use client';

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/AuthSlice";
import doctorReducer from "./slice/DoctorSlice";

// fetchApi: fetchApiReducer,
const rootReducer = combineReducers({
  auth: authReducer,
  doctor: doctorReducer
  //add all your reducers here
});

export const store = configureStore({
  reducer: rootReducer,
});


