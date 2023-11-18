import express from "express";

import {
  signIn,
  signUp,
  signOut,
  refresh,
} from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register", signUp);
router.post("/login", signIn);
router.post("/logout", signOut);
router.post("/refreshtoken", refresh);

export default router;
