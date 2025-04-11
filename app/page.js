"use client";

import { useEffect, useState } from "react";
import LoginPage from "./login/page";
import { useRouter } from "next/navigation";
import { apiRequest } from "../app/utils/apiHelper"; // Ensure you have this utility
import API_ENDPOINTS from "../app/utils/api";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <LoginPage />
      {/* <div className="px-0 sm:px-6 md:px-12 lg:px-16 xl:px-24">welcome</div> */}
    </>
  );
}
