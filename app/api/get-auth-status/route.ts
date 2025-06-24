// app/api/get-auth-status/route.ts

import connectDB from "@/lib/db";
import User from "@/lib/model/User";
import { currentUser } from "@clerk/nextjs/server";

export async function POST() {
  await connectDB();

  const user = await currentUser();

  if (!user?.id || !user?.primaryEmailAddress?.emailAddress) {
    return new Response(JSON.stringify({ error: "User not found" }), { status: 401 });
  }

  const clerkId = user.id;
  const email = user.primaryEmailAddress.emailAddress;

  let existingUser = await User.findOne({ clerkId });

  if (!existingUser) {
    existingUser = await User.create({
      clerkId,
      email,
      name: user.fullName || user.firstName || "No Name",
      plan: "free",
      usedRemindersThisMonth: 0,
      resetAt: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    });
  }

  return new Response(JSON.stringify({ success: true, user: existingUser }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
