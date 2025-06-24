import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar" 
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "sonner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// app/(public)/page.tsx or app/layout.tsx
export const metadata = {
  title: "SnoozeMail – Never Miss an Email Again",
  description: "SnoozeMail lets you schedule reminders for important emails. Stay on top of your inbox, always.",
  keywords: ["email reminders", "email snooze", "SnoozeMail", "email productivity", "schedule emails"],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "SnoozeMail",
    description: "SnoozeMail helps you remember emails at the right time. Perfect for busy professionals.",
    url: "https://snoozemail.in",
    siteName: "SnoozeMail",
    images: [
      {
        url: "https://snoozemail.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "SnoozeMail – Email Reminder Scheduler",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@snoozemail",
    creator: "@snoozemail",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
	  <Navbar/>
        {children}
		<Toaster richColors position="top-right" />
      </body>
    </html>
	</ClerkProvider>
  );
}
