const allowedOrigins = [
  "http://localhost:3000",
  "https://sanwebsite.onrender.com/",
];
export const corsSetting = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
