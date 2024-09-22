"use client";

import { Suspense } from "react";
import AppointmentDetail from "./appointmentDetailContent/AppointmentDetailContent";

export default function AppointmentDetailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppointmentDetail />
    </Suspense>
  );
}