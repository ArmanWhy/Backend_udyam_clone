import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema(
  {
    aadhaarNumber: {
      type: String,
      required: true,
      match: /^[0-9]{12}$/,
    },
    panNumber: {
      type: String,
      required: true,
      match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    },
  },
  { timestamps: true }
);

const Registration = mongoose.model("Registration", RegistrationSchema);

export default Registration;
