// app/(dashboard)/layout.tsx
"use client";

import { useState, useEffect } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex">
      <DashboardSidebar />
      <main className={cn(
        "flex-1 p-4 transition-all duration-300",
        !isMobile ? "ml-8" : "" // Only add margin on desktop
      )}>
        {children}
      </main>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}