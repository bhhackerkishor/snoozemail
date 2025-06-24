// app/(dashboard)/subscription/page.tsx or similar
import { currentUser } from "@clerk/nextjs/server";
import connectDB from "@/lib/db";
import User from "@/lib/model/User";
import ClientSubscription from "@/components/ClientSubscription";

export default async function SubscriptionPage() {
  await connectDB();
  const clerkUser = await currentUser();

  if (!clerkUser?.id) return <div className="text-center mt-10">User not found</div>;

  const dbUser = await User.findOne({ clerkId: clerkUser.id });

  // convert to plain object to make it serializable
  const user = JSON.parse(JSON.stringify(dbUser));

  return <ClientSubscription currentPlan={user.plan} />;
}
