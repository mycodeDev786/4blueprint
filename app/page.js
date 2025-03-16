"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { apiRequest } from "../app/utils/apiHelper"; // Ensure you have this utility
import API_ENDPOINTS from "../app/utils/api";
import HomePage from "./components/HomePage";

export default function Home() {
  const email = useSelector((state) => state.auth.user?.email); // Get user email from Redux
  const userType = useSelector((state) => state.auth.user?.userType);
  const [isVerified, setIsVerified] = useState(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!email) return; // No need to check if the user is not logged in

    const checkVerification = async () => {
      try {
        const response = await fetch(
          `${API_ENDPOINTS.AUTH.CHECK_VERIFICATION}?email=${email}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("Raw response:", response);

        const text = await response.text();
        console.log("Response text:", text); // Debug raw response

        const data = JSON.parse(text); // Ensure JSON format
        console.log("Parsed JSON:", data);

        setIsVerified(data.isVerified);
      } catch (err) {
        console.error(
          "Error fetching verification status:",
          err.message || err
        );
        setIsVerified(false);
      } finally {
        setLoading(false);
      }
    };
    checkVerification();
  }, [email]);

  return (
    <>
      <div className="px-0 sm:px-6 md:px-12 lg:px-16 xl:px-24">
        {!loading && !isVerified && userType === "customer" && (
          <div className="bg-red-500 text-white text-center py-2">
            {userType === "customer"
              ? "Your account is not verified. Please complete verification."
              : "Your verification is pending. Once verified, you can post."}
          </div>
        )}

        <HomePage />
      </div>
    </>
  );
}
