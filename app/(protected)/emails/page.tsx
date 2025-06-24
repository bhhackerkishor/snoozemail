'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MailCheck, AlarmClock, Inbox, CalendarClock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const mockSnoozedEmails = [
  {
    from: "support@example.com",
    subject: "Subscription Expiring Soon",
    scheduledAt: "2025-07-01T10:00:00Z"
  },
  {
    from: "newsletter@startup.com",
    subject: "🚀 Your Weekly Startup Digest",
    scheduledAt: "2025-07-02T09:30:00Z"
  }
]

export default function EmailsPage() {
  const emails = mockSnoozedEmails // Replace with real data later

  return (
    <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Inbox className="w-6 h-6 text-sky-600 dark:text-sky-300" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Snoozed Emails</h1>
      </div>

      {/* Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MailCheck className="w-5 h-5 text-sky-500" />
            About Your Snoozed Emails
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-600 dark:text-gray-300">
          These are emails you&apos;ve forwarded to <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">2min@snoozemail.app</code> or similar addresses. 
          We&apos;ll send them back to your inbox at the exact time you requested.
        </CardContent>
      </Card>

      {/* Snoozed Emails List */}
      {emails.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {emails.map((email, idx) => (
            <Card key={idx} className="border-sky-200 dark:border-sky-800 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-base text-gray-800 dark:text-gray-100 line-clamp-1">
                  {email.subject}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  From: <span className="font-medium">{email.from}</span>
                </p>
                <p className="text-sm flex items-center gap-1 text-gray-700 dark:text-gray-300">
                  <CalendarClock className="w-4 h-4 text-sky-500" />
                  Scheduled for:{" "}
                  <span className="font-medium">
                    {new Date(email.scheduledAt).toLocaleString()}
                  </span>
                </p>
                <Badge variant="outline" className="text-xs mt-2">
                  Snoozed
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-600 dark:text-gray-400">
          <AlarmClock className="w-10 h-10 mx-auto mb-4 text-sky-500" />
          <p className="text-lg font-medium">No snoozed emails found</p>
          <p className="text-sm mt-2">Forward an email to <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">5min@snoozemail.app</code> to test it out.</p>
          <Button className="mt-4 bg-sky-600 hover:bg-sky-700 text-white">Try Demo</Button>
        </div>
      )}
    </div>
  )
}
