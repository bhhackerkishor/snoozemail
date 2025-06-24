import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
  planName: {
    type: String,
    enum: ['pro', 'team'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
}, { _id: false });

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: String,
  name: String,
  plan: {
    type: String,
    enum: ['free', 'pro', 'team'],
    default: 'free',
  },
  usedRemindersThisMonth: {
    type: Number,
    default: 0,
  },
  resetAt: {
    type: Date,
    default: () => new Date(new Date().getFullYear(), new Date().getMonth(), 1), // Start of current month
  },
  paymentId: String, // latest payment id
  subscribedAt: Date, // when user subscribed to current plan
  purchaseHistory: [purchaseSchema], // past subscriptions
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
