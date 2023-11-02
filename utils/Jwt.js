import Jwt from "jsonwebtoken";
import express from "express";
const route = express.Router();

const generateToken = (user) => {
  const tokenSecret = process.env.JWT_SECRET_KEY;
  const token = Jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    tokenSecret,
    { expiresIn: 3600 }
  );

  console.log(token);
  return token;
};

export default generateToken;
