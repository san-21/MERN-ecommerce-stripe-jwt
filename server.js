import dotenv from "dotenv";

dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import servicesRoutes from "./routes/servicesRoutes.js";

import { mongoConnect } from "./config/mongoDb.js";
import stripeRoute from "./routes/stripe.js";
import webhookRouter from "./routes/stripeWebhook.js";
import { corsSetting } from "./config/corsSetting.js";
mongoConnect();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(corsSetting));

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/services", servicesRoutes);
app.use("/api/stripe", stripeRoute);
app.use("/api/stripe-webhook", webhookRouter);

app.listen(PORT, (error) => {
  console.log(`server running on port ${PORT}`);
});
