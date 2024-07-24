

'use client'
export default function Reset() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
          <h1 className="font-extrabold text-3xl text-gray-950 font-bold mb-4 text-center">Create New Password</h1>
          <form>
            <div className="mb-6">
              <label className="block mb-2 font-semibold" htmlFor="new-password">New Password</label>
              <input
                type="password"
                id="new-password"
                placeholder="Enter new password"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-semibold" htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirm password"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <button className="w-full p-2 bg-teal-600 text-white rounded-lg">Reset</button>
          </form>
        </div>
      </div>
    </div>
  );
}
