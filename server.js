import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

// Routes
import registrationRoutes from "./src/routes/registrationRoutes.js";
import otpRoutes from "./src/routes/otpRoutes.js";
import formSchemaRoutes from "./src/routes/formSchemaRoutes.js";


// Middleware
import { errorHandler } from "./src/middlewares/errorHandler.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// DB connection
connectDB();

// Health check route
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

// API Routes
app.use("/api/registration", registrationRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/formSchema", formSchemaRoutes);


// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
