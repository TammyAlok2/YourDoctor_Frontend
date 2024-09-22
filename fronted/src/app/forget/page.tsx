"use client";

import React from "react";
import Forget from "@/components/Forget/forget";
import { useRouter } from "next/navigation";

const ForgetPage: React.FC = () => {
  const router = useRouter();

  const handleForgetCancel = () => {
    router.push("/"); // or wherever you want to redirect
  };

  return <Forget onForgetCancel={handleForgetCancel} />;
};

export default ForgetPage;