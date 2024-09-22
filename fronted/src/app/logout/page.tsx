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
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      
      // Try to delete the cookie with various domain and path combinations
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
    }

    // Clear localStorage and sessionStorage
    localStorage.clear();
    sessionStorage.clear();
  };

  const onLogout = async function () {
    try {
      const response = await dispatch(logout(undefined));
      if (response.payload?.success) {
        deleteAllCookies();
        router.push('/');
      } else {
        console.error("Logout failed:", response.payload);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

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
