import AppointmentSec1 from "@/components/Appointment sections/AppointmentSec1"
import AppointmentSec2 from "@/components/Appointment sections/AppointmentSec2"

const Appointment:React.FC = () =>{
  return (
    <div>
      <AppointmentSec1 />
      <AppointmentSec2 />
      
    </div>
  )
}

export function generateMetadata(){
  return{
      title: "YourLab - Appointment Slots",
      description: "Browse and book available appointment slots with your preferred doctor"
  }
}

export default Appointment
