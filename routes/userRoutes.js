import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getProfile, getDashboard } from "../controllers/userController.js";
const route = express.Router();

route.get("/profile", verifyToken, getProfile);
route.get("/dashboard", verifyToken, getDashboard);

export default route;
