'use client';

import { motion } from "framer-motion";
import { ShieldCheck, Lock, Trash2, Mail } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  const effectiveDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-4">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground">Effective Date: {effectiveDate}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="prose prose-sm sm:prose-base dark:prose-invert max-w-none"
      >
        <div className="bg-secondary/30 rounded-lg p-6 mb-8 border">
          <p className="text-lg font-medium">At SnoozeMail, your privacy is important to us.</p>
          <p>We built this service with privacy as a core principle — not an afterthought.</p>
        </div>

        <section className="mb-12">
          <motion.h2 
            className="flex items-center gap-3 text-2xl font-semibold mb-6 scroll-mt-24"
            id="information-we-collect"
          >
            <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-900/50">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span>1. Information We Collect</span>
          </motion.h2>
          <div className="space-y-4">
            <p>We do not collect or store any personal content from your emails permanently. Emails forwarded to our system are stored <strong>temporarily</strong> for the sole purpose of sending them back to you after your requested delay.</p>
            
            <div className="bg-secondary/20 p-4 rounded-lg border-l-4 border-primary">
              <h3 className="font-medium mb-2">We collect:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your email address (to deliver reminders)</li>
                <li>Metadata like the scheduled time and reminder status</li>
                <li>Subscription and usage details (if you sign up)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <motion.h2 
            className="flex items-center gap-3 text-2xl font-semibold mb-6 scroll-mt-24"
            id="how-we-use"
          >
            <div className="p-2 rounded-md bg-purple-100 dark:bg-purple-900/50">
              <Lock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <span>2. How We Use Your Information</span>
          </motion.h2>
          <div className="space-y-4">
            <div className="bg-secondary/20 p-4 rounded-lg">
              <h3 className="font-medium mb-2">We use your information to:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Process your reminders</li>
                <li>Provide account features and subscription plans</li>
                <li>Improve our service</li>
              </ul>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border-l-4 border-red-500">
              <h3 className="font-medium mb-2">We <strong>do not</strong>:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Sell your data</li>
                <li>Share with third parties</li>
                <li>Use your content for marketing</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <motion.h2 
            className="flex items-center gap-3 text-2xl font-semibold mb-6 scroll-mt-24"
            id="data-retention"
          >
            <div className="p-2 rounded-md bg-green-100 dark:bg-green-900/50">
              <Trash2 className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <span>3. Data Retention</span>
          </motion.h2>
          <p>Email content is deleted after your reminder is sent, typically within minutes to hours. We retain minimal metadata (like timestamps and plan type) for account management.</p>
        </section>

        <section className="mb-12">
          <motion.h2 
            className="flex items-center gap-3 text-2xl font-semibold mb-6 scroll-mt-24"
            id="third-party"
          >
            <div className="p-2 rounded-md bg-yellow-100 dark:bg-yellow-900/50">
              <ShieldCheck className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <span>4. Third-Party Services</span>
          </motion.h2>
          <p>We use services like Clerk (for login), Razorpay (for payments), and optionally Gmail APIs to access forwarded messages securely.</p>
        </section>

        <section className="mb-12">
          <motion.h2 
            className="flex items-center gap-3 text-2xl font-semibold mb-6 scroll-mt-24"
            id="security"
          >
            <div className="p-2 rounded-md bg-orange-100 dark:bg-orange-900/50">
              <Lock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <span>5. Security</span>
          </motion.h2>
          <p>Your data is encrypted during transmission and handled securely. However, this is a beta product — do not use it for sensitive or critical information.</p>
        </section>

        <section>
          <motion.h2 
            className="flex items-center gap-3 text-2xl font-semibold mb-6 scroll-mt-24"
            id="contact"
          >
            <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-900/50">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span>6. Contact</span>
          </motion.h2>
          <p>If you have questions, email us at <Link href="mailto:support@snoozemail.in" className="text-primary hover:underline">support@snoozemail.in</Link></p>
        </section>

        <div className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>Last updated: {effectiveDate}</p>
          <p className="mt-2">We may update this policy periodically. Significant changes will be notified to users.</p>
        </div>
      </motion.div>
    </div>
  );
}