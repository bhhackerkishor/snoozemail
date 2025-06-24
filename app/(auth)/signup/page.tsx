"use client";

import { motion } from "framer-motion";
import Input from "@/components/Input";
import FloatingShape from "@/components/FloatingShape";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PasswordStrengthMeter from "@/components/PasswordStrengthMeter";
import { useSignUp, useClerk } from "@clerk/nextjs";
import { User, Mail, Lock } from "lucide-react";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, isLoaded } = useSignUp();
  const { setActive } = useClerk(); // ✅ Correct usage
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const result = await signUp.create({
        emailAddress: email,
        password,
        firstName: name,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId }); // ✅ Correct API
        router.push("/dashboard");
      } else {
        console.log("Further verification required:", result);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert("Error: " + error.message);
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300 flex items-center justify-center relative overflow-hidden">
      <FloatingShape color="bg-blue-300 dark:bg-blue-600" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-blue-400 dark:bg-blue-700" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-blue-200 dark:bg-blue-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white dark:bg-gray-900 bg-opacity-60 dark:bg-opacity-60 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden transition-colors duration-300"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-300 dark:to-blue-500 text-transparent bg-clip-text">
            Create Account
          </h2>
        </div>

        <form onSubmit={handleSignUp} className="px-8 space-y-4">
          <Input
            label="Name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            icon={User}
          />
          <Input
            label="Email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            icon={Mail}
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            icon={Lock}
          />
          <PasswordStrengthMeter password={password} />
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
            Sign Up
          </button>
        </form>

        <div className="px-8 py-4 bg-gray-100 dark:bg-gray-800 bg-opacity-60 dark:bg-opacity-60 flex justify-center transition-colors">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 dark:text-blue-300 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
