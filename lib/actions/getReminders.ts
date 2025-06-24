// lib/actions/getReminders.ts
import connectDB from "@/lib/db";
import Reminder from "@/lib/model/reminder";
import { currentUser } from "@clerk/nextjs/server";

export async function getUserReminders() {
  await connectDB();
  const clerkUser = await currentUser();
  
  if (!clerkUser?.id) return [];
  const reminders = await Reminder.find({ clerkId: clerkUser.id });

 
  return JSON.parse(JSON.stringify(reminders));
}
