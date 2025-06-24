import { getAuth } from "@clerk/nextjs/server"; // ✅ Use getAuth instead of auth
import { NextResponse,NextRequest } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/model/User";


export async function POST(req: NextRequest) {

  const { userId } = getAuth(req); // ✅ use getAuth(req)

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const dbUser = await User.findOne({ clerkId: userId });

    return NextResponse.json({ user: dbUser });
  } catch (err) {
    console.error("Failed to fetch db user:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
