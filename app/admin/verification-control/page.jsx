"use client";

import { useEffect, useState } from "react";
import API_ENDPOINTS from "../../utils/api";
import Image from "next/image";

export default function VerificationDashboard() {
  const [verifications, setVerifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    async function fetchVerifications() {
      try {
        const res = await fetch(API_ENDPOINTS.AUTH.GET_VERIFICATION_DATA);
        const data = await res.json();
        if (Array.isArray(data.verifications)) {
          setVerifications(data.verifications);
        } else {
          setVerifications([]);
        }
      } catch (error) {
        console.error("Error fetching verification data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchVerifications();
  }, [verifications]);

  const updateUserVerification = async (id, isVerified) => {
    try {
      const response = await fetch(
        API_ENDPOINTS.AUTH.UPDATE_USER_VERIFICATION,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, isVerified }),
        }
      );

      // Handle errors from the server
      const data = await response.json();
      if (!response.ok) {
        console.error("Error updating status:", data.error || "Unknown error");
        return { success: false, message: data.error || "Failed to update" };
      }

      console.log("✅ Verification status updated:", data.message);
      return { success: true, message: data.message };
    } catch (error) {
      console.error("❌ Network Error:", error);
      return { success: false, message: "Network error occurred" };
    }
  };

  const updateStatus = async (user_id, status) => {
    if (status === "approved") {
      console.log(user_id);
      const id = user_id;
      const isVerified = true;
      updateUserVerification(id, isVerified);
    }
    setLoading(true);
    try {
      const res = await fetch(API_ENDPOINTS.AUTH.UPDATE_VERIFICATION_STATUS, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, status }),
      });
      if (res.ok) {
        setVerifications((prev) =>
          prev.map((record) =>
            record.id === user_id ? { ...record, status } : record
          )
        );
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = verifications.filter((record) =>
    record.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Verification Dashboard
      </h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-600">
          Loading verification records...
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3">Full Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Country</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Bank</th>
                <th className="p-3">Address</th>
                <th className="p-3">ID Card</th>
                <th className="p-3">Face ID</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((record) => (
                  <tr key={record.id} className="border-b text-center">
                    <td className="p-3">{record.fullName}</td>
                    <td className="p-3">{record.email}</td>
                    <td className="p-3">{record.country}</td>
                    <td className="p-3">{record.phone}</td>
                    <td className="p-3">{record.bankName}</td>
                    <td className="p-3">{record.address}</td>
                    <td
                      className="p-3 cursor-pointer"
                      onClick={() =>
                        setModalImage(
                          `${API_ENDPOINTS.STORAGE_URL}${record.idCard}`
                        )
                      }
                    >
                      <Image
                        src={`${API_ENDPOINTS.STORAGE_URL}${record.idCard}`}
                        alt="ID Card"
                        width={50}
                        height={50}
                        className="rounded shadow"
                      />
                    </td>
                    <td
                      className="p-3 cursor-pointer"
                      onClick={() =>
                        setModalImage(
                          `${API_ENDPOINTS.STORAGE_URL}${record.selfie}`
                        )
                      }
                    >
                      <Image
                        src={`${API_ENDPOINTS.STORAGE_URL}${record.selfie}`}
                        alt="Face ID"
                        width={50}
                        height={50}
                        className="rounded-full shadow"
                      />
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${
                          record.status === "Pending"
                            ? "bg-yellow-500"
                            : record.status === "approved"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => updateStatus(record.user_id, "approved")}
                        className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(record.user_id, "rejected")}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center p-4 text-gray-600">
                    No verification records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
          onClick={() => setModalImage(null)}
        >
          <div className="relative">
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded"
            >
              Close
            </button>
            <img
              src={modalImage}
              alt="Enlarged"
              className="max-w-full max-h-screen"
            />
          </div>
        </div>
      )}
    </div>
  );
}
