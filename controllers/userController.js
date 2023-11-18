import User from "../models/User.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.decoded._id).exec();
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    const { password, ...userInfo } = user._doc;
    return res.status(200).json({
      message: "user found",
      data: userInfo,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getDashboard = async (req, res) => {
  res.status(200).json({ message: "dashboard" });
};
