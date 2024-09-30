import AppointmentSec1 from "@/components/Appointment sections/AppointmentSec1"
import AppointmentSec2 from "@/components/Appointment sections/AppointmentSec2"

const Appointment: React.FC = () => {
  return (
    <div>
      <AppointmentSec1 />
      <AppointmentSec2 />

    </div>
  )
}

export function generateMetadata() {
  return {
    title: "Appointment Slots - YourLab",
    description: "Browse and book available appointment slots with your preferred doctor",
    keywords: "book appointment, schedule appointment, available slots, healthcare appointment, doctor appointment, doctor appointment slots, medical, health",
    robots: "index, follow",
    openGraph: {
      title: "Appointment Slots - YourLab",
      description: "Browse and book available appointment slots with your preferred doctor",
      type: "website",
      siteName: "YourLab",
    }
  }
}

export default Appointment
