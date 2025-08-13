const formSchema = [
  {
    step: 1,
    fields: [
      {
        name: "aadhaarNumber",
        label: "Aadhaar Number",
        type: "text",
        placeholder: "Enter 12-digit Aadhaar",
        validation: "^[0-9]{12}$",
        required: true
      },
      {
        name: "nameOfEntrepreneur",
        label: "Name of Entrepreneur",
        type: "text",
        placeholder: "Enter name as per Aadhaar",
        validation: "^.{1,100}$",
        required: true
      },
      {
        name: "otp",
        label: "OTP",
        type: "text",
        placeholder: "Enter 6-digit OTP",
        validation: "^[0-9]{6}$",
        required: true
      }
    ]
  },
  {
    step: 2,
    fields: [
      {
        name: "panNumber",
        label: "PAN Number",
        type: "text",
        placeholder: "ABCDE1234F",
        validation: "^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
        required: true
      }
    ]
  }
];

export default formSchema;
