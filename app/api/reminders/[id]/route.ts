import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Reminder from "@/lib/model/reminder";

// Utility to extract ID from URL
const getIdFromUrl = (request: NextRequest) => {
  return request.nextUrl.pathname.split("/").pop(); // OR use RegEx if needed
};

// DELETE: /api/reminders/[id]
export async function DELETE(request: NextRequest) {
  await connectDB();

  try {
    const id = getIdFromUrl(request);

    if (!id) {
      return NextResponse.json({ error: "Missing reminder ID" }, { status: 400 });
    }

    const deleted = await Reminder.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Reminder not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PUT: /api/reminders/[id]
export async function PUT(request: NextRequest) {
  await connectDB();

  try {
    const id = getIdFromUrl(request);
	console.log(id,request)
    if (!id) {
      return NextResponse.json({ error: "Missing reminder ID" }, { status: 400 });
    }

    const body = await request.json();

    const updated = await Reminder.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "Reminder not found" }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
