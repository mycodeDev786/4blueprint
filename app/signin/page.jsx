"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
    router.push("/");
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Add authentication logic here
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
          Sign In
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
            Login
          </button>
        </form>
        <div className="mt-4 space-y-2">
          <button
            onClick={() => handleSocialLogin("Google")}
            className="w-full p-2 rounded-md bg-red-500 text-white"
          >
            Sign in with Google
          </button>
          <button
            onClick={() => handleSocialLogin("Facebook")}
            className="w-full p-2 rounded-md bg-blue-600 text-white"
          >
            Sign in with Facebook
          </button>
          <button
            onClick={() => handleSocialLogin("Apple")}
            className="w-full p-2 rounded-md bg-black text-white"
          >
            Sign in with Apple
          </button>
          <button
            onClick={() => handleSocialLogin("X")}
            className="w-full p-2 rounded-md bg-gray-800 text-white"
          >
            Sign in with X
          </button>
        </div>
        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-600">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
