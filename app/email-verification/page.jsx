"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EmailVerification() {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();
    console.log("Verifying OTP:", otp);

    // Simulate OTP verification (Replace with API call)
    if (otp === "123456") {
      alert("Email verified successfully!");
      router.push("/dashboard"); // Redirect after verification
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center">Email Verification</h2>
        <p className="text-gray-600 text-center mt-2">
          Enter the 6-digit code sent to your email.
        </p>

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
          >
            Verify
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Didn't receive the code?{" "}
          <button className="text-blue-600 hover:underline">
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
}
