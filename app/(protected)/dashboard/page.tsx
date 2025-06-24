import { currentUser } from "@clerk/nextjs/server";
import connectDB from "@/lib/db";
import User from "@/lib/model/User";
import Dashboard from "@/components/Dashboard";
import { getUserReminders } from "@/lib/actions/getReminders";

export default async function DashboardPage() {
  await connectDB();

  const clerkUser = await currentUser();
  console.log(clerkUser)
  if (!clerkUser?.id) return <div className="text-center mt-10">User not found</div>;

  const dbUser = await User.findOne({ clerkId: clerkUser.id });
  if (!dbUser) return <div className="text-center mt-10">User not in DB</div>;

  const reminders = await getUserReminders();

  const plainUser = JSON.parse(JSON.stringify(dbUser));
  console.log(plainUser)
  const plainReminders = JSON.parse(JSON.stringify(reminders));

  return <Dashboard user={plainUser} initialReminders={plainReminders} />;
}
