import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        res
          .status(403)
          .json({ message: " Forbidden :invalid token or Token Expired" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403).json({ message: "no token provided" });
  }
};
