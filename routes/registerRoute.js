import express from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateToken from "../utils/Jwt.js";

const route = express.Router();

route.post("/", async (req, res) => {
  // const {name,email,password} = req.body
  const validateJoi = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().min(3).max(100).required(),
    password: Joi.string().min(3).required(),
  });
  const { error } = validateJoi.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ error: { message: "Please Enter Correct Credentials" } });
  }

  const result = await User.findOne({ email: req.body.email });
  if (result) {
    return res.status(400).json({
      error: { message: "email already registered! Please Login instead" },
    });
  }

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hashSync(newUser.password, salt);
  newUser.password = hashedPassword;
  const user = await newUser.save();

  const token = generateToken(user);
  res.status(200).send(token);
});

export default route;
