import { NextRequest, NextResponse } from "next/server";
//import Razorpay from "razorpay";
import crypto from "crypto";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/db";
import User from "@/lib/model/User"; // ✅ Import your User model

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planId,plan, amount } = body;
	console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature, planId, amount,body)
    // 1. Verify Signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // 2. Connect to DB
    await connectDB();

    // 3. Validate amount
    if (!amount || isNaN(parseInt(amount))) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // 4. Update User by clerkId
    await User.findOneAndUpdate(
  { clerkId: userId },
  {
    plan: planId ||plan,
    paymentId: razorpay_payment_id,
    subscribedAt: new Date(),
    $push: {
      purchaseHistory: {
        planName: planId || plan ,
        amount: parseInt(amount),
        paymentId: razorpay_payment_id,
      },
    },
  },
  { new: true }
);


    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Verification Error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
