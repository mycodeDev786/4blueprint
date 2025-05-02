"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { setUser } from "../store/authSlice";
import Link from "next/link";
import API_ENDPOINTS from "../utils/api";
import { apiRequest } from "../utils/apiHelper";
import { getVerificationStatus } from "../utils/apiHelper";
import Loading from "../components/Loading";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState(null);

  const fetchStatus = async (userId) => {
    try {
      const response = await apiRequest(
        API_ENDPOINTS.AUTH.GET_STATUS(userId),
        "GET",
        null
      );
      console.log(response.status);
      setStatus(response.status);
    } catch (error) {
      console.error("Error fetching verification status:", error);
      throw error;
    }
  };

  useEffect(() => {
    console.log("Updated status:", status);
  }, [status]);
  useEffect(() => {
    // Redirect if user is already logged in
    if (auth.token) {
      console.log(auth.user);
      if (auth.user.userType === "customer") {
        router.push("/");
      } else {
        // Define an async function inside useEffect
        const fetchVerificationStatus = async () => {
          try {
            const response = await apiRequest(
              API_ENDPOINTS.AUTH.GET_STATUS(auth.user?.id),
              "GET",
              null
            );

            console.log("Verification Status:", response.status);

            if (response.status === "approved") {
              router.push("/");
            } else {
              router.push("/submitted");
            }
          } catch (error) {
            console.error("Error fetching verification status:", error);
          }
        };

        if (auth.user.id) {
          fetchVerificationStatus(); // Call the async function
        }
      }
    }
  }, [auth.token, auth.user?.userType, auth.user?.id, router]);

  useEffect(() => {
    setIsClient(true); // Ensures client-side rendering
  }, []);
  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    setError("");

    try {
      const response = await apiRequest(API_ENDPOINTS.AUTH.SIGNIN, "POST", {
        email,
        password,
      });
      console.log(response);
      if (response.token) {
        // Save user data in Redux
        dispatch(setUser({ token: response.token, user: response.user }));

        // Save session in local storage
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        fetchStatus(response.user?.id);
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Add authentication logic here
  };
  if (!isClient) return null;
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
        {error && (
          <div className="text-red-600 bg-red-100 p-2 rounded-md text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border p-2 rounded-md pr-10"
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
      <Loading isLoading={loading} />
    </div>
  );
}
