"use client";
import { FaCheckCircle } from "react-icons/fa";

export default function SubmissionConfirmation() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center border border-gray-200">
        <FaCheckCircle className="h-16 w-16 text-green-500 mx-auto" />
        <h1 className="text-2xl font-semibold text-gray-900 mt-4">
          Submission Successful
        </h1>
        <p className="text-gray-700 mt-3">
          Your information has been successfully submitted. Once approved, you
          will receive an email notification.
        </p>
        <p className="text-gray-500 mt-2">Thank you for your patience!</p>
      </div>
    </div>
  );
}
