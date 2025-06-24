'use client';

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Settings, Trash2, Clock, SunMoon } from "lucide-react";
import Link from "next/link";
import useDarkMode from "@/hooks/useDarkMode";

interface DbUser {
  name: string;
  email: string;
  plan: string;
  usedRemindersThisMonth: number;
  resetAt?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
purchaseHistory?: Array<any>;// or Array<Purchase> if you define it

}

export default function SettingsPage() {
  const { user } = useUser();
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [timezone, setTimezone] = useState("Asia/Kolkata");
 
const { theme,setTheme } = useDarkMode();
  useEffect(() => {
    if (user) {
      setDisplayName(user.fullName || user.firstName || "");
      fetchDbUser();
    }
  }, [user]);

  const fetchDbUser = async () => {
  try {
    const res = await fetch("/api/user");
    const data = await res.json();
    if (data.user) setDbUser(data.user);
	console.log(data)
  } catch (error) {
    console.error("Failed to load db user:", error);
  }
};


  const handleSave = () => {
    toast.success("Settings saved (not wired up yet)");
  };

  const handleDelete = () => {
    toast.error("Account deletion not implemented yet");
  };

  return (
    <div className="min-h-screen py-10 px-6 max-w-3xl mx-auto text-gray-800 dark:text-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-6 h-6 text-sky-600 dark:text-sky-400" />
        <h1 className="text-2xl font-bold">Account Settings</h1>
      </div>

      {/* Profile */}
      <Card className="mb-6">
        <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Display Name</Label>
            <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
          </div>
          <div>
            <Label>Email</Label>
            <Input value={user?.emailAddresses[0].emailAddress} readOnly disabled />
          </div>
          <Button onClick={handleSave} className="bg-sky-600 hover:bg-sky-700">Save Changes</Button>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card className="mb-6">
        <CardHeader><CardTitle>Preferences</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Email Notifications</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Get reminder notifications via email
              </p>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>

          <div>
            <Label className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> Timezone
            </Label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full mt-1 border dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-800"
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="America/New_York">America/New_York (EST)</option>
              <option value="Europe/London">Europe/London (GMT)</option>
            </select>
          </div>

          <div>
            <Label className="flex items-center gap-2">
              <SunMoon className="w-4 h-4" /> Theme
            </Label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full mt-1 border dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-800"
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Plan */}
      <Card className="mb-6">
        <CardHeader><CardTitle>Plan & Billing</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">
            You&apos;re currently on the{" "}
            <strong>{(dbUser?.plan || user?.publicMetadata?.plan || "Free")?.toString()}</strong> plan.
          </p>
          <p className="text-sm">
            Reminders used this month: <strong>{dbUser?.usedRemindersThisMonth ?? 0}</strong>
          </p>
          {dbUser?.resetAt && (
            <p className="text-sm">
              Plan resets on: <strong>{new Date(dbUser.resetAt).toLocaleDateString()}</strong>
            </p>
          )}
          <Link href="/subscriptions">
            <Button variant="outline" className="text-sky-600 border-sky-600 hover:bg-sky-100 dark:hover:bg-sky-800">
              Upgrade Plan
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-500">
        <CardHeader><CardTitle className="text-red-600">Danger Zone</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This action is permanent and will delete all your data.
          </p>
          <Button variant="destructive" onClick={handleDelete} className="gap-2">
            <Trash2 className="w-4 h-4" /> Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
