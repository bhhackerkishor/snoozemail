import { auth } from '@clerk/nextjs/server';
import  connectDB  from "@/lib/db"
import User from "@/lib/model/User" 
import { currentUser } from "@clerk/nextjs/server";

export async function POST() {
  
const { userId } = await auth();
const user = await currentUser();

  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }

  await connectDB()

  const existingUser = await User.findOne({ clerkId: userId })

  if (!existingUser) {
    await User.create({
      clerkId: userId,
      email: user?.emailAddresses[0]?.emailAddress,
      name: user?.firstName || 'User',
    })
  }

  return new Response('User synced', { status: 200 })
}
