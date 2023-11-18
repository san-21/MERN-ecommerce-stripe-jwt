import express from "express";
import {
  forgotPassword,
  resetPassword,
} from "../controllers/serviceController.js";

const router = express.Router();

// forgot pass

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
