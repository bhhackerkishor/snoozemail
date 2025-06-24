// lib/actions/getUser.ts
import { currentUser } from "@clerk/nextjs/server";
import connectDB from "@/lib/db";
import User from "@/lib/model/User";

export async function getDbUser() {
  await connectDB();
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const dbUser = await User.findOne({ clerkId: clerkUser.id });
  if (!dbUser) return null;

  return JSON.parse(JSON.stringify(dbUser)); // safely serialize
}
