'use client';

import { useState, useEffect } from "react";
import {  Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import useDarkMode from "@/hooks/useDarkMode";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { user, isLoaded } = useUser();
  
  const { theme, toggleTheme } = useDarkMode();
  const pathname = usePathname();
 

  const isHome = pathname === "/";

 

  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 ml-13">
            <Link href="#" className="flex items-center gap-2">
              
              <span className="text-xl font-bold text-sky-700 dark:text-sky-300">
                SnoozeMail
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isHome && (
              <div className="flex space-x-6">
                <Link 
                  href="#features" 
                  className="text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Features
                </Link>
                <Link 
                  href="#how" 
                  className="text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  How it works
                </Link>
                <Link 
                  href="/pricing" 
                  className="text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Pricing
                </Link>
              </div>
            )}

            <div className="flex items-center space-x-4 ml-6">
              {!isLoaded ? (
                <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              ) : user ? (
                <>
                  <UserButton afterSignOutUrl="/" />
                  <Button asChild variant="ghost" className="text-gray-700 dark:text-gray-300">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="ghost" className="text-gray-700 dark:text-gray-300">
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button asChild className="bg-sky-600 hover:bg-sky-700 text-white">
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </>
              )}

              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation (Only Home and Theme Toggle) */}
          <div className="md:hidden flex items-center space-x-4">
            <Button asChild variant="ghost" className="text-gray-700 dark:text-gray-300">
              <Link href={isHome ? "/dashboard" : "/"}>
                    {isHome ? "Dashboard" : "Home"}
                  </Link>
            </Button>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}