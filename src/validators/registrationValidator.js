export const validateRegistration = (data) => {
  const errors = {};

  if (!/^[0-9]{12}$/.test(data.aadhaarNumber)) {
    errors.aadhaarNumber = "Invalid Aadhaar Number (must be 12 digits)";
  }

  if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(data.panNumber)) {
    errors.panNumber = "Invalid PAN Number (Format: AAAAA9999A)";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
