import { Suspense } from "react";
import AppointmentDetail from "./appointmentDetailContent/AppointmentDetailContent";

export default function AppointmentDetailPage() {
  return (
    <Suspense fallback={<div className="text-[3rem] w-screen h-[50%] flex items-center justify-center text-center">Loading...</div>}>
      <AppointmentDetail />
    </Suspense>
  );
}


export function generateMetadata(){
  return{
      title: "YourLab - Appointment Details | Download PDF with Doctor & Patient Info",
      description: "View and download detailed appointment information, including patient details, doctor fees, appointment date, and time. Easily export the appointment summary as a PDF for future reference."
  }
}
