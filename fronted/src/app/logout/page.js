"use client";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../GlobalRedux/slice/AuthSlice";
import { login } from "../GlobalRedux/slice/AuthSlice";
import { useRouter } from "next/navigation";

const Logout = () => {

  const router = useRouter();

  const dispatch = useDispatch();
  const { isLoggedIn, isSignedIn } = useSelector((state) => state.auth);

  const onLogout = async function () {
    (await dispatch(logout())) || (await dispatch(login())) ? router.push("/") : 'Failed to logout...';
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
