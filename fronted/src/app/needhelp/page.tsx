"use client";

import React from "react";
import { useRouter } from "next/navigation";
import NeedHelp from "@/components/NeedHelp/NeedHelp";

const NeedHelpPage: React.FC = () => {
  const router = useRouter();

  const handleNeedCancel = () => {
    router.push("/"); // or wherever you want to redirect
  };

  return <NeedHelp onNeedCancel={handleNeedCancel} />;
};

export default NeedHelpPage;