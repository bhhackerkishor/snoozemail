import { currentUser } from "@clerk/nextjs/server";
import connectDB from "@/lib/db";
import User from "@/lib/model/User";
import Dashboard from "@/components/Dashboard";
import { getUserReminders } from "@/lib/actions/getReminders";
import { redirect } from "next/navigation"; 

export default async function DashboardPage() {
  await connectDB();

  const clerkUser = await currentUser();
  if (!clerkUser?.id) {
    return <div className="text-center mt-10">User not found</div>;
  }

  const dbUser = await User.findOne({ clerkId: clerkUser.id });

  
  if (!dbUser) {
    redirect("/auth-callback");
  }

  const reminders = await getUserReminders();

  const plainUser = JSON.parse(JSON.stringify(dbUser));
  const plainReminders = JSON.parse(JSON.stringify(reminders));

  return <Dashboard user={plainUser} initialReminders={plainReminders} />;
}
