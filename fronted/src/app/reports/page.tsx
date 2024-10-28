import Link from 'next/link'
import React from 'react'

const users = ['user01', 'user02', 'user03'];

const Reports:React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mt-6">Document Lists</h1>
      <div className="mt-8 mx-auto max-w-lg bg-white p-4 rounded shadow">
        <ul className="list-none">
          {users.map((user) => (
            <li key={user} className="border-b p-2">
              <Link href={`/reports/${user}`}>
                <h1 className="text-blue-500 hover:underline">{user}</h1>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function generateMetadata() {
  return {
      title: "YourLab - Reports",
      description: "Access your lab reports securely through YourLab."
  }
}

export default Reports
