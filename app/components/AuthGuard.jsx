"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const PROTECTED_ROUTES = ["/dashboard", "/profile", "/orders"];

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useSelector((state) => state.auth.user); // ✅ Get user from Redux

  useEffect(() => {
    if (!user && PROTECTED_ROUTES.includes(pathname)) {
      router.push("/signin"); // Redirect to login if not authenticated
    }
  }, [user, pathname, router]);

  return children;
}
