"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("customer"); // Default to Normal Membership

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Signing up with:", name, email, password, userType);

    // Redirect based on membership type
    if (userType === "customer") {
      router.push("/email-verification"); // Normal account email verification
    } else if (userType === "baker") {
      router.push("/id-facial-verification"); // Baker account ID & facial verification
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
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block font-medium">Full Name</label>
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
            <label className="block font-medium">Email</label>
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
            <label className="block font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border p-2 rounded-md mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Membership Selection */}
          <div className="mt-3">
            <label className="block font-medium">Select Account Type</label>
            <div className="mt-2">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={userType === "customer"}
                  onChange={() => setUserType("customer")}
                  className="mt-1 cursor-pointer"
                />
                <div>
                  <span className="font-medium">Normal Membership Account</span>
                  <p className="text-sm" style={{ color: "var(--text-color)" }}>
                    With this account, you can make purchases and rate other
                    bakers. You can upgrade to a Baker Membership Account later
                    in your profile settings.
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
                  <span className="font-medium">Baker Membership Account</span>
                  <p className="text-sm" style={{ color: "var(--text-color)" }}>
                    With this account, you can add recipes, manage your own
                    baker profile, and sell your recipes.
                  </p>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-2 rounded-md text-white"
            style={{ backgroundColor: "var(--primary-color)" }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = "var(--primary-hover)")
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = "var(--primary-color)")
            }
          >
            Sign Up
          </button>
        </form>

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
    </div>
  );
}
