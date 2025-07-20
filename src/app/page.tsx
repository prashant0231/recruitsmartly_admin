"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BASE_PATH } from "@/lib/config";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (typeof window !== "undefined") {
      if (token) {
        router.replace(`${BASE_PATH}/workspace/dashboard`);
      } else {
        router.replace(`auth/login`);
      }
    }
  }, [router]);

  return null; // Optional: You could return a loader component
}
