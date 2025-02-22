"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import countryList from "react-select-country-list";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function IdFacialVerification() {
  const router = useRouter();
  const countries = countryList().getData();

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

  const handleVerify = (e) => {
    e.preventDefault();
    if (!isAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }
    
    console.log("Verifying ID & Face:", { ...formData, idCard, selfie });
    alert("Verification successful!");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center">ID & Facial Verification</h2>
        <p className="text-gray-600 text-center mt-2">
          Please provide your details and upload a valid ID with a selfie for verification.
        </p>

        <form onSubmit={handleVerify} className="mt-4 space-y-4">
          {/* Input Fields */}
          <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} required className="w-full border p-2 rounded-md mt-1" />
          <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleInputChange} required className="w-full border p-2 rounded-md mt-1" />
          <select name="country" value={formData.country} onChange={handleInputChange} required className="w-full border p-2 rounded-md mt-1">
            <option value="">Select your country</option>
            {countries.map((c) => (
              <option key={c.value} value={c.label}>{c.label}</option>
            ))}
          </select>
          <PhoneInput country={"us"} value={formData.phone} onChange={handlePhoneChange} inputClass="w-full border p-2 rounded-md mt-1" required />
          <textarea name="address" placeholder="Full Address" value={formData.address} onChange={handleInputChange} required className="w-full border p-2 rounded-md mt-1" />
          <input type="text" name="bankName" placeholder="Bank Name" value={formData.bankName} onChange={handleInputChange} required className="w-full border p-2 rounded-md mt-1" />
          <input type="text" name="bankAccount" placeholder="Bank Account Number" value={formData.bankAccount} onChange={handleInputChange} required className="w-full border p-2 rounded-md mt-1" />

          {/* File Uploads */}
          <input type="file" accept="image/*" onChange={(e) => handleUpload(e, "id")} required className="w-full border p-2 rounded-md mt-1" />
          <input type="file" accept="image/*" onChange={(e) => handleUpload(e, "selfie")} required className="w-full border p-2 rounded-md mt-1" />

          {/* Terms & Conditions */}
          <div className="mt-4">
            <p className="text-blue-600 underline cursor-pointer" onClick={() => setIsTermsOpen(true)}>View Terms and Conditions</p>
          </div>

          {isTermsOpen && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-lg font-bold">Terms and Conditions</h3>
                <p className="text-sm mt-2">By proceeding, you agree to our terms and conditions...</p>
                <div className="mt-4">
                  <label className="inline-flex items-center">
                    <input type="checkbox" checked={isAccepted} onChange={() => setIsAccepted(!isAccepted)} className="mr-2" />
                    
                    I accept the terms and conditions
                  </label>
                </div>
                <button onClick={() => setIsTermsOpen(false)} className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-md">Close</button>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" disabled={!isAccepted} className={`w-full p-2 rounded-md ${isAccepted ? "bg-green-600 hover:bg-green-700 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}>
            Verify & Proceed
          </button>
        </form>
      </div>
    </div>
  );
}
