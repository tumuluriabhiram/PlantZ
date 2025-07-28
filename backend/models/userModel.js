// backend/models/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Add unique: true here
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verifyOtp: { type: String, default: '' },
  verifyOtpExpireAt: { type: Number, default: 0 },
  isAccountVerified: { type: Boolean, default: false },
  resetOtp: { type: String, default: '' },
  resetOtpExpireAt: { type: Number, default: 0 },
  lastCheckin: { type: Date, default: Date.now },
  rewards: { type: Number, default: 0 }, // Add rewards field to track user points
});

// Change to a post-hook to update lastCheckin after the model is accessed
userSchema.post('find', async function (docs) {
  const currentDate = new Date();

  for (const doc of docs) {
    const lastCheckinDate = new Date(doc.lastCheckin);

    // Check if the day has changed
    if (
      lastCheckinDate.getFullYear() !== currentDate.getFullYear() ||
      lastCheckinDate.getMonth() !== currentDate.getMonth() ||
      lastCheckinDate.getDate() !== currentDate.getDate()
    ) {
      doc.lastCheckin = currentDate;
      doc.rewards += 2; // Increment rewards by 2 points
      await doc.save();
    }
  }
});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;