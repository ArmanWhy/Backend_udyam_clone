import Otp from "../models/Otp.js";

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

export const sendOtp = async (req, res) => {
  try {
    const { aadhaarNumber } = req.body;

    if (!/^[0-9]{12}$/.test(aadhaarNumber)) {
      return res.status(400).json({ success: false, message: "Invalid Aadhaar Number" });
    }

    await Otp.deleteMany({ aadhaarNumber }); // clear old

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await Otp.create({ aadhaarNumber, otp, expiresAt });

    res.status(200).json({
      success: true,
      message: "OTP sent successfully (simulation)",
      otp
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { aadhaarNumber, otp } = req.body;

    const record = await Otp.findOne({ aadhaarNumber, otp });

    if (!record) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    record.verified = true;
    await record.save();

    res.status(200).json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
