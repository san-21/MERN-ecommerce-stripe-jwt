import User from "../models/User.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import asynchandler from "express-async-handler";
import jwt from "jsonwebtoken";
// register with try catch

export const signUp = async (req, res) => {
  const { fullname, email, password } = req.body;

  const validateJoi = Joi.object({
    fullname: Joi.string().min(5).max(100).required(),
    email: Joi.string().required(),
    password: Joi.string().min(7).required(),
  });
  const { error } = validateJoi.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ error: { message: "Please Enter  Credentials correctly" } });
  }
  try {
    const userFound = await User.findOne({ email: email });
    if (userFound) {
      return res.status(409).json({ message: "User Already Exists" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      fullname: fullname,
      email: email,
      password: hashedPassword,
    });
    const userSaved = await newUser.save();
    if (userSaved) {
      res.status(201).json({
        message: "Account Successfully Created",
        data: userSaved,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// login with ASYNC HANDLER

export const signIn = asynchandler(async (req, res) => {
  const { email, password, rememberMe } = req.body;

  const validateJoi = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    rememberMe: Joi.boolean(),
  });
  const { error } = validateJoi.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ error: { message: "Please Enter  Credentials correctly" } });
  }

  const user = await User.findOne({ email: email }).exec();
  if (!user) {
    res.status(404).json({
      message:
        "Unauthorized Access: Email not Found Please enter correct email",
    });
  }

  const isPassowordMatch = bcrypt.compareSync(password, user.password);
  if (!isPassowordMatch) {
    res.status(404).json({
      message:
        "Unauthorized Access: Password not Match Please  enter correct password again",
    });
  }

  // generate access token and save to client MEMORY

  const token = jwt.sign(
    { _id: user._id, fullname: user.fullname },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: "1m" }
  );

  //Generate REFRESH TOKEN and SAVE to Client Browser as COOKIE
  let REFRESH_TOKEN_TTL = "15m";
  let COOKIE_TTL = 1 * 24 * 60 * 60 * 1000;

  // for testing purpose
  // REFRESH_TOKEN_TTL = "2m";
  // COOKIE_TTL = 0.00139 * 24 * 60 * 60 * 1000; // around 2 minutes

  if (rememberMe) {
    REFRESH_TOKEN_TTL = "30d";
    COOKIE_TTL = 30 * 24 * 60 * 60 * 1000;

    //for testing purposes
    // REFRESH_TOKEN_TTL = "5m";
    // COOKIE_TTL = 0.00512 * 24 * 60 * 60 * 1000; //5 minutes
  }

  const refreshToken = jwt.sign(
    { _id: user._id },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    { expiresIn: REFRESH_TOKEN_TTL }
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: COOKIE_TTL,
  });

  res.status(200).json({
    message: "Login Successfully",
    token: token,
  });
});

// signOut

export const signOut = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return res.status(204).json({ message: "no cookie found" });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  // res.clearCookie("accessToken");
  res.status(200).json({ message: "Logout Successfully" });
};

// refresh token .....CHECk refresh token implementation in react for fronend implementation

export const refresh = async (req, res) => {
  const cookies = req.cookies;
  //  check cookies
  if (!cookies?.refreshToken) {
    // plase change error message in production
    return res
      .status(401)
      .json({ message: "Unauthorized Access: no Cookies Found on request" });
  }

  const refreshToken = cookies.refreshToken;
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET_KEY,
    async (err, jwtPayload) => {
      if (err) {
        return res.status(401).json({ message: "RefreshTokenExpiredError" });
      }
      const user = await User.findById(jwtPayload._id);
      if (!user) {
        res.status(401).json({ message: "Unauthorized : user not found" });
      }

      const token = jwt.sign(
        { _id: user._id, fullname: user.fullname },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "2m" }
      );
      res
        .status(200)
        .json({ message: "token Refreshed successfully", token: token });
    }
  );
};
