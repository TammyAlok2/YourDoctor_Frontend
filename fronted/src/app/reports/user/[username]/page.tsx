'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const UserUploads = () => {
  const router:any = useRouter();
  const params:any = useSearchParams();
  const userName = params.get("username");
  const file = router?.query?.file as string;

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-[5rem]">
      <h1 className="text-2xl font-bold">Uploaded Documents for {userName}</h1>
      <div className="mt-4 bg-white p-4 rounded shadow">
        <ul>
          {file && (
            <li className="border-b p-2">
              <a href="#" className="text-blue-500 hover:underline">{file}</a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserUploads;
