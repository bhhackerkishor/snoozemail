"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const AuthCallbackPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [showFallback, setShowFallback] = useState(false);

  const verifyUser = useCallback(async () => {
    setLoading(true);
    setShowFallback(false);
    try {
      const res = await fetch("/api/get-auth-status", {
        method: "POST",
      });

      const data = await res.json();
      console.log("Auth fallback response:", data);

      if (data?.success) {
        router.push("/dashboard");
      } else {
        console.log("User not authenticated");
        setShowFallback(true);
      }
    } catch (error) {
      console.error("Auth verification failed", error);
      setShowFallback(true);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    verifyUser();

    const timeout = setTimeout(() => {
      setShowFallback(true);
    }, 10000); // fallback after 10s

    return () => clearTimeout(timeout);
  }, [verifyUser]);

  return (
    <div className="flex items-center justify-center flex-col h-screen bg-white dark:bg-gray-900 px-4 text-center">
      {loading && (
        <>
          <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-lg font-medium mt-4 text-gray-800 dark:text-gray-200">
            Verifying your account...
          </p>
        </>
      )}

      {!loading && showFallback && (
        <>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            This is taking longer than expected.
          </p>
          <div className="flex gap-3 mt-4">
            <button
              onClick={verifyUser}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md transition"
            >
              Retry Verification
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md transition"
            >
              Go to Dashboard
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthCallbackPage;
