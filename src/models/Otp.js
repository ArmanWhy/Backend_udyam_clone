import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema(
  {
    aadhaarNumber: { type: String, required: true, match: /^[0-9]{12}$/ },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    verified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// Automatically remove expired OTPs from collection after TTL
OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Otp = mongoose.model("Otp", OtpSchema);
export default Otp;
