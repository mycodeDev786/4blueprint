"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux"; // Import Redux hook
import countryList from "react-select-country-list";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import API_ENDPOINTS from "../utils/api";
import { apiRequest } from "../utils/apiHelper";
import iso from "iso-3166-1-alpha-2";
import Loading from "../components/Loading";

const getFlagUrl = (countryName) => {
  const countryCode = iso.getCode(countryName); // Convert country name to ISO code
  if (!countryCode) return null; // Return null if the country code is not found
  return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
};

export default function IdFacialVerification() {
  const router = useRouter();
  const countries = countryList().getData();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Get user_id and email from Redux state
  const user_id = useSelector((state) => state.auth.user.id);
  const email = useSelector((state) => state.auth.user?.email);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    country: "",
    phone: "",
    address: "",
    bankName: "",
    bankAccount: "",
  });

  const [idCard, setIdCard] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (phone) => {
    setFormData({ ...formData, phone });
  };

  const handleUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "id") {
        setIdCard(file);
      } else {
        setSelfie(file);
      }
    }
  };

  const handleCreateArtistProfile = async () => {
    const formData1 = new FormData();
    formData1.append("user_id", user_id);
    formData1.append("baker_name", formData.fullName);
    formData1.append("profile_image", selfie); // Assuming selectedFile is the chosen file
    formData1.append("country", formData.country);
    formData1.append("flag", getFlagUrl(formData.country));
    formData1.append("isTop10Sales", false);
    formData1.append("isTop10Followers", false);
    formData1.append("rating", 0);
    formData1.append("score", 0);

    try {
      const response = await fetch(API_ENDPOINTS.BAKER.CREATE, {
        method: "POST",
        body: formData1,
      });

      if (!response.ok) {
        throw new Error("Failed to create baker profile");
      }

      console.log("Done");
      // setSuccess("Baker created successfully!");
    } catch (err) {
      console.error("Request Failed:", err); // Log error details
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!isAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }

    if (!user_id || !email) {
      console.log(email);
      alert("User authentication error. Please log in again.");
      return;
    }

    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("user_id", user_id);
    formDataToSend.append("email", email);
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("age", formData.age);
    formDataToSend.append("country", formData.country);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("bankName", formData.bankName);
    formDataToSend.append("bankAccount", formData.bankAccount);
    formDataToSend.append("idCard", idCard);
    formDataToSend.append("selfie", selfie);

    try {
      const response = await fetch(API_ENDPOINTS.AUTH.FACE_ID_VERIFICATION, {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Verification failed.");
      }
      handleCreateArtistProfile();
      router.push("/submitted");
    } catch (error) {
      console.error("Error:", error);
      alert("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center">
          ID & Facial Verification
        </h2>
        <p className="text-gray-600 text-center mt-2">
          Please provide your details and upload a valid ID with a selfie for
          verification.
        </p>

        <form onSubmit={handleVerify} className="mt-4 space-y-4">
          {/* Input Fields */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            className="w-full border p-2 rounded-md mt-1"
          />

          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
            className="w-full border p-2 rounded-md mt-1"
          >
            <option value="">Select your country</option>
            {countries.map((c) => (
              <option key={c.value} value={c.label}>
                {c.label}
              </option>
            ))}
          </select>
          <PhoneInput
            country={"us"}
            searchPlaceholder="search"
            value={formData.phone}
            enableSearch={true}
            onChange={handlePhoneChange}
            inputClass="w-full border p-2 rounded-md mt-1"
            required
          />
          <textarea
            name="address"
            placeholder="Full Address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="w-full border p-2 rounded-md mt-1"
          />
          <input
            type="text"
            name="bankName"
            placeholder="Bank Name"
            value={formData.bankName}
            onChange={handleInputChange}
            required
            className="w-full border p-2 rounded-md mt-1"
          />
          <input
            type="text"
            name="bankAccount"
            placeholder="Bank Account Number"
            value={formData.bankAccount}
            onChange={handleInputChange}
            required
            className="w-full border p-2 rounded-md mt-1"
          />

          {/* File Uploads */}
          <label className="block font-medium">Upload ID</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleUpload(e, "id")}
            required
            className="w-full border p-2 rounded-md mt-1"
          />
          <label className="block font-medium">Upload Selfie</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleUpload(e, "selfie")}
            required
            className="w-full border p-2 rounded-md mt-1"
          />

          {/* Terms & Conditions */}
          <div className="mt-4">
            <p
              className="text-blue-600 underline cursor-pointer"
              onClick={() => setIsTermsOpen(true)}
            >
              View Terms and Conditions
            </p>
          </div>
          <div className="mt-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={isAccepted}
                onChange={() => setIsAccepted(!isAccepted)}
                className="mr-2"
              />
              I accept the terms and conditions
            </label>
          </div>

          {isTermsOpen && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-lg font-bold">Terms and Conditions</h3>
                <p className="text-sm mt-2">
                  By proceeding, you agree to our terms and conditions...
                </p>

                <button
                  onClick={() => setIsTermsOpen(false)}
                  className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isAccepted || loading}
            className={`w-full p-2 rounded-md ${
              isAccepted
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
          >
            {loading ? "Verifying..." : "Verify & Proceed"}
          </button>
        </form>
      </div>
      <Loading isLoading={loading} />
    </div>
  );
}
