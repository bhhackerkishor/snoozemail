'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Bell, BellRing, Mail, Plus, Rocket, Home, LineChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface Reminder {
  _id: string;
  subject: string;
  to: string;
  remindAt: string;
  sent: string;
  clerkId: string;
  body?: string;
}

interface User {
  name: string;
  usedRemindersThisMonth: number;
  plan: string;
  email?: string;
}

export default function Dashboard({ user, initialReminders }: { user: User, initialReminders: Reminder[] }) {
  const { name, usedRemindersThisMonth, plan, email } = user;
  const reminderLimit = plan === "free" ? 10 : plan === "pro" ? 100 : Infinity;
  const [reminders] = useState<Reminder[]>(initialReminders);

  const progress = reminderLimit === Infinity
    ? 100
    : Math.min((usedRemindersThisMonth / reminderLimit) * 100, 100);

  const now = new Date();
  const dueReminders = reminders.filter(reminder => new Date(reminder.remindAt) <= now);
  const dueCount = dueReminders.length;
  const snoozedCount = usedRemindersThisMonth - dueCount;

  const planDetails : Record<string, { name: string; color: string }> =  {
    free: { name: "Free", color: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200" },
    pro: { name: "Pro", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
    team: { name: "Team", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" }
  };

  // Chart Data (last 7 reminders as example data)
  const chartData = reminders.slice(0, 7).map(reminder => ({
    name: reminder.subject.length > 10 ? reminder.subject.slice(0, 10) + "..." : reminder.subject,
    time: new Date(reminder.remindAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  }));

  return (
    <div className="min-h-screen bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-200 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 text-sky-700 dark:text-sky-300">
              <Home className="w-6 h-6" /> Dashboard
            </h1>
            <p className="text-gray-700 dark:text-gray-200 mt-2">
              Welcome back, <span className="font-semibold text-sky-700 dark:text-sky-300">{name}</span> 👋
            </p>
          </div>
          <Badge className={`${planDetails[plan].color} px-3 py-1 text-sm font-medium`}>
            {planDetails[plan].name} Plan
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow border-sky-200 dark:border-sky-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Bell className="w-4 h-4" /> Total Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{usedRemindersThisMonth}</p>
              <p className="text-xs mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-sky-200 dark:border-sky-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <BellRing className="w-4 h-4" /> Active Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{dueCount}</p>
              <p className="text-xs mt-1">Ready to be sent</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-sky-200 dark:border-sky-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" /> Snoozed Emails
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{snoozedCount}</p>
              <p className="text-xs mt-1">Will be sent later</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-sky-200 dark:border-sky-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Account Email</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium truncate">{email || "Not provided"}</p>
              <p className="text-xs mt-1">For notifications</p>
            </CardContent>
          </Card>
        </div>

        {/* Usage Progress */}
        <Card className="mb-8 border-sky-200 dark:border-sky-800">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Plan Usage</span>
              <span className="text-sm font-normal">
                {usedRemindersThisMonth} of {reminderLimit === Infinity ? "∞" : reminderLimit} used
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between mt-2 text-sm">
              <span>{planDetails[plan].name} Plan</span>
              <span>{Math.round(progress)}% used</span>
            </div>
          </CardContent>
        </Card>

        {/* Chart Section */}
        <Card className="mb-8 border-sky-200 dark:border-sky-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="w-4 h-4" /> Reminder Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <RechartsLineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis hide />
                <Tooltip />
                <Line type="monotone" dataKey="time" stroke="#38bdf8" strokeWidth={2} dot={false} />
              </RechartsLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button className="flex-1 sm:flex-none gap-2 bg-sky-600 hover:bg-sky-700 text-white">
            <Plus className="w-4 h-4" /> Create Reminder
          </Button>
          <Button variant="outline" className="flex-1 sm:flex-none gap-2 border-sky-600 text-sky-600 hover:bg-sky-100 dark:hover:bg-sky-800">
            <Rocket className="w-4 h-4" /> Upgrade Plan
          </Button>
        </div>

        {/* Reminder List */}
        <Card className="border-sky-200 dark:border-sky-800">
          <CardHeader>
            <CardTitle>Recent Reminders</CardTitle>
          </CardHeader>
          <CardContent>
            {reminders.length > 0 ? (
              <div className="space-y-4">
                {reminders.slice(0, 5).map((reminder) => (
                  <div key={reminder._id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-sky-100 dark:hover:bg-sky-800">
                    <div>
                      <p className="font-medium">{reminder.subject}</p>
                      <p className="text-sm">To: {reminder.to}</p>
                    </div>
                    <div className="text-sm">
                      {new Date(reminder.remindAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p>No reminders created yet</p>
                <Button variant="link" className="mt-2 text-sky-600">Create your first reminder</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
