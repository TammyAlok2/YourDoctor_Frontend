import React, { Suspense } from 'react';
import DocForm from './AppointmentForm components/DocForm'; // Adjust the import path as necessary

const Loading = () => <div>Loading...</div>;

const Page: React.FC = () => (
  <Suspense fallback={<Loading />}>
    <DocForm />
  </Suspense>
);


export function generateMetadata() {
  return {
    title: "Appointment Form - YourLab",
    description: "Schedule your appointment effortlessly with providing personal details, preferred date, time, and service type",
    keywords: "appointment, doctor, schedule, medical, health",
    robots: "index, follow",
    openGraph: {
      title: "Appointment Form - YourLab",
      description: "Schedule your appointment effortlessly with providing personal details, preferred date, time, and service type",
      type: "website",
      siteName: "YourLab",
    }
  }
}

export default Page;
