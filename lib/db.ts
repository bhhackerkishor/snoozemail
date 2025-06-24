import mongoose from 'mongoose'

let isConnected = false

export default async function connectToDB(): Promise<void> {
  if (isConnected) return

  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: 'SnoozeMail',
      bufferCommands: false,
    })
    isConnected = true
    console.log("✅ MongoDB connected")
  } catch (error) {
    console.error("❌ MongoDB connection error:", error)
  }
}
