import Registration from "../models/Registration.js";
import Otp from "../models/Otp.js";
import { validateRegistration } from "../validators/registrationValidator.js";

export const submitRegistration = async (req, res) => {
  try {
    const { aadhaarNumber, nameOfEntrepreneur, panNumber } = req.body;

    if (!aadhaarNumber || !nameOfEntrepreneur || !panNumber) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: Aadhaar, Name, or PAN"
      });
    }

    const otpRecord = await Otp.findOne({ aadhaarNumber, verified: true });
    if (!otpRecord) {
      return res.status(403).json({
        success: false,
        message: "Aadhaar has not been OTP verified"
      });
    }

    const { isValid, errors } = validateRegistration({ aadhaarNumber, panNumber });
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors
      });
    }

    const newReg = new Registration({ aadhaarNumber, panNumber });
    await newReg.save();

    await Otp.deleteOne({ _id: otpRecord._id });

    return res.status(201).json({
      success: true,
      message: "Registration saved successfully",
      data: newReg
    });
  } catch (error) {
    console.error("❌ Error in submitRegistration:", error.stack);
    return res.status(500).json({
      success: false,
      message: error.message || "Unexpected server error"
    });
  }
};
