import { NextResponse } from 'next/server'
import connectDB from "@/lib/db";
import Reminder from '@/lib/model/reminder'
import { getUserReminders } from "@/lib/actions/getReminders";
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { clerkId, to, subject,html, remindAt } = body
		
    if (!clerkId || !to || !subject || !remindAt) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await connectDB()

    const reminder = await Reminder.create({
	  clerkId,
      to,
      subject,
      remindAt,
	  body:html,
      sent: false,
    })

    return NextResponse.json({ success: true, reminder }, { status: 201 })
  } catch (error) {
    console.error("Error creating reminder:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}


export async function GET() {
  const reminders = await getUserReminders();
  return NextResponse.json(reminders);
}
