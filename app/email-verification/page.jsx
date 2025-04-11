"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import API_ENDPOINTS from "../utils/api";
import { apiRequest } from "../utils/apiHelper";
import { useSelector } from "react-redux";

export default function EmailVerification() {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const email = searchParams.get("email"); // Get email from URL

  const handleVerify = async (e) => {
    console.log(email);
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await apiRequest(API_ENDPOINTS.AUTH.VERIFY_OTP, "POST", {
        email: email,
        otp,
      });

      if (user?.userType === "baker") {
        router.push("/id-facial-verification");
      } else {
        router.push("/");
      }
      // Redirect after successful verification
    } catch (err) {
      setError(err.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center">Email Verification</h2>
        <p className="text-gray-600 text-center mt-2">
          Enter the 6-digit code sent to your email.
        </p>

        {error && <p className="text-red-500 text-center">{error.error}</p>}

        <form onSubmit={handleVerify} className="mt-4 space-y-4">
          <input
            type="text"
            maxLength="6"
            placeholder="Enter OTP"
            className="w-full border p-2 rounded-md text-center text-xl tracking-widest"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Didn't receive the code?{" "}
          <button className="text-blue-600 hover:underline">Resend OTP</button>
        </p>
      </div>
    </div>
  );
}
