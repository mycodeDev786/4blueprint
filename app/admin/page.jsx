"use client";

import { useRouter } from "next/navigation";

export default function Admin() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Panel</h1>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              router.push("admin/categories-control");
            }}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Category Control
          </button>
          <button
            onClick={() => {
              router.push("/admin/verification-control");
            }}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            Verification Control
          </button>
          <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
            User Control
          </button>
        </div>
      </div>
    </div>
  );
}
