'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const UserPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const username = params.get("username");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Simulate file uploading
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Use `replace` instead of `push` to avoid full page reload
      router.replace(`/reports/user/${username}/uploads?file=${selectedFile.name}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold">Upload Document for {username}</h1>
      <div className="mt-4">
        <input type="file" onChange={handleFileChange} />
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default UserPage;
