import express from "express";
import formSchema from "../config/formSchema.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ success: true, schema: formSchema });
});

export default router;
