"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import API_ENDPOINTS from "../utils/api";

const PROTECTED_ROUTES = ["/dashboard", "/profile", "/orders", "/admin"];

export default function AuthGuard({ children }) {
  const email = useSelector((state) => state.auth.user?.email); // Get user email from Redux
  const userType = useSelector((state) => state.auth.user?.userType);
  const [isVerified, setIsVerified] = useState(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const user = useSelector((state) => state.auth.user); // ✅ Get user from Redux

  useEffect(() => {
    if (!email) return; // No need to check if the user is not logged in

    const checkVerification = async () => {
      try {
        const response = await fetch(
          `${API_ENDPOINTS.AUTH.CHECK_VERIFICATION}?email=${email}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("Raw response:", response);

        const text = await response.text();
        console.log("Response text:", text); // Debug raw response

        const data = JSON.parse(text); // Ensure JSON format
        console.log("Parsed JSON:", data);

        setIsVerified(data.isVerified);
        console.log(isVerified);
      } catch (err) {
        console.error(
          "Error fetching verification status:",
          err.message || err
        );
        setIsVerified(false);
      } finally {
        setLoading(false);
      }
    };
    checkVerification();
  }, [email, isVerified]);

  useEffect(() => {
    // if (user) {
    //   if (!isVerified && userType === "customer") {
    //     router.push("/submitted");
    //   }
    // }
    if (!user && PROTECTED_ROUTES.includes(pathname)) {
      router.push("/signin"); // Redirect to login if not authenticated
    }
  }, [user, pathname, router, isVerified]);

  return children;
}
