"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, CalendarCheck, Clock, CheckCircle, SendHorizontal } from "lucide-react";
import { useState } from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function LandingPage() {
  const { isSignedIn } = useUser();
  const { openSignUp } = useClerk();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleTryNow = () => {
    setIsLoading(true);
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      openSignUp({
        afterSignUpUrl: "/dashboard",
        afterSignInUrl: "/dashboard",
      });
    }
    setIsLoading(false);
  };

  const handleStartSnoozing = () => {
    setIsLoading(true);
    if (isSignedIn) {
      router.push("/compose");
    } else {
      openSignUp({
        afterSignUpUrl: "/compose",
        afterSignInUrl: "/compose",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50/30 to-white dark:from-gray-900 dark:to-sky-950/50"></div>
        <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-sky-100/50 dark:bg-sky-900/20 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-sky-100/40 dark:bg-sky-900/30 blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 px-4 max-w-6xl mx-auto text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-sky-900 dark:text-sky-200">
            Snooze Your Emails.<br />Effortlessly.
          </h1>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
            Forward any email to{" "}
            <span className="font-mono bg-sky-100 dark:bg-sky-900/50 text-sky-800 dark:text-sky-200 px-3 py-1 rounded-md border border-sky-200 dark:border-sky-800">
              2min@snoozemail.in
            </span>{" "}
            and get reminded exactly when you want.
          </p>
          <Button 
            onClick={handleTryNow}
            disabled={isLoading}
            className="bg-sky-600 hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-600 text-white px-8 py-4 rounded-xl text-lg shadow-lg hover:shadow-sky-200/50 dark:hover:shadow-sky-900/30 transition-all"
          >
            {isLoading ? "Loading..." : "Try It Now"} <SendHorizontal className="ml-2 h-4 w-4 inline" />
          </Button>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl font-semibold mb-12 text-center text-sky-900 dark:text-sky-200"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          How It Works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Mail className="w-10 h-10 text-sky-600 dark:text-sky-400" />,
              title: "Forward Email",
              text: "Send to our special address with your desired delay",
            },
            {
              icon: <CalendarCheck className="w-10 h-10 text-sky-600 dark:text-sky-400" />,
              title: "We Schedule It",
              text: "Our system processes and schedules your reminder",
            },
            {
              icon: <Clock className="w-10 h-10 text-sky-600 dark:text-sky-400" />,
              title: "Get Reminded",
              text: "Receive the email back at your specified time",
            },
          ].map((step, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
            >
              <Card className="h-full border border-sky-100 dark:border-sky-900/50 hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center text-center p-8">
                  <div className="bg-sky-100/50 dark:bg-sky-900/20 p-4 rounded-full mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-sky-800 dark:text-sky-200">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 max-w-6xl mx-auto bg-sky-50/30 dark:bg-sky-950/30 rounded-3xl my-12">
        <motion.h2
          className="text-3xl font-semibold mb-12 text-center text-sky-900 dark:text-sky-200"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          Why Choose SnoozeMail?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "No signup required for basic use",
            "Works with any email client",
            "Simple time formats (2min, 3h, tomorrow)",
            "Secure & private email handling",
            "Lightning fast delivery",
            "Never stores your emails permanently",
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.1 + idx * 0.1 }}
              className="flex items-start bg-white/70 dark:bg-gray-900/70 p-6 rounded-xl border border-sky-100 dark:border-sky-900/50 hover:shadow-md transition-shadow"
            >
              <CheckCircle className="text-sky-500 dark:text-sky-400 w-5 h-5 mt-1 mr-3 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">{feature}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 max-w-4xl mx-auto text-center">
        <motion.div
          className="bg-sky-600 dark:bg-sky-800 rounded-3xl p-12 shadow-xl"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
            Ready to try it out?
          </h2>
          <p className="text-lg mb-8 text-sky-100">
            Forward an email to{" "}
            <span className="font-mono text-white bg-sky-700 dark:bg-sky-900 px-3 py-1 rounded-md">
              5min@snoozemail.in
            </span>{" "}
            now!
          </p>
          <Button 
            onClick={handleStartSnoozing}
            disabled={isLoading}
            className="bg-white hover:bg-gray-100 text-sky-600 px-8 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all"
          >
            {isLoading ? "Loading..." : "Start Snoozing"} <SendHorizontal className="ml-2 h-4 w-4 inline" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 max-w-6xl mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
        <p>SnoozeMail © {new Date().getFullYear()}</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="/privacy" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
            Privacy
          </a>
          <a href="/terms" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
            Terms
          </a>
          <a href="/faq" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
            FAQ
          </a>
        </div>
      </footer>
    </div>
  );
}