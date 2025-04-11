"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import countryList from "react-select-country-list";
import { FiEye, FiEyeOff } from "react-icons/fi";
import API_ENDPOINTS from "../utils/api";
import { apiRequest } from "../utils/apiHelper";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import Loading from "../components/Loading";

export default function SignUp() {
  const countries = countryList().getData();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [userType, setUserType] = useState("customer");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!name || !email || !password || !confirmPassword || !country) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const data = { name, email, password, country, userType };
      const response = await apiRequest(
        API_ENDPOINTS.AUTH.SIGNUP,
        "POST",
        data
      );

      if (response.token) {
        const id = response.userId;
        dispatch(
          setUser({
            user: { id, name, email, country, userType },
            token: response.token,
          })
        );
      }

      console.log("Signup Success:", response);

      if (userType === "customer") {
        handleRequestOTP();
        setLoading(false);
        router.push(`/email-verification?email=${encodeURIComponent(email)}`);
      } else {
        handleRequestOTP();
        setLoading(false);
        router.push(`/email-verification?email=${encodeURIComponent(email)}`);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestOTP = async (e) => {
    // e.preventDefault();
    setError("");
    //setMessage("");
    setLoading(true);

    try {
      const data = { email };
      const response = await apiRequest(
        API_ENDPOINTS.AUTH.GENERATE_OTP,
        "POST",
        data
      );
      //setMessage(response.message);
    } catch (error) {
      setError(error.message);
    } finally {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--background-color)" }}
    >
      <div className="p-8 rounded-lg shadow-lg w-96 bg-white">
        <h2
          className="text-2xl font-bold mb-4 text-center"
          style={{ color: "var(--primary-color)" }}
        >
          Registration
        </h2>
        {error && (
          <div className="text-red-600 bg-red-100 p-2 rounded-md text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block font-medium">
              Full Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full border p-2 rounded-md mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium">
              Email <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border p-2 rounded-md mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium">
              Country <span style={{ color: "red" }}>*</span>
            </label>
            <select
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
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
          </div>
          {/* Password Input with Show/Hide */}
          <div>
            <label className="block font-medium">
              Password <span style={{ color: "red" }}>*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border p-2 rounded-md pr-10 mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>
          {/* Confirm Password Input with Show/Hide */}
          <div>
            <label className="block font-medium">
              Confirm Password <span style={{ color: "red" }}>*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="w-full border p-2 rounded-md pr-10 mt-1"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FiEyeOff size={20} />
                ) : (
                  <FiEye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Membership Selection */}
          <div className="mt-3">
            <label className="block font-medium">
              Select Account Type <span style={{ color: "red" }}>*</span>
            </label>
            <div className="mt-2">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={userType === "customer"}
                  onChange={() => setUserType("customer")}
                  className="mt-1 cursor-pointer"
                />
                <div>
                  <span className="font-semibold">Standard Membership: </span>
                  <p className="text-sm" style={{ color: "var(--text-color)" }}>
                    This account allows you to purchase items, access the
                    cookbook, use your wallet, and rate artists. You can upgrade
                    to an Artist Account through your profile settings, and
                    email verification is required.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-2 mt-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={userType === "baker"}
                  onChange={() => setUserType("baker")}
                  className="mt-1 cursor-pointer"
                />
                <div>
                  <span className="font-semibold">Artist Membership:</span>
                  <p className="text-sm" style={{ color: "var(--text-color)" }}>
                    This account includes all the features of the Standard
                    Membership, in addition to the ability to submit recipes,
                    manage your artist profile, and sell your recipes. Please
                    note that identity verification, facial verification, and
                    email verification are required for this membership.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="mt-3 flex items-center">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
              id="terms"
              className="mr-2"
              required
            />
            <label htmlFor="terms" className="text-sm">
              I agree to the{" "}
              <Link href="/terms" className="text-blue-600 hover:underline">
                Terms and Conditions
              </Link>{" "}
              and
              <Link href="/privacy" className="text-blue-600 hover:underline">
                {" "}
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full p-2 rounded-md text-white"
            style={{
              backgroundColor: termsAccepted ? "var(--primary-color)" : "gray",
              cursor: termsAccepted ? "pointer" : "not-allowed",
            }}
            disabled={!termsAccepted}
          >
            Sign Up
          </button>
        </form>

        {/* Social Sign Up Buttons */}
        <div className="mt-4 space-y-2">
          <button className="w-full p-2 rounded-md bg-red-500 text-white">
            Sign Up with Google
          </button>
          <button className="w-full p-2 rounded-md bg-blue-600 text-white">
            Sign Up with Facebook
          </button>
          <button className="w-full p-2 rounded-md bg-black text-white">
            Sign Up with Apple
          </button>
          <button className="w-full p-2 rounded-md bg-gray-800 text-white">
            Sign Up with X
          </button>
        </div>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="hover:underline"
            style={{ color: "var(--primary-color)" }}
          >
            Sign In
          </Link>
        </p>
      </div>
      <Loading isLoading={loading} />
    </div>
  );
}
