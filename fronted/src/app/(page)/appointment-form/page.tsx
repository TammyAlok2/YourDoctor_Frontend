import React, { Suspense } from 'react';
import DocForm from './AppointmentForm components/DocForm'; // Adjust the import path as necessary

const Loading = () => <div>Loading...</div>;

const Page: React.FC = () => (
  <Suspense fallback={<Loading />}>
    <DocForm />
  </Suspense>
);


export function generateMetadata(){
  return{
      title: "YourLab - Appointment Form",
      description: "Schedule your appointment effortlessly with providing personal details, preferred date, time, and service type"
  }
}

export default Page;
