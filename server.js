import dotenv from "dotenv";

dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import registerRouter from "./routes/registerRoute.js";
import loginRouter from "./routes/loginRoute.js";

import { mongoConnect } from "./config/mongoDb.js";
import stripeRoute from "./routes/stripe.js";
import webhookRouter from "./routes/stripeWebhook.js";
mongoConnect();
const app = express();
const PORT = 4000;

app.use(cors());

app.use(bodyParser.json());

app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/stripe", stripeRoute);
app.use("/api/stripe-webhook", webhookRouter);

app.listen(PORT, (error) => {
  console.log(`server running on port ${PORT}`);
});
