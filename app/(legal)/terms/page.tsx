'use client';

import { motion } from "framer-motion";
import { ClipboardCheck, AlertTriangle, Shield, Clock, Zap, Mail, Ban } from "lucide-react";
import Link from "next/link";

export default function TermsOfService() {
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
          <ClipboardCheck className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Terms of Service</h1>
        <p className="text-muted-foreground">Effective Date: {effectiveDate}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="prose prose-sm sm:prose-base dark:prose-invert max-w-none"
      >
        <div className="bg-secondary/30 rounded-lg p-6 mb-8 border">
          <p className="text-lg font-medium">Welcome to SnoozeMail.</p>
          <p>These Terms govern your access and use of our email-based reminder service.</p>
        </div>

        <section className="mb-12">
          <motion.h2 
            className="flex items-center gap-3 text-2xl font-semibold mb-6 scroll-mt-24"
            id="beta-status"
          >
            <div className="p-2 rounded-md bg-yellow-100 dark:bg-yellow-900/50">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <span>1. Beta Status</span>
          </motion.h2>
          <div className="space-y-4">
            <p>SnoozeMail is currently in beta. While we work to provide a reliable experience, we cannot guarantee 100% uptime or bug-free service.</p>
            <div className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-lg border-l-4 border-yellow-400">
              <p className="font-medium">Please report any issues you encounter to help us improve the service.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <motion.h2 
            className="flex items-center gap-3 text-2xl font-semibold mb-6 scroll-mt-24"
            id="acceptable-use"
          >
            <div className="p-2 rounded-md bg-red-100 dark:bg-red-900/50">
              <Ban className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <span>2. Acceptable Use</span>
          </motion.h2>
          <div className="space-y-4">
            <p>You agree not to:</p>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border-l-4 border-red-500">
              <ul className="list-disc pl-5 space-y-2">
                <li>Use the service for illegal activities</li>
                <li>Forward spam or malware</li>
                <li>Abuse the platform to send mass emails</li>
              </ul>
            </div>
            <p className="text-sm text-muted-foreground">Violations may result in immediate account termination.</p>
          </div>
        </section>

        <section className="mb-12">
          <motion.h2 
            className="flex items-center gap-3 text-2xl font-semibold mb-6 scroll-mt-24"
            id="reliability"
          >
            <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-900/50">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span>3. Reminder Reliability</span>
          </motion.h2>
          <div className="space-y-4">
            <p>We strive to deliver emails on time, but delays or failures may occur due to:</p>
            <div className="bg-secondary/20 p-4 rounded-lg">
              <ul className="list-disc pl-5 space-y-2">
                <li>System limitations</li>
                <li>Spam filters</li>
                <li>External issues beyond our control</li>
              </ul>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border-l-4 border-blue-400">
              <p><strong>Note:</strong> We are not responsible for any consequences from missed or delayed reminders.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <motion.h2 
            className="flex items-center gap-3 text-2xl font-semibold mb-6 scroll-mt-24"
            id="warranty"
          >
            <div className="p-2 rounded-md bg-purple-100 dark:bg-purple-900/50">
              <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <span>4. No Warranty</span>
          </motion.h2>
          <div className="bg-secondary/20 p-4 rounded-lg">
            <p>SnoozeMail is provided <strong>&quot;as is&quot;</strong> without warranty of any kind. You use it at your own risk.</p>
          </div>
        </section>

        <section className="mb-12">
          <motion.h2 
            className="flex items-center gap-3 text-2xl font-semibold mb-6 scroll-mt-24"
            id="liability"
          >
            <div className="p-2 rounded-md bg-orange-100 dark:bg-orange-900/50">
              <Zap className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <span>5. Limitation of Liability</span>
          </motion.h2>
          <div className="space-y-4">
            <p>We are not liable for:</p>
            <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-lg border-l-4 border-orange-400">
              <ul className="list-disc pl-5 space-y-2">
                <li>Lost or missed emails</li>
                <li>Loss of data</li>
                <li>Any indirect or incidental damages</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <motion.h2 
            className="flex items-center gap-3 text-2xl font-semibold mb-6 scroll-mt-24"
            id="termination"
          >
            <div className="p-2 rounded-md bg-red-100 dark:bg-red-900/50">
              <Ban className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <span>6. Account Termination</span>
          </motion.h2>
          <div className="bg-secondary/20 p-4 rounded-lg">
            <p>We may suspend or terminate accounts for misuse, abuse, or violation of these terms.</p>
          </div>
        </section>

        <section className="mb-12">
          <motion.h2 
            className="flex items-center gap-3 text-2xl font-semibold mb-6 scroll-mt-24"
            id="changes"
          >
            <div className="p-2 rounded-md bg-green-100 dark:bg-green-900/50">
              <AlertTriangle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <span>7. Changes</span>
          </motion.h2>
          <div className="bg-secondary/20 p-4 rounded-lg">
            <p>We may update these terms at any time. Continued use of the service means you agree to the latest version.</p>
          </div>
        </section>

        <section>
          <motion.h2 
            className="flex items-center gap-3 text-2xl font-semibold mb-6 scroll-mt-24"
            id="contact"
          >
            <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-900/50">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span>8. Contact</span>
          </motion.h2>
          <p>Questions? Email us at <Link href="mailto:legal@snoozemail.in" className="text-primary hover:underline">legal@snoozemail.in</Link></p>
        </section>

        <div className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>Last updated: {effectiveDate}</p>
          <p className="mt-2">By using SnoozeMail, you acknowledge that you have read and agreed to these terms.</p>
        </div>
      </motion.div>
    </div>
  );
}