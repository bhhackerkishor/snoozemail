"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SignIn } from "@clerk/nextjs";
import FloatingShape from "@/components/FloatingShape";
import { motion } from "framer-motion";

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    const handleClerkEvents = (e: CustomEvent) => {
      if (e.detail?.status === "complete") {
        router.push("/auth-callback");
      }
    };

    window.addEventListener("clerk:signIn", handleClerkEvents as EventListener);

    return () => {
      window.removeEventListener("clerk:signIn", handleClerkEvents as EventListener);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300 flex items-center justify-center relative overflow-hidden">
      {/* Floating Shapes */}
      <FloatingShape color="bg-blue-300 dark:bg-blue-600" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-blue-400 dark:bg-blue-700" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-blue-200 dark:bg-blue-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full z-10 bg-white dark:bg-gray-900 bg-opacity-60 dark:bg-opacity-60 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden transition-colors duration-300 p-6"
      >
        <SignIn path="/login" routing="path" />
      </motion.div>
    </div>
  );
};

export default LoginPage;
