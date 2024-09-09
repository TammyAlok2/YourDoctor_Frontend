'use client'

import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../../../GlobalRedux/slice/AuthSlice";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/app/GlobalRedux/store";

export default function Reset() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [data, setData] = useState({
    password: ""
  })
  const [confirmPass, setConfirmPass] = useState({
    confirmPassword: ""
  })
  const [showPassword, setShowPassword] = useState(false);
  const resetToken = useParams();
  // console.log(resetToken.resetToken)
//   const { resetId} = resetToken;
//   console.log('reset ID: ', resetId);
  const handleInputChange = (e:any)=>{
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value
    })
    setConfirmPass({
      ...confirmPass,
      [name]:value
    })
  }

  const togglePasswordVisibility = (e:any) => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (e:any)=>{
    e.preventDefault();
    if(!data.password || !confirmPass.confirmPassword){
      toast.error("All fields are mandatory");
      return;
    }
    else if(data.password !== confirmPass.confirmPassword){
      toast.error("Password do not match please check...");
      return;
    }
    const response = await dispatch(resetPassword([resetToken.resetToken, data]))
    // console.log(response);
    if(response){
      router.push("/login");
    }
  }
  // console.log(data)
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
          <h1 className="text-3xl text-gray-950 font-bold mb-4 text-center">Create New Password</h1>
          <form onSubmit={onSubmit}>
            <div className="mb-6 relative">
              <label className="block mb-2 font-semibold" htmlFor="new-password">New Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="new-password"
                placeholder="Enter new password"
                className="w-full p-2 border rounded-lg"
                value={data.password}
                onChange={handleInputChange}
              />
               <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 bottom-1 transform -translate-y-1/2 text-gray-600 mt-1"
            >
              <img
                src={
                  showPassword ? "/eye-open-icon.png" : "/eye-closed-icon.png"
                }
                alt="Toggle Password Visibility"
                width="20"
                height="20"
              />
            </button>
            </div>
            <div className="mb-6 relative">
              <label className="block mb-2 font-semibold" htmlFor="confirm-password">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
                className="w-full p-2 border rounded-lg"
                value={confirmPass.confirmPassword}
                onChange={handleInputChange}
              />
              <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 bottom-1 transform -translate-y-1/2 text-gray-600 mt-1"
            >
              <img
                src={
                  showPassword ? "/eye-open-icon.png" : "/eye-closed-icon.png"
                }
                alt="Toggle Password Visibility"
                width="20"
                height="20"
              />
            </button>
            </div>
            <button type="submit" className="w-full p-2 bg-teal-600 text-white rounded-lg">Reset</button>
          </form>
        </div>
      </div>
    </div>
  );
}
