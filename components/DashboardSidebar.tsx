"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useClerk } from "@clerk/nextjs";
import {
  Home,
  Bell,
  Mail,
  MailOpen,
  DollarSign,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
  { href: "/reminders", label: "Reminders", icon: <Bell className="w-5 h-5" /> },
  { href: "/emails", label: "Snoozed Emails", icon: <Mail className="w-5 h-5" /> },
  { href: "/subscription", label: "Subscription", icon: <DollarSign className="w-5 h-5" /> },
  { href: "/settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
];

export default function DashboardSidebar() {
  const { user, signOut } = useClerk();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(true);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) setIsOpen(false);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [pathname]);

  const closeSidebar = () => {
    if (isMobile) setIsOpen(false);
  };

  return (
    <>
      {/* Toggle Button */}
      {isMobile && (
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden fixed top-3.5 left-4 z-40 p-2 rounded-md bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700"
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          ) : (
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <MailOpen className="w-6 h-6 text-sky-600 dark:text-sky-400" />
            </motion.div>
          )}
        </motion.button>
      )}

      {/* Sidebar + Overlay */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-20"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 bottom-0 w-64 bg-white dark:bg-gray-900 border-r flex flex-col justify-between p-4 shadow-sm z-30"
          >
            <div>
              <Link
                href="/"
                onClick={closeSidebar}
                className="flex items-center gap-2 mb-8 px-4 py-2 text-sky-700 dark:text-sky-300 text-lg font-bold"
              >
                <Mail className="w-5 h-5" />
                SnoozeMail
              </Link>

              <nav className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeSidebar}
                    className={`flex items-center gap-3 text-gray-700 dark:text-gray-200 hover:bg-sky-100 dark:hover:bg-sky-800 px-4 py-2 rounded-md transition ${
                      pathname === item.href
                        ? "bg-sky-100 dark:bg-sky-800 font-medium"
                        : ""
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="mt-6">
              {user ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <UserButton
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          avatarBox: "w-10 h-10 md:w-12 md:h-12",
                        },
                      }}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {user.fullName || "My Account"}
                      </span>
                      <span className="text-xs text-gray-400 truncate">
                        {user.primaryEmailAddress?.emailAddress}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => signOut()}
                    className="w-full flex items-center gap-2 text-red-500 hover:bg-red-500/10 border-red-500/30"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Button asChild className="w-full bg-sky-600 hover:bg-sky-700">
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/sign-up">Create Account</Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content padding on desktop only */}
      <div className={!isMobile ? "ml-64 transition-all duration-300" : ""}></div>
    </>
  );
}
