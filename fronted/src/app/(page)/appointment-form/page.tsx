'use client';

import React, { Suspense } from 'react';
import DocForm from './AppointmentForm components/DocForm'; // Adjust the import path as necessary

const Loading = () => <div>Loading...</div>;

const Page: React.FC = () => (
  <Suspense fallback={<Loading />}>
    <DocForm />
  </Suspense>
);

export default Page;
