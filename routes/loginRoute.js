import express from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateToken from "../utils/Jwt.js";

const route = express.Router();

route.post("/", async (req, res) => {
  const validateJoi = Joi.object({
    email: Joi.string().min(3).max(100).required(),
    password: Joi.string().min(3).required(),
  });
  const { error } = validateJoi.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({
      error: {
        message: "User in this Email Not registered yet! Please Register first",
      },
    });
  }

  const isPassCorrect = await bcrypt.compare(req.body.password, user.password);

  if (!isPassCorrect) {
    return res.status(400).json({
      error: {
        message: "Invalid Password",
      },
    });
  }
  const token = generateToken(user);
  res.status(200).send(token);
});

export default route;
