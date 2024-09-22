"use client";

import { useDispatch } from "react-redux";
import { logout } from "../GlobalRedux/slice/DoctorSlice";
import { useRouter } from "next/navigation";
import { AppDispatch } from "../GlobalRedux/store";

const Logout = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const deleteAllCookies = () => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
  };

  const onLogout = async function () {
    const response = await dispatch(logout(undefined))
    if(response?.payload?.success){
      deleteAllCookies();
      router.push('/')
    }
  }

  return (
    <div>
      <button
        className={`w-full mt-6 p-3 bg-gradient-to-r from-[#0CEDE6] text-white rounded-xl to-[#0A8E8A]`}
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;