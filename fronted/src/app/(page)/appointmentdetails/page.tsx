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
    title: "Appointment Details - YourLab",
    description: "Handles the submission of an appointment and the display of a doctor's details.",
    keywords: "appointment details, doctor details, patient details, reschedule, medical appointment",
    robots: "index, follow",
    openGraph: {
      title: "Appointment Details - YourLab",
      description: "Handles the submission of an appointment and the display of a doctor's details.",
      type: "website",
      siteName: "YourLab",
    }
  }
}
